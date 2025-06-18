import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import { personalInfo } from '../config/personalInfo';

const About = () => {

  const { about } = personalInfo;

  const downloadResume = () => {
    // This would typically link to a PDF resume
    window.open(about.resume, '_blank');
  };

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              
              <p className="text-md text-gray-600 dark:text-gray-300 leading-relaxed">
                {about.intro}
              </p>
              
              <p className="text-md ext-gray-600 dark:text-gray-300 leading-relaxed">
                {about.experience}
              </p>

              <p className="text-md text-gray-600 dark:text-gray-300 leading-relaxed">
                {about.core}
              </p>
              
              <p className="text-md text-gray-600 dark:text-gray-300 leading-relaxed">
                {about.interests}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadResume}
                className="btn-primary inline-flex items-center gap-2"
              >
                <FiDownload size={20} />
                Download Resume
              </motion.button>
            </div>
          </motion.div>

          {/* Image/Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white dark:bg-dark-700 rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {about.stats.experience}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Years of Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {about.stats.projects}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Projects Completed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {about.stats.clients}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Happy Clients
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {about.stats.technologies}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Technologies
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-50"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 