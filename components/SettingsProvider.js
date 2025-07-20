import { createContext, useContext, useState, useEffect } from 'react'
import { getDatabase } from '../lib/database'

const SettingsContext = createContext()

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({})
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const db = getDatabase()
        const userSettings = db.getUserSettings()
        setSettings(userSettings)
        setMounted(true)
        
        // Apply initial settings
        applyTheme(userSettings.theme || 'dark')
        applyFontSize(userSettings.fontSize || 'medium')
        applyAccentColor(userSettings.accentColor || 'purple')
      }
    } catch (err) {
      console.error('Error initializing settings:', err)
      setError(err)
      setMounted(true)
    }
  }, [])

  const updateSetting = (key, value) => {
    try {
      if (typeof window !== 'undefined') {
        const db = getDatabase()
        const updatedSettings = db.setSetting(key, value)
        setSettings(updatedSettings)
        
        // Apply changes immediately
        if (key === 'theme') applyTheme(value)
        if (key === 'fontSize') applyFontSize(value)
        if (key === 'accentColor') applyAccentColor(value)
        
        return updatedSettings
      }
    } catch (err) {
      console.error('Error updating setting:', err)
      setError(err)
    }
  }

  const applyTheme = (theme) => {
    if (typeof window === 'undefined') return
    
    try {
      const root = document.documentElement
      
      // Remove existing theme classes
      root.classList.remove('theme-light', 'theme-dark', 'theme-auto')
      
      switch (theme) {
        case 'light':
          root.classList.add('theme-light')
          root.style.setProperty('--bg-primary', '#ffffff')
          root.style.setProperty('--bg-secondary', '#f8fafc')
          root.style.setProperty('--text-primary', '#1f2937')
          root.style.setProperty('--text-secondary', '#6b7280')
          break
        case 'dark':
          root.classList.add('theme-dark')
          root.style.setProperty('--bg-primary', '#0f172a')
          root.style.setProperty('--bg-secondary', '#1e293b')
          root.style.setProperty('--text-primary', '#f8fafc')
          root.style.setProperty('--text-secondary', '#cbd5e1')
          break
        case 'auto':
          root.classList.add('theme-auto')
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          applyTheme(prefersDark ? 'dark' : 'light')
          break
        default:
          applyTheme('dark')
      }
    } catch (err) {
      console.error('Error applying theme:', err)
    }
  }

  const applyFontSize = (fontSize) => {
    if (typeof window === 'undefined') return
    
    try {
      const root = document.documentElement
      
      switch (fontSize) {
        case 'small':
          root.style.setProperty('--font-size-base', '14px')
          root.style.setProperty('--font-size-lg', '16px')
          root.style.setProperty('--font-size-xl', '18px')
          break
        case 'medium':
          root.style.setProperty('--font-size-base', '16px')
          root.style.setProperty('--font-size-lg', '18px')
          root.style.setProperty('--font-size-xl', '20px')
          break
        case 'large':
          root.style.setProperty('--font-size-base', '18px')
          root.style.setProperty('--font-size-lg', '20px')
          root.style.setProperty('--font-size-xl', '24px')
          break
        default:
          applyFontSize('medium')
      }
    } catch (err) {
      console.error('Error applying font size:', err)
    }
  }

  const applyAccentColor = (color) => {
    if (typeof window === 'undefined') return
    
    try {
      const root = document.documentElement
      const colors = {
        purple: { primary: '#8b5cf6', secondary: '#a78bfa', dark: '#7c3aed' },
        blue: { primary: '#3b82f6', secondary: '#60a5fa', dark: '#2563eb' },
        green: { primary: '#10b981', secondary: '#34d399', dark: '#059669' },
        orange: { primary: '#f59e0b', secondary: '#fbbf24', dark: '#d97706' },
        pink: { primary: '#ec4899', secondary: '#f472b6', dark: '#db2777' }
      }
      
      const selectedColor = colors[color] || colors.purple
      root.style.setProperty('--accent-primary', selectedColor.primary)
      root.style.setProperty('--accent-secondary', selectedColor.secondary)
      root.style.setProperty('--accent-dark', selectedColor.dark)
    } catch (err) {
      console.error('Error applying accent color:', err)
    }
  }

  const getAnimationProps = (baseProps = {}) => {
    if (!settings.animationsEnabled) {
      return { ...baseProps, animate: baseProps.animate, transition: { duration: 0 } }
    }
    
    if (settings.reducedMotion) {
      return { 
        ...baseProps, 
        transition: { 
          ...baseProps.transition, 
          duration: (baseProps.transition?.duration || 0.3) * 0.5 
        } 
      }
    }
    
    return baseProps
  }

  const showNotification = (message, type = 'info') => {
    if (!settings.notificationsEnabled) return
    
    try {
      if (typeof window !== 'undefined') {
        const notification = document.createElement('div')
        notification.textContent = message
        notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg z-50 transition-all duration-300 transform translate-x-full opacity-0 ${
          type === 'success' ? 'bg-green-500 text-white' :
          type === 'error' ? 'bg-red-500 text-white' :
          type === 'warning' ? 'bg-yellow-500 text-black' :
          'bg-blue-500 text-white'
        }`
        
        document.body.appendChild(notification)
        
        // Animate in
        setTimeout(() => {
          notification.style.transform = 'translateX(0)'
          notification.style.opacity = '1'
        }, 10)
        
        // Remove after delay
        setTimeout(() => {
          notification.style.transform = 'translateX(100%)'
          notification.style.opacity = '0'
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification)
            }
          }, 300)
        }, 3000)
      }
    } catch (err) {
      console.error('Error showing notification:', err)
    }
  }

  const value = {
    settings,
    updateSetting,
    getAnimationProps,
    showNotification,
    mounted,
    error
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-xl font-bold mb-2">Settings Error</h2>
          <p className="text-gray-300">Failed to load user settings. Using defaults.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}
