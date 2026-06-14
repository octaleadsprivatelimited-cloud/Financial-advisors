import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer id="footer" className="mt-auto bg-[#38312c] text-[#fff6eb] pt-16 border-t border-[#305457]/20">
      <div className="footer-top pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="row flex flex-col md:flex-row gap-12 lg:gap-8 justify-between">
            
            {/* Left Column: Keep in Touch */}
            <div className="col-md-4 col-subscribe-form w-full md:w-5/12 lg:w-4/12">
              <h4 className="text-2xl font-serif font-bold mb-3 text-[#c5a054]">Keep in touch</h4>
              <p className="text-xs sm:text-sm text-[#fff6eb]/80 font-light mb-6">
                Get financial insights, tax strategies, and estate planning tips straight to your inbox.
              </p>
              
              <form onSubmit={handleSubscribe} className="input-group flex">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-[#fff6eb]/10 border border-white/20 px-4 py-3 text-xs text-[#fff6eb] rounded-none focus:outline-none focus:border-[#c5a054]"
                  required
                />
                <button type="submit" className="button bg-[#315355] text-white px-6 text-xs uppercase tracking-widest font-semibold border border-[#315355]">
                  Sign Up
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-emerald-400 mt-2 font-semibold">Thank you for subscribing!</p>
              )}
            </div>

            {/* Right Column: Navigation Menus */}
            <div className="offset-md-2 col-md-6 w-full md:w-6/12 lg:w-7/12">
              <div className="footer-navigation">
                <div className="row grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
                  
                  {/* Menu Col 1 */}
                  <div className="col-menu">
                    <h5 className="font-serif font-bold text-base text-[#c5a054] mb-4">Services</h5>
                    <ul className="space-y-2.5 text-xs text-[#fff6eb]/80 font-light">
                      <li><Link to="/wealth" className="hover:text-[#c5a054] transition-colors">Wealth Management</Link></li>
                      <li><Link to="/tax" className="hover:text-[#c5a054] transition-colors">Tax Advisory</Link></li>
                      <li><Link to="/retirement" className="hover:text-[#c5a054] transition-colors">Retirement & NPS</Link></li>
                      <li><Link to="/insurance" className="hover:text-[#c5a054] transition-colors">Insurance Auditing</Link></li>
                      <li><Link to="/estate" className="hover:text-[#c5a054] transition-colors">Estate & Succession</Link></li>
                    </ul>
                  </div>

                  {/* Menu Col 2 */}
                  <div className="col-menu">
                    <h5 className="font-serif font-bold text-base text-[#c5a054] mb-4">Corporate</h5>
                    <ul className="space-y-2.5 text-xs text-[#fff6eb]/80 font-light">
                      <li><Link to="/about" className="hover:text-[#c5a054] transition-colors">About Our Firm</Link></li>
                      <li><Link to="/portfolio" className="hover:text-[#c5a054] transition-colors">Investment Philosophy</Link></li>
                      <li><Link to="/testimonials" className="hover:text-[#c5a054] transition-colors">Client Testimonials</Link></li>
                      <li><Link to="/careers" className="hover:text-[#c5a054] transition-colors">Careers (CFP/CFA)</Link></li>
                      <li><Link to="/contact" className="hover:text-[#c5a054] transition-colors">Contact Advisor</Link></li>
                    </ul>
                  </div>

                  {/* Menu Col 3 */}
                  <div className="col-menu">
                    <h5 className="font-serif font-bold text-base text-[#c5a054] mb-4">Office Hubs</h5>
                    <div className="space-y-3 text-xs text-[#fff6eb]/80 font-light">
                      <div>
                        <span className="font-bold text-[#c5a054] block">Mumbai</span>
                        <span className="text-[10px] block opacity-90">Nariman Point, MH 400021</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#c5a054] block">Bengaluru</span>
                        <span className="text-[10px] block opacity-90">Indiranagar, KA 560038</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#c5a054] block">Delhi NCR</span>
                        <span className="text-[10px] block opacity-90">Connaught Place, DL 110001</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SEBI Compliance & Disclosures Bar */}
      <div className="bg-[#305457]/20 border-t border-white/5 py-8 text-[11px] text-[#fff6eb]/60 leading-relaxed">
        <div className="container mx-auto px-4 max-w-7xl">
          <p className="mb-4">
            <strong>SEBI Registration & Disclosure:</strong> Fortune Personal CFO Services Private Limited (formerly known as Financial Advisors) is a Registered Investment Adviser (SEBI Registration No. INA000000000) under the SEBI (Investment Advisers) Regulations, 2013. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
          </p>
          <p className="mb-6">
            All investments in debt, equity, mutual funds, portfolio management services (PMS), and alternative investment funds (AIF) are subject to market risks. Please read all scheme-related documents carefully before investing. Client testimonials mentioned are not indicative of future results or performance and are not compensated in any form.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs">
            <p className="text-[#fff6eb]/85">
              © {new Date().getFullYear()} Fortune Personal CFO. All rights reserved. Developed by Octaleads Pvt Ltd.
            </p>
            <div className="flex flex-wrap gap-4 text-[#fff6eb]/80 font-medium">
              <Link className="hover:text-[#c5a054] hover:underline" to="/contact">Privacy Policy</Link>
              <Link className="hover:text-[#c5a054] hover:underline" to="/contact">Disclosure Documents</Link>
              <Link className="hover:text-[#c5a054] hover:underline" to="/contact">SEBI SCORES</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}



