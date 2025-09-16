import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronLeft,
  FaChevronRight,
  FaRecycle,
  FaUsers,
  FaChartLine,
  FaMapMarkerAlt,
  FaMobile,
  FaLeaf,
  FaAward,
  FaCog,
  FaGraduationCap,
  FaShieldAlt,
  FaHandshake,
  FaMoneyBillWave,
  FaCamera,
  FaBroom,
  FaDollarSign,
  FaIndustry,
  FaGlobe,
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaBrain,
  FaRobot,
  FaNetworkWired,
  FaEye,
  FaLightbulb,
  FaRocket,
  FaSatelliteDish,
  FaMicrochip,
  FaDatabase,
  FaCloud,
  FaExclamationTriangle,
  FaTruck
} from 'react-icons/fa';
import { BsGraphUp, BsShieldCheck, BsCpu, BsGear } from 'react-icons/bs';
import { MdAutoAwesome, MdPsychology, MdSmartToy, MdFactory } from 'react-icons/md';

interface Slide {
  id: number;
  title: string;
  content: React.ReactNode;
  bgColor?: string;
}

const SIHPresentation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides: Slide[] = [
    {
      id: 1,
      title: "AI-Powered Smart Waste Management",
      bgColor: "bg-gradient-to-br from-purple-600 via-blue-600 to-green-600",
      content: (
        <div className="text-center text-white relative">
          <motion.div 
            className="absolute inset-0 opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <FaNetworkWired className="text-9xl mx-auto" />
          </motion.div>
          <div className="relative z-10">
            <motion.div 
              className="flex items-center justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <FaBrain className="text-6xl mr-4 text-purple-300" />
              <FaRecycle className="text-8xl animate-pulse" />
              <MdSmartToy className="text-6xl ml-4 text-blue-300" />
            </motion.div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              EcoWaste India
            </h1>
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-6 mb-6">
              <h2 className="text-3xl mb-4 text-yellow-300">AI-Driven Waste Revolution</h2>
              <p className="text-xl mb-4">Smart India Hackathon 2025</p>
              <div className="flex items-center justify-center text-lg">
                <FaRocket className="mr-2 text-orange-400" />
                <span className="font-semibold">Team QBrain</span>
                <span className="mx-3 text-gray-300">|</span>
                <FaGlobe className="mr-2 text-blue-400" />
                <a href="https://qbrain.in" className="hover:text-yellow-300 transition-colors">qbrain.in</a>
              </div>
            </div>
            <motion.div 
              className="grid grid-cols-3 gap-4 text-sm"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <MdAutoAwesome className="text-2xl mx-auto mb-1" />
                <div>AI Analytics</div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <FaSatelliteDish className="text-2xl mx-auto mb-1" />
                <div>IoT Integration</div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <FaRobot className="text-2xl mx-auto mb-1" />
                <div>Smart Automation</div>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "The AI-Solvable Crisis",
      bgColor: "bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500",
      content: (
        <div className="text-white">
          <motion.div 
            className="text-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <FaExclamationTriangle className="text-6xl mx-auto mb-4 animate-bounce" />
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              India's Waste Crisis
            </h2>
            <p className="text-xl">Where AI Meets Environmental Challenge</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              className="bg-black bg-opacity-40 backdrop-blur-sm p-6 rounded-xl"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <FaDatabase className="text-3xl mr-3 text-blue-300" />
                <h3 className="text-2xl font-bold">Daily Data Points</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="flex items-center"><FaRecycle className="mr-2" />Generated</span>
                  <span className="text-2xl font-bold text-red-300">1,70,339 TPD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center"><FaTruck className="mr-2" />Collected</span>
                  <span className="text-2xl font-bold text-orange-300">1,56,449 TPD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center"><MdFactory className="mr-2" />Treated</span>
                  <span className="text-2xl font-bold text-yellow-300">91,511 TPD</span>
                </div>
                <div className="border-t border-gray-400 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center font-bold"><FaExclamationTriangle className="mr-2 text-red-400" />Critical Gap</span>
                    <span className="text-3xl font-bold text-red-400">37,373 TPD</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-black bg-opacity-40 backdrop-blur-sm p-6 rounded-xl"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <MdPsychology className="text-3xl mr-3 text-purple-300" />
                <h3 className="text-2xl font-bold">AI Solution Approach</h3>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-8xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  54%
                </motion.div>
                <p className="text-lg mb-4">Current Treatment Efficiency</p>
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-lg">
                  <FaRocket className="text-3xl mx-auto mb-2" />
                  <p className="font-bold">AI Target: 90%+ Efficiency</p>
                  <p className="text-sm">Through Smart Optimization</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center justify-center mb-4">
              <FaBrain className="text-3xl mr-3" />
              <h3 className="text-2xl font-bold">QBrain's AI-First Approach</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <FaEye className="text-2xl mx-auto mb-2" />
                <p className="text-sm">Computer Vision for Waste Detection</p>
              </div>
              <div>
                <FaNetworkWired className="text-2xl mx-auto mb-2" />
                <p className="text-sm">Neural Networks for Route Optimization</p>
              </div>
              <div>
                <MdAutoAwesome className="text-2xl mx-auto mb-2" />
                <p className="text-sm">Predictive Analytics for Demand</p>
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 3,
      title: "AI-Driven Solution Architecture",
      bgColor: "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600",
      content: (
        <div className="text-white">
          <motion.div 
            className="text-center mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex items-center justify-center mb-4">
              <FaBrain className="text-4xl mr-3 text-pink-300" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                9-Point AI Solution
              </h2>
              <MdSmartToy className="text-4xl ml-3 text-blue-300" />
            </div>
            <p className="text-xl text-gray-200">Intelligent Waste Management Ecosystem by QBrain</p>
          </motion.div>
          
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: FaGraduationCap, title: "AI Training", desc: "Smart Learning Modules", color: "bg-gradient-to-br from-green-500 to-emerald-600" },
              { icon: FaUsers, title: "ML Worker Training", desc: "Adaptive Skill Development", color: "bg-gradient-to-br from-blue-500 to-cyan-600" },
              { icon: FaShieldAlt, title: "Neural Monitoring", desc: "AI-Powered Supervision", color: "bg-gradient-to-br from-purple-500 to-violet-600" },
              { icon: FaMoneyBillWave, title: "Smart Rewards", desc: "Blockchain Incentives", color: "bg-gradient-to-br from-yellow-500 to-orange-600" },
              { icon: FaCamera, title: "Computer Vision", desc: "Automated Detection", color: "bg-gradient-to-br from-orange-500 to-red-600" },
              { icon: FaHandshake, title: "AI Community", desc: "Social Intelligence", color: "bg-gradient-to-br from-teal-500 to-green-600" },
              { icon: FaDollarSign, title: "Smart Penalties", desc: "Predictive Enforcement", color: "bg-gradient-to-br from-red-500 to-pink-600" },
              { icon: FaIndustry, title: "IoT Facilities", desc: "Connected Infrastructure", color: "bg-gradient-to-br from-indigo-500 to-blue-600" },
              { icon: FaMobile, title: "AI Platform", desc: "Intelligent Ecosystem", color: "bg-gradient-to-br from-pink-500 to-purple-600" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`${item.color} p-4 rounded-xl text-center backdrop-blur-sm relative overflow-hidden`}
                initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white opacity-10"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
                <item.icon className="text-3xl mx-auto mb-2" />
                <h4 className="font-bold mb-1 text-sm">{item.title}</h4>
                <p className="text-xs opacity-90">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-6 bg-black bg-opacity-40 backdrop-blur-sm p-4 rounded-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center justify-center">
              <FaRocket className="text-2xl mr-3 text-yellow-300" />
              <span className="text-lg font-bold">Powered by QBrain's AI Innovation</span>
              <FaBrain className="text-2xl ml-3 text-purple-300 animate-pulse" />
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 4,
      title: "Mandatory Citizen Training",
      bgColor: "bg-gradient-to-br from-green-500 to-teal-500",
      content: (
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-6 text-center">Solution 1: Universal Training</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4">Physical Training</h3>
                <ul className="text-lg space-y-2">
                  <li>• Types of waste identification</li>
                  <li>• Source segregation techniques</li>
                  <li>• Home composting methods</li>
                  <li>• Plastic reuse strategies</li>
                </ul>
              </div>
              <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4">Distribution Kit</h3>
                <ul className="text-lg space-y-2">
                  <li>• 3 color-coded dustbins</li>
                  <li>• Composting kit</li>
                  <li>• Training materials</li>
                  <li>• App access credentials</li>
                </ul>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">App-Based Monitoring</h3>
              <div className="text-center">
                <FaMobile className="text-8xl mx-auto mb-4" />
                <p className="text-lg">Real-time tracking and progress monitoring for every household</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Green Champions Network",
      bgColor: "bg-gradient-to-br from-emerald-500 to-green-600",
      content: (
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-6 text-center">Solution 3: Decentralized Monitoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm text-center">
              <FaUsers className="text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Area Committees</h3>
              <p>Local champions monitoring waste management at ground level</p>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm text-center">
              <FaMapMarkerAlt className="text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Real-time Tracking</h3>
              <p>GPS-enabled monitoring of collection, transport, and treatment</p>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm text-center">
              <FaChartLine className="text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Performance Analytics</h3>
              <p>Data-driven insights for continuous improvement</p>
            </div>
          </div>
          <div className="mt-8 bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-center">Monitoring Scope</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div>Source Segregation</div>
              <div>Waste Collection</div>
              <div>Transportation</div>
              <div>Treatment Processes</div>
              <div>Disposal Methods</div>
              <div>Facility Operations</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Digital Platform Ecosystem",
      bgColor: "bg-gradient-to-br from-purple-600 to-indigo-600",
      content: (
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-6 text-center">Solution 9: Complete Digital System</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FaGraduationCap, title: "Training Portal", desc: "Interactive learning modules" },
              { icon: FaRecycle, title: "Marketplace", desc: "Waste utilities shopping" },
              { icon: FaMapMarkerAlt, title: "Vehicle Tracking", desc: "Real-time GPS monitoring" },
              { icon: FaIndustry, title: "Facility Locator", desc: "Find nearest facilities" },
              { icon: FaCamera, title: "Reporting System", desc: "Geo-tagged photo uploads" },
              { icon: FaChartLine, title: "Analytics Dashboard", desc: "Performance insights" },
              { icon: FaMobile, title: "Mobile App", desc: "Citizen engagement platform" },
              { icon: FaGlobe, title: "Web Portal", desc: "Admin management system" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-20 p-4 rounded-lg text-center backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="text-3xl mx-auto mb-2" />
                <h4 className="font-bold mb-1 text-sm">{item.title}</h4>
                <p className="text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Technology Stack",
      bgColor: "bg-gradient-to-br from-gray-800 to-gray-900",
      content: (
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-6 text-center">Our Technical Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-blue-300">Frontend</h3>
              <ul className="space-y-2">
                <li>• React 18 with TypeScript</li>
                <li>• TailwindCSS for styling</li>
                <li>• Framer Motion animations</li>
                <li>• Progressive Web App</li>
                <li>• React Leaflet for maps</li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-green-300">Backend</h3>
              <ul className="space-y-2">
                <li>• Firebase Firestore</li>
                <li>• Firebase Authentication</li>
                <li>• Firebase Storage</li>
                <li>• Cloud Functions</li>
                <li>• WebSocket for real-time</li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">Features</h3>
              <ul className="space-y-2">
                <li>• IoT sensor integration</li>
                <li>• GPS tracking</li>
                <li>• Data analytics</li>
                <li>• Mobile responsive</li>
                <li>• Multi-language support</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "Impact & Benefits",
      bgColor: "bg-gradient-to-br from-yellow-500 to-orange-500",
      content: (
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-6 text-center">Expected Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "80%", label: "Waste Treatment", desc: "Increase from 54%" },
              { number: "50%", label: "Cost Reduction", desc: "Operational efficiency" },
              { number: "100%", label: "ULB Coverage", desc: "Every municipality" },
              { number: "24/7", label: "Monitoring", desc: "Real-time tracking" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-20 p-6 rounded-lg text-center backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-4xl font-bold mb-2">{item.number}</div>
                <h4 className="text-lg font-bold mb-1">{item.label}</h4>
                <p className="text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-center">Social Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <FaLeaf className="text-3xl mx-auto mb-2" />
                <p>Environmental sustainability and cleaner cities</p>
              </div>
              <div>
                <FaUsers className="text-3xl mx-auto mb-2" />
                <p>Community engagement and awareness</p>
              </div>
              <div>
                <FaAward className="text-3xl mx-auto mb-2" />
                <p>Supporting Swachh Bharat Mission goals</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "Implementation Timeline",
      bgColor: "bg-gradient-to-br from-indigo-600 to-purple-700",
      content: (
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-6 text-center">Rollout Strategy</h2>
          <div className="space-y-6">
            {[
              { phase: "Phase 1", duration: "3 Months", tasks: ["Platform development", "Pilot testing in 5 cities", "Training content creation"] },
              { phase: "Phase 2", duration: "6 Months", tasks: ["Scale to 50 cities", "Citizen training programs", "Green Champions deployment"] },
              { phase: "Phase 3", duration: "12 Months", tasks: ["National rollout", "IoT sensor deployment", "Full system integration"] },
              { phase: "Phase 4", duration: "Ongoing", tasks: ["Continuous monitoring", "Performance optimization", "Feature enhancements"] }
            ].map((phase, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">{phase.phase}</h3>
                    <p className="text-lg">{phase.duration}</p>
                  </div>
                  <div className="md:col-span-2">
                    <ul className="space-y-1">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex}>• {task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 10,
      title: "QBrain: AI for Sustainable Future",
      bgColor: "bg-gradient-to-br from-purple-600 via-blue-600 to-green-600",
      content: (
        <div className="text-center text-white relative">
          <motion.div 
            className="absolute inset-0 opacity-10"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <FaNetworkWired className="text-9xl mx-auto" />
          </motion.div>
          
          <div className="relative z-10">
            <motion.div 
              className="flex items-center justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 1.5 }}
            >
              <FaBrain className="text-8xl text-purple-300 animate-pulse" />
              <FaRecycle className="text-8xl mx-4" />
              <MdAutoAwesome className="text-8xl text-yellow-300 animate-bounce" />
            </motion.div>
            
            <motion.h1 
              className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-green-200 bg-clip-text text-transparent"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Thank You
            </motion.h1>
            
            <motion.div 
              className="bg-black bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-4xl mb-6 text-gradient">Smart India Hackathon 2025</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl">
                  <FaBrain className="text-4xl mx-auto mb-3" />
                  <h3 className="text-2xl font-bold mb-2">Team QBrain</h3>
                  <p className="text-lg">AI-Driven Innovation</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl">
                  <FaGlobe className="text-4xl mx-auto mb-3" />
                  <h3 className="text-2xl font-bold mb-2">Visit Us</h3>
                  <a 
                    href="https://qbrain.in" 
                    className="text-lg hover:text-yellow-300 transition-colors font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    qbrain.in
                  </a>
                </div>
              </div>
              
              <motion.div 
                className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-xl"
                animate={{ boxShadow: ['0 0 20px rgba(0,255,0,0.3)', '0 0 40px rgba(0,100,255,0.5)', '0 0 20px rgba(0,255,0,0.3)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-2xl mb-4 font-semibold">
                  🌍 Building AI-Powered Sustainable Cities
                </p>
                <p className="text-lg">
                  Where Artificial Intelligence meets Environmental Intelligence
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-3 gap-4 text-sm"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
                <FaRocket className="text-3xl mx-auto mb-2 text-orange-300" />
                <div className="font-bold">Innovation</div>
                <div className="text-xs">AI-First Solutions</div>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
                <FaLeaf className="text-3xl mx-auto mb-2 text-green-300" />
                <div className="font-bold">Sustainability</div>
                <div className="text-xs">Environmental Impact</div>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
                <FaUsers className="text-3xl mx-auto mb-2 text-blue-300" />
                <div className="font-bold">Community</div>
                <div className="text-xs">Social Transformation</div>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-xl mt-6 text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Questions & Discussion 💬
            </motion.p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Auto-play functionality
  React.useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, currentSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-lg overflow-hidden'} ${currentSlideData.bgColor}`}>
      {/* Slide Content */}
      <div className={`${isFullscreen ? 'h-screen' : 'h-[600px]'} flex items-center justify-center p-8`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl"
          >
            {currentSlideData.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-8">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        >
          <FaChevronLeft />
        </button>

        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white'
                  : 'bg-white bg-opacity-40 hover:bg-opacity-60'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Control Panel */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={toggleAutoPlay}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-2 rounded-lg transition-all"
          title={isAutoPlay ? 'Pause' : 'Auto Play'}
        >
          {isAutoPlay ? <FaPause /> : <FaPlay />}
        </button>
        <button
          onClick={toggleFullscreen}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-2 rounded-lg transition-all"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-20 backdrop-blur-sm text-white px-3 py-1 rounded-lg">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default SIHPresentation;