import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  city?: string;
  zip_code?: string;
  user_type: 'patient' | 'doctor' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Doctor {
  id: string;
  user_id?: string;
  specialty: string;
  experience_years: number;
  rating: number;
  review_count: number;
  fee: number;
  location: string;
  available: boolean;
  next_slot?: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id?: string;
  appointment_type: 'doctor' | 'home_visit' | 'diagnostic';
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  patient_name: string;
  patient_age?: number;
  patient_gender?: string;
  patient_phone: string;
  patient_email?: string;
  address?: string;
  specialty?: string;
  reason?: string;
  created_at: string;
  updated_at: string;
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  in_stock: boolean;
  description?: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_type: 'prescription' | 'direct';
  total_amount: number;
  delivery_address: string;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  prescription_url?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  medicine_id: string;
  quantity: number;
  price: number;
  created_at: string;
}

export interface DiagnosticTest {
  id: string;
  name: string;
  category: string;
  price: number;
  report_time: string;
  preparation?: string;
  popular: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'appointment' | 'order' | 'general';
  reference_id?: string;
  read: boolean;
  created_at: string;
}

class SupabaseService {
  async getDoctors(filters?: { specialty?: string; location?: string; search?: string }) {
    let query = supabase.from('doctors').select('*');

    if (filters?.specialty && filters.specialty !== 'All Specialties') {
      query = query.eq('specialty', filters.specialty);
    }

    if (filters?.location && filters.location !== 'All Locations') {
      query = query.eq('location', filters.location);
    }

    if (filters?.search) {
      query = query.or(`specialty.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  async bookAppointment(appointmentData: Omit<Appointment, 'id' | 'created_at' | 'updated_at' | 'status'>) {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserAppointments(userId: string) {
    const { data, error } = await supabase
      .from('appointments')
      .select('*, doctors(*)')
      .eq('patient_id', userId)
      .order('appointment_date', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getMedicines(filters?: { search?: string; category?: string }) {
    let query = supabase.from('medicines').select('*');

    if (filters?.category && filters.category !== 'All Categories') {
      query = query.eq('category', filters.category);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,category.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  async getDiagnosticTests(filters?: { search?: string; category?: string }) {
    let query = supabase.from('diagnostic_tests').select('*');

    if (filters?.category && filters.category !== 'All Tests') {
      query = query.eq('category', filters.category);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,category.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  async placeOrder(orderData: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'status'>, items: Array<{ medicine_id: string; quantity: number; price: number }>) {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = items.map(item => ({
      order_id: order.id,
      ...item
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return order;
  }

  async getUserOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*, medicines(*))')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getUserNotifications(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async markNotificationAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) throw error;
  }

  async getUnreadNotificationCount(userId: string) {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false);

    if (error) throw error;
    return count || 0;
  }

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async createProfile(profile: Omit<Profile, 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profile])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const supabaseService = new SupabaseService();
export default supabaseService;
