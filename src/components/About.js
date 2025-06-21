import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import { personalInfo } from '../config/personalInfo';
import tahiraImage from '../assets/Tahira.jpg';

const About = forwardRef((props, ref) => {

  const { about } = personalInfo;

  const downloadResume = () => {
    // This would typically link to a PDF resume
    window.open(about.resume, '_blank');
  };

  return (
    <section ref={ref} id="about" className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-copy dark:text-copy-dark mb-1 flex items-center">
            <span className="text-accent font-mono text-2xl mr-3">01.</span>
            About Me
          </h2>
          <div className="w-48 h-px bg-gray-600 mt-2"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="space-y-6">
              
              <p className="text-md text-muted dark:text-muted-dark leading-relaxed">
                {about.intro}
              </p>
              
              <p className="text-md text-muted dark:text-muted-dark leading-relaxed">
                {about.experience}
              </p>

              <p className="text-md text-muted dark:text-muted-dark leading-relaxed">
                {about.core}
              </p>
              
              <p className="text-md text-muted dark:text-muted-dark leading-relaxed">
                {about.interests}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadResume}
                className="btn-secondary inline-flex items-center gap-2"
              >
                <FiDownload size={20} />
                Download Resume
              </motion.button>
            </div>
          </motion.div>

          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative lg:col-span-2 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-xs group mx-auto lg:mx-0">
              {/* Image is on top with a z-index of 10 */}
              <div className="relative z-10 p-1 bg-surface dark:bg-surface-dark rounded-md shadow-lg">
                <img
                  src={tahiraImage}
                  alt="Tahira Bishwas Anny"
                  className="w-full h-auto object-cover rounded filter grayscale group-hover:filter-none transition-all duration-300"
                />
              </div>
              {/* Accent color frame behind the image */}
              <div className="absolute top-3 left-3 w-full h-full rounded-md bg-accent z-0 group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default About; 