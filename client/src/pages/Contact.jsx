import { useState } from 'react'
import axios from 'axios'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState({ loading: false, success: null, error: null })

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: null, error: null })
    try {
      await axios.post('/api/contact', form)
      setStatus({ loading: false, success: 'Thanks! We will reach out shortly.', error: null })
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setStatus({ loading: false, success: null, error: 'Something went wrong.' })
    }
  }

  return (
    <section className="container-default py-16">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <div className="grid lg:grid-cols-2 gap-10 mt-8">
        <form onSubmit={submit} className="bg-white rounded-xl p-8 border">
          <div className="grid sm:grid-cols-2 gap-4">
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
              <textarea rows="4" className="mt-1 w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary" value={form.message} onChange={e=>setForm({...form, message: e.target.value})} />
            </div>
          </div>
          <button type="submit" className="btn-primary mt-6" disabled={status.loading}>{status.loading ? 'Sending...' : 'Send Message'}</button>
          {status.success && <p className="mt-3 text-green-600">{status.success}</p>}
          {status.error && <p className="mt-3 text-red-600">{status.error}</p>}
        </form>

        <div>
          <img className="rounded-xl w-full object-cover" src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400" alt="Contact" />
          <div className="mt-6 text-gray-600">
            <p>Address: 123 Finance Street, Suite 100, Metropolis, NY 10001</p>
            <p>Email: info@financialadvisors.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
      </div>
    </section>
  )
}


