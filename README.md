# Tahira's Portfolio

![CI](https://github.com/TahirAnny/BitsOfTahira/actions/workflows/ci.yml/badge.svg)

A modern, responsive portfolio website built with React, Node.js, and TailwindCSS, design with smooth animations, dark mode support, and a contact form with email functionality.

## 🚀 Features

- **Modern Design**: Clean and professional design
- **Responsive Layout**: Fully responsive design that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Contact Form**: Functional contact form with email sending capability
- **Smooth Scrolling**: Smooth navigation between sections
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TailwindCSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions
- **React Icons**: Beautiful icons for the interface

### Backend
- **Node.js**: JavaScript runtime for the server
- **Express.js**: Web framework for building APIs
- **Nodemailer**: Email sending functionality
- **CORS**: Cross-origin resource sharing support

## 📁 Project Structure

```
my-portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Projects.js
│   │   ├── Skills.js
│   │   ├── Contact.js
│   │   └── Footer.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── server/
│   └── index.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gmail account for email functionality

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit the `.env` file with your email credentials:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=5000
   ```

   **Note**: For Gmail, you'll need to use an App Password instead of your regular password. [Learn how to generate an App Password](https://support.google.com/accounts/answer/185833).

4. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately
   npm start          # Frontend (port 3000)
   npm run server     # Backend (port 5000)
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📧 Email Configuration

The contact form uses Gmail SMTP to send emails. To set this up:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use this app password in your `.env` file

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `src/components/Hero.js`: Update name, tagline, and description
- `src/components/About.js`: Update personal story and experience
- `src/components/Projects.js`: Add your own projects
- `src/components/Skills.js`: Update skills and proficiency levels
- `src/components/Contact.js`: Update contact information

### Styling
- `tailwind.config.js`: Customize colors, fonts, and theme
- `src/index.css`: Add custom CSS classes and utilities

### Colors
The portfolio uses a custom color palette defined in `tailwind.config.js`:
- Primary: Blue shades (#0ea5e9)
- Dark: Gray shades for dark mode
- Custom gradient text effects

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🌙 Dark Mode

Dark mode is implemented with:
- System preference detection
- Manual toggle in the navbar
- Persistent preference storage
- Smooth transitions between themes

## 📧 Contact Form

The contact form includes:
- Form validation
- Loading states
- Success/error messages
- Auto-reply emails
- Spam protection

## 🚀 Deployment

### Frontend (React)
Deploy to platforms like Vercel, Netlify, or GitHub Pages:
```bash
npm run build
```

### Backend (Node.js)
Deploy to platforms like Heroku, Railway, or DigitalOcean:
```bash
npm run server
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you have any questions or need help, feel free to reach out:
- Email: tahirabishwas@gmail.com
- GitHub: [Tahira](https://github.com/TahirAnny)

---

Made with ❤️ and lots of coffee ☕ 

## 🚦 Continuous Integration

This project uses [GitHub Actions](https://github.com/features/actions) for continuous integration (CI).
Every push and pull request automatically triggers a workflow that installs dependencies and builds the project to ensure everything works as expected. 