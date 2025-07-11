# ChatGPT API Implementation - Technical Documentation

## 🎯 **Project Overview**
This portfolio showcases my ability to integrate with ChatGPT API and build AI-powered features. The current implementation uses mock responses for cost efficiency while demonstrating complete ChatGPT API integration architecture.

## 🏗️ **Technical Architecture**

### **1. ChatGPT API Integration Structure**

```javascript
// Real ChatGPT API Implementation
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    
    // System prompt for context
    const systemPrompt = `You are a helpful AI assistant for Tahira's portfolio...`;
    
    // ChatGPT API call
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });
    
    const botResponse = completion.choices[0].message.content;
    res.json({ success: true, message: botResponse });
    
  } catch (error) {
    // Handle API errors (rate limits, quota exceeded, etc.)
    res.status(500).json({ success: false, message: error.message });
  }
});
```

### **2. Key ChatGPT API Concepts Demonstrated**

#### **✅ Model Selection**
- **GPT-3.5-turbo**: Cost-effective for chat applications
- **GPT-4**: For more complex reasoning (higher cost)
- **Custom models**: Fine-tuned for specific use cases

#### **✅ Message Structure**
```javascript
messages: [
  { role: "system", content: "You are a helpful assistant..." },
  { role: "user", content: "What are your skills?" },
  { role: "assistant", content: "I'm skilled in..." },
  { role: "user", content: "Tell me more about React" }
]
```

#### **✅ Parameters Optimization**
- **max_tokens**: Control response length (300 for chat)
- **temperature**: Control creativity (0.7 for balanced responses)
- **top_p**: Nucleus sampling for response quality
- **frequency_penalty**: Reduce repetition

#### **✅ Error Handling**
```javascript
// Handle different API errors
if (error.code === 'insufficient_quota') {
  // Handle quota exceeded
} else if (error.code === 'rate_limit_exceeded') {
  // Handle rate limiting
} else if (error.code === 'invalid_api_key') {
  // Handle authentication issues
}
```

### **3. Production-Ready Features**

#### **✅ Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/chat', chatLimiter);
```

#### **✅ Conversation Context**
```javascript
// Maintain conversation history for context
const conversationHistory = messages.slice(-10); // Last 10 messages

const messages = [
  { role: "system", content: systemPrompt },
  ...conversationHistory.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.text
  })),
  { role: "user", content: currentMessage }
];
```

#### **✅ Cost Management**
```javascript
// Track token usage for cost optimization
const tokenCount = completion.usage.total_tokens;
const cost = (tokenCount / 1000) * 0.002; // GPT-3.5-turbo pricing

// Implement usage limits
if (monthlyUsage > 100000) {
  return res.status(429).json({ 
    message: 'Monthly usage limit exceeded' 
  });
}
```

### **4. Security Best Practices**

#### **✅ API Key Management**
```javascript
// Environment variables for security
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;

// Never expose API key in frontend
// All API calls go through backend
```

#### **✅ Input Validation**
```javascript
// Sanitize user input
const sanitizedMessage = message.trim().substring(0, 1000);

// Validate message length
if (sanitizedMessage.length < 1 || sanitizedMessage.length > 1000) {
  return res.status(400).json({ 
    message: 'Message must be between 1 and 1000 characters' 
  });
}
```

#### **✅ Content Filtering**
```javascript
// Check for inappropriate content
const inappropriateKeywords = ['spam', 'inappropriate', 'harmful'];
const hasInappropriateContent = inappropriateKeywords.some(keyword => 
  message.toLowerCase().includes(keyword)
);

if (hasInappropriateContent) {
  return res.status(400).json({ 
    message: 'Inappropriate content detected' 
  });
}
```

### **5. Deployment Considerations**

#### **✅ Environment Configuration**
```javascript
// Production vs Development
const isProduction = process.env.NODE_ENV === 'production';

const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID, // Optional
  timeout: 30000, // 30 seconds
  maxRetries: 3
};
```

#### **✅ Monitoring & Logging**
```javascript
// Log API usage for monitoring
console.log(`ChatGPT API call - Tokens: ${completion.usage.total_tokens}, Cost: $${cost}`);

// Error tracking
if (error) {
  console.error('ChatGPT API Error:', {
    code: error.code,
    message: error.message,
    timestamp: new Date().toISOString()
  });
}
```

## 🚀 **How to Switch to Real ChatGPT API**

### **Step 1: Get OpenAI API Key**
1. Sign up at [OpenAI Platform](https://platform.openai.com/)
2. Navigate to API Keys section
3. Create new API key
4. Add to `.env`: `OPENAI_API_KEY=sk-your-key-here`

### **Step 2: Replace Mock with Real API**
In `server/index.js`, replace the mock function with the real ChatGPT API call shown above.
