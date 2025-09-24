import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Blog from './pages/Blog.jsx'
import Contact from './pages/Contact.jsx'
import Pricing from './pages/Pricing.jsx'
import Testimonials from './pages/Testimonials.jsx'
import FAQ from './pages/FAQ.jsx'
import Careers from './pages/Careers.jsx'
import Planning from './pages/landing/Planning.jsx'
import Wealth from './pages/landing/Wealth.jsx'
import Tax from './pages/landing/Tax.jsx'
import Retirement from './pages/landing/Retirement.jsx'
import Insurance from './pages/landing/Insurance.jsx'
import Estate from './pages/landing/Estate.jsx'
import Education from './pages/landing/Education.jsx'
import Business from './pages/landing/Business.jsx'
import Risk from './pages/landing/Risk.jsx'
import Mortgage from './pages/landing/Mortgage.jsx'
import Advisory from './pages/landing/Advisory.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Helmet>
        <title>Financial advisors | Modern Financial Planning & Wealth Management</title>
      </Helmet>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/wealth" element={<Wealth />} />
          <Route path="/tax" element={<Tax />} />
          <Route path="/retirement" element={<Retirement />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/estate" element={<Estate />} />
          <Route path="/education" element={<Education />} />
          <Route path="/business" element={<Business />} />
          <Route path="/risk" element={<Risk />} />
          <Route path="/mortgage" element={<Mortgage />} />
          <Route path="/advisory" element={<Advisory />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}


