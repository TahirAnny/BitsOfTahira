import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = 'Tahira';
  const typingSpeed = 150; // milliseconds per character

  useEffect(() => {
    // Typing animation
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    } else {
      // Wait a bit after typing is complete, then trigger completion
      const completionTimeout = setTimeout(() => {
        onComplete();
      }, 1000); // Wait 1 second after typing completes
      
      return () => clearTimeout(completionTimeout);
    }
  }, [currentIndex, fullText, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Name with typing animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {currentText}
            <span 
              className={`inline-block w-2 h-16 sm:h-20 lg:h-24 bg-primary-600 dark:bg-primary-400 ml-2 transition-opacity duration-200 ${
                showCursor ? 'opacity-100' : 'opacity-0'
              }`}
            ></span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-medium"
          >
            Software Engineer
          </motion.p>
          
          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center space-x-2 mt-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"
            ></motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader; 