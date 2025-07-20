# PNC STUDENT - Personal Portfolio Website

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript. Features a beautiful design with smooth animations, interactive elements, and mobile-first responsive layout.

## 🌟 Features

- **Modern Design**: Clean, professional layout with beautiful gradients and animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic animations
- **Contact Form**: Functional contact form with validation and notifications
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Smooth Animations**: Scroll-triggered animations and parallax effects
- **SEO Optimized**: Semantic HTML structure and meta tags

## 🚀 Quick Start

1. **Clone or Download** the project files to your local machine
2. **Open `index.html`** in your web browser
3. **Customize** the content to match your personal information

## 📁 Project Structure

```
personal-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Customization Guide

### Personal Information
Edit the following sections in `index.html`:

1. **Name and Title**: Update the hero section
2. **About Section**: Replace with your personal description
3. **Skills**: Modify the skills grid with your technologies
4. **Projects**: Update project cards with your work
5. **Contact Info**: Add your real contact information

### Colors and Styling
The website uses a modern color palette. To customize colors, edit these CSS variables in `styles.css`:

- Primary Blue: `#2563eb`
- Secondary Purple: `#7c3aed`
- Gradient Colors: `#667eea` to `#764ba2`
- Accent Gold: `#fbbf24` to `#f59e0b`

### Adding Your Photo
Replace the avatar icon in the hero section:
1. Add your photo to the project folder
2. Update the `.hero-avatar` section in `styles.css`
3. Replace the `<i class="fas fa-user"></i>` with an `<img>` tag

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔧 Technical Features

### JavaScript Functionality
- Mobile navigation toggle
- Smooth scrolling navigation
- Active section highlighting
- Contact form validation
- Notification system
- Scroll-triggered animations
- Parallax effects
- Interactive hover effects

### CSS Features
- CSS Grid and Flexbox layouts
- CSS animations and transitions
- Backdrop filter effects
- Custom scrollbar styling
- Hover and focus states
- Mobile-first responsive design

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📧 Contact Form Setup

The contact form currently shows a success message for demonstration. To make it functional:

1. **Backend Integration**: Connect to a backend service (Node.js, PHP, etc.)
2. **Email Service**: Use services like EmailJS, Formspree, or Netlify Forms
3. **API Integration**: Update the form submission handler in `script.js`

### Example with EmailJS:
```javascript
// Replace the setTimeout in script.js with:
emailjs.send('your_service_id', 'your_template_id', {
    name: name,
    email: email,
    message: message
}).then(() => {
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    this.reset();
});
```

## 🎯 SEO Optimization

The website includes:
- Semantic HTML5 structure
- Meta viewport tag for mobile
- Descriptive title and meta tags
- Proper heading hierarchy
- Alt text for images (when added)

To improve SEO further:
1. Add meta description
2. Include Open Graph tags
3. Add structured data markup
4. Optimize images with alt text
5. Create a sitemap.xml

## 🚀 Deployment Options

### GitHub Pages
1. Push code to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site will be available at `username.github.io/repository-name`

### Netlify
1. Drag and drop the project folder to Netlify
2. Your site will be deployed instantly with a custom URL

### Vercel
1. Import your GitHub repository to Vercel
2. Deploy with zero configuration

### Traditional Web Hosting
1. Upload all files to your web hosting provider
2. Ensure `index.html` is in the root directory

## 🔄 Updates and Maintenance

### Adding New Projects
1. Copy a project card in the HTML
2. Update the content, links, and technologies
3. Add corresponding images if needed

### Adding New Skills
1. Add a new skill item in the skills grid
2. Use Font Awesome icons for consistency
3. Update the hover animations if needed

### Updating Content
- Regularly update your projects and achievements
- Keep contact information current
- Update the copyright year in the footer

## 🎨 Design Credits

- **Fonts**: Inter from Google Fonts
- **Icons**: Font Awesome 6.0
- **Color Palette**: Modern blue and purple gradients
- **Design Inspiration**: Contemporary portfolio websites

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you make improvements, consider sharing them back with the community!

## 📞 Support

If you need help customizing this website or have questions, feel free to reach out through the contact form or create an issue in the repository.

---

**Made with ❤️ for PNC STUDENT**

*Last updated: July 2024*
