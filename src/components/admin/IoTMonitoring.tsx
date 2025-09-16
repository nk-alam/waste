import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  FaWifi,
  FaBatteryFull,
  FaBatteryHalf,
  FaBatteryEmpty,
  FaThermometerHalf,
  FaTint,
  FaWeight,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSync,
  FaCog,
  FaSignal,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { BsShieldCheck, BsGearFill } from 'react-icons/bs';
import { MdMemory, MdStorage, MdNetworkWifi } from 'react-icons/md';

interface IoTDevice {
  id: string;
  name: string;
  type: 'bin_sensor' | 'vehicle_tracker' | 'air_quality' | 'weather_station' | 'waste_level';
  location: string;
  status: 'online' | 'offline' | 'warning' | 'error';
  batteryLevel: number;
  signalStrength: number;
  lastSeen: Date;
  firmware: string;
  sensors: {
    temperature?: number;
    humidity?: number;
    weight?: number;
    fillLevel?: number;
    airQuality?: number;
    noise?: number;
    motion?: boolean;
  };
  networkInfo: {
    ip: string;
    protocol: 'wifi' | 'lora' | '4g' | 'ethernet';
    dataUsage: number;
  };
  alerts: string[];
}

interface SensorData {
  timestamp: string;
  temperature: number;
  humidity: number;
  weight: number;
  fillLevel: number;
  airQuality: number;
  batteryLevel: number;
}

const IoTMonitoring: React.FC = () => {
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<IoTDevice | null>(null);
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    generateDeviceData();
    generateSensorHistory();
    
    // Auto refresh data
    const interval = setInterval(() => {
      if (autoRefresh) {
        updateDeviceData();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const generateDeviceData = () => {
    const sampleDevices: IoTDevice[] = [
      {
        id: 'IOT001',
        name: 'Smart Bin - Central Plaza',
        type: 'bin_sensor',
        location: 'Connaught Place, New Delhi',
        status: 'online',
        batteryLevel: 85,
        signalStrength: 92,
        lastSeen: new Date(),
        firmware: 'v2.1.3',
        sensors: {
          temperature: 28.5,
          humidity: 65,
          weight: 45.2,
          fillLevel: 75,
          motion: false
        },
        networkInfo: {
          ip: '192.168.1.101',
          protocol: 'wifi',
          dataUsage: 2.4
        },
        alerts: []
      },
      {
        id: 'IOT002',
        name: 'Vehicle GPS Tracker - Truck Alpha',
        type: 'vehicle_tracker',
        location: 'Route A - Sector 15',
        status: 'online',
        batteryLevel: 95,
        signalStrength: 78,
        lastSeen: new Date(),
        firmware: 'v1.8.2',
        sensors: {
          temperature: 32.1,
          motion: true
        },
        networkInfo: {
          ip: '10.0.0.25',
          protocol: '4g',
          dataUsage: 5.8
        },
        alerts: []
      },
      {
        id: 'IOT003',
        name: 'Air Quality Monitor - Industrial Zone',
        type: 'air_quality',
        location: 'Industrial Area, Gurgaon',
        status: 'warning',
        batteryLevel: 45,
        signalStrength: 65,
        lastSeen: new Date(Date.now() - 300000),
        firmware: 'v3.0.1',
        sensors: {
          temperature: 35.8,
          humidity: 45,
          airQuality: 180,
          noise: 75.2
        },
        networkInfo: {
          ip: '172.16.0.15',
          protocol: 'lora',
          dataUsage: 0.8
        },
        alerts: ['High air pollution detected', 'Battery level low']
      },
      {
        id: 'IOT004',
        name: 'Weather Station - City Center',
        type: 'weather_station',
        location: 'Meteorological Center, Delhi',
        status: 'online',
        batteryLevel: 70,
        signalStrength: 88,
        lastSeen: new Date(),
        firmware: 'v2.5.0',
        sensors: {
          temperature: 29.3,
          humidity: 72,
          airQuality: 95
        },
        networkInfo: {
          ip: '203.123.45.67',
          protocol: 'ethernet',
          dataUsage: 12.5
        },
        alerts: []
      },
      {
        id: 'IOT005',
        name: 'Smart Bin - Hospital Complex',
        type: 'waste_level',
        location: 'AIIMS Hospital, Delhi',
        status: 'error',
        batteryLevel: 15,
        signalStrength: 25,
        lastSeen: new Date(Date.now() - 900000),
        firmware: 'v2.0.8',
        sensors: {
          temperature: 26.8,
          humidity: 58,
          weight: 89.7,
          fillLevel: 95
        },
        networkInfo: {
          ip: '192.168.2.203',
          protocol: 'wifi',
          dataUsage: 1.2
        },
        alerts: ['Device offline for 15 minutes', 'Critical battery level', 'Bin overflow detected']
      }
    ];
    setDevices(sampleDevices);
    setSelectedDevice(sampleDevices[0]);
  };

  const generateSensorHistory = () => {
    const data: SensorData[] = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
      data.push({
        timestamp: timestamp.toLocaleTimeString(),
        temperature: 25 + Math.random() * 10,
        humidity: 40 + Math.random() * 40,
        weight: 20 + Math.random() * 60,
        fillLevel: 30 + Math.random() * 50,
        airQuality: 50 + Math.random() * 100,
        batteryLevel: 70 + Math.random() * 30
      });
    }
    
    setSensorData(data);
  };

  const updateDeviceData = () => {
    setDevices(prevDevices => 
      prevDevices.map(device => ({
        ...device,
        batteryLevel: Math.max(0, device.batteryLevel - Math.random() * 2),
        signalStrength: Math.max(30, Math.min(100, device.signalStrength + Math.random() * 10 - 5)),
        lastSeen: device.status === 'online' ? new Date() : device.lastSeen,
        sensors: {
          ...device.sensors,
          temperature: device.sensors.temperature ? device.sensors.temperature + Math.random() * 4 - 2 : undefined,
          humidity: device.sensors.humidity ? Math.max(0, Math.min(100, device.sensors.humidity + Math.random() * 6 - 3)) : undefined,
          weight: device.sensors.weight ? Math.max(0, device.sensors.weight + Math.random() * 5 - 2.5) : undefined,
          fillLevel: device.sensors.fillLevel ? Math.max(0, Math.min(100, device.sensors.fillLevel + Math.random() * 3 - 1.5)) : undefined
        }
      }))
    );
  };

  const refreshData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateDeviceData();
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'offline': return 'text-gray-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <FaCheckCircle className="h-4 w-4" />;
      case 'warning': return <FaExclamationTriangle className="h-4 w-4" />;
      case 'error': return <FaExclamationTriangle className="h-4 w-4" />;
      default: return <BsShieldCheck className="h-4 w-4" />;
    }
  };

  const getBatteryIcon = (level: number) => {
    if (level > 60) return <FaBatteryFull className="h-4 w-4 text-green-500" />;
    if (level > 30) return <FaBatteryHalf className="h-4 w-4 text-yellow-500" />;
    return <FaBatteryEmpty className="h-4 w-4 text-red-500" />;
  };

  const getProtocolIcon = (protocol: string) => {
    switch (protocol) {
      case 'wifi': return <FaWifi className="h-4 w-4" />;
      case '4g': return <FaSignal className="h-4 w-4" />;
      case 'ethernet': return <MdNetworkWifi className="h-4 w-4" />;
      default: return <FaWifi className="h-4 w-4" />;
    }
  };

  const filteredDevices = devices.filter(device => {
    if (filter === 'all') return true;
    if (filter === 'alerts') return device.alerts.length > 0;
    return device.status === filter;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">IoT Device Monitoring</h1>
        <p className="text-gray-600">Real-time monitoring of IoT sensors and connected devices</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          { 
            label: 'Total Devices', 
            value: devices.length, 
            icon: MdMemory, 
            color: 'blue',
            subtitle: `${devices.filter(d => d.status === 'online').length} online`
          },
          { 
            label: 'Active Alerts', 
            value: devices.reduce((sum, d) => sum + d.alerts.length, 0), 
            icon: FaExclamationTriangle, 
            color: 'red',
            subtitle: `${devices.filter(d => d.status === 'error').length} critical`
          },
          { 
            label: 'Avg Battery', 
            value: `${(devices.reduce((sum, d) => sum + d.batteryLevel, 0) / devices.length).toFixed(1)}%`, 
            icon: FaBatteryFull, 
            color: 'green',
            subtitle: `${devices.filter(d => d.batteryLevel < 30).length} low battery`
          },
          { 
            label: 'Data Usage', 
            value: `${devices.reduce((sum, d) => sum + d.networkInfo.dataUsage, 0).toFixed(1)} GB`, 
            icon: MdStorage, 
            color: 'purple',
            subtitle: 'This month'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
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
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Devices ({devices.length})</option>
              <option value="online">Online ({devices.filter(d => d.status === 'online').length})</option>
              <option value="offline">Offline ({devices.filter(d => d.status === 'offline').length})</option>
              <option value="warning">Warning ({devices.filter(d => d.status === 'warning').length})</option>
              <option value="error">Error ({devices.filter(d => d.status === 'error').length})</option>
              <option value="alerts">With Alerts ({devices.filter(d => d.alerts.length > 0).length})</option>
            </select>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Auto Refresh</span>
            </label>
          </div>

          <button
            onClick={refreshData}
            disabled={isLoading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <FaSync className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Connected Devices</h3>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredDevices.map((device) => (
                <div
                  key={device.id}
                  onClick={() => setSelectedDevice(device)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedDevice?.id === device.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{device.name}</h4>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)} bg-gray-100`}>
                      {getStatusIcon(device.status)}
                      {device.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{device.id}</span>
                    <span className="capitalize">{device.type.replace('_', ' ')}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getBatteryIcon(device.batteryLevel)}
                      <span className="text-xs">{device.batteryLevel}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaWifi className={`h-3 w-3 ${device.signalStrength > 70 ? 'text-green-500' : device.signalStrength > 40 ? 'text-yellow-500' : 'text-red-500'}`} />
                      <span className="text-xs">{device.signalStrength}%</span>
                    </div>
                  </div>

                  {device.alerts.length > 0 && (
                    <div className="mt-2 text-xs text-red-600">
                      {device.alerts.length} alert{device.alerts.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Details and Charts */}
        <div className="lg:col-span-2">
          {selectedDevice ? (
            <div className="space-y-6">
              {/* Device Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{selectedDevice.name}</h3>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                      <FaCog className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Device Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Device ID:</span>
                        <span className="font-medium">{selectedDevice.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium capitalize">{selectedDevice.type.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Firmware:</span>
                        <span className="font-medium">{selectedDevice.firmware}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Seen:</span>
                        <span className="font-medium">{selectedDevice.lastSeen.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Network Info */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Network Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Protocol:</span>
                        <div className="flex items-center gap-1">
                          {getProtocolIcon(selectedDevice.networkInfo.protocol)}
                          <span className="font-medium uppercase">{selectedDevice.networkInfo.protocol}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IP Address:</span>
                        <span className="font-medium">{selectedDevice.networkInfo.ip}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Data Usage:</span>
                        <span className="font-medium">{selectedDevice.networkInfo.dataUsage} GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Signal Strength:</span>
                        <span className="font-medium">{selectedDevice.signalStrength}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sensor Readings */}
                {Object.keys(selectedDevice.sensors).length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Current Sensor Readings</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedDevice.sensors.temperature && (
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <FaThermometerHalf className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900">{selectedDevice.sensors.temperature.toFixed(1)}°C</div>
                          <div className="text-xs text-gray-600">Temperature</div>
                        </div>
                      )}
                      {selectedDevice.sensors.humidity && (
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <FaTint className="h-6 w-6 text-green-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900">{selectedDevice.sensors.humidity.toFixed(1)}%</div>
                          <div className="text-xs text-gray-600">Humidity</div>
                        </div>
                      )}
                      {selectedDevice.sensors.weight && (
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <FaWeight className="h-6 w-6 text-yellow-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900">{selectedDevice.sensors.weight.toFixed(1)} kg</div>
                          <div className="text-xs text-gray-600">Weight</div>
                        </div>
                      )}
                      {selectedDevice.sensors.fillLevel && (
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <FaMapMarkerAlt className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900">{selectedDevice.sensors.fillLevel.toFixed(1)}%</div>
                          <div className="text-xs text-gray-600">Fill Level</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Alerts */}
                {selectedDevice.alerts.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Active Alerts</h4>
                    <div className="space-y-2">
                      {selectedDevice.alerts.map((alert, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <FaExclamationTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                          <span className="text-sm text-red-800">{alert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Historical Data Charts */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">24-Hour Sensor History</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Temperature & Humidity */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Temperature & Humidity</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={sensorData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="humidity" stroke="#22c55e" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Fill Level & Weight */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Fill Level & Weight</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={sensorData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="fillLevel" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="weight" stackId="2" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Battery Level */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Battery Level Trend</h4>
                  <ResponsiveContainer width="100%" height={150}>
                    <AreaChart data={sensorData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="batteryLevel" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <MdMemory className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Device</h3>
              <p className="text-gray-600">Choose a device from the list to view detailed information and sensor data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IoTMonitoring;