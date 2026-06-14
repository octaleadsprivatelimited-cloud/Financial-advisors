import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const defaultFaqs = [
  { 
    q: 'What exactly is a Personal CFO?', 
    a: 'A Personal CFO is a comprehensive coordinator for your entire financial life. Instead of managing your investments in isolation, a Personal CFO integrates your tax returns, corporate ESOPs, estate planning, HUFs, and private trusts into a unified strategy.' 
  },
  { 
    q: 'How does your fee-only structure work?', 
    a: 'We are SEBI Registered Investment Advisers operating under a strict flat-fee retainer model. We receive 0% commission from mutual fund companies, insurers, or PMS houses. This completely aligns our success with your net worth growth and keeps advice conflict-free.' 
  },
  { 
    q: 'What is your typical client profile?', 
    a: 'Our clients are typically Indian business owners, startup founders with ESOP liquidity, corporate executives, and NRI families. We generally recommend that clients have at least ₹5 Crores in investable assets or ₹10 Crores in aggregate balance sheet value to justify our retainer pricing.' 
  },
  { 
    q: 'Do you manage US-India double taxation for NRIs?', 
    a: 'Yes. We coordinate with tax preparers in both jurisdictions. We audit mutual funds for PFIC compliance, structure accounts to optimize DTAA tax credits, and manage Liberalised Remittance Scheme (LRS) transfers.' 
  },
  { 
    q: 'How do you coordinate with our family CA?', 
    a: 'We do not replace your family CA. Instead, we act as your Personal CFO—designing the tax-saving strategies, HUF partitions, and trust structures, and providing clean quarterly summaries so your CA can file your returns friction-free.' 
  }
]

export default function FAQ() {
  const [faqs, setFaqs] = useState(defaultFaqs)
  const [open, setOpen] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:4000/api/faqs')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setFaqs(res.data)
        }
      })
      .catch(err => console.error('Failed to load dynamic FAQs, using fallbacks:', err))
  }, [])

  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Header */}
      <section className="bg-dark text-white py-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full doo-dad-teal pointer-events-none transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="container-default relative z-10 text-center">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-4">Advisory Blueprint</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Find answers to key questions about the Personal CFO framework and our fiduciary standards.
          </p>
        </div>
      </section>

      {/* Accordion List */}
      <section className="container-default py-20 max-w-4xl">
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={f.q} className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm">
              <button 
                className="faq-accordion-btn w-full text-left p-6 font-serif font-bold text-primary flex justify-between items-center text-base sm:text-lg hover:bg-cream/20 transition-colors"
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span>{f.q}</span>
                <span className="text-secondary text-xl font-sans font-light">
                  {open === i ? '−' : '+'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-gray-50 text-gray-500 text-xs sm:text-sm leading-relaxed font-light">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


