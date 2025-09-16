import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaYoutube,
  FaGlobe
} from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from 'react-icons/md';
import { BsCheckCircle } from 'react-icons/bs';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    city: '',
    state: '',
    subject: '',
    message: '',
    serviceType: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry'
  ];

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
              Get in
              <span className="text-green-600"> Touch</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              Ready to transform waste management in your city? Contact our team of experts 
              for customized solutions and comprehensive support.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6 flex items-center">
                  <BsCheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-green-800">Thank you! Your message has been sent successfully.</span>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Organization/Company name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your city"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select State</option>
                      {indianStates.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interest
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Service Type</option>
                    <option value="smart-collection">Smart Collection Management</option>
                    <option value="citizen-engagement">Citizen Engagement Platform</option>
                    <option value="facility-management">Facility Management</option>
                    <option value="analytics">Analytics & Reporting</option>
                    <option value="quality-monitoring">Quality Monitoring</option>
                    <option value="incentive-management">Incentive Management</option>
                    <option value="complete-solution">Complete Solution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Brief subject line"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Please describe your requirements in detail..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              {/* Office Locations */}
              <div className="space-y-8">
                <motion.div className="bg-gray-50 p-6 rounded-xl" variants={fadeIn}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Head Office - Mumbai</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MdLocationOn className="h-5 w-5 text-green-600 mr-3 mt-1" />
                      <div>
                        <p className="text-gray-700">EcoWaste Management Systems Pvt. Ltd.</p>
                        <p className="text-gray-600">Floor 15, Business Tower, Bandra Kurla Complex</p>
                        <p className="text-gray-600">Mumbai, Maharashtra 400051</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MdPhone className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">+91 22 4567 8900</span>
                    </div>
                    <div className="flex items-center">
                      <MdEmail className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">mumbai@ecowaste.in</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="bg-gray-50 p-6 rounded-xl" variants={fadeIn}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Regional Office - Delhi</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MdLocationOn className="h-5 w-5 text-green-600 mr-3 mt-1" />
                      <div>
                        <p className="text-gray-600">Sector 18, Cyber Hub</p>
                        <p className="text-gray-600">Gurugram, Haryana 122015</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MdPhone className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">+91 124 4567 8901</span>
                    </div>
                    <div className="flex items-center">
                      <MdEmail className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">delhi@ecowaste.in</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="bg-gray-50 p-6 rounded-xl" variants={fadeIn}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Regional Office - Bangalore</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MdLocationOn className="h-5 w-5 text-green-600 mr-3 mt-1" />
                      <div>
                        <p className="text-gray-600">Electronic City Phase 2</p>
                        <p className="text-gray-600">Bangalore, Karnataka 560100</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MdPhone className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">+91 80 4567 8902</span>
                    </div>
                    <div className="flex items-center">
                      <MdEmail className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">bangalore@ecowaste.in</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Business Hours */}
              <motion.div className="mt-8 bg-blue-50 p-6 rounded-xl" variants={fadeIn}>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <MdAccessTime className="h-5 w-5 text-blue-600 mr-3" />
                  Business Hours
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  24/7 emergency support available for existing customers
                </p>
              </motion.div>

              {/* Emergency Contact */}
              <motion.div className="mt-8 bg-red-50 p-6 rounded-xl" variants={fadeIn}>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Support</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaPhone className="h-5 w-5 text-red-600 mr-3" />
                    <span className="text-gray-700">+91 98765 43210 (24/7)</span>
                  </div>
                  <div className="flex items-center">
                    <FaWhatsapp className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">+91 98765 43211</span>
                  </div>
                  <div className="flex items-center">
                    <MdEmail className="h-5 w-5 text-red-600 mr-3" />
                    <span className="text-gray-700">emergency@ecowaste.in</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media & Additional Contact */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Connect With Us</h2>
            <p className="text-lg text-gray-600">
              Follow us on social media for updates, tips, and community engagement
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: FaFacebook, name: "Facebook", handle: "@EcoWasteIndia", color: "blue", followers: "50K+" },
              { icon: FaTwitter, name: "Twitter", handle: "@EcoWasteIN", color: "blue", followers: "25K+" },
              { icon: FaInstagram, name: "Instagram", handle: "@ecowasteindia", color: "pink", followers: "75K+" },
              { icon: FaLinkedin, name: "LinkedIn", handle: "EcoWaste Management", color: "blue", followers: "10K+" },
              { icon: FaYoutube, name: "YouTube", handle: "EcoWaste India", color: "red", followers: "100K+" },
              { icon: FaWhatsapp, name: "WhatsApp", handle: "Customer Support", color: "green", followers: "24/7" },
              { icon: FaTelegram, name: "Telegram", handle: "@EcoWasteUpdates", color: "blue", followers: "5K+" },
              { icon: FaGlobe, name: "Website", handle: "www.ecowaste.in", color: "gray", followers: "Live" }
            ].map((social, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow cursor-pointer"
                variants={fadeIn}
              >
                <div className={`bg-${social.color}-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <social.icon className={`h-6 w-6 text-${social.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{social.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{social.handle}</p>
                <p className={`text-sm font-medium text-${social.color}-600`}>{social.followers}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Presence Across India</h2>
            <p className="text-lg text-gray-600">
              We serve cities across India with local support teams and dedicated offices
            </p>
          </motion.div>

          <motion.div 
            className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="text-center">
              <FaMapMarkerAlt className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map</h3>
              <p className="text-gray-600">
                Find our office locations and service areas across India
              </p>
              <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                View Full Map
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;