import React, { useState } from 'react';
import { 
  Users, 
  Scissors, 
  Calendar, 
  BarChart3, 
  Plus,
  Edit,
  Trash2,
  Star,
  LogOut
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useAppointments } from '../hooks/useAppointments';
import { useAuth } from '../hooks/useAuth';

const AdminDashboard: React.FC = () => {
  const { appointments, loading } = useAppointments();
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'barbers' | 'services' | 'appointments' | 'analytics'>('analytics');

  const mockBarbers = [
    { id: '1', name: 'Rajesh Kumar', photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', speciality: 'Fade Expert', available: '9 AM - 6 PM', rating: 4.8 },
    { id: '2', name: 'Amit Singh', photo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150', speciality: 'Beard Styling', available: '10 AM - 7 PM', rating: 4.6 },
    { id: '3', name: 'Vikram Sharma', photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', speciality: 'Traditional Shaves', available: '8 AM - 5 PM', rating: 4.9 },
  ];

  const mockServices = [
    { id: '1', title: 'Classic Fade', price: 150, duration: 30 },
    { id: '2', title: 'Beard Trim', price: 100, duration: 20 },
    { id: '3', title: 'Premium Cut', price: 200, duration: 45 },
    { id: '4', title: 'Hair Wash', price: 80, duration: 15 },
    { id: '5', title: 'Styling', price: 120, duration: 25 },
  ];

  // Mock analytics data
  const analyticsData = {
    dailyBookings: [
      { day: 'Mon', bookings: 12, revenue: 2400 },
      { day: 'Tue', bookings: 19, revenue: 3200 },
      { day: 'Wed', bookings: 15, revenue: 2800 },
      { day: 'Thu', bookings: 22, revenue: 4100 },
      { day: 'Fri', bookings: 28, revenue: 5200 },
      { day: 'Sat', bookings: 35, revenue: 6800 },
      { day: 'Sun', bookings: 18, revenue: 3600 },
    ],
    serviceDistribution: [
      { name: 'Fade Cuts', value: 35, color: '#4f46e5' },
      { name: 'Beard Trims', value: 25, color: '#f59e0b' },
      { name: 'Premium Cuts', value: 20, color: '#10b981' },
      { name: 'Styling', value: 12, color: '#ef4444' },
      { name: 'Others', value: 8, color: '#8b5cf6' },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel – BarberBook</h1>
              <p className="text-sm text-gray-600">Manage your barbershop business</p>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-8 bg-gray-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'analytics'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('barbers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'barbers'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4" />
            Barbers
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'services'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Scissors className="w-4 h-4" />
            Services
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'appointments'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Appointments
          </button>
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card p-6">
                <div className="text-2xl font-bold text-primary-600 mb-1">₹{analyticsData.dailyBookings[analyticsData.dailyBookings.length - 1]?.revenue || 0}</div>
                <div className="text-gray-600">Today's Revenue</div>
                <div className="text-green-600 text-sm mt-1">+12% from yesterday</div>
              </div>
              <div className="card p-6">
                <div className="text-2xl font-bold text-gold-500 mb-1">{appointments.length}</div>
                <div className="text-gray-600">Total Appointments</div>
                <div className="text-green-600 text-sm mt-1">Real-time data</div>
              </div>
              <div className="card p-6">
                <div className="text-2xl font-bold text-green-500 mb-1">4.8⭐</div>
                <div className="text-gray-600">Average Rating</div>
                <div className="text-gray-500 text-sm mt-1">Based on reviews</div>
              </div>
              <div className="card p-6">
                <div className="text-2xl font-bold text-blue-500 mb-1">15 mins</div>
                <div className="text-gray-600">Avg. Wait Time</div>
                <div className="text-green-600 text-sm mt-1">Real-time updates</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Daily Bookings Chart */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Bookings (Last 7 Days)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.dailyBookings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue Trend */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.dailyBookings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#f59e0b" 
                      strokeWidth={3}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Service Distribution */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Type Distribution</h3>
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <ResponsiveContainer width={300} height={300}>
                    <PieChart>
                      <Pie
                        data={analyticsData.serviceDistribution}
                        cx={150}
                        cy={150}
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {analyticsData.serviceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {analyticsData.serviceDistribution.map((service) => (
                    <div key={service.name} className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: service.color }}
                      ></div>
                      <span className="text-gray-700">{service.name}</span>
                      <span className="font-medium">{service.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Barbers Tab */}
        {activeTab === 'barbers' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">👤 Manage Barbers</h2>
              <button className="btn-primary flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Barber
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBarbers.map((barber) => (
                <div key={barber.id} className="card p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img 
                      src={barber.photo} 
                      alt={barber.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{barber.name}</h3>
                      <p className="text-gray-600">{barber.speciality}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-gold-500 fill-current" />
                        <span className="text-sm font-medium">{barber.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="text-gray-600">Available:</span>
                      <span className="ml-2 font-medium">{barber.available}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">✂️ Manage Services</h2>
              <button className="btn-primary flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Service
              </button>
            </div>
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Duration</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockServices.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900 font-medium">{service.title}</td>
                      <td className="px-6 py-4 text-gray-600">₹{service.price}</td>
                      <td className="px-6 py-4 text-gray-600">{service.duration} mins</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">📅 Appointments</h2>
              <button className="btn-primary flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Appointment
              </button>
            </div>
            <div className="card overflow-hidden">
              {appointments.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Service</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Barber</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date & Time</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {appointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          {appointment.user_profiles?.full_name || 'Unknown User'}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{appointment.services.name}</td>
                        <td className="px-6 py-4 text-gray-600">{appointment.barbers.name}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {appointment.appointment_date} at {appointment.appointment_time}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-600">No appointments found.</p>
                  <p className="text-gray-500 text-sm mt-1">Appointments will appear here once customers start booking.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;