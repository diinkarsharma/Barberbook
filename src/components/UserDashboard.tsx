import React from 'react';
import { MapPin, Gift, Star, Search, Filter, LogOut } from 'lucide-react';
import BarbershopCard from './BarbershopCard';
import { useBarbershops } from '../hooks/useBarbershops';
import { useAuth } from '../hooks/useAuth';

const UserDashboard: React.FC = () => {
  const { barbershops, loading, error } = useBarbershops();
  const { profile, signOut } = useAuth();

  const handleBook = (barbershopId: string) => {
    const barbershop = barbershops.find(b => b.id === barbershopId);
    alert(`Booking appointment at ${barbershop?.name}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading barbershops...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Retry
          </button>
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
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">BarberBook</h1>
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
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Hi {profile?.full_name || 'User'} 👋
            </h2>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Showing barbershops near you</span>
          </div>
        </div>

        {/* Loyalty Points */}
        <div className="card p-6 mb-8 bg-gradient-to-r from-primary-500 to-primary-600 text-white animate-slide-up">
          <div className="flex items-center gap-3">
            <Gift className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-semibold">
                You've earned {profile?.loyalty_points || 0} 💎 points
              </h3>
              <p className="text-primary-100">Book more appointments to unlock premium rewards!</p>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search barbershops, services, or location..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Barbershops Grid */}
        {barbershops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {barbershops.map((barbershop, index) => (
              <div
                key={barbershop.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BarbershopCard
                  barbershop={barbershop}
                  onBook={handleBook}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No barbershops found in your area.</p>
            <p className="text-gray-500 mt-2">Please check back later or try a different location.</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">0</div>
            <div className="text-gray-600">Appointments Completed</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-gold-500 mb-2">₹0</div>
            <div className="text-gray-600">Total Saved</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">New</div>
            <div className="text-gray-600">Member Status</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;