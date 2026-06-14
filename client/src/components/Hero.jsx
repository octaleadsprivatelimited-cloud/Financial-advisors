import { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

export default function Hero() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState({ loading: false, success: null, error: null })

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: null, error: null })
    try {
      await axios.post('/api/contact', form)
      setStatus({ loading: false, success: 'Thank you! A lead advisor will contact you within 24 hours.', error: null })
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setStatus({ loading: false, success: null, error: 'Failed to submit request. Please try calling us directly.' })
    }
  }

  return (
    <section className="relative bg-dark overflow-hidden py-20 lg:py-28 text-white">
      {/* Decorative Brighton Jones style "doo-dads" (abstract gradient shapes) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full doo-dad-gold pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full doo-dad-teal pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="container-default relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Headline and Value Prop */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-secondary font-semibold uppercase tracking-widest text-xs sm:text-sm block mb-4">
                Introducing The Personal CFO Model
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-6">
                Your wealth. <br />
                <span className="text-secondary">Fully aligned</span> <br />
                with a richer life.
              </h1>
              <p className="text-gray-300 text-base sm:text-lg max-w-xl mb-8 leading-relaxed font-sans font-light">
                We coordinate your investments, tax strategies, business equity, and estate plans into a single, unified strategy. Designed specifically for Indian business leaders, tech founders, and NRI families.
              </p>
            </motion.div>

            {/* CTAs and trust indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <a href="#consultation-form" className="btn-primary uppercase tracking-wider text-xs px-8 py-3.5 bg-secondary text-primary hover:bg-secondary-light hover:text-primary-dark">
                Get a Free Audit
              </a>
              <a href="/services" className="btn-secondary uppercase tracking-wider text-xs px-8 py-3.5 text-white border-white/30 hover:bg-white/10 hover:border-white">
                Explore Services
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-6 border-t border-white/10 pt-6 max-w-lg"
            >
              <div className="text-xs text-gray-400">
                <span className="text-white font-bold block mb-1">SEBI Registered</span>
                INA000000000
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-xs text-gray-400">
                <span className="text-white font-bold block mb-1">Fee-Only Advisory</span>
                100% Commission-Free
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-xs text-gray-400">
                <span className="text-white font-bold block mb-1">HNI & NRI Focus</span>
                ₹10Cr+ AUM Advisory
              </div>
            </motion.div>
          </div>

          {/* Consultation Form Column */}
          <div id="consultation-form" className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-sm p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary"></div>
              <h2 className="text-2xl font-serif font-bold text-primary mb-2">Request Consultation</h2>
              <p className="text-charcoal text-xs mb-6">
                Receive a complimentary analysis of your current portfolio and tax structure.
              </p>

              <form onSubmit={submit} className="space-y-4 text-charcoal">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full text-sm rounded-sm border-gray-200 bg-gray-50/50 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white transition-all"
                    value={form.name} 
                    onChange={e=>setForm({...form, name: e.target.value})} 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="name@domain.com"
                      className="w-full text-sm rounded-sm border-gray-200 bg-gray-50/50 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white transition-all"
                      value={form.email} 
                      onChange={e=>setForm({...form, email: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full text-sm rounded-sm border-gray-200 bg-gray-50/50 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white transition-all"
                      value={form.phone} 
                      onChange={e=>setForm({...form, phone: e.target.value})} 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Message / Key Focus Area</label>
                  <textarea 
                    rows="3" 
                    placeholder="e.g. Tax planning, NRI investments, ESOP advisory..."
                    className="w-full text-sm rounded-sm border-gray-200 bg-gray-50/50 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white transition-all resize-none"
                    value={form.message} 
                    onChange={e=>setForm({...form, message: e.target.value})} 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status.loading}
                  className="btn-primary w-full py-3 text-xs uppercase tracking-wider bg-primary hover:bg-primary-light text-white transition-all mt-2"
                >
                  {status.loading ? 'Scheduling...' : 'Connect With an Advisor'}
                </button>

                {status.success && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-50 text-green-700 text-xs rounded-sm border border-green-200 font-medium"
                  >
                    {status.success}
                  </motion.div>
                )}
                {status.error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 text-red-700 text-xs rounded-sm border border-red-200 font-medium"
                  >
                    {status.error}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}


