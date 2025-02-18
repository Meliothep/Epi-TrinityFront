// Admin Dashboard Types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  recentActivity: Activity[];
  salesTrend: SalesTrendData[];
}

export interface Activity {
  id: string;
  type: 'order' | 'user' | 'product';
  description: string;
  timestamp: string;
}

export interface SalesTrendData {
  date: string;
  sales: number;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter Types
export interface FilterParams {
  search?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  category?: string;
}

// Sort Types
export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}

// Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Admin User Types
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'support';
  permissions: string[];
  lastLogin: string;
  status: 'active' | 'inactive';
}

// Admin Settings Types
export interface AdminSettings {
  siteName: string;
  logo: string;
  theme: 'light' | 'dark' | 'system';
  emailSettings: EmailSettings;
  paymentSettings: PaymentSettings;
  shippingSettings: ShippingSettings;
}

export interface EmailSettings {
  fromEmail: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  templates: EmailTemplate[];
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
}

export interface PaymentSettings {
  currency: string;
  providers: PaymentProvider[];
  taxRate: number;
}

export interface PaymentProvider {
  id: string;
  name: string;
  enabled: boolean;
  apiKey?: string;
  secretKey?: string;
}

export interface ShippingSettings {
  methods: ShippingMethod[];
  zones: ShippingZone[];
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  enabled: boolean;
}

export interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  methods: string[];
} 