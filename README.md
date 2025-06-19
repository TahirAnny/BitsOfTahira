# Tahira's Portfolio

![CI](https://github.com/TahirAnny/BitsOfTahira/actions/workflows/ci.yml/badge.svg)

A modern, responsive portfolio website built with React and TailwindCSS, featuring smooth animations, dark mode support, and a contact form with EmailJS integration.

## 🚀 Features

- **Modern Design**: Clean and professional design
- **Responsive Layout**: Fully responsive design that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Contact Form**: Functional contact form with EmailJS integration
- **Smooth Scrolling**: Smooth navigation between sections
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TailwindCSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions
- **React Icons**: Beautiful icons for the interface
- **EmailJS**: Client-side email service for contact form

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
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- EmailJS account for email functionality

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

3. **Set up EmailJS**
   
   **Step 1: Create EmailJS Account**
   - Go to [EmailJS](https://www.emailjs.com/) and create a free account
   - Verify your email address
   
   **Step 2: Add Email Service**
   - In EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - Note down your **Service ID**
   
   **Step 3: Create Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Design your email template using these variables:
     ```
     Name: {{user_name}}
     Email: {{user_email}}
     Subject: {{subject}}
     Message: {{message}}
     ```
   - Save the template and note down your **Template ID**
   
   **Step 4: Get Public Key**
   - Go to "Account" → "API Keys"
   - Copy your **Public Key**

4. **Set up environment variables**
   
   Create a `.env` file in the project root:
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```
   
   **Important**: Add `.env` to your `.gitignore` file to keep your credentials secure!

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000

## 📧 EmailJS Configuration

### Security Best Practices
- ✅ Use environment variables for all credentials
- ✅ Add `.env` to `.gitignore`
- ✅ Never commit credentials to version control
- ✅ Use different credentials for development and production

### Template Variables
Your EmailJS template should use these variable names:
- `{{user_name}}` - Sender's name
- `{{user_email}}` - Sender's email address
- `{{subject}}` - Email subject
- `{{message}}` - Email message content

### Example Template
```
New message from your portfolio website!

Name: {{user_name}}
Email: {{user_email}}
Subject: {{subject}}

Message:
{{message}}
```

## 🔧 Alternative: Node.js Backend with Nodemailer

If you prefer to handle email sending through a backend server instead of EmailJS, here's how to set it up:

### Backend Setup

1. **Install backend dependencies**
   ```bash
   npm install express cors nodemailer dotenv
   ```

2. **Create server directory and files**
   ```bash
   mkdir server
   ```

3. **Create `server/index.js`**
   ```javascript
   const express = require('express');
   const cors = require('cors');
   const nodemailer = require('nodemailer');
   require('dotenv').config();

   const app = express();
   const PORT = process.env.PORT || 5000;

   // Middleware
   app.use(cors());
   app.use(express.json());

   // Create transporter
   const transporter = nodemailer.createTransporter({
     service: 'gmail',
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
     }
   });

   // Email endpoint
   app.post('/api/send-email', async (req, res) => {
     const { name, email, subject, message } = req.body;

     try {
       const mailOptions = {
         from: process.env.EMAIL_USER,
         to: process.env.EMAIL_USER, // Send to yourself
         subject: `Portfolio Contact: ${subject}`,
         html: `
           <h3>New message from your portfolio website!</h3>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Subject:</strong> ${subject}</p>
           <p><strong>Message:</strong></p>
           <p>${message}</p>
         `
       };

       await transporter.sendMail(mailOptions);
       res.status(200).json({ message: 'Email sent successfully!' });
     } catch (error) {
       console.error('Error sending email:', error);
       res.status(500).json({ message: 'Failed to send email' });
     }
   });

   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

4. **Update `.env` file for backend**
   ```env
   # EmailJS (current setup)
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here

   # Node.js Backend (alternative)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=5000
   ```

5. **Update Contact component for backend**
   ```javascript
   // Replace EmailJS code with fetch to backend
   const handleSubmit = async (e) => {
     e.preventDefault();
     setIsSubmitting(true);
     setSubmitStatus(null);

     try {
       const response = await fetch('http://localhost:5000/api/send-email', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           name: formData.name,
           email: formData.email,
           subject: formData.subject,
           message: formData.message,
         }),
       });

       if (response.ok) {
         setSubmitStatus('success');
         setFormData({ name: '', email: '', subject: '', message: '' });
       } else {
         setSubmitStatus('error');
       }
     } catch (error) {
       console.error('Error sending message:', error);
       setSubmitStatus('error');
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

6. **Add scripts to `package.json`**
   ```json
   {
     "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build",
       "server": "node server/index.js",
       "dev": "concurrently \"npm start\" \"npm run server\""
     }
   }
   ```

### Gmail Setup for Backend

1. **Enable 2-factor authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. **Use this app password** in your `.env` file

### Backend Deployment Considerations

**Pros of Node.js Backend:**
- ✅ Full control over email sending
- ✅ Can add custom logic (spam filtering, rate limiting)
- ✅ Can store emails in database
- ✅ More secure (credentials stay on server)

**Cons of Node.js Backend:**
- ❌ Requires separate server deployment
- ❌ More complex setup and maintenance
- ❌ Additional hosting costs
- ❌ Need to handle CORS and security

**Deployment Options for Backend:**
- **Heroku**: Easy deployment, free tier available
- **Railway**: Simple deployment, good free tier
- **DigitalOcean**: More control, requires more setup
- **Vercel**: Serverless functions (limited for email)

**Why I Chose EmailJS:**
- ✅ No backend server needed
- ✅ Free tier available
- ✅ Simple setup and maintenance
- ✅ Reliable email delivery
- ✅ Built-in spam protection
- ✅ Works with static hosting (Vercel, Netlify, GitHub Pages)

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
- EmailJS integration for reliable email delivery
- Spam protection

## 🚀 Deployment

### Frontend (React)
Deploy to platforms like Vercel, Netlify, or GitHub Pages:

**For Vercel:**
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

**For Netlify:**
1. Connect your GitHub repository to Netlify
2. Add environment variables in Netlify dashboard
3. Deploy automatically on push

**For GitHub Pages:**
```bash
npm run build
# Then upload the build folder to GitHub Pages
```

### Environment Variables in Production
Remember to add your EmailJS credentials as environment variables in your hosting platform:
- `REACT_APP_EMAILJS_SERVICE_ID`
- `REACT_APP_EMAILJS_TEMPLATE_ID`
- `REACT_APP_EMAILJS_PUBLIC_KEY`

## 🚦 CI/CD Pipeline

This project implements a robust **Continuous Integration and Continuous Deployment (CI/CD)** pipeline using GitHub Actions and Vercel integration.

### 🔄 Continuous Integration (CI)

**GitHub Actions Workflow:**
- ✅ **Automated Testing**: Runs on every push and pull request
- ✅ **Dependency Installation**: Ensures all packages are properly installed
- ✅ **Build Verification**: Validates that the project builds successfully
- ✅ **Quality Assurance**: Catches errors before they reach production

**CI Badge:** ![CI](https://github.com/TahirAnny/BitsOfTahira/actions/workflows/ci.yml/badge.svg)

**Workflow Features:**
- **Trigger**: Every push to any branch and pull requests to main
- **Environment**: Ubuntu latest with Node.js 18
- **Steps**: Checkout → Setup Node.js → Install Dependencies → Build
- **Status**: Shows build status on every commit

### 🚀 Continuous Deployment (CD)

**Vercel Integration:**
- ✅ **Automatic Deployment**: Deploys on every push to main branch
- ✅ **Preview Deployments**: Creates preview URLs for pull requests
- ✅ **Zero Downtime**: Seamless updates with no service interruption
- ✅ **Rollback Capability**: Easy rollback to previous versions

**Deployment Process:**
1. **Push to GitHub** → Triggers CI pipeline
2. **CI Passes** → Automatically deploys to Vercel
3. **Live Update** → Your portfolio is updated instantly

### 🛠️ Pipeline Benefits

**For Developers:**
- **Early Error Detection**: Catch issues before they reach users
- **Confidence in Deployments**: Automated testing ensures quality
- **Faster Development**: No manual deployment steps
- **Version Control**: Every deployment is tied to a specific commit

**For Users:**
- **Reliable Updates**: Automated testing ensures stability
- **Fast Deployments**: Changes go live within minutes
- **Consistent Experience**: Quality checks prevent broken deployments

### 📊 Pipeline Status

**Current Setup:**
- **CI Pipeline**: ✅ Active and working
- **CD Pipeline**: ✅ Active via Vercel integration
- **Environment Variables**: ✅ Securely configured
- **Build Time**: ~2-3 minutes per deployment

**Monitoring:**
- Check build status: GitHub Actions tab
- Monitor deployments: Vercel dashboard
- View logs: Available in both GitHub and Vercel

### 🔧 Pipeline Configuration

**GitHub Actions Workflow** (`.github/workflows/ci.yml`):
```yaml
name: React CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
```

**Vercel Configuration** (`vercel.json`):
- Optimized build settings
- Proper routing for React SPA
- Static asset handling

### 🚀 Getting Started with CI/CD

**For Contributors:**
1. Fork the repository
2. Make your changes
3. Push to your fork
4. Create a pull request
5. CI will automatically test your changes
6. CD will create a preview deployment

**For Deployment:**
1. Push to main branch
2. CI runs automatically
3. If CI passes, CD deploys to production
4. Your changes are live within minutes

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