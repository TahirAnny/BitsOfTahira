import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import SocialIcons from './components/SocialIcons';
import EmailLink from './components/EmailLink';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved dark mode preference, default to dark mode if none saved
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      // Default to dark mode for new users
      setDarkMode(true);
      localStorage.setItem('darkMode', 'true');
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className={isLoading ? 'hidden' : ''}
      >
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
        
        {/* Fixed Social Icons */}
        <SocialIcons />
        
        {/* Fixed Email Link */}
        <EmailLink />
      </motion.div>
    </div>
  );
}

export default App; 