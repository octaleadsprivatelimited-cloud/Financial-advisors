import { useState } from 'react'

export default function Footer() {
  const [open, setOpen] = useState({ about: false, links: false, contact: false })
  return (
    <footer className="bg-gray-950 text-gray-300 mt-16">
      <div className="container-default py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=80" className="h-10 w-10 rounded" alt="Logo" />
            <span className="text-white text-xl font-semibold">Financial advisors</span>
          </div>
          <p className="text-gray-400 max-w-sm">Trusted financial advisors helping individuals and businesses plan, grow, and protect wealth with clarity.</p>
        </div>

        <div>
          <button className="w-full md:w-auto text-left md:text-base text-white font-medium md:mb-4" onClick={() => setOpen(o => ({...o, links: !o.links}))}>Useful Links</button>
          <ul className={`mt-4 space-y-2 ${open.links ? '' : 'hidden md:block'}`}>
            <li><a className="hover:text-white" href="/about">About Us</a></li>
            <li><a className="hover:text-white" href="/services">Services</a></li>
            <li><a className="hover:text-white" href="/pricing">Pricing</a></li>
            <li><a className="hover:text-white" href="/careers">Careers</a></li>
            <li><a className="hover:text-white" href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <button className="w-full md:w-auto text-left md:text-base text-white font-medium md:mb-4" onClick={() => setOpen(o => ({...o, contact: !o.contact}))}>Contact</button>
          <div className={`mt-4 space-y-2 text-gray-400 ${open.contact ? '' : 'hidden md:block'}`}>
            <p>123 Finance Street, Suite 100, Metropolis, NY 10001</p>
            <p><a className="hover:text-white" href="mailto:info@financialadvisors.com">info@financialadvisors.com</a></p>
            <p><a className="hover:text-white" href="tel:+1234567890">+1 234 567 890</a></p>
            <div className="flex items-center gap-4 pt-2">
              <a aria-label="LinkedIn" href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
              <a aria-label="Twitter" href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white">Twitter</a>
              <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a>
              <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
        <div className="container-default">
          <p>
            © {new Date().getFullYear()} Financial advisors. Designed and developed by Octaleads Pvt Ltd. (<a className="underline hover:text-white" href="https://www.octaleads.com/" target="_blank" rel="noreferrer">https://www.octaleads.com/</a>).
          </p>
        </div>
      </div>
    </footer>
  )
}


