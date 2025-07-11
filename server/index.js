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

// Memory monitoring
const logMemoryUsage = () => {
  const used = process.memoryUsage();
  console.log(`Memory: RSS=${(used.rss/1024/1024).toFixed(2)}MB HeapUsed=${(used.heapUsed/1024/1024).toFixed(2)}MB`);
  
  // Force garbage collection if memory usage is high
  if (used.heapUsed > 100 * 1024 * 1024) { // 100MB
    if (global.gc) {
      global.gc();
      console.log('Garbage collection triggered');
    }
  }
};

// Optimized logging utility functions
const logToFile = (level, message, data = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    // Only include essential data to reduce memory
    ...(data.error ? { error: data.error } : {}),
    ...(data.userMessage ? { userMessage: data.userMessage.substring(0, 100) } : {})
  };
  
  const logLine = JSON.stringify(logEntry) + '\n';
  const logFile = path.join(logsDir, `${level}.log`);
  
  try {
    fs.appendFileSync(logFile, logLine);
  } catch (error) {
    console.error('Logging failed:', error.message);
  }
  
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
app.use(cors({
  origin: [
    'https://tahiraanny.vercel.app', // Your Vercel domain (removed trailing slash)
    'http://localhost:3000' // For local development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Memory monitoring middleware
app.use((req, res, next) => {
  logMemoryUsage();
  next();
});

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
      contactData: { name, email, subject }
    });
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Optimized analytics tracking - reduced memory footprint
let analytics = {
  totalRequests: 0,
  chatgptResponses: 0,
  mockResponses: 0,
  errors: 0,
  errorTypes: {},
  averageResponseTime: 0,
  startTime: new Date(),
  // Reduced monitoring data
  tokenUsage: {
    total: 0,
    average: 0,
    max: 0,
    min: Infinity
  },
  costTracking: {
    totalCost: 0,
    averageCost: 0
  },
  alerts: {
    highTokenUsage: false,
    highCost: false,
    errorSpike: false
  },
  performance: {
    responseTimes: [], // Limited to 50 instead of 100
    slowRequests: 0,
    timeoutCount: 0
  }
};

// Cost calculation constants (GPT-3.5-turbo pricing)
const COST_PER_1K_TOKENS = 0.002; // $0.002 per 1K tokens for GPT-3.5-turbo

// Optimized monitoring utility functions
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
  
  // Keep only last 50 response times (reduced from 100)
  if (analytics.performance.responseTimes.length > 50) {
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
      error: error.message
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
      userMessage: message
    });
    res.status(500).json({ 
      success: false, 
      message: 'Sorry, I\'m having trouble responding right now. Please try again later or use the contact form.' 
    });
  }
});

// Optimized mock response generator - reduced memory usage
function generateMockResponse(message) {
  // Use a more memory-efficient approach with smaller response sets
  const responseMap = {
    'skill': [
      "I have 5 years of experience in fintech development, specializing in C#, .NET Core, React, and AWS. I've worked extensively with banking systems, implementing anti-money laundering (AML) solutions and financial compliance systems.",
      "My technical stack includes C# and .NET Core for backend development, React for frontend applications, and AWS for cloud infrastructure. I have experience with Azure DevOps for CI/CD, Python for data processing, and Node.js for web development."
    ],
    'experience': [
      "I have 5 years of experience in fintech development, working on critical banking systems and anti-money laundering (AML) solutions. I've developed secure financial applications, implemented compliance systems, and worked with sensitive financial data.",
      "My experience spans 5 years in the fintech sector, working with banking systems and financial compliance. I've built applications that handle millions of transactions, implement AML detection systems, and worked with various financial APIs."
    ],
    'project': [
      "I've developed several critical fintech applications including anti-money laundering (AML) systems, banking platforms, and financial compliance tools. Each project demonstrates my ability to handle sensitive financial data, implement security measures, and ensure regulatory compliance.",
      "My projects include fintech applications with real-time transaction processing, AML detection systems, and secure banking platforms. I've built applications using C#, .NET Core, React, and AWS, with experience in Azure DevOps for deployment."
    ],
    'contact': [
      "You can reach me through the contact form on this website, or connect with me on LinkedIn. I'm actively seeking opportunities in fintech development roles where I can leverage my 5 years of experience in banking systems, AML solutions, and financial applications.",
      "Feel free to use the contact form above, or you can find my social links in the footer. I'm open to discussing fintech development opportunities, particularly in banking systems, AML, and financial applications."
    ],
    'portfolio': [
      "This portfolio demonstrates my full-stack development skills with React frontend, Node.js backend, and ChatGPT API integration. While my primary expertise is in fintech with C#, .NET Core, and AWS, this website showcases my ability to work with modern web technologies.",
      "I built this portfolio to showcase my technical capabilities including React development, API integration, and modern web technologies. While my core experience is in fintech with C#, .NET Core, and AWS, this project demonstrates my versatility with Node.js and React."
    ],
    'technology': [
      "My primary tech stack includes C#, .NET Core, React, and AWS for fintech development. I have extensive experience with Azure DevOps for CI/CD, Python for data processing, and Node.js for web development.",
      "I work with C#, .NET Core, React, and AWS as my main technologies for fintech applications. I have experience with Azure, Azure DevOps, Python, and Node.js."
    ],
    'fintech': [
      "I have 5 years of experience in fintech development, working on critical banking systems and anti-money laundering (AML) solutions. I've developed applications that process millions of financial transactions, implement regulatory compliance measures, and ensure data security.",
      "My fintech experience includes developing banking platforms, AML detection systems, and financial compliance tools. I've worked with C#, .NET Core, React, and AWS to build secure, scalable financial applications."
    ],
    'banking': [
      "I have 5 years of experience working with banking systems, developing applications that handle financial transactions, implement security measures, and ensure regulatory compliance. I've worked on systems that process millions of transactions, implement AML detection, and maintain data integrity.",
      "My banking experience includes developing secure financial applications, implementing authentication systems, and working with financial APIs. I have experience with C#, .NET Core, React, and AWS for building robust banking platforms."
    ],
    'aml': [
      "I have extensive experience developing anti-money laundering (AML) solutions for financial institutions. I've built systems that detect suspicious transactions, implement compliance rules, and generate regulatory reports.",
      "My AML experience includes developing detection algorithms, implementing compliance workflows, and building reporting systems for financial institutions. I have experience with C#, .NET Core, and AWS for building scalable AML solutions."
    ],
    'c#': [
      "I have 5 years of experience with C# development, particularly in fintech applications and banking systems. I've built enterprise-level applications using C#, .NET Core, and various .NET frameworks.",
      "My C# experience includes developing backend services, APIs, and business logic for financial applications. I have experience with ASP.NET Core, Entity Framework, and implementing secure financial applications with C#."
    ],
    '.net': [
      "I have extensive experience with .NET Core and .NET Framework for building fintech applications and banking systems. I've worked with ASP.NET Core, Entity Framework, and various .NET libraries for building secure, scalable financial applications.",
      "My .NET experience includes building web APIs, implementing authentication and authorization, and working with various .NET technologies. I have experience with .NET Core, dependency injection, and building enterprise-level applications."
    ],
    'aws': [
      "I have experience with AWS cloud services for deploying and managing fintech applications. I've worked with AWS services like EC2, S3, RDS, and Lambda for building scalable financial applications.",
      "My AWS experience includes deploying applications, managing cloud infrastructure, and implementing security measures for financial applications. I have experience with AWS services, cloud architecture, and ensuring compliance in cloud environments."
    ],
    'azure': [
      "I have experience with Azure cloud services and Azure DevOps for CI/CD pipelines. I've worked with Azure App Service, Azure SQL Database, and Azure DevOps for building and deploying financial applications.",
      "My Azure experience includes deploying applications, managing cloud resources, and implementing CI/CD pipelines with Azure DevOps. I have experience with Azure services and ensuring security and compliance in Azure environments."
    ],
    'react': [
      "I have experience with React ecosystem including hooks, context API, and modern React patterns for building fintech applications. I've implemented complex state management with Redux and Context API, built reusable component libraries.",
      "My React experience includes building scalable financial applications with proper component architecture, implementing custom hooks, and optimizing React performance. I have experience with React testing libraries and integrating React with various backend technologies."
    ],
    'node': [
      "I have experience with Node.js development for building RESTful APIs and implementing server-side logic for fintech applications. I've worked with Express.js, implemented authentication systems, and have experience with Node.js performance optimization.",
      "My Node.js experience includes building microservices for financial applications, implementing real-time features with Socket.io, and creating robust backend services. I have experience with Node.js security best practices, error handling, and implementing proper logging and monitoring."
    ],
    'security': [
      "I implement security best practices including authentication, authorization, input validation, and secure communication protocols for fintech applications. I have experience with OAuth, JWT tokens, and implementing security measures to protect against common vulnerabilities.",
      "My security experience includes implementing authentication systems for financial applications, securing APIs, and protecting against common web vulnerabilities. I have experience with HTTPS, CORS policies, and implementing secure data handling practices."
    ],
    'performance': [
      "I focus on performance optimization including code splitting, lazy loading, and implementing efficient algorithms for fintech applications. I have experience with caching strategies, database optimization, and monitoring application performance.",
      "My performance optimization experience includes frontend optimization techniques, database query optimization, and implementing caching strategies for financial applications. I use performance monitoring tools and focus on creating applications that are both fast and scalable."
    ],
    'scalability': [
      "I have experience designing and implementing scalable fintech applications using horizontal scaling, load balancing, and caching strategies. I've worked with distributed systems, implemented database sharding, and have experience with performance optimization techniques.",
      "My scalability experience includes implementing caching strategies, optimizing database queries, and designing financial applications that can handle increased load. I have experience with CDN implementation, database optimization, and implementing proper monitoring for scalable financial applications."
    ]
  };

  // Check for keywords and return appropriate response
  for (const [keyword, responseArray] of Object.entries(responseMap)) {
    if (message.includes(keyword)) {
      return responseArray[Math.floor(Math.random() * responseArray.length)];
    }
  }

  // Default responses for unrecognized queries
  const defaultResponses = [
    "That's an interesting question! I'd be happy to provide detailed information about my 5 years of fintech experience, banking systems work, and technical skills with C#, .NET Core, React, and AWS. What specific area would you like to explore further?",
    "I can provide comprehensive information about my 5 years of fintech development, banking systems experience, and technical expertise with C#, .NET Core, React, and AWS. What aspects of my work and capabilities would you like to know more about?",
    "I'm here to answer detailed questions about my 5 years of fintech experience, banking systems development, and technical skills with C#, .NET Core, React, and AWS. Feel free to ask about specific technologies, methodologies, or professional experience."
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  const used = process.memoryUsage();
  const uptime = Date.now() - analytics.startTime;
  const hours = Math.floor(uptime / (1000 * 60 * 60));
  const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
  
  res.status(200).json({ 
    success: true, 
    message: 'Server is running',
    status: 'healthy',
    memory: {
      rss: `${(used.rss/1024/1024).toFixed(2)}MB`,
      heapUsed: `${(used.heapUsed/1024/1024).toFixed(2)}MB`,
      heapTotal: `${(used.heapTotal/1024/1024).toFixed(2)}MB`
    },
    uptime: `${hours}h ${minutes}m`,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  
  // Log initial memory usage
  logMemoryUsage();
}); 