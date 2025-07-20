// Simple client-side database utility using localStorage
// This can be easily upgraded to a real database later

class LocalDatabase {
  constructor() {
    this.dbName = 'pnc_student_portfolio_db'
    this.initializeDB()
  }

  initializeDB() {
    if (typeof window === 'undefined') return // Server-side rendering check
    
    try {
      const existingDB = localStorage.getItem(this.dbName)
      if (!existingDB) {
        const defaultData = this.getDefaultData()
        localStorage.setItem(this.dbName, JSON.stringify(defaultData))
      }
    } catch (error) {
      console.warn('Could not initialize database:', error)
      // Continue without localStorage if it fails
    }
  }

  getDB() {
    if (typeof window === 'undefined') return this.getDefaultData()
    
    try {
      const data = localStorage.getItem(this.dbName)
      if (!data) {
        const defaultData = this.getDefaultData()
        this.saveDB(defaultData)
        return defaultData
      }
      return JSON.parse(data)
    } catch (error) {
      console.warn('Error reading database, using defaults:', error)
      return this.getDefaultData()
    }
  }

  saveDB(data) {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(this.dbName, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving to database:', error)
      // Continue without saving if localStorage fails
    }
  }

  getDefaultData() {
    return {
      visitors: [],
      comments: [],
      likes: {},
      bookmarks: [],
      contactMessages: [],
      projectViews: {},
      skillInteractions: {},
      searchHistory: [],
      users: [],
      currentUser: null,
      userPreferences: {
        theme: 'dark',
        animationsEnabled: true,
        notificationsEnabled: true,
        autoSave: true,
        language: 'en',
        fontSize: 'medium',
        reducedMotion: false,
        soundEnabled: false,
        compactMode: false,
        showStats: true,
        backgroundStyle: 'gradient',
        accentColor: 'purple',
        displayName: '',
        bio: '',
        socialLinks: {
          github: '',
          linkedin: '',
          twitter: '',
          website: ''
        }
      },
      analytics: {
        pageViews: {},
        timeSpent: {},
        interactions: {}
      }
    }
  }

  // Visitor tracking
  addVisitor(visitorData) {
    const db = this.getDB()
    const visitor = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...visitorData
    }
    db.visitors.push(visitor)
    this.saveDB(db)
    return visitor
  }

  getVisitors() {
    const db = this.getDB()
    return db.visitors || []
  }

  // Comments system
  addComment(comment) {
    const db = this.getDB()
    const newComment = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: [],
      ...comment
    }
    db.comments.push(newComment)
    this.saveDB(db)
    return newComment
  }

  getComments(section = null) {
    const db = this.getDB()
    const comments = db.comments || []
    return section ? comments.filter(c => c.section === section) : comments
  }

  likeComment(commentId) {
    const db = this.getDB()
    const comment = db.comments.find(c => c.id === commentId)
    if (comment) {
      comment.likes = (comment.likes || 0) + 1
      this.saveDB(db)
    }
    return comment
  }

  // Likes system
  toggleLike(itemType, itemId) {
    const db = this.getDB()
    const key = `${itemType}_${itemId}`
    db.likes[key] = !db.likes[key]
    this.saveDB(db)
    return db.likes[key]
  }

  getLikes(itemType, itemId) {
    const db = this.getDB()
    const key = `${itemType}_${itemId}`
    return db.likes[key] || false
  }

  getLikeCount(itemType) {
    const db = this.getDB()
    return Object.keys(db.likes).filter(key => 
      key.startsWith(itemType) && db.likes[key]
    ).length
  }

  // Bookmarks
  toggleBookmark(item) {
    const db = this.getDB()
    const existingIndex = db.bookmarks.findIndex(b => b.id === item.id && b.type === item.type)
    
    if (existingIndex > -1) {
      db.bookmarks.splice(existingIndex, 1)
    } else {
      db.bookmarks.push({
        ...item,
        bookmarkedAt: new Date().toISOString()
      })
    }
    
    this.saveDB(db)
    return existingIndex === -1
  }

  getBookmarks() {
    const db = this.getDB()
    return db.bookmarks || []
  }

  // Contact messages
  addContactMessage(message) {
    const db = this.getDB()
    const newMessage = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'unread',
      ...message
    }
    db.contactMessages.push(newMessage)
    this.saveDB(db)
    return newMessage
  }

  getContactMessages() {
    const db = this.getDB()
    return db.contactMessages || []
  }

  // Project views tracking
  incrementProjectView(projectId) {
    const db = this.getDB()
    db.projectViews[projectId] = (db.projectViews[projectId] || 0) + 1
    this.saveDB(db)
    return db.projectViews[projectId]
  }

  getProjectViews(projectId) {
    const db = this.getDB()
    return db.projectViews[projectId] || 0
  }

  // Skill interactions
  incrementSkillInteraction(skillName) {
    const db = this.getDB()
    db.skillInteractions[skillName] = (db.skillInteractions[skillName] || 0) + 1
    this.saveDB(db)
    return db.skillInteractions[skillName]
  }

  getSkillInteractions() {
    const db = this.getDB()
    return db.skillInteractions || {}
  }

  // Search history
  addSearchTerm(term, section) {
    const db = this.getDB()
    const searchEntry = {
      term,
      section,
      timestamp: new Date().toISOString(),
      count: 1
    }
    
    const existing = db.searchHistory.find(s => s.term === term && s.section === section)
    if (existing) {
      existing.count++
      existing.timestamp = new Date().toISOString()
    } else {
      db.searchHistory.push(searchEntry)
    }
    
    // Keep only last 50 searches
    if (db.searchHistory.length > 50) {
      db.searchHistory = db.searchHistory.slice(-50)
    }
    
    this.saveDB(db)
    return searchEntry
  }

  getSearchHistory() {
    const db = this.getDB()
    return db.searchHistory || []
  }

  getPopularSearches(limit = 5) {
    const history = this.getSearchHistory()
    return history
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }

  // User preferences
  getUserSettings() {
    const db = this.getDB()
    return db.userPreferences || {}
  }

  updateUserSettings(settings) {
    const db = this.getDB()
    db.userPreferences = { ...db.userPreferences, ...settings }
    this.saveDB(db)
    return db.userPreferences
  }

  resetUserSettings() {
    const db = this.getDB()
    db.userPreferences = {
      theme: 'dark', 
      animationsEnabled: true,
      notificationsEnabled: true,
      autoSave: true,
      language: 'en',
      fontSize: 'medium', 
      reducedMotion: false,
      soundEnabled: false,
      compactMode: false,
      showStats: true,
      backgroundStyle: 'gradient', 
      accentColor: 'purple', 
      displayName: '',
      bio: '',
      socialLinks: {
        github: '',
        linkedin: '',
        twitter: '',
        website: ''
      }
    }
    this.saveDB(db)
    return db.userPreferences
  }

  getSetting(key) {
    const settings = this.getUserSettings()
    return settings[key]
  }

  setSetting(key, value) {
    const settings = this.getUserSettings()
    settings[key] = value
    return this.updateUserSettings(settings)
  }

  // Theme Management
  setTheme(theme) {
    return this.setSetting('theme', theme)
  }

  getTheme() {
    return this.getSetting('theme') || 'dark'
  }

  // Animation Settings
  toggleAnimations() {
    const current = this.getSetting('animationsEnabled')
    return this.setSetting('animationsEnabled', !current)
  }

  // Notification Settings
  toggleNotifications() {
    const current = this.getSetting('notificationsEnabled')
    return this.setSetting('notificationsEnabled', !current)
  }

  // Personalization
  setDisplayName(name) {
    return this.setSetting('displayName', name)
  }

  setBio(bio) {
    return this.setSetting('bio', bio)
  }

  updateSocialLinks(links) {
    const current = this.getSetting('socialLinks') || {}
    const updated = { ...current, ...links }
    return this.setSetting('socialLinks', updated)
  }

  // Analytics
  trackPageView(page) {
    const db = this.getDB()
    db.analytics.pageViews[page] = (db.analytics.pageViews[page] || 0) + 1
    this.saveDB(db)
  }

  trackTimeSpent(page, seconds) {
    const db = this.getDB()
    db.analytics.timeSpent[page] = (db.analytics.timeSpent[page] || 0) + seconds
    this.saveDB(db)
  }

  trackInteraction(type, details) {
    try {
      const db = this.getDB()
      if (!db.analytics) db.analytics = {}
      if (!db.analytics.interactions) db.analytics.interactions = {}
      
      const key = `${type}_${Date.now()}`
      db.analytics.interactions[key] = {
        type,
        details,
        timestamp: new Date().toISOString()
      }
      this.saveDB(db)
    } catch (error) {
      console.error('Error tracking interaction:', error)
    }
  }

  getAnalytics() {
    const db = this.getDB()
    return db.analytics || {}
  }

  // Utility methods
  clearAllData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.dbName)
      this.initializeDB()
    }
  }

  exportData() {
    return this.getDB()
  }

  importData(data) {
    this.saveDB(data)
  }

  getStats() {
    const db = this.getDB()
    return {
      totalVisitors: db.visitors.length,
      totalComments: db.comments.length,
      totalLikes: Object.values(db.likes).filter(Boolean).length,
      totalBookmarks: db.bookmarks.length,
      totalMessages: db.contactMessages.length,
      totalSearches: db.searchHistory.length,
      mostViewedProject: Object.entries(db.projectViews).sort(([,a], [,b]) => b - a)[0],
      mostInteractedSkill: Object.entries(db.skillInteractions).sort(([,a], [,b]) => b - a)[0]
    }
  }

  // User Authentication Methods
  addUser(user) {
    try {
      const db = this.getDB()
      if (!db.users) db.users = []
      
      const newUser = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        ...user
      }
      
      db.users.push(newUser)
      this.saveDB(db)
      return newUser
    } catch (error) {
      console.error('Error adding user:', error)
      return null
    }
  }

  getUsers() {
    try {
      const db = this.getDB()
      return db.users || []
    } catch (error) {
      console.error('Error getting users:', error)
      return []
    }
  }

  getUserById(userId) {
    try {
      const users = this.getUsers()
      return users.find(user => user.id === userId)
    } catch (error) {
      console.error('Error getting user by ID:', error)
      return null
    }
  }

  getUserByEmail(email) {
    try {
      const users = this.getUsers()
      return users.find(user => user.email === email)
    } catch (error) {
      console.error('Error getting user by email:', error)
      return null
    }
  }

  setCurrentUser(user) {
    try {
      const db = this.getDB()
      db.currentUser = user
      
      // Update last login time
      if (user && db.users) {
        const userIndex = db.users.findIndex(u => u.id === user.id)
        if (userIndex > -1) {
          db.users[userIndex].lastLogin = new Date().toISOString()
        }
      }
      
      this.saveDB(db)
      return user
    } catch (error) {
      console.error('Error setting current user:', error)
      return null
    }
  }

  getCurrentUser() {
    try {
      const db = this.getDB()
      return db.currentUser
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  logout() {
    try {
      const db = this.getDB()
      db.currentUser = null
      this.saveDB(db)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  updateUser(userId, updates) {
    try {
      const db = this.getDB()
      if (!db.users) return null
      
      const userIndex = db.users.findIndex(user => user.id === userId)
      if (userIndex > -1) {
        db.users[userIndex] = { ...db.users[userIndex], ...updates }
        
        // Update current user if it's the same user
        if (db.currentUser && db.currentUser.id === userId) {
          db.currentUser = db.users[userIndex]
        }
        
        this.saveDB(db)
        return db.users[userIndex]
      }
      
      return null
    } catch (error) {
      console.error('Error updating user:', error)
      return null
    }
  }

  deleteUser(userId) {
    try {
      const db = this.getDB()
      if (!db.users) return false
      
      const userIndex = db.users.findIndex(user => user.id === userId)
      if (userIndex > -1) {
        db.users.splice(userIndex, 1)
        
        // Clear current user if it's the deleted user
        if (db.currentUser && db.currentUser.id === userId) {
          db.currentUser = null
        }
        
        this.saveDB(db)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error deleting user:', error)
      return false
    }
  }

  isUserLoggedIn() {
    try {
      const currentUser = this.getCurrentUser()
      return currentUser !== null
    } catch (error) {
      console.error('Error checking login status:', error)
      return false
    }
  }
}

// Create singleton instance
let dbInstance = null

export const getDatabase = () => {
  if (!dbInstance) {
    dbInstance = new LocalDatabase()
  }
  return dbInstance
}

export default LocalDatabase
