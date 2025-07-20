import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Sample educational background data
const educationData = [
  {
    id: 1,
    institution: "University of Technology",
    degree: "Bachelor of Computer Science",
    period: "2020 - 2024",
    status: "In Progress",
    gpa: "3.8/4.0",
    major: "Computer Science",
    minor: "Mathematics",
    description: "Focused on software engineering, algorithms, and data structures. Active in programming clubs and hackathons.",
    courses: [
      "Data Structures & Algorithms",
      "Software Engineering",
      "Database Systems",
      "Web Development",
      "Computer Networks",
      "Operating Systems",
      "Machine Learning Fundamentals",
      "Mobile App Development"
    ],
    achievements: [
      "Dean's List - Fall 2022, Spring 2023",
      "Programming Competition - 2nd Place",
      "Hackathon Winner - Best Innovation Award",
      "Computer Science Club President"
    ],
    projects: [
      "E-commerce Platform Development",
      "Machine Learning Stock Predictor",
      "Mobile Task Management App"
    ],
    category: "Higher Education",
    tags: ["Computer Science", "Programming", "Software Engineering", "Algorithms"]
  },
  {
    id: 2,
    institution: "Tech Academy High School",
    degree: "High School Diploma",
    period: "2016 - 2020",
    status: "Completed",
    gpa: "3.9/4.0",
    major: "STEM Focus",
    description: "Specialized in Science, Technology, Engineering, and Mathematics with advanced placement courses.",
    courses: [
      "AP Computer Science A",
      "AP Calculus BC",
      "AP Physics C",
      "AP Chemistry",
      "Advanced Mathematics",
      "Digital Design",
      "Robotics Engineering",
      "Statistics"
    ],
    achievements: [
      "Valedictorian Candidate",
      "National Honor Society Member",
      "Science Fair - 1st Place Regional",
      "Robotics Team Captain",
      "Math Olympiad Participant"
    ],
    projects: [
      "Autonomous Robot Navigation System",
      "Weather Monitoring IoT Device",
      "School Management System"
    ],
    category: "Secondary Education",
    tags: ["STEM", "Robotics", "Mathematics", "Science"]
  },
  {
    id: 3,
    institution: "Online Learning Platforms",
    degree: "Professional Certifications",
    period: "2021 - Present",
    status: "Ongoing",
    description: "Continuous learning through various online platforms to stay updated with latest technologies.",
    courses: [
      "Full Stack Web Development (Coursera)",
      "AWS Cloud Practitioner",
      "Google Analytics Certified",
      "React Advanced Patterns (Udemy)",
      "Node.js Microservices (Pluralsight)",
      "Docker & Kubernetes Fundamentals",
      "Python for Data Science",
      "Cybersecurity Fundamentals"
    ],
    achievements: [
      "AWS Certified Cloud Practitioner",
      "Google Analytics Individual Qualification",
      "freeCodeCamp Full Stack Certification",
      "Coursera Specialization Certificates"
    ],
    projects: [
      "Cloud-based Portfolio Website",
      "Microservices Architecture Implementation",
      "Data Visualization Dashboard"
    ],
    category: "Professional Development",
    tags: ["Cloud Computing", "Web Development", "Data Science", "Certifications"]
  }
]

const studyAreas = [
  { name: "Computer Science", count: 15, color: "bg-blue-500" },
  { name: "Web Development", count: 12, color: "bg-green-500" },
  { name: "Mathematics", count: 8, color: "bg-purple-500" },
  { name: "Software Engineering", count: 10, color: "bg-red-500" },
  { name: "Data Science", count: 6, color: "bg-yellow-500" },
  { name: "Cloud Computing", count: 5, color: "bg-indigo-500" },
  { name: "Mobile Development", count: 4, color: "bg-pink-500" },
  { name: "Machine Learning", count: 7, color: "bg-teal-500" }
]

export default function BackgroundStudy() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredData, setFilteredData] = useState(educationData)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let filtered = educationData

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.major?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredData(filtered)
  }, [searchTerm, selectedCategory])

  if (!mounted) return null

  const categories = ['All', ...new Set(educationData.map(item => item.category))]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'Ongoing':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <Head>
        <title>Background Study - PNC STUDENT</title>
        <meta name="description" content="Educational background and academic achievements of PNC STUDENT" />
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6 py-6"
        >
          <div className="flex justify-between items-center">
            <Link href="/">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent cursor-pointer"
              >
                PNC
              </motion.div>
            </Link>
            <div className="flex items-center space-x-8">
              <Link href="/">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Home
                </motion.span>
              </Link>
              <Link href="/project-details">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Projects
                </motion.span>
              </Link>
              <motion.span className="text-white font-medium">
                Background Study
              </motion.span>
            </div>
          </div>
        </motion.nav>

        {/* Header */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                My Educational Journey
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Explore my academic background, courses, achievements, and continuous learning journey in technology and computer science.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search Input */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search courses, institutions, skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                
                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Study Areas Overview */}
        <section className="py-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Study Areas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {studyAreas.map((area, index) => (
                  <motion.div
                    key={area.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center"
                  >
                    <div className={`w-3 h-3 ${area.color} rounded-full mx-auto mb-2`}></div>
                    <div className="text-sm font-medium text-white">{area.name}</div>
                    <div className="text-xs text-gray-400">{area.count} courses</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Education Timeline */}
        <section className="py-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-8">Educational Background</h2>
              <div className="space-y-8">
                {filteredData.map((education, index) => (
                  <motion.div
                    key={education.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{education.institution}</h3>
                          <p className="text-lg text-purple-300">{education.degree}</p>
                          <p className="text-gray-400">{education.period}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(education.status)}`}>
                            {education.status}
                          </span>
                          {education.gpa && (
                            <span className="px-3 py-1 text-sm bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/30">
                              GPA: {education.gpa}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div>
                          <p className="text-gray-300 mb-6">{education.description}</p>
                          
                          {education.major && (
                            <div className="mb-4">
                              <h4 className="text-lg font-semibold text-white mb-2">Major/Focus</h4>
                              <p className="text-purple-300">{education.major}</p>
                              {education.minor && <p className="text-gray-400">Minor: {education.minor}</p>}
                            </div>
                          )}

                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Key Courses</h4>
                            <div className="flex flex-wrap gap-2">
                              {education.courses.slice(0, 6).map((course, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
                                >
                                  {course}
                                </span>
                              ))}
                              {education.courses.length > 6 && (
                                <span className="px-3 py-1 text-sm bg-gray-500/20 text-gray-300 rounded-full border border-gray-500/30">
                                  +{education.courses.length - 6} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div>
                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Achievements</h4>
                            <ul className="space-y-2">
                              {education.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-center text-gray-300">
                                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Notable Projects</h4>
                            <ul className="space-y-2">
                              {education.projects.map((project, idx) => (
                                <li key={idx} className="flex items-center text-gray-300">
                                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                  {project}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="flex flex-wrap gap-2">
                          {education.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded border border-purple-500/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredData.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-xl text-gray-300">No results found</p>
                  <p className="text-gray-400">Try adjusting your search terms or filters</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Back to Home */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                ← Back to Home
              </motion.button>
            </Link>
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
    </div>
  )
}
