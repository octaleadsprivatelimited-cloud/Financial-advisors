import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Pricing() {
  const tiers = [
    { 
      name: 'Essential CFO', 
      price: '₹1.5 Lakhs', 
      period: 'per annum',
      desc: 'Ideal for salaried HNIs, corporate directors, and growing tech leaders.',
      features: [
        'Comprehensive Financial Mapping',
        'Direct Mutual Fund Rebalancing',
        'Direct Tax (IT Act) Optimization',
        'Basic Estate Planning (Will drafting)',
        'Bi-Annual Fiduciary Audit Reviews',
        'Zero commission product access'
      ] 
    },
    { 
      name: 'Comprehensive CFO', 
      price: '₹3.0 Lakhs', 
      period: 'per annum',
      desc: 'Designed for business owners, startup promoters, and NRI families.',
      popular: true,
      features: [
        'Everything in Essential CFO plan',
        'HUF Structure & Partition Setup',
        'Detailed ESOP Exercise & Tax Hedging',
        'NRI Cross-border Tax Management',
        'Private Trust Estate Drafting',
        'Quarterly Strategy Reviews & Audits',
        'Priority Phone & WhatsApp Access'
      ] 
    },
    { 
      name: 'Multi-Family Office', 
      price: '₹6.0 Lakhs', 
      period: 'per annum',
      desc: 'Dedicated concierge management for ultra-HNIs (₹25Cr+ AUM).',
      features: [
        'Everything in Comprehensive plan',
        'Promoter dilution & corporate structuring',
        'Venture Debt & AIF bespoke audits',
        'Global tax planning (US/UK/Gulf)',
        'Corporate Treasury park-yield advisory',
        'Dedicated legal desk coordination',
        'Monthly Portfolio Governance calls'
      ] 
    },
  ]
  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Header */}
      <section className="bg-dark text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full doo-dad-gold pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="container-default relative z-10 text-center">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-4">Flat-Fee Transparency</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6">Our Pricing Structure</h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            We are SEBI-registered fee-only advisors. We receive zero product commission. Our sole revenue is your transparent advisory retainer.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="container-default py-20">
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, idx) => (
            <motion.div 
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-white rounded-sm border p-8 flex flex-col justify-between relative shadow-sm hover:shadow-xl transition-all duration-300 ${
                t.popular ? 'border-secondary border-2' : 'border-gray-100'
              }`}
            >
              {t.popular && (
                <span className="absolute top-0 right-8 -translate-y-1/2 bg-secondary text-primary font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm">
                  Recommended
                </span>
              )}
              
              <div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">{t.name}</h3>
                <p className="text-gray-500 text-xs font-light mb-6 min-h-[40px]">{t.desc}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-serif font-bold text-primary">{t.price}</span>
                  <span className="text-gray-400 text-xs font-medium block mt-1">{t.period}</span>
                </div>
                
                <ul className="space-y-4 border-t border-gray-100 pt-6 text-xs sm:text-sm text-gray-600">
                  {t.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span className="font-light">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link 
                  to="/contact" 
                  className={`w-full text-center py-3 text-xs uppercase tracking-wider font-semibold block transition-all ${
                    t.popular 
                      ? 'btn-primary bg-secondary text-primary hover:bg-secondary-light' 
                      : 'btn-primary bg-primary text-white hover:bg-primary-light'
                  }`}
                >
                  Initiate Audit Call
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Compliance details */}
        <div className="max-w-2xl mx-auto text-center mt-12 text-xs text-gray-400 font-light">
          <p>
            * Retainer fees are invoiced bi-annually. Real estate transaction auditing and private trust establishment might carry one-off setup documentation charges, transparently declared beforehand.
          </p>
        </div>
      </section>
    </div>
  )
}


