import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiBriefcase, FiTool, FiMail } from 'react-icons/fi';
import noise from '../assets/noise.png';

const navItems = [
  { name: 'Home', href: '#home', icon: <FiHome size={20} /> },
  { name: 'About', href: '#about', icon: <FiUser size={20} /> },
  { name: 'Projects', href: '#projects', icon: <FiBriefcase size={20} /> },
  { name: 'Skills', href: '#skills', icon: <FiTool size={20} /> },
  { name: 'Contact', href: '#contact', icon: <FiMail size={20} /> },
];

const NavItem = ({ item, activeSection, scrollToSection }) => {
  const isActive = activeSection === item.name.toLowerCase();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => scrollToSection(item.href)}
      className="relative p-2 rounded-lg transition-colors duration-200"
      aria-label={item.name}
    >
      <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-copy dark:text-copy-dark hover:text-accent dark:hover:text-accent'}`}>
        {item.icon}
      </span>
      {isActive && (
        <motion.div
          layoutId="active-nav-item"
          className="absolute inset-0 bg-accent rounded-lg -z-10 shadow-lg shadow-accent-500/50"
          style={{
            backgroundImage: `url(${noise})`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
            backgroundPosition: 'center',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

const Navbar = ({ activeSection }) => {
  const [isDocked, setIsDocked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldDock = window.scrollY > window.innerHeight * 0.9;
      if (shouldDock !== isDocked) {
        setIsDocked(shouldDock);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDocked]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isDocked ? (
        <motion.div
          key="docked-nav"
          initial={{ x: '150%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '150%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 25 }}
          className="fixed z-50 top-8 right-8 flex flex-col items-center gap-2 p-1 rounded-full shadow-lg bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md"
          style={{
            backgroundImage: `url(${noise})`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
            backgroundPosition: 'center'
          }}
        >
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} activeSection={activeSection} scrollToSection={scrollToSection} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="centered-nav"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 25 }}
          className="fixed z-50 top-8 left-0 right-0 mx-auto w-max flex items-center gap-2 p-1 rounded-full shadow-lg bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md"
          style={{
            backgroundImage: `url(${noise})`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
            backgroundPosition: 'center'
          }}
        >
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} activeSection={activeSection} scrollToSection={scrollToSection} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar; 