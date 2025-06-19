import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { SiStackoverflow } from 'react-icons/si';
import { personalInfo } from '../config/personalInfo';

const SocialIcons = () => {
  const { socialLinks } = personalInfo;
  
  const socialLinksConfig = [
    {
      name: 'GitHub',
      url: socialLinks.github,
      icon: <FiGithub size={20} />,
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      url: socialLinks.linkedin,
      icon: <FiLinkedin size={20} />,
      color: 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200'
    },
    {
      name: 'Stack Overflow',
      url: socialLinks.stackoverflow,
      icon: <SiStackoverflow size={20} />,
      color: 'text-gray-400 hover:text-orange-500 transition-colors duration-300'
    }
  ];

  return (
    <div className="hidden lg:block fixed bottom-0 left-8 z-40">
      <div className="flex flex-col items-center space-y-4">
        {socialLinksConfig.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ 
              y: -3,
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.9 }}
            className={`${social.color}`}
            aria-label={social.name}
          >
            {social.icon}
          </motion.a>
        ))}
        {/* Vertical line */}
        <div className="w-px h-20 bg-gray-300 dark:bg-gray-600 mt-4"></div>
      </div>
    </div>
  );
};

export default SocialIcons; 