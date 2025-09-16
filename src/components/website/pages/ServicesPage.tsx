import React from 'react';
import { motion } from 'framer-motion';
import {
  FaTruck,
  FaRecycle,
  FaUsers,
  FaMapMarkerAlt,
  FaChartLine,
  FaAward,
  FaLeaf,
  FaMobile,
  FaShieldAlt,
  FaIndustry,
  FaGraduationCap,
  FaHandshake,
  FaCog,
  FaCamera,
  FaRoute,
  FaClipboardList
} from 'react-icons/fa';
import { BsShieldCheck, BsPeople, BsGraphUp, BsGeoAlt } from 'react-icons/bs';
import { MdEco, MdAnalytics, MdNotifications, MdLocationOn } from 'react-icons/md';

const ServicesPage: React.FC = () => {
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
              Comprehensive
              <span className="text-green-600"> Services</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              End-to-end waste management solutions designed for Indian cities, 
              communities, and organizations. From collection to recycling, we've got you covered.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete waste management ecosystem with integrated technology solutions
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
                icon: FaTruck,
                title: "Smart Collection Management",
                description: "AI-powered route optimization, real-time vehicle tracking, and automated scheduling for efficient waste collection across Indian cities.",
                features: ["Route optimization", "GPS tracking", "Schedule management", "Driver monitoring"],
                color: "green"
              },
              {
                icon: FaUsers,
                title: "Citizen Engagement Platform",
                description: "Comprehensive training programs, awareness campaigns, and community participation tools for better waste segregation practices.",
                features: ["Training modules", "Awareness campaigns", "Community events", "Feedback system"],
                color: "blue"
              },
              {
                icon: FaRecycle,
                title: "Facility Management",
                description: "Real-time monitoring of waste processing facilities, capacity tracking, and efficiency optimization for maximum throughput.",
                features: ["Capacity monitoring", "Process tracking", "Efficiency metrics", "Maintenance alerts"],
                color: "purple"
              },
              {
                icon: FaChartLine,
                title: "Analytics & Reporting",
                description: "Comprehensive data analytics, performance metrics, and compliance reporting for informed decision making.",
                features: ["Performance dashboards", "Compliance reports", "Trend analysis", "Predictive insights"],
                color: "orange"
              },
              {
                icon: BsShieldCheck,
                title: "Quality Monitoring",
                description: "Continuous monitoring of waste segregation quality, compliance tracking, and violation reporting system.",
                features: ["Quality checks", "Compliance tracking", "Violation reports", "Audit trails"],
                color: "red"
              },
              {
                icon: FaAward,
                title: "Incentive Management",
                description: "Reward-based system to encourage participation, penalty management, and recognition programs for best practices.",
                features: ["Reward programs", "Penalty tracking", "Recognition system", "Point redemption"],
                color: "indigo"
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="bg-white border-2 border-gray-100 p-8 rounded-xl hover:shadow-xl transition-all duration-300 group"
                variants={fadeIn}
              >
                <div className={`bg-${service.color}-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`h-8 w-8 text-${service.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-sm text-gray-700">
                      <FaLeaf className={`h-3 w-3 text-${service.color}-600 mr-2`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technology stack designed for Indian infrastructure and requirements
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
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Mobile Applications</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: FaMobile,
                    title: "Citizen App",
                    description: "Easy-to-use mobile app for citizens to schedule pickups, report issues, track rewards, and access training materials."
                  },
                  {
                    icon: FaTruck,
                    title: "Worker App",
                    description: "Comprehensive app for waste collection workers with route optimization, attendance tracking, and real-time communication."
                  },
                  {
                    icon: BsShieldCheck,
                    title: "Supervisor App",
                    description: "Management dashboard for supervisors to monitor operations, assign tasks, and ensure quality control."
                  }
                ].map((app, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <app.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{app.title}</h4>
                      <p className="text-gray-600">{app.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Platform Features</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: BsGeoAlt,
                    title: "IoT Integration",
                    description: "Smart bins with sensors, GPS tracking devices, and real-time monitoring capabilities for complete visibility."
                  },
                  {
                    icon: MdAnalytics,
                    title: "AI-Powered Analytics",
                    description: "Machine learning algorithms for route optimization, demand prediction, and efficiency improvement."
                  },
                  {
                    icon: MdNotifications,
                    title: "Real-time Notifications",
                    description: "Instant alerts and notifications for collection schedules, violations, and important updates."
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Service Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized services for different stakeholders in the waste management ecosystem
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
                title: "For Citizens",
                icon: FaUsers,
                services: [
                  "Waste segregation training",
                  "Collection scheduling",
                  "Reward point system",
                  "Community events",
                  "Complaint resolution",
                  "Educational resources"
                ],
                color: "green"
              },
              {
                title: "For Organizations",
                icon: FaIndustry,
                services: [
                  "Bulk waste management",
                  "Compliance monitoring",
                  "Custom collection routes",
                  "Waste audit services",
                  "Sustainability reporting",
                  "Cost optimization"
                ],
                color: "blue"
              },
              {
                title: "For Governments",
                icon: FaShieldAlt,
                services: [
                  "Policy implementation",
                  "Performance monitoring",
                  "Compliance reporting",
                  "Budget optimization",
                  "Public engagement",
                  "Data analytics"
                ],
                color: "purple"
              }
            ].map((category, index) => (
              <motion.div 
                key={index}
                className={`bg-gradient-to-br from-${category.color}-50 to-${category.color}-100 p-8 rounded-2xl`}
                variants={fadeIn}
              >
                <div className={`bg-${category.color}-200 w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                  <category.icon className={`h-8 w-8 text-${category.color}-700`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h3>
                <ul className="space-y-3">
                  {category.services.map((service, sIndex) => (
                    <li key={sIndex} className="flex items-center text-gray-700">
                      <FaLeaf className={`h-4 w-4 text-${category.color}-600 mr-3`} />
                      {service}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Implementation Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Step-by-step process to implement our waste management solution in your city or organization
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                step: "01",
                icon: FaClipboardList,
                title: "Assessment",
                description: "Comprehensive analysis of current waste management infrastructure and requirements"
              },
              {
                step: "02",
                icon: FaCog,
                title: "Setup",
                description: "System configuration, user training, and integration with existing infrastructure"
              },
              {
                step: "03",
                icon: FaRoute,
                title: "Deployment",
                description: "Gradual rollout with pilot testing, feedback collection, and system optimization"
              },
              {
                step: "04",
                icon: MdAnalytics,
                title: "Monitoring",
                description: "Continuous monitoring, performance tracking, and ongoing support and maintenance"
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeIn}
              >
                <div className="relative mb-8">
                  <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <step.icon className="h-10 w-10 text-green-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-green-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Support & Maintenance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support services to ensure optimal performance and continuous improvement
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
                icon: FaGraduationCap,
                title: "Training & Education",
                description: "Comprehensive training programs for all user types, ongoing education, and certification programs."
              },
              {
                icon: FaHandshake,
                title: "Technical Support",
                description: "24/7 technical support, troubleshooting, system maintenance, and regular updates."
              },
              {
                icon: MdAnalytics,
                title: "Performance Optimization",
                description: "Continuous monitoring, performance analysis, system optimization, and efficiency improvements."
              },
              {
                icon: FaCamera,
                title: "Monitoring Services",
                description: "Real-time monitoring, alert management, incident response, and quality assurance."
              },
              {
                icon: BsGraphUp,
                title: "Consulting Services",
                description: "Strategic consulting, process improvement, policy development, and best practice guidance."
              },
              {
                icon: MdLocationOn,
                title: "On-site Support",
                description: "Local support teams, on-site maintenance, equipment servicing, and emergency response."
              }
            ].map((support, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow"
                variants={fadeIn}
              >
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <support.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{support.title}</h3>
                <p className="text-gray-600 text-sm">{support.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-green-100 mb-8">
              Transform your waste management operations with our comprehensive solutions. 
              Contact us today for a customized consultation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                Request Demo
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;