// API Configuration
// This file centralizes API URL configuration for different environments

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://tahiraanny.com' 
  : 'http://localhost:5000';

export default API_BASE_URL; 