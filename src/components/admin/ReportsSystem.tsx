import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
  FaFileAlt,
  FaDownload,
  FaCalendarAlt,
  FaFilter,
  FaChartBar,
  FaFileExcel,
  FaFilePdf,
  FaFileCsv,
  FaPrint,
  FaShare,
  FaCloudDownloadAlt
} from 'react-icons/fa';
import { BsFileEarmarkSpreadsheet } from 'react-icons/bs';
import { MdSchedule, MdAutoGraph } from 'react-icons/md';

interface ReportData {
  id: string;
  name: string;
  type: 'waste_collection' | 'route_efficiency' | 'user_activity' | 'facility_performance' | 'financial';
  description: string;
  lastGenerated: Date;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  status: 'ready' | 'generating' | 'scheduled';
  size: string;
  downloads: number;
}

interface ChartData {
  wasteCollection: Array<{ month: string; collected: number; recycled: number; cost: number }>;
  routeEfficiency: Array<{ route: string; efficiency: number; distance: number; fuel: number }>;
  userActivity: Array<{ date: string; logins: number; actions: number; newUsers: number }>;
  facilityData: Array<{ facility: string; processed: number; efficiency: number; uptime: number }>;
}

const ReportsSystem: React.FC = () => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [selectedReport, setSelectedReport] = useState<string>('waste_collection');
  const [dateRange, setDateRange] = useState<string>('last_month');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    generateReports();
    generateChartData();
  }, []);

  const generateReports = () => {
    const mockReports: ReportData[] = [
      {
        id: 'WC001',
        name: 'Waste Collection Summary',
        type: 'waste_collection',
        description: 'Comprehensive overview of waste collection activities, volumes, and efficiency metrics',
        lastGenerated: new Date(Date.now() - 86400000),
        frequency: 'daily',
        status: 'ready',
        size: '2.4 MB',
        downloads: 156
      },
      {
        id: 'RE002',
        name: 'Route Efficiency Analysis',
        type: 'route_efficiency',
        description: 'Detailed analysis of collection routes, optimization opportunities, and fuel consumption',
        lastGenerated: new Date(Date.now() - 172800000),
        frequency: 'weekly',
        status: 'ready',
        size: '1.8 MB',
        downloads: 89
      },
      {
        id: 'UA003',
        name: 'User Activity Report',
        type: 'user_activity',
        description: 'User engagement metrics, login patterns, and feature utilization statistics',
        lastGenerated: new Date(Date.now() - 259200000),
        frequency: 'weekly',
        status: 'generating',
        size: '956 KB',
        downloads: 234
      },
      {
        id: 'FP004',
        name: 'Facility Performance Dashboard',
        type: 'facility_performance',
        description: 'Processing facility metrics, throughput analysis, and maintenance schedules',
        lastGenerated: new Date(Date.now() - 604800000),
        frequency: 'monthly',
        status: 'ready',
        size: '3.2 MB',
        downloads: 67
      },
      {
        id: 'FR005',
        name: 'Financial Summary',
        type: 'financial',
        description: 'Cost analysis, budget tracking, revenue from recycling, and operational expenses',
        lastGenerated: new Date(Date.now() - 2592000000),
        frequency: 'monthly',
        status: 'scheduled',
        size: '1.1 MB',
        downloads: 45
      }
    ];
    setReports(mockReports);
  };

  const generateChartData = () => {
    const data: ChartData = {
      wasteCollection: [
        { month: 'Jan', collected: 15420, recycled: 8250, cost: 125000 },
        { month: 'Feb', collected: 16200, recycled: 8800, cost: 128000 },
        { month: 'Mar', collected: 15800, recycled: 8600, cost: 127000 },
        { month: 'Apr', collected: 17100, recycled: 9200, cost: 132000 },
        { month: 'May', collected: 16800, recycled: 9000, cost: 130000 },
        { month: 'Jun', collected: 18200, recycled: 9800, cost: 135000 }
      ],
      routeEfficiency: [
        { route: 'Route A', efficiency: 92, distance: 45.2, fuel: 280 },
        { route: 'Route B', efficiency: 88, distance: 38.7, fuel: 310 },
        { route: 'Route C', efficiency: 95, distance: 52.1, fuel: 295 },
        { route: 'Route D', efficiency: 85, distance: 41.3, fuel: 330 },
        { route: 'Route E', efficiency: 90, distance: 47.8, fuel: 300 }
      ],
      userActivity: [
        { date: 'Mon', logins: 1250, actions: 4800, newUsers: 45 },
        { date: 'Tue', logins: 1180, actions: 4200, newUsers: 38 },
        { date: 'Wed', logins: 1420, actions: 5200, newUsers: 52 },
        { date: 'Thu', logins: 1350, actions: 4900, newUsers: 41 },
        { date: 'Fri', logins: 1280, actions: 4600, newUsers: 47 },
        { date: 'Sat', logins: 980, actions: 3200, newUsers: 29 },
        { date: 'Sun', logins: 850, actions: 2800, newUsers: 23 }
      ],
      facilityData: [
        { facility: 'Central Processing', processed: 2500, efficiency: 94, uptime: 98 },
        { facility: 'North Recycling', processed: 1800, efficiency: 88, uptime: 95 },
        { facility: 'South Composting', processed: 1200, efficiency: 92, uptime: 97 },
        { facility: 'East Treatment', processed: 900, efficiency: 85, uptime: 93 },
        { facility: 'West Recovery', processed: 1500, efficiency: 90, uptime: 96 }
      ]
    };
    setChartData(data);
  };

  const generateReport = async (reportId: string, format: 'pdf' | 'excel' | 'csv') => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update report status and download count
    setReports(prev => 
      prev.map(report => 
        report.id === reportId 
          ? { 
              ...report, 
              lastGenerated: new Date(),
              downloads: report.downloads + 1,
              status: 'ready' as const
            }
          : report
      )
    );
    
    setIsGenerating(false);
    
    // Simulate file download
    const report = reports.find(r => r.id === reportId);
    if (report) {
      alert(`${report.name} has been generated and downloaded as ${format.toUpperCase()}`);
    }
  };

  const scheduleReport = (reportId: string, frequency: string, time: string) => {
    setReports(prev => 
      prev.map(report => 
        report.id === reportId 
          ? { ...report, frequency: frequency as any, status: 'scheduled' as const }
          : report
      )
    );
    setShowScheduleModal(false);
    alert('Report scheduled successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-600 bg-green-100';
      case 'generating': return 'text-yellow-600 bg-yellow-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'waste_collection': return FaChartBar;
      case 'route_efficiency': return MdAutoGraph;
      case 'user_activity': return FaFileAlt;
      case 'facility_performance': return BsFileEarmarkSpreadsheet;
      case 'financial': return FaFileExcel;
      default: return FaFileAlt;
    }
  };

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate comprehensive reports and export data for analysis</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Total Reports', value: reports.length, icon: FaFileAlt, color: 'blue' },
          { label: 'Ready Reports', value: reports.filter(r => r.status === 'ready').length, icon: FaCloudDownloadAlt, color: 'green' },
          { label: 'Total Downloads', value: reports.reduce((sum, r) => sum + r.downloads, 0), icon: FaDownload, color: 'purple' },
          { label: 'Scheduled Reports', value: reports.filter(r => r.status === 'scheduled').length, icon: MdSchedule, color: 'orange' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="waste_collection">Waste Collection</option>
              <option value="route_efficiency">Route Efficiency</option>
              <option value="user_activity">User Activity</option>
              <option value="facility_performance">Facility Performance</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="last_week">Last Week</option>
              <option value="last_month">Last Month</option>
              <option value="last_quarter">Last Quarter</option>
              <option value="last_year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowScheduleModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <MdSchedule className="h-4 w-4" />
              Schedule Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Available Reports</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {reports.map((report) => {
                const IconComponent = getTypeIcon(report.type);
                return (
                  <div key={report.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <IconComponent className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{report.name}</h4>
                          <p className="text-xs text-gray-500">{report.id}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-3">{report.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>Size: {report.size}</span>
                      <span>Downloads: {report.downloads}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>Frequency: {report.frequency}</span>
                      <span>Updated: {report.lastGenerated.toLocaleDateString()}</span>
                    </div>

                    {report.status === 'ready' && (
                      <div className="flex gap-2">
                        {['pdf', 'excel', 'csv'].map((format) => (
                          <button
                            key={format}
                            onClick={() => generateReport(report.id, format as any)}
                            disabled={isGenerating}
                            className="flex-1 bg-green-600 text-white py-1 px-2 rounded text-xs hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                          >
                            {format === 'pdf' && <FaFilePdf className="h-3 w-3" />}
                            {format === 'excel' && <FaFileExcel className="h-3 w-3" />}
                            {format === 'csv' && <FaFileCsv className="h-3 w-3" />}
                            {format.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Charts and Visualizations */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {chartData && (
              <>
                {selectedReport === 'waste_collection' && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Waste Collection Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData.wasteCollection}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="collected" fill="#22c55e" name="Collected (tons)" />
                        <Bar dataKey="recycled" fill="#3b82f6" name="Recycled (tons)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {selectedReport === 'route_efficiency' && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Route Efficiency Analysis</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData.routeEfficiency}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="route" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="efficiency" stroke="#22c55e" strokeWidth={3} name="Efficiency %" />
                        <Line type="monotone" dataKey="distance" stroke="#3b82f6" strokeWidth={3} name="Distance (km)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {selectedReport === 'user_activity' && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">User Activity Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData.userActivity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="logins" fill="#8b5cf6" name="Daily Logins" />
                        <Bar dataKey="actions" fill="#f59e0b" name="User Actions" />
                        <Bar dataKey="newUsers" fill="#22c55e" name="New Users" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {selectedReport === 'facility_performance' && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Facility Performance Metrics</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={chartData.facilityData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="processed"
                            label={({ facility, processed }) => `${facility}: ${processed}t`}
                          >
                            {chartData.facilityData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartData.facilityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="facility" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="efficiency" fill="#22c55e" name="Efficiency %" />
                          <Bar dataKey="uptime" fill="#3b82f6" name="Uptime %" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Export Options */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Bulk Export Options</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { type: 'All Reports', icon: FaFileAlt, color: 'blue' },
                  { type: 'Data Export', icon: FaFileCsv, color: 'green' },
                  { type: 'Print Package', icon: FaPrint, color: 'purple' },
                  { type: 'Share Reports', icon: FaShare, color: 'orange' }
                ].map((option, index) => (
                  <button
                    key={index}
                    className={`p-4 border-2 border-gray-200 rounded-lg hover:border-${option.color}-500 hover:bg-${option.color}-50 transition-colors text-center`}
                    onClick={() => alert(`${option.type} functionality coming soon!`)}
                  >
                    <option.icon className={`h-8 w-8 text-${option.color}-600 mx-auto mb-2`} />
                    <p className="text-sm font-medium text-gray-900">{option.type}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Schedule Report</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              scheduleReport('WC001', 'weekly', '09:00');
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500">
                    <option>Waste Collection Summary</option>
                    <option>Route Efficiency Analysis</option>
                    <option>User Activity Report</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    defaultValue="09:00"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Schedule
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-900 font-medium">Generating Report...</p>
            <p className="text-gray-600 text-sm">This may take a few moments</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsSystem;