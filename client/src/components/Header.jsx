import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext.jsx'

const servicesList = [
  { to: '/wealth', label: 'Wealth Management' },
  { to: '/tax', label: 'Tax Advisory' },
  { to: '/retirement', label: 'Retirement Advisory' },
  { to: '/insurance', label: 'Insurance Planning' },
  { to: '/estate', label: 'Estate & Trust Planning' },
  { to: '/education', label: 'NRI & Education Planning' },
  { to: '/business', label: 'Business Succession' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { settings } = useSettings()

  return (
    <>
      {/* Top micro-bar for Indian advisory context */}
      <div className="bg-[#315355] text-[#fff6eb] text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="opacity-95 font-light">SEBI Registered Fiduciary Advisor</span>
            <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#c5a054] transition-colors font-medium">
              {settings.phone}
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-4 opacity-90 font-light">
            <span>Mumbai • Bengaluru • Delhi NCR</span>
            <a 
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} 
              target="_blank" 
              rel="noreferrer" 
              className="bg-[#c5a054] text-[#315355] px-2.5 py-0.5 font-bold hover:bg-[#c5a054]/80 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <header id="header" className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="row">
            <div className="col-12 header-col flex items-center justify-between py-2">
              
              {/* Logo Item */}
              <div className="logo-item flex items-center justify-between w-full lg:w-auto">
                <Link to="/" className="head-item logo flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#315355] text-[#fff6eb] flex items-center justify-center font-serif text-lg font-bold">
                    F
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif font-bold text-lg leading-none tracking-tight text-[#315355]">FORTUNE</span>
                    <span className="text-[8px] tracking-[0.2em] font-semibold uppercase text-[#c5a054] mt-0.5">Personal CFO</span>
                  </div>
                </Link>

                {/* Mobile Menu Toggler */}
                <button 
                  id="mobile-menu-toggler" 
                  aria-label="Toggle Menu"
                  className="lg:hidden block p-2 text-[#315355]"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>

              {/* Desktop Menu Holder */}
              <div className="menu-holder-item hidden lg:flex items-center gap-8">
                <ul id="menu-header-menu" className="menu flex items-center gap-6 text-sm font-semibold text-[#38312c]">
                  
                  {/* Services dropdown */}
                  <li 
                    className="menu-item menu-item-has-children relative py-2"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link to="/services" className="hover:text-[#c5a054] transition-colors flex items-center gap-1">
                      Services
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </Link>
                    
                    {dropdownOpen && (
                      <ul className="sub-menu absolute left-0 top-full bg-white border border-gray-100 shadow-xl py-2 w-56 z-50">
                        {servicesList.map(service => (
                          <li key={service.to} className="hover:bg-[#fff6eb]">
                            <Link to={service.to} className="block px-4 py-2 text-xs font-semibold text-[#38312c] hover:text-[#c5a054]">
                              {service.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>

                  <li className="menu-item">
                    <NavLink to="/about" className={({isActive}) => isActive ? 'text-[#c5a054]' : 'hover:text-[#c5a054] transition-colors'}>About</NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/portfolio" className={({isActive}) => isActive ? 'text-[#c5a054]' : 'hover:text-[#c5a054] transition-colors'}>Philosophy</NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/blog" className={({isActive}) => isActive ? 'text-[#c5a054]' : 'hover:text-[#c5a054] transition-colors'}>Insights</NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/careers" className={({isActive}) => isActive ? 'text-[#c5a054]' : 'hover:text-[#c5a054] transition-colors'}>Careers</NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/faq" className={({isActive}) => isActive ? 'text-[#c5a054]' : 'hover:text-[#c5a054] transition-colors'}>FAQs</NavLink>
                  </li>
                </ul>

                {/* Right Menu CTA */}
                <ul id="menu-header-right-menu" className="menu flex items-center gap-4">
                  <li className="mobile-menu-outline-button menu-item">
                    <Link to="/contact" className="btn-secondary text-xs uppercase tracking-wider py-2 px-5">
                      Client Login
                    </Link>
                  </li>
                  <li className="menu-button menu-item">
                    <Link to="/contact" className="btn-primary text-xs uppercase tracking-wider py-2.5 px-5">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile menu sidebar */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-6 space-y-4">
            <ul className="space-y-3 font-semibold text-[#38312c]">
              <li>
                <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-gray-50 text-[#315355]">
                  Services
                </Link>
                <ul className="pl-4 mt-2 space-y-2 border-l border-gray-100">
                  {servicesList.map(service => (
                    <li key={service.to}>
                      <Link to={service.to} onClick={() => setMobileMenuOpen(false)} className="block text-xs text-gray-500 py-1">
                        {service.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-gray-50">About</Link>
              </li>
              <li>
                <Link to="/portfolio" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-gray-50">Philosophy</Link>
              </li>
              <li>
                <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-gray-50">Insights</Link>
              </li>
              <li>
                <Link to="/careers" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-gray-50">Careers</Link>
              </li>
              <li>
                <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-gray-50">FAQs</Link>
              </li>
            </ul>

            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="btn-secondary text-center text-xs py-2.5">
                Client Login
              </Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-center text-xs py-3">
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}


