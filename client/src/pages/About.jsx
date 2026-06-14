import { motion } from 'framer-motion'

const team = [
  {
    name: 'Ramesh Iyer, CFP',
    role: 'Founder & Managing Director',
    bio: '20+ years in HNI wealth management. Former Wealth Lead at a major global investment bank. Dedicated to building India\'s cleanest fee-only advisory platform.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400'
  },
  {
    name: 'Smita Kulkarni, CA',
    role: 'Head of Tax & Estate Planning',
    bio: 'Specializes in HUF structures, cross-border NRI taxation, and private trust creation. Experienced CA with a background in corporate tax law and restructuring.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400'
  },
  {
    name: 'Priyanshu Sharma, CFA',
    role: 'Chief Investment Officer',
    bio: 'Oversees asset allocation and risk modeling. Former equity research head with expertise in institutional PMS and alternative investment selection.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400'
  }
]

export default function About() {
  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Premium Dark Header */}
      <section className="bg-dark text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full doo-dad-gold pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="container-default relative z-10 text-center">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-4">Who We Are</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6">About Fortune Personal CFO</h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            We are India\'s premium fee-only wealth advisory and tax integration firm, coordinating the balance sheets of HNI and NRI families.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="container-default py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-secondary/10 rounded-sm -rotate-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" 
              alt="Fortune Corporate Hub" 
              className="relative z-10 w-full h-[400px] rounded-sm object-cover shadow-xl" 
            />
          </div>
          <div className="lg:col-span-7">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-3">The Fiduciary Shift</span>
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">
              Aligning advice with advice, not product sales.
            </h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed font-light">
              <p>
                In India, wealth management has traditionally been synonymous with product distribution. Distributors calling themselves advisors pitch high-commission products like insurance-linked savings plans or expensive PMS products to secure front-end payouts.
              </p>
              <p>
                We founded Fortune on a simple realization: families don't need another sales pitch. They need a coordinator. A professional advisor who understands their taxes, coordinates their investments, secures their estate, and answers to no one but them.
              </p>
              <p>
                By adopting the <strong>Personal CFO model</strong> pioneered by industry-leading global firms like Brighton Jones, we deliver a 100% conflict-free financial advisory system. We receive zero commissions, rebates, or referral fees. Our clients pay us one flat fee, ensuring our goals are aligned with yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="container-default">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-3">Our Standards</span>
            <h2 className="text-3xl font-serif font-bold text-primary">The principles that guide us</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="p-8 bg-cream border border-gray-100/50 rounded-sm">
              <h3 className="text-lg font-serif font-bold text-primary mb-3">Absolute Fiduciary</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light">
                We are legally bound to act in your best interests. We reject commissions and distribute 100% direct mutual funds and transparent investment structures.
              </p>
            </div>
            <div className="p-8 bg-cream border border-gray-100/50 rounded-sm">
              <h3 className="text-lg font-serif font-bold text-primary mb-3">Integrated Competence</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light">
                We don\'t just advise on investments. We integrate direct tax planning, HUF setups, trust creation, and business promoter structures into a single framework.
              </p>
            </div>
            <div className="p-8 bg-cream border border-gray-100/50 rounded-sm">
              <h3 className="text-lg font-serif font-bold text-primary mb-3">Compassionate Care</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light">
                We consider the emotional side of wealth—helping you define what a "richer life" means for you and your family beyond just accumulation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="container-default py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-3">Meet Your Team</span>
          <h2 className="text-3xl font-serif font-bold text-primary">Lead advisors on your side</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-sm overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <img src={member.image} alt={member.name} className="w-full h-72 object-cover object-top" />
                <div className="p-6">
                  <h3 className="text-lg font-serif font-bold text-primary mb-1">{member.name}</h3>
                  <span className="text-secondary font-semibold text-xs uppercase tracking-wider block mb-4">{member.role}</span>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light">
                    {member.bio}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 bg-cream/50 text-right">
                <a href="/contact" className="text-xs font-bold text-primary hover:text-secondary">Consult Advisor →</a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}


