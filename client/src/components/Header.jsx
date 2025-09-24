import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="bg-dark text-white text-sm">
        <div className="container-default flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <a href="tel:+1-234-567-890" className="hover:underline">+1 234 567 890</a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:opacity-90">
              <span>WhatsApp</span>
            </a>
          </div>
          <div className="hidden md:block">
            <a href="tel:+1-234-567-890" className="btn-primary">Call Now</a>
          </div>
        </div>
      </div>
      <div className="container-default py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=200" alt="Financial advisors logo" className="h-10 w-10 rounded" />
          <span className="font-semibold text-xl">Financial advisors</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} className={({isActive}) => `hover:text-primary ${isActive ? 'text-primary font-medium' : ''}`}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button aria-label="Open Menu" className="lg:hidden inline-flex items-center justify-center rounded-md border px-3 py-2" onClick={() => setOpen(true)}>
          <span>Menu</span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold">Menu</span>
                <button className="rounded-md border px-3 py-1.5" onClick={() => setOpen(false)}>Close</button>
              </div>
              <div className="grid gap-4 text-lg">
                {navLinks.map(link => (
                  <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className={({isActive}) => `block py-2 ${isActive ? 'text-primary font-medium' : ''}`}>
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}


