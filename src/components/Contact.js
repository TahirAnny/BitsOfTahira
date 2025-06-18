import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiStackoverflow } from 'react-icons/si';
import { personalInfo } from '../config/personalInfo';

const Contact = () => {
  const { email, socialLinks } = personalInfo;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail size={24} />,
      title: personalInfo.contact.contactInfo[0].title,
      value: personalInfo.contact.contactInfo[0].value,
      link: personalInfo.contact.contactInfo[0].link
    },
    {
      icon: <FiPhone size={24} />,
      title: personalInfo.contact.contactInfo[1].title,
      value: personalInfo.contact.contactInfo[1].value,
      link: personalInfo.contact.contactInfo[1].link
    },
    {
      icon: <FiMapPin size={24} />,
      title: personalInfo.contact.contactInfo[2].title,
      value: personalInfo.contact.contactInfo[2].value,
      link: personalInfo.contact.contactInfo[2].link
    }
  ];

  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-copy dark:text-copy-dark mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-muted dark:text-muted-dark max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or 
            just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-copy dark:text-copy-dark mb-6">
                Let's talk about everything!
              </h3>
              <p className="text-muted dark:text-muted-dark leading-relaxed mb-8">
                Don't like forms? Send me an email directly at{' '}
                <a 
                  href={`mailto:${email}`} 
                  className="text-accent hover:underline"
                >
                  {email}
                </a>
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <div className="text-accent">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-copy dark:text-copy-dark">
                      {info.title}
                    </h4>
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-muted dark:text-muted-dark hover:text-accent dark:hover:text-accent transition-colors duration-200"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted dark:text-muted-dark">
                        {info.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <h4 className="font-medium text-copy dark:text-copy-dark mb-4">
                Follow me on social media
              </h4>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={socialLinks.github} target="_blank" rel="noopener noreferrer"
                  className="p-3 bg-surface dark:bg-surface-dark rounded-lg text-muted dark:text-muted-dark hover:text-accent dark:hover:text-accent hover:bg-bg dark:hover:bg-bg-dark transition-all duration-200"
                >
                  <FiGithub size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="p-3 bg-surface dark:bg-surface-dark rounded-lg text-muted dark:text-muted-dark hover:text-accent dark:hover:text-accent hover:bg-bg dark:hover:bg-bg-dark transition-all duration-200"
                >
                  <FiLinkedin size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={socialLinks.stackoverflow} target="_blank" rel="noopener noreferrer"
                  className="p-3 bg-surface dark:bg-surface-dark rounded-lg text-muted dark:text-muted-dark hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200"
                >
                  <SiStackoverflow size={20} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted dark:text-muted-dark mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-muted/30 dark:border-muted-dark/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-surface dark:bg-surface-dark text-copy dark:text-copy-dark transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted dark:text-muted-dark mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-muted/30 dark:border-muted-dark/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-surface dark:bg-surface-dark text-copy dark:text-copy-dark transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-muted dark:text-muted-dark mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-muted/30 dark:border-muted-dark/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-surface dark:bg-surface-dark text-copy dark:text-copy-dark transition-colors duration-200"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted dark:text-muted-dark mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-muted/30 dark:border-muted-dark/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-surface dark:bg-surface-dark text-copy dark:text-copy-dark transition-colors duration-200 resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    submitStatus === 'success' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                      : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                  }`}
                >
                  {submitStatus === 'success' 
                    ? 'Thank you! Your message has been sent successfully.' 
                    : 'Sorry, there was an error sending your message. Please try again.'
                  }
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 