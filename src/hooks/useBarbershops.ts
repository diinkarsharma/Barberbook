import { useState, useEffect } from 'react';
import { db, realtime } from '../lib/supabase';

interface Barbershop {
  id: string;
  name: string;
  location: string;
  image_url: string | null;
  rating: number;
  wait_time: string;
  barbers: Array<{
    id: string;
    name: string;
    image_url: string | null;
    speciality: string | null;
    available: boolean;
    rating: number;
  }>;
  services: Array<{
    id: string;
    name: string;
    price: number;
    duration: number;
  }>;
}

export const useBarbershops = () => {
  const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBarbershops();

    // Subscribe to real-time updates for barber availability
    const subscription = realtime.subscribeToBarberAvailability((payload) => {
      console.log('Barber availability updated:', payload);
      // Reload barbershops when barber availability changes
      loadBarbershops();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadBarbershops = async () => {
    try {
      setLoading(true);
      const { data, error } = await db.getBarbershops();
      if (error) throw error;
      setBarbershops(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load barbershops');
    } finally {
      setLoading(false);
    }
  };

  return {
    barbershops,
    loading,
    error,
    refetch: loadBarbershops
  };
};