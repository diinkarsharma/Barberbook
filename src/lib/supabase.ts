import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, userData: { full_name: string; phone?: string; role?: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  signInWithOtp: async (phone: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone
    });
    return { data, error };
  },

  verifyOtp: async (phone: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Database helpers
export const db = {
  // Barbershops
  getBarbershops: async () => {
    const { data, error } = await supabase
      .from('barbershops')
      .select(`
        *,
        barbers(*),
        services(*)
      `);
    return { data, error };
  },

  // User Profile
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  updateUserProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Appointments
  getUserAppointments: async (userId: string) => {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        barbershops(name, location),
        barbers(name),
        services(name, price)
      `)
      .eq('user_id', userId)
      .order('appointment_date', { ascending: true });
    return { data, error };
  },

  getAllAppointments: async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        user_profiles(full_name),
        barbershops(name),
        barbers(name),
        services(name)
      `)
      .order('appointment_date', { ascending: true });
    return { data, error };
  },

  createAppointment: async (appointment: any) => {
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointment)
      .select()
      .single();
    return { data, error };
  },

  updateAppointment: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Analytics
  getAnalytics: async () => {
    // Get daily bookings for the last 7 days
    const { data: dailyBookings, error: dailyError } = await supabase
      .from('appointments')
      .select('appointment_date, status')
      .gte('appointment_date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

    // Get service distribution
    const { data: serviceData, error: serviceError } = await supabase
      .from('appointments')
      .select(`
        services(name),
        status
      `)
      .eq('status', 'completed');

    return { 
      dailyBookings: { data: dailyBookings, error: dailyError },
      serviceData: { data: serviceData, error: serviceError }
    };
  }
};

// Real-time subscriptions
export const realtime = {
  subscribeToAppointments: (callback: (payload: any) => void) => {
    return supabase
      .channel('appointments')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'appointments' }, 
        callback
      )
      .subscribe();
  },

  subscribeToBarberAvailability: (callback: (payload: any) => void) => {
    return supabase
      .channel('barbers')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'barbers' }, 
        callback
      )
      .subscribe();
  }
};