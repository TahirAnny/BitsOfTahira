import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SocialIcons from './components/SocialIcons';
import EmailLink from './components/EmailLink';
import AnimatedBackground from './components/AnimatedBackground';
import LoaderWrapper from './components/LoaderWrapper';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const { ref: homeRef, inView: homeInView } = useInView({ threshold: 0.5 });
  const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.5 });
  const { ref: projectsRef, inView: projectsInView } = useInView({ threshold: 0.5 });
  const { ref: skillsRef, inView: skillsInView } = useInView({ threshold: 0.5 });
  const { ref: contactRef, inView: contactInView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (homeInView) setActiveSection('home');
    else if (aboutInView) setActiveSection('about');
    else if (projectsInView) setActiveSection('projects');
    else if (skillsInView) setActiveSection('skills');
    else if (contactInView) setActiveSection('contact');
  }, [homeInView, aboutInView, projectsInView, skillsInView, contactInView]);

  useEffect(() => {
    // Check for saved dark mode preference, default to dark mode if none saved
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      setDarkMode(true);
      localStorage.setItem('darkMode', 'true');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Always use palette4
  useEffect(() => {
    document.body.classList.remove('palette1', 'palette2', 'palette3');
    document.body.classList.add('palette4');
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <LoaderWrapper>
      {/* Logo at Top Left in Orbitron */}
      <div className="hidden lg:block fixed top-4 left-4 z-[100]">
        <span className="text-lg font-bold select-none font-orbitron transition-all duration-300" style={{ color: '#14b8a6' }}>{'<TBA />'}</span>
      </div>
      {/* Animated Background */}
      {/* <AnimatedBackground /> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar activeSection={activeSection} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <Hero ref={homeRef} />
          <About ref={aboutRef} />
          <Projects ref={projectsRef} />
          <Skills ref={skillsRef} />
          <Contact ref={contactRef} />
        </main>
        <Footer />
        <SocialIcons />
        <EmailLink />
      </motion.div>
    </LoaderWrapper>
  );
}

export default App; 