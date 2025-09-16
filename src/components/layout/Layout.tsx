import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Menu,
  X,
  Home,
  Users,
  UserCheck,
  Award,
  Trash2,
  Truck,
  Building,
  Eye,
  Gift,
  Users2,
  Building2,
  ShoppingCart,
  BarChart3,
  LogOut,
  Settings,
  Bell,
  Search,
  UserCog
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const location = useLocation();

  // Determine base path for navigation (admin or dashboard)
  const isAdminPath = location.pathname.startsWith('/admin');
  const basePath = isAdminPath ? '/admin' : '/dashboard';
  
  const navigation = [
    { name: 'Dashboard', href: `${basePath}/`, icon: Home, current: location.pathname === `${basePath}/` || location.pathname === basePath },
    ...(user?.role === 'admin' || user?.role === 'ulb_admin' ? [
      { name: 'User Management', href: `${basePath}/users`, icon: UserCog, current: location.pathname === `${basePath}/users` }
    ] : []),
    { name: 'Citizens', href: `${basePath}/citizens`, icon: Users, current: location.pathname === `${basePath}/citizens` },
    { name: 'Workers', href: `${basePath}/workers`, icon: UserCheck, current: location.pathname === `${basePath}/workers` },
    { name: 'Green Champions', href: `${basePath}/champions`, icon: Award, current: location.pathname === `${basePath}/champions` },
    { name: 'Waste Management', href: `${basePath}/waste`, icon: Trash2, current: location.pathname === `${basePath}/waste` },
    { name: 'Collection', href: `${basePath}/collection`, icon: Truck, current: location.pathname === `${basePath}/collection` },
    { name: 'Facilities', href: `${basePath}/facilities`, icon: Building, current: location.pathname === `${basePath}/facilities` },
    { name: 'Monitoring', href: `${basePath}/monitoring`, icon: Eye, current: location.pathname === `${basePath}/monitoring` },
    { name: 'Incentives', href: `${basePath}/incentives`, icon: Gift, current: location.pathname === `${basePath}/incentives` },
    { name: 'Community', href: `${basePath}/community`, icon: Users2, current: location.pathname === `${basePath}/community` },
    { name: 'ULB Management', href: `${basePath}/ulb`, icon: Building2, current: location.pathname === `${basePath}/ulb` },
    { name: 'Shop', href: `${basePath}/shop`, icon: ShoppingCart, current: location.pathname === `${basePath}/shop` },
    { name: 'Analytics', href: `${basePath}/analytics`, icon: BarChart3, current: location.pathname === `${basePath}/analytics` },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent navigation={navigation} isAdminPath={isAdminPath} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent navigation={navigation} isAdminPath={isAdminPath} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Bell className="h-6 w-6" />
              </button>

              <div className="ml-3 relative">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-700">{user?.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

interface SidebarContentProps {
  navigation: Array<{
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    current: boolean;
  }>;
  isAdminPath: boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ navigation, isAdminPath }) => {
  return (
    <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Trash2 className="h-5 w-5 text-white" />
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-semibold text-gray-900">EcoWaste</h1>
            <p className="text-xs text-gray-500">{isAdminPath ? 'Admin Panel' : 'Dashboard'}</p>
          </div>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  item.current
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md border-l-4`}
              >
                <Icon
                  className={`${
                    item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-5 w-5`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Layout;