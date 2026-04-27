// PayX Ultra Pro - TypeScript Interfaces
// Comprehensive Type Definitions for All Data Structures

// =====================
// USER & AUTHENTICATION
// =====================

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  upiId: string;
  balance: number;
  kycVerified: boolean;
  createdAt: string;
  profileCompleteness: number;
}

export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  hapticEnabled: boolean;
  soundEnabled: boolean;
  biometricEnabled: boolean;
  defaultUpiApp: string;
  quickPayEnabled: boolean;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  paymentAlerts: boolean;
  transactionAlerts: boolean;
  promotionAlerts: boolean;
  securityAlerts: boolean;
}

// =====================
// CONTACTS & PEOPLE
// =====================

export interface Contact {
  id: string;
  name: string;
  phone: string;
  upiId: string;
  avatar?: string;
  isFavorite: boolean;
  isBankVerified: boolean;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  lastTransactionDate?: string;
  transactionCount: number;
  tags: string[];
}

export interface RecentContact extends Contact {
  lastInteraction: string;
  lastAmount?: number;
  isFrequentContact: boolean;
}

// =====================
// PAYMENTS & TRANSACTIONS
// =====================

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  senderId: string;
  senderName: string;
  senderUpiId: string;
  recipientId: string;
  recipientName: string;
  recipientUpiId: string;
  note?: string;
  category?: TransactionCategory;
  utr?: string;
  createdAt: string;
  completedAt?: string;
  failureReason?: string;
  upiTransactionId?: string;
  metadata?: TransactionMetadata;
}

export type TransactionType = 'SENT' | 'RECEIVED' | 'FAILED' | 'PENDING' | 'REFUNDED';
export type TransactionStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | 'CANCELLED' | 'REFUNDED';
export type TransactionCategory = 
  | 'shopping'
  | 'food'
  | 'utilities'
  | 'entertainment'
  | 'healthcare'
  | 'education'
  | 'travel'
  | 'investment'
  | 'transfer'
  | 'other';

export interface TransactionMetadata {
  merchantId?: string;
  merchantName?: string;
  merchantCategory?: string;
  vpa?: string;
  recurring?: boolean;
  billNumber?: string;
  billDate?: string;
  dueDate?: string;
}

export interface PaymentRequest {
  id: string;
  amount: number;
  note: string;
  senderId: string;
  senderName: string;
  senderUpiId: string;
  payerName?: string;
  payerUpiId?: string;
  status: 'PENDING' | 'COMPLETED' | 'EXPIRED' | 'DECLINED';
  createdAt: string;
  expiryTime: string;
}

// =====================
// QR CODES & SCANNING
// =====================

export interface QRCode {
  id: string;
  type: QRCodeType;
  data: string;
  merchantId?: string;
  merchantName?: string;
  merchantLogo?: string;
  amount?: number;
  note?: string;
  upiId?: string;
  vpa?: string;
  createdAt: string;
  expiresAt?: string;
}

export type QRCodeType = 'UPI' | 'MERCHANT' | 'PERSONAL' | 'DONATION' | 'BILL';

export interface ScanResult {
  qrCode: QRCode;
  isValid: boolean;
  merchantName?: string;
  merchantLogo?: string;
  merchantCategory?: string;
  upiId: string;
  upiAddress: string;
  amount?: number;
  note?: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  verificationStatus: 'VERIFIED' | 'UNVERIFIED' | 'PENDING';
}


// =====================
// RECHARGE & BILLS
// =====================

export interface Operator {
  id: string;
  name: string;
  logo: string;
  type: ServiceType;
  circle?: string[];
  plans: Plan[];
  isActive: boolean;
}

export type ServiceType = 
  | 'mobile'
  | 'dth'
  | 'electricity'
  | 'water'
  | 'gas'
  | 'credit_card'
  | 'fastag'
  | 'insurance';

export interface Bill {
  id: string;
  type: ServiceType;
  number: string;
  operatorId: string;
  operatorName: string;
  amount: number;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'PARTIAL';
  consumerName?: string;
  billNumber?: string;
  paymentDate?: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  validity: number;
  validityUnit: 'days' | 'months' | 'years';
  data?: number;
  dataUnit?: 'MB' | 'GB';
  voice?: number;
  sms?: number;
  isPopular: boolean;
  isBestValue: boolean;
  category: 'unlimited' | 'data' | 'voice' | 'sms';
  features: string[];
  offerPrice?: number;
  offerDescription?: string;
}

export interface RechargeHistory {
  id: string;
  serviceType: ServiceType;
  number: string;
  operatorName: string;
  planId: string;
  planName: string;
  amount: number;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  createdAt: string;
  completedAt?: string;
  transactionId?: string;
}


// =====================
// INVESTMENTS
// =====================

export interface Investment {
  id: string;
  type: InvestmentType;
  name: string;
  symbol?: string;
  currentPrice: number;
  openingPrice: number;
  previousClosingPrice: number;
  priceChange: number;
  priceChangePercent: number;
  quantity: number;
  investedAmount: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
  createdAt: string;
  updatedAt: string;
}

export type InvestmentType = 'GOLD' | 'MUTUAL_FUND' | 'INSURANCE' | 'FD' | 'RD' | 'BONDS';

export interface GoldPrice {
  currentPrice: number;
  buyPrice: number;
  sellPrice: number;
  priceChange: number;
  priceChangePercent: number;
  lastUpdated: string;
  gram24k: number;
  gram22k: number;
  gram18k: number;
}

export interface MutualFund {
  id: string;
  name: string;
  schemeCode: string;
  fundHouse: string;
  category: string;
  subCategory: string;
  nav: number;
  navDate: string;
  return1Y: number;
  return3Y: number;
  return5Y: number;
  returnSinceInception: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  minimumInvestment: number;
}

export interface InsurancePolicy {
  id: string;
  type: InsuranceType;
  provider: string;
  policyNumber: string;
  name: string;
  sumAssured: number;
  premiumAmount: number;
  premiumFrequency: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  nextDueDate: string;
  coverStartDate: string;
  coverEndDate: string;
  status: 'ACTIVE' | 'LAPSED' | 'CLAIMED';
}

export type InsuranceType = 'TERM' | 'HEALTH' | 'LIFE' | 'MOTOR' | 'HOME' | 'TRAVEL';

export interface Portfolio {
  id: string;
  userId: string;
  investments: Investment[];
  totalValue: number;
  todaysChange: number;
  todaysChangePercent: number;
  overallProfitLoss: number;
  overallProfitLossPercent: number;
  lastUpdated: string;
}


// =====================
// AI ASSISTANT
// =====================

export interface AIAssistantMessage {
  id: string;
  type: 'user' | 'assistant';
  message: string;
  timestamp: string;
  quickActions?: QuickAction[];
}

export interface QuickAction {
  id: string;
  label: string;
  action: string;
  icon?: string;
}

export interface AIContext {
  currentScreen: string;
  recentTransactions: Transaction[];
  userPreferences: UserPreferences;
  accountBalance: number;
}

// =====================
// NAVIGATION
// =====================

export type RootStackParamList = {
  MainTabs: undefined;
  BottomSheetModal: undefined;
  DetailScreen: undefined;
};

export type MainTabParamList = {
  Tab1_Home: undefined;
  Tab2_Scan: undefined;
  Tab3_Transactions: undefined;
  Tab4_Recharge: undefined;
  Tab5_Investments: undefined;
};

// Tab 1 - Home/Payments Navigation
export type HomeStackParamList = {
  HomeLevel1: undefined;
  HomeLevel2_EnterAmount: { contact: Contact };
  HomeLevel3_PIN: { contact: Contact; amount: number; note: string };
  HomeLevel4_Success: { transaction: Transaction };
  HomeLevel5_Receipt: { transaction: Transaction };
};

// Tab 2 - Scan Navigation
export type ScanStackParamList = {
  ScanLevel1: undefined;
  ScanLevel2_MerchantDetails: { scanResult: ScanResult };
  ScanLevel3_ConfirmAmount: { scanResult: ScanResult };
  ScanLevel4_PIN: { scanResult: ScanResult; amount: number };
  ScanLevel5_Receipt: { transaction: Transaction };
};

// Tab 3 - Transactions Navigation
export type TransactionStackParamList = {
  TransactionsLevel1: undefined;
  TransactionsLevel2_Details: { transaction: Transaction };
  TransactionsLevel3_Download: { transaction: Transaction };
  TransactionsLevel4_Dispute: { transaction: Transaction };
};

// Tab 4 - Recharge Navigation
export type RechargeStackParamList = {
  RechargeLevel1: undefined;
  RechargeLevel2_EnterDetails: { serviceType: ServiceType };
  RechargeLevel3_Plans: { serviceType: ServiceType; number: string; operator: Operator };
  RechargeLevel4_Payment: { serviceType: ServiceType; number: string; plan: Plan; operator: Operator };
  RechargeLevel5_Success: { rechargeHistory: RechargeHistory };
};

// Tab 5 - Investments Navigation
export type InvestmentsStackParamList = {
  InvestmentsLevel1: undefined;
  InvestmentsLevel2_Details: { type: InvestmentType };
  InvestmentsLevel3_Buy: { investment: Investment; type: InvestmentType };
  InvestmentsLevel4_Payment: { investment: Investment; type: InvestmentType; amount: number };
  InvestmentsLevel5_Success: { investment: Investment };
};


// =====================
// UI COMPONENTS
// =====================

export interface CardItem {
  id: string;
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  description?: string;
  amount?: number;
  metadata?: Record<string, any>;
  onPress?: () => void;
}

export interface ActionButton {
  id: string;
  label: string;
  icon?: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export interface QuickActionButton {
  id: string;
  label: string;
  icon: string;
  color: string;
  onPress: () => void;
}

export interface SkeletonItem {
  width: number | string;
  height: number;
  borderRadius: number;
}

export interface BottomSheetOption {
  id: string;
  label: string;
  icon?: string;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
}


// =====================
// LOADING STATES
// =====================

export interface LoadingState {
  isLoading: boolean;
  isRefreshing: boolean;
  isPaginating: boolean;
  error?: string;
  data?: any;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  isLoading: boolean;
}


// =====================
// MODAL & BOTTOM SHEET
// =====================

export interface BottomSheetItem {
  id: string;
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

export interface BottomSheetConfig {
  snapPoints: (number | string)[];
  enablePanDownToClose: boolean;
  handleIndicatorStyle?: object;
  backgroundStyle?: object;
  onClose?: () => void;
}

// =====================
// FORM VALIDATION
// =====================

export interface FormField {
  name: string;
  value: string;
  error?: string;
  touched: boolean;
  required?: boolean;
  validation?: {
    type: 'email' | 'phone' | 'upi' | 'amount' | 'required' | 'minLength' | 'maxLength' | 'custom';
    minLength?: number;
    maxLength?: number;
    custom?: (value: string) => boolean;
  };
}


// =====================
// CHART DATA
// =====================

export interface ChartDataPoint {
  timestamp: number;
  value: number;
  label?: string;
}

export interface ChartConfig {
  data: ChartDataPoint[];
  type: 'line' | 'area' | 'candle';
  showGrid: boolean;
  showLabels: boolean;
  showTooltip: boolean;
  color?: string;
  fillColor?: string;
}


// =====================
// RECEIPT
// =====================

export interface Receipt {
  id: string;
  transaction: Transaction;
  generatedAt: string;
  shareUrl?: string;
  downloadUrl?: string;
}


// =====================
// SETTINGS
// =====================

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  currency: string;
  hapticEnabled: boolean;
  soundEnabled: boolean;
  biometricEnabled: boolean;
  pinEnabled: boolean;
  faceIdEnabled: boolean;
  defaultPaymentMethod: string;
  autoLockTimeout: number;
  dataSaver: boolean;
  crashReporting: boolean;
  analytics: boolean;
}


// =====================
// HISTORY & FAVORITES
// =====================

export interface ActivityHistory {
  id: string;
  type: 'search' | 'payment' | 'scan' | 'recharge' | 'investment' | 'view';
  query?: string;
  data: Record<string, any>;
  timestamp: string;
}

export interface FavoriteItem {
  id: string;
  type: 'contact' | 'merchant' | 'plan' | 'investment';
  data: Record<string, any>;
  addedAt: string;
}


// =====================
// MOCK DATA TYPES
// =====================

export interface MockData {
  users: User[];
  contacts: Contact[];
  transactions: Transaction[];
  operators: Operator[];
  plans: Plan[];
  investments: Investment[];
  mutualFunds: MutualFund[];
  goldPrice: GoldPrice;
  aiMessages: AIAssistantMessage[];
}

// =====================
// API RESPONSE
// =====================

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  timestamp: string;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: PaginationState;
}