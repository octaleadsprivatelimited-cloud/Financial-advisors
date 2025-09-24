const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body || {}
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  try {
    // Demo mailer using Ethereal if SMTP envs not configured
    const transporter = await nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT || 587),
      auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      } : undefined,
    })

    const info = await transporter.sendMail({
      from: 'no-reply@financialadvisors.com',
      to: process.env.CONTACT_TO || 'test@example.com',
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    })
    res.json({ ok: true, id: info.messageId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send message' })
  }
})

// robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${process.env.SITE_URL || 'http://localhost:5173'}/sitemap.xml`)
})

// Basic sitemap
app.get('/sitemap.xml', (req, res) => {
  const base = process.env.SITE_URL || 'http://localhost:5173'
  const urls = [
    '/', '/about', '/services', '/portfolio', '/blog', '/contact', '/pricing', '/testimonials', '/faq', '/careers',
    '/planning','/wealth','/tax','/retirement','/insurance','/estate','/education','/business','/risk','/mortgage','/advisory'
  ]
  const items = urls.map(u => `<url><loc>${base}${u}</loc></url>`).join('')
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`)
})

if (require.main === module) {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
}

module.exports = app


