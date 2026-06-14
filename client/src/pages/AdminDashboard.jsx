import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSettings } from '../context/SettingsContext.jsx'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { refreshSettings } = useSettings()
  const [activeTab, setActiveTab] = useState('analytics')
  
  // Data States
  const [inquiries, setInquiries] = useState([])
  const [faqs, setFaqs] = useState([])
  const [careers, setCareers] = useState([])
  const [settings, setSettings] = useState({ phone: '', email: '', whatsapp: '', address: '' })
  const [pages, setPages] = useState([])
  const [gallery, setGallery] = useState([])
  const [services, setServices] = useState([])
  
  // Loading & Action States
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Edit / Add Modal/Form States
  const [faqForm, setFaqForm] = useState({ id: null, q: '', a: '' })
  const [careerForm, setCareerForm] = useState({ id: null, title: '', type: 'Full-time', location: '', desc: '' })
  const [showFaqModal, setShowFaqModal] = useState(false)
  const [showCareerModal, setShowCareerModal] = useState(false)

  // Services Modal/Form States
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [serviceForm, setServiceForm] = useState({
    id: null,
    title: '',
    desc: '',
    itemsText: '',
    icon: '',
    img: '',
    active: true,
    path: ''
  })

  // Pages & Gallery Modal/Form States
  const [showPageModal, setShowPageModal] = useState(false)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const initialPageForm = {
    id: null,
    slug: '',
    title: '',
    template: 'service-landing',
    seoTitle: '',
    seoDesc: '',
    seoKeywords: '',
    sections: {
      heroTitle: '',
      heroSub: '',
      bodyText: '',
      feature1Title: '',
      feature1Desc: '',
      feature2Title: '',
      feature2Desc: '',
      ctaText: 'Book a Consultation',
      ctaLink: '/contact',
      aboutTitle: '',
      aboutSub: '',
      philosophyText: '',
      caseTitle: '',
      caseOutcome: '',
      caseProfile: '',
      caseChallenge: '',
      caseStrategy: '',
      subtitle: '',
      bodyContent: ''
    }
  }
  const [pageForm, setPageForm] = useState(initialPageForm)
  const [galleryForm, setGalleryForm] = useState({ id: null, title: '', url: '', category: 'Office' })

  const resetPageForm = () => {
    setPageForm(JSON.parse(JSON.stringify(initialPageForm)))
  }

  // Auth Guard
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      navigate('/admin/login')
    } else {
      fetchDashboardData()
    }
  }, [navigate])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const [inqRes, faqRes, carRes, setRes, pageRes, galleryRes, srvRes] = await Promise.all([
        axios.get('http://localhost:4000/api/inquiries'),
        axios.get('http://localhost:4000/api/faqs'),
        axios.get('http://localhost:4000/api/careers'),
        axios.get('http://localhost:4000/api/settings'),
        axios.get('http://localhost:4000/api/pages'),
        axios.get('http://localhost:4000/api/gallery'),
        axios.get('http://localhost:4000/api/services')
      ])
      setInquiries(inqRes.data)
      setFaqs(faqRes.data)
      setCareers(carRes.data)
      setSettings(setRes.data)
      setPages(pageRes.data)
      setGallery(galleryRes.data)
      setServices(srvRes.data)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch dashboard data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  // Flash feedback helpers
  const triggerSuccess = (msg) => {
    setSuccess(msg)
    setTimeout(() => setSuccess(''), 3000)
  }

  // --- API Handlers ---
  // Services Desk Handlers
  const toggleServiceActive = async (id, currentStatus) => {
    try {
      const targetService = services.find(s => s.id === id)
      if (!targetService) return
      const updated = { ...targetService, active: !currentStatus }
      const res = await axios.put(`http://localhost:4000/api/services/${id}`, updated)
      setServices(prev => prev.map(s => s.id === id ? res.data.service : s))
      triggerSuccess(`Service "${updated.title}" ${updated.active ? 'enabled' : 'disabled'} successfully.`)
    } catch (err) {
      console.error(err)
      setError('Failed to toggle service status.')
    }
  }

  const saveService = async (e) => {
    e.preventDefault()
    try {
      const parsedItems = serviceForm.itemsText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '')
      
      const payload = {
        title: serviceForm.title,
        desc: serviceForm.desc,
        items: parsedItems,
        icon: serviceForm.icon,
        img: serviceForm.img,
        active: serviceForm.active,
        path: serviceForm.path
      }

      const res = await axios.put(`http://localhost:4000/api/services/${serviceForm.id}`, payload)
      setServices(prev => prev.map(s => s.id === serviceForm.id ? res.data.service : s))
      triggerSuccess('Service details updated successfully.')
      setShowServiceModal(false)
    } catch (err) {
      console.error(err)
      setError('Failed to update service details.')
    }
  }

  // Inquiries
  const updateInquiryStatus = async (id, status) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/inquiries/${id}`, { status })
      setInquiries(prev => prev.map(inq => inq.id === id ? res.data.inquiry : inq))
      triggerSuccess('Inquiry status updated.')
    } catch (err) {
      console.error(err)
      setError('Failed to update status.')
    }
  }

  const deleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return
    try {
      await axios.delete(`http://localhost:4000/api/inquiries/${id}`)
      setInquiries(prev => prev.filter(inq => inq.id !== id))
      triggerSuccess('Inquiry deleted.')
    } catch (err) {
      console.error(err)
      setError('Failed to delete inquiry.')
    }
  }

  // FAQs
  const saveFaq = async (e) => {
    e.preventDefault()
    try {
      if (faqForm.id) {
        const res = await axios.put(`http://localhost:4000/api/faqs/${faqForm.id}`, faqForm)
        setFaqs(prev => prev.map(f => f.id === faqForm.id ? res.data.faq : f))
        triggerSuccess('FAQ updated successfully.')
      } else {
        const res = await axios.post('http://localhost:4000/api/faqs', faqForm)
        setFaqs(prev => [...prev, res.data.faq])
        triggerSuccess('FAQ added successfully.')
      }
      setShowFaqModal(false)
      setFaqForm({ id: null, q: '', a: '' })
    } catch (err) {
      console.error(err)
      setError('Failed to save FAQ.')
    }
  }

  const deleteFaq = async (id) => {
    if (!window.confirm('Delete this FAQ?')) return
    try {
      await axios.delete(`http://localhost:4000/api/faqs/${id}`)
      setFaqs(prev => prev.filter(f => f.id !== id))
      triggerSuccess('FAQ deleted.')
    } catch (err) {
      console.error(err)
      setError('Failed to delete FAQ.')
    }
  }

  // Careers
  const saveCareer = async (e) => {
    e.preventDefault()
    try {
      if (careerForm.id) {
        const res = await axios.put(`http://localhost:4000/api/careers/${careerForm.id}`, careerForm)
        setCareers(prev => prev.map(c => c.id === careerForm.id ? res.data.role : c))
        triggerSuccess('Job posting updated successfully.')
      } else {
        const res = await axios.post('http://localhost:4000/api/careers', careerForm)
        setCareers(prev => [...prev, res.data.role])
        triggerSuccess('Job posting added successfully.')
      }
      setShowCareerModal(false)
      setCareerForm({ id: null, title: '', type: 'Full-time', location: '', desc: '' })
    } catch (err) {
      console.error(err)
      setError('Failed to save career.')
    }
  }

  const deleteCareer = async (id) => {
    if (!window.confirm('Delete this job role?')) return
    try {
      await axios.delete(`http://localhost:4000/api/careers/${id}`)
      setCareers(prev => prev.filter(c => c.id !== id))
      triggerSuccess('Job posting removed.')
    } catch (err) {
      console.error(err)
      setError('Failed to delete job posting.')
    }
  }

  const saveSettings = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put('http://localhost:4000/api/settings', settings)
      setSettings(res.data.settings)
      refreshSettings()
      triggerSuccess('Settings updated successfully.')
    } catch (err) {
      console.error(err)
      setError('Failed to save settings.')
    }
  }

  // Page Manager
  const savePage = async (e) => {
    e.preventDefault()
    try {
      if (pageForm.id) {
        const res = await axios.put(`http://localhost:4000/api/pages/${pageForm.id}`, pageForm)
        setPages(prev => prev.map(p => p.id === pageForm.id ? res.data.page : p))
        triggerSuccess('Page updated successfully.')
      } else {
        const res = await axios.post('http://localhost:4000/api/pages', pageForm)
        setPages(prev => [...prev, res.data.page])
        triggerSuccess('Page created successfully.')
      }
      setShowPageModal(false)
      resetPageForm()
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || 'Failed to save page.')
    }
  }

  const deletePage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this dynamic page?')) return
    try {
      await axios.delete(`http://localhost:4000/api/pages/${id}`)
      setPages(prev => prev.filter(p => p.id !== id))
      triggerSuccess('Dynamic page deleted successfully.')
    } catch (err) {
      console.error(err)
      setError('Failed to delete dynamic page.')
    }
  }

  // Media Gallery Manager
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setIsUploading(true)
    const fd = new FormData()
    fd.append('image', file)
    try {
      const res = await axios.post('http://localhost:4000/api/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setGalleryForm(prev => ({ ...prev, url: res.data.url }))
      triggerSuccess('Image file uploaded to server.')
    } catch (err) {
      console.error(err)
      setError('Failed to upload image file.')
    } finally {
      setIsUploading(false)
    }
  }

  const saveGalleryItem = async (e) => {
    e.preventDefault()
    try {
      if (galleryForm.id) {
        const res = await axios.put(`http://localhost:4000/api/gallery/${galleryForm.id}`, galleryForm)
        setGallery(prev => prev.map(g => g.id === galleryForm.id ? res.data.item : g))
        triggerSuccess('Gallery item updated successfully.')
      } else {
        const res = await axios.post('http://localhost:4000/api/gallery', galleryForm)
        setGallery(prev => [res.data.item, ...prev])
        triggerSuccess('Gallery item added successfully.')
      }
      setShowGalleryModal(false)
      setGalleryForm({ id: null, title: '', url: '', category: 'Office' })
    } catch (err) {
      console.error(err)
      setError('Failed to save gallery item.')
    }
  }

  const deleteGalleryItem = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return
    try {
      await axios.delete(`http://localhost:4000/api/gallery/${id}`)
      setGallery(prev => prev.filter(g => g.id !== id))
      triggerSuccess('Gallery item deleted.')
    } catch (err) {
      console.error(err)
      setError('Failed to delete gallery item.')
    }
  }

  // Parse Net Worth categories for analytics chart
  const getNetWorthStats = () => {
    const counts = { 'Not Disclosed': 0, '₹5 Cr - ₹10 Cr': 0, '₹10 Cr - ₹25 Cr': 0, '₹25 Cr+': 0 }
    inquiries.forEach(i => {
      if (i.message.includes('₹5 Cr - ₹10 Cr')) counts['₹5 Cr - ₹10 Cr']++
      else if (i.message.includes('₹10 Cr - ₹25 Cr')) counts['₹10 Cr - ₹25 Cr']++
      else if (i.message.includes('₹25 Cr+')) counts['₹25 Cr+']++
      else counts['Not Disclosed']++
    })
    return counts
  }

  return (
    <div className="admin-portal min-h-screen bg-[#f3f4f6] flex text-slate-800 font-sans">
      
      {/* Sidebar - Professional Microsoft Navy */}
      <aside className="w-64 bg-[#002050] flex flex-col justify-between flex-shrink-0 text-slate-100 shadow-xl border-r border-[#002b5c]">
        <div>
          {/* Logo Brand */}
          <div className="p-6 border-b border-[#002b5c] flex items-center gap-3">
            <span className="w-8 h-8 bg-[#0078d4] text-white font-serif text-lg font-bold flex items-center justify-center rounded-sm shadow-md">F</span>
            <div>
              <h2 className="text-sm font-bold tracking-wider text-white">Fortune Advisory</h2>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">CFO Office Desk</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {[
              { id: 'analytics', label: 'Dashboard & Stats', icon: '📊' },
              { id: 'inquiries', label: 'Inquiries / Leads', icon: '📩', count: inquiries.filter(i => i.status === 'new').length },
              { id: 'services', label: 'Services Desk', icon: '🛠️' },
              { id: 'pages', label: 'Page Manager', icon: '📄' },
              { id: 'gallery', label: 'Media Gallery', icon: '🖼️' },
              { id: 'faqs', label: 'FAQ Database', icon: '❓' },
              { id: 'careers', label: 'Job Careers', icon: '👥' },
              { id: 'settings', label: 'Site Settings', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-3 text-xs font-semibold tracking-wide uppercase transition-all duration-150 rounded-md ${
                  activeTab === tab.id 
                    ? 'bg-[#0078d4] text-white shadow-lg' 
                    : 'text-slate-300 hover:bg-[#00326b] hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base">{tab.icon}</span>
                  {tab.label}
                </span>
                {tab.count > 0 && (
                  <span className="bg-red-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">{tab.count}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* User profile / Logout */}
        <div className="p-4 border-t border-[#002b5c] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0078d4]/20 border border-[#0078d4]/45 flex items-center justify-center text-xs font-bold text-[#0078d4]">AD</div>
            <span className="text-xs font-semibold text-slate-300">Admin Staff</span>
          </div>
          <button 
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-400 text-xs font-semibold transition-colors"
            title="Log Out"
          >
            Power ➔
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-grow flex flex-col min-h-screen overflow-y-auto bg-[#f3f6f9]">
        
        {/* Header bar - Fluent Style */}
        <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 bg-white shadow-sm sticky top-0 z-20">
          <h1 className="text-lg font-serif font-bold text-slate-900 capitalize">{activeTab.replace('-', ' ')} Overview</h1>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-xs font-bold uppercase tracking-wider text-[#0078d4] hover:text-[#005a9e] transition-colors">
              Preview Live Site ↗
            </a>
          </div>
        </header>

        {/* Dashboard Area */}
        <div className="p-8 max-w-6xl w-full mx-auto">
          {/* Notifications */}
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 mb-6 rounded-md shadow-sm">
              ✓ {success}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3.5 mb-6 rounded-md shadow-sm">
              ⚠ {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-2 border-t-transparent border-[#0078d4] animate-spin rounded-full mb-3"></div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Loading Dashboard Resources...</p>
            </div>
          ) : (
            <>
              {/* Tab 1: Analytics / Stats */}
              {activeTab === 'analytics' && (
                <div className="space-y-8">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 border border-slate-200 rounded-md shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest block mb-1">Total inquiries</span>
                      <h3 className="text-3xl font-bold font-serif text-slate-900">{inquiries.length}</h3>
                    </div>
                    <div className="bg-white p-6 border border-slate-200 rounded-md shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest block mb-1">New Leads</span>
                      <h3 className="text-3xl font-bold font-serif text-[#0078d4]">{inquiries.filter(i => i.status === 'new').length}</h3>
                    </div>
                    <div className="bg-white p-6 border border-slate-200 rounded-md shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest block mb-1">Active Job Listings</span>
                      <h3 className="text-3xl font-bold font-serif text-slate-900">{careers.length}</h3>
                    </div>
                    <div className="bg-white p-6 border border-slate-200 rounded-md shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest block mb-1">Total FAQs</span>
                      <h3 className="text-3xl font-bold font-serif text-slate-900">{faqs.length}</h3>
                    </div>
                  </div>

                  {/* Analytics charts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Leads by Status */}
                    <div className="bg-white p-6 border border-slate-200 rounded-md shadow-sm">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-6">Leads by Process Status</h4>
                      <div className="space-y-4">
                        {[
                          { label: 'New', count: inquiries.filter(i => i.status === 'new').length, color: 'bg-[#0078d4]' },
                          { label: 'In Progress', count: inquiries.filter(i => i.status === 'in-progress').length, color: 'bg-blue-400' },
                          { label: 'Archived', count: inquiries.filter(i => i.status === 'archived').length, color: 'bg-slate-400' }
                        ].map(bar => {
                          const percentage = inquiries.length ? (bar.count / inquiries.length) * 100 : 0
                          return (
                            <div key={bar.label}>
                              <div className="flex justify-between text-xs font-semibold mb-1">
                                <span className="text-slate-500">{bar.label}</span>
                                <span className="text-slate-900">{bar.count} ({Math.round(percentage)}%)</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className={`${bar.color} h-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Leads by Asset Level */}
                    <div className="bg-white p-6 border border-slate-200 rounded-md shadow-sm">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-6">Asset Bracket Allocation</h4>
                      <div className="space-y-4">
                        {Object.entries(getNetWorthStats()).map(([label, count]) => {
                          const percentage = inquiries.length ? (count / inquiries.length) * 100 : 0
                          return (
                            <div key={label}>
                              <div className="flex justify-between text-xs font-semibold mb-1">
                                <span className="text-slate-500">{label}</span>
                                <span className="text-[#0078d4] font-bold">{count} ({Math.round(percentage)}%)</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-[#0078d4] h-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Inquiries Manager */}
              {activeTab === 'inquiries' && (
                <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm">
                  {inquiries.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 text-xs">No client inquiries found in database.</div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                          <th className="p-4 pl-6">Client Info</th>
                          <th className="p-4">Message / Query</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 pr-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {inquiries.map(inq => (
                          <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 pl-6 space-y-1">
                              <div className="font-bold text-slate-900 text-sm">{inq.name}</div>
                              <div className="text-slate-500 text-[11px]">{inq.email}</div>
                              <div className="text-slate-500 text-[11px]">{inq.phone}</div>
                              <div className="text-slate-400 text-[10px]">{new Date(inq.date).toLocaleString()}</div>
                            </td>
                            <td className="p-4 max-w-sm whitespace-pre-wrap leading-relaxed text-slate-600 font-light">
                              {inq.message}
                            </td>
                            <td className="p-4">
                              <select 
                                value={inq.status}
                                onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                                className="bg-white border border-slate-200 p-1.5 text-slate-700 text-xs rounded-sm focus:outline-none focus:border-[#0078d4]"
                              >
                                <option value="new">New</option>
                                <option value="in-progress">In Progress</option>
                                <option value="archived">Archived</option>
                              </select>
                            </td>
                            <td className="p-4 pr-6 text-right">
                              <button 
                                onClick={() => deleteInquiry(inq.id)}
                                className="text-red-500 hover:text-red-700 font-bold uppercase tracking-wider text-[10px]"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* Tab: Dynamic Page Manager */}
              {activeTab === 'pages' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Dynamic SEO Pages</h3>
                    <button 
                      onClick={() => { resetPageForm(); setShowPageModal(true); }}
                      className="bg-[#0078d4] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-[#005a9e] transition-colors rounded-sm shadow-sm"
                    >
                      + Create Custom Page
                    </button>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm">
                    {pages.length === 0 ? (
                      <div className="p-12 text-center text-slate-400 text-xs">No dynamic custom pages found. Create one above!</div>
                    ) : (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                            <th className="p-4 pl-6">Page Details</th>
                            <th className="p-4">SEO Parameters</th>
                            <th className="p-4">Template Model</th>
                            <th className="p-4 pr-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                          {pages.map(p => (
                            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 pl-6">
                                <div className="font-bold text-slate-900 text-sm">{p.title}</div>
                                <div className="text-[#0078d4] text-[11px] font-mono mt-0.5">
                                  <a href={`/p/${p.slug}`} target="_blank" rel="noreferrer" className="hover:underline">
                                    /p/{p.slug} ↗
                                  </a>
                                </div>
                              </td>
                              <td className="p-4 space-y-1">
                                <div className="text-slate-700 font-medium text-[11px] truncate max-w-[200px]">
                                  T: {p.seoTitle}
                                </div>
                                <div className="text-slate-500 text-[10px] truncate max-w-[220px]">
                                  D: {p.seoDesc || 'N/A'}
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="text-[10px] bg-slate-50 text-slate-600 px-2.5 py-1 uppercase tracking-wider font-semibold border border-slate-200 rounded-sm">
                                  {p.template}
                                </span>
                              </td>
                              <td className="p-4 pr-6 text-right space-x-4">
                                <button 
                                  onClick={() => { setPageForm(p); setShowPageModal(true); }}
                                  className="text-[#0078d4] hover:text-[#005a9e] font-bold uppercase tracking-wider"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => deletePage(p.id)}
                                  className="text-red-500 hover:text-red-700 font-bold uppercase tracking-wider"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  {/* Page Builder Modal */}
                  {showPageModal && (
                    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-white border border-slate-250 p-8 max-w-2xl w-full rounded-md shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                          <h3 className="text-lg font-serif font-bold text-slate-900">
                            {pageForm.id ? 'Modify Custom Page' : 'Create Custom SEO Page'}
                          </h3>
                          <button 
                            onClick={() => setShowPageModal(false)}
                            className="text-slate-400 hover:text-slate-900 text-lg"
                          >
                            ✕
                          </button>
                        </div>

                        <form onSubmit={savePage} className="space-y-6 text-left">
                          {/* Core Parameters */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Page Title *</label>
                              <input 
                                type="text" 
                                required
                                value={pageForm.title}
                                onChange={(e) => setPageForm(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                placeholder="e.g. Executive Tax Advisory"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">URL Slug *</label>
                              <input 
                                type="text" 
                                required
                                disabled={!!pageForm.id}
                                value={pageForm.slug}
                                onChange={(e) => setPageForm(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))}
                                className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="e.g. executive-tax"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Predesigned Template *</label>
                              <select 
                                value={pageForm.template}
                                onChange={(e) => setPageForm(prev => ({ ...prev, template: e.target.value }))}
                                className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                              >
                                <option value="service-landing">Service Landing Page</option>
                                <option value="team-profile">About / Firm Team Profile</option>
                                <option value="case-study">Advisory Case Study Outcome</option>
                                <option value="general-content">General Article / Content Page</option>
                                <option value="research-report">Research Report / Insight Whitepaper</option>
                                <option value="faq-accordion">FAQ & Resources Hub</option>
                              </select>
                            </div>
                          </div>

                          {/* SEO Parameters */}
                          <div className="p-4 bg-slate-50 border border-slate-150 rounded-sm space-y-4">
                            <h4 className="text-xs font-bold text-[#0078d4] uppercase tracking-wider border-b border-slate-200 pb-2">SEO Configurations</h4>
                            
                            <div>
                              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Meta Title Tags</label>
                              <input 
                                type="text" 
                                value={pageForm.seoTitle}
                                onChange={(e) => setPageForm(prev => ({ ...prev, seoTitle: e.target.value }))}
                                className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                placeholder="Include key branding or compliance triggers"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Meta Description</label>
                                <textarea 
                                  rows="2"
                                  value={pageForm.seoDesc}
                                  onChange={(e) => setPageForm(prev => ({ ...prev, seoDesc: e.target.value }))}
                                  className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                                  placeholder="Brief description for search engines..."
                                />
                              </div>
                              <div>
                                <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Meta Keywords (comma separated)</label>
                                <textarea 
                                  rows="2"
                                  value={pageForm.seoKeywords}
                                  onChange={(e) => setPageForm(prev => ({ ...prev, seoKeywords: e.target.value }))}
                                  className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                                  placeholder="tax advisory, esops, personal cfo"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Dynamic Section Contents based on Template */}
                          <div className="p-4 bg-slate-50 border border-slate-150 rounded-sm space-y-4">
                            <h4 className="text-xs font-bold text-[#0078d4] uppercase tracking-wider border-b border-slate-200 pb-2">Template Content Builder</h4>
                            
                            {pageForm.template === 'service-landing' && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Hero Big Title</label>
                                    <input 
                                      type="text" 
                                      value={pageForm.sections?.heroTitle || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, heroTitle: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Hero Subtitle</label>
                                    <input 
                                      type="text" 
                                      value={pageForm.sections?.heroSub || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, heroSub: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Feature Highlight #1 Title</label>
                                    <input 
                                      type="text" 
                                      placeholder="e.g. Zero Commission"
                                      value={pageForm.sections?.feature1Title || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, feature1Title: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                    />
                                    <textarea 
                                      rows="2"
                                      placeholder="Feature #1 Description..."
                                      value={pageForm.sections?.feature1Desc || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, feature1Desc: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Feature Highlight #2 Title</label>
                                    <input 
                                      type="text" 
                                      placeholder="e.g. Fiduciary Standard"
                                      value={pageForm.sections?.feature2Title || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, feature2Title: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                    />
                                    <textarea 
                                      rows="2"
                                      placeholder="Feature #2 Description..."
                                      value={pageForm.sections?.feature2Desc || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, feature2Desc: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Detailed Body Paragraph</label>
                                  <textarea 
                                    rows="3"
                                    value={pageForm.sections?.bodyText || ''}
                                    onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, bodyText: e.target.value } }))}
                                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">CTA Button Text</label>
                                    <input 
                                      type="text" 
                                      value={pageForm.sections?.ctaText || 'Book a Consultation'}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, ctaText: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">CTA Redirect Link</label>
                                    <input 
                                      type="text" 
                                      value={pageForm.sections?.ctaLink || '/contact'}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, ctaLink: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            {pageForm.template === 'team-profile' && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">About Us Page Title</label>
                                    <input 
                                      type="text" 
                                      value={pageForm.sections?.aboutTitle || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, aboutTitle: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Sub-Headline</label>
                                    <input 
                                      type="text" 
                                      value={pageForm.sections?.aboutSub || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, aboutSub: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Fiduciary Investment Philosophy</label>
                                  <textarea 
                                    rows="4"
                                    value={pageForm.sections?.philosophyText || ''}
                                    onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, philosophyText: e.target.value } }))}
                                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                                  />
                                </div>
                              </div>
                            )}

                            {pageForm.template === 'case-study' && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Case Study Heading</label>
                                    <input 
                                      type="text" 
                                      value={pageForm.sections?.caseTitle || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, caseTitle: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Outcome Highlight (e.g. ₹4.2Cr Tax Saved)</label>
                                    <input 
                                      type="text" 
                                      value={pageForm.sections?.caseOutcome || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, caseOutcome: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">01. Client Profile</label>
                                  <textarea 
                                    rows="2"
                                    value={pageForm.sections?.caseProfile || ''}
                                    onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, caseProfile: e.target.value } }))}
                                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                                  />
                                </div>
                                <div>
                                  <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">02. Core Challenge</label>
                                  <textarea 
                                    rows="2"
                                    value={pageForm.sections?.caseChallenge || ''}
                                    onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, caseChallenge: e.target.value } }))}
                                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                                  />
                                </div>
                                <div>
                                  <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">03. The CFO Strategy & Outcomes</label>
                                  <textarea 
                                    rows="3"
                                    value={pageForm.sections?.caseStrategy || ''}
                                    onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, caseStrategy: e.target.value } }))}
                                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                                  />
                                </div>
                              </div>
                            )}

                            {pageForm.template === 'general-content' && (
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Article Subtitle / Author</label>
                                  <input 
                                    type="text" 
                                    value={pageForm.sections?.subtitle || ''}
                                    onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, subtitle: e.target.value } }))}
                                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Article Body Content (Supports spacing/paragraphs)</label>
                                  <textarea 
                                    rows="6"
                                    value={pageForm.sections?.bodyContent || ''}
                                    onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, bodyContent: e.target.value } }))}
                                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                                  />
                                </div>
                              </div>
                            )}

                            {pageForm.template === 'research-report' && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Author Name</label>
                                    <input 
                                      type="text" 
                                      value={pageForm.sections?.authorName || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, authorName: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                      placeholder="e.g. Investment Committee"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Author Role/Credentials</label>
                                    <input 
                                      type="text" 
                                      value={pageForm.sections?.authorRole || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, authorRole: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                      placeholder="e.g. Fiduciary Advisory Desk"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Release Date</label>
                                    <input 
                                      type="text" 
                                      value={pageForm.sections?.publishDate || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, publishDate: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                      placeholder="e.g. June 2026"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Reading Time</label>
                                    <input 
                                      type="text" 
                                      value={pageForm.sections?.readTime || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, readTime: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                      placeholder="e.g. 5 min read"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Key Takeaways (one per line)</label>
                                  <textarea 
                                    rows="3"
                                    value={pageForm.sections?.keyTakeaways || ''}
                                    onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, keyTakeaways: e.target.value } }))}
                                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                                    placeholder="Takeaway 1&#10;Takeaway 2"
                                  />
                                </div>
                                <div>
                                  <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Report Content (Supports spacing/paragraphs)</label>
                                  <textarea 
                                    rows="6"
                                    value={pageForm.sections?.bodyContent || ''}
                                    onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, bodyContent: e.target.value } }))}
                                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                                  />
                                </div>
                              </div>
                            )}

                            {pageForm.template === 'faq-accordion' && (
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Resource Subtitle</label>
                                  <input 
                                    type="text" 
                                    value={pageForm.sections?.resourceSubtitle || ''}
                                    onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, resourceSubtitle: e.target.value } }))}
                                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                    placeholder="Fiduciary advisory documentation and disclosures."
                                  />
                                </div>
                                <div>
                                  <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">FAQ Blocks (Separate question & answer with Q: and A:, separate blocks with empty line)</label>
                                  <textarea 
                                    rows="6"
                                    value={pageForm.sections?.faqItems || ''}
                                    onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, faqItems: e.target.value } }))}
                                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                                    placeholder="Q: What is a fiduciary?&#10;A: A fiduciary is legally obligated to act in your best interest.&#10;&#10;Q: How do you charge?&#10;A: We charge a flat fee or AUA percentage. No commissions."
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Form Download Link / Button Text</label>
                                    <input 
                                      type="text" 
                                      value={pageForm.sections?.downloadText || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, downloadText: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                      placeholder="Download Advisory Forms"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-slate-550 text-[10px] font-bold uppercase tracking-widest mb-1">Download Link URL</label>
                                    <input 
                                      type="text" 
                                      value={pageForm.sections?.downloadLink || ''}
                                      onChange={(e) => setPageForm(prev => ({ ...prev, sections: { ...prev.sections, downloadLink: e.target.value } }))}
                                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                      placeholder="e.g. /disclosures.pdf"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                            <button 
                              type="button" 
                              onClick={() => setShowPageModal(false)}
                              className="text-slate-500 hover:text-slate-800 text-[10px] font-bold uppercase tracking-widest px-4 py-2.5"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              className="bg-[#0078d4] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 hover:bg-[#005a9e] transition-colors rounded-sm"
                            >
                              Publish Custom Page
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Media Gallery & Assets */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Media Gallery Assets</h3>
                    <button 
                      onClick={() => { setGalleryForm({ id: null, title: '', url: '', category: 'Office' }); setShowGalleryModal(true); }}
                      className="bg-[#0078d4] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-[#005a9e] transition-colors rounded-sm shadow-sm"
                    >
                      + Add Media Asset
                    </button>
                  </div>

                  {gallery.length === 0 ? (
                    <div className="bg-white p-12 border border-slate-200 rounded-md text-center text-slate-500 text-xs">
                      No gallery assets uploaded. Add one above!
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {gallery.map(item => (
                        <div key={item.id} className="bg-white border border-slate-200 rounded-md overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors shadow-sm">
                          <div className="aspect-[4/3] bg-slate-100 relative group overflow-hidden">
                            <img 
                              src={item.url} 
                              alt={item.title} 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute top-2 right-2 bg-white/95 text-[9px] text-[#0078d4] font-bold px-2 py-0.5 rounded-sm border border-slate-200 uppercase shadow-sm">
                              {item.category || 'General'}
                            </div>
                          </div>
                          <div className="p-4 space-y-3 flex-grow flex flex-col justify-between text-left">
                            <div className="space-y-1">
                              <h4 className="font-serif font-bold text-slate-800 text-sm line-clamp-1">{item.title}</h4>
                              <p className="text-[10px] text-slate-400 font-mono truncate">{item.url}</p>
                            </div>
                            <div className="flex gap-2 pt-2 border-t border-slate-100 text-xs">
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(item.url)
                                  triggerSuccess('Asset link copied to clipboard!')
                                }}
                                className="flex-1 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 py-1.5 px-2 font-bold uppercase tracking-wider text-[9px] rounded-sm text-center"
                              >
                                Copy Link
                              </button>
                              <button 
                                onClick={() => deleteGalleryItem(item.id)}
                                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-1.5 px-3 font-bold uppercase tracking-wider text-[9px] rounded-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Gallery Item Modal */}
                  {showGalleryModal && (
                    <div className="fixed inset-0 bg-slate-955/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-white border border-slate-200 p-8 max-w-md w-full rounded-md shadow-2xl space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                          <h3 className="text-lg font-serif font-bold text-slate-900">Add New Media Asset</h3>
                          <button 
                            onClick={() => setShowGalleryModal(false)}
                            className="text-slate-400 hover:text-slate-900 text-lg"
                          >
                            ✕
                          </button>
                        </div>

                        <form onSubmit={saveGalleryItem} className="space-y-4 text-left">
                          <div>
                            <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Asset Title / Caption *</label>
                            <input 
                              type="text" 
                              required
                              value={galleryForm.title}
                              onChange={(e) => setGalleryForm(prev => ({ ...prev, title: e.target.value }))}
                              className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                              placeholder="e.g. Nariman Point Wealth Center"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Category *</label>
                              <select
                                value={galleryForm.category}
                                onChange={(e) => setGalleryForm(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                              >
                                <option value="Office">Office / HQ</option>
                                <option value="Team">Team Leadership</option>
                                <option value="Client Event">Client Event</option>
                                <option value="General">General Showcase</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Direct URL Option</label>
                              <input 
                                type="text" 
                                value={galleryForm.url}
                                onChange={(e) => setGalleryForm(prev => ({ ...prev, url: e.target.value }))}
                                className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                placeholder="Or enter direct URL..."
                              />
                            </div>
                          </div>

                          <div className="p-4 bg-slate-50 border border-slate-150 rounded-sm space-y-3">
                            <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Local Image File Upload</label>
                            <div className="flex items-center gap-3">
                              <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="text-xs text-slate-500 file:bg-white file:border file:border-slate-200 file:text-[#0078d4] file:px-3 file:py-1.5 file:rounded-sm file:text-xs file:font-semibold file:cursor-pointer"
                              />
                              {isUploading && (
                                <span className="w-4 h-4 border-2 border-t-transparent border-[#0078d4] animate-spin rounded-full inline-block"></span>
                              )}
                            </div>
                            {galleryForm.url && (
                              <div className="text-[10px] text-emerald-600 font-mono break-all mt-1">
                                Ready: {galleryForm.url}
                              </div>
                            )}
                          </div>

                          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                            <button 
                              type="button" 
                              onClick={() => setShowGalleryModal(false)}
                              className="text-slate-500 hover:text-slate-800 text-[10px] font-bold uppercase tracking-widest px-4 py-2.5"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              disabled={!galleryForm.url}
                              className="bg-[#0078d4] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 hover:bg-[#005a9e] transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                              Add Asset
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2.5: Services Desk */}
              {activeTab === 'services' && (
                <div className="space-y-6 text-left">
                  <div className="flex justify-between items-center bg-white border border-slate-200 p-6 rounded-md shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Services Desk Manager</h3>
                      <p className="text-xs text-slate-500 mt-1">Configure active services for the public website and edit titles, descriptions, and feature bullet points.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {services.map((srv) => (
                      <div key={srv.id} className="bg-white border border-slate-200 rounded-md shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{srv.icon || '💼'}</span>
                              <div>
                                <h4 className="text-sm font-bold text-slate-800">{srv.title}</h4>
                                <p className="text-[10px] text-slate-400 font-mono">{srv.path}</p>
                              </div>
                            </div>
                            
                            {/* Toggle switch */}
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={srv.active} 
                                onChange={() => toggleServiceActive(srv.id, srv.active)}
                                className="sr-only peer" 
                              />
                              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0078d4]"></div>
                              <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                {srv.active ? 'Active' : 'Disabled'}
                              </span>
                            </label>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed mb-4">{srv.desc}</p>
                          
                          {srv.items && srv.items.length > 0 && (
                            <div className="mb-4">
                              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Offerings</span>
                              <ul className="space-y-1">
                                {srv.items.map((item, idx) => (
                                  <li key={idx} className="text-[11px] text-slate-500 flex items-start gap-1">
                                    <span className="text-[#0078d4]">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end pt-3 border-t border-slate-100">
                          <button 
                            onClick={() => {
                              setServiceForm({
                                id: srv.id,
                                title: srv.title,
                                desc: srv.desc,
                                itemsText: srv.items ? srv.items.join('\n') : '',
                                icon: srv.icon || '',
                                img: srv.img || '',
                                active: srv.active,
                                path: srv.path || ''
                              })
                              setShowServiceModal(true)
                            }}
                            className="text-[#0078d4] hover:text-[#005a9e] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5"
                          >
                            ✏️ Edit Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Edit Service Modal */}
                  {showServiceModal && (
                    <div className="fixed inset-0 bg-slate-955/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-white border border-slate-200 p-8 max-w-lg w-full rounded-md shadow-2xl space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                          <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">Edit Service Offerings</h3>
                          <button 
                            onClick={() => setShowServiceModal(false)}
                            className="text-slate-400 hover:text-slate-900 text-lg"
                          >
                            ✕
                          </button>
                        </div>

                        <form onSubmit={saveService} className="space-y-4 text-left">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Service Title *</label>
                              <input 
                                type="text" 
                                required
                                value={serviceForm.title}
                                onChange={(e) => setServiceForm(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Client Path URL</label>
                              <input 
                                type="text" 
                                value={serviceForm.path}
                                onChange={(e) => setServiceForm(prev => ({ ...prev, path: e.target.value }))}
                                className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Emoji Icon</label>
                              <input 
                                type="text" 
                                value={serviceForm.icon}
                                onChange={(e) => setServiceForm(prev => ({ ...prev, icon: e.target.value }))}
                                className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm text-center"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Cover Image URL</label>
                              <input 
                                type="text" 
                                value={serviceForm.img}
                                onChange={(e) => setServiceForm(prev => ({ ...prev, img: e.target.value }))}
                                className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Summary Intro Description *</label>
                            <textarea 
                              required
                              rows="2"
                              value={serviceForm.desc}
                              onChange={(e) => setServiceForm(prev => ({ ...prev, desc: e.target.value }))}
                              className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Detailed Offerings (One bullet point per line) *</label>
                            <textarea 
                              required
                              rows="5"
                              value={serviceForm.itemsText}
                              onChange={(e) => setServiceForm(prev => ({ ...prev, itemsText: e.target.value }))}
                              placeholder="e.g.&#10;Budgeting and expense management&#10;Emergency fund planning"
                              className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                            />
                          </div>

                          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                            <button 
                              type="button" 
                              onClick={() => setShowServiceModal(false)}
                              className="text-slate-500 hover:text-slate-800 text-[10px] font-bold uppercase tracking-widest px-4 py-2.5"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              className="bg-[#0078d4] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 hover:bg-[#005a9e] transition-colors rounded-sm shadow-sm"
                            >
                              Save Details
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: FAQs Manager */}
              {activeTab === 'faqs' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-serif">FAQ Knowledgebase</h3>
                    <button 
                      onClick={() => { setFaqForm({ id: null, q: '', a: '' }); setShowFaqModal(true); }}
                      className="bg-[#0078d4] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-[#005a9e] transition-colors rounded-sm shadow-sm"
                    >
                      + Add FAQ Item
                    </button>
                  </div>

                  {/* List */}
                  <div className="bg-white border border-slate-200 rounded-md divide-y divide-slate-100 shadow-sm">
                    {faqs.map(f => (
                      <div key={f.id} className="p-6 flex justify-between items-start gap-8 hover:bg-slate-50/30 transition-colors">
                        <div className="space-y-2 text-left">
                          <h4 className="font-serif font-bold text-slate-900 text-sm">Q: {f.q}</h4>
                          <p className="text-slate-600 text-xs leading-relaxed font-light">A: {f.a}</p>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0 text-xs">
                          <button 
                            onClick={() => { setFaqForm(f); setShowFaqModal(true); }}
                            className="text-[#0078d4] hover:text-[#005a9e] font-bold uppercase tracking-wider"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteFaq(f.id)}
                            className="text-red-500 hover:text-red-700 font-bold uppercase tracking-wider"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* FAQ Modal */}
                  {showFaqModal && (
                    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-white border border-slate-200 p-8 max-w-lg w-full rounded-sm shadow-2xl space-y-6">
                        <h3 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-100 pb-3">
                          {faqForm.id ? 'Edit FAQ Item' : 'Create FAQ Item'}
                        </h3>
                        <form onSubmit={saveFaq} className="space-y-4 text-left">
                          <div>
                            <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Question Text</label>
                            <input 
                              type="text" 
                              required
                              value={faqForm.q}
                              onChange={(e) => setFaqForm(prev => ({ ...prev, q: e.target.value }))}
                              className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                              placeholder="e.g. What is the minimum portfolio size?"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Fiduciary Answer</label>
                            <textarea 
                              required
                              rows="4"
                              value={faqForm.a}
                              onChange={(e) => setFaqForm(prev => ({ ...prev, a: e.target.value }))}
                              className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                            />
                          </div>
                          <div className="flex justify-end gap-3 pt-3">
                            <button 
                              type="button" 
                              onClick={() => setShowFaqModal(false)}
                              className="text-slate-500 hover:text-slate-800 text-[10px] font-bold uppercase tracking-widest px-4 py-2.5"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              className="bg-[#0078d4] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 hover:bg-[#005a9e] transition-colors rounded-sm"
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Careers Manager */}
              {activeTab === 'careers' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Public Job Openings</h3>
                    <button 
                      onClick={() => { setCareerForm({ id: null, title: '', type: 'Full-time', location: '', desc: '' }); setShowCareerModal(true); }}
                      className="bg-[#0078d4] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-[#005a9e] transition-colors rounded-sm shadow-sm"
                    >
                      + Post New Role
                    </button>
                  </div>

                  {/* List */}
                  <div className="bg-white border border-slate-200 rounded-md divide-y divide-slate-100 shadow-sm">
                    {careers.map(car => (
                      <div key={car.id} className="p-6 flex justify-between items-start gap-8 hover:bg-slate-50/30 transition-colors">
                        <div className="space-y-2 max-w-3xl text-left">
                          <div className="flex items-center gap-3">
                            <h4 className="font-serif font-bold text-slate-900 text-sm">{car.title}</h4>
                            <span className="text-[9px] bg-slate-50 text-[#0078d4] px-2 py-0.5 border border-blue-100 uppercase tracking-wider font-semibold rounded-sm">
                              {car.location} · {car.type}
                            </span>
                          </div>
                          <p className="text-slate-600 text-xs leading-relaxed font-light">{car.desc}</p>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0 text-xs">
                          <button 
                            onClick={() => { setCareerForm(car); setShowCareerModal(true); }}
                            className="text-[#0078d4] hover:text-[#005a9e] font-bold uppercase tracking-wider"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteCareer(car.id)}
                            className="text-red-500 hover:text-red-700 font-bold uppercase tracking-wider"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Career Modal */}
                  {showCareerModal && (
                    <div className="fixed inset-0 bg-slate-955/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-white border border-slate-200 p-8 max-w-lg w-full rounded-sm shadow-2xl space-y-6">
                        <h3 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-100 pb-3">
                          {careerForm.id ? 'Edit Job Posting' : 'Create Job Posting'}
                        </h3>
                        <form onSubmit={saveCareer} className="space-y-4 text-left">
                          <div>
                            <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Role Title</label>
                            <input 
                              type="text" 
                              required
                              value={careerForm.title}
                              onChange={(e) => setCareerForm(prev => ({ ...prev, title: e.target.value }))}
                              className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                              placeholder="e.g. Lead Analyst"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Employment Type</label>
                              <select 
                                value={careerForm.type}
                                onChange={(e) => setCareerForm(prev => ({ ...prev, type: e.target.value }))}
                                className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                              >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Office Location</label>
                              <input 
                                type="text" 
                                required
                                value={careerForm.location}
                                onChange={(e) => setCareerForm(prev => ({ ...prev, location: e.target.value }))}
                                className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                                placeholder="e.g. Mumbai (Hybrid)"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Description & Qualifications</label>
                            <textarea 
                              required
                              rows="4"
                              value={careerForm.desc}
                              onChange={(e) => setCareerForm(prev => ({ ...prev, desc: e.target.value }))}
                              className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                            />
                          </div>
                          <div className="flex justify-end gap-3 pt-3">
                            <button 
                              type="button" 
                              onClick={() => setShowCareerModal(false)}
                              className="text-slate-500 hover:text-slate-800 text-[10px] font-bold uppercase tracking-widest px-4 py-2.5"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              className="bg-[#0078d4] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 hover:bg-[#005a9e] transition-colors rounded-sm"
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 5: Site Settings */}
              {activeTab === 'settings' && (
                <div className="bg-white border border-slate-200 p-8 rounded-md shadow-sm max-w-2xl text-left">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-6">Site-Wide Contact Configurations</h3>
                  <form onSubmit={saveSettings} className="space-y-5">
                    <div>
                      <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Official Phone Number</label>
                      <input 
                        type="text" 
                        value={settings.phone}
                        onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Inquiry Support Email</label>
                      <input 
                        type="email" 
                        value={settings.email}
                        onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">WhatsApp Mobile Linkage</label>
                      <input 
                        type="text" 
                        value={settings.whatsapp}
                        onChange={(e) => setSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                        className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm"
                        placeholder="Include country code (e.g. +912269012200)"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Physical Head Office Address</label>
                      <textarea 
                        rows="3"
                        value={settings.address}
                        onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-xs focus:outline-none focus:border-[#0078d4] rounded-sm leading-relaxed"
                      />
                    </div>
                    <div className="pt-4 border-t border-slate-150 flex justify-end">
                      <button 
                        type="submit" 
                        className="bg-[#0078d4] text-white text-[10px] font-bold uppercase tracking-widest px-8 py-3.5 hover:bg-[#005a9e] transition-colors rounded-sm shadow-sm"
                      >
                        Save Configurations
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
