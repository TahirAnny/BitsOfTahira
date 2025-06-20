import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { personalInfo } from '../config/personalInfo';
import noise from '../assets/noise.png';

const Projects = forwardRef((props, ref) => {
  const { projects } = personalInfo;
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section ref={ref} id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-copy dark:text-copy-dark mb-4">
            Some Things I've Built
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-24 mb-24">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-12 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Project Image */}
              <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-6' : ''}`}>
                <div className="relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-accent bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
                </div>
              </div>

              {/* Project Content */}
              <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="space-y-4">
                  <p className="text-sm text-accent font-medium">
                    Featured Project
                  </p>
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl lg:text-3xl font-bold text-copy dark:text-copy-dark">
                      {project.title}
                    </h3>
                    <div className="flex space-x-2">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted dark:text-muted-dark hover:text-accent dark:hover:text-accent transition-colors duration-200"
                      >
                        <FiGithub size={20} />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted dark:text-muted-dark hover:text-accent dark:hover:text-accent transition-colors duration-200"
                      >
                        <FiExternalLink size={20} />
                      </motion.a>
                    </div>
                  </div>
                  <div 
                    className="bg-surface dark:bg-surface-dark p-6 rounded-lg shadow-lg"
                    style={{
                      backgroundImage: `url(${noise})`,
                      backgroundRepeat: 'repeat',
                      backgroundSize: 'auto',
                      backgroundPosition: 'center'
                    }}
                  >
                    <p className="text-muted dark:text-muted-dark leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium text-copy dark:text-copy-dark bg-muted/20 dark:bg-muted-dark/20 backdrop-blur-sm rounded-full border border-muted/30 dark:border-muted-dark/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-muted/30 dark:hover:bg-muted-dark/30 hover:border-muted/40 dark:hover:border-muted-dark/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-copy dark:text-copy-dark mb-4">
            Other Noteworthy Projects
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col h-full"
            >
              <div 
                className="bg-surface dark:bg-surface-dark p-6 rounded-lg shadow-lg flex flex-col h-full space-y-4"
                style={{
                  backgroundImage: `url(${noise})`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: 'auto',
                  backgroundPosition: 'center'
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="card-title text-white transition-colors duration-300 group-hover:text-[#A1A79E]">
                      {project.title}
                    </h4>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-primary transition-colors duration-200"
                    >
                      <FiGithub size={18} />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-primary transition-colors duration-200"
                    >
                      <FiExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <p className="card-desc flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium text-copy dark:text-copy-dark bg-muted/20 dark:bg-muted-dark/20 backdrop-blur-sm rounded-full border border-muted/30 dark:border-muted-dark/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-muted/30 dark:hover:bg-muted-dark/30 hover:border-muted/40 dark:hover:border-muted-dark/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Projects; 