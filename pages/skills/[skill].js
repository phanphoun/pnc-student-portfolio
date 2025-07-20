import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Head from 'next/head'
import { getDatabase } from '../../lib/database'

const SkillPage = () => {
  const router = useRouter()
  const { skill } = router.query
  const [mounted, setMounted] = useState(false)
  const [skillData, setSkillData] = useState(null)
  const [activeTab, setActiveTab] = useState('lessons')
  const [completedLessons, setCompletedLessons] = useState([])

  useEffect(() => {
    setMounted(true)
    if (skill) {
      loadSkillData(skill)
    }
  }, [skill])

  const loadSkillData = (skillName) => {
    // Skill data with lessons, tutorials, and code examples
    const skillsDatabase = {
      javascript: {
        name: 'JavaScript',
        icon: '🟨',
        description: 'The programming language of the web. Master modern JavaScript from basics to advanced concepts.',
        level: 'Beginner to Advanced',
        duration: '8-12 weeks',
        color: 'from-yellow-500 to-orange-500',
        lessons: [
          {
            id: 1,
            title: 'Variables and Data Types',
            duration: '30 min',
            difficulty: 'Beginner',
            description: 'Learn about variables, strings, numbers, booleans, and basic data manipulation.',
            code: `// Variables in JavaScript
let name = "Phan Phoun";
const age = 20;
var isStudent = true;

// Data Types
console.log(typeof name);     // string
console.log(typeof age);      // number
console.log(typeof isStudent); // boolean

// Template Literals
const greeting = \`Hello, my name is \${name} and I'm \${age} years old.\`;
console.log(greeting);`,
            exercises: [
              'Create variables for your personal information',
              'Practice string concatenation and template literals',
              'Convert between different data types'
            ]
          },
          {
            id: 2,
            title: 'Functions and Arrow Functions',
            duration: '45 min',
            difficulty: 'Beginner',
            description: 'Master function declarations, expressions, and modern arrow function syntax.',
            code: `// Function Declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Function Expression
const add = function(a, b) {
  return a + b;
};

// Arrow Functions
const multiply = (a, b) => a * b;

// Higher Order Functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
const evens = numbers.filter(num => num % 2 === 0);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(evens);   // [2, 4]`,
            exercises: [
              'Create a calculator using functions',
              'Practice array methods with arrow functions',
              'Build a simple todo list with functions'
            ]
          },
          {
            id: 3,
            title: 'DOM Manipulation',
            duration: '60 min',
            difficulty: 'Intermediate',
            description: 'Learn to interact with HTML elements and create dynamic web pages.',
            code: `// Selecting Elements
const button = document.getElementById('myButton');
const items = document.querySelectorAll('.item');

// Creating Elements
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World!';
newDiv.className = 'dynamic-content';

// Event Listeners
button.addEventListener('click', function() {
  document.body.appendChild(newDiv);
});

// Modifying Styles
newDiv.style.backgroundColor = '#purple';
newDiv.style.padding = '20px';
newDiv.style.borderRadius = '8px';

// Working with Forms
const form = document.querySelector('#myForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  console.log(Object.fromEntries(formData));
});`,
            exercises: [
              'Create an interactive color picker',
              'Build a dynamic shopping cart',
              'Make a real-time character counter'
            ]
          },
          {
            id: 4,
            title: 'Async JavaScript & APIs',
            duration: '75 min',
            difficulty: 'Advanced',
            description: 'Master promises, async/await, and API integration for modern web development.',
            code: `// Promises
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data loaded successfully!');
    }, 2000);
  });
};

// Async/Await
async function loadUserData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

// Using the async function
loadUserData().then(users => {
  console.log(users);
});

// Multiple API calls
async function loadAllData() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  return { users, posts, comments };
}`,
            exercises: [
              'Build a weather app using a real API',
              'Create a GitHub profile viewer',
              'Make a cryptocurrency price tracker'
            ]
          }
        ],
        projects: [
          {
            title: 'Interactive Todo App',
            description: 'Build a full-featured todo application with local storage',
            difficulty: 'Intermediate',
            github: 'https://github.com/phanphoun/todo-app'
          },
          {
            title: 'Weather Dashboard',
            description: 'Create a weather app using OpenWeatherMap API',
            difficulty: 'Advanced',
            github: 'https://github.com/phanphoun/weather-dashboard'
          }
        ],
        resources: [
          { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
          { title: 'JavaScript.info', url: 'https://javascript.info/' },
          { title: 'Eloquent JavaScript (Free Book)', url: 'https://eloquentjavascript.net/' }
        ]
      },
      react: {
        name: 'React',
        icon: '⚛️',
        description: 'Build modern user interfaces with React. Learn components, hooks, and state management.',
        level: 'Intermediate to Advanced',
        duration: '6-10 weeks',
        color: 'from-blue-500 to-cyan-500',
        lessons: [
          {
            id: 1,
            title: 'Components and JSX',
            duration: '45 min',
            difficulty: 'Beginner',
            description: 'Learn the fundamentals of React components and JSX syntax.',
            code: `import React from 'react';

// Functional Component
function Welcome({ name, age }) {
  return (
    <div className="welcome-card">
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
      <button onClick={() => alert(\`Welcome \${name}!\`)}>
        Click me!
      </button>
    </div>
  );
}

// Using the Component
function App() {
  return (
    <div>
      <Welcome name="Phan Phoun" age={20} />
      <Welcome name="John Doe" age={25} />
    </div>
  );
}

export default App;`,
            exercises: [
              'Create a profile card component',
              'Build a reusable button component',
              'Make a product card with props'
            ]
          },
          {
            id: 2,
            title: 'State and Hooks',
            duration: '60 min',
            difficulty: 'Intermediate',
            description: 'Master useState, useEffect, and other essential React hooks.',
            code: `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  // useEffect for side effects
  useEffect(() => {
    document.title = \`Count: \${count}\`;
    
    if (count > 10) {
      setMessage('Wow, you\\'re clicking a lot!');
    } else {
      setMessage('');
    }
  }, [count]);

  // useEffect for cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2>Count: {count}</h2>
      {message && <p>{message}</p>}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}`,
            exercises: [
              'Build a shopping cart with state',
              'Create a form with controlled inputs',
              'Make a real-time search filter'
            ]
          }
        ],
        projects: [
          {
            title: 'Personal Portfolio',
            description: 'Build your own portfolio website with React',
            difficulty: 'Intermediate',
            github: 'https://github.com/phanphoun/react-portfolio'
          }
        ],
        resources: [
          { title: 'React Official Docs', url: 'https://react.dev/' },
          { title: 'React Tutorial', url: 'https://react.dev/learn' }
        ]
      },
      'next.js': {
        name: 'Next.js',
        icon: '▲',
        description: 'The React framework for production. Build full-stack web applications with server-side rendering.',
        level: 'Intermediate to Advanced',
        duration: '4-6 weeks',
        color: 'from-black to-gray-600',
        lessons: [
          {
            id: 1,
            title: 'Getting Started with Next.js',
            duration: '45 min',
            difficulty: 'Beginner',
            description: 'Learn Next.js fundamentals, file-based routing, and project setup.',
            code: `// pages/index.js
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
      </Head>
      <h1>Welcome to Next.js!</h1>
      <Link href="/about">
        <a>About Page</a>
      </Link>
    </div>
  )
}

// pages/about.js
export default function About() {
  return <h1>About Page</h1>
}

// Automatic routing based on file structure`,
            exercises: [
              'Create a multi-page Next.js application',
              'Implement navigation between pages',
              'Add custom Head tags for SEO'
            ]
          }
        ],
        projects: [
          {
            title: 'Blog Website',
            description: 'Build a blog with SSG and dynamic routes',
            difficulty: 'Intermediate',
            github: 'https://github.com/phanphoun/nextjs-blog'
          }
        ],
        resources: [
          { title: 'Next.js Documentation', url: 'https://nextjs.org/docs' },
          { title: 'Next.js Learn', url: 'https://nextjs.org/learn' }
        ]
      },
      'node.js': {
        name: 'Node.js',
        icon: '🟢',
        description: 'JavaScript runtime for server-side development. Build APIs, web servers, and backend applications.',
        level: 'Intermediate to Advanced',
        duration: '6-8 weeks',
        color: 'from-green-500 to-green-700',
        lessons: [
          {
            id: 1,
            title: 'Node.js Fundamentals',
            duration: '50 min',
            difficulty: 'Beginner',
            description: 'Learn Node.js basics, modules, and file system operations.',
            code: `// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello Node.js!</h1>');
  } else if (req.url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: ['John', 'Jane'] }));
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
            exercises: [
              'Create a simple HTTP server',
              'Build a file upload system',
              'Implement basic routing'
            ]
          }
        ],
        projects: [
          {
            title: 'REST API',
            description: 'Build a complete REST API with authentication',
            difficulty: 'Advanced',
            github: 'https://github.com/phanphoun/nodejs-api'
          }
        ],
        resources: [
          { title: 'Node.js Documentation', url: 'https://nodejs.org/en/docs/' },
          { title: 'Node.js Tutorial', url: 'https://nodejs.dev/learn' }
        ]
      },
      'html/css': {
        name: 'HTML/CSS',
        icon: '🎨',
        description: 'The foundation of web development. Master semantic HTML and modern CSS techniques.',
        level: 'Beginner to Intermediate',
        duration: '4-6 weeks',
        color: 'from-orange-500 to-red-500',
        lessons: [
          {
            id: 1,
            title: 'HTML Semantics & Structure',
            duration: '40 min',
            difficulty: 'Beginner',
            description: 'Learn semantic HTML elements and proper document structure.',
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semantic HTML</title>
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <article>
      <h1>Article Title</h1>
      <p>Article content...</p>
    </article>
  </main>
  
  <footer>
    <p>&copy; 2024 My Website</p>
  </footer>
</body>
</html>`,
            exercises: [
              'Create a semantic website structure',
              'Build accessible forms',
              'Implement proper heading hierarchy'
            ]
          }
        ],
        projects: [
          {
            title: 'Responsive Portfolio',
            description: 'Build a responsive portfolio with pure HTML/CSS',
            difficulty: 'Intermediate',
            github: 'https://github.com/phanphoun/html-css-portfolio'
          }
        ],
        resources: [
          { title: 'MDN HTML Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
          { title: 'MDN CSS Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' }
        ]
      },
      python: {
        name: 'Python',
        icon: '🐍',
        description: 'Learn Python programming from basics to advanced concepts including web development and data science.',
        level: 'Beginner to Advanced',
        duration: '10-14 weeks',
        color: 'from-green-500 to-blue-500',
        lessons: [
          {
            id: 1,
            title: 'Python Basics',
            duration: '40 min',
            difficulty: 'Beginner',
            description: 'Learn Python syntax, variables, and basic operations.',
            code: `# Variables and Data Types
name = "Phan Phoun"
age = 20
is_student = True
grades = [85, 92, 78, 96]

# String Operations
full_name = f"My name is {name} and I'm {age} years old"
print(full_name)

# Lists and Dictionaries
student_info = {
    "name": name,
    "age": age,
    "grades": grades,
    "average": sum(grades) / len(grades)
}

# Functions
def calculate_grade_average(grades_list):
    if not grades_list:
        return 0
    return sum(grades_list) / len(grades_list)

# List Comprehensions
squared_numbers = [x**2 for x in range(1, 11)]
even_numbers = [x for x in range(1, 21) if x % 2 == 0]

print(f"Squared: {squared_numbers}")
print(f"Even numbers: {even_numbers}")`,
            exercises: [
              'Create a grade calculator',
              'Build a simple contact book',
              'Make a number guessing game'
            ]
          }
        ],
        projects: [
          {
            title: 'Web Scraper',
            description: 'Build a web scraper using BeautifulSoup',
            difficulty: 'Intermediate',
            github: 'https://github.com/phanphoun/python-scraper'
          }
        ],
        resources: [
          { title: 'Python.org Tutorial', url: 'https://docs.python.org/3/tutorial/' },
          { title: 'Real Python', url: 'https://realpython.com/' }
        ]
      },
      git: {
        name: 'Git',
        icon: '📚',
        description: 'Version control system for tracking changes and collaborating on code projects.',
        level: 'Beginner to Intermediate',
        duration: '2-3 weeks',
        color: 'from-red-500 to-orange-500',
        lessons: [
          {
            id: 1,
            title: 'Git Basics',
            duration: '35 min',
            difficulty: 'Beginner',
            description: 'Learn fundamental Git commands and workflow.',
            code: `# Initialize a new Git repository
git init

# Add files to staging area
git add .
git add filename.js

# Commit changes
git commit -m "Initial commit"

# Check status
git status

# View commit history
git log --oneline

# Create and switch to new branch
git checkout -b feature-branch

# Merge branches
git checkout main
git merge feature-branch

# Push to remote repository
git push origin main`,
            exercises: [
              'Initialize a Git repository',
              'Practice branching and merging',
              'Create meaningful commit messages'
            ]
          }
        ],
        projects: [
          {
            title: 'Portfolio Version Control',
            description: 'Version control your portfolio project with Git',
            difficulty: 'Beginner',
            github: 'https://github.com/phanphoun/git-practice'
          }
        ],
        resources: [
          { title: 'Git Documentation', url: 'https://git-scm.com/doc' },
          { title: 'GitHub Git Handbook', url: 'https://guides.github.com/introduction/git-handbook/' }
        ]
      },
      'tailwind css': {
        name: 'Tailwind CSS',
        icon: '💨',
        description: 'Utility-first CSS framework for rapidly building custom user interfaces.',
        level: 'Beginner to Intermediate',
        duration: '3-4 weeks',
        color: 'from-cyan-500 to-blue-500',
        lessons: [
          {
            id: 1,
            title: 'Tailwind Fundamentals',
            duration: '40 min',
            difficulty: 'Beginner',
            description: 'Learn Tailwind utility classes and responsive design.',
            code: `<!-- Basic Tailwind Layout -->
<div class="min-h-screen bg-gray-100">
  <header class="bg-white shadow-lg">
    <nav class="container mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Logo</h1>
        <div class="hidden md:flex space-x-6">
          <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
          <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">About</a>
        </div>
      </div>
    </nav>
  </header>
  
  <main class="container mx-auto px-6 py-12">
    <div class="bg-white rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-bold mb-4 text-center">Welcome</h2>
      <p class="text-gray-600 leading-relaxed">Content here...</p>
    </div>
  </main>
</div>`,
            exercises: [
              'Build a responsive card component',
              'Create a navigation bar',
              'Design a landing page layout'
            ]
          }
        ],
        projects: [
          {
            title: 'Dashboard UI',
            description: 'Build a modern dashboard interface with Tailwind',
            difficulty: 'Intermediate',
            github: 'https://github.com/phanphoun/tailwind-dashboard'
          }
        ],
        resources: [
          { title: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs' },
          { title: 'Tailwind UI Components', url: 'https://tailwindui.com/' }
        ]
      },
      mongodb: {
        name: 'MongoDB',
        icon: '🍃',
        description: 'NoSQL database for modern applications. Store and query JSON-like documents.',
        level: 'Intermediate to Advanced',
        duration: '4-5 weeks',
        color: 'from-green-600 to-green-800',
        lessons: [
          {
            id: 1,
            title: 'MongoDB Basics',
            duration: '45 min',
            difficulty: 'Beginner',
            description: 'Learn MongoDB fundamentals, collections, and basic queries.',
            code: `// Connect to MongoDB
const { MongoClient } = require('mongodb');

async function main() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  const db = client.db('myapp');
  
  // Insert document
  await db.collection('users').insertOne({
    name: 'Phan Phoun',
    email: 'phan@example.com',
    age: 20,
    skills: ['JavaScript', 'React', 'Node.js']
  });
  
  // Find documents
  const users = await db.collection('users').find({ age: { $gte: 18 } }).toArray();
  console.log(users);
  
  // Update document
  await db.collection('users').updateOne(
    { email: 'phan@example.com' },
    { $push: { skills: 'MongoDB' } }
  );
  
  await client.close();
}`,
            exercises: [
              'Create a user management system',
              'Build a blog with MongoDB',
              'Implement search functionality'
            ]
          }
        ],
        projects: [
          {
            title: 'Task Manager API',
            description: 'Build a task management API with MongoDB',
            difficulty: 'Advanced',
            github: 'https://github.com/phanphoun/mongodb-tasks'
          }
        ],
        resources: [
          { title: 'MongoDB Manual', url: 'https://docs.mongodb.com/' },
          { title: 'MongoDB University', url: 'https://university.mongodb.com/' }
        ]
      },
      express: {
        name: 'Express',
        icon: '🚀',
        description: 'Fast, minimalist web framework for Node.js. Build APIs and web applications.',
        level: 'Intermediate',
        duration: '3-4 weeks',
        color: 'from-gray-600 to-gray-800',
        lessons: [
          {
            id: 1,
            title: 'Express Fundamentals',
            duration: '50 min',
            difficulty: 'Beginner',
            description: 'Learn Express basics, routing, and middleware.',
            code: `const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello Express!' });
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  // Save user logic here
  res.status(201).json(newUser);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
            exercises: [
              'Build a REST API',
              'Implement authentication middleware',
              'Create error handling'
            ]
          }
        ],
        projects: [
          {
            title: 'Blog API',
            description: 'Build a complete blog API with Express',
            difficulty: 'Intermediate',
            github: 'https://github.com/phanphoun/express-blog'
          }
        ],
        resources: [
          { title: 'Express.js Guide', url: 'https://expressjs.com/en/guide/routing.html' },
          { title: 'Express.js API Reference', url: 'https://expressjs.com/en/4x/api.html' }
        ]
      },
      typescript: {
        name: 'TypeScript',
        icon: '📘',
        description: 'Typed superset of JavaScript that compiles to plain JavaScript. Build large-scale applications.',
        level: 'Intermediate to Advanced',
        duration: '4-6 weeks',
        color: 'from-blue-600 to-blue-800',
        lessons: [
          {
            id: 1,
            title: 'TypeScript Basics',
            duration: '45 min',
            difficulty: 'Beginner',
            description: 'Learn TypeScript types, interfaces, and basic syntax.',
            code: `// Basic Types
let name: string = 'Phan Phoun';
let age: number = 20;
let isStudent: boolean = true;
let skills: string[] = ['JavaScript', 'React', 'TypeScript'];

// Interface
interface User {
  id: number;
  name: string;
  email: string;
  skills?: string[]; // Optional property
}

// Function with types
function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}

// Class
class Student {
  constructor(
    public name: string,
    public age: number,
    private studentId: string
  ) {}
  
  getInfo(): string {
    return \`\${this.name} (\${this.age})\`;
  }
}

// Generic function
function createArray<T>(items: T[]): T[] {
  return [...items];
}`,
            exercises: [
              'Convert JavaScript project to TypeScript',
              'Create type-safe API client',
              'Build a typed React component'
            ]
          }
        ],
        projects: [
          {
            title: 'TypeScript Todo App',
            description: 'Build a fully typed todo application',
            difficulty: 'Intermediate',
            github: 'https://github.com/phanphoun/typescript-todo'
          }
        ],
        resources: [
          { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/' },
          { title: 'TypeScript Playground', url: 'https://www.typescriptlang.org/play' }
        ]
      },
      figma: {
        name: 'Figma',
        icon: '🎨',
        description: 'Collaborative design tool for creating user interfaces, prototypes, and design systems.',
        level: 'Beginner to Intermediate',
        duration: '3-4 weeks',
        color: 'from-purple-500 to-pink-500',
        lessons: [
          {
            id: 1,
            title: 'Figma Fundamentals',
            duration: '40 min',
            difficulty: 'Beginner',
            description: 'Learn Figma interface, tools, and basic design principles.',
            code: `/* Figma Design Tips */

1. Frame Setup:
   - Use proper frame sizes (375x812 for mobile, 1440x1024 for desktop)
   - Set up grids and guides for alignment

2. Component System:
   - Create reusable components for buttons, cards, etc.
   - Use auto-layout for responsive designs
   - Organize with proper naming conventions

3. Design Tokens:
   - Define color palette (Primary, Secondary, Neutral)
   - Set typography scale (H1-H6, Body, Caption)
   - Create spacing system (4px, 8px, 16px, 24px, 32px)

4. Prototyping:
   - Link frames for user flow
   - Add transitions and animations
   - Test on different devices

5. Collaboration:
   - Share designs with developers
   - Use comments for feedback
   - Version control with branching`,
            exercises: [
              'Design a mobile app interface',
              'Create a design system',
              'Build an interactive prototype'
            ]
          }
        ],
        projects: [
          {
            title: 'Mobile App Design',
            description: 'Design a complete mobile app with Figma',
            difficulty: 'Intermediate',
            github: 'https://www.figma.com/community/file/phanphoun-app-design'
          }
        ],
        resources: [
          { title: 'Figma Academy', url: 'https://www.figma.com/academy/' },
          { title: 'Figma Community', url: 'https://www.figma.com/community' }
        ]
      }
    }

    const data = skillsDatabase[skillName.toLowerCase()]
    if (data) {
      setSkillData(data)
      // Track skill page view
      const db = getDatabase()
      db.trackInteraction('skill_page_view', { skill: skillName })
    }
  }

  const toggleLessonComplete = (lessonId) => {
    const db = getDatabase()
    const isCompleted = completedLessons.includes(lessonId)
    
    if (isCompleted) {
      setCompletedLessons(prev => prev.filter(id => id !== lessonId))
    } else {
      setCompletedLessons(prev => [...prev, lessonId])
      db.trackInteraction('lesson_completed', { skill, lessonId })
    }
  }

  if (!mounted || !skillData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading skill content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Head>
        <title>{skillData.name} - Learn with Phan Phoun</title>
        <meta name="description" content={`Learn ${skillData.name} with comprehensive lessons, tutorials, and hands-on projects.`} />
      </Head>

      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="flex justify-between items-center">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent cursor-pointer"
            >
              Phan Phoun
            </motion.div>
          </Link>
          <Link href="/#skills">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition-colors"
            >
              ← Back to Skills
            </motion.button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="text-8xl mb-6">{skillData.icon}</div>
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${skillData.color} bg-clip-text text-transparent`}>
              {skillData.name}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {skillData.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-purple-500/20 rounded-full">
                📚 {skillData.level}
              </span>
              <span className="px-4 py-2 bg-blue-500/20 rounded-full">
                ⏱️ {skillData.duration}
              </span>
              <span className="px-4 py-2 bg-green-500/20 rounded-full">
                🎯 {skillData.lessons.length} Lessons
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-6 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['overview', 'lessons', 'projects', 'resources'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'lessons' && (
              <motion.div
                key="lessons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold mb-8 text-center">Interactive Lessons</h2>
                {skillData.lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{lesson.title}</h3>
                        <p className="text-gray-300 mb-4">{lesson.description}</p>
                        <div className="flex gap-4 text-sm">
                          <span className="px-3 py-1 bg-blue-500/20 rounded-full">
                            ⏱️ {lesson.duration}
                          </span>
                          <span className={`px-3 py-1 rounded-full ${
                            lesson.difficulty === 'Beginner' ? 'bg-green-500/20' :
                            lesson.difficulty === 'Intermediate' ? 'bg-yellow-500/20' :
                            'bg-red-500/20'
                          }`}>
                            📊 {lesson.difficulty}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleLessonComplete(lesson.id)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          completedLessons.includes(lesson.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        }`}
                      >
                        {completedLessons.includes(lesson.id) ? '✅ Completed' : 'Mark Complete'}
                      </button>
                    </div>
                    
                    {/* Code Example */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3">Code Example:</h4>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-gray-300">
                          <code>{lesson.code}</code>
                        </pre>
                      </div>
                    </div>

                    {/* Exercises */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Practice Exercises:</h4>
                      <ul className="space-y-2">
                        {lesson.exercises.map((exercise, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <span className="text-purple-400">•</span>
                            <span className="text-gray-300">{exercise}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-center">Hands-on Projects</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {skillData.projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
                    >
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <div className="flex justify-between items-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          project.difficulty === 'Beginner' ? 'bg-green-500/20' :
                          project.difficulty === 'Intermediate' ? 'bg-yellow-500/20' :
                          'bg-red-500/20'
                        }`}>
                          {project.difficulty}
                        </span>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          View Code
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'resources' && (
              <motion.div
                key="resources"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-center">Learning Resources</h2>
                <div className="space-y-4">
                  {skillData.resources.map((resource, index) => (
                    <motion.a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="block bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-colors"
                    >
                      <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                      <p className="text-purple-400">Click to visit →</p>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold mb-8">Learning Path Overview</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-xl font-bold mb-2">Structured Learning</h3>
                    <p className="text-gray-300">Follow a carefully designed curriculum from basics to advanced topics.</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                    <div className="text-4xl mb-4">💻</div>
                    <h3 className="text-xl font-bold mb-2">Hands-on Coding</h3>
                    <p className="text-gray-300">Practice with real code examples and interactive exercises.</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-xl font-bold mb-2">Real Projects</h3>
                    <p className="text-gray-300">Build portfolio-worthy projects to showcase your skills.</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setActiveTab('lessons')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  Start Learning Now
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default SkillPage
