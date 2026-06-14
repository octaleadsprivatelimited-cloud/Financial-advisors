import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Vikramjit Singh',
    role: 'Managing Director, Singh Logistics',
    location: 'Delhi NCR',
    quote: 'The flat-fee retainer is the only way we could ever trust a wealth manager. They restructured our corporate treasury and saved us from bad bank-sold investments. Having a single Personal CFO coordinating our taxes and estate plan is game-changing.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300'
  },
  {
    name: 'Divya & Anand Rao',
    role: 'SaaS Executives',
    location: 'Bengaluru / San Jose',
    quote: 'Being NRIs, managing tax filing in both India and the US was a compliance headache. Fortune aligned our NRE/NRO accounts, audited our old mutual funds for PFIC compliance, and mapped out a solid dollar-hedged university fund for our kids.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300'
  },
  {
    name: 'K. R. Narayanan',
    role: 'Retired promoter, Tech Solutions',
    location: 'Chennai / Pune',
    quote: 'After selling our family enterprise, we wanted capital protection with a reliable withdrawal stream. The bucket and SWP strategy they implemented generates our monthly cash flow tax-efficiently, while keeping our main corpus growing.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300'
  }
]

export default function Testimonials() {
  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Header */}
      <section className="bg-dark text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full doo-dad-gold pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="container-default relative z-10 text-center">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-4">Client Feedback</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6">What our clients say</h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Read stories from promoters, tech leaders, and NRI families who partner with a Personal CFO.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="container-default py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.blockquote 
              key={t.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-sm border border-gray-100 p-8 shadow-sm flex flex-col justify-between relative"
            >
              <span className="absolute top-4 left-4 text-primary/10 text-7xl font-serif leading-none pointer-events-none">“</span>
              <div className="relative z-10">
                <p className="text-gray-600 text-sm italic leading-relaxed mb-6">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <cite className="font-bold text-primary text-sm not-italic block">{t.name}</cite>
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider block">{t.role}</span>
                    <span className="text-[10px] text-secondary font-bold block">{t.location}</span>
                  </div>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </section>
    </div>
  )
}


