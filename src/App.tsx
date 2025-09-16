import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PublicWebsite from './components/website/PublicWebsite';
import RoleBasedLogin from './components/auth/RoleBasedLogin';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CitizenManagement from './components/citizens/CitizenManagement';
import WorkerManagement from './components/workers/WorkerManagement';
import GreenChampions from './components/champions/GreenChampions';
import WasteManagement from './components/waste/WasteManagement';
import CollectionManagement from './components/collection/CollectionManagement';
import FacilityManagement from './components/facilities/FacilityManagement';
import MonitoringSystem from './components/monitoring/MonitoringSystem';
import IncentivesAndPenalties from './components/incentives/IncentivesAndPenalties';
import CommunityEngagement from './components/community/CommunityEngagement';
import ULBManagement from './components/ulb/ULBManagement';
import ShopAndMarketplace from './components/shop/ShopAndMarketplace';
import AnalyticsReports from './components/analytics/AnalyticsReports';
import UserManagement from './components/admin/UserManagement';
import Layout from './components/layout/Layout';

function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin' && user.role !== 'ulb_admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicWebsite />} />
            <Route path="/login" element={<RoleBasedLogin />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Panel Routes */}
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/users" element={<UserManagement />} />
                      <Route path="/citizens" element={<CitizenManagement />} />
                      <Route path="/workers" element={<WorkerManagement />} />
                      <Route path="/champions" element={<GreenChampions />} />
                      <Route path="/waste" element={<WasteManagement />} />
                      <Route path="/collection" element={<CollectionManagement />} />
                      <Route path="/facilities" element={<FacilityManagement />} />
                      <Route path="/monitoring" element={<MonitoringSystem />} />
                      <Route path="/incentives" element={<IncentivesAndPenalties />} />
                      <Route path="/community" element={<CommunityEngagement />} />
                      <Route path="/ulb" element={<ULBManagement />} />
                      <Route path="/shop" element={<ShopAndMarketplace />} />
                      <Route path="/analytics" element={<AnalyticsReports />} />
                    </Routes>
                  </Layout>
                </AdminRoute>
              }
            />
            
            {/* Role-specific Dashboard Routes */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      {/* Role-specific routes can be added here */}
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* Unauthorized Page */}
            <Route 
              path="/unauthorized" 
              element={
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized Access</h1>
                    <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
                    <button 
                      onClick={() => window.history.back()}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;