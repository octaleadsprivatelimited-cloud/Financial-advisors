import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const articles = [
  {
    title: 'Navigating Direct Taxes on ESOPs for Indian Founders',
    category: 'Taxation',
    date: 'June 10, 2026',
    author: 'Smita Kulkarni, CA',
    readTime: '5 Min Read',
    desc: 'Understanding the twin tax incidence on stock options: prerequisite tax at exercise and capital gains tax upon sale.',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600'
  },
  {
    title: 'Managing Indian Assets: FCNR, NRE and NRO Accounts Demystified',
    category: 'NRI Strategy',
    date: 'May 28, 2026',
    author: 'Ramesh Iyer, CFP',
    readTime: '7 Min Read',
    desc: 'A structural review of remittance rights, FEMA compliance, and optimizing dual-taxation relief under DTAA.',
    img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600'
  },
  {
    title: 'Why You Need a Private Family Trust Under Indian Trust Act 1882',
    category: 'Estate Planning',
    date: 'May 14, 2026',
    author: 'Smita Kulkarni, CA',
    readTime: '6 Min Read',
    desc: 'How establishing a private family trust provides bankruptcy protection, asset isolation, and seamless inheritance control.',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600'
  },
  {
    title: 'The HUF Tax Benefit Guide for Modern Indian Families',
    category: 'Taxation',
    date: 'April 20, 2026',
    author: 'Smita Kulkarni, CA',
    readTime: '4 Min Read',
    desc: 'Setting up a Hindu Undivided Family (HUF) to legally partition tax liabilities and claim duplicate basic tax exemptions.',
    img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600'
  },
  {
    title: 'Direct Mutual Funds vs. Regular Funds: The Fiduciary Math',
    category: 'Investments',
    date: 'April 05, 2026',
    author: 'Priyanshu Sharma, CFA',
    readTime: '8 Min Read',
    desc: 'Analyzing how regular fund commission drags (1-1.5% annually) compound over 20 years to deplete your wealth.',
    img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600'
  },
  {
    title: 'Capital Gains Exemption Strategies Under Section 54 of the IT Act',
    category: 'Taxation',
    date: 'March 18, 2026',
    author: 'Smita Kulkarni, CA',
    readTime: '6 Min Read',
    desc: 'How business promoters and property owners can reinvest stake-sale proceeds to claim tax exclusions.',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600'
  }
]

export default function Blog() {
  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Page Header */}
      <section className="bg-dark text-white py-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full doo-dad-teal pointer-events-none transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="container-default relative z-10 text-center">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-4">Resource Center</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6">Insights & Analysis</h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Stay informed with expert insights on Indian taxation, corporate equity planning, estate transition, and global asset management.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container-default py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <motion.article 
              key={art.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white rounded-sm overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative overflow-hidden h-52">
                  <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-primary text-white font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm z-10">
                    {art.category}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-[10px] text-gray-400 font-medium block mb-2">{art.date}</span>
                  <h3 className="text-lg font-serif font-bold text-primary mb-3 hover:text-secondary transition-colors">
                    <Link to="/blog">{art.title}</Link>
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light mb-4">
                    {art.desc}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 bg-cream/30 flex items-center justify-between text-xs text-gray-400">
                <span className="font-light">By {art.author}</span>
                <span className="font-semibold text-primary">{art.readTime}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}


