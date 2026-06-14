import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const SettingsContext = createContext()

export const defaultSettings = {
  phone: '+91 22 6901 2200',
  email: 'advisory@fortunepersonalcfo.com',
  whatsapp: '+912269012200',
  address: 'Level 11, Maker Chambers IV, Nariman Point, Mumbai, Maharashtra 400021'
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings)

  const fetchSettings = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/settings')
      if (res.data && Object.keys(res.data).length > 0) {
        setSettings({
          phone: res.data.phone || defaultSettings.phone,
          email: res.data.email || defaultSettings.email,
          whatsapp: res.data.whatsapp || defaultSettings.whatsapp,
          address: res.data.address || defaultSettings.address
        })
      }
    } catch (err) {
      console.warn('Failed to load settings from API, using default settings.', err)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
