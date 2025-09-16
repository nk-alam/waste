import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaRecycle,
  FaBars,
  FaTimes,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa';

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

const WebsiteLayout: React.FC<WebsiteLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Programs', href: '/programs' },
    { name: 'SIH Solution', href: '/sih-solution' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <FaRecycle className="h-10 w-10 text-green-600 mr-3" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">EcoWaste India</span>
                <span className="text-xs text-gray-500">Powered by QBrain</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex space-x-4">
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

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6 text-gray-600" />
              ) : (
                <FaBars className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-green-600'
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 space-y-2">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/admin" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors text-center"
                  >
                    Admin Panel
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <FaRecycle className="h-8 w-8 text-green-400 mr-2" />
                <div>
                  <span className="text-xl font-bold">EcoWaste India</span>
                  <p className="text-sm text-gray-400">by QBrain Technologies</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                AI-powered smart waste management solutions for sustainable communities across India.
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <p>🌐 Visit us: <a href="https://qbrain.in" className="text-green-400 hover:text-green-300">qbrain.in</a></p>
              </div>
              <div className="flex space-x-4">
                {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/services" className="hover:text-white transition-colors">Smart Collection</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Community Engagement</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Analytics & Reports</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Facility Management</Link></li>
              </ul>
            </div>

            {/* User Access */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Access Portal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login?role=citizen" className="hover:text-white transition-colors">Citizens</Link></li>
                <li><Link to="/login?role=worker" className="hover:text-white transition-colors">Workers</Link></li>
                <li><Link to="/login?role=champion" className="hover:text-white transition-colors">Green Champions</Link></li>
                <li><Link to="/admin" className="hover:text-white transition-colors">Administrators</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EcoWaste India Management System by QBrain Technologies. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Supporting India's Swachh Bharat Mission | Smart Cities Initiative | Visit: <a href="https://qbrain.in" className="text-green-400 hover:text-green-300">qbrain.in</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WebsiteLayout;