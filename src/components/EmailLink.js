import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../config/personalInfo';

const EmailLink = () => {
  const { email } = personalInfo;

  return (
    <div className="hidden lg:block fixed bottom-0 right-8 z-40">
      <div className="flex flex-col items-center space-y-4 pr-4">
        <motion.a
          href={`mailto:${email}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ 
            y: -3,
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 writing-mode-vertical"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed'
          }}
        >
          {personalInfo.contact.contactInfo[0].value}
        </motion.a>
        
        {/* Vertical line */}
        <div className="w-px h-20 bg-gray-300 dark:bg-gray-600 mt-4"></div>
      </div>
    </div>
  );
};

export default EmailLink; 