import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:4000/api/admin/login', { username, password })
      if (response.data.token) {
        localStorage.setItem('admin_token', response.data.token)
        navigate('/admin/dashboard')
      } else {
        setError('Login failed. Please check credentials.')
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-portal min-h-screen bg-[#f3f6f9] flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,120,212,0.08),transparent_60%)] pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-white border border-slate-200 p-8 shadow-xl rounded-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0078d4] text-white font-serif text-2xl font-bold mb-3 rounded-md shadow-md">
            F
          </div>
          <h2 className="text-2xl font-serif text-slate-900 font-bold tracking-tight">Fortune Portal</h2>
          <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider">Administrative Access</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3 mb-6 rounded-md text-center shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 text-left">
          <div>
            <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-sm focus:outline-none focus:border-[#0078d4] transition-colors rounded-sm"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-slate-600 text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-slate-200 p-3 text-slate-800 text-sm focus:outline-none focus:border-[#0078d4] transition-colors rounded-sm"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#0078d4] text-white font-semibold uppercase tracking-widest text-xs py-3.5 hover:bg-[#005a9e] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed rounded-md mt-2 shadow-sm"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <a href="/" className="text-slate-500 hover:text-slate-900 text-xs transition-colors">
            ← Return to public website
          </a>
        </div>
      </div>
    </div>
  )
}
