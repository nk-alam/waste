import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  FaChartLine,
  FaRecycle,
  FaTruck,
  FaUsers,
  FaMapMarkerAlt,
  FaDownload,
  FaFilter,
  FaCalendarAlt
} from 'react-icons/fa';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { MdDashboard } from 'react-icons/md';

interface AnalyticsData {
  wasteCollection: Array<{ date: string; collected: number; recycled: number; organic: number; general: number }>;
  routeEfficiency: Array<{ route: string; efficiency: number; distance: number; time: number }>;
  binStatus: Array<{ status: string; count: number; percentage: number }>;
  monthlyTrends: Array<{ month: string; collection: number; recycling: number; cost: number }>;
  facilityPerformance: Array<{ facility: string; processed: number; efficiency: number }>;
  userEngagement: Array<{ userType: string; active: number; total: number }>;
}

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    generateAnalyticsData();
  }, [timeRange]);

  const generateAnalyticsData = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const data: AnalyticsData = {
        wasteCollection: generateCollectionData(),
        routeEfficiency: generateRouteData(),
        binStatus: generateBinStatusData(),
        monthlyTrends: generateMonthlyTrends(),
        facilityPerformance: generateFacilityData(),
        userEngagement: generateUserEngagementData()
      };
      
      setAnalyticsData(data);
      setIsLoading(false);
    }, 1000);
  };

  const generateCollectionData = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString(),
        collected: Math.floor(Math.random() * 1000) + 500,
        recycled: Math.floor(Math.random() * 300) + 200,
        organic: Math.floor(Math.random() * 200) + 100,
        general: Math.floor(Math.random() * 400) + 200
      });
    }
    
    return data;
  };

  const generateRouteData = () => [
    { route: 'Route A', efficiency: 92, distance: 45.2, time: 3.5 },
    { route: 'Route B', efficiency: 88, distance: 38.7, time: 4.2 },
    { route: 'Route C', efficiency: 95, distance: 52.1, time: 3.8 },
    { route: 'Route D', efficiency: 85, distance: 41.3, time: 4.5 },
    { route: 'Route E', efficiency: 90, distance: 47.8, time: 3.9 }
  ];

  const generateBinStatusData = () => [
    { status: 'Empty', count: 45, percentage: 30 },
    { status: 'Low', count: 38, percentage: 25 },
    { status: 'Medium', count: 32, percentage: 21 },
    { status: 'High', count: 25, percentage: 17 },
    { status: 'Full', count: 10, percentage: 7 }
  ];

  const generateMonthlyTrends = () => [
    { month: 'Jan', collection: 15420, recycling: 8250, cost: 125000 },
    { month: 'Feb', collection: 16200, recycling: 8800, cost: 128000 },
    { month: 'Mar', collection: 15800, recycling: 8600, cost: 127000 },
    { month: 'Apr', collection: 17100, recycling: 9200, cost: 132000 },
    { month: 'May', collection: 16800, recycling: 9000, cost: 130000 },
    { month: 'Jun', collection: 18200, recycling: 9800, cost: 135000 }
  ];

  const generateFacilityData = () => [
    { facility: 'Central Processing', processed: 2500, efficiency: 94 },
    { facility: 'North Recycling', processed: 1800, efficiency: 88 },
    { facility: 'South Composting', processed: 1200, efficiency: 92 },
    { facility: 'East Treatment', processed: 900, efficiency: 85 },
    { facility: 'West Recovery', processed: 1500, efficiency: 90 }
  ];

  const generateUserEngagementData = () => [
    { userType: 'Citizens', active: 12500, total: 15000 },
    { userType: 'Workers', active: 285, total: 320 },
    { userType: 'Champions', active: 145, total: 180 },
    { userType: 'Supervisors', active: 28, total: 35 },
    { userType: 'ULB Admins', active: 12, total: 15 }
  ];

  const exportData = (format: 'csv' | 'pdf' | 'excel') => {
    // Simulate export functionality
    alert(`Exporting analytics data as ${format.toUpperCase()}...`);
  };

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (isLoading || !analyticsData) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  const totalWasteCollected = analyticsData.wasteCollection.reduce((sum, item) => sum + item.collected, 0);
  const avgRecyclingRate = (analyticsData.wasteCollection.reduce((sum, item) => sum + item.recycled, 0) / totalWasteCollected * 100);
  const routeEfficiencyAvg = analyticsData.routeEfficiency.reduce((sum, item) => sum + item.efficiency, 0) / analyticsData.routeEfficiency.length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive waste management analytics and insights</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>

            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="overview">Overview</option>
              <option value="collection">Waste Collection</option>
              <option value="routes">Route Efficiency</option>
              <option value="bins">Bin Status</option>
              <option value="facilities">Facilities</option>
              <option value="users">User Engagement</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => exportData('csv')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaDownload className="h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={() => exportData('pdf')}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <FaDownload className="h-4 w-4" />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: 'Total Waste Collected',
            value: `${(totalWasteCollected / 1000).toFixed(1)}K kg`,
            change: '+12.5%',
            trend: 'up',
            icon: FaRecycle,
            color: 'green'
          },
          {
            title: 'Recycling Rate',
            value: `${avgRecyclingRate.toFixed(1)}%`,
            change: '+5.2%',
            trend: 'up',
            icon: FaChartLine,
            color: 'blue'
          },
          {
            title: 'Route Efficiency',
            value: `${routeEfficiencyAvg.toFixed(1)}%`,
            change: '+2.8%',
            trend: 'up',
            icon: FaTruck,
            color: 'purple'
          },
          {
            title: 'Active Users',
            value: '12.9K',
            change: '+8.1%',
            trend: 'up',
            icon: FaUsers,
            color: 'orange'
          }
        ].map((kpi, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  {kpi.trend === 'up' ? (
                    <BsArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <BsArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last period</span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-${kpi.color}-100`}>
                <kpi.icon className={`h-6 w-6 text-${kpi.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Waste Collection Trends */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Waste Collection Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.wasteCollection}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="collected" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
              <Area type="monotone" dataKey="recycled" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="organic" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Route Efficiency */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Route Efficiency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.routeEfficiency}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="route" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="efficiency" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Bin Status Distribution */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Bin Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analyticsData.binStatus}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                label={({ status, percentage }) => `${status} (${percentage}%)`}
              >
                {analyticsData.binStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Trends */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Performance Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analyticsData.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="collection" stroke="#22c55e" strokeWidth={3} />
              <Line type="monotone" dataKey="recycling" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Facility Performance */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Facility Performance</h3>
          <div className="space-y-4">
            {analyticsData.facilityPerformance.map((facility, index) => (
              <div key={facility.facility} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{facility.facility}</h4>
                  <p className="text-sm text-gray-600">{facility.processed} tons processed</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{facility.efficiency}%</div>
                  <div className="text-xs text-gray-500">Efficiency</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* User Engagement */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">User Engagement</h3>
          <div className="space-y-4">
            {analyticsData.userEngagement.map((user, index) => (
              <div key={user.userType} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">{user.userType}</span>
                  <span className="text-sm text-gray-500">{user.active}/{user.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                    style={{ width: `${(user.active / user.total) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {((user.active / user.total) * 100).toFixed(1)}% active
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Real-time Alerts */}
      <motion.div
        className="mt-6 bg-white rounded-lg shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Real-time Alerts & Notifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { type: 'warning', message: '5 bins are at overflow capacity', time: '2 min ago', color: 'yellow' },
            { type: 'error', message: 'Vehicle VEH003 requires maintenance', time: '5 min ago', color: 'red' },
            { type: 'success', message: 'Route A completed ahead of schedule', time: '8 min ago', color: 'green' },
            { type: 'info', message: 'New recycling facility online', time: '15 min ago', color: 'blue' },
            { type: 'warning', message: 'Weather alert: Heavy rain expected', time: '20 min ago', color: 'yellow' },
            { type: 'success', message: 'Daily collection target achieved', time: '1 hour ago', color: 'green' }
          ].map((alert, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 border-${alert.color}-500 bg-${alert.color}-50`}>
              <div className="flex items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;