import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'

const FALLBACK_SERVICES = [
  {
    id: "srv_1",
    title: "Personal Financial Planning",
    desc: "Bespoke cash flow, savings roadmap, and milestone targets aligned with your personal and family values.",
    items: [
      "Budgeting and expense management",
      "Goal-based planning (house, education, retirement)",
      "Emergency fund planning"
    ],
    icon: "📋",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600",
    active: true,
    path: "/planning"
  },
  {
    id: "srv_2",
    title: "Investment Advisory",
    desc: "Portfolio creation and management incorporating stocks, mutual funds, ETFs, and bonds with risk-based asset allocation.",
    items: [
      "Stock, mutual fund, ETF, and bond investments",
      "Portfolio creation and management",
      "Risk assessment and asset allocation"
    ],
    icon: "📈",
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600",
    active: true,
    path: "/wealth"
  },
  {
    id: "srv_3",
    title: "Retirement Planning",
    desc: "Structured retirement drawdown plans managing pension, EPF, NPS, and tax-efficient withdrawal strategies.",
    items: [
      "Pension and retirement corpus planning",
      "Retirement income strategies",
      "Tax-efficient withdrawals"
    ],
    icon: "⏳",
    img: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=600",
    active: true,
    path: "/retirement"
  },
  {
    id: "srv_4",
    title: "Tax Planning",
    desc: "Direct tax optimization integrated with investments, minimizing LTCG, and structuring capital gains tax efficiently.",
    items: [
      "Income tax optimization",
      "Tax-saving investments",
      "Capital gains tax planning"
    ],
    icon: "⚖️",
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600",
    active: true,
    path: "/tax"
  },
  {
    id: "srv_5",
    title: "Insurance Planning",
    desc: "Independent risk auditing and coverage recommendations for life, health, and risk protection strategies.",
    items: [
      "Life insurance analysis",
      "Health insurance recommendations",
      "Risk protection strategies"
    ],
    icon: "🛡️",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600",
    active: true,
    path: "/insurance"
  },
  {
    id: "srv_6",
    title: "Wealth Management",
    desc: "High-net-worth portfolio management, estate and succession planning, and family wealth preservation.",
    items: [
      "High-net-worth portfolio management",
      "Estate and succession planning",
      "Family wealth preservation"
    ],
    icon: "💎",
    img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=600",
    active: true,
    path: "/estate"
  },
  {
    id: "srv_7",
    title: "Business Financial Advisory",
    desc: "Promoter dilution management, corporate cash flow management, budgeting, and fundraising planning.",
    items: [
      "Cash flow management",
      "Business budgeting",
      "Fundraising and investment planning",
      "Financial projections"
    ],
    icon: "🏢",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600",
    active: true,
    path: "/business"
  },
  {
    id: "srv_8",
    title: "Loan & Debt Advisory",
    desc: "Guidance on home loans, business loan assistance, debt restructuring, and repayment planning.",
    items: [
      "Home loan guidance",
      "Business loan assistance",
      "Debt restructuring and repayment planning"
    ],
    icon: "💸",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600",
    active: true,
    path: "/planning"
  }
]

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/services')
        // Filter out inactive services
        const activeServices = res.data.filter(s => s.active)
        setServices(activeServices.length > 0 ? activeServices : FALLBACK_SERVICES.filter(s => s.active))
      } catch (err) {
        console.error('Failed to fetch services:', err)
        setServices(FALLBACK_SERVICES.filter(s => s.active))
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  return (
    <div className="bg-cream min-h-screen pb-20 font-sans">
      {/* Header Banner */}
      <section className="bg-dark text-white py-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full doo-dad-teal pointer-events-none transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="container-default relative z-10 text-center">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-4">Integrated Focus</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6">Our Services</h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light font-sans">
            We operate across your entire balance sheet. We don't sell products—we coordinate your tax, investments, and life plans.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container-default py-20">
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading services...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((s, idx) => (
              <motion.article 
                key={s.id || s.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-sm overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative overflow-hidden h-48">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/10 to-transparent"></div>
                    <span className="absolute bottom-4 left-4 text-3xl">{s.icon}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-primary mb-3">{s.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light mb-4">
                      {s.desc}
                    </p>
                    {s.items && s.items.length > 0 && (
                      <ul className="space-y-1.5 text-xs text-gray-500 border-t border-gray-100 pt-4 mt-2">
                        {s.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2">
                            <span className="text-secondary font-bold text-sm leading-none">•</span>
                            <span className="leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 bg-cream/30 flex items-center justify-between text-xs font-semibold mt-auto">
                  <Link to={s.path || '/contact'} className="text-primary hover:text-secondary flex items-center gap-1 transition-colors">
                    Learn Strategy
                    <span>→</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Client Alignment Notice */}
      <section className="bg-primary text-white py-16">
        <div className="container-default max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">100% Commission-Free Advisory</h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-2xl mx-auto font-sans">
            Unlike mutual fund agents or insurance distributors, we receive no compensation from product manufacturers. Our only loyalty is to you.
          </p>
          <Link to="/contact" className="btn-primary bg-secondary text-primary hover:bg-secondary-light px-8 py-3.5 text-xs uppercase tracking-wider">
            Schedule a Free Portfolio Audit
          </Link>
        </div>
      </section>
    </div>
  )
}


