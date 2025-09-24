import { useEffect, useState } from 'react'
import axios from 'axios'

const slides = [
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600',
  'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600',
  'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1600',
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState({ loading: false, success: null, error: null })

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: null, error: null })
    try {
      await axios.post('/api/contact', form)
      setStatus({ loading: false, success: 'Thank you! We will reach out shortly.', error: null })
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setStatus({ loading: false, success: null, error: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <section className="relative">
      <div className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        {slides.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt="Financial success"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
            loading="eager"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />

        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3">
          {slides.map((_, idx) => (
            <button key={idx} aria-label={`Go to slide ${idx+1}`} className={`h-2 w-8 rounded-full ${idx === current ? 'bg-white' : 'bg-white/50'}`} onClick={() => setCurrent(idx)} />
          ))}
        </div>
      </div>

      <div className="container-default">
        <div className="grid lg:grid-cols-2 gap-10 -mt-28 relative z-10">
          <div className="bg-white/95 backdrop-blur rounded-xl p-8 shadow-xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Plan smarter. Grow faster. Protect better.</h1>
            <p className="mt-4 text-gray-600">Comprehensive financial planning and wealth management tailored to your goals.</p>
            <div className="mt-6 flex gap-3">
              <a href="#contact" className="btn-primary">Talk to an Advisor</a>
              <a href="/services" className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 font-medium hover:bg-gray-50">Explore Services</a>
            </div>
          </div>
          <form id="contact" onSubmit={submit} className="bg-white rounded-xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold">Get a free consultation</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input required className="mt-1 w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input required type="email" className="mt-1 w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input required className="mt-1 w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium">Message</label>
                <textarea rows="3" className="mt-1 w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary" value={form.message} onChange={e=>setForm({...form, message: e.target.value})} />
              </div>
            </div>
            <button type="submit" className="btn-primary mt-6 w-full" disabled={status.loading}>{status.loading ? 'Sending...' : 'Request Consultation'}</button>
            {status.success && <p className="mt-3 text-green-600">{status.success}</p>}
            {status.error && <p className="mt-3 text-red-600">{status.error}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}


