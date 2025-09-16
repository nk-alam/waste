import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaRecycle, 
  FaUsers, 
  FaLeaf, 
  FaTruck, 
  FaMapMarkerAlt, 
  FaChartLine,
  FaHandshake,
  FaAward,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa';
import { BsShieldCheck, BsPeople, BsGraphUp } from 'react-icons/bs';
import { MdEco, MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PublicWebsite: React.FC = () => {
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
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FaRecycle className="h-10 w-10 text-green-600 mr-3" />
              <span className="text-2xl font-bold text-gray-900">EcoWaste Management</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors">Home</a>
              <a href="#services" className="text-gray-700 hover:text-green-600 transition-colors">Services</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">About Us</a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">Contact</a>
            </nav>
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/admin" 
                className="border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
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
              Smart Waste Management
              <span className="text-green-600"> Revolution</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              Join the sustainable future with our comprehensive waste management platform. 
              Connect communities, optimize collection routes, and build a cleaner tomorrow.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              variants={fadeIn}
            >
              <Link 
                to="/register" 
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center"
              >
                Get Started <FaLeaf className="ml-2" />
              </Link>
              <a 
                href="#services" 
                className="border border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: BsPeople, number: "50K+", label: "Active Users" },
              { icon: FaTruck, number: "1000+", label: "Collection Routes" },
              { icon: MdEco, number: "85%", label: "Waste Recycled" },
              { icon: BsGraphUp, number: "200+", label: "Cities Served" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeIn}
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive waste management solutions for modern cities and communities
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
                title: "Smart Collection",
                description: "AI-powered route optimization and real-time tracking for efficient waste collection"
              },
              {
                icon: FaUsers,
                title: "Community Engagement",
                description: "Connect citizens, workers, and champions in collaborative waste management efforts"
              },
              {
                icon: FaMapMarkerAlt,
                title: "Facility Management",
                description: "Monitor and manage waste processing facilities with real-time data and analytics"
              },
              {
                icon: FaChartLine,
                title: "Analytics & Reports",
                description: "Comprehensive insights and reporting for data-driven decision making"
              },
              {
                icon: BsShieldCheck,
                title: "Quality Monitoring",
                description: "Ensure compliance and quality standards across all waste management operations"
              },
              {
                icon: FaAward,
                title: "Incentive Programs",
                description: "Reward-based system to encourage community participation and best practices"
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                variants={fadeIn}
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Building a Sustainable Future Together
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our platform revolutionizes waste management by connecting all stakeholders 
                in an integrated ecosystem. From citizens to collection workers, from green 
                champions to ULB administrators, everyone plays a vital role.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time waste tracking and monitoring",
                  "Community-driven environmental initiatives",
                  "Data-driven decision making tools",
                  "Incentive programs for participation"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FaLeaf className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="relative"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Waste Management"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple user types working together for a cleaner environment
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
                icon: FaUsers,
                title: "Citizens",
                description: "Register, get training, participate in waste segregation and earn rewards",
                loginType: "citizen"
              },
              {
                icon: FaTruck,
                title: "Waste Workers",
                description: "Manage collection routes, track attendance, and report collection status",
                loginType: "worker"
              },
              {
                icon: FaAward,
                title: "Green Champions",
                description: "Monitor areas, report violations, and lead community initiatives",
                loginType: "champion"
              },
              {
                icon: BsShieldCheck,
                title: "Supervisors",
                description: "Oversee operations, manage teams, and ensure quality standards",
                loginType: "supervisor"
              },
              {
                icon: BsPeople,
                title: "ULB Admins",
                description: "Manage local body operations, policies, and performance tracking",
                loginType: "ulb_admin"
              },
              {
                icon: FaChartLine,
                title: "System Admins",
                description: "Full system access, user management, and comprehensive analytics",
                loginType: "admin"
              }
            ].map((userType, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group"
                variants={fadeIn}
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                  <userType.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{userType.title}</h3>
                <p className="text-gray-600 mb-6">{userType.description}</p>
                <Link 
                  to={`/login?role=${userType.loginType}`}
                  className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  Login as {userType.title}
                  <FaLeaf className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              Ready to transform your community's waste management?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
              <div className="space-y-6">
                {[
                  { icon: MdPhone, label: "Phone", value: "+1 (555) 123-4567" },
                  { icon: MdEmail, label: "Email", value: "info@ecowaste.com" },
                  { icon: MdLocationOn, label: "Address", value: "123 Green Street, Eco City, EC 12345" }
                ].map((contact, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center"
                    variants={fadeIn}
                  >
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <contact.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{contact.label}</p>
                      <p className="text-gray-600">{contact.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                    <a 
                      key={index}
                      href="#" 
                      className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                    >
                      <Icon className="h-5 w-5 text-green-600" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-8 rounded-xl"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FaRecycle className="h-8 w-8 text-green-400 mr-2" />
                <span className="text-xl font-bold">EcoWaste</span>
              </div>
              <p className="text-gray-400">
                Building sustainable communities through smart waste management solutions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Smart Collection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Engagement</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics & Reports</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facility Management</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">User Types</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login?role=citizen" className="hover:text-white transition-colors">Citizens</Link></li>
                <li><Link to="/login?role=worker" className="hover:text-white transition-colors">Workers</Link></li>
                <li><Link to="/login?role=champion" className="hover:text-white transition-colors">Green Champions</Link></li>
                <li><Link to="/login?role=admin" className="hover:text-white transition-colors">Administrators</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EcoWaste Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicWebsite;