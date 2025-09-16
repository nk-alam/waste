import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaRecycle,
  FaLeaf,
  FaGraduationCap,
  FaAward,
  FaHandshake,
  FaTruck,
  FaIndustry,
  FaSeedling,
  FaGlobe,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaChevronRight
} from 'react-icons/fa';
import { BsPeople, BsGraphUp, BsShieldCheck, BsHeart } from 'react-icons/bs';
import { MdEco, MdSchool, MdLocationOn } from 'react-icons/md';

const ProgramsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('government');

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
              Programs &
              <span className="text-green-600"> Initiatives</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              Comprehensive programs supporting India's waste management goals through 
              government initiatives, community engagement, and educational campaigns.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-2">
            {[
              { id: 'government', name: 'Government Initiatives', icon: BsShieldCheck },
              { id: 'community', name: 'Community Programs', icon: FaUsers },
              { id: 'education', name: 'Education & Training', icon: FaGraduationCap },
              { id: 'corporate', name: 'Corporate Partnerships', icon: FaHandshake }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
                  selectedTab === tab.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Government Initiatives */}
      {selectedTab === 'government' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Government Initiatives</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Supporting India's national and state-level waste management policies and programs
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              {[
                {
                  title: "Swachh Bharat Mission",
                  subtitle: "Clean India Campaign",
                  description: "Supporting PM Modi's flagship program to make India clean and open defecation free by 2024. Our platform helps cities achieve SBM targets through systematic waste management.",
                  features: [
                    "Digital tracking of cleanliness metrics",
                    "Citizen engagement and participation",
                    "Real-time monitoring and reporting",
                    "Performance analytics for ULBs"
                  ],
                  icon: FaGlobe,
                  color: "orange"
                },
                {
                  title: "Smart Cities Mission",
                  subtitle: "Technology-Driven Urban Development",
                  description: "Integrating with Smart Cities Mission to provide technology solutions for sustainable urban development and efficient municipal services.",
                  features: [
                    "IoT-enabled waste management",
                    "Data-driven city planning",
                    "Citizen service portals",
                    "Performance dashboards"
                  ],
                  icon: FaIndustry,
                  color: "blue"
                },
                {
                  title: "Plastic Waste Management Rules",
                  subtitle: "Extended Producer Responsibility",
                  description: "Helping implement plastic waste management rules and EPR compliance for manufacturers, retailers, and waste management companies.",
                  features: [
                    "EPR compliance tracking",
                    "Plastic waste collection monitoring",
                    "Producer responsibility reports",
                    "Recycling target achievement"
                  ],
                  icon: FaRecycle,
                  color: "green"
                },
                {
                  title: "Waste to Energy Programs",
                  subtitle: "Renewable Energy from Waste",
                  description: "Supporting waste-to-energy initiatives under the National Action Plan on Climate Change and renewable energy targets.",
                  features: [
                    "Waste-to-energy facility monitoring",
                    "Energy generation tracking",
                    "Carbon credit calculations",
                    "Efficiency optimization"
                  ],
                  icon: MdEco,
                  color: "purple"
                }
              ].map((initiative, index) => (
                <motion.div 
                  key={index}
                  className="bg-white border-2 border-gray-100 p-8 rounded-2xl hover:shadow-xl transition-all"
                  variants={fadeIn}
                >
                  <div className={`bg-${initiative.color}-100 w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                    <initiative.icon className={`h-8 w-8 text-${initiative.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{initiative.title}</h3>
                  <p className={`text-${initiative.color}-600 font-semibold mb-4`}>{initiative.subtitle}</p>
                  <p className="text-gray-600 mb-6">{initiative.description}</p>
                  <ul className="space-y-2">
                    {initiative.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-gray-700">
                        <FaChevronRight className={`h-3 w-3 text-${initiative.color}-600 mr-2`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Community Programs */}
      {selectedTab === 'community' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Community Programs</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Engaging communities across India in sustainable waste management practices
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              {[
                {
                  title: "Green Champions Network",
                  description: "Training local leaders to become waste management champions in their communities",
                  participants: "5,000+ Champions",
                  impact: "500+ Communities",
                  icon: FaAward,
                  color: "green"
                },
                {
                  title: "School Education Program",
                  description: "Teaching waste segregation and environmental awareness to students across India",
                  participants: "10,000+ Students",
                  impact: "500+ Schools",
                  icon: MdSchool,
                  color: "blue"
                },
                {
                  title: "Resident Welfare Associations",
                  description: "Partnering with RWAs to implement community-level waste management solutions",
                  participants: "2,000+ RWAs",
                  impact: "100+ Cities",
                  icon: BsPeople,
                  color: "purple"
                },
                {
                  title: "Women's Self Help Groups",
                  description: "Empowering women through waste management training and livelihood opportunities",
                  participants: "1,500+ SHGs",
                  impact: "50+ Districts",
                  icon: BsHeart,
                  color: "pink"
                },
                {
                  title: "Youth Environmental Clubs",
                  description: "Engaging young people in environmental activism and sustainable practices",
                  participants: "3,000+ Youth",
                  impact: "200+ Colleges",
                  icon: FaSeedling,
                  color: "green"
                },
                {
                  title: "Senior Citizen Programs",
                  description: "Special programs for elderly citizens focusing on health and environmental awareness",
                  participants: "5,000+ Seniors",
                  impact: "300+ Centers",
                  icon: FaUsers,
                  color: "orange"
                }
              ].map((program, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow"
                  variants={fadeIn}
                >
                  <div className={`bg-${program.color}-100 w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                    <program.icon className={`h-6 w-6 text-${program.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Participants:</span>
                      <span className={`text-sm font-semibold text-${program.color}-600`}>{program.participants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Impact:</span>
                      <span className={`text-sm font-semibold text-${program.color}-600`}>{program.impact}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Education & Training */}
      {selectedTab === 'education' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Education & Training Programs</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive training modules designed for different stakeholders in the waste management ecosystem
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Training Modules</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "Waste Segregation Basics",
                      duration: "2 hours",
                      level: "Beginner",
                      participants: "Citizens, Students",
                      description: "Learn the fundamentals of waste segregation, types of waste, and proper disposal methods."
                    },
                    {
                      title: "Advanced Recycling Techniques",
                      duration: "4 hours",
                      level: "Intermediate",
                      participants: "Workers, Champions",
                      description: "Advanced training on recycling processes, material recovery, and waste-to-resource conversion."
                    },
                    {
                      title: "Facility Management Operations",
                      duration: "8 hours",
                      level: "Advanced",
                      participants: "Supervisors, Managers",
                      description: "Comprehensive training on waste processing facility operations, monitoring, and optimization."
                    },
                    {
                      title: "Policy and Compliance",
                      duration: "6 hours",
                      level: "Expert",
                      participants: "Administrators, Officials",
                      description: "Understanding waste management policies, compliance requirements, and regulatory frameworks."
                    }
                  ].map((module, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{module.title}</h4>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          {module.level}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <span className="ml-2 font-medium">{module.duration}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">For:</span>
                          <span className="ml-2 font-medium">{module.participants}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Certification Programs</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "Certified Waste Management Professional",
                      icon: FaGraduationCap,
                      duration: "40 hours",
                      modules: 8,
                      certification: "Industry Recognized",
                      description: "Comprehensive certification program for waste management professionals covering all aspects of waste handling, processing, and management."
                    },
                    {
                      title: "Green Champion Certification",
                      icon: FaAward,
                      duration: "20 hours",
                      modules: 5,
                      certification: "Community Leader",
                      description: "Specialized program for community leaders focusing on local waste management initiatives and citizen engagement."
                    },
                    {
                      title: "Facility Operations Specialist",
                      icon: FaTruck,
                      duration: "60 hours",
                      modules: 12,
                      certification: "Technical Expert",
                      description: "Advanced technical training for waste processing facility operators and maintenance personnel."
                    }
                  ].map((cert, index) => (
                    <div key={index} className="bg-white border-2 border-gray-100 p-6 rounded-xl">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                          <cert.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{cert.title}</h4>
                          <p className="text-gray-600 mb-4">{cert.description}</p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500 block">Duration</span>
                              <span className="font-medium">{cert.duration}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block">Modules</span>
                              <span className="font-medium">{cert.modules}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block">Type</span>
                              <span className="font-medium">{cert.certification}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Corporate Partnerships */}
      {selectedTab === 'corporate' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Corporate Partnerships</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Collaborating with industry leaders to create sustainable waste management solutions and corporate social responsibility programs
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              {[
                {
                  category: "Manufacturing Partners",
                  icon: FaIndustry,
                  companies: ["Tata Group", "Reliance Industries", "Mahindra Group", "L&T"],
                  programs: [
                    "Extended Producer Responsibility",
                    "Sustainable packaging initiatives",
                    "Waste reduction programs",
                    "Green supply chain management"
                  ]
                },
                {
                  category: "Technology Partners",
                  icon: BsGraphUp,
                  companies: ["IBM India", "Microsoft India", "TCS", "Infosys"],
                  programs: [
                    "AI and ML solutions",
                    "IoT sensor networks",
                    "Data analytics platforms",
                    "Mobile application development"
                  ]
                },
                {
                  category: "Financial Partners",
                  icon: FaHandshake,
                  companies: ["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank"],
                  programs: [
                    "Green financing initiatives",
                    "Digital payment solutions",
                    "Microfinance for waste workers",
                    "Investment in green technology"
                  ]
                }
              ].map((partnership, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 p-8 rounded-2xl"
                  variants={fadeIn}
                >
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <partnership.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{partnership.category}</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Partners</h4>
                    <div className="flex flex-wrap gap-2">
                      {partnership.companies.map((company, cIndex) => (
                        <span key={cIndex} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Programs</h4>
                    <ul className="space-y-2">
                      {partnership.programs.map((program, pIndex) => (
                        <li key={pIndex} className="flex items-center text-sm text-gray-600">
                          <FaChevronRight className="h-3 w-3 text-green-600 mr-2" />
                          {program}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-lg text-gray-600">
              Join our community events, training sessions, and awareness campaigns
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                title: "National Waste Management Summit 2024",
                date: "March 15-17, 2024",
                location: "New Delhi",
                type: "Conference",
                attendees: "500+ Expected"
              },
              {
                title: "Community Cleanup Drive - Mumbai",
                date: "March 22, 2024",
                location: "Bandra Beach",
                type: "Community Event",
                attendees: "200+ Volunteers"
              },
              {
                title: "Green Champion Training Program",
                date: "April 5-7, 2024",
                location: "Bangalore",
                type: "Training",
                attendees: "100+ Champions"
              },
              {
                title: "School Environmental Awareness Week",
                date: "April 10-16, 2024",
                location: "Multiple Cities",
                type: "Education",
                attendees: "1000+ Students"
              },
              {
                title: "Corporate Sustainability Workshop",
                date: "April 25, 2024",
                location: "Chennai",
                type: "Workshop",
                attendees: "50+ Companies"
              },
              {
                title: "Waste-to-Energy Technology Expo",
                date: "May 8-10, 2024",
                location: "Hyderabad",
                type: "Exhibition",
                attendees: "300+ Visitors"
              }
            ].map((event, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                variants={fadeIn}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                    {event.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{event.title}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaCalendarAlt className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <MdLocationOn className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="h-4 w-4 mr-2" />
                    {event.attendees}
                  </div>
                </div>
                <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Register Now
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">Join Our Programs</h2>
            <p className="text-xl text-green-100 mb-8">
              Be part of India's largest waste management initiative. Choose a program that matches your interests and make a difference in your community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore Programs
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Become a Partner
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;