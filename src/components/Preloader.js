import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import noise from '../assets/noise.png';

const hexagonLength = 6 * Math.sqrt(Math.pow(28, 2) + Math.pow(15, 2)); // Approximate perimeter for stroke animation

const Preloader = ({ onComplete }) => {
  const [showT, setShowT] = useState(false);

  useEffect(() => {
    const tTimeout = setTimeout(() => setShowT(true), 1200); // Show T after hexagon draws
    const completeTimeout = setTimeout(() => onComplete(), 2200);
    return () => {
      clearTimeout(tTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: 'rgb(24, 24, 27)',
      backgroundImage: `linear-gradient(rgba(51, 51, 51, 0.4), rgba(51, 51, 51, 0.4)), url(${noise})`,
      backgroundRepeat: 'repeat',
      backgroundSize: 'auto',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <svg width="100" height="100" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 4px #14b8a6) drop-shadow(0 0 8px #14b8a6)' }}>
        {/* Animated Hexagon Outline */}
        <motion.path
          d="M40 10 L68 25 L68 55 L40 70 L12 55 L12 25 Z"
          stroke="#14b8a6"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        {/* Animated T fade-in */}
        <AnimatePresence>
          {showT && (
            <motion.g
              id="B"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <path d="M30 32 H50 M40 32 V55" stroke="#14b8a6" strokeWidth="4" strokeLinecap="round" />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};

export default Preloader; 