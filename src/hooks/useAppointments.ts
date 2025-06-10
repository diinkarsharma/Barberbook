import { useState, useEffect } from 'react';
import { db, realtime } from '../lib/supabase';
import { useAuth } from './useAuth';

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  barbershops: { name: string; location: string };
  barbers: { name: string };
  services: { name: string; price: number };
  user_profiles?: { full_name: string };
}

export const useAppointments = () => {
  const { user, isAdmin } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadAppointments();

      // Subscribe to real-time appointment updates
      const subscription = realtime.subscribeToAppointments((payload) => {
        console.log('Appointment updated:', payload);
        loadAppointments();
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user, isAdmin]);

  const loadAppointments = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = isAdmin 
        ? await db.getAllAppointments()
        : await db.getUserAppointments(user.id);
      
      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (appointmentData: any) => {
    try {
      const { data, error } = await db.createAppointment({
        ...appointmentData,
        user_id: user?.id
      });
      if (error) throw error;
      await loadAppointments(); // Refresh the list
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const updateAppointment = async (id: string, updates: any) => {
    try {
      const { data, error } = await db.updateAppointment(id, updates);
      if (error) throw error;
      await loadAppointments(); // Refresh the list
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return {
    appointments,
    loading,
    error,
    createAppointment,
    updateAppointment,
    refetch: loadAppointments
  };
};