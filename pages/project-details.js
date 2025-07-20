import Head from 'next/head'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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

// Sample project data - you can replace this with real project information
const projects = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS featuring smooth animations and a professional design.",
    longDescription: "This personal portfolio website showcases modern web development practices using Next.js 14, React 18, and Tailwind CSS. The site features a responsive design that works seamlessly across all devices, smooth animations powered by Framer Motion, and a professional gradient color scheme. The website includes sections for about, skills, projects, and contact information, all optimized for performance and SEO.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "JavaScript"],
    features: [
      "Responsive design for all devices",
      "Smooth scroll animations",
      "Modern gradient backgrounds",
      "Interactive hover effects",
      "SEO optimized",
      "Fast loading performance"
    ],
    status: "Completed",
    demoUrl: "#",
    githubUrl: "#",
    image: "/api/placeholder/600/400",
    category: "Web Development"
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.",
    longDescription: "A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, shopping cart functionality, payment processing, order management, and an admin dashboard for inventory management. The platform is designed to be scalable and secure, with a focus on user experience and performance.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "JWT"],
    features: [
      "User authentication and authorization",
      "Shopping cart and checkout process",
      "Payment integration with Stripe",
      "Order tracking and management",
      "Admin dashboard",
      "Inventory management",
      "Responsive design"
    ],
    status: "In Development",
    demoUrl: "#",
    githubUrl: "#",
    image: "/api/placeholder/600/400",
    category: "Full Stack"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates and team features.",
    longDescription: "A collaborative task management application designed for teams to organize, track, and complete projects efficiently. The app features real-time updates, team collaboration tools, project timelines, and progress tracking. Built with modern technologies to ensure reliability and performance.",
    technologies: ["React", "Firebase", "Material-UI", "Real-time Database"],
    features: [
      "Real-time collaboration",
      "Task assignment and tracking",
      "Project timelines",
      "Team management",
      "Progress visualization",
      "Notification system",
      "Mobile responsive"
    ],
    status: "Planning",
    demoUrl: "#",
    githubUrl: "#",
    image: "/api/placeholder/600/400",
    category: "Web Application"
  }
]

export default function ProjectDetails() {
  const [mounted, setMounted] = useState(false)
  const [selectedProject, setSelectedProject] = useState(projects[0])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'In Development':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'Planning':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <Head>
        <title>Project Details - PNC STUDENT</title>
        <meta name="description" content="Detailed view of projects by PNC STUDENT" />
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
              <Link href="/background-study">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Background
                </motion.span>
              </Link>
              <motion.span
                className="text-white font-medium"
              >
                Project Details
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
                Project Details
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Explore detailed information about my projects, technologies used, and key features implemented.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Project Selection */}
        <section className="py-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setSelectedProject(project)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    selectedProject.id === project.id
                      ? 'bg-purple-500/20 border-purple-500/50'
                      : 'bg-white/5 border-white/10 hover:border-purple-500/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  <div className="text-xs text-purple-300">{project.category}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Selected Project Details */}
        <section className="py-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
            >
              {/* Project Header */}
              <div className="p-8 border-b border-white/10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                    <p className="text-gray-300 text-lg">{selectedProject.description}</p>
                  </div>
                  <div className="flex gap-4">
                    <motion.a
                      href={selectedProject.demoUrl}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    >
                      Live Demo
                    </motion.a>
                    <motion.a
                      href={selectedProject.githubUrl}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 border-2 border-purple-500 rounded-full font-semibold text-white hover:bg-purple-500/10 transition-all duration-300"
                    >
                      View Code
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">About This Project</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {selectedProject.longDescription}
                    </p>
                    
                    <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies & Status */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">Project Status</h3>
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`px-4 py-2 rounded-full border ${getStatusColor(selectedProject.status)}`}>
                        {selectedProject.status}
                      </span>
                      <span className="text-gray-300">{selectedProject.category}</span>
                    </div>

                    {/* Project Image Placeholder */}
                    <div className="bg-gray-800/50 rounded-xl p-8 text-center">
                      <div className="text-4xl mb-4">🖼️</div>
                      <p className="text-gray-400">Project Screenshot</p>
                      <p className="text-sm text-gray-500 mt-2">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
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
