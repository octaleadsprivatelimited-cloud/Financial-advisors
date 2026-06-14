const fs = require('fs')
const path = require('path')

const DB_PATH = path.join(__dirname, 'db.json')
const DB_PROVIDER = process.env.DB_PROVIDER || 'json' // 'json' or 'firebase'

// Helper for JSON read
function readJsonDb() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error('Error reading JSON database:', err)
    return { inquiries: [], faqs: [], careers: [], settings: {}, pages: [], gallery: [] }
  }
}

// Helper for JSON write
function writeJsonDb(db) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8')
  } catch (err) {
    console.error('Error writing JSON database:', err)
  }
}

/*
  =========================================
  FIREBASE FIRESTORE STUB (TO BE ITERATED)
  =========================================
  This section outlines the Firestore database provider.
  When DB_PROVIDER is set to 'firebase', these methods can be hooked up to 
  the Firebase Admin SDK.
*/
let firestoreDb = null;
if (DB_PROVIDER === 'firebase') {
  try {
    const admin = require('firebase-admin')
    // Initialize Admin SDK with service account credentials
    // admin.initializeApp({
    //   credential: admin.credential.cert(require('./serviceAccountKey.json'))
    // })
    // firestoreDb = admin.firestore()
    console.log('Firebase Admin SDK loaded (Stub mode - configure serviceAccountKey.json to activate).')
  } catch (err) {
    console.warn('Firebase Admin SDK failed to load. Falling back to mock firebase methods.', err.message)
  }
}

const dbService = {
  // --- settings ---
  async getSettings() {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      const doc = await firestoreDb.collection('config').doc('settings').get()
      return doc.exists ? doc.data() : {}
    }
    return readJsonDb().settings || {}
  },
  async updateSettings(settings) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      await firestoreDb.collection('config').doc('settings').set(settings, { merge: true })
      return settings
    }
    const db = readJsonDb()
    db.settings = { ...db.settings, ...settings }
    writeJsonDb(db)
    return db.settings
  },

  // --- inquiries ---
  async getInquiries() {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      const snap = await firestoreDb.collection('inquiries').orderBy('date', 'desc').get()
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
    return readJsonDb().inquiries || []
  },
  async addInquiry(inq) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      const docRef = await firestoreDb.collection('inquiries').add(inq)
      return { id: docRef.id, ...inq }
    }
    const db = readJsonDb()
    if (!db.inquiries) db.inquiries = []
    db.inquiries.unshift(inq)
    writeJsonDb(db)
    return inq
  },
  async updateInquiryStatus(id, status) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      await firestoreDb.collection('inquiries').doc(id).update({ status })
      return { id, status }
    }
    const db = readJsonDb()
    const inq = db.inquiries.find(i => i.id === id)
    if (inq) {
      inq.status = status
      writeJsonDb(db)
      return inq
    }
    throw new Error('Inquiry not found')
  },
  async deleteInquiry(id) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      await firestoreDb.collection('inquiries').doc(id).delete()
      return true
    }
    const db = readJsonDb()
    const initialLen = db.inquiries.length
    db.inquiries = db.inquiries.filter(i => i.id !== id)
    if (db.inquiries.length < initialLen) {
      writeJsonDb(db)
      return true
    }
    return false
  },

  // --- faqs ---
  async getFaqs() {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      const snap = await firestoreDb.collection('faqs').get()
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
    return readJsonDb().faqs || []
  },
  async addFaq(faq) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      const docRef = await firestoreDb.collection('faqs').add(faq)
      return { id: docRef.id, ...faq }
    }
    const db = readJsonDb()
    if (!db.faqs) db.faqs = []
    db.faqs.push(faq)
    writeJsonDb(db)
    return faq
  },
  async updateFaq(id, updated) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      await firestoreDb.collection('faqs').doc(id).set(updated, { merge: true })
      return { id, ...updated }
    }
    const db = readJsonDb()
    const faq = db.faqs.find(f => f.id === id)
    if (faq) {
      Object.assign(faq, updated)
      writeJsonDb(db)
      return faq
    }
    throw new Error('FAQ not found')
  },
  async deleteFaq(id) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      await firestoreDb.collection('faqs').doc(id).delete()
      return true
    }
    const db = readJsonDb()
    const initialLen = db.faqs.length
    db.faqs = db.faqs.filter(f => f.id !== id)
    if (db.faqs.length < initialLen) {
      writeJsonDb(db)
      return true
    }
    return false
  },

  // --- careers ---
  async getCareers() {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      const snap = await firestoreDb.collection('careers').get()
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
    return readJsonDb().careers || []
  },
  async addCareer(role) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      const docRef = await firestoreDb.collection('careers').add(role)
      return { id: docRef.id, ...role }
    }
    const db = readJsonDb()
    if (!db.careers) db.careers = []
    db.careers.push(role)
    writeJsonDb(db)
    return role
  },
  async updateCareer(id, updated) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      await firestoreDb.collection('careers').doc(id).set(updated, { merge: true })
      return { id, ...updated }
    }
    const db = readJsonDb()
    const role = db.careers.find(r => r.id === id)
    if (role) {
      Object.assign(role, updated)
      writeJsonDb(db)
      return role
    }
    throw new Error('Role not found')
  },
  async deleteCareer(id) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      await firestoreDb.collection('careers').doc(id).delete()
      return true
    }
    const db = readJsonDb()
    const initialLen = db.careers.length
    db.careers = db.careers.filter(c => c.id !== id)
    if (db.careers.length < initialLen) {
      writeJsonDb(db)
      return true
    }
    return false
  },

  // --- dynamic pages ---
  async getPages() {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      const snap = await firestoreDb.collection('pages').get()
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
    const db = readJsonDb()
    return db.pages || []
  },
  async getPageBySlug(slug) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      const snap = await firestoreDb.collection('pages').where('slug', '==', slug).limit(1).get()
      return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() }
    }
    const db = readJsonDb()
    if (!db.pages) return null
    return db.pages.find(p => p.slug === slug) || null
  },
  async createPage(page) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      const docRef = await firestoreDb.collection('pages').add(page)
      return { id: docRef.id, ...page }
    }
    const db = readJsonDb()
    if (!db.pages) db.pages = []
    db.pages.push(page)
    writeJsonDb(db)
    return page
  },
  async updatePage(id, updated) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      await firestoreDb.collection('pages').doc(id).set(updated, { merge: true })
      return { id, ...updated }
    }
    const db = readJsonDb()
    const page = db.pages.find(p => p.id === id)
    if (page) {
      Object.assign(page, updated)
      writeJsonDb(db)
      return page
    }
    throw new Error('Page not found')
  },
  async deletePage(id) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      await firestoreDb.collection('pages').doc(id).delete()
      return true
    }
    const db = readJsonDb()
    const initialLen = db.pages.length
    db.pages = db.pages.filter(p => p.id !== id)
    if (db.pages.length < initialLen) {
      writeJsonDb(db)
      return true
    }
    return false
  },

  // --- gallery ---
  async getGallery() {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      const snap = await firestoreDb.collection('gallery').orderBy('date', 'desc').get()
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
    return readJsonDb().gallery || []
  },
  async addGalleryItem(item) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      const docRef = await firestoreDb.collection('gallery').add(item)
      return { id: docRef.id, ...item }
    }
    const db = readJsonDb()
    if (!db.gallery) db.gallery = []
    db.gallery.unshift(item)
    writeJsonDb(db)
    return item
  },
  async updateGalleryItem(id, updated) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      await firestoreDb.collection('gallery').doc(id).set(updated, { merge: true })
      return { id, ...updated }
    }
    const db = readJsonDb()
    const item = db.gallery.find(g => g.id === id)
    if (item) {
      Object.assign(item, updated)
      writeJsonDb(db)
      return item
    }
    throw new Error('Gallery item not found')
  },
  async deleteGalleryItem(id) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      await firestoreDb.collection('gallery').doc(id).delete()
      return true
    }
    const db = readJsonDb()
    const initialLen = db.gallery.length
    db.gallery = db.gallery.filter(g => g.id !== id)
    if (db.gallery.length < initialLen) {
      writeJsonDb(db)
      return true
    }
    return false
  },

  // --- services ---
  async getServices() {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      const snap = await firestoreDb.collection('services').get()
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
    const db = readJsonDb()
    return db.services || []
  },
  async updateService(id, updated) {
    if (DB_PROVIDER === 'firebase' && firestoreDb) {
      await firestoreDb.collection('services').doc(id).set(updated, { merge: true })
      return { id, ...updated }
    }
    const db = readJsonDb()
    if (!db.services) db.services = []
    const idx = db.services.findIndex(s => s.id === id)
    if (idx !== -1) {
      db.services[idx] = { ...db.services[idx], ...updated }
      writeJsonDb(db)
      return db.services[idx]
    }
    throw new Error('Service not found')
  }
}

module.exports = dbService
