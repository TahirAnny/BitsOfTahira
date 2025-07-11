import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoStatsChart, IoServer, IoTime, IoCheckmarkCircle, IoWarning } from 'react-icons/io5';

const ChatbotDashboard = ({ isVisible, onClose }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVisible) {
      fetchAnalytics();
    }
  }, [isVisible]);

  const fetchAnalytics = async () => {
    try {
      console.log('🔍 Fetching analytics from:', 'http://localhost:5000/api/analytics');
      const response = await fetch('http://localhost:5000/api/analytics');
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📊 Analytics data:', data);
      
      if (data.success) {
        setAnalytics(data.data);
      } else {
        console.error('Analytics API returned error:', data.message);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
            <IoStatsChart className="mr-2" />
            System Analytics
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          </div>
        ) : analytics ? (
          <div className="space-y-4">
            {/* System Status */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <IoCheckmarkCircle className="text-green-500 mr-2" />
                <span className="text-green-700 dark:text-green-300 font-medium">System Online</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Requests</span>
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">
                    {analytics.totalRequests}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Uptime</span>
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">
                    {analytics.uptime}
                  </span>
                </div>
              </div>
            </div>

            {/* Response Sources */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Response Sources</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">ChatGPT API</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {analytics.chatgptResponses} ({analytics.chatgptPercentage}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Demo Mode</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {analytics.mockResponses} ({analytics.mockPercentage}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Performance</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {Math.round(analytics.averageResponseTime)}ms
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Errors</span>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {analytics.errors}
                  </span>
                </div>
              </div>
            </div>

            {/* Technical Info */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Technical Details</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <IoServer className="mr-2" />
                  <span>Backend: Node.js + Express</span>
                </div>
                <div className="flex items-center">
                  <IoTime className="mr-2" />
                  <span>API: OpenAI GPT-3.5-turbo</span>
                </div>
                <div className="flex items-center">
                  <IoCheckmarkCircle className="mr-2" />
                  <span>Fallback: Mock Response System</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <IoWarning className="text-yellow-500 mx-auto mb-2" size={24} />
            <p className="text-gray-600 dark:text-gray-400">Unable to load analytics</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ChatbotDashboard; 