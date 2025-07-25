import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiBriefcase, FiTool, FiMail, FiSun, FiMoon, FiMenu, FiX, FiCalendar } from 'react-icons/fi';
import noise from '../assets/noise.png';

const navItems = [
  { name: 'Home', href: '#home', icon: <FiHome size={20} /> },
  { name: 'About', href: '#about', icon: <FiUser size={20} /> },
  { name: 'Projects', href: '#projects', icon: <FiBriefcase size={20} /> },
  { name: 'Experience', href: '#experience', icon: <FiCalendar size={20} /> },
  { name: 'Skills', href: '#skills', icon: <FiTool size={20} /> },
  { name: 'Contact', href: '#contact', icon: <FiMail size={20} /> },
];

const NavItem = ({ item, activeSection, scrollToSection, isDocked }) => {
  const isActive = activeSection === item.name.toLowerCase();

  const tooltipClasses = isDocked 
    ? "top-1/2 right-full -translate-y-1/2 mr-3" // Left of icon
    : "top-full left-1/2 -translate-x-1/2 mt-2"; // Below icon

  const arrowClasses = isDocked
    ? "top-1/2 -translate-y-1/2 left-full border-l-gray-800 dark:border-l-gray-200" // Pointing right
    : "bottom-full left-1/2 -translate-x-1/2 border-b-gray-800 dark:border-b-gray-200"; // Pointing up

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => scrollToSection(item.href)}
      className="relative p-2 rounded-lg transition-colors duration-200 group"
      aria-label={item.name}
    >
      <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-copy dark:text-copy-dark hover:text-accent dark:hover:text-accent'}`}>
        {item.icon}
      </span>
      
      {/* Tooltip with dynamic positioning */}
      <div className={`absolute px-2 py-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs font-medium rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none lg:block hidden whitespace-nowrap z-[60] ${tooltipClasses}`}>
        {item.name}
        <div className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses}`}></div>
      </div>
      
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

const DarkModeToggle = ({ darkMode, toggleDarkMode, isDocked }) => {
  const tooltipClasses = isDocked 
    ? "top-1/2 right-full -translate-y-1/2 mr-3" // Left of icon
    : "top-full left-1/2 -translate-x-1/2 mt-2"; // Below icon

  const arrowClasses = isDocked
    ? "top-1/2 -translate-y-1/2 left-full border-l-gray-800 dark:border-l-gray-200" // Pointing right
    : "bottom-full left-1/2 -translate-x-1/2 border-b-gray-800 dark:border-b-gray-200"; // Pointing up
    
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleDarkMode}
      className="relative p-2 rounded-lg transition-colors duration-200 group"
      aria-label="Toggle dark mode"
    >
      <span className="transition-colors duration-300 text-copy dark:text-copy-dark hover:text-accent dark:hover:text-accent">
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </span>

      {/* Tooltip for DarkModeToggle */}
      <div className={`absolute px-2 py-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs font-medium rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none lg:block hidden whitespace-nowrap z-[60] ${tooltipClasses}`}>
        {darkMode ? "Light Mode" : "Dark Mode"}
        <div className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses}`}></div>
      </div>
    </motion.button>
  );
};

const Navbar = ({ activeSection, darkMode, toggleDarkMode }) => {
  const [isDocked, setIsDocked] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      setMobileOpen(false); // Close menu on link click
    }
  };

  // Hamburger menu for mobile
  return (
    <>
      {/* Hamburger icon for mobile */}
      <div className="fixed z-[100] top-6 right-6 flex lg:hidden">
        <button
          className="p-2 rounded-lg bg-surface/80 dark:bg-surface-dark/80 shadow-lg backdrop-blur-md"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu size={28} />
        </button>
      </div>
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-surface/95 dark:bg-surface-dark/95 backdrop-blur-md lg:hidden"
            style={{ backgroundImage: `url(${noise})`, backgroundRepeat: 'repeat', backgroundSize: 'auto', backgroundPosition: 'center' }}
          >
            <button
              className="absolute top-6 right-6 p-2 rounded-lg bg-surface/80 dark:bg-surface-dark/80 shadow-lg"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <FiX size={28} />
            </button>
            <nav className="flex flex-col gap-8 items-center mt-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`flex items-center gap-3 text-2xl font-semibold ${activeSection === item.name.toLowerCase() ? 'text-accent' : 'text-copy dark:text-copy-dark'}`}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
              <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} isDocked={isDocked} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Desktop/capsule navbar (hidden on mobile) */}
      <AnimatePresence>
        <div className="hidden lg:block">
          {isDocked ? (
            <motion.div
              key="docked-nav"
              initial={{ x: '150%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '150%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 25 }}
              className="fixed z-50 top-4 right-8 flex flex-col items-center gap-2 p-1 rounded-full shadow-lg bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md"
              style={{
                backgroundImage: `url(${noise})`,
                backgroundRepeat: 'repeat',
                backgroundSize: 'auto',
                backgroundPosition: 'center'
              }}
            >
              {navItems.map((item) => (
                <NavItem key={item.name} item={item} activeSection={activeSection} scrollToSection={scrollToSection} isDocked={isDocked} />
              ))}
              <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} isDocked={isDocked} />
            </motion.div>
          ) : (
            <motion.div
              key="centered-nav"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 25 }}
              className="fixed z-50 top-4 left-0 right-0 mx-auto w-max flex items-center gap-2 p-1 rounded-full shadow-lg bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md"
              style={{
                backgroundImage: `url(${noise})`,
                backgroundRepeat: 'repeat',
                backgroundSize: 'auto',
                backgroundPosition: 'center'
              }}
            >
              {navItems.map((item) => (
                <NavItem key={item.name} item={item} activeSection={activeSection} scrollToSection={scrollToSection} isDocked={isDocked} />
              ))}
              <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} isDocked={isDocked} />
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </>
  );
};

export default Navbar; 