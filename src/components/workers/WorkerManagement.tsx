import React, { useState, useEffect } from 'react';
import { apiGet, apiDelete, apiPost, apiPut } from '../../lib/api';
import {
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Award,
  CheckCircle,
  Clock,
  User,
  MapPin,
  Phone,
  HardHat,
  Calendar,
  X
} from 'lucide-react';

interface Worker {
  id: string;
  personalInfo: {
    name: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    emergencyContact: string;
  };
  employeeId: string;
  area: string;
  role: string;
  address: {
    street: string;
    city: string;
    pincode: string;
    state: string;
  };
  trainingPhases: {
    phase1: string | null;
    phase2: string | null;
    phase3: string | null;
  };
  safetyGear: {
    helmet: boolean;
    gloves: boolean;
    uniform: boolean;
    boots: boolean;
    mask: boolean;
  };
  attendance: any[];
  performanceRating: number;
  createdAt: string;
}

const WorkerManagement: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
    emergencyContact: '',
    employeeId: '',
    area: '',
    role: 'collector',
    street: '',
    city: '',
    pincode: '',
    state: '',
    ulbId: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const res = await apiGet('/workers/list');
      const list: Worker[] = res?.data?.workers || res?.data || [];
      setWorkers(list);
    } catch (error) {
      console.error('Error fetching workers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWorker = async (id: string) => {
    try {
      await apiDelete(`/workers/${id}`);
      setWorkers(prev => prev.filter(w => w.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.personalInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterRole === 'all' || worker.role === filterRole;

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredWorkers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWorkers = filteredWorkers.slice(startIndex, startIndex + itemsPerPage);

  const getTrainingStatus = (worker: Worker) => {
    const completedPhases = Object.values(worker.trainingPhases).filter(phase => phase !== null).length;
    if (completedPhases === 3) {
      return { label: 'Completed', color: 'text-green-600 bg-green-100', icon: CheckCircle };
    }
    if (completedPhases > 0) {
      return { label: 'In Progress', color: 'text-yellow-600 bg-yellow-100', icon: Clock };
    }
    return { label: 'Not Started', color: 'text-gray-600 bg-gray-100', icon: Clock };
  };

  const getSafetyGearStatus = (worker: Worker) => {
    const totalGear = Object.keys(worker.safetyGear).length;
    const availableGear = Object.values(worker.safetyGear).filter(Boolean).length;
    const percentage = (availableGear / totalGear) * 100;

    if (percentage === 100) return { label: 'Complete', color: 'text-green-600 bg-green-100' };
    if (percentage >= 80) return { label: 'Good', color: 'text-blue-600 bg-blue-100' };
    if (percentage >= 60) return { label: 'Fair', color: 'text-yellow-600 bg-yellow-100' };
    return { label: 'Poor', color: 'text-red-600 bg-red-100' };
  };

  const handleViewWorker = (worker: Worker) => {
    setSelectedWorker(worker);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedWorker(null);
    setShowModal(false);
  };

  const openCreate = () => {
    setFormError('');
    setSelectedWorker(null);
    setFormData({
      name: '', phone: '', dateOfBirth: '', gender: 'male', emergencyContact: '', employeeId: '', area: '', role: 'collector', street: '', city: '', pincode: '', state: '', ulbId: ''
    });
    setShowForm(true);
  };

  const openEdit = (w: Worker) => {
    setFormError('');
    setSelectedWorker(w);
    setFormData({
      name: w.personalInfo.name,
      phone: w.personalInfo.phone,
      dateOfBirth: w.personalInfo.dateOfBirth,
      gender: w.personalInfo.gender,
      emergencyContact: w.personalInfo.emergencyContact,
      employeeId: w.employeeId,
      area: w.area,
      role: w.role,
      street: w.address.street,
      city: w.address.city,
      pincode: w.address.pincode,
      state: w.address.state,
      ulbId: (w as any).ulbId || ''
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      if (selectedWorker) {
        await apiPut('/workers/profile', {
          workerId: selectedWorker.id,
          personalInfo: {
            name: formData.name,
            phone: formData.phone,
            emergencyContact: formData.emergencyContact
          },
          address: {
            street: formData.street,
            city: formData.city,
            pincode: formData.pincode,
            state: formData.state
          }
        });
      } else {
        await apiPost('/workers/register', {
          personalInfo: {
            name: formData.name,
            phone: formData.phone,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            emergencyContact: formData.emergencyContact
          },
          employeeId: formData.employeeId,
          area: formData.area,
          role: formData.role,
          address: {
            street: formData.street,
            city: formData.city,
            pincode: formData.pincode,
            state: formData.state
          },
          ulbId: formData.ulbId
        });
      }
      setShowForm(false);
      await fetchWorkers();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Worker Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage waste workers, training, and safety equipment
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={openCreate}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Worker
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search workers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="relative">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">All Roles</option>
              <option value="collector">Collector</option>
              <option value="supervisor">Supervisor</option>
              <option value="driver">Driver</option>
              <option value="facility_operator">Facility Operator</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {filteredWorkers.length} of {workers.length} workers
            </span>
          </div>
        </div>
      </div>

      {/* Workers Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Worker
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role & Area
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Training Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Safety Gear
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedWorkers.map((worker) => {
                const trainingStatus = getTrainingStatus(worker);
                const safetyStatus = getSafetyGearStatus(worker);
                const TrainingIcon = trainingStatus.icon;

                return (
                  <tr key={worker.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {worker.personalInfo.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {worker.employeeId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">
                        {worker.role.replace('_', ' ')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {worker.area}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trainingStatus.color}`}>
                        <TrainingIcon className="h-3 w-3 mr-1" />
                        {trainingStatus.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${safetyStatus.color}`}>
                        <HardHat className="h-3 w-3 mr-1" />
                        {safetyStatus.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${worker.performanceRating}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{worker.performanceRating}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewWorker(worker)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => openEdit(worker)} className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteWorker(worker.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(startIndex + itemsPerPage, filteredWorkers.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredWorkers.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentPage
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Worker Detail Modal */}
      {showModal && selectedWorker && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Worker Details
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedWorker.personalInfo.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedWorker.employeeId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedWorker.personalInfo.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedWorker.personalInfo.emergencyContact}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">{selectedWorker.role.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Area</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedWorker.area}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedWorker.address.street}, {selectedWorker.address.city}, {selectedWorker.address.state} - {selectedWorker.address.pincode}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Training Phases</label>
                  <div className="mt-1 grid grid-cols-3 gap-2">
                    <div className={`p-2 rounded text-center text-sm ${selectedWorker.trainingPhases.phase1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      Phase 1 {selectedWorker.trainingPhases.phase1 ? '✓' : '○'}
                    </div>
                    <div className={`p-2 rounded text-center text-sm ${selectedWorker.trainingPhases.phase2 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      Phase 2 {selectedWorker.trainingPhases.phase2 ? '✓' : '○'}
                    </div>
                    <div className={`p-2 rounded text-center text-sm ${selectedWorker.trainingPhases.phase3 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      Phase 3 {selectedWorker.trainingPhases.phase3 ? '✓' : '○'}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Safety Gear</label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {Object.entries(selectedWorker.safetyGear).map(([item, available]) => (
                      <div key={item} className="flex items-center">
                        <HardHat className={`h-4 w-4 mr-2 ${available ? 'text-green-500' : 'text-red-500'}`} />
                        <span className="text-sm capitalize">{item.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className={`ml-2 text-xs ${available ? 'text-green-600' : 'text-red-600'}`}>
                          {available ? 'Available' : 'Missing'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Performance Rating</label>
                  <div className="mt-1 flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${selectedWorker.performanceRating}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-900">{selectedWorker.performanceRating}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Edit Worker
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Update Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">{selectedWorker ? 'Edit Worker' : 'Add Worker'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            {formError && <div className="mb-3 text-sm text-red-600">{formError}</div>}
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border p-2 rounded" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              <input className="border p-2 rounded" placeholder="Phone (10 digits)" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
              <input className="border p-2 rounded" placeholder="DOB (YYYY-MM-DD)" value={formData.dateOfBirth} onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })} required={!selectedWorker} />
              <select className="border p-2 rounded" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input className="border p-2 rounded" placeholder="Emergency Contact (10 digits)" value={formData.emergencyContact} onChange={e => setFormData({ ...formData, emergencyContact: e.target.value })} required />
              {!selectedWorker && (
                <input className="border p-2 rounded" placeholder="Employee ID" value={formData.employeeId} onChange={e => setFormData({ ...formData, employeeId: e.target.value })} required />
              )}
              <input className="border p-2 rounded" placeholder="Area" value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })} required />
              <select className="border p-2 rounded" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                <option value="collector">Collector</option>
                <option value="supervisor">Supervisor</option>
                <option value="driver">Driver</option>
                <option value="facility_operator">Facility Operator</option>
              </select>
              <input className="border p-2 rounded" placeholder="Street" value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} required />
              <input className="border p-2 rounded" placeholder="City" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} required />
              <input className="border p-2 rounded" placeholder="Pincode (6 digits)" value={formData.pincode} onChange={e => setFormData({ ...formData, pincode: e.target.value })} required />
              <input className="border p-2 rounded" placeholder="State" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} required />
              {!selectedWorker && (
                <input className="border p-2 rounded" placeholder="ULB ID" value={formData.ulbId} onChange={e => setFormData({ ...formData, ulbId: e.target.value })} required />
              )}
              <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-md">Cancel</button>
                <button disabled={saving} type="submit" className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerManagement;