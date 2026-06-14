const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const dbService = require('./dbService')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Ensure uploads folder exists
const UPLOADS_DIR = path.join(__dirname, 'uploads')
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

// Serve uploaded assets statically
app.use('/uploads', express.static(UPLOADS_DIR))

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})
const upload = multer({ storage })

// --- 1. File Upload Endpoint ---
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  res.json({ url: fileUrl })
})

// --- 2. Authentication Endpoint ---
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {}
  if (username === 'admin' && password === 'fortuneadmin') {
    return res.json({ token: 'fortune_mock_jwt_token_2026' })
  }
  res.status(401).json({ error: 'Invalid username or password' })
})

// --- 3. Contact Form Submission (Appends to DB + Sends Mail) ---
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body || {}
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const newInquiry = {
    id: 'inq_' + Date.now(),
    name,
    email,
    phone,
    message,
    date: new Date().toISOString(),
    status: 'new'
  }
  
  await dbService.addInquiry(newInquiry)

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT || 587),
      auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      } : undefined,
    })

    transporter.sendMail({
      from: 'no-reply@financialadvisors.com',
      to: process.env.CONTACT_TO || 'test@example.com',
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    }).catch(mailErr => console.error('Background mailing error:', mailErr))

    res.json({ ok: true, id: newInquiry.id })
  } catch (err) {
    console.error('Mailing configuration issue:', err)
    res.json({ ok: true, id: newInquiry.id, warning: 'Stored in database but email delivery skipped' })
  }
})

// --- 4. Inquiries Management ---
app.get('/api/inquiries', async (req, res) => {
  const list = await dbService.getInquiries()
  res.json(list)
})

app.put('/api/inquiries/:id', async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  try {
    const updated = await dbService.updateInquiryStatus(id, status)
    res.json({ ok: true, inquiry: updated })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

app.delete('/api/inquiries/:id', async (req, res) => {
  const { id } = req.params
  const ok = await dbService.deleteInquiry(id)
  if (ok) return res.json({ ok: true })
  res.status(404).json({ error: 'Inquiry not found' })
})

// --- 5. FAQs Management ---
app.get('/api/faqs', async (req, res) => {
  const list = await dbService.getFaqs()
  res.json(list)
})

app.post('/api/faqs', async (req, res) => {
  const { q, a } = req.body
  if (!q || !a) return res.status(400).json({ error: 'Missing question or answer' })
  const newFaq = { id: 'faq_' + Date.now(), q, a }
  const saved = await dbService.addFaq(newFaq)
  res.json({ ok: true, faq: saved })
})

app.put('/api/faqs/:id', async (req, res) => {
  const { id } = req.params
  const { q, a } = req.body
  try {
    const updated = await dbService.updateFaq(id, { q, a })
    res.json({ ok: true, faq: updated })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

app.delete('/api/faqs/:id', async (req, res) => {
  const { id } = req.params
  const ok = await dbService.deleteFaq(id)
  if (ok) return res.json({ ok: true })
  res.status(404).json({ error: 'FAQ not found' })
})

// --- 6. Careers Management ---
app.get('/api/careers', async (req, res) => {
  const list = await dbService.getCareers()
  res.json(list)
})

app.post('/api/careers', async (req, res) => {
  const { title, type, location, desc } = req.body
  if (!title || !type || !location || !desc) return res.status(400).json({ error: 'Missing fields' })
  const newRole = { id: 'car_' + Date.now(), title, type, location, desc }
  const saved = await dbService.addCareer(newRole)
  res.json({ ok: true, role: saved })
})

app.put('/api/careers/:id', async (req, res) => {
  const { id } = req.params
  const { title, type, location, desc } = req.body
  try {
    const updated = await dbService.updateCareer(id, { title, type, location, desc })
    res.json({ ok: true, role: updated })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

app.delete('/api/careers/:id', async (req, res) => {
  const { id } = req.params
  const ok = await dbService.deleteCareer(id)
  if (ok) return res.json({ ok: true })
  res.status(404).json({ error: 'Role not found' })
})

// --- 7. Settings Management ---
app.get('/api/settings', async (req, res) => {
  const settings = await dbService.getSettings()
  res.json(settings)
})

app.put('/api/settings', async (req, res) => {
  const { phone, email, whatsapp, address } = req.body
  const updated = await dbService.updateSettings({ phone, email, whatsapp, address })
  res.json({ ok: true, settings: updated })
})

// --- 8. Dynamic Pages Management ---
app.get('/api/pages', async (req, res) => {
  const list = await dbService.getPages()
  res.json(list)
})

app.get('/api/pages/:slug', async (req, res) => {
  const page = await dbService.getPageBySlug(req.params.slug)
  if (page) return res.json(page)
  res.status(404).json({ error: 'Page not found' })
})

app.post('/api/pages', async (req, res) => {
  const { slug, title, template, seoTitle, seoDesc, seoKeywords, sections } = req.body
  if (!slug || !title || !template) {
    return res.status(400).json({ error: 'Missing slug, title, or template' })
  }
  
  const existing = await dbService.getPageBySlug(slug)
  if (existing) {
    return res.status(400).json({ error: 'A page with this slug already exists' })
  }

  const newPage = {
    id: 'page_' + Date.now(),
    slug,
    title,
    template,
    seoTitle: seoTitle || title,
    seoDesc: seoDesc || '',
    seoKeywords: seoKeywords || '',
    sections: sections || {}
  }
  const saved = await dbService.createPage(newPage)
  res.json({ ok: true, page: saved })
})

app.put('/api/pages/:id', async (req, res) => {
  const { id } = req.params
  const { slug, title, template, seoTitle, seoDesc, seoKeywords, sections } = req.body
  try {
    const updated = await dbService.updatePage(id, { slug, title, template, seoTitle, seoDesc, seoKeywords, sections })
    res.json({ ok: true, page: updated })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

app.delete('/api/pages/:id', async (req, res) => {
  const { id } = req.params
  const ok = await dbService.deletePage(id)
  if (ok) return res.json({ ok: true })
  res.status(404).json({ error: 'Page not found' })
})

// --- 9. Gallery Management ---
app.get('/api/gallery', async (req, res) => {
  const list = await dbService.getGallery()
  res.json(list)
})

app.post('/api/gallery', async (req, res) => {
  const { title, url, category } = req.body
  if (!title || !url) return res.status(400).json({ error: 'Missing title or url' })
  const newItem = {
    id: 'gal_' + Date.now(),
    title,
    url,
    category: category || 'General',
    date: new Date().toISOString()
  }
  const saved = await dbService.addGalleryItem(newItem)
  res.json({ ok: true, item: saved })
})

app.put('/api/gallery/:id', async (req, res) => {
  const { id } = req.params
  const { title, url, category } = req.body
  try {
    const updated = await dbService.updateGalleryItem(id, { title, url, category })
    res.json({ ok: true, item: updated })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

// --- 10. Services Management ---
app.get('/api/services', async (req, res) => {
  const list = await dbService.getServices()
  res.json(list)
})

app.put('/api/services/:id', async (req, res) => {
  const { id } = req.params
  const { title, desc, items, icon, img, active, path } = req.body
  try {
    const updated = await dbService.updateService(id, { title, desc, items, icon, img, active, path })
    res.json({ ok: true, service: updated })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

// robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${process.env.SITE_URL || 'http://localhost:5173'}/sitemap.xml`)
})

// Dynamic sitemap (including dynamic pages)
app.get('/sitemap.xml', async (req, res) => {
  const base = process.env.SITE_URL || 'http://localhost:5173'
  const staticUrls = [
    '/', '/about', '/services', '/portfolio', '/blog', '/contact', '/pricing', '/testimonials', '/faq', '/careers',
    '/planning','/wealth','/tax','/retirement','/insurance','/estate','/education','/business','/risk','/mortgage','/advisory'
  ]
  
  // Append dynamic page urls
  const pagesList = await dbService.getPages()
  const dynamicUrls = pagesList.map(p => `/p/${p.slug}`)
  const allUrls = [...staticUrls, ...dynamicUrls]

  const items = allUrls.map(u => `<url><loc>${base}${u}</loc></url>`).join('')
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`)
})

if (require.main === module) {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
}

module.exports = app
