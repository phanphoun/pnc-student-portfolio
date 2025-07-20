import Head from 'next/head'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getDatabase } from '../lib/database'
import ContactForm from '../components/ContactForm'
import Dashboard from '../components/Dashboard'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [selectedAboutCard, setSelectedAboutCard] = useState(null)
  const [likedSkills, setLikedSkills] = useState({})
  const [skillInteractions, setSkillInteractions] = useState({})
  const [stats, setStats] = useState({
    totalVisitors: 0,
    totalMessages: 0,
    totalLikes: 0
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setMounted(true)
        
        // Only initialize database if we're in the browser
        if (typeof window !== 'undefined') {
          // Add a small delay to ensure DOM is ready
          await new Promise(resolve => setTimeout(resolve, 100))
          
          const db = getDatabase()
          
          // Safely track page view
          try {
            db.trackPageView('homepage')
          } catch (err) {
            console.warn('Could not track page view:', err)
          }
          
          // Safely initialize visitor tracking
          try {
            db.addVisitor({
              page: 'homepage',
              userAgent: navigator?.userAgent || 'Unknown',
              timestamp: new Date().toISOString()
            })
          } catch (err) {
            console.warn('Could not add visitor:', err)
          }
          
          // Safely load existing data
          try {
            const statsData = db.getStats()
            setStats(statsData || { totalVisitors: 0, totalMessages: 0, totalLikes: 0 })
          } catch (err) {
            console.warn('Could not load stats:', err)
          }
          
          try {
            const interactions = db.getSkillInteractions()
            setSkillInteractions(interactions || {})
          } catch (err) {
            console.warn('Could not load skill interactions:', err)
          }
          
          // Safely load liked skills
          try {
            const skills = [
              "JavaScript", "React", "Next.js", "Node.js",
              "Python", "HTML/CSS", "Git", "Tailwind CSS",
              "MongoDB", "Express", "TypeScript", "Figma"
            ]
            const likes = {}
            skills.forEach(skill => {
              try {
                likes[skill] = db.getLikes('skill', skill) || false
              } catch (err) {
                likes[skill] = false
              }
            })
            setLikedSkills(likes)
          } catch (err) {
            console.warn('Could not load liked skills:', err)
          }
        }
      } catch (err) {
        console.error('Error initializing homepage:', err)
        setError(err)
      }
    }
    
    initializeApp()
  }, [])

  const handleLogout = () => {
    const db = getDatabase()
    db.logout()
    setCurrentUser(null)
  }

  const handleLoginClick = () => {
    window.location.href = '/login'
  }

  // Simplified error state - just show a basic message without reload button
  if (error) {
    console.error('Homepage error:', error)
    // Don't show error UI, just log and continue with basic functionality
    setError(null)
  }

  // Show loading only briefly
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your portfolio...</p>
        </div>
      </div>
    )
  }

  const handleSkillClick = (skillName) => {
    const db = getDatabase()
    const newCount = db.incrementSkillInteraction(skillName)
    setSkillInteractions(prev => ({ ...prev, [skillName]: newCount }))
    
    // Toggle like
    const isLiked = db.toggleLike('skill', skillName)
    setLikedSkills(prev => ({ ...prev, [skillName]: isLiked }))
    
    // Track interaction
    db.trackInteraction('skill_click', { skill: skillName, liked: isLiked })
  }

  const handleContactClick = (label) => {
    const db = getDatabase()
    db.trackInteraction('contact_click', { type: label })
    
    switch (label) {
      case "Email":
        setShowContactForm(true)
        break;
      case "LinkedIn":
        window.open("https://www.linkedin.com/in/your-username/", "_blank");
        break;
      case "GitHub":
        window.open("https://github.com/your-username", "_blank");
        break;
      default:
        break;
    }
  }

  const handleProjectBookmark = (projectTitle) => {
    const db = getDatabase()
    const isBookmarked = db.toggleBookmark({
      id: projectTitle.toLowerCase().replace(/\s+/g, '-'),
      type: 'project',
      title: projectTitle
    })
    
    db.trackInteraction('project_bookmark', { project: projectTitle, bookmarked: isBookmarked })
    
    // Show feedback
    const message = isBookmarked ? 'Project bookmarked!' : 'Bookmark removed!'
    if (typeof window !== 'undefined') {
      const notification = document.createElement('div')
      notification.textContent = message
      notification.className = 'fixed top-4 right-4 bg-purple-500 text-white px-4 py-2 rounded-lg z-50'
      document.body.appendChild(notification)
      setTimeout(() => document.body.removeChild(notification), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <Head>
        <title>PNC STUDENT - Personal Website</title>
        <meta name="description" content="Personal website of PNC STUDENT - Passionate Student & Future Developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <main className="relative z-10">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="fixed top-0 left-0 right-0 z-50 p-6 bg-slate-900/80 backdrop-blur-md border-b border-white/10"
        >
          <div className="flex justify-between items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            >
              PNC-Student
            </motion.div>
            <div className="flex items-center space-x-8">
              {[
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '/project-details' },
                { name: 'Background', href: '/background-study' },
                { name: 'Skills', href: '#skills' },
                { name: 'Contact', href: '#contact' }
              ].map((item) => (
                item.href.startsWith('#') ? (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {item.name}
                  </motion.a>
                ) : (
                  <Link key={item.name} href={item.href}>
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                )
              ))}
              {currentUser ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                  title="Logout"
                >
                  Logout
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLoginClick}
                  className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                  title="Login"
                >
                  Login
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDashboard(true)}
                className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                title="User Dashboard"
              >
                📊
              </motion.button>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-24">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Phan Phoun
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-3xl mb-12 text-gray-300 font-light leading-relaxed"
            >
              Passionate Student 💖Future Developer ❤️ Web Developer
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/project-details">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  View My Work
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowContactForm(true)}
                className="px-8 py-4 border-2 border-purple-500 rounded-full font-semibold text-lg hover:bg-purple-500/10 transition-all duration-300"
              >
                Get In Touch
              </motion.button>
            </motion.div>

            {/* Stats Display */}
            {stats.totalVisitors > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-12 flex justify-center gap-8 text-sm text-gray-400"
              >
                <div>👀 {stats.totalVisitors} visitors</div>
                <div>💬 {stats.totalMessages} messages</div>
                <div>❤️ {stats.totalLikes} likes</div>
              </motion.div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    I am a dedicated student with an insatiable curiosity for technology and innovation. 
                    Currently pursuing my academic journey while diving deep into the world of web development, 
                    software engineering, and modern technologies.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    My passion lies in creating meaningful digital experiences and solving complex problems 
                    through code. I believe in continuous learning and staying updated with the latest 
                    industry trends and best practices.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { 
                    label: "Student", 
                    icon: "🎓",
                    title: "Passionate Learner",
                    description: "Currently pursuing my academic journey with a focus on computer science and technology. I believe in the power of continuous learning and academic excellence.",
                    details: [
                      "📚 Computer Science Student",
                      "🏆 Academic Excellence Focus",
                      "📖 Continuous Learning Mindset",
                      "🎯 Goal-Oriented Approach",
                      "👥 Collaborative Team Player"
                    ],
                    achievements: [
                      "Dean's List Recognition",
                      "Programming Competition Participant",
                      "Study Group Leader",
                      "Academic Mentor"
                    ]
                  },
                  { 
                    label: "Developer", 
                    icon: "💻",
                    title: "Full-Stack Developer",
                    description: "Building modern web applications with cutting-edge technologies. I specialize in creating responsive, user-friendly interfaces and robust backend systems.",
                    details: [
                      "🌐 Frontend: React, Next.js, TypeScript",
                      "⚙️ Backend: Node.js, Express, Python",
                      "🗄️ Database: MongoDB, PostgreSQL",
                      "🎨 Design: Figma, Tailwind CSS",
                      "🔧 Tools: Git, VS Code, Docker"
                    ],
                    achievements: [
                      "10+ Personal Projects",
                      "Open Source Contributor",
                      "Modern Tech Stack Expertise",
                      "Responsive Design Specialist"
                    ]
                  },
                  { 
                    label: "Problem Solver", 
                    icon: "🧩",
                    title: "Analytical Thinker",
                    description: "I thrive on breaking down complex problems into manageable solutions. My approach combines logical thinking with creative problem-solving techniques.",
                    details: [
                      "🔍 Root Cause Analysis",
                      "💡 Creative Solution Design",
                      "📊 Data-Driven Decisions",
                      "🔄 Iterative Improvement",
                      "🎯 Efficient Implementation"
                    ],
                    achievements: [
                      "Algorithm Optimization Expert",
                      "Debug Master",
                      "System Architecture Designer",
                      "Performance Optimization Specialist"
                    ]
                  },
                  { 
                    label: "Tech Enthusiast", 
                    icon: "🚀",
                    title: "Innovation Explorer",
                    description: "Always excited about emerging technologies and industry trends. I love exploring new frameworks, tools, and methodologies to stay ahead of the curve.",
                    details: [
                      "🤖 AI & Machine Learning Interest",
                      "☁️ Cloud Computing Explorer",
                      "📱 Mobile Development Enthusiast",
                      "🔒 Cybersecurity Awareness",
                      "🌟 Latest Tech Trends Follower"
                    ],
                    achievements: [
                      "Early Technology Adopter",
                      "Tech Community Member",
                      "Innovation Workshop Participant",
                      "Future Tech Researcher"
                    ]
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedAboutCard(item)
                      setShowAboutModal(true)
                    }}
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300 group"
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">{item.label}</div>
                    <div className="text-xs text-purple-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to learn more
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6 bg-black/20">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Skills & development
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {[
                { name: "JavaScript", icon: "🟨", hasPage: true },
                { name: "React", icon: "⚛️", hasPage: true },
                { name: "Python", icon: "🐍", hasPage: true },
                { name: "Next.js", icon: "▲", hasPage: true },
                { name: "Node.js", icon: "🟢", hasPage: true },
                { name: "HTML/CSS", icon: "🎨", hasPage: true },
                { name: "Git", icon: "📚", hasPage: true },
                { name: "Tailwind CSS", icon: "👨‍💻", hasPage: true },
                { name: "MongoDB", icon: "🍃", hasPage: true },
                { name: "Express", icon: "🚀", hasPage: true },
                { name: "TypeScript", icon: "📘", hasPage: true },
                { name: "Figma", icon: "🎨", hasPage: true }
              ].map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    if (skill.hasPage) {
                      window.location.href = `/skills/${skill.name.toLowerCase()}`
                    } else {
                      handleSkillClick(skill.name)
                    }
                  }}
                >
                  <div className="text-3xl mb-2">{skill.icon}</div>
                  <div className="text-lg font-medium text-white mb-2">{skill.name}</div>
                  {skill.hasPage ? (
                    <div className="text-sm text-purple-400 group-hover:text-white transition-colors duration-200">
                      📚 Learn More
                    </div>
                  ) : (
                    <button
                      className="text-sm text-purple-500 hover:text-white transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSkillClick(skill.name)
                      }}
                    >
                      {likedSkills[skill.name] ? '❤️ Liked' : '🤍 Like'}
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Personal Portfolio",
                  description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS.",
                  tech: ["Next.js", "Tailwind", "Framer Motion"],
                  status: "In Progress"
                },
                {
                  title: "E-Commerce Platform",
                  description: "Full-stack e-commerce solution with user authentication and payment integration.",
                  tech: ["React", "Node.js", "MongoDB"],
                  status: "Planning"
                },
                {
                  title: "Task Management App",
                  description: "Collaborative task management tool with real-time updates and team features.",
                  tech: ["React", "Firebase", "Material-UI"],
                  status: "Concept"
                }
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <span className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button
                    className="text-sm text-purple-500 hover:text-white transition-colors duration-200"
                    onClick={() => handleProjectBookmark(project.title)}
                  >
                    Bookmark
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-black/20">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Let's Connect
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                I'm always open to discussing new opportunities, collaborations, or just having a chat about technology!
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "📧",
                    label: "Email",
                    value: "phanphoun@gmail.com",
                    href: "mailto:phanphoun@gmail.com"
                  },
                  {
                    icon: "💼",
                    label: "LinkedIn",
                    value: "phanphoun",
                    href: "https://linkedin.com/in/phanphoun"
                  },
                  {
                    icon: "🐙",
                    label: "GitHub",
                    value: "phanphoun.github.io",
                    href: "https://github.com/phanphoun.github.io"
                  }
                ].map((contact) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 block"
                  >
                    <div className="text-3xl mb-3">{contact.icon}</div>
                    <div className="text-lg font-semibold text-white mb-1">{contact.label}</div>
                    <div className="text-gray-300">{contact.value}</div>
                    <button
                      className="text-sm text-purple-500 hover:text-white transition-colors duration-200"
                      onClick={() => handleContactClick(contact.label)}
                    >
                      Contact
                    </button>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 bg-black/30">
        <div className="container mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-400"
          >
            &copy; {new Date().getFullYear()} PNC STUDENT. Crafted with 💜 and lots of ☕
          </motion.p>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {showContactForm && (
          <ContactForm
            key="contact-form"
            onClose={() => setShowContactForm(false)}
          />
        )}
        {showDashboard && (
          <Dashboard
            key="dashboard"
            onClose={() => setShowDashboard(false)}
          />
        )}
        {showAboutModal && selectedAboutCard && (
          <motion.div
            key="about-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAboutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl rounded-2xl border border-white/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{selectedAboutCard.icon}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedAboutCard.title}</h2>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                      {selectedAboutCard.label}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {selectedAboutCard.description}
                </p>
              </div>

              {/* Details Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-purple-400">🔍</span>
                  Key Details
                </h3>
                <div className="grid gap-3">
                  {selectedAboutCard.details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <span className="text-gray-300">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Achievements Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-yellow-400">🏆</span>
                  Achievements & Highlights
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedAboutCard.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20"
                    >
                      <span className="text-green-400 text-sm">✓</span>
                      <span className="text-gray-300 text-sm">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAboutModal(false)}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  Got it! 👍
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
