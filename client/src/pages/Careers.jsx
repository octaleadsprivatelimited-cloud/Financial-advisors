import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'

const defaultRoles = [
  { 
    title: 'Lead Personal CFO / Wealth Advisor', 
    type: 'Full-time', 
    location: 'Mumbai (Nariman Point)',
    desc: 'Manage high-net-worth client accounts. Design financial roadmaps and asset allocation strategies. CFP or CFA preferred, with 5+ years of wealth management experience.'
  },
  { 
    title: 'Tax & Structuring Associate (CA)', 
    type: 'Full-time', 
    location: 'Bengaluru / Hybrid',
    desc: 'Audit client balance sheets for tax leaks. Assist in establishing private trusts, HUF structures, and managing ESOP taxation schedules. Chartered Accountant required.'
  },
  { 
    title: 'Client Relationship Coordinator', 
    type: 'Full-time', 
    location: 'Remote (India)',
    desc: 'Act as the primary administrative touchpoint. Coordinate portfolio reports, schedule quarterly reviews, and manage client document onboarding.'
  }
]

export default function Careers() {
  const [roles, setRoles] = useState(defaultRoles)

  useEffect(() => {
    axios.get('http://localhost:4000/api/careers')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setRoles(res.data)
        }
      })
      .catch(err => console.error('Failed to load dynamic careers, using fallbacks:', err))
  }, [])
  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Header */}
      <section className="bg-dark text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full doo-dad-gold pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="container-default relative z-10 text-center">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-4">Grow With Us</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6">Careers at Fortune</h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Help us transform how families manage wealth in India. Join our 100% fiduciary, conflict-free team.
          </p>
        </div>
      </section>

      {/* Roles List */}
      <section className="container-default py-20 max-w-4xl">
        <div className="space-y-6">
          {roles.map((r, idx) => (
            <motion.div 
              key={r.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-sm border border-gray-100 p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="space-y-2 max-w-xl">
                <span className="inline-block bg-cream text-primary font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm">
                  {r.location} · {r.type}
                </span>
                <h3 className="text-xl font-serif font-bold text-primary">{r.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light">
                  {r.desc}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link to="/contact" className="btn-primary py-2.5 px-6 text-xs uppercase tracking-wider block text-center">
                  Apply Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}


