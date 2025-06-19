import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TagCloud } from 'react-tagcloud';
import { 
  FiCode, 
  FiDatabase, 
  FiSmartphone, 
  FiServer, 
  FiLayers,
  FiZap,
  FiGrid,
  FiGlobe,
  FiCpu,
  FiCloud,
  FiGitBranch,
  FiCheckCircle,
  FiUsers
} from 'react-icons/fi';
import SkillTree from './SkillTree';
import { personalInfo } from '../config/personalInfo';
import TagCanvasCloud from './TagCanvasCloud';
import noise from '../assets/noise.png';

const Skills = () => {
  const [viewMode, setViewMode] = useState('tree'); // 'tree', 'list', or 'cloud'

  // Map category titles to icons
  const getCategoryIcon = (title) => {
    const iconMap = {
      "Languages & Markup": <FiCode size={24} />,
      "Front-End Frameworks & UI": <FiGlobe size={24} />,
      "Back-End & .NET Ecosystem": <FiServer size={24} />,
      "API Design & Integration": <FiCpu size={24} />,
      "Databases & Persistence": <FiDatabase size={24} />,
      "Cloud, DevOps & Infrastructure": <FiCloud size={24} />,
      "Architecture & Design Patterns": <FiLayers size={24} />,
      "Testing & Quality Assurance": <FiCheckCircle size={24} />,
      "Methodologies & Project Management": <FiUsers size={24} />,
      "Version Control & Collaboration": <FiGitBranch size={24} />
    };
    return iconMap[title] || <FiCode size={24} />;
  };

  // Use skills from personalInfo
  const skillCategories = personalInfo.skills.categories.map(category => ({
    title: category.title,
    icon: getCategoryIcon(category.title),
    skills: category.skills
  }));

  // Prepare data for TagCanvasCloud
  const tagCloudData = personalInfo.skills.categories.flatMap(category =>
    category.skills.map(skill => ({
      text: skill.name,
      color: skill.level >= 90 ? '#00ffff' : skill.level >= 80 ? '#20e3b2' : skill.level >= 70 ? '#00d4aa' : skill.level >= 60 ? '#00b894' : '#00a085',
      fontSize: Math.max(18, Math.min(skill.level, 36)),
    }))
  );

  const getLevelColor = (level) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    if (level >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          
          {/* View Mode Toggle */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            {/* <button
              onClick={() => setViewMode('tree')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                viewMode === 'tree'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <FiGrid size={18} />
              <span>Interactive Tree</span>
            </button> */}
            {/* 
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
           
              <FiList size={18} />
              <span>List View</span>
            </button>
             
            <button
              onClick={() => setViewMode('cloud')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                viewMode === 'cloud'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <FiZap size={18} />
              <span>Tag Cloud</span>
            </button>

            */}
          </div>
        </motion.div>

        {/* Interactive Skill Tree View */}
        {viewMode === 'tree' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Interactive Skill Tree
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore my skills through an interactive force-directed visualization. 
                </p>
              </div>
              <div 
                className="relative h-[700px] border-gray-200 dark:border-gray-700"
                style={{
                  backgroundImage: `url(${noise})`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: 'auto',
                  backgroundPosition: 'center'
                }}
              >
                <SkillTree />
              </div>
            </div>
          </motion.div>
        )}

        {/* Tag Cloud View */}
        {viewMode === 'cloud' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="bg-gray-900 dark:bg-black rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">
                  Skills Tag Cloud
                </h3>
                <p className="text-gray-400">
                  A visual representation of my technical skills.
                </p>
              </div>
              <div className="p-8 flex items-center justify-center">
                <TagCanvasCloud tags={tagCloudData} width={500} height={500} />
              </div>
            </div>
          </motion.div>
        )}


        {/* Traditional List View */}
       {viewMode === 'list' && (
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}
         className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
       >
         {skillCategories.map((category, categoryIndex) => (
           <motion.div
             key={category.title}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
             viewport={{ once: true }}
             className="card"
           >
             <div className="space-y-6">
               {/* Category Header */}
               <div className="flex items-center space-x-3">
                 <div className="text-primary-600 dark:text-primary-400">
                   {category.icon}
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                   {category.title}
                 </h3>
               </div>
               {/* Skills List */}
               <div className="space-y-4">
                 {category.skills.map((skill, skillIndex) => (
                   <div key={skill.name} className="space-y-2">
                     <div className="flex justify-between items-center">
                       <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                         {skill.name}
                       </span>
                       <span className="text-xs text-gray-500 dark:text-gray-400">
                         {skill.level}%
                       </span>
                     </div>
                     <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                       <motion.div
                         initial={{ width: 0 }}
                         whileInView={{ width: `${skill.level}%` }}
                         transition={{ duration: 1, delay: skillIndex * 0.1 }}
                         viewport={{ once: true }}
                         className={`h-2 rounded-full ${getLevelColor(skill.level)}`}
                       ></motion.div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
            </motion.div>
           ))}
         </motion.div>
       )}

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center flex justify-center"
        >
          <div 
            className="bg-surface dark:bg-surface-dark p-6 rounded-lg shadow-lg flex flex-col h-full space-y-4 min-h-[260px]"
            style={{
              backgroundImage: `url(${noise})`,
              backgroundRepeat: 'repeat',
              backgroundSize: 'auto',
              backgroundPosition: 'center'
            }}
          >
            <div className="flex justify-between items-start">
              <h4 className="card-title text-white transition-colors duration-300 group-hover:text-[#A1A79E] text-2xl font-bold mb-2 text-center w-full">
                Always Learning
              </h4>
            </div>
            <p className="card-desc flex-grow text-muted dark:text-muted-dark leading-relaxed mb-2">
              I'm constantly expanding my skill set and staying up-to-date with the latest 
              technologies and best practices in software development. Currently, I'm exploring 
              new areas and deepening my expertise in emerging technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-auto">
              {personalInfo.skills.additionalSkills.slice(0, 8).map((tech) => (
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
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default Skills;