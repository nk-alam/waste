import React, { useState } from 'react';
import { useSearchParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FaUsers, 
  FaTruck, 
  FaAward, 
  FaUserTie, 
  FaUserShield, 
  FaCog,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import { Mail, Lock, User, Phone, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  department?: string;
  aadhaar?: string;
}

const userTypes = [
  {
    role: 'citizen',
    title: 'Citizen',
    icon: FaUsers,
    description: 'Access waste management services, training, and rewards',
    color: 'blue'
  },
  {
    role: 'worker',
    title: 'Waste Worker',
    icon: FaTruck,
    description: 'Manage collection routes and report work status',
    color: 'orange'
  },
  {
    role: 'champion',
    title: 'Green Champion',
    icon: FaAward,
    description: 'Monitor areas and lead community initiatives',
    color: 'green'
  }
];

const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'citizen';
  
  const [selectedRole, setSelectedRole] = useState<string>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<RegisterFormData>({
    defaultValues: {
      role: selectedRole,
      address: {
        street: '',
        city: '',
        state: '',
        pincode: ''
      }
    }
  });

  const password = watch('password');
  const selectedUserType = userTypes.find(type => type.role === selectedRole) || userTypes[0];

  if (user) {
    return <Navigate to={user.role === 'admin' ? "/admin" : "/"} replace />;
  }

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Registration data:', data);
      setSuccess(true);
      reset();
    } catch (error) {
      console.error('Registration failed:', error);
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
      }
    };
    return colorMap[color as keyof typeof colorMap]?.[variant] || colorMap.blue[variant];
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4">
        <motion.div 
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your account has been created successfully. You can now login with your credentials.
          </p>
          <Link 
            to="/login"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
          >
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            ← Back to Home
          </Link>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Join EcoWaste Management
          </h2>
          <p className="text-lg text-gray-600">
            Create your account and start contributing to a cleaner environment
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Role Selection */}
            <div className="bg-gray-50 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Choose Your Role</h3>
              <div className="space-y-4">
                {userTypes.map((userType) => {
                  const IconComponent = userType.icon;
                  const isSelected = selectedRole === userType.role;
                  
                  return (
                    <motion.button
                      key={userType.role}
                      onClick={() => setSelectedRole(userType.role)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
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

              <div className="mt-6 p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Selected: {selectedUserType.title}</h4>
                <p className="text-sm text-gray-600">{selectedUserType.description}</p>
              </div>
            </div>

            {/* Registration Form */}
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${getColorClasses(selectedUserType.color, 'bg')}`}>
                  <selectedUserType.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Register as {selectedUserType.title}</h3>
                  <p className="text-gray-600">Fill in your details to create an account</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" {...register('role')} value={selectedRole} />

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      {...register('phone', { 
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[+]?[0-9]{10,15}$/,
                          message: 'Invalid phone number'
                        }
                      })}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters'
                        }
                      })}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword', { 
                        required: 'Please confirm your password',
                        validate: value => value === password || 'Passwords do not match'
                      })}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      {...register('address.city', { required: 'City is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="City"
                    />
                    <input
                      type="text"
                      {...register('address.state', { required: 'State is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="State"
                    />
                  </div>
                  <input
                    type="text"
                    {...register('address.pincode', { 
                      required: 'Pincode is required',
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: 'Invalid pincode'
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Pincode"
                  />
                </div>

                {/* Aadhaar for Citizens */}
                {selectedRole === 'citizen' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                    <input
                      type="text"
                      {...register('aadhaar', { 
                        required: selectedRole === 'citizen' ? 'Aadhaar is required for citizens' : false,
                        pattern: {
                          value: /^[0-9]{12}$/,
                          message: 'Aadhaar must be 12 digits'
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter 12-digit Aadhaar number"
                    />
                    {errors.aadhaar && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.aadhaar.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Department for Workers */}
                {selectedRole === 'worker' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                      {...register('department', { required: selectedRole === 'worker' ? 'Department is required' : false })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select Department</option>
                      <option value="collection">Collection Services</option>
                      <option value="sorting">Sorting & Processing</option>
                      <option value="recycling">Recycling</option>
                      <option value="transportation">Transportation</option>
                    </select>
                    {errors.department && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.department.message}
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${getColorClasses(selectedUserType.color, 'bg')} ${getColorClasses(selectedUserType.color, 'hover')} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    `Create ${selectedUserType.title} Account`
                  )}
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className={`font-medium ${getColorClasses(selectedUserType.color, 'text')} hover:opacity-80`}
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;