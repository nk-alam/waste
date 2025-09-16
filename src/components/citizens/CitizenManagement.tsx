import React, { useState, useEffect } from 'react';
import { apiGet, apiDelete, apiPost, apiPut } from '../../lib/api';
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  X
} from 'lucide-react';

interface Citizen {
  id: string;
  personalInfo: {
    name: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
  };
  aadhaar: string;
  address: {
    street: string;
    city: string;
    pincode: string;
    state: string;
    ward?: string;
  };
  trainingStatus: {
    completed: boolean;
    modules: string[];
    certificate: string | null;
    enrolledAt: string | null;
    completedAt: string | null;
  };
  segregationCompliance: {
    score: number;
    violations: any[];
    lastAssessment: string | null;
  };
  rewardPoints: number;
  penaltyHistory: any[];
  createdAt: string;
}

const CitizenManagement: React.FC = () => {
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
    aadhaar: '',
    street: '',
    city: '',
    pincode: '',
    state: '',
    ward: '',
    ulbId: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchCitizens();
  }, []);

  const fetchCitizens = async () => {
    try {
      setLoading(true);
      const res = await apiGet('/citizens');
      const list: Citizen[] = res?.data?.citizens || res?.data || [];
      setCitizens(list);
    } catch (error) {
      console.error('Error fetching citizens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCitizen = async (id: string) => {
    try {
      await apiDelete(`/citizens/${id}`);
      setCitizens(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const filteredCitizens = citizens.filter(citizen => {
    const matchesSearch = citizen.personalInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      citizen.aadhaar.includes(searchQuery) ||
      citizen.address.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === 'all' ||
      (filterStatus === 'trained' && citizen.trainingStatus.completed) ||
      (filterStatus === 'untrained' && !citizen.trainingStatus.completed) ||
      (filterStatus === 'compliant' && citizen.segregationCompliance.score >= 70) ||
      (filterStatus === 'non-compliant' && citizen.segregationCompliance.score < 70);

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredCitizens.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCitizens = filteredCitizens.slice(startIndex, startIndex + itemsPerPage);

  const getComplianceStatus = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-600 bg-green-100' };
    if (score >= 70) return { label: 'Good', color: 'text-blue-600 bg-blue-100' };
    if (score >= 50) return { label: 'Fair', color: 'text-yellow-600 bg-yellow-100' };
    return { label: 'Poor', color: 'text-red-600 bg-red-100' };
  };

  const getTrainingStatus = (citizen: Citizen) => {
    if (citizen.trainingStatus.completed) {
      return { label: 'Completed', color: 'text-green-600 bg-green-100', icon: CheckCircle };
    }
    if (citizen.trainingStatus.modules.length > 0) {
      return { label: 'In Progress', color: 'text-yellow-600 bg-yellow-100', icon: Clock };
    }
    return { label: 'Not Started', color: 'text-gray-600 bg-gray-100', icon: Clock };
  };

  const handleViewCitizen = (citizen: Citizen) => {
    setSelectedCitizen(citizen);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCitizen(null);
    setShowModal(false);
  };

  const openCreate = () => {
    setFormError('');
    setSelectedCitizen(null);
    setFormData({
      name: '', phone: '', dateOfBirth: '', gender: 'male', aadhaar: '',
      street: '', city: '', pincode: '', state: '', ward: '', ulbId: ''
    });
    setShowForm(true);
  };

  const openEdit = (c: Citizen) => {
    setFormError('');
    setSelectedCitizen(c);
    setFormData({
      name: c.personalInfo.name,
      phone: c.personalInfo.phone,
      dateOfBirth: c.personalInfo.dateOfBirth,
      gender: c.personalInfo.gender,
      aadhaar: c.aadhaar,
      street: c.address.street,
      city: c.address.city,
      pincode: c.address.pincode,
      state: c.address.state,
      ward: c.address.ward || '',
      ulbId: (c as any).ulbId || ''
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      if (selectedCitizen) {
        // Update profile
        await apiPut('/citizens/profile', {
          citizenId: selectedCitizen.id,
          personalInfo: {
            name: formData.name,
            phone: formData.phone,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender
          },
          address: {
            street: formData.street,
            city: formData.city,
            pincode: formData.pincode,
            state: formData.state,
            ward: formData.ward || undefined
          }
        });
      } else {
        // Create
        await apiPost('/citizens/register', {
          personalInfo: {
            name: formData.name,
            phone: formData.phone,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender
          },
          aadhaar: formData.aadhaar,
          address: {
            street: formData.street,
            city: formData.city,
            pincode: formData.pincode,
            state: formData.state,
            ward: formData.ward || undefined
          },
          ulbId: formData.ulbId
        });
      }
      setShowForm(false);
      await fetchCitizens();
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
            Citizen Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage citizen registrations, training, and compliance
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
            Add Citizen
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
              placeholder="Search citizens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">All Citizens</option>
              <option value="trained">Trained</option>
              <option value="untrained">Untrained</option>
              <option value="compliant">Compliant</option>
              <option value="non-compliant">Non-Compliant</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {filteredCitizens.length} of {citizens.length} citizens
            </span>
          </div>
        </div>
      </div>

      {/* Citizens Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Citizen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Training Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compliance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedCitizens.map((citizen) => {
                const complianceStatus = getComplianceStatus(citizen.segregationCompliance.score);
                const trainingStatus = getTrainingStatus(citizen);
                const TrainingIcon = trainingStatus.icon;

                return (
                  <tr key={citizen.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {citizen.personalInfo.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Aadhaar: {citizen.aadhaar}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1 text-gray-400" />
                          {citizen.personalInfo.phone}
                        </div>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {citizen.address.city}, {citizen.address.state}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trainingStatus.color}`}>
                        <TrainingIcon className="h-3 w-3 mr-1" />
                        {trainingStatus.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${complianceStatus.color}`}>
                          {complianceStatus.label}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({citizen.segregationCompliance.score}%)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1 text-yellow-500" />
                        {citizen.rewardPoints}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewCitizen(citizen)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => openEdit(citizen)} className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteCitizen(citizen.id)} className="text-red-600 hover:text-red-900">
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
                    {Math.min(startIndex + itemsPerPage, filteredCitizens.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredCitizens.length}</span> results
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

      {/* Citizen Detail Modal */}
      {showModal && selectedCitizen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Citizen Details
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
                    <p className="mt-1 text-sm text-gray-900">{selectedCitizen.personalInfo.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCitizen.personalInfo.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Aadhaar</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCitizen.aadhaar}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">{selectedCitizen.personalInfo.gender}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedCitizen.address.street}, {selectedCitizen.address.city}, {selectedCitizen.address.state} - {selectedCitizen.address.pincode}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Training Status</label>
                    <div className="mt-1">
                      {getTrainingStatus(selectedCitizen).label}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Compliance Score</label>
                    <div className="mt-1">
                      {selectedCitizen.segregationCompliance.score}%
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Reward Points</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedCitizen.rewardPoints}</p>
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
                  Edit Citizen
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
              <h3 className="text-lg font-medium text-gray-900">{selectedCitizen ? 'Edit Citizen' : 'Add Citizen'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            {formError && <div className="mb-3 text-sm text-red-600">{formError}</div>}
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border p-2 rounded" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              <input className="border p-2 rounded" placeholder="Phone (10 digits)" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
              <input className="border p-2 rounded" placeholder="DOB (YYYY-MM-DD)" value={formData.dateOfBirth} onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })} required />
              <select className="border p-2 rounded" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {!selectedCitizen && (
                <input className="border p-2 rounded" placeholder="Aadhaar (12 digits)" value={formData.aadhaar} onChange={e => setFormData({ ...formData, aadhaar: e.target.value })} required />
              )}
              <input className="border p-2 rounded" placeholder="Street" value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} required />
              <input className="border p-2 rounded" placeholder="City" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} required />
              <input className="border p-2 rounded" placeholder="Pincode (6 digits)" value={formData.pincode} onChange={e => setFormData({ ...formData, pincode: e.target.value })} required />
              <input className="border p-2 rounded" placeholder="State" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} required />
              <input className="border p-2 rounded" placeholder="Ward (optional)" value={formData.ward} onChange={e => setFormData({ ...formData, ward: e.target.value })} />
              {!selectedCitizen && (
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

export default CitizenManagement;