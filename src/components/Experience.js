import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';

const experienceData = [
  {
    id: 'mojitofilms-fullstack',
    company: 'Mojitofilms - AI-powered movie buddy (German Based Company)',
    shortName: 'Mojitofilms',
    position: 'Full-Stack Software Engineer',
    location: 'Remote',
    duration: 'July 2025 - Present',
    description: [
      'Engineered responsive mobile and web interfaces with Ionic React and Capacitor, delivering seamless, cross-platform user experiences that boosted engagement.',
      'Implemented scalable backend features using Node.js and Next.js API routes, enhancing application performance and reliability.',
      'Designed and optimized data models leveraging PostgreSQL (RDS) and MongoDB, ensuring efficient, secure, and scalable data storage solutions.',
      'Established robust authentication protocols, enabled multi-language support through internationalization, and integrated key third-party APIs to extend functionality and security.',
      'Authored and maintained comprehensive technical documentation covering components, Redux state management, custom hooks, utilities, and deployment workflows, improving team collaboration and onboarding efficiency.'
    ]
  },
  {
    id: 'freelance-fullstack',
    company: 'Freelance (Remote)',
    shortName: 'Freelance',
    position: 'Full-Stack Software Engineer',
    location: 'Remote',
    duration: 'December 2024 - June 2025',
    description: [
      'Integrated Stripe payment gateway into a .NET Core application, enabling secure and scalable payment processing aligned with SaaS platform requirements.',
      'Optimized CI/CD pipelines using modern tools (e.g., GitHub Actions, Azure DevOps), reducing deployment time by 20% and improving system uptime to 99.9%, supporting rapid iteration and agile delivery.',
      'Architected and deployed cloud-native infrastructure on AWS (EC2, RDS, S3), improving application fault tolerance, scalability, and performance in a microservices environment.'
    ]
  },
  {
    id: 'datasoft-fullstack',
    company: 'DataSoft Systems',
    shortName: 'DataSoft',
    position: 'Software Engineer – Full Stack Development, Anti-Money Laundering Division',
    location: 'Dhaka, BD',
    duration: 'March 2018 – April 2023',
    description: [
      'Designed, developed and maintained large enterprise-grade web software applications and systems for the Anti-Money laundering division, ensuring compliances with industry regulations and effectively processing millions of transactions.',
      'Automated internal service workflows and real-time notification systems, optimizing operational efficiency and reducing load time by 20% through code modularization and query optimization.',
      'Troubleshooting incidents and technical support that occurred during both development and production phases, resolved problems in real-time to maintain application scalability and performance by using analytical and problem-solving skills.',
      'Led cross-functional team collaboration, played a pivotal role in schema definition, system design, and client/user requirements meeting, while effectively communicating technical concepts to non-technical stakeholders through detailed illustrations and presentations.',
      'Participated in code reviews to ensure the quality and integrity of the codebase, provided constructive feedback.',
      'Integrated third-party tools and services, including the implementation of Active Directory Domain Services.',
      'Led the deployment of applications using CI/CD pipelines using DevOps, ensuring continuous integration and smooth release management for critical features.',
      'Created and maintained technical documentation including Low Level Design (LLD), High Level Design (HLD) documentation, architecture diagrams and API integration specifications.',
      'Adopted Agile/Scrum methodologies and actively participated in sprint planning, daily stand-ups and sprint reviews to foster continuous improvement and team collaboration, while also demonstrating the ability to work independently.'
    ]
  },
  {
    id: 'datasoft-iot',
    company: 'DataSoft Systems',
    shortName: 'DataSoft (IoT)',
    position: 'IoT (Internet of Things) Trainee',
    location: 'Dhaka, BD',
    duration: 'September 2017 – February 2018',
    description: [
      'Pioneered IoT initiatives to drive technological advancements, specialized in the design, development and real-time data processing techniques, optimized IoT system performance.',
      'Designed and developed user interfaces and dashboards for monitoring and controlling IoT devices and data.',
      'Conducted extensive research to stay abreast of emerging IoT technologies, trends, and best practices.',
      'Documented project progress, coding practices, and technical specifications for future reference and knowledge sharing.'
    ]
  }
];

const Experience = forwardRef((props, ref) => {
  const [activeTab, setActiveTab] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const hiddenRefs = useRef([]);

  // Measure tallest description on mount
  useEffect(() => {
    if (hiddenRefs.current.length) {
      const heights = hiddenRefs.current.map(el => el?.offsetHeight || 0);
      const tallest = Math.max(...heights);
      setMaxHeight(tallest);
    }
  }, []);

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveTab(index);
    }
  };

  return (
    <section ref={ref} id="experience" className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-copy dark:text-copy-dark mb-1 flex items-center">
            <span className="text-accent font-mono text-2xl mr-3">03.</span>
            Where I've Worked
          </h2>
          <div className="w-48 h-px bg-gray-600 mt-2"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-10">

          {/* Company Tabs */}
          <div className="relative flex md:flex-col overflow-x-auto md:overflow-visible">
            <div className="flex md:flex-col border-b-2 md:border-b-0 md:border-l-2 border-gray-700">
              {experienceData.map((job, index) => (
                <button
                  key={job.id}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`relative text-left px-5 py-3 w-full min-w-[150px] md:min-w-[120px] transition-colors duration-300 focus:outline-none focus:bg-accent/10 ${
                    activeTab === index
                      ? 'text-accent'
                      : 'text-copy/70 dark:text-copy-dark/60 hover:text-accent hover:bg-accent/10'
                  }`}
                  role="tab"
                  aria-selected={activeTab === index}
                  aria-controls={`panel-${index}`}
                  tabIndex={0}
                >
                  {job.shortName}
                </button>
              ))}

              {/* Active Tab Highlighter */}
              <motion.div
                className="absolute left-0 bottom-0 md:bottom-auto md:top-0 h-0.5 md:h-full md:w-0.5 bg-accent"
                initial={false}
                animate={{
                  y: activeTab * 52,
                  height: 52,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </div>
          </div>

          {/* Job Details Panel */}
          <div className="flex-grow" style={{ minHeight: maxHeight }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                role="tabpanel"
                id={`panel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
              >
                <div className="space-y-4">
                  {/* Job Header */}
                  <div className="min-h-[90px]">
                    <h3 className="text-xl font-semibold text-copy dark:text-copy-dark">
                      {experienceData[activeTab].position}
                      <span className="text-accent ml-2">@ {experienceData[activeTab].company}</span>
                    </h3>
                    <p className="font-mono text-sm mt-1 text-copy/70 dark:text-copy-dark/60">
                      {experienceData[activeTab].duration}
                    </p>
                  </div>

                  {/* Job Description */}
                  <ul className="space-y-2.5">
                    {experienceData[activeTab].description.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                        className="flex items-start gap-3 text-copy dark:text-copy-dark/90 leading-relaxed"
                      >
                        <span className="text-accent mt-1 flex-shrink-0">
                          <FiPlay className="w-3 h-3" />
                        </span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Hidden elements for height calculation */}
            <div className="absolute opacity-0 pointer-events-none -z-50">
              {experienceData.map((job, idx) => (
                <div
                  key={job.id}
                  ref={(el) => (hiddenRefs.current[idx] = el)}
                  className="w-full"
                >
                  <div className="space-y-4">
                    <div className="min-h-[90px]">
                      <h3 className="text-xl font-semibold">{job.position}</h3>
                      <p className="font-mono text-sm mt-1">{job.duration}</p>
                    </div>
                    <ul className="space-y-2.5">
                      {job.description.map((item, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="w-3 h-3" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';

export default Experience;