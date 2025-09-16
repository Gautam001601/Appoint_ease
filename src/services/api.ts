const API_BASE_URL = 'http://localhost:5000/api';

interface LoginData {
  email?: string;
  phone?: string;
  password: string;
  userType: string;
}

interface RegisterData {
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  zipCode: string;
  password: string;
}

interface AppointmentData {
  doctorId: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  symptoms?: string;
}

interface OrderData {
  items: Array<{
    medicineId: number;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  deliveryAddress: string;
  orderType: string;
}

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: this.getAuthHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(loginData: LoginData) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData)
    });
  }

  async register(registerData: RegisterData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(registerData)
    });
  }

  // Doctor endpoints
  async getDoctors(filters?: { specialty?: string; location?: string; search?: string }) {
    const params = new URLSearchParams();
    if (filters?.specialty) params.append('specialty', filters.specialty);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    return this.request(`/doctors${queryString ? `?${queryString}` : ''}`);
  }

  // Appointment endpoints
  async bookAppointment(appointmentData: AppointmentData) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData)
    });
  }

  async getAppointments(userId: string) {
    return this.request(`/appointments/${userId}`);
  }

  // Medicine endpoints
  async getMedicines(filters?: { search?: string; category?: string }) {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    
    const queryString = params.toString();
    return this.request(`/medicines${queryString ? `?${queryString}` : ''}`);
  }

  async placeOrder(orderData: OrderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  // Test reports endpoints
  async getTestReports(userId: string) {
    return this.request(`/reports/${userId}`);
  }

  // Dashboard endpoints
  async getDashboardStats(userId: string) {
    return this.request(`/dashboard/stats/${userId}`);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export default apiService;