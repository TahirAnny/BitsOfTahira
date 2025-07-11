const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Logging utility functions
const logToFile = (level, message, data = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...data
  };
  
  const logLine = JSON.stringify(logEntry) + '\n';
  const logFile = path.join(logsDir, `${level}.log`);
  
  fs.appendFileSync(logFile, logLine);
  
  // Also log to console for development
  console.log(`[${level.toUpperCase()}] ${message}`);
};

const logError = (message, errorData = {}) => {
  logToFile('error', message, errorData);
};

const logInfo = (message, data = {}) => {
  logToFile('info', message, data);
};

const logWarning = (message, data = {}) => {
  logToFile('warning', message, data);
};

// Middleware
app.use(cors());
app.use(express.json());

// Update CORS configuration for production
app.use(cors({
  origin: [
    'https://tahiraanny.vercel.app/', // Your Vercel domain
    'http://localhost:3000' // For local development
  ],
  credentials: true
}));

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Contact Form Submission</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0ea5e9;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send auto-reply to the user
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for reaching out!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Thank you for your message!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out to me through my portfolio. I've received your message and will get back to you as soon as possible.</p>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0ea5e9;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p>Best regards,<br>Tahira</p>
        </div>
      `
    };

    await transporter.sendMail(autoReplyOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    logError('Error sending email', {
      error: error.message,
      stack: error.stack,
      contactData: { name, email, subject }
    });
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Analytics tracking
let analytics = {
  totalRequests: 0,
  chatgptResponses: 0,
  mockResponses: 0,
  errors: 0,
  errorTypes: {},
  averageResponseTime: 0,
  startTime: new Date(),
  // Enhanced monitoring
  tokenUsage: {
    total: 0,
    average: 0,
    max: 0,
    min: Infinity
  },
  costTracking: {
    totalCost: 0,
    averageCost: 0,
    costPerRequest: 0
  },
  alerts: {
    highTokenUsage: false,
    highCost: false,
    errorSpike: false
  },
  performance: {
    responseTimes: [],
    slowRequests: 0,
    timeoutCount: 0
  }
};

// Cost calculation constants (GPT-3.5-turbo pricing)
const COST_PER_1K_TOKENS = 0.002; // $0.002 per 1K tokens for GPT-3.5-turbo

// Monitoring utility functions
const calculateCost = (tokens) => {
  return (tokens / 1000) * COST_PER_1K_TOKENS;
};

const updateTokenUsage = (tokens) => {
  analytics.tokenUsage.total += tokens;
  analytics.tokenUsage.average = analytics.tokenUsage.total / analytics.chatgptResponses;
  analytics.tokenUsage.max = Math.max(analytics.tokenUsage.max, tokens);
  analytics.tokenUsage.min = Math.min(analytics.tokenUsage.min, tokens);
  
  // Calculate cost
  const cost = calculateCost(tokens);
  analytics.costTracking.totalCost += cost;
  analytics.costTracking.averageCost = analytics.costTracking.totalCost / analytics.chatgptResponses;
  analytics.costTracking.costPerRequest = analytics.costTracking.totalCost / analytics.totalRequests;
  
  // Check for alerts
  checkAlerts();
};

const updatePerformance = (responseTime) => {
  analytics.performance.responseTimes.push(responseTime);
  analytics.averageResponseTime = (analytics.averageResponseTime + responseTime) / 2;
  
  // Track slow requests (>3 seconds)
  if (responseTime > 3000) {
    analytics.performance.slowRequests++;
  }
  
  // Keep only last 100 response times
  if (analytics.performance.responseTimes.length > 100) {
    analytics.performance.responseTimes.shift();
  }
};

const checkAlerts = () => {
  // High token usage alert (>500 tokens average)
  if (analytics.tokenUsage.average > 500 && !analytics.alerts.highTokenUsage) {
    analytics.alerts.highTokenUsage = true;
    logWarning('High token usage detected', {
      averageTokens: analytics.tokenUsage.average,
      totalTokens: analytics.tokenUsage.total,
      alertType: 'high_token_usage'
    });
  }
  
  // High cost alert (>$0.10 per request)
  if (analytics.costTracking.averageCost > 0.10 && !analytics.alerts.highCost) {
    analytics.alerts.highCost = true;
    logWarning('High cost per request detected', {
      averageCost: analytics.costTracking.averageCost,
      totalCost: analytics.costTracking.totalCost,
      alertType: 'high_cost'
    });
  }
  
  // Error spike alert (>20% error rate)
  const errorRate = (analytics.errors / analytics.totalRequests) * 100;
  if (errorRate > 20 && !analytics.alerts.errorSpike) {
    analytics.alerts.errorSpike = true;
    logError('High error rate detected', {
      errorRate: errorRate,
      totalErrors: analytics.errors,
      totalRequests: analytics.totalRequests,
      alertType: 'error_spike'
    });
  }
};

const getMonitoringSummary = () => {
  const uptime = Date.now() - analytics.startTime;
  const hours = Math.floor(uptime / (1000 * 60 * 60));
  const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
  
  return {
    uptime: `${hours}h ${minutes}m`,
    totalRequests: analytics.totalRequests,
    chatgptPercentage: analytics.totalRequests > 0 ? 
      Math.round((analytics.chatgptResponses / analytics.totalRequests) * 100) : 0,
    mockPercentage: analytics.totalRequests > 0 ? 
      Math.round((analytics.mockResponses / analytics.totalRequests) * 100) : 0,
    tokenUsage: analytics.tokenUsage,
    costTracking: analytics.costTracking,
    performance: {
      averageResponseTime: Math.round(analytics.averageResponseTime),
      slowRequests: analytics.performance.slowRequests,
      timeoutCount: analytics.performance.timeoutCount
    },
    alerts: analytics.alerts,
    errorTypes: analytics.errorTypes
  };
};

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
  try {
    logInfo('Analytics request received');
    
    res.json({
      success: true,
      data: getMonitoringSummary()
    });
  } catch (error) {
    logError('Error in analytics endpoint', {
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      message: 'Error loading analytics'
    });
  }
});

// Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  const startTime = Date.now();
  analytics.totalRequests++;
  
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Message is required' 
      });
    }

    // ===== HYBRID CHATGPT API IMPLEMENTATION =====
    // Try real ChatGPT API first, fallback to mock if unavailable
    let botResponse;
    let responseSource = 'mock';

    // Check if OpenAI API key is available
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key-here') {
      try {
        // Real ChatGPT API call with timeout
        const completion = await Promise.race([
          openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              { 
                role: "system", 
                content: `You are a helpful AI assistant for Tahira's portfolio website. You help visitors with questions about Tahira's skills, experience, projects, and how to contact them. Keep responses friendly, professional, and concise. If you don't know something specific about Tahira, suggest they use the contact form.` 
              },
              { role: "user", content: message }
            ],
            max_tokens: 300,
            temperature: 0.7,
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), 10000)
          )
        ]);
        
        botResponse = completion.choices[0].message.content;
        responseSource = 'chatgpt';
        analytics.chatgptResponses++;
        
        // Update token usage and cost tracking
        const tokens = completion.usage?.total_tokens || 0;
        updateTokenUsage(tokens);
        
        logInfo(`ChatGPT API Response - Tokens: ${tokens}`, {
          tokens: tokens,
          model: 'gpt-3.5-turbo',
          userMessage: message,
          cost: calculateCost(tokens)
        });
        
      } catch (apiError) {
        // Enhanced error handling for specific API errors
        let errorType = 'unknown';
        let errorMessage = apiError.message;
        
        // Check for specific error types
        if (apiError.status === 429) {
          errorType = 'rate_limit';
          errorMessage = 'Rate limit exceeded - too many requests';
          logWarning(`Rate limiting detected: ${apiError.message}`, {
            errorType,
            status: apiError.status,
            userMessage: message
          });
        } else if (apiError.status === 401) {
          errorType = 'invalid_api_key';
          errorMessage = 'Invalid API key or authentication failed';
          logError(`Invalid API key: ${apiError.message}`, {
            errorType,
            status: apiError.status,
            userMessage: message
          });
        } else if (apiError.status === 402) {
          errorType = 'quota_exceeded';
          errorMessage = 'API quota exceeded - billing limit reached';
          logWarning(`Quota exceeded: ${apiError.message}`, {
            errorType,
            status: apiError.status,
            userMessage: message
          });
        } else if (apiError.code === 'ENOTFOUND' || apiError.code === 'ECONNREFUSED' || apiError.code === 'ETIMEDOUT' || apiError.message === 'Request timeout') {
          errorType = 'network_error';
          errorMessage = 'Network connection error or timeout';
          logError(`Network error: ${apiError.message}`, {
            errorType,
            code: apiError.code,
            userMessage: message
          });
        } else if (apiError.status >= 500) {
          errorType = 'server_error';
          errorMessage = 'OpenAI server error';
          logError(`Server error: ${apiError.message}`, {
            errorType,
            status: apiError.status,
            userMessage: message
          });
        }
        
        // Log detailed error information
        logWarning(`ChatGPT API Error (${errorType}): ${apiError.message} - Falling back to mock responses`, {
          errorType,
          originalError: apiError.message,
          userMessage: message,
          responseSource: 'mock'
        });
        
        // Fallback to mock responses
        botResponse = generateMockResponse(message.toLowerCase());
        responseSource = 'mock';
        analytics.mockResponses++;
        
        // Track specific error types in analytics
        if (!analytics.errorTypes) {
          analytics.errorTypes = {};
        }
        analytics.errorTypes[errorType] = (analytics.errorTypes[errorType] || 0) + 1;
      }
    } else {
      // Use mock responses (demo mode)
      botResponse = generateMockResponse(message.toLowerCase());
      responseSource = 'mock';
      analytics.mockResponses++;
      logInfo(`Using mock responses (demo mode)`, {
        userMessage: message,
        responseSource: 'mock'
      });
    }
    
    // Simulate API delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 800));

    // Update performance metrics
    const responseTime = Date.now() - startTime;
    updatePerformance(responseTime);

    res.status(200).json({ 
      success: true, 
      message: botResponse,
      source: responseSource, // Include response source for transparency
      analytics: {
        responseTime,
        totalRequests: analytics.totalRequests,
        source: responseSource
      }
    });

  } catch (error) {
    analytics.errors++;
    logError('Error in chatbot', {
      error: error.message,
      stack: error.stack,
      userMessage: message
    });
    res.status(500).json({ 
      success: false, 
      message: 'Sorry, I\'m having trouble responding right now. Please try again later or use the contact form.' 
    });
  }
});

// Mock response generator
function generateMockResponse(message) {
  const responses = {
    // Advanced technical skills
    'skill': [
      "I have 5 years of experience in fintech development, specializing in C#, .NET Core, React, and AWS. I've worked extensively with banking systems, implementing anti-money laundering (AML) solutions and financial compliance systems. My expertise includes building secure, scalable applications for the financial sector with a focus on regulatory compliance and data security.",
      "My technical stack includes C# and .NET Core for backend development, React for frontend applications, and AWS for cloud infrastructure. I have experience with Azure DevOps for CI/CD, Python for data processing, and Node.js for web development. My fintech background gives me deep understanding of financial systems and regulatory requirements.",
      "I specialize in fintech development with 5 years of experience in C#, .NET Core, React, and AWS. I've worked on banking systems, AML compliance, and financial applications. I also have experience with Azure, Azure DevOps, Python, and Node.js, making me versatile across different technology stacks."
    ],
    'experience': [
      "I have 5 years of experience in fintech development, working on critical banking systems and anti-money laundering (AML) solutions. I've developed secure financial applications, implemented compliance systems, and worked with sensitive financial data. My experience includes leading development teams, implementing security best practices, and ensuring regulatory compliance in financial applications.",
      "My experience spans 5 years in the fintech sector, working with banking systems and financial compliance. I've built applications that handle millions of transactions, implemented AML detection systems, and worked with various financial APIs. I have experience with C#, .NET Core, React, AWS, and Azure DevOps for building robust financial applications.",
      "I have 5 years of experience building enterprise-level financial applications with focus on security, compliance, and scalability. I've worked on banking systems, AML solutions, and financial data processing. My experience includes implementing secure authentication, data encryption, and regulatory compliance measures for financial institutions."
    ],
    'project': [
      "I've developed several critical fintech applications including anti-money laundering (AML) systems, banking platforms, and financial compliance tools. Each project demonstrates my ability to handle sensitive financial data, implement security measures, and ensure regulatory compliance. My portfolio website showcases my full-stack capabilities with React and Node.js.",
      "My projects include fintech applications with real-time transaction processing, AML detection systems, and secure banking platforms. I've built applications using C#, .NET Core, React, and AWS, with experience in Azure DevOps for deployment. Each project includes comprehensive security measures and compliance features.",
      "I've created enterprise-level fintech solutions including banking systems, AML platforms, and financial data processing applications. My work includes microservices architecture, cloud deployment on AWS and Azure, and integration with financial APIs. I focus on security, performance, and regulatory compliance."
    ],
    'contact': [
      "You can reach me through the contact form on this website, or connect with me on LinkedIn. I'm actively seeking opportunities in fintech development roles where I can leverage my 5 years of experience in banking systems, AML solutions, and financial applications. I'm particularly interested in roles involving C#, .NET Core, React, and AWS.",
      "Feel free to use the contact form above, or you can find my social links in the footer. I'm open to discussing fintech development opportunities, particularly in banking systems, AML, and financial applications. I have strong experience with C#, .NET Core, React, and cloud technologies.",
      "The best way to reach me is through the contact form on this page. I'm particularly interested in fintech roles involving banking systems, AML solutions, and financial applications. I bring 5 years of experience with C#, .NET Core, React, and AWS to potential opportunities."
    ],
    'portfolio': [
      "This portfolio demonstrates my full-stack development skills with React frontend, Node.js backend, and ChatGPT API integration. While my primary expertise is in fintech with C#, .NET Core, and AWS, this website showcases my ability to work with modern web technologies. It includes advanced features like real-time analytics and responsive design.",
      "I built this portfolio to showcase my technical capabilities including React development, API integration, and modern web technologies. While my core experience is in fintech with C#, .NET Core, and AWS, this project demonstrates my versatility with Node.js and React. It includes features like dark mode, responsive design, and a sophisticated chatbot.",
      "This website showcases my full-stack development skills with a focus on modern web technologies. While my primary experience is in fintech development with C#, .NET Core, and AWS, this portfolio demonstrates my ability to work with React and Node.js. The architecture shows my understanding of scalable application development."
    ],
    'technology': [
      "My primary tech stack includes C#, .NET Core, React, and AWS for fintech development. I have extensive experience with Azure DevOps for CI/CD, Python for data processing, and Node.js for web development. I've worked with financial APIs, banking systems, and implemented security measures for sensitive financial data.",
      "I work with C#, .NET Core, React, and AWS as my main technologies for fintech applications. I have experience with Azure, Azure DevOps, Python, and Node.js. I understand the importance of security, compliance, and performance in financial applications.",
      "My technology expertise includes C#, .NET Core, React, and AWS for building robust financial applications. I have experience with Azure DevOps, Python, and Node.js, making me versatile across different technology stacks. I focus on secure, scalable solutions for the financial sector."
    ],
    'hire': [
      "I'm actively seeking fintech development opportunities where I can contribute my 5 years of experience in banking systems and AML solutions. I'm particularly interested in roles involving C#, .NET Core, React, and AWS. I bring strong problem-solving skills, deep understanding of financial regulations, and experience with secure financial applications.",
      "I'm available for fintech positions and freelance opportunities in financial application development. I have 5 years of experience with C#, .NET Core, React, and AWS, particularly in banking systems and AML solutions. I'm passionate about building secure, compliant financial applications.",
      "I'm looking for opportunities to work on challenging fintech projects that involve C#, .NET Core, React, and AWS. I have 5 years of experience in banking systems, AML solutions, and financial applications. I bring strong analytical skills and deep understanding of financial regulations."
    ],
    'hello': [
      "Hi there! I'm Tahira's AI assistant. I can help you learn about my 5 years of fintech experience, banking systems work, and technical skills with C#, .NET Core, React, and AWS. What aspects of my work would you like to explore?",
      "Hello! I'm here to provide detailed information about Tahira's 5 years of fintech experience, banking systems development, and technical expertise with C#, .NET Core, React, and AWS. Feel free to ask about specific technologies, project experiences, or fintech capabilities.",
      "Hi! I'm excited to tell you about Tahira's 5 years of fintech development journey, experience with banking systems and AML solutions, and technical expertise. What would you like to know about my skills and experience?"
    ],
    'help': [
      "I can provide detailed information about Tahira's 5 years of fintech experience, banking systems work, AML solutions, and technical skills with C#, .NET Core, React, and AWS. What specific area would you like to explore?",
      "I'm here to answer questions about Tahira's 5 years of fintech development, banking systems experience, and technical skills with C#, .NET Core, React, and AWS. Just ask me anything about my work and capabilities!",
      "I can help you understand Tahira's 5 years of fintech experience, banking systems development, and technical skills. What would you like to know about my professional capabilities?"
    ],
    // Advanced technical questions
    'fintech': [
      "I have 5 years of experience in fintech development, working on critical banking systems and anti-money laundering (AML) solutions. I've developed applications that process millions of financial transactions, implement regulatory compliance measures, and ensure data security for sensitive financial information. My experience includes working with financial APIs, implementing secure authentication, and building scalable financial applications.",
      "My fintech experience includes developing banking platforms, AML detection systems, and financial compliance tools. I've worked with C#, .NET Core, React, and AWS to build secure, scalable financial applications. I understand the importance of regulatory compliance, data security, and performance in financial systems.",
      "I have extensive experience in fintech development with focus on banking systems, AML solutions, and financial applications. I've worked with various financial technologies and understand the unique challenges of building secure, compliant financial software."
    ],
    'banking': [
      "I have 5 years of experience working with banking systems, developing applications that handle financial transactions, implement security measures, and ensure regulatory compliance. I've worked on systems that process millions of transactions, implement AML detection, and maintain data integrity for sensitive financial information.",
      "My banking experience includes developing secure financial applications, implementing authentication systems, and working with financial APIs. I have experience with C#, .NET Core, React, and AWS for building robust banking platforms that meet strict security and compliance requirements.",
      "I have worked extensively with banking systems and understand the unique requirements of financial applications. I focus on security, compliance, and performance when building banking solutions."
    ],
    'aml': [
      "I have extensive experience developing anti-money laundering (AML) solutions for financial institutions. I've built systems that detect suspicious transactions, implement compliance rules, and generate regulatory reports. My experience includes working with large datasets, implementing real-time monitoring, and ensuring regulatory compliance in AML systems.",
      "My AML experience includes developing detection algorithms, implementing compliance workflows, and building reporting systems for financial institutions. I have experience with C#, .NET Core, and AWS for building scalable AML solutions that process millions of transactions.",
      "I have worked on AML systems and understand the regulatory requirements and technical challenges involved. I focus on building reliable, compliant AML solutions that help financial institutions meet their regulatory obligations."
    ],
    'c#': [
      "I have 5 years of experience with C# development, particularly in fintech applications and banking systems. I've built enterprise-level applications using C#, .NET Core, and various .NET frameworks. I have experience with ASP.NET Core, Entity Framework, and implementing secure financial applications with C#.",
      "My C# experience includes developing backend services, APIs, and business logic for financial applications. I have experience with .NET Core, dependency injection, async programming, and building scalable C# applications for the fintech sector.",
      "I work extensively with C# and .NET Core for building robust financial applications. I understand C# best practices, performance optimization, and building secure, maintainable code for enterprise applications."
    ],
    '.net': [
      "I have extensive experience with .NET Core and .NET Framework for building fintech applications and banking systems. I've worked with ASP.NET Core, Entity Framework, and various .NET libraries for building secure, scalable financial applications. I understand .NET architecture patterns and best practices.",
      "My .NET experience includes building web APIs, implementing authentication and authorization, and working with various .NET technologies. I have experience with .NET Core, dependency injection, and building enterprise-level applications for the financial sector.",
      "I work with .NET technologies and have experience building robust, scalable applications. I understand .NET architecture and implement best practices for building secure, performant applications."
    ],
    'aws': [
      "I have experience with AWS cloud services for deploying and managing fintech applications. I've worked with AWS services like EC2, S3, RDS, and Lambda for building scalable financial applications. I understand AWS security best practices and implementing cloud-native solutions for financial systems.",
      "My AWS experience includes deploying applications, managing cloud infrastructure, and implementing security measures for financial applications. I have experience with AWS services, cloud architecture, and ensuring compliance in cloud environments.",
      "I work with AWS cloud services and have experience deploying and managing applications in the cloud. I understand cloud security and implementing scalable solutions on AWS."
    ],
    'azure': [
      "I have experience with Azure cloud services and Azure DevOps for CI/CD pipelines. I've worked with Azure App Service, Azure SQL Database, and Azure DevOps for building and deploying financial applications. I understand Azure security features and implementing cloud solutions for fintech.",
      "My Azure experience includes deploying applications, managing cloud resources, and implementing CI/CD pipelines with Azure DevOps. I have experience with Azure services and ensuring security and compliance in Azure environments.",
      "I work with Azure cloud services and Azure DevOps for building and deploying applications. I understand Azure architecture and implementing secure, scalable solutions."
    ],
    'python': [
      "I have experience with Python for data processing, automation, and building financial applications. I've used Python for data analysis, building financial models, and implementing automation scripts for financial processes. I understand Python's capabilities for fintech applications.",
      "My Python experience includes data processing, building financial tools, and implementing automation for financial workflows. I have experience with Python libraries for data analysis and building tools for financial applications.",
      "I work with Python for various fintech applications including data processing and automation. I understand Python's strengths for financial applications and data analysis."
    ],
    'architecture': [
      "I have experience with various architectural patterns including microservices, monolithic applications, and serverless architectures for fintech applications. I've implemented clean architecture principles, domain-driven design, and have experience with event-driven architectures for financial systems. I focus on creating scalable, maintainable solutions that can evolve with business needs.",
      "My architectural experience includes designing scalable financial applications, implementing API gateways, and working with distributed systems for banking platforms. I have experience with containerization, load balancing, and implementing security patterns for financial applications. I prioritize performance, security, and maintainability in my architectural decisions.",
      "I've worked with different architectural approaches including MVC, MVVM, and microservices patterns for fintech applications. I have experience with database design, caching strategies, and implementing RESTful APIs for financial systems. I believe in choosing the right architecture for the specific problem domain."
    ],
    'microservices': [
      "I have experience designing and implementing microservices architectures for fintech applications with proper service boundaries, API gateways, and inter-service communication. I've worked with containerization using Docker, orchestration with Kubernetes, and implementing service discovery patterns for financial systems. I understand the challenges of distributed systems and implement appropriate solutions.",
      "My microservices experience includes breaking down monolithic financial applications, implementing service-to-service communication, and managing distributed data for banking systems. I have experience with event-driven architectures, circuit breakers, and implementing proper monitoring and logging for microservices in fintech.",
      "I've worked with microservices architectures for financial applications and understand the trade-offs involved. I focus on creating loosely coupled, highly cohesive services that can be developed, deployed, and scaled independently for banking systems."
    ],
    'api': [
      "I have extensive experience designing and implementing RESTful APIs for fintech applications with proper HTTP status codes, authentication, and documentation. I've worked with GraphQL, implemented API versioning strategies, and have experience with API gateway patterns for financial systems. I focus on creating APIs that are intuitive, well-documented, and secure.",
      "My API development experience includes designing RESTful services for financial applications, implementing authentication and authorization, and creating comprehensive API documentation. I have experience with API testing, rate limiting, and implementing proper error handling and validation for financial APIs.",
      "I work with various API technologies and patterns for fintech applications. I focus on creating APIs that are secure, performant, and easy to integrate with for financial systems."
    ],
    'cloud': [
      "I have experience with cloud platforms including AWS, Azure, and Google Cloud for fintech applications. I've implemented serverless architectures, managed cloud resources, and have experience with cloud-native development practices for financial systems. I understand cloud security, cost optimization, and implementing scalable cloud solutions.",
      "My cloud experience includes deploying financial applications to various cloud platforms, implementing infrastructure as code, and managing cloud resources efficiently. I have experience with containerization, cloud storage, and implementing monitoring and logging solutions for financial applications.",
      "I work with cloud technologies for fintech applications and have experience with cloud deployment, management, and optimization. I understand the benefits and challenges of cloud computing for financial systems."
    ],
    'docker': [
      "I have experience with Docker containerization for fintech applications, creating optimized Docker images, and implementing multi-stage builds. I've worked with Docker Compose for local development and have experience with container orchestration for financial systems. I understand container security best practices and optimization techniques.",
      "My Docker experience includes containerizing financial applications, creating efficient Dockerfiles, and implementing container-based deployment strategies. I have experience with Docker networking, volume management, and implementing proper logging and monitoring for containerized financial applications.",
      "I work with Docker and containerization technologies for fintech applications. I understand the benefits of containerization and can implement container-based solutions for development and deployment of financial systems."
    ],
    'ci/cd': [
      "I have experience implementing CI/CD pipelines using tools like Azure DevOps, GitHub Actions, and Jenkins for fintech applications. I've automated testing, building, and deployment processes, and have experience with infrastructure as code for financial systems. I focus on creating reliable, automated deployment pipelines that reduce manual errors.",
      "My CI/CD experience includes setting up automated build and deployment processes for financial applications, implementing testing strategies, and managing deployment environments. I have experience with blue-green deployments, feature flags, and implementing proper rollback strategies for financial systems.",
      "I have experience with continuous integration and deployment practices for fintech applications. I understand the importance of automated testing and deployment processes for delivering reliable financial software."
    ],
    'database': [
      "I have experience with both SQL and NoSQL databases including SQL Server, PostgreSQL, MongoDB, and Redis for fintech applications. I've implemented database optimization strategies, designed efficient schemas, and have experience with database migrations and versioning for financial systems. I understand the importance of data integrity and performance optimization.",
      "My database experience includes relational databases like SQL Server and PostgreSQL for financial applications, as well as NoSQL solutions like MongoDB. I've implemented caching strategies, database indexing, and have experience with data modeling and optimization for financial systems. I focus on creating efficient, scalable database solutions.",
      "I work with various database technologies for fintech applications and have experience with database design, optimization, and management. I understand the trade-offs between different database types and can implement appropriate solutions based on project requirements."
    ],
    'testing': [
      "I implement comprehensive testing strategies including unit tests, integration tests, and end-to-end testing for fintech applications. I have experience with testing frameworks like NUnit, Jest, and Cypress for financial systems. I believe in test-driven development and maintaining high test coverage for reliable, maintainable code.",
      "My testing approach includes automated testing at multiple levels, from unit tests to integration tests for financial applications. I have experience with mocking frameworks, test data management, and implementing continuous testing in CI/CD pipelines. I focus on creating robust, reliable financial applications.",
      "I have experience with various testing methodologies and tools for fintech applications. I implement testing strategies that ensure code quality, reduce bugs, and maintain application reliability for financial systems."
    ],
    'deployment': [
      "I have experience with cloud deployment platforms including AWS, Azure, and Vercel for fintech applications. I've implemented CI/CD pipelines using Azure DevOps, GitHub Actions, and have experience with containerization using Docker for financial systems. I understand the importance of automated deployment and monitoring.",
      "My deployment experience includes cloud platforms, containerization, and implementing automated deployment pipelines for financial applications. I have experience with infrastructure as code, monitoring solutions, and ensuring high availability for financial systems. I focus on creating reliable, scalable deployment strategies.",
      "I work with various deployment platforms for fintech applications and have experience with containerization, cloud services, and automated deployment processes. I understand the importance of reliable, scalable deployment solutions for financial systems."
    ],
    'security': [
      "I implement security best practices including authentication, authorization, input validation, and secure communication protocols for fintech applications. I have experience with OAuth, JWT tokens, and implementing security measures to protect against common vulnerabilities in financial systems. I stay updated with security trends and best practices.",
      "My security experience includes implementing authentication systems for financial applications, securing APIs, and protecting against common web vulnerabilities. I have experience with HTTPS, CORS policies, and implementing secure data handling practices for financial systems. I prioritize security in all my development work.",
      "I have experience with various security measures and best practices for fintech applications. I implement security strategies that protect applications and user data while maintaining functionality and performance for financial systems."
    ],
    'performance': [
      "I focus on performance optimization including code splitting, lazy loading, and implementing efficient algorithms for fintech applications. I have experience with caching strategies, database optimization, and monitoring application performance for financial systems. I believe in creating fast, responsive applications that provide excellent user experience.",
      "My performance optimization experience includes frontend optimization techniques, database query optimization, and implementing caching strategies for financial applications. I use performance monitoring tools and focus on creating applications that are both fast and scalable for financial systems.",
      "I have experience with various performance optimization techniques and tools for fintech applications. I focus on creating efficient, fast applications that provide excellent user experience while maintaining code quality for financial systems."
    ],
    'agile': [
      "I have experience working in agile environments using Scrum and Kanban methodologies for fintech development. I've participated in sprint planning, daily standups, and retrospective meetings for financial projects. I believe in iterative development, continuous improvement, and delivering value to stakeholders.",
      "My agile experience includes working in cross-functional teams, participating in sprint ceremonies, and using agile tools like Jira and Azure DevOps for financial projects. I focus on delivering working software incrementally and adapting to changing requirements for financial systems.",
      "I have experience with agile development methodologies and tools for fintech projects. I believe in collaborative development, continuous improvement, and delivering value through iterative development processes for financial applications."
    ],
    'leadership': [
      "I have experience leading development teams, conducting code reviews, and mentoring junior developers in fintech projects. I've facilitated technical discussions, made architectural decisions, and helped establish coding standards and best practices for financial applications. I believe in fostering a collaborative, learning-focused development environment.",
      "My leadership experience includes technical mentorship, code review processes, and helping establish development workflows for fintech projects. I focus on knowledge sharing, code quality, and creating an environment where team members can grow and excel in financial development.",
      "I have experience with technical leadership and team collaboration in fintech projects. I believe in sharing knowledge, maintaining code quality, and creating an environment that supports team growth and development for financial applications."
    ],
    'typescript': [
      "I have experience with TypeScript for building type-safe React applications and Node.js backends. I've used TypeScript in fintech applications to improve code quality and developer experience. I have experience with strict type checking and custom type definitions for financial systems.",
      "My TypeScript experience includes implementing type-safe APIs, creating reusable components with proper typing, and using TypeScript features for fintech applications. I have experience with TypeScript configuration and integrating TypeScript with build tools for financial projects.",
      "I work with TypeScript for building robust fintech applications and understand its benefits for large-scale financial systems. I implement proper typing strategies and use TypeScript features to improve code quality and maintainability."
    ],
    'react': [
      "I have experience with React ecosystem including hooks, context API, and modern React patterns for building fintech applications. I've implemented complex state management with Redux and Context API, built reusable component libraries, and have experience with React performance optimization for financial systems. I stay current with React best practices and new features.",
      "My React experience includes building scalable financial applications with proper component architecture, implementing custom hooks, and optimizing React performance. I have experience with React testing libraries and integrating React with various backend technologies for financial applications.",
      "I specialize in React development for fintech applications and have experience with modern React patterns and best practices. I focus on creating maintainable, performant React applications with excellent user experience for financial systems."
    ],
    'node': [
      "I have experience with Node.js development for building RESTful APIs and implementing server-side logic for fintech applications. I've worked with Express.js, implemented authentication systems, and have experience with Node.js performance optimization for financial systems. I understand Node.js event loop, memory management, and best practices for scalable applications.",
      "My Node.js experience includes building microservices for financial applications, implementing real-time features with Socket.io, and creating robust backend services. I have experience with Node.js security best practices, error handling, and implementing proper logging and monitoring for financial systems.",
      "I work with Node.js for building scalable backend services for fintech applications. I understand Node.js architecture and implement best practices for reliable, performant financial applications."
    ],
    'scalability': [
      "I have experience designing and implementing scalable fintech applications using horizontal scaling, load balancing, and caching strategies. I've worked with distributed systems, implemented database sharding, and have experience with performance optimization techniques for financial systems. I understand the challenges of scaling financial applications and implement appropriate solutions.",
      "My scalability experience includes implementing caching strategies, optimizing database queries, and designing financial applications that can handle increased load. I have experience with CDN implementation, database optimization, and implementing proper monitoring for scalable financial applications.",
      "I focus on creating scalable financial applications that can grow with business needs. I implement strategies for handling increased load and maintaining performance under various conditions for financial systems."
    ],
    'problem': [
      "I enjoy solving complex technical problems in fintech and have experience debugging challenging issues across the full stack for financial applications. I use systematic approaches to problem-solving, including root cause analysis and implementing comprehensive testing strategies for financial systems. I believe in understanding the problem thoroughly before implementing solutions.",
      "My problem-solving approach includes analyzing requirements, breaking down complex problems, and implementing efficient solutions for financial applications. I have experience with debugging tools, performance profiling, and implementing robust error handling strategies for financial systems.",
      "I have strong analytical skills and enjoy tackling complex technical challenges in fintech. I use systematic approaches to understand problems and implement effective solutions for financial applications."
    ]
  };

  // Check for keywords and return appropriate response
  for (const [keyword, responseArray] of Object.entries(responses)) {
    if (message.includes(keyword)) {
      return responseArray[Math.floor(Math.random() * responseArray.length)];
    }
  }

  // Advanced default responses for unrecognized queries
  const defaultResponses = [
    "That's an interesting question! I'd be happy to provide detailed information about my 5 years of fintech experience, banking systems work, and technical skills with C#, .NET Core, React, and AWS. What specific area would you like to explore further?",
    "I can provide comprehensive information about my 5 years of fintech development, banking systems experience, and technical expertise with C#, .NET Core, React, and AWS. What aspects of my work and capabilities would you like to know more about?",
    "I'm here to answer detailed questions about my 5 years of fintech experience, banking systems development, and technical skills with C#, .NET Core, React, and AWS. Feel free to ask about specific technologies, methodologies, or professional experience.",
    "I'd love to tell you more about my 5 years of fintech development work and technical capabilities with C#, .NET Core, React, and AWS. What specific aspects of my skills, projects, or experience would you like to explore?",
    "I can help you understand my 5 years of fintech experience, banking systems work, and technical expertise with C#, .NET Core, React, and AWS. What would you like to know about my professional background and skills?"
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is running' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
}); 