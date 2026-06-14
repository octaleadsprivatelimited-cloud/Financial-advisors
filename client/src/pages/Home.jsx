import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useSettings } from '../context/SettingsContext.jsx'

export default function Home() {
  const { settings } = useSettings()
  // Contact Form State
  const [formData, setFormData] = useState({
    email: '',
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    Zip: '',
    InvestibleNetWorth: '',
    Message: ''
  })
  const [status, setStatus] = useState({ loading: false, success: false, error: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.FirstName || !formData.LastName || !formData.Message) {
      setStatus({ loading: false, success: false, error: 'Please fill out all required fields.' })
      return
    }
    setStatus({ loading: true, success: false, error: '' })
    try {
      const payload = {
        name: `${formData.FirstName} ${formData.LastName}`.trim(),
        email: formData.email,
        phone: formData.PhoneNumber || 'N/A',
        message: `${formData.Message}\n\n[Meta] Net Worth: ${formData.InvestibleNetWorth || 'Not Disclosed'} | Pincode: ${formData.Zip || 'N/A'}`
      }
      await axios.post('http://localhost:4000/api/contact', payload)
      setStatus({ loading: false, success: true, error: '' })
      setFormData({
        email: '',
        FirstName: '',
        LastName: '',
        PhoneNumber: '',
        Zip: '',
        InvestibleNetWorth: '',
        Message: ''
      })
    } catch (err) {
      console.error(err)
      setStatus({ loading: false, success: false, error: 'Failed to send enquiry. Please try again.' })
    }
  }

  return (
    <div className="home-wrapper overflow-hidden">
      {/* 1. Hero Section */}
      <div className="block-hero bg-slate-50 relative overflow-hidden border-b border-slate-100">
        <div className="container max-w-6xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 text-left"
            >
              <h1 className="main-title-tag text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0f172a] leading-tight mb-4">
                Live a <br />richer life
              </h1>
              <div className="block-text text-sm sm:text-base text-slate-600 font-light leading-relaxed mb-6">
                Fortune aligns your wealth, passions, and purpose so you can pursue your richer life. We bring institutional-grade Personal CFO services to Indian business owners, executives, and global NRI families.
              </div>
              <div className="cta-btn">
                <a href="#contact-section" className="button uppercase tracking-widest text-xs font-semibold py-2.5 px-6 inline-block">
                  Get Started
                </a>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2"
            >
              <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden">
                <img 
                  src="https://www.brightonjones.com/wp-content/uploads/2022/10/GettyImages-1171145872.jpg" 
                  alt="Richer Life Forest Path" 
                  className="w-full h-full object-cover shadow-sm transition-transform duration-700 hover:scale-105"
                  style={{
                    clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. Centered Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fortune-banner-centered py-12 bg-slate-50 border-b border-slate-100"
      >
        <div className="container text-center max-w-3xl mx-auto px-4">
          <div className="title mb-4">
            <h4 className="main-block-tag text-2xl sm:text-3xl font-serif text-[#0f172a] font-bold">
              A team who understands your big picture
            </h4>
          </div>
          <div className="description text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            Individual financial decisions impact your big-picture goals. That's why our in-house experts collaborate across your entire balance sheet—including tax optimization, corporate ESOPs, private trusts, and global assets—to build and implement a cohesive roadmap. We call it the Personal CFO approach to wealth management.
          </div>
        </div>
      </motion.div>

      {/* 3. Zig-Zag Block (Alternating image and text) */}
      <div className="fortune-block-zig-zag py-12 bg-white border-t border-slate-100">
        <div className="container max-w-6xl mx-auto px-4 space-y-12 lg:space-y-16">
          
          {/* Row 1: Comprehensive Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
          >
            <div className="w-full lg:w-1/3">
              <img 
                src="https://www.brightonjones.com/wp-content/uploads/2022/02/Personalized-Plan-Brighton-Jones-notebook-and-calendar.png" 
                className="img-not-lazy w-full h-auto object-cover max-w-xs mx-auto shadow-sm transition-transform duration-500 hover:scale-105" 
                alt="Notebook and Calendar" 
              />
            </div>
            <div className="w-full lg:w-2/3 text-left">
              <div className="fortune-zigzag-txt space-y-3">
                <h4 className="text-xl sm:text-2xl font-serif text-[#0f172a] font-bold">Comprehensive Plan</h4>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                  A personalized financial plan is the foundation of our work together. We map out your goals, cash flow, tax situations, and risk profile to design a path forward. Your Personal CFO continuously reviews and refines this plan to align with changes in your life, tax laws, and market dynamics.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Row 2: Investment Expertise */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12"
          >
            <div className="w-full lg:w-1/3">
              <img 
                src="https://www.brightonjones.com/wp-content/uploads/2022/02/Investment-Expertise-Brighton-Jones-advisor.png" 
                className="img-not-lazy w-full h-auto object-cover max-w-xs mx-auto shadow-sm transition-transform duration-500 hover:scale-105" 
                alt="Investment Expertise" 
              />
            </div>
            <div className="w-full lg:w-2/3 text-left">
              <div className="fortune-zigzag-txt space-y-3">
                <h4 className="text-xl sm:text-2xl font-serif text-[#0f172a] font-bold">Investment Expertise</h4>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                  Fortune portfolios are built exclusively with low-cost direct mutual funds, corporate debentures, and institutional-grade PMS/AIF allocations. Our process is grounded in Nobel Prize-winning research in both traditional and behavioral finance to manage systemic market risk.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 4. How Can We Help Section (4 Columns) */}
      <div className="block-how-can-we-help py-20 bg-[#e9ecec]">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="row mb-12"
          >
            <div className="col-12">
              <h2 className="h2 main-title-tag text-3xl sm:text-4xl font-serif text-[#305457] font-bold mb-4">
                How can we help?
              </h2>
              <div className="txt text-[#38312c] text-sm sm:text-base font-light">
                Explore resources and advice for your entire balance sheet—and beyond.
              </div>
            </div>
          </motion.div>

          <div className="row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="col hover-lift bg-white p-8 rounded-sm shadow-sm border border-gray-100/30 flex flex-col cursor-pointer"
            >
              <h4 className="text-lg font-serif font-bold text-[#305457] border-b border-[#305457]/10 pb-3 mb-4">Life Events</h4>
              <ul className="space-y-3 text-xs text-[#38312c] font-light">
                <li><Link to="/estate" className="hover:text-[#c5a054] transition-colors">Estate & Trust Planning</Link></li>
                <li><Link to="/contact" className="hover:text-[#c5a054] transition-colors">Navigating Business Exit</Link></li>
                <li><Link to="/education" className="hover:text-[#c5a054] transition-colors">NRI Global Repatriation</Link></li>
              </ul>
            </motion.div>

            {/* Col 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="col hover-lift bg-white p-8 rounded-sm shadow-sm border border-gray-100/30 flex flex-col cursor-pointer"
            >
              <h4 className="text-lg font-serif font-bold text-[#305457] border-b border-[#305457]/10 pb-3 mb-4">Tax Strategies</h4>
              <ul className="space-y-3 text-xs text-[#38312c] font-light">
                <li><Link to="/tax" className="hover:text-[#c5a054] transition-colors">HUF Partition Planning</Link></li>
                <li><Link to="/tax" className="hover:text-[#c5a054] transition-colors">LTCG Mutual Fund Harvest</Link></li>
                <li><Link to="/tax" className="hover:text-[#c5a054] transition-colors">US-India Double Tax (DTAA)</Link></li>
              </ul>
            </motion.div>

            {/* Col 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="col hover-lift bg-white p-8 rounded-sm shadow-sm border border-gray-100/30 flex flex-col cursor-pointer"
            >
              <h4 className="text-lg font-serif font-bold text-[#305457] border-b border-[#305457]/10 pb-3 mb-4">Executive Comp</h4>
              <ul className="space-y-3 text-xs text-[#38312c] font-light">
                <li><Link to="/planning" className="hover:text-[#c5a054] transition-colors">Startup ESOP Structuring</Link></li>
                <li><Link to="/planning" className="hover:text-[#c5a054] transition-colors">Pre-IPO Share Allocation</Link></li>
                <li><Link to="/planning" className="hover:text-[#c5a054] transition-colors">Promoter Dilution Strategy</Link></li>
              </ul>
            </motion.div>

            {/* Col 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="col hover-lift bg-white p-8 rounded-sm shadow-sm border border-gray-100/30 flex flex-col cursor-pointer"
            >
              <h4 className="text-lg font-serif font-bold text-[#305457] border-b border-[#305457]/10 pb-3 mb-4">Investments</h4>
              <ul className="space-y-3 text-xs text-[#38312c] font-light">
                <li><Link to="/wealth" className="hover:text-[#c5a054] transition-colors">Direct Mutual Funds</Link></li>
                <li><Link to="/wealth" className="hover:text-[#c5a054] transition-colors">PMS & AIF Due Diligence</Link></li>
                <li><Link to="/wealth" className="hover:text-[#c5a054] transition-colors">LRS Global Equity Portfolios</Link></li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 5. Contact Section (Let's Talk) */}
      <div className="fortune-contact-section py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-100" id="contact-section">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Context and contact details */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div>
                <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-2">Private Briefing</span>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#0f172a] font-bold leading-tight">
                  Let’s talk
                </h2>
              </div>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                Connect with our senior advisory desk to learn how an integrated, commission-free Personal CFO approach can optimize your family balance sheet.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-200/60">
                <div className="flex items-start gap-3">
                  <span className="text-[#c5a054] text-lg mt-0.5">✓</span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0f172a]">Conflict-Free Audit</h4>
                    <p className="text-slate-500 text-xs font-light">A comprehensive audit of your current portfolio's commission drag and overlap.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#c5a054] text-lg mt-0.5">✓</span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0f172a]">Integrated Tax Strategy</h4>
                    <p className="text-slate-500 text-xs font-light">HUF configurations, ESOP taxation management, and cross-border NRI tax mapping.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#c5a054] text-lg mt-0.5">✓</span>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0f172a]">Fiduciary Alignment</h4>
                    <p className="text-slate-500 text-xs font-light">100% direct mutual funds, corporate debentures, and institutional PMS/AIF tracking.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200/60 space-y-3 text-xs text-slate-500">
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">WhatsApp:</span> 
                  <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-[#0d3a35] hover:underline font-medium">
                    {settings.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Email:</span> 
                  <a href={`mailto:${settings.email}`} className="text-[#0d3a35] hover:underline font-medium">
                    {settings.email}
                  </a>
                </p>
                <p className="leading-relaxed">
                  <span className="font-semibold text-slate-700 block mb-0.5">Corporate Office:</span>
                  {settings.address}
                </p>
              </div>
            </div>

            {/* Right Column: Premium Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-8 shadow-sm border border-slate-100 rounded-sm">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {status.success && (
                    <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold rounded-sm">
                      Thank you! Your inquiry has been sent successfully. An advisor will contact you within 24 hours.
                    </div>
                  )}
                  {status.error && (
                    <div className="p-4 bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold rounded-sm">
                      {status.error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">First name *</label>
                      <input 
                        type="text" 
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#0d3a35] focus:ring-1 focus:ring-[#0d3a35]"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Last name *</label>
                      <input 
                        type="text" 
                        name="LastName"
                        value={formData.LastName}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#0d3a35] focus:ring-1 focus:ring-[#0d3a35]"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Email address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#0d3a35] focus:ring-1 focus:ring-[#0d3a35]"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Phone number</label>
                      <input 
                        type="text" 
                        name="PhoneNumber"
                        value={formData.PhoneNumber}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#0d3a35] focus:ring-1 focus:ring-[#0d3a35]"
                        placeholder="e.g. +91 99000 00000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Pincode</label>
                      <input 
                        type="text" 
                        name="Zip"
                        value={formData.Zip}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#0d3a35] focus:ring-1 focus:ring-[#0d3a35]"
                        placeholder="e.g. 400001"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Investible Assets (INR)</label>
                      <select 
                        name="InvestibleNetWorth"
                        value={formData.InvestibleNetWorth}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 px-3 py-2 text-xs rounded-sm bg-white focus:outline-none focus:border-[#0d3a35] focus:ring-1 focus:ring-[#0d3a35]"
                      >
                        <option value="">Select range</option>
                        <option value="Less than 2 Crores">Less than ₹2 Crores</option>
                        <option value="2 to 5 Crores">₹2 Crores to ₹5 Crores</option>
                        <option value="5 to 10 Crores">₹5 Crores to ₹10 Crores</option>
                        <option value="More than 10 Crores">More than ₹10 Crores</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">How can we help you? *</label>
                    <textarea 
                      name="Message"
                      value={formData.Message}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full border border-slate-200 px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#0d3a35] focus:ring-1 focus:ring-[#0d3a35]"
                      placeholder="Add your message here..."
                      required
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      className="w-full bg-[#0d3a35] hover:bg-[#1e544f] text-white font-bold uppercase tracking-widest text-[11px] py-3 text-center transition-colors disabled:opacity-50"
                      disabled={status.loading}
                    >
                      {status.loading ? 'Sending Request...' : 'Request Private Consultation'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 6. Quote Section */}
      <div className="quote py-16 sm:py-20 bg-[#315355] text-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <blockquote className="space-y-6">
            <p className="text-2xl sm:text-3xl font-serif italic font-light leading-relaxed">
              "Fortune has a true family-office feel in how they approach client relationships. It’s not just a transaction for them but that they truly have our best interests in mind."
            </p>
            <cite className="block text-xs uppercase tracking-widest text-[#c5a054] font-semibold not-italic">
              – Dan S., Fortune client
            </cite>
          </blockquote>
          <div className="cta-btn mt-8">
            <Link to="/testimonials" className="button bg-transparent hover:bg-white/10 text-white border border-white/30 uppercase tracking-widest text-xs font-semibold py-3 px-6 inline-block">
              Read More Client Testimonials
            </Link>
          </div>
        </div>
      </div>

      {/* 7. Certified B Corporation Block */}
      <div className="bcorp-card-wrapper py-12 bg-slate-50 border-t border-b border-slate-100">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
            <div className="bcorp-img-holder w-full">
              <img 
                src="https://www.brightonjones.com/wp-content/uploads/2025/07/B-Corp-Backgrounds-03_sm.png" 
                className="w-full h-auto max-w-xs mx-auto object-cover" 
                alt="Certified B Corporation Logo" 
              />
            </div>
            <div className="bcorp-text-holder w-full text-left space-y-3 bg-white p-6 shadow-sm border border-slate-100 rounded-sm">
              <div className="title text-2xl font-serif font-bold text-[#0f172a]">
                Proud to Be a Certified B Corporation
              </div>
              <div className="text text-sm text-slate-600 leading-relaxed font-light">
                We’re honored to join the global community of Certified B Corporations—businesses that meet the highest standards of social and environmental performance, transparency, and accountability. This milestone reflects our long-standing commitment to using our business as a force for good, helping our clients, colleagues, and communities live richer lives.
              </div>
              <div className="links pt-2">
                <Link to="/about" className="link inline-flex items-center gap-2 text-[#af8d4f] hover:text-[#0c2340] font-semibold text-xs transition-colors uppercase tracking-wider">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clip-rule="evenodd" d="M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM9.11612 8.88388L12.2322 12L9.11612 15.1161L10.8839 16.8839L14.8839 12.8839L15.7678 12L14.8839 11.1161L10.8839 7.11612L9.11612 8.88388Z" fill="currentColor" />
                  </svg>
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Blog Section */}
      <div className="blog-section-wrapper py-16 bg-white border-b border-slate-100">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="row text-center max-w-2xl mx-auto mb-10">
            <div className="col-12">
              <h2 className="h2 main-title-tag text-2xl sm:text-3xl font-serif text-[#0f172a] font-bold mb-3">
                Our team's best thinking
              </h2>
              <div className="txt text-slate-600 text-sm font-light leading-relaxed">
                We’re passionate about helping individuals and families achieve their goals—and cultivating a company culture that adds value to our communities.
              </div>
            </div>
          </div>

          <div className="blog-cards-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <article className="blog-card-item flex flex-col justify-between bg-white border border-slate-100 hover:shadow-md transition-shadow">
              <div className="blog-card-inner">
                <div className="blog-card-thumb overflow-hidden rounded-sm">
                  <Link to="/blog">
                    <img 
                      src="https://www.brightonjones.com/wp-content/uploads/2026/06/Should-I-Move-600x300-1-428x230.png" 
                      alt="Should I Move" 
                      className="w-full h-40 object-cover" 
                    />
                  </Link>
                </div>
                <div className="blog-card-body p-4">
                  <h4 className="font-serif font-bold text-base text-[#0f172a] mb-2 leading-snug">
                    <Link to="/blog" className="hover:text-[#af8d4f] transition-colors">
                      Should I Stay or Should I Go? A Framework for Thinking Clearly
                    </Link>
                  </h4>
                  <div className="excerpt text-xs text-slate-500 leading-relaxed font-light">
                    Thinking about moving to a lower-tax state? Use this framework to weigh life and financial factors before making your decision.
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4 pt-0">
                <Link to="/blog" className="blog-card-more text-xs font-semibold uppercase tracking-wider text-[#af8d4f] hover:text-[#0c2340] transition-colors">
                  Read more
                </Link>
              </div>
            </article>

            {/* Card 2 */}
            <article className="blog-card-item flex flex-col justify-between bg-white border border-slate-100 hover:shadow-md transition-shadow">
              <div className="blog-card-inner">
                <div className="blog-card-thumb overflow-hidden rounded-sm">
                  <Link to="/blog">
                    <img 
                      src="https://www.brightonjones.com/wp-content/uploads/2026/05/Kid-looking-out-window-scaled-e1780069340943-428x230.jpg" 
                      alt="Child at window" 
                      className="w-full h-40 object-cover" 
                    />
                  </Link>
                </div>
                <div className="blog-card-body p-4">
                  <h4 className="font-serif font-bold text-base text-[#0f172a] mb-2 leading-snug">
                    <Link to="/blog" className="hover:text-[#af8d4f] transition-colors">
                      Trump Accounts: What Families Need to Know Before July 4
                    </Link>
                  </h4>
                  <div className="excerpt text-xs text-slate-500 leading-relaxed font-light">
                    Trump Accounts (Section 530A) open July 4. What families need to know about eligibility and the $1,000 federal seed.
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4 pt-0">
                <Link to="/blog" className="blog-card-more text-xs font-semibold uppercase tracking-wider text-[#af8d4f] hover:text-[#0c2340] transition-colors">
                  Read more
                </Link>
              </div>
            </article>

            {/* Card 3 */}
            <article className="blog-card-item flex flex-col justify-between bg-white border border-slate-100 hover:shadow-md transition-shadow">
              <div className="blog-card-inner">
                <div className="blog-card-thumb overflow-hidden rounded-sm">
                  <Link to="/blog">
                    <img 
                      src="https://www.brightonjones.com/wp-content/uploads/2026/05/Mitch-Blog-Post-600x300-2-428x230.png" 
                      alt="Mitchell Kotheimer" 
                      className="w-full h-40 object-cover" 
                    />
                  </Link>
                </div>
                <div className="blog-card-body p-4">
                  <h4 className="font-serif font-bold text-base text-[#0f172a] mb-2 leading-snug">
                    <Link to="/blog" className="hover:text-[#af8d4f] transition-colors">
                      Brighton Jones Expands to Ohio With Lead Advisor Mitchell Kotheimer
                    </Link>
                  </h4>
                  <div className="excerpt text-xs text-slate-500 leading-relaxed font-light">
                    Brighton Jones expands to Cleveland, bringing its Personal CFO approach to Ohio with lead advisor Mitchell Kotheimer.
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4 pt-0">
                <Link to="/blog" className="blog-card-more text-xs font-semibold uppercase tracking-wider text-[#af8d4f] hover:text-[#0c2340] transition-colors">
                  Read more
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}



