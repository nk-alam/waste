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
  FaCompress
} from 'react-icons/fa';

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
      title: "Smart Waste Management System",
      bgColor: "bg-gradient-to-br from-green-600 to-blue-600",
      content: (
        <div className="text-center text-white">
          <FaRecycle className="text-8xl mx-auto mb-6 animate-spin-slow" />
          <h1 className="text-5xl font-bold mb-4">EcoWaste India</h1>
          <h2 className="text-2xl mb-6">Smart India Hackathon 2025</h2>
          <p className="text-xl mb-4">Digital Solution for India's Waste Management Crisis</p>
          <p className="text-lg">Team: Innovation Pioneers</p>
        </div>
      )
    },
    {
      id: 2,
      title: "Problem Statement",
      bgColor: "bg-gradient-to-br from-red-500 to-orange-500",
      content: (
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-6 text-center">The Crisis We Face</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Daily Waste Statistics</h3>
              <ul className="text-lg space-y-2">
                <li>• <strong>1,70,339 TPD</strong> Generated</li>
                <li>• <strong>1,56,449 TPD</strong> Collected</li>
                <li>• <strong>91,511 TPD</strong> Treated</li>
                <li>• <strong>37,373 TPD</strong> Gap</li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Treatment Efficiency</h3>
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">54%</div>
                <p className="text-lg">Only 54% of waste is properly treated across India</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Our Comprehensive Solution",
      bgColor: "bg-gradient-to-br from-blue-600 to-purple-600",
      content: (
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-6 text-center">9-Point Digital Solution</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: FaGraduationCap, title: "Mandatory Training", desc: "Every citizen trained" },
              { icon: FaUsers, title: "Worker Training", desc: "Phase-wise approach" },
              { icon: FaShieldAlt, title: "Green Champions", desc: "Decentralized monitoring" },
              { icon: FaMoneyBillWave, title: "Incentive System", desc: "Reward compliance" },
              { icon: FaCamera, title: "Photo Movement", desc: "Community reporting" },
              { icon: FaHandshake, title: "Community Days", desc: "Mass participation" },
              { icon: FaDollarSign, title: "Penalty System", desc: "Enforce compliance" },
              { icon: FaIndustry, title: "Facilities", desc: "Every ULB equipped" },
              { icon: FaMobile, title: "Digital Platform", desc: "Complete app ecosystem" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-20 p-4 rounded-lg text-center backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="text-3xl mx-auto mb-2" />
                <h4 className="font-bold mb-1">{item.title}</h4>
                <p className="text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
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
      title: "Thank You",
      bgColor: "bg-gradient-to-br from-green-600 to-blue-600",
      content: (
        <div className="text-center text-white">
          <FaRecycle className="text-8xl mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl font-bold mb-6">Thank You</h1>
          <h2 className="text-3xl mb-8">Smart India Hackathon 2025</h2>
          <div className="bg-white bg-opacity-20 p-8 rounded-lg backdrop-blur-sm">
            <p className="text-2xl mb-4">Together, we can build a cleaner India</p>
            <p className="text-lg mb-6">EcoWaste India - Transforming Waste Management</p>
            <div className="text-xl">
              <p>Team: Innovation Pioneers</p>
              <p className="mt-2">Questions & Discussion</p>
            </div>
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