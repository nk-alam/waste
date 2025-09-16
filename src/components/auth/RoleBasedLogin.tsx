import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, useSearchParams, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, AlertCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaTruck, 
  FaAward, 
  FaUserTie, 
  FaUserShield, 
  FaCog 
} from 'react-icons/fa';

interface UserTypeInfo {
  role: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  color: string;
  demoCredentials: {
    email: string;
    password: string;
  };
}

const userTypes: UserTypeInfo[] = [
  {
    role: 'citizen',
    title: 'Citizen',
    icon: FaUsers,
    description: 'Access waste management services, training, and rewards',
    color: 'blue',
    demoCredentials: { email: 'citizen@wastems.com', password: 'citizen123' }
  },
  {
    role: 'worker',
    title: 'Waste Worker',
    icon: FaTruck,
    description: 'Manage collection routes and report work status',
    color: 'orange',
    demoCredentials: { email: 'worker@wastems.com', password: 'worker123' }
  },
  {
    role: 'champion',
    title: 'Green Champion',
    icon: FaAward,
    description: 'Monitor areas and lead community initiatives',
    color: 'green',
    demoCredentials: { email: 'champion@wastems.com', password: 'champion123' }
  },
  {
    role: 'supervisor',
    title: 'Supervisor',
    icon: FaUserTie,
    description: 'Oversee operations and manage teams',
    color: 'purple',
    demoCredentials: { email: 'supervisor@wastems.com', password: 'supervisor123' }
  },
  {
    role: 'ulb_admin',
    title: 'ULB Admin',
    icon: FaUserShield,
    description: 'Manage local body operations and policies',
    color: 'indigo',
    demoCredentials: { email: 'ulb@wastems.com', password: 'ulb123' }
  },
  {
    role: 'admin',
    title: 'System Admin',
    icon: FaCog,
    description: 'Full system access and user management',
    color: 'red',
    demoCredentials: { email: 'admin@wastems.com', password: 'admin123' }
  }
];

const RoleBasedLogin: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'citizen';
  
  const [selectedRole, setSelectedRole] = useState<string>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();

  const selectedUserType = userTypes.find(type => type.role === selectedRole) || userTypes[0];

  useEffect(() => {
    // Auto-fill demo credentials when role changes
    setEmail(selectedUserType.demoCredentials.email);
    setPassword(selectedUserType.demoCredentials.password);
  }, [selectedRole, selectedUserType]);

  if (user) {
    return <Navigate to={user.role === 'admin' ? "/admin" : "/"} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const getColorClasses = (color: string, variant: 'bg' | 'border' | 'text' | 'hover') => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-600',
        border: 'border-blue-600',
        text: 'text-blue-600',
        hover: 'hover:bg-blue-700'
      },
      orange: {
        bg: 'bg-orange-600',
        border: 'border-orange-600',
        text: 'text-orange-600',
        hover: 'hover:bg-orange-700'
      },
      green: {
        bg: 'bg-green-600',
        border: 'border-green-600',
        text: 'text-green-600',
        hover: 'hover:bg-green-700'
      },
      purple: {
        bg: 'bg-purple-600',
        border: 'border-purple-600',
        text: 'text-purple-600',
        hover: 'hover:bg-purple-700'
      },
      indigo: {
        bg: 'bg-indigo-600',
        border: 'border-indigo-600',
        text: 'text-indigo-600',
        hover: 'hover:bg-indigo-700'
      },
      red: {
        bg: 'bg-red-600',
        border: 'border-red-600',
        text: 'text-red-600',
        hover: 'hover:bg-red-700'
      }
    };
    return colorMap[color as keyof typeof colorMap]?.[variant] || colorMap.blue[variant];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            ← Back to Home
          </Link>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Login to EcoWaste Management
          </h2>
          <p className="text-lg text-gray-600">
            Choose your role and access your personalized dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Role Selection */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Your Role</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userTypes.map((userType) => {
                const IconComponent = userType.icon;
                const isSelected = selectedRole === userType.role;
                
                return (
                  <motion.button
                    key={userType.role}
                    onClick={() => setSelectedRole(userType.role)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      isSelected 
                        ? `${getColorClasses(userType.color, 'border')} ${getColorClasses(userType.color, 'bg')} text-white` 
                        : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center mb-2">
                      <IconComponent className={`h-6 w-6 mr-3 ${isSelected ? 'text-white' : getColorClasses(userType.color, 'text')}`} />
                      <span className="font-semibold">{userType.title}</span>
                    </div>
                    <p className={`text-sm ${isSelected ? 'text-gray-100' : 'text-gray-500'}`}>
                      {userType.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Selected: {selectedUserType.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{selectedUserType.description}</p>
              <div className="text-xs text-gray-500">
                <p className="font-medium">Demo Credentials:</p>
                <p>Email: {selectedUserType.demoCredentials.email}</p>
                <p>Password: {selectedUserType.demoCredentials.password}</p>
              </div>
            </div>
          </motion.div>

          {/* Login Form */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${getColorClasses(selectedUserType.color, 'bg')}`}>
                <selectedUserType.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedUserType.title} Login</h3>
                <p className="text-gray-600">Enter your credentials to continue</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div 
                  className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                  <span className="text-sm text-red-600">{error}</span>
                </motion.div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-green-600 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${getColorClasses(selectedUserType.color, 'bg')} ${getColorClasses(selectedUserType.color, 'hover')} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  `Sign in as ${selectedUserType.title}`
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className={`font-medium ${getColorClasses(selectedUserType.color, 'text')} hover:opacity-80`}
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Features Overview */}
        <motion.div 
          className="mt-12 bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What you can do as a {selectedUserType.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedRole === 'citizen' && [
              { title: 'Waste Training', desc: 'Complete segregation training modules and earn certificates' },
              { title: 'Reward Points', desc: 'Earn points for proper waste segregation and redeem rewards' },
              { title: 'Report Issues', desc: 'Report waste management issues in your area' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-4">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
            
            {selectedRole === 'worker' && [
              { title: 'Route Management', desc: 'View and manage your assigned collection routes' },
              { title: 'Status Updates', desc: 'Update collection status and report issues' },
              { title: 'Training Phases', desc: 'Complete safety training and skill development' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-4">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaTruck className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}

            {selectedRole === 'admin' && [
              { title: 'User Management', desc: 'Manage all users across different roles and permissions' },
              { title: 'System Analytics', desc: 'Access comprehensive reports and system performance metrics' },
              { title: 'Policy Control', desc: 'Configure system policies and operational parameters' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-4">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaCog className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleBasedLogin;