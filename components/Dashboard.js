import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getDatabase } from '../lib/database'

const Dashboard = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({})
  const [data, setData] = useState({})
  const [mounted, setMounted] = useState(false)
  const [settings, setSettings] = useState({})

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const db = getDatabase()
      setStats(db.getStats())
      setData({
        comments: db.getComments(),
        bookmarks: db.getBookmarks(),
        messages: db.getContactMessages(),
        searchHistory: db.getSearchHistory(),
        analytics: db.getAnalytics(),
        userPreferences: db.getUserSettings()
      })
      setSettings(db.getUserSettings())
    }
  }, [])

  if (!mounted) return null

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'messages', name: 'Messages', icon: '💬' },
    { id: 'bookmarks', name: 'Bookmarks', icon: '🔖' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ]

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all stored data? This cannot be undone.')) {
      const db = getDatabase()
      db.clearAllData()
      setStats({})
      setData({})
      alert('All data has been cleared!')
    }
  }

  const exportData = () => {
    const db = getDatabase()
    const exportedData = db.exportData()
    const dataStr = JSON.stringify(exportedData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'portfolio-data-export.json'
    link.click()
  }

  const refreshData = () => {
    if (typeof window !== 'undefined') {
      const db = getDatabase()
      setData(db.getAllData())
      setSettings(db.getUserSettings())
    }
  }

  const handleSettingChange = (key, value) => {
    if (typeof window !== 'undefined') {
      const db = getDatabase()
      const updatedSettings = db.setSetting(key, value)
      setSettings(updatedSettings)
      
      // Apply theme immediately if changed
      if (key === 'theme') {
        document.documentElement.setAttribute('data-theme', value)
      }
    }
  }

  const handleSocialLinkChange = (platform, url) => {
    if (typeof window !== 'undefined') {
      const db = getDatabase()
      const updatedSettings = db.updateSocialLinks({ [platform]: url })
      setSettings(updatedSettings)
    }
  }

  const resetAllSettings = () => {
    if (typeof window !== 'undefined') {
      const db = getDatabase()
      const resetSettings = db.resetUserSettings()
      setSettings(resetSettings)
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Visitors', value: stats.totalVisitors || 0, icon: '👥', color: 'bg-blue-500' },
          { label: 'Messages', value: stats.totalMessages || 0, icon: '💬', color: 'bg-green-500' },
          { label: 'Bookmarks', value: stats.totalBookmarks || 0, icon: '🔖', color: 'bg-purple-500' },
          { label: 'Total Likes', value: stats.totalLikes || 0, icon: '❤️', color: 'bg-red-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"
          >
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <span className="text-lg">{stat.icon}</span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportData}
            className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
          >
            📥 Export Data
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearAllData}
            className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-colors"
          >
            🗑️ Clear All Data
          </motion.button>
        </div>
      </div>
    </div>
  )

  const renderMessages = () => (
    <div className="space-y-4">
      {data.messages?.length > 0 ? (
        data.messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-white">{message.subject}</h4>
              <span className="text-xs text-gray-400">
                {new Date(message.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-300 mb-2">From: {message.name} ({message.email})</p>
            <p className="text-gray-300">{message.message}</p>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-4">📭</div>
          <p>No messages yet</p>
        </div>
      )}
    </div>
  )

  const renderBookmarks = () => (
    <div className="space-y-4">
      {data.bookmarks?.length > 0 ? (
        data.bookmarks.map((bookmark, index) => (
          <motion.div
            key={`${bookmark.type}_${bookmark.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-white">{bookmark.title}</h4>
                <p className="text-sm text-gray-400 capitalize">{bookmark.type}</p>
                <p className="text-xs text-gray-500">
                  Bookmarked: {new Date(bookmark.bookmarkedAt).toLocaleDateString()}
                </p>
              </div>
              <span className="text-2xl">🔖</span>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-4">🔖</div>
          <p>No bookmarks yet</p>
        </div>
      )}
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Page Views</h3>
        <div className="space-y-3">
          {Object.entries(data.analytics?.pageViews || {}).map(([page, views]) => (
            <div key={page} className="flex justify-between items-center">
              <span className="text-gray-300 capitalize">{page.replace('-', ' ')}</span>
              <span className="text-white font-semibold">{views} views</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Popular Searches</h3>
        <div className="space-y-2">
          {data.searchHistory?.slice(0, 5).map((search, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-300">"{search.term}"</span>
              <span className="text-sm text-gray-400">{search.count}x</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-8">
      {/* Theme Settings */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          🎨 Theme & Appearance
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
            <select
              value={settings.theme || 'dark'}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Accent Color</label>
            <div className="flex gap-2">
              {['purple', 'blue', 'green', 'orange', 'pink'].map(color => (
                <button
                  key={color}
                  onClick={() => handleSettingChange('accentColor', color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    settings.accentColor === color ? 'border-white' : 'border-transparent'
                  } bg-${color}-500`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Background Style</label>
            <select
              value={settings.backgroundStyle || 'gradient'}
              onChange={(e) => handleSettingChange('backgroundStyle', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
            >
              <option value="gradient">Gradient</option>
              <option value="solid">Solid</option>
              <option value="animated">Animated</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Font Size</label>
            <select
              value={settings.fontSize || 'medium'}
              onChange={(e) => handleSettingChange('fontSize', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Personalization */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          👤 Personalization
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
            <input
              type="text"
              value={settings.displayName || ''}
              onChange={(e) => handleSettingChange('displayName', e.target.value)}
              placeholder="Your display name"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea
              value={settings.bio || ''}
              onChange={(e) => handleSettingChange('bio', e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Social Links</label>
            <div className="space-y-2">
              {Object.entries(settings.socialLinks || {}).map(([platform, url]) => (
                <div key={platform} className="flex items-center gap-2">
                  <span className="w-20 text-sm text-gray-300 capitalize">{platform}:</span>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                    placeholder={`Your ${platform} URL`}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white placeholder-gray-400"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          🖥️ Display Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Show Statistics</span>
            <button
              onClick={() => handleSettingChange('showStats', !settings.showStats)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.showStats ? 'bg-purple-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.showStats ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Compact Mode</span>
            <button
              onClick={() => handleSettingChange('compactMode', !settings.compactMode)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.compactMode ? 'bg-purple-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.compactMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Reduced Motion</span>
            <button
              onClick={() => handleSettingChange('reducedMotion', !settings.reducedMotion)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.reducedMotion ? 'bg-purple-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          ⚙️ Advanced Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Animations Enabled</span>
            <button
              onClick={() => handleSettingChange('animationsEnabled', !settings.animationsEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.animationsEnabled ? 'bg-purple-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.animationsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Notifications</span>
            <button
              onClick={() => handleSettingChange('notificationsEnabled', !settings.notificationsEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notificationsEnabled ? 'bg-purple-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Sound Effects</span>
            <button
              onClick={() => handleSettingChange('soundEnabled', !settings.soundEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.soundEnabled ? 'bg-purple-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Auto Save</span>
            <button
              onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.autoSave ? 'bg-purple-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.autoSave ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
            <select
              value={settings.language || 'en'}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reset Settings */}
      <div className="bg-red-500/10 backdrop-blur-sm p-6 rounded-xl border border-red-500/20">
        <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
          🔄 Reset Settings
        </h3>
        <p className="text-gray-300 mb-4">
          This will reset all your settings to default values. This action cannot be undone.
        </p>
        <button
          onClick={resetAllSettings}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Reset All Settings
        </button>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview()
      case 'messages': return renderMessages()
      case 'bookmarks': return renderBookmarks()
      case 'analytics': return renderAnalytics()
      case 'settings': return renderSettings()
      default: return renderOverview()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 rounded-2xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">User Dashboard</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </motion.button>
        </div>

        <div className="flex h-[calc(90vh-5rem)]">
          {/* Sidebar */}
          <div className="w-64 border-r border-white/10 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.name}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
