import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Head from 'next/head'
import { getDatabase } from '../lib/database'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const validateForm = () => {
    const newErrors = {}
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    // Registration-specific validation
    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required'
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const db = getDatabase()
      
      if (isLogin) {
        // Login logic
        const users = db.getUsers() || []
        const user = users.find(u => u.email === formData.email && u.password === formData.password)
        
        if (user) {
          // Successful login
          db.setCurrentUser(user)
          db.trackInteraction('user_login', { email: formData.email })
          setLoginSuccess(true)
          
          // Redirect after delay
          setTimeout(() => {
            window.location.href = '/'
          }, 2000)
        } else {
          setErrors({ general: 'Invalid email or password' })
        }
      } else {
        // Registration logic
        const users = db.getUsers() || []
        const existingUser = users.find(u => u.email === formData.email)
        
        if (existingUser) {
          setErrors({ email: 'Email already registered' })
        } else {
          // Create new user
          const newUser = {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            password: formData.password, // In production, this should be hashed
            createdAt: new Date().toISOString(),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=8b5cf6&color=fff`
          }
          
          db.addUser(newUser)
          db.setCurrentUser(newUser)
          db.trackInteraction('user_registration', { email: formData.email })
          setLoginSuccess(true)
          
          // Redirect after delay
          setTimeout(() => {
            window.location.href = '/'
          }, 2000)
        }
      }
    } catch (error) {
      console.error('Authentication error:', error)
      setErrors({ general: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }))
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      rememberMe: false
    })
    setErrors({})
  }

  if (loginSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center text-white"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-green-500 text-8xl mb-6"
          >
            ✓
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">
            {isLogin ? 'Welcome Back!' : 'Welcome to the Community!'}
          </h2>
          <p className="text-gray-300 mb-6">
            {isLogin ? 'Successfully logged in' : 'Account created successfully'}
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
            className="h-1 bg-green-500 rounded-full max-w-xs mx-auto"
          />
          <p className="text-sm text-gray-400 mt-4">Redirecting to homepage...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Head>
        <title>{isLogin ? 'Login' : 'Sign Up'} - PNC Student Portfolio</title>
        <meta name="description" content={`${isLogin ? 'Login to' : 'Create an account on'} PNC Student Portfolio`} />
      </Head>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6"
      >
        <div className="flex justify-between items-center">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent cursor-pointer"
            >
              PNC-Student
            </motion.div>
          </Link>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition-colors"
            >
              ← Back to Home
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Form Container */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-2"
              >
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300"
              >
                {isLogin 
                  ? 'Sign in to access your portfolio dashboard' 
                  : 'Join the community and start building your portfolio'
                }
              </motion.p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              <AnimatePresence>
                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm"
                  >
                    {errors.general}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name Field (Registration only) */}
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                        errors.name ? 'border-red-500' : 'border-white/20'
                      }`}
                      placeholder="Enter your full name"
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
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Enter your email"
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

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors pr-12 ${
                      errors.password ? 'border-red-500' : 'border-white/20'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Confirm Password (Registration only) */}
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                        errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                      }`}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1"
                      >
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Remember Me (Login only) */}
              {isLogin && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600 bg-white/5 border-white/20 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-300">
                    Remember me for 30 days
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </motion.button>
            </form>

            {/* Toggle Mode */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={toggleMode}
                  className="ml-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            {/* Social Login Options */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors">
                  <span className="mr-2">🔗</span>
                  GitHub
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors">
                  <span className="mr-2">💼</span>
                  LinkedIn
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-gray-400 text-sm mt-6"
          >
            By {isLogin ? 'signing in' : 'creating an account'}, you agree to our{' '}
            <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
