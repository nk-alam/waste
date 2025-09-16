import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaChevronDown,
  FaChevronUp,
  FaRecycle,
  FaTruck,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaAward,
  FaPhone,
  FaEnvelope,
  FaWhatsapp
} from 'react-icons/fa';
import { BsQuestionCircle, BsInfoCircle } from 'react-icons/bs';
import { MdHelpOutline } from 'react-icons/md';

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
  helpful?: boolean;
}

const FAQPage: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const faqData: FAQItem[] = [
    // General
    {
      id: 1,
      category: 'general',
      question: 'What is EcoWaste Management System?',
      answer: 'EcoWaste Management System is a comprehensive digital platform designed specifically for Indian cities to manage waste collection, processing, and recycling. It connects citizens, waste workers, supervisors, and administrators in an integrated ecosystem that promotes sustainable waste management practices.'
    },
    {
      id: 2,
      category: 'general',
      question: 'Which cities does EcoWaste serve?',
      answer: 'We currently serve over 50 cities across 15 Indian states including Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Ahmedabad, Kolkata, Surat, and many more. We are continuously expanding to new cities based on demand and infrastructure readiness.'
    },
    {
      id: 3,
      category: 'general',
      question: 'How does the platform support India\'s Smart Cities Mission?',
      answer: 'Our platform aligns perfectly with India\'s Smart Cities Mission by providing IoT-enabled waste management, real-time monitoring, data-driven decision making, citizen engagement tools, and comprehensive analytics that help cities achieve their sustainability and efficiency goals.'
    },

    // Citizens
    {
      id: 4,
      category: 'citizens',
      question: 'How can citizens register and start using the platform?',
      answer: 'Citizens can register through our mobile app or website by providing basic information including name, Aadhaar number, address, and phone number. After verification, they can access training modules, schedule waste pickups, track rewards, and participate in community programs.'
    },
    {
      id: 5,
      category: 'citizens',
      question: 'What training is provided for waste segregation?',
      answer: 'We offer comprehensive training modules covering: dry and wet waste separation, hazardous waste identification, composting basics, recycling best practices, and proper disposal methods. Training is available in multiple Indian languages with interactive videos and practical exercises.'
    },
    {
      id: 6,
      category: 'citizens',
      question: 'How does the reward system work?',
      answer: 'Citizens earn points for proper waste segregation, timely disposal, participating in community events, and completing training modules. Points can be redeemed for eco-friendly products, discounts on municipal services, or cash rewards. The system encourages consistent good practices.'
    },
    {
      id: 7,
      category: 'citizens',
      question: 'What happens if I don\'t segregate waste properly?',
      answer: 'Initially, we provide educational support and reminders. Repeated violations may result in warnings, penalty notices, or temporary suspension of collection services. We focus on education first, with penalties as a last resort to ensure compliance.'
    },

    // Technology
    {
      id: 8,
      category: 'technology',
      question: 'How does the route optimization work?',
      answer: 'Our AI-powered system analyzes factors like traffic patterns, waste generation data, vehicle capacity, driver schedules, and real-time conditions to create optimal collection routes. This reduces fuel consumption, collection time, and operational costs while improving service quality.'
    },
    {
      id: 9,
      category: 'technology',
      question: 'What IoT devices are used in the system?',
      answer: 'We use smart bins with fill-level sensors, GPS trackers on vehicles, weighing sensors for waste measurement, air quality monitors, and mobile devices for workers. All devices are designed for Indian conditions with robust connectivity and weather resistance.'
    },
    {
      id: 10,
      category: 'technology',
      question: 'How is data privacy and security ensured?',
      answer: 'We follow strict data protection protocols including encryption, secure servers, limited access controls, regular security audits, and compliance with Indian data protection laws. Personal information is never shared without consent and is used only for service improvement.'
    },
    {
      id: 11,
      category: 'technology',
      question: 'Can the system work offline?',
      answer: 'Yes, our mobile applications have offline capabilities for essential functions like data collection, basic reporting, and emergency communications. Data syncs automatically when connectivity is restored, ensuring uninterrupted operations.'
    },

    // Implementation
    {
      id: 12,
      category: 'implementation',
      question: 'How long does it take to implement the system in a new city?',
      answer: 'Implementation typically takes 3-6 months depending on city size and existing infrastructure. This includes assessment, system setup, staff training, pilot testing, gradual rollout, and full deployment. We ensure smooth transition with minimal disruption to existing services.'
    },
    {
      id: 13,
      category: 'implementation',
      question: 'What are the hardware requirements?',
      answer: 'Minimum requirements include smartphones/tablets for users, GPS-enabled vehicles, basic internet connectivity, and optional IoT sensors. We provide hardware recommendations and can supply devices as needed. The system is designed to work with existing infrastructure.'
    },
    {
      id: 14,
      category: 'implementation',
      question: 'How much training is required for staff?',
      answer: 'We provide comprehensive training programs: 2-3 days for administrators, 1-2 days for supervisors, and 1 day for field workers. Training includes hands-on sessions, documentation, ongoing support, and refresher courses. Training materials are available in local languages.'
    },

    // Support
    {
      id: 15,
      category: 'support',
      question: 'What support is available after implementation?',
      answer: 'We provide 24/7 technical support, regular system updates, performance monitoring, troubleshooting assistance, user training, and on-site support when needed. Our support team includes local representatives who understand regional requirements.'
    },
    {
      id: 16,
      category: 'support',
      question: 'How are system updates and maintenance handled?',
      answer: 'System updates are deployed automatically with minimal downtime. We schedule maintenance during low-usage periods and provide advance notifications. Critical updates are applied immediately, while feature updates are rolled out gradually after testing.'
    },
    {
      id: 17,
      category: 'support',
      question: 'What languages is the platform available in?',
      answer: 'The platform is available in Hindi, English, and major regional languages including Tamil, Telugu, Kannada, Marathi, Bengali, Gujarati, Punjabi, and others. Language support is customized based on the local population and requirements.'
    },

    // Costs
    {
      id: 18,
      category: 'costs',
      question: 'What is the pricing model?',
      answer: 'We offer flexible pricing based on city size, features required, and implementation scope. Options include subscription-based models, pay-per-use, and one-time licensing. We provide detailed cost-benefit analysis and ROI projections for each implementation.'
    },
    {
      id: 19,
      category: 'costs',
      question: 'Are there any hidden costs?',
      answer: 'No, we provide transparent pricing with all costs clearly outlined including software licensing, hardware (if required), training, implementation, and ongoing support. Any additional services are discussed and approved before implementation.'
    },
    {
      id: 20,
      category: 'costs',
      question: 'Is financing or payment plans available?',
      answer: 'Yes, we offer flexible payment options including installment plans, lease arrangements, and performance-based payments. We also assist with grant applications and funding opportunities available for smart city initiatives.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics', icon: BsQuestionCircle },
    { id: 'general', name: 'General Information', icon: BsInfoCircle },
    { id: 'citizens', name: 'For Citizens', icon: FaUsers },
    { id: 'technology', name: 'Technology', icon: FaRecycle },
    { id: 'implementation', name: 'Implementation', icon: FaTruck },
    { id: 'support', name: 'Support', icon: FaShieldAlt },
    { id: 'costs', name: 'Pricing & Costs', icon: FaChartLine }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              variants={fadeIn}
            >
              Frequently Asked
              <span className="text-green-600"> Questions</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              Find answers to common questions about our waste management platform, 
              implementation process, and how it can benefit your community.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col lg:flex-row gap-8 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Search Bar */}
            <motion.div className="flex-1 max-w-2xl" variants={fadeIn}>
              <div className="relative">
                <MdHelpOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </motion.div>

            {/* Category Filter */}
            <motion.div className="flex flex-wrap gap-2" variants={fadeIn}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="space-y-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {filteredFAQs.length === 0 ? (
              <motion.div 
                className="text-center py-12"
                variants={fadeIn}
              >
                <MdHelpOutline className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or select a different category.
                </p>
              </motion.div>
            ) : (
              filteredFAQs.map((faq) => (
                <motion.div
                  key={faq.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  variants={fadeIn}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {expandedFAQ === faq.id ? (
                      <FaChevronUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <FaChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                        
                        {/* Helpful Section */}
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-sm text-gray-600">Was this helpful?</span>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                              Yes
                            </button>
                            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: FaUsers, number: "50K+", label: "Happy Users" },
              { icon: FaTruck, number: "1000+", label: "Collection Routes" },
              { icon: FaRecycle, number: "85%", label: "Waste Recycled" },
              { icon: FaAward, number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center bg-white p-6 rounded-xl shadow-lg"
                variants={fadeIn}
              >
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our support team is here to help. Contact us through any of these channels 
              for personalized assistance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <FaPhone className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 text-sm mb-3">Available 24/7 for urgent issues</p>
                <p className="text-green-600 font-medium">+91 98765 43210</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <FaEnvelope className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-3">Response within 24 hours</p>
                <p className="text-blue-600 font-medium">support@ecowaste.in</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <FaWhatsapp className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">WhatsApp Chat</h3>
                <p className="text-gray-600 text-sm mb-3">Quick responses for queries</p>
                <p className="text-green-600 font-medium">+91 98765 43211</p>
              </div>
            </div>
            
            <div className="mt-8">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
                Contact Support Team
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;