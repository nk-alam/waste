import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaChartLine,
  FaRecycle,
  FaUsers,
  FaAward,
  FaTruck,
  FaMapMarkerAlt,
  FaCamera,
  FaGift,
  FaShoppingCart,
  FaExclamationTriangle,
  FaLeaf,
  FaHandshake,
  FaGraduationCap,
  FaShieldAlt,
  FaCog,
  FaPlayCircle,
  FaArrowRight,
  FaCheckCircle,
  FaFileAlt,
  FaEye
} from 'react-icons/fa';
import { BsGraphUp, BsShieldCheck } from 'react-icons/bs';
import { MdFactory, MdLocationOn, MdPhone } from 'react-icons/md';
import SIHPresentation from '../SIHPresentation';

const SIHSolutionPage: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);

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

  const problemStats = [
    { number: "170,339", label: "Tonnes Generated Daily", icon: FaRecycle, color: "red" },
    { number: "156,449", label: "Tonnes Collected Daily", icon: FaTruck, color: "orange" },
    { number: "91,511", label: "Tonnes Treated Daily", icon: MdFactory, color: "blue" },
    { number: "37,373", label: "Tonnes Gap Daily", icon: FaExclamationTriangle, color: "red" }
  ];

  const solutions = [
    {
      id: 1,
      title: "Mandatory Citizen Training",
      description: "Comprehensive waste management training for every citizen with certification",
      features: ["Physical training on waste types", "3-bin distribution system", "Compost kit distribution", "App-based monitoring"],
      icon: FaGraduationCap,
      api: "/api/citizens/training",
      color: "green"
    },
    {
      id: 2,
      title: "Waste Worker Training",
      description: "Phase-wise safety training and gear distribution for all waste workers",
      features: ["Safety protocol training", "Equipment provision", "Performance tracking", "Certification system"],
      icon: FaShieldAlt,
      api: "/api/workers/training",
      color: "blue"
    },
    {
      id: 3,
      title: "Green Champions Network",
      description: "Decentralized monitoring system with trained area champions",
      features: ["Area-wise monitoring", "Real-time reporting", "Community leadership", "Performance incentives"],
      icon: FaAward,
      api: "/api/green-champions",
      color: "purple"
    },
    {
      id: 4,
      title: "Incentive System",
      description: "Points-based rewards for proper waste segregation and participation",
      features: ["Point accumulation", "Reward redemption", "Leaderboards", "Achievement badges"],
      icon: FaGift,
      api: "/api/incentives",
      color: "yellow"
    },
    {
      id: 5,
      title: "Photo Reporting System",
      description: "If you see waste, send photo - Community-driven violation reporting",
      features: ["Geo-tagged photos", "Real-time alerts", "Quick response", "Community engagement"],
      icon: FaCamera,
      api: "/api/monitoring/photo-reports",
      color: "orange"
    },
    {
      id: 6,
      title: "Community Participation",
      description: "Mandatory cleaning drives and community engagement programs",
      features: ["Scheduled cleaning", "Group activities", "Volunteer management", "Impact tracking"],
      icon: FaHandshake,
      api: "/api/community",
      color: "teal"
    },
    {
      id: 7,
      title: "Penalization System",
      description: "Smart fines and service suspension for non-compliance",
      features: ["Automated detection", "Graduated penalties", "Appeal system", "Compliance tracking"],
      icon: FaExclamationTriangle,
      api: "/api/incentives/penalties",
      color: "red"
    },
    {
      id: 8,
      title: "Smart Facilities Management",
      description: "Comprehensive waste treatment facilities in every ULB",
      features: ["Bio-methanization plants", "Waste-to-Energy", "Recycling centers", "Digital monitoring"],
      icon: MdFactory,
      api: "/api/facilities",
      color: "indigo"
    },
    {
      id: 9,
      title: "Digital Marketplace",
      description: "Complete app-based system for training, shopping, and tracking",
      features: ["Training modules", "Utility shopping", "Vehicle tracking", "Facility locator"],
      icon: FaShoppingCart,
      api: "/api/shop",
      color: "pink"
    }
  ];

  const features = [
    {
      title: "Real-time Bin Tracking",
      description: "IoT-enabled smart bins with live monitoring",
      icon: FaMapMarkerAlt,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400"
    },
    {
      title: "Vehicle Route Optimization",
      description: "AI-powered route planning for maximum efficiency",
      icon: FaTruck,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive insights and performance metrics",
      icon: FaChartLine,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400"
    },
    {
      title: "Community Engagement",
      description: "Social features to engage citizens in waste management",
      icon: FaUsers,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400"
    }
  ];

  const achievements = [
    { metric: "54%", label: "Current Treatment Rate", target: "90%", targetLabel: "Our Target" },
    { metric: "91%", label: "Current Collection Rate", target: "99%", targetLabel: "Our Target" },
    { metric: "37,373", label: "Daily Waste Gap (TPD)", target: "0", targetLabel: "Zero Waste Goal" },
    { metric: "249", label: "Waste-to-Energy Plants", target: "500+", targetLabel: "Expansion Plan" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6" variants={fadeIn}>
              <FaAward className="h-4 w-4 mr-2" />
              Smart India Hackathon 2025 Solution
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              variants={fadeIn}
            >
              Solving India's
              <span className="text-green-600"> Waste Crisis</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto"
              variants={fadeIn}
            >
              A comprehensive digital solution addressing the 37,373 tonnes daily waste management gap 
              through mandatory training, smart monitoring, and community engagement.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
              variants={fadeIn}
            >
              <button 
                onClick={() => setShowDemo(true)}
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center"
              >
                <FaPlayCircle className="mr-2" /> View Demo
              </button>
              <button 
                onClick={() => setShowPresentation(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
              >
                <FaFileAlt className="mr-2" /> PPT Presentation
              </button>
              <a 
                href="#solutions" 
                className="border border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center"
              >
                Explore Solutions <FaArrowRight className="ml-2" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Waste Management Crisis</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              India faces a massive waste management challenge with significant gaps in collection, treatment, and disposal.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {problemStats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center bg-gray-50 p-6 rounded-xl"
                variants={fadeIn}
              >
                <div className={`bg-${stat.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <FaExclamationTriangle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-4">Critical Issues</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-red-800">
                  <div>• Only 54% of waste is properly treated</div>
                  <div>• 37,373 TPD remains unmanaged daily</div>
                  <div>• Lack of citizen training and awareness</div>
                  <div>• Insufficient monitoring systems</div>
                  <div>• Poor waste segregation at source</div>
                  <div>• Limited community participation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solutions */}
      <section id="solutions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Comprehensive Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              9 integrated solutions addressing every aspect of waste management from citizen training to facility operations
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {solutions.map((solution) => (
              <motion.div 
                key={solution.id}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group"
                variants={fadeIn}
              >
                <div className={`bg-${solution.color}-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <solution.icon className={`h-8 w-8 text-${solution.color}-600`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                
                <div className="space-y-2 mb-6">
                  {solution.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <FaCheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">API Endpoint:</p>
                  <code className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-800">{solution.api}</code>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Smart Technology Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technology powering our waste management ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-8"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <feature.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-32 h-32 object-cover rounded-xl shadow-lg"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Targets */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Expected Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our solution aims to transform India's waste management landscape with measurable improvements
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
                variants={fadeIn}
              >
                <div className="mb-4">
                  <div className="text-2xl font-bold text-red-600 mb-1">{achievement.metric}</div>
                  <div className="text-sm text-gray-600">{achievement.label}</div>
                </div>
                <div className="border-t pt-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">{achievement.target}</div>
                  <div className="text-sm text-gray-600">{achievement.targetLabel}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Waste Management?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join us in building a cleaner, more sustainable India through smart technology and community engagement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/register" 
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center"
              >
                Get Started Today <FaArrowRight className="ml-2" />
              </a>
              <a 
                href="/contact" 
                className="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors inline-flex items-center justify-center"
              >
                Contact Our Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">System Demo</h3>
              <button 
                onClick={() => setShowDemo(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="aspect-video bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
              <div className="text-center">
                <FaPlayCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive Demo Video</p>
                <p className="text-sm text-gray-500">Showcasing all 9 solution components</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Demo Highlights</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><FaCheckCircle className="h-4 w-4 text-green-500 mr-2" />Real-time bin monitoring</li>
                  <li className="flex items-center"><FaCheckCircle className="h-4 w-4 text-green-500 mr-2" />Vehicle route optimization</li>
                  <li className="flex items-center"><FaCheckCircle className="h-4 w-4 text-green-500 mr-2" />Citizen training modules</li>
                  <li className="flex items-center"><FaCheckCircle className="h-4 w-4 text-green-500 mr-2" />Green champion dashboard</li>
                  <li className="flex items-center"><FaCheckCircle className="h-4 w-4 text-green-500 mr-2" />Incentive system</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Quick Access</h4>
                <div className="space-y-2">
                  <a href="/admin" className="block bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700 transition-colors">
                    Admin Dashboard
                  </a>
                  <a href="/login" className="block bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-700 transition-colors">
                    User Portal
                  </a>
                  <a href="/API_DOCUMENTATION.md" className="block bg-gray-600 text-white px-4 py-2 rounded text-center hover:bg-gray-700 transition-colors">
                    API Documentation
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* PPT Presentation Modal */}
      {showPresentation && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">SIH 2025 Presentation - EcoWaste India Solution</h3>
              <button 
                onClick={() => setShowPresentation(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-0">
              <SIHPresentation />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SIHSolutionPage;