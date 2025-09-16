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
  FaIndustry,
  FaGraduationCap,
  FaSeedling,
  FaShieldAlt
} from 'react-icons/fa';
import { BsShieldCheck, BsPeople, BsGraphUp, BsHeartFill } from 'react-icons/bs';
import { MdEco, MdRecycling } from 'react-icons/md';

const AboutPage: React.FC = () => {
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
              About Our
              <span className="text-green-600"> Mission</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              Transforming India's waste management landscape through innovative technology, 
              community engagement, and sustainable practices for a cleaner, greener future.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-green-50 p-8 rounded-2xl"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaSeedling className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To revolutionize waste management in India by creating an integrated digital ecosystem 
                that connects citizens, workers, and administrators for efficient, transparent, and 
                sustainable waste handling practices.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <FaLeaf className="h-5 w-5 text-green-600 mr-3" />
                  Promote sustainable waste practices
                </li>
                <li className="flex items-center text-gray-700">
                  <FaUsers className="h-5 w-5 text-green-600 mr-3" />
                  Empower communities through education
                </li>
                <li className="flex items-center text-gray-700">
                  <FaChartLine className="h-5 w-5 text-green-600 mr-3" />
                  Drive data-driven decision making
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-blue-50 p-8 rounded-2xl"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <BsGraphUp className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6">
                To be India's leading smart waste management platform, enabling cities and communities 
                to achieve 100% waste segregation, maximum recycling, and zero waste to landfills 
                by 2030.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <FaRecycle className="h-5 w-5 text-blue-600 mr-3" />
                  Achieve circular economy goals
                </li>
                <li className="flex items-center text-gray-700">
                  <FaShieldAlt className="h-5 w-5 text-blue-600 mr-3" />
                  Ensure environmental protection
                </li>
                <li className="flex items-center text-gray-700">
                  <FaIndustry className="h-5 w-5 text-blue-600 mr-3" />
                  Support India's Smart Cities Mission
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Indian Context */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Addressing India's Waste Challenge</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              India generates over 62 million tonnes of waste annually. Our platform is designed 
              specifically for Indian cities, considering local practices, regulations, and cultural contexts.
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
                icon: FaMapMarkerAlt,
                title: "Urban Challenges",
                description: "Rapidly growing cities with increasing waste generation",
                stats: "377+ Million urban population"
              },
              {
                icon: FaRecycle,
                title: "Recycling Gap",
                description: "Current recycling rate needs significant improvement",
                stats: "Only 20% waste recycled"
              },
              {
                icon: FaUsers,
                title: "Community Impact",
                description: "Engaging 1.4 billion citizens in sustainable practices",
                stats: "1.4B+ Population"
              },
              {
                icon: FaGraduationCap,
                title: "Education Focus",
                description: "Building awareness about proper waste segregation",
                stats: "Training at scale"
              }
            ].map((challenge, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg"
                variants={fadeIn}
              >
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <challenge.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{challenge.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                <p className="text-orange-600 font-semibold text-sm">{challenge.stats}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Make a Difference</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach integrates technology, community engagement, and 
              government policies to create lasting change.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                step: "01",
                icon: FaUsers,
                title: "Community Engagement",
                description: "We start by educating and engaging citizens, making them active participants in the waste management process through training programs and awareness campaigns.",
                features: ["Citizen training modules", "Green Champion network", "Community events", "Reward programs"]
              },
              {
                step: "02",
                icon: FaTruck,
                title: "Smart Operations",
                description: "Our technology optimizes collection routes, tracks vehicles in real-time, and ensures efficient waste processing through integrated facility management.",
                features: ["Route optimization", "Real-time tracking", "Facility monitoring", "Performance analytics"]
              },
              {
                step: "03",
                icon: MdRecycling,
                title: "Circular Economy",
                description: "We promote recycling and reuse through marketplace integration, waste-to-energy initiatives, and supporting the informal recycling sector.",
                features: ["Recycling marketplace", "Waste-to-resource", "Value recovery", "Sustainable practices"]
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeIn}
              >
                <div className="relative mb-8">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="h-10 w-10 text-green-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-green-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
                <ul className="space-y-2">
                  {step.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center justify-center text-sm text-gray-700">
                      <FaLeaf className="h-3 w-3 text-green-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">Our Impact Across India</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Measurable results from our comprehensive waste management initiatives
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
              { icon: FaMapMarkerAlt, number: "50+", label: "Cities Served", sublabel: "Across 15 states" },
              { icon: BsPeople, number: "2M+", label: "Citizens Trained", sublabel: "In waste segregation" },
              { icon: FaTruck, number: "10K+", label: "Vehicles Tracked", sublabel: "Daily operations" },
              { icon: MdRecycling, number: "85%", label: "Waste Diverted", sublabel: "From landfills" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeIn}
              >
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-xl font-semibold mb-1">{stat.label}</p>
                <p className="text-green-100 text-sm">{stat.sublabel}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and commitment to sustainable waste management
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
                icon: BsHeartFill,
                title: "Community First",
                description: "Every decision we make prioritizes the well-being of communities and the environment they live in."
              },
              {
                icon: BsShieldCheck,
                title: "Transparency",
                description: "Open data, clear processes, and honest communication build trust with all stakeholders."
              },
              {
                icon: MdEco,
                title: "Sustainability",
                description: "Long-term environmental health guides our technology choices and operational practices."
              },
              {
                icon: FaGraduationCap,
                title: "Education",
                description: "Empowering people with knowledge creates lasting behavioral change and environmental awareness."
              },
              {
                icon: FaHandshake,
                title: "Collaboration",
                description: "Working together with government, NGOs, and communities amplifies our collective impact."
              },
              {
                icon: BsGraphUp,
                title: "Innovation",
                description: "Continuous improvement and creative solutions drive progress in waste management technology."
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
                variants={fadeIn}
              >
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Join the Movement</h2>
            <p className="text-xl text-gray-600 mb-8">
              Be part of India's waste management revolution. Together, we can build cleaner, 
              more sustainable communities for future generations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
                Get Started Today
              </button>
              <button className="border border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;