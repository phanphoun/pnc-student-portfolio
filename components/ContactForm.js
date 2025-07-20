import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getDatabase } from '../lib/database'

const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      if (typeof window !== 'undefined') {
        const db = getDatabase()
        
        // Save message to database
        const messageData = {
          ...formData,
          timestamp: new Date().toISOString(),
          id: Date.now().toString()
        }
        
        db.addContactMessage(messageData)
        
        // Track interaction
        db.trackInteraction('contact_form_submit', {
          subject: formData.subject,
          timestamp: new Date().toISOString()
        })
        
        setSubmitSuccess(true)
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        
        // Close form after delay
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    } catch (err) {
      console.error('Error submitting contact form:', err)
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-red-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-white mb-2">Error</h3>
            <p className="text-gray-300 mb-6">{error}</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <span className="text-2xl">✓</span>
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon!</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
              errors.name ? 'border-red-500' : 'border-white/20 focus:border-purple-500'
            }`}
            placeholder="Your name"
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.name}
            </motion.p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
              errors.email ? 'border-red-500' : 'border-white/20 focus:border-purple-500'
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.email}
            </motion.p>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Subject *
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
            errors.subject ? 'border-red-500' : 'border-white/20 focus:border-purple-500'
          }`}
          placeholder="What's this about?"
        />
        {errors.subject && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-1"
          >
            {errors.subject}
          </motion.p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
            errors.message ? 'border-red-500' : 'border-white/20 focus:border-purple-500'
          }`}
          placeholder="Tell me about your project, question, or just say hi!"
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-1"
          >
            {errors.message}
          </motion.p>
        )}
        <div className="text-right text-sm text-gray-400 mt-1">
          {formData.message.length}/500
        </div>
      </div>
      
      <div className="flex gap-4">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
            isSubmitting
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/25'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Sending...
            </div>
          ) : (
            'Send Message'
          )}
        </motion.button>
        
        <motion.button
          type="button"
          onClick={onClose}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 border-2 border-gray-500 rounded-xl font-semibold text-gray-300 hover:bg-gray-500/10 transition-all duration-300"
        >
          Cancel
        </motion.button>
      </div>
    </form>
  )
}

export default ContactForm
