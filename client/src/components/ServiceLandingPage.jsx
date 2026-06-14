import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function ServiceLandingPage({
  title,
  subtitle,
  description,
  heroImage = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
  strategies = [],
  problems = [],
  caseStudy = null,
  faqs = [],
  fiduciaryNotice = 'As a SEBI registered fee-only fiduciary advisor, we do not sell financial products or accept distributor commissions. Our advisory desk is aligned purely with your net worth outcomes.'
}) {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="bg-[#fcfdfd] text-[#1c2430] min-h-screen pb-24 font-sans leading-relaxed">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#002050] text-white py-24 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0078d4_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#0078d4]/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[#0078d4] font-bold text-xs uppercase tracking-widest bg-[#0078d4]/10 px-3 py-1.5 rounded-sm border border-[#0078d4]/20 inline-block">
                {subtitle || 'Fiduciary Desk'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                {title}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
                {description}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/contact" className="bg-[#0078d4] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#005a9e] transition-colors rounded-sm shadow-md">
                  Book Strategy Audit
                </Link>
                <Link to="/pricing" className="border border-white/20 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-white/5 transition-colors rounded-sm">
                  Retainer Pricing
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-2 bg-[#0078d4]/20 rounded-md transform rotate-1"></div>
                <img 
                  src={heroImage} 
                  alt={title} 
                  className="relative z-10 w-full h-[360px] object-cover rounded-sm shadow-2xl border border-white/10" 
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      {problems && problems.length > 0 && (
        <section className="py-20 bg-[#f4f7fa] border-b border-slate-200">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5 space-y-4">
                <span className="text-[#e81123] font-bold text-xs uppercase tracking-widest block">Industry Conflict Warning</span>
                <h2 className="text-3xl font-serif font-bold text-[#002050]">The Hidden Pitfalls of Sales-Driven Advice</h2>
                <p className="text-slate-600 text-sm font-light leading-relaxed">
                  Most advisors are registered product distributors. This means they are incentivized to sell products that offer them high backend commissions rather than strategies that benefit you.
                </p>
              </div>
              <div className="md:col-span-7 grid gap-4">
                {problems.map((prob, idx) => (
                  <div key={idx} className="flex gap-4 p-5 bg-white border border-slate-200/60 rounded shadow-sm hover:border-[#e81123]/30 transition-colors">
                    <span className="text-[#e81123] font-bold text-lg">✕</span>
                    <div>
                      <h4 className="font-bold text-[#002050] text-sm mb-1">{prob.title || 'Market Conflict'}</h4>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">{prob.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. ADVISORY STRATEGIES GRID */}
      <section className="py-20 container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[#0078d4] font-bold text-xs uppercase tracking-widest block">Core Solutions</span>
          <h2 className="text-3xl font-serif font-bold text-[#002050]">Advisory Focus & Playbook</h2>
          <p className="text-slate-500 text-xs sm:text-sm font-light">
            We target structural optimizations to prevent capital leakage and maximize post-tax compounding.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {strategies.map((strat, idx) => (
            <motion.div 
              key={strat.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 hover:border-[#0078d4]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl mb-5 block">{strat.icon || '💼'}</span>
                <h3 className="text-lg font-serif font-bold text-[#002050] mb-3">{strat.name}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light mb-6">
                  {strat.desc}
                </p>
              </div>
              <div className="text-xs font-bold text-[#0078d4] uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:underline">
                Explore Strategy <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. FIDUCIARY COMPLIANCE CHECKLIST */}
      <section className="py-16 bg-[#002050] text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold">100% Commission-Free Fiduciary Execution</h3>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                As a fiduciary desk registered under SEBI rules, our interest is legally linked with your balance sheet performance. We do not maintain any marketing distribution agreements with mutual fund houses, insurance companies, or stockbrokers.
              </p>
              <div className="border-t border-white/10 pt-6">
                <p className="text-xs text-slate-400 italic">
                  {fiduciaryNotice}
                </p>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-8 rounded-sm space-y-4">
              <h4 className="text-xs font-bold text-[#0078d4] uppercase tracking-widest mb-2">Fiduciary Standards Registry</h4>
              
              <div className="flex gap-3 items-start border-b border-white/10 pb-3">
                <span className="text-[#107c41] font-bold text-sm">✓</span>
                <p className="text-xs text-slate-200 font-light leading-relaxed"><strong>Zero Broker Rebates:</strong> We refund all mutual fund commissions back into your plans.</p>
              </div>
              <div className="flex gap-3 items-start border-b border-white/10 pb-3">
                <span className="text-[#107c41] font-bold text-sm">✓</span>
                <p className="text-xs text-slate-200 font-light leading-relaxed"><strong>Transparent Auditing:</strong> Standardized account reviews with live balance sheets and capital gains logs.</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-[#107c41] font-bold text-sm">✓</span>
                <p className="text-xs text-slate-200 font-light leading-relaxed"><strong>Conflict Isolation:</strong> Registered fee-only structure eliminates cross-selling incentives.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CASE STUDY SPECIFICS */}
      {caseStudy && (
        <section className="py-20 bg-[#f4f7fa] border-b border-slate-200">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-white border border-slate-200 p-8 sm:p-12 rounded-sm shadow-sm relative">
              <span className="absolute top-4 left-6 text-slate-200 text-8xl font-serif leading-none pointer-events-none">“</span>
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="text-[#0078d4] font-bold text-xs uppercase tracking-widest block">Client Retainer Audit</span>
                  {caseStudy.outcome && (
                    <span className="bg-[#107c41]/10 text-[#107c41] border border-[#107c41]/20 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-sm">
                      {caseStudy.outcome}
                    </span>
                  )}
                </div>
                <p className="text-[#002050] font-serif text-lg italic leading-relaxed">
                  "{caseStudy.quote}"
                </p>
                <div className="flex justify-between items-end border-t border-slate-100 pt-6">
                  <div>
                    <h4 className="font-bold text-[#002050] text-sm">{caseStudy.client}</h4>
                    <p className="text-xs text-slate-500 font-light mt-0.5">{caseStudy.details}</p>
                  </div>
                  <Link to="/portfolio" className="text-xs font-bold text-[#0078d4] hover:text-[#005a9e] flex items-center gap-1">
                    Read Advisory Cases <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. FAQ SECTIONS */}
      {faqs && faqs.length > 0 && (
        <section className="py-20 container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-[#0078d4] font-bold text-xs uppercase tracking-widest block mb-2">Compliance & Details</span>
            <h2 className="text-3xl font-serif font-bold text-[#002050]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 bg-white rounded-sm overflow-hidden">
                <button 
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-serif font-bold text-sm text-[#002050] flex justify-between items-center hover:bg-slate-50 focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-slate-400 font-mono">{openFaq === idx ? '−' : '+'}</span>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-slate-100 bg-slate-50/50"
                    >
                      <div className="p-5 text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. CTA BANNER */}
      <section className="py-16 bg-[#f4f7fa] text-center border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-3xl space-y-6">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#002050]">Establish your Fiduciary Blueprint</h3>
          <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
            Get an independent review of your mutual fund commissions, real estate gains exposure, or corporate retirement structure with a senior partner.
          </p>
          <Link to="/contact" className="bg-[#0078d4] hover:bg-[#005a9e] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 inline-block rounded-sm shadow-md">
            Request Strategy Review
          </Link>
        </div>
      </section>

    </div>
  )
}
