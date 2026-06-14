import { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useSettings } from '../context/SettingsContext.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState({ loading: false, success: null, error: null })
  const { settings } = useSettings()

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: null, error: null })
    try {
      await axios.post('/api/contact', form)
      setStatus({ loading: false, success: 'Thank you! A lead personal CFO will connect with you shortly.', error: null })
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setStatus({ loading: false, success: null, error: 'Failed to submit form. Please check your network or call us directly.' })
    }
  }

  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-dark text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full doo-dad-gold pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="container-default relative z-10 text-center">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-4">Connect With Us</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6">Talk to a Personal CFO</h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            We are ready to coordinate your investments, minimize your taxes, and protect your estate. Let\'s begin the conversation.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="container-default py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-sm border border-gray-100 shadow-xl p-8 sm:p-10"
            >
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">Send a Message</h2>
              <form onSubmit={submit} className="space-y-6 text-charcoal">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Full Name</label>
                    <input 
                      required 
                      className="w-full text-sm rounded-sm border-gray-200 bg-gray-50/50 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white transition-all"
                      placeholder="e.g. Anand Sharma"
                      value={form.name} 
                      onChange={e=>setForm({...form, name: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      className="w-full text-sm rounded-sm border-gray-200 bg-gray-50/50 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white transition-all"
                      placeholder="name@company.com"
                      value={form.email} 
                      onChange={e=>setForm({...form, email: e.target.value})} 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Phone Number</label>
                  <input 
                    required 
                    className="w-full text-sm rounded-sm border-gray-200 bg-gray-50/50 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white transition-all"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone} 
                    onChange={e=>setForm({...form, phone: e.target.value})} 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Inquiry / Requirements</label>
                  <textarea 
                    rows="4" 
                    className="w-full text-sm rounded-sm border-gray-200 bg-gray-50/50 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white transition-all resize-none"
                    placeholder="Briefly describe your wealth management, estate planning, or tax advisory requirements..."
                    value={form.message} 
                    onChange={e=>setForm({...form, message: e.target.value})} 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status.loading}
                  className="btn-primary w-full py-3.5 text-xs uppercase tracking-wider bg-primary hover:bg-primary-light text-white transition-all"
                >
                  {status.loading ? 'Scheduling...' : 'Request Consultation'}
                </button>

                {status.success && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 text-green-700 text-xs rounded-sm border border-green-200 font-medium"
                  >
                    {status.success}
                  </motion.div>
                )}
                {status.error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 text-red-700 text-xs rounded-sm border border-red-200 font-medium"
                  >
                    {status.error}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>

          {/* Contact Details / Offices */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-sm border border-gray-100 p-8 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-primary mb-4">Immediate Contact</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <span className="text-secondary">📞</span>
                  <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:underline font-medium text-primary">
                    {settings.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-secondary">✉️</span>
                  <a href={`mailto:${settings.email}`} className="hover:underline font-medium text-primary">
                    {settings.email}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-secondary">💬</span>
                  <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:underline font-medium text-primary">
                    WhatsApp: {settings.phone}
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-gray-100 p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-serif font-bold text-primary">Our Indian Hubs</h3>
              
              <div className="text-xs sm:text-sm space-y-4">
                <div className="pb-4 border-b border-gray-100">
                  <span className="font-semibold text-primary block">Mumbai Office</span>
                  <p className="mt-1 text-gray-500 font-light">{settings.address}</p>
                </div>
                
                <div className="pb-4 border-b border-gray-100">
                  <span className="font-semibold text-primary block">Bengaluru Office</span>
                  <p className="mt-1 text-gray-500 font-light">Indiranagar Double Road, Stage 2, Bengaluru, KA 560038</p>
                </div>
                
                <div>
                  <span className="font-semibold text-primary block">Delhi NCR Office</span>
                  <p className="mt-1 text-gray-500 font-light">Barakhamba Road, Connaught Place, New Delhi, DL 110001</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}


