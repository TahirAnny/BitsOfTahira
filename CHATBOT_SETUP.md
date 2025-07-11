# Chatbot Setup Guide

## Overview
The chatbot uses ChatGPT API to provide intelligent responses.

## Setup Instructions

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to "API Keys" section
4. Create a new API key
5. Copy the key (it starts with `sk-`)

### 2. Environment Variables
Create a `.env` file in your project root with:

```env
# OpenAI Configuration (new)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Server Configuration
PORT=5000
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Application
```bash
npm run dev
```

## Features

### 🤖 AI-Powered Responses
- Handles questions about skills, experience, and projects
- Provides technical information about portfolio
- Suggests using contact form for specific inquiries
- Maintains conversation context

### 🎨 Beautiful UI
- Floating chat widget that doesn't interfere with design
- Smooth animations and transitions
- Dark/light mode support
- Responsive design
- Loading states and error handling

### 💰 Cost-Effective
- Only charges when users actually chat
- Uses GPT-3.5-turbo for optimal cost/performance
- Limited token usage to keep costs low

## Customization

### Modify System Prompt
Edit the `systemPrompt` in `server/index.js` to customize the chatbot's personality and knowledge base.

### Styling
The chatbot uses Tailwind CSS classes. You can modify the styling in `src/components/Chatbot.js` to match your portfolio's theme.

### FAQ Topics
The chatbot is trained to handle:
- Questions about your skills and experience
- Technical questions about your portfolio
- General inquiries about your work
- How to contact you

## Security Notes
- API key is stored server-side only
- No sensitive data is sent to the frontend
- Rate limiting and error handling included
- Fallback to contact form for complex inquiries

## Troubleshooting

### Chatbot not responding
1. Check if your server is running (`npm run dev`)
2. Verify your OpenAI API key is correct
3. Check browser console for errors
4. Ensure your `.env` file is in the project root

### API Key Issues
- Make sure your OpenAI account has credits
- Check if the API key has proper permissions
- Verify the key format (should start with `sk-`)

## Cost Management
- GPT-3.5-turbo is very cost-effective (~$0.002 per 1K tokens)
- Each response is limited to 300 tokens
- Monitor usage in your OpenAI dashboard
- Consider setting up usage alerts

## Future Enhancements
- Add conversation history persistence
- Implement typing indicators
- Add file upload capabilities
- Integrate with your project database
- Add analytics tracking 