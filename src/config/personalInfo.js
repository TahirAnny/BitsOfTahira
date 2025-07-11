// Personal Information Configuration
// Update this file to change information across the entire portfolio

import bookyImage from "../assets/booky.jpg";

export const personalInfo = {
  // Basic Information
  name: "Tahira.",
  fullName: "Tahira Bishwas Anny",
  title: "Full-stack Software Engineer",
  tagline: "Crafting delightful digital experiences with code, creativity, and a dash of curiosity.",
  description: "I'm a software engineer specializing in building exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products.",

  // Contact Information
  contact: {
    status: "I'm currently available for freelance work and full-time opportunities. Feel free to reach out if you'd like to discuss a project or collaboration.",
    contactInfo: [
      {
        title: "Email",
        value: "tahirabishwas@gmail.com",
        link: "mailto:tahirabishwas@gmail.com"
      },
      {
        title: "Location",
        value: "Ontario, Canada",
        link: "#"
      }
    ]
  },
  
  // Social Media Links
  socialLinks: {
    github: "https://github.com/TahirAnny",
    linkedin: "https://www.linkedin.com/in/tahira-bishwas-anny/",
    stackoverflow: "https://stackoverflow.com/users/10117433/tba",
  },
  
  // Project Links
  portfolioRepo: "https://github.com/TahirAnny/BitsOfTahira",
  
  // About Section Content
  about: {
    intro: "I'm a passionate software engineer based in Ontario, Canada. I enjoy creating things that live on the internet, whether that be websites, applications, or anything in between.",
    experience: "Over the years, I've worked with a range of clients — including fintech companies and banks — where I've built and maintained high-performance systems handling millions of secure financial transactions and large-scale data. These experiences have sharpened my ability to write clean, scalable code, and to always think critically about performance, security, and user experience.",
    core: "My core strength lies in bridging backend logic with modern, responsive frontend interfaces. Whether I'm working on event-driven microservices, optimizing CI/CD pipelines, or integrating APIs in the cloud, I bring clarity and precision to every layer of the stack.",
    interests: "When I'm not coding, you'll find me exploring cloud tech, mentoring peers, or traveling and exploring different cultures.",
    stats: {
      experience: "5+",
      projects: "10+",
      clients: "15+",
      technologies: "5+"
    },
    resume: "https://drive.google.com/file/d/1HLI-Wd0eQfIepZWhxZhUQxS-eg5B4pQV/view?usp=sharing"
  },
  
  // Skills Information
  skills: {
    categories: [
      {
        title: "Languages & Markup",
        skills: [
          { name: "C#", level: 90 },
          { name: "JavaScript", level: 85 },
          { name: "TypeScript", level: 80 },
          { name: "Python", level: 75 },
          { name: "Java", level: 70 },
          { name: "HTML", level: 95 },
          { name: "CSS", level: 90 },
          { name: "JSON", level: 95 }
        ]
      },
      {
        title: "Front-End Frameworks & UI",
        skills: [
          { name: "React", level: 85 },
          { name: "jQuery", level: 80 },
          { name: "Bootstrap", level: 85 },
          { name: "AJAX", level: 80 },
          { name: "SignalR", level: 75 },
          { name: "Razor Pages / Views", level: 85 },
          { name: "MAUI", level: 70 },
          { name: "MVVM", level: 80 }
        ]
      },
      {
        title: "Back-End & .NET Ecosystem",
        skills: [
          { name: "ASP.NET", level: 90 },
          { name: "ASP.NET Core", level: 90 },
          { name: "MVC", level: 85 },
          { name: "Web Forms", level: 80 },
          { name: "Entity Framework (EF)", level: 85 },
          { name: "WPF", level: 75 },
          { name: "WCF", level: 70 },
          { name: "NGinx", level: 75 }
        ]
      },
      {
        title: "API Design & Integration",
        skills: [
          { name: "REST APIs", level: 90 },
          { name: "GraphQL", level: 75 },
          { name: "SOAP", level: 70 },
          { name: "Web Services", level: 80 },
          { name: "JWT", level: 85 },
          { name: "Lambda", level: 75 }
        ]
      },
      {
        title: "Databases & Persistence",
        skills: [
          { name: "SQL Server", level: 85 },
          { name: "MongoDB", level: 80 },
          { name: "NoSQL", level: 80 },
          { name: "DynamoDB", level: 70 },
          { name: "Firebase Realtime DB", level: 75 },
          { name: "Firestore", level: 75 }
        ]
      },
      {
        title: "Cloud, DevOps & Infrastructure",
        skills: [
          { name: "AWS", level: 80 },
          { name: "Microsoft Azure", level: 75 },
          { name: "Docker", level: 80 },
          { name: "Kubernetes", level: 70 },
          { name: "Serverless Architecture", level: 75 },
          { name: "CI/CD Pipelines", level: 80 },
          { name: "DevOps", level: 80 },
          { name: "Linux", level: 75 }
        ]
      },
      {
        title: "Architecture & Design Patterns",
        skills: [
          { name: "Microservices", level: 80 },
          { name: "Distributed Systems", level: 75 },
          { name: "OOP", level: 90 },
          { name: "SOLID", level: 85 },
          { name: "Front-end / Back-end Separation", level: 85 },
          { name: "Cloud-native Apps", level: 80 }
        ]
      },
      {
        title: "Testing & Quality Assurance",
        skills: [
          { name: "XUnit", level: 80 },
          { name: "Unit Testing", level: 85 },
          { name: "Integration Testing", level: 80 }
        ]
      },
      {
        title: "Methodologies & Project Management",
        skills: [
          { name: "Agile", level: 85 },
          { name: "Scrum", level: 80 },
          { name: "Kanban", level: 75 },
          { name: "Jira", level: 80 }
        ]
      },
      {
        title: "Version Control & Collaboration",
        skills: [
          { name: "Git", level: 90 },
          { name: "GitHub", level: 90 },
          { name: "GitLab", level: 80 }
        ]
      }
    ],
    additionalSkills: [
      "Machine Learning", "Artificial Intelligence (AI)", "Large Language Models (LLM)",
      "Deep Learning", "Data Science","Natural Language Processing (NLP)", "Generative AI",
      "Node.js", "Express.js", "TailwindCSS", "Next.js", "PostgreSQL", "Redis", 
      "Elasticsearch", "WebSockets", "PWA", "SEO", "Responsive Design", "VS Code", 
      "Postman", "Figma", "Jest", "Webpack", "Redux", "GraphQL", "Firebase", 
      "Vercel", "Netlify", "Heroku", "OAuth", "WebSockets", "PWA", "SEO", 
      "Responsive Design", "Agile", "Scrum", "Jira", "Slack", "VS Code", "Postman",
      "Linux", "Nginx", "Redis", "Elasticsearch", "Kubernetes", "CI/CD",
      "Computer Vision",  "Blockchain", "Edge Computing", "Quantum Computing", 
      "AR/VR", "IoT", "Web3", "Metaverse"
    ]
  },

  // Skill Tree Information
  skillTree: {
    name: "Skillsets",
    children: [
      {
        name: "Languages & Markup",
        children: ["C#", "JavaScript", "TypeScript", "Python", "Java", "HTML", "CSS", "JSON"].map(name => ({ name }))
      },
      {
        name: "Front-End Frameworks & UI",
        children: ["React", "jQuery", "Bootstrap", "AJAX", "SignalR", "Razor Pages / Views", "MAUI", "MVVM"].map(name => ({ name }))
      },
      {
        name: ".NET Ecosystem",
        children: ["ASP.NET", "ASP.NET Core", "MVC", "Web Forms", "Entity Framework (EF)", "WPF", "WCF", "NGinx"].map(name => ({ name }))
      },
      {
        name: "API Design & Integration",
        children: ["REST APIs", "GraphQL", "SOAP", "Web Services", "JWT", "Lambda"].map(name => ({ name }))
      },
      {
        name: "Databases & Persistence",
        children: ["SQL Server", "MongoDB", "NoSQL", "DynamoDB", "Firebase Realtime DB", "Firestore"].map(name => ({ name }))
      },
      {
        name: "Cloud, DevOps & Infrastructure",
        children: ["AWS", "Azure", "Docker", "Kubernetes", "Serverless Architecture", "CI/CD", "DevOps", "Linux"].map(name => ({ name }))
      },
      {
        name: "Architecture & Design Patterns",
        children: ["Microservices", "Distributed Systems", "OOP", "SOLID", "Front-end / Back-end Separation", "Cloud-native Apps"].map(name => ({ name }))
      },
      {
        name: "Testing & QA",
        children: ["XUnit", "Unit Testing", "Integration Testing"].map(name => ({ name }))
      },
      {
        name: "Project Management",
        children: ["Agile", "Scrum", "Kanban", "Jira"].map(name => ({ name }))
      },
      {
        name: "Version Control",
        children: ["Git", "GitHub", "GitLab"].map(name => ({ name }))
      }
    ]
  },
  
  // Projects Information
  projects: [
    {
      id: 1,
      title: "Booky",
      description: "Booky is an ASP.NET Core MVC project that serves as an online bookstore. Feature include user authentication, product management, shopping cart, and payment integration.",
      image: bookyImage,
      technologies: ["ASP.NET Core", "Entity Framework Core", "SQL Server", "Bootstrap", "Razor Pages"],
      category: "fullstack",
      liveUrl: "#",
      githubUrl: "https://github.com/TahirAnny/Booky",
      featured: true
    },
    {
      id: 2,
      title: "Kloudly",
      description: "Kloudly is a weather application that displays current weather conditions and forecasts for any location worldwide with interactive maps.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop",
      technologies: ["React", "TypeScript", "Node.js"],
      category: "frontend",
      liveUrl: "#",
      githubUrl: "https://github.com/TahirAnny/Kloudly",
      featured: false
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website with smooth animations, dark mode, and contact form functionality.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      technologies: ["React", "TailwindCSS", "Framer Motion", "Node.js"],
      category: "frontend",
      liveUrl: "#",
      githubUrl: "https://github.com/TahirAnny/BitsOfTahira",
      featured: false
    },
    {
      id: 4,
      title: "Bean Feast",
      description: "A social media platform for sharing and discovering meetups.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      technologies: ["React", ".Net", "C#", "SQL Server", "Bootstrap", "Entity Framework Core"],
      category: "fullstack",
      liveUrl: "#",
      githubUrl: "https://github.com/TahirAnny/BeanFeast",
      featured: true
    }
  ],
  
  // Footer Information
  footer: {
    loveCopyright: "Made with",
    coffeeCopyright: "and lots of",
    links: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Sitemap", href: "#sitemap" }
    ]
  }
};

export default personalInfo; 