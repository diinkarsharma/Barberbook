export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string
          user_id: string
          barbershop_id: string
          barber_id: string
          service_id: string
          appointment_date: string
          appointment_time: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          barbershop_id: string
          barber_id: string
          service_id: string
          appointment_date: string
          appointment_time: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          barbershop_id?: string
          barber_id?: string
          service_id?: string
          appointment_date?: string
          appointment_time?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      barbers: {
        Row: {
          id: string
          barbershop_id: string
          name: string
          image_url: string | null
          speciality: string | null
          available: boolean
          available_from: string
          available_to: string
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          barbershop_id: string
          name: string
          image_url?: string | null
          speciality?: string | null
          available?: boolean
          available_from?: string
          available_to?: string
          rating?: number
          created_at?: string
        }
        Update: {
          id?: string
          barbershop_id?: string
          name?: string
          image_url?: string | null
          speciality?: string | null
          available?: boolean
          available_from?: string
          available_to?: string
          rating?: number
          created_at?: string
        }
      }
      barbershops: {
        Row: {
          id: string
          name: string
          location: string
          image_url: string | null
          rating: number
          wait_time: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          image_url?: string | null
          rating?: number
          wait_time?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          image_url?: string | null
          rating?: number
          wait_time?: string
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          barbershop_id: string
          name: string
          price: number
          duration: number
          created_at: string
        }
        Insert: {
          id?: string
          barbershop_id: string
          name: string
          price: number
          duration: number
          created_at?: string
        }
        Update: {
          id?: string
          barbershop_id?: string
          name?: string
          price?: number
          duration?: number
          created_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          role: string
          loyalty_points: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          role?: string
          loyalty_points?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          phone?: string | null
          role?: string
          loyalty_points?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}