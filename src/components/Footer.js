import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiGithub, FiCoffee } from 'react-icons/fi';
import { personalInfo } from '../config/personalInfo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { portfolioRepo, footer } = personalInfo;

  return (
    <footer className="py-8">
      <div className="container-custom">
        <div className="text-center">
          {/* GitHub Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <motion.a
              href={portfolioRepo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-muted dark:text-muted-dark hover:text-accent dark:hover:text-accent transition-colors duration-200 font-medium"
            >
              <FiGithub size={20} />
              <span>View this project on GitHub</span>
            </motion.a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted dark:text-muted-dark text-sm"
          >
            <p className="flex items-center justify-center gap-2">
              <span>© {currentYear} {footer.loveCopyright}</span>
              <FiHeart className="text-red-500" size={16} />
              <span>{footer.coffeeCopyright}</span>
              <FiCoffee className="text-amber-600" size={16} />
            </p>
          </motion.div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center justify-center gap-2 text-accent dark:text-accent hover:underline focus:outline-none text-sm font-normal leading-[1.2] animate-float"
          aria-label="Scroll back to top"
          style={{ animation: 'float 2.5s ease-in-out infinite' }}
        >
          <span role="img" aria-label="rocket" className="align-middle relative top-[4px]">🚀</span>
          <span className="align-middle">Scroll back to top</span>
          <span role="img" aria-label="rocket" className="align-middle relative top-[4px]">🚀</span>
        </button>
        <style>{`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0); }
          }
        `}</style>
      </div>
    </footer>
  );
};

export default Footer; 