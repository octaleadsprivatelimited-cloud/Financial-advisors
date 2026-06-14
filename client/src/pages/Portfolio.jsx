import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import axios from 'axios'

const cases = [
  {
    title: 'The Tech Unicorn Founder',
    location: 'Bengaluru',
    profile: 'Co-founder with ₹45Cr ESOP valuation facing pre-IPO lock-in and high tax exposure.',
    challenge: 'Highly concentrated equity risk. Facing 35.8% prerequisite tax rate at exercise, with minimal liquidity.',
    solution: 'Designed an exercise schedule utilizing structured promoter funding, hedged future capital gains through Section 54F exemptions, and established a diversified global equity portfolio.',
    result: 'Optimized prerequisite tax liabilities by ₹4.2Cr and reduced concentration risk from 95% of net worth to 30%.'
  },
  {
    title: 'The Business Promoter',
    location: 'Mumbai',
    profile: 'Family-owned chemical manufacturing business promoter planning a partial stake sale.',
    challenge: 'Significant corporate and individual tax exposure. Risk of inter-generational disputes among three heirs.',
    solution: 'Established a Hindu Undivided Family (HUF) and a private family trust. Structured the stakeholder divestment to qualify for capital gains exemptions by reinvesting in commercial REITs.',
    result: 'Legally avoided ₹8.5Cr in capital gains taxes and secured frictionless inheritance transition.'
  },
  {
    title: 'The US-Based NRI Family',
    location: 'San Jose, California',
    profile: 'HNI NRI family holding real estate and mutual funds in India, desiring repatriation.',
    challenge: 'Complicated tax exposure spanning IRS (Form 8938/PFIC) and Indian Income Tax Act. Dual estate liabilities.',
    solution: 'Audited NRE/NRO assets. Rebalanced high-tax Indian mutual funds (PFIC compliant) into tax-deferred alternatives. Executed DTAA tax credit claims in the US.',
    result: 'Eliminated double-taxation leakage on a ₹20Cr portfolio, streamlining compliance across borders.'
  },
  {
    title: 'The Retirement Transition',
    location: 'Pune',
    profile: 'Corporate executive retiring from a multinational firm with a ₹12Cr accumulated corpus.',
    challenge: 'Transitioning from active salary to passive cash flow. Inflation risk and heavy tax on interest income.',
    solution: 'Formulated a multi-bucket income strategy: Arbitrage/Equity Savings funds for tax-efficient cash flow, combined with a core debt ladder and NPS annuity tax-offset overrides.',
    result: 'Generated a stable ₹6.5 Lakh monthly post-tax distribution while keeping 60% of the corpus growing for inflation protection.'
  }
]

export default function Portfolio() {
  const [gallery, setGallery] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    axios.get('/api/gallery')
      .then(res => setGallery(res.data))
      .catch(err => console.error(err))
  }, [])

  const categories = ['All', ...new Set(gallery.map(item => item.category || 'General'))]
  const filteredGallery = filter === 'All' ? gallery : gallery.filter(item => (item.category || 'General') === filter)

  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Page Header */}
      <section className="bg-dark text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full doo-dad-gold pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="container-default relative z-10 text-center">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-4">Fiduciary Outcomes</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6">Client Case Studies</h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Real families, real balance sheets. See how our Personal CFO integration creates measurable value and peace of mind.
          </p>
        </div>
      </section>

      {/* Case Studies Cards */}
      <section className="container-default py-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {cases.map((c, idx) => (
            <motion.article 
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-sm shadow-md border border-gray-100/60 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-light"></div>
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-secondary font-bold text-xs uppercase tracking-wider">{c.location}</span>
                  <span className="text-gray-300 text-2xl font-serif font-bold">0{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">{c.title}</h3>
                
                <div className="space-y-4 mb-8 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-primary block mb-1">Client Profile</span>
                    <p className="text-gray-600 font-light">{c.profile}</p>
                  </div>
                  <div>
                    <span className="font-bold text-primary block mb-1">Core Challenge</span>
                    <p className="text-gray-600 font-light">{c.challenge}</p>
                  </div>
                  <div>
                    <span className="font-bold text-primary block mb-1">The CFO Strategy</span>
                    <p className="text-gray-600 font-light">{c.solution}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 bg-cream/30 -mx-8 -mb-8 p-8 flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-secondary tracking-widest block">Measurable Value</span>
                  <span className="text-lg font-serif font-bold text-primary-light">{c.result}</span>
                </div>
                <Link to="/contact" className="btn-secondary py-2 px-4 text-xs uppercase tracking-wider">
                  Request Similar Audit
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Dynamic Gallery Section */}
      {gallery.length > 0 && (
        <section className="container-default py-16 border-t border-gray-200/40">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Visual Showcase</span>
            <h2 className="text-3xl font-serif font-bold text-primary">Our Operations & Culture</h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed">
              Explore dynamic photo highlights of our physical wealth hubs, client briefing halls, and team leadership.
            </p>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    filter === cat
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-white border border-gray-100/80 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-left">
                  <span className="text-[10px] uppercase font-bold text-secondary tracking-widest block mb-1">
                    {item.category || 'General'}
                  </span>
                  <h4 className="font-serif font-bold text-primary text-sm line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Footer Callout */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="container-default max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">Ready to audit your balance sheet?</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
            We provide a no-obligation, fully confidential analysis of your tax structures and investment holdings. Let's see what we can optimize.
          </p>
          <Link to="/contact" className="btn-primary bg-secondary text-primary hover:bg-secondary-light px-8 py-3.5 text-xs uppercase tracking-wider">
            Schedule a Private Briefing
          </Link>
        </div>
      </section>
    </div>
  )
}


