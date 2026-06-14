import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'

export default function DynamicPage() {
  const { slug } = useParams()
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    axios.get(`/api/pages/${slug}`)
      .then(res => {
        setPage(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Page not found')
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent animate-spin rounded-full mb-4"></div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary/70">Loading Content Strategy...</p>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center py-20 px-4">
        <div className="max-w-md text-center space-y-6">
          <div className="text-6xl font-serif text-[#c5a054] font-bold">404</div>
          <h1 className="text-2xl font-serif font-bold text-primary">Strategy Under Construction</h1>
          <p className="text-slate-600 text-sm leading-relaxed font-light">
            We couldn't locate the active personal CFO or wealth advisory blueprint for <code className="bg-gray-150 px-1.5 py-0.5 rounded text-xs font-mono">/p/{slug}</code>.
          </p>
          <div className="pt-4">
            <Link to="/" className="btn-primary py-3 px-6 text-xs uppercase tracking-widest bg-primary hover:bg-primary-light text-white">
              Back to Corporate Office
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const { title, template, seoTitle, seoDesc, seoKeywords, sections } = page
  const s = sections || {}

  return (
    <div className="bg-cream min-h-screen">
      <Helmet>
        <title>{seoTitle || `${title} | Fortune Personal CFO`}</title>
        <meta name="description" content={seoDesc || 'Fiduciary wealth management and integrated tax planning.'} />
        {seoKeywords && <meta name="keywords" content={seoKeywords} />}
      </Helmet>

      {/* RENDER TEMPLATE */}

      {/* TEMPLATE A: Service Landing Page */}
      {template === 'service-landing' && (
        <div>
          {/* Hero segment */}
          <section className="bg-dark text-white py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full doo-dad-gold pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="container mx-auto px-4 max-w-5xl text-center relative z-10 space-y-6">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-secondary font-bold text-xs uppercase tracking-widest block"
              >
                Fiduciary Service Module
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight"
              >
                {s.heroTitle || title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light"
              >
                {s.heroSub || 'Integrated tax planning, investment management, and family wealth guidance.'}
              </motion.p>
            </div>
          </section>

          {/* Two-Column Features / Content Grid */}
          <section className="py-20 container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6 text-left">
                <h2 className="text-3xl font-serif font-bold text-primary">Core Blueprint</h2>
                <div className="w-12 h-1 bg-secondary"></div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light whitespace-pre-wrap">
                  {s.bodyText || 'We collaborate across your entire balance sheet to build a comprehensive plan. All advice is conflict-free and registered under a strict SEBI fiduciary mandate.'}
                </p>
              </div>

              <div className="space-y-6 text-left">
                <h3 className="text-xl font-serif font-bold text-primary mb-4">Advisory Highlights</h3>
                
                {/* Feature 1 */}
                <div className="p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-sm space-y-2">
                  <h4 className="font-serif font-bold text-primary text-base">{s.feature1Title || 'Fiduciary Alignment'}</h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">{s.feature1Desc || '100% direct mutual funds with absolute zero commission drag.'}</p>
                </div>

                {/* Feature 2 */}
                <div className="p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-sm space-y-2">
                  <h4 className="font-serif font-bold text-primary text-base">{s.feature2Title || 'Tax Structuring'}</h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">{s.feature2Desc || 'HUF setup, private family trusts, and cross-border NRI taxation.'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call-to-action */}
          <section className="bg-primary text-white py-16 text-center">
            <div className="container mx-auto px-4 max-w-3xl space-y-6">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold">Ready to consult our senior desk?</h2>
              <p className="text-gray-300 text-sm font-light leading-relaxed">
                Connect directly for a confidential review of your asset allocation, ESOP liquidity, or double taxation credits.
              </p>
              <Link to={s.ctaLink || '/contact'} className="btn-primary bg-secondary text-primary hover:bg-secondary-light px-8 py-3.5 text-xs uppercase tracking-wider inline-block">
                {s.ctaText || 'Request Consultation'}
              </Link>
            </div>
          </section>
        </div>
      )}

      {/* TEMPLATE B: Team/About Page */}
      {template === 'team-profile' && (
        <div>
          <section className="bg-dark text-white py-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full doo-dad-gold pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="container mx-auto px-4 max-w-5xl text-center relative z-10 space-y-4">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Firm Leadership</span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold">{s.aboutTitle || title}</h1>
              <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
                {s.aboutSub || 'Meet the fiduciaries and Personal CFOs managing India\'s leading family balance sheets.'}
              </p>
            </div>
          </section>

          <section className="py-20 container mx-auto px-4 max-w-5xl">
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-3xl font-serif font-bold text-primary">Our Investment Philosophy</h2>
                <p className="text-slate-600 text-sm font-light leading-relaxed">
                  {s.philosophyText || 'We act as true family fiduciaries. We do not accept commissions, referral fees, or broker kickbacks. Every decision is audited for maximum client tax-efficiency and net worth alignment.'}
                </p>
              </div>

              {/* Mock Team Grid */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8">
                {[
                  { name: 'Sanjay Deshmukh, CFA', role: 'Managing Partner & Principal CFO', school: 'IIM Ahmedabad' },
                  { name: 'Meera Nair, CA', role: 'Head of Tax & Private Trust Structuring', school: 'ICAI Ranker' },
                  { name: 'Rohan Sen, CFP', role: 'Director - NRI Wealth & Global Assets', school: 'ISB Hyderabad' }
                ].map((member, idx) => (
                  <div key={member.name} className="bg-white p-6 border border-gray-100 shadow-sm text-center rounded-sm space-y-4">
                    <div className="w-20 h-20 bg-cream/80 border border-secondary rounded-full flex items-center justify-center text-xl font-bold text-primary mx-auto font-serif">
                      {member.name.split(' ')[0][0]}{member.name.split(' ')[1][0]}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-primary text-base leading-snug">{member.name}</h4>
                      <p className="text-xs text-secondary uppercase font-semibold mt-1">{member.role}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{member.school}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TEMPLATE C: Case Study/Portfolio Template */}
      {template === 'case-study' && (
        <div>
          <section className="bg-dark text-white py-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full doo-dad-gold pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="container mx-auto px-4 max-w-5xl text-center relative z-10 space-y-4">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest block">Advisory Case Study</span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold">{s.caseTitle || title}</h1>
              <div className="inline-block bg-[#c5a054] text-[#315355] text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm mt-2">
                Outcome: {s.caseOutcome || '₹4.2Cr Tax Saved'}
              </div>
            </div>
          </section>

          <section className="py-20 container mx-auto px-4 max-w-4xl">
            <div className="bg-white p-8 sm:p-12 shadow-xl border border-gray-100 rounded-sm space-y-8 text-left">
              <div>
                <span className="font-serif font-bold text-primary text-lg block mb-2">01. The Client Profile</span>
                <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                  {s.caseProfile || 'High-net-worth promoter family holding significant concentrated equity with minimal liquid savings.'}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <span className="font-serif font-bold text-primary text-lg block mb-2">02. The Challenge</span>
                <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                  {s.caseChallenge || 'Lack of liquidity, complex HUF restructuring questions, and high taxation exposure on pending pre-IPO vesting schedules.'}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <span className="font-serif font-bold text-primary text-lg block mb-2">03. The CFO Strategy & Outcome</span>
                <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                  {s.caseStrategy || 'Structured a private trust, partitioned HUF assets, and set up a systematic rebalancing model to transfer concentrated equity to direct, globally diversified mutual fund structures.'}
                </p>
              </div>

              <div className="pt-8 border-t border-gray-100 flex justify-between items-center flex-wrap gap-4">
                <Link to="/contact" className="btn-primary bg-primary hover:bg-primary-light text-white px-6 py-3 text-xs uppercase tracking-widest">
                  Request Similar Portfolio Review
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TEMPLATE D: General Content Template */}
      {template === 'general-content' && (
        <div className="py-20 container mx-auto px-4 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 text-left"
          >
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary leading-tight">{title}</h1>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">{s.subtitle || 'Advisory Insights & Disclosures'}</p>
              <div className="w-16 h-1 bg-secondary"></div>
            </div>
            
            <div className="text-slate-700 text-sm sm:text-base leading-relaxed font-light whitespace-pre-wrap space-y-6">
              {s.bodyContent || 'Please add your general content from the admin dashboard.'}
            </div>

            <div className="pt-12 border-t border-gray-150 text-xs text-slate-400">
              Published by the Fortune Personal CFO Advisory Desk. All contents are subject to market disclosures and regulatory updates.
            </div>
          </motion.div>
        </div>
      )}

      {/* TEMPLATE E: Research Report & Whitepaper Template */}
      {template === 'research-report' && (
        <div className="py-16 container mx-auto px-4 max-w-4xl text-left">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Left Column: Author and Metadata */}
            <div className="space-y-6 md:border-r md:border-gray-200 md:pr-8">
              <div className="space-y-2">
                <span className="text-[10px] bg-secondary/10 text-secondary border border-secondary/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Whitepaper
                </span>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-2">Published By</h2>
                <div className="font-serif text-primary text-base font-bold">{s.authorName || 'Investment Committee'}</div>
                <div className="text-slate-500 text-xs font-light">{s.authorRole || 'Fiduciary Advisors'}</div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Release Date</div>
                <div className="text-xs text-slate-650 font-semibold">{s.publishDate || 'June 2026'}</div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Read Estimate</div>
                <div className="text-xs text-slate-650 font-semibold">{s.readTime || '8 min read'}</div>
              </div>

              {s.keyTakeaways && (
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Key Takeaways</div>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed font-light">
                    {s.keyTakeaways.split('\n').map((takeaway, idx) => (
                      <li key={idx} className="flex gap-1.5 items-start">
                        <span className="text-secondary font-bold">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Article Body */}
            <div className="md:col-span-2 space-y-6">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary leading-tight">{title}</h1>
              <div className="w-12 h-1 bg-secondary"></div>
              <div className="text-slate-700 text-sm sm:text-base leading-relaxed font-light whitespace-pre-wrap space-y-4 font-sans">
                {s.bodyContent || 'Please specify the main report text content in the admin dashboard page builder.'}
              </div>

              <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                <Link to="/contact" className="text-xs text-[#0078d4] font-bold uppercase tracking-wider hover:underline">
                  ← Request PDF Copy via Email
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* TEMPLATE F: FAQ & Resources Hub Template */}
      {template === 'faq-accordion' && (
        <div className="py-16 container mx-auto px-4 max-w-3xl text-left">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4 max-w-xl mx-auto mb-10">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest">
                Resource Knowledgebase
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary">{title}</h1>
              <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                {s.resourceSubtitle || 'Fiduciary advisory documentation, regulatory forms, and general disclosures.'}
              </p>
            </div>

            {s.faqItems && (
              <div className="bg-white border border-gray-100 rounded shadow-sm divide-y divide-gray-105">
                {s.faqItems.split('\n\n').map((block, idx) => {
                  const lines = block.split('\n')
                  const qLine = lines.find(l => l.startsWith('Q:') || l.toLowerCase().startsWith('q:')) || ''
                  const aLine = lines.find(l => l.startsWith('A:') || l.toLowerCase().startsWith('a:')) || ''
                  const question = qLine.replace(/^Q:\s*/i, '').trim()
                  const answer = aLine.replace(/^A:\s*/i, '').trim()
                  
                  if (!question) return null

                  return (
                    <div key={idx} className="p-6 space-y-2">
                      <h3 className="font-serif font-bold text-primary text-base">Q: {question}</h3>
                      <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed pl-5 border-l-2 border-secondary/50 font-sans">
                        {answer || 'TBD'}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}

            {s.downloadLink && (
              <div className="bg-primary text-white p-8 rounded-sm shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div>
                  <h4 className="font-serif font-bold text-lg">{s.downloadText || 'Download Advisory Forms'}</h4>
                  <p className="text-xs text-gray-300 font-light mt-1">Direct download for certified account opening or tax declarations.</p>
                </div>
                <a 
                  href={s.downloadLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-secondary text-primary hover:bg-secondary-light font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm transition-colors whitespace-nowrap"
                >
                  📥 Get PDF Documents
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
