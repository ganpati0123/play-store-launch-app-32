// PayX Ultra Pro - Mock Data
// Comprehensive mock data for all features

import { 
  Contact, 
  Transaction, 
  Operator, 
  Plan, 
  Investment, 
  MutualFund, 
  GoldPrice,
  AIAssistantMessage,
  User,
  Bill,
  InsurancePolicy,
  Portfolio,
  ServiceType
} from '../types';

// Current timestamp for all mock data
const now = new Date();
const today = now.toISOString().split('T')[0];
const yesterday = new Date(now.getTime() - 86400000).toISOString().split('T')[0];
const lastWeek = new Date(now.getTime() - 7 * 86400000).toISOString().split('T')[0];

// =====================
// MOCK USER
// =====================

export const mockUser: User = {
  id: 'user_001',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@email.com',
  phone: '+91 98765 43210',
  avatar: 'https://i.pravatar.cc/150?img=1',
  upiId: 'rahul.sharma@payx',
  balance: 25432.50,
  kycVerified: true,
  createdAt: '2023-01-15T10:30:00Z',
  profileCompleteness: 100,
};

// =====================
// MOCK CONTACTS
// =====================

export const mockContacts: Contact[] = [
  {
    id: 'contact_001',
    name: 'Amit Kumar',
    phone: '+91 98765 12345',
    upiId: 'amit.kumar@payx',
    avatar: 'https://i.pravatar.cc/150?img=3',
    isFavorite: true,
    isBankVerified: true,
    bankName: 'HDFC Bank',
    accountNumber: '****4567',
    lastTransactionDate: today,
    transactionCount: 45,
    tags: ['family', 'frequent'],
  },
  {
    id: 'contact_002',
    name: 'Priya Singh',
    phone: '+91 98765 23456',
    upiId: 'priya.singh@payx',
    avatar: 'https://i.pravatar.cc/150?img=5',
    isFavorite: true,
    isBankVerified: true,
    bankName: 'ICICI Bank',
    accountNumber: '****8901',
    lastTransactionDate: yesterday,
    transactionCount: 32,
    tags: ['friend'],
  },
  {
    id: 'contact_003',
    name: 'Raj Patel',
    phone: '+91 98765 34567',
    upiId: 'raj.patel@payx',
    avatar: 'https://i.pravatar.cc/150?img=8',
    isFavorite: false,
    isBankVerified: true,
    bankName: 'SBI',
    accountNumber: '****2345',
    lastTransactionDate: lastWeek,
    transactionCount: 18,
    tags: ['office'],
  },
  {
    id: 'contact_004',
    name: 'Anita Desai',
    phone: '+91 98765 45678',
    upiId: 'anita.desai@payx',
    avatar: 'https://i.pravatar.cc/150?img=9',
    isFavorite: false,
    isBankVerified: true,
    bankName: 'Axis Bank',
    accountNumber: '****6789',
    lastTransactionDate: today,
    transactionCount: 12,
    tags: ['family'],
  },
  {
    id: 'contact_005',
    name: 'Vikram Reddy',
    phone: '+91 98765 56789',
    upiId: 'vikram.reddy@payx',
    avatar: 'https://i.pravatar.cc/150?img=12',
    isFavorite: true,
    isBankVerified: true,
    bankName: 'Yes Bank',
    accountNumber: '****0123',
    lastTransactionDate: yesterday,
    transactionCount: 28,
    tags: ['friend', 'frequent'],
  },
  {
    id: 'contact_006',
    name: 'Neha Gupta',
    phone: '+91 98765 67890',
    upiId: 'neha.gupta@payx',
    avatar: 'https://i.pravatar.cc/150?img=16',
    isFavorite: false,
    isBankVerified: false,
    lastTransactionDate: lastWeek,
    transactionCount: 5,
    tags: ['office'],
  },
  {
    id: 'contact_007',
    name: 'Suresh Nair',
    phone: '+91 98765 78901',
    upiId: 'suresh.nair@payx',
    avatar: 'https://i.pravatar.cc/150?img=11',
    isFavorite: false,
    isBankVerified: true,
    bankName: 'Kotak Bank',
    accountNumber: '****4567',
    lastTransactionDate: today,
    transactionCount: 22,
    tags: ['family'],
  },
  {
    id: 'contact_008',
    name: 'Meera Joshi',
    phone: '+91 98765 89012',
    upiId: 'meera.joshi@payx',
    avatar: 'https://i.pravatar.cc/150?img=20',
    isFavorite: false,
    isBankVerified: true,
    bankName: 'IDBI Bank',
    accountNumber: '****8901',
    lastTransactionDate: yesterday,
    transactionCount: 8,
    tags: ['friend'],
  },
];

// =====================
// MOCK TRANSACTIONS
// =====================

export const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    type: 'SENT',
    amount: 500,
    currency: 'INR',
    status: 'SUCCESS',
    senderId: 'user_001',
    senderName: 'Rahul Sharma',
    senderUpiId: 'rahul.sharma@payx',
    recipientId: 'contact_001',
    recipientName: 'Amit Kumar',
    recipientUpiId: 'amit.kumar@payx',
    note: 'Lunch money',
    category: 'food',
    utr: 'UTR892345678901',
    createdAt: `${today}T12:30:00Z`,
    completedAt: `${today}T12:30:15Z`,
    upiTransactionId: 'UPI123456789',
  },
  {
    id: 'txn_002',
    type: 'RECEIVED',
    amount: 1000,
    currency: 'INR',
    status: 'SUCCESS',
    senderId: 'contact_002',
    senderName: 'Priya Singh',
    senderUpiId: 'priya.singh@payx',
    recipientId: 'user_001',
    recipientName: 'Rahul Sharma',
    recipientUpiId: 'rahul.sharma@payx',
    note: 'Return of loan',
    category: 'transfer',
    utr: 'UTR892345678902',
    createdAt: `${yesterday}T18:45:00Z`,
    completedAt: `${yesterday}T18:45:10Z`,
    upiTransactionId: 'UPI123456790',
  },
  {
    id: 'txn_003',
    type: 'SENT',
    amount: 250,
    currency: 'INR',
    status: 'SUCCESS',
    senderId: 'user_001',
    senderName: 'Rahul Sharma',
    senderUpiId: 'rahul.sharma@payx',
    recipientId: 'contact_003',
    recipientName: 'Raj Patel',
    recipientUpiId: 'raj.patel@payx',
    note: 'Coffee',
    category: 'food',
    utr: 'UTR892345678903',
    createdAt: `${yesterday}T09:15:00Z`,
    completedAt: `${yesterday}T09:15:08Z`,
    upiTransactionId: 'UPI123456791',
  },
  {
    id: 'txn_004',
    type: 'SENT',
    amount: 1500,
    currency: 'INR',
    status: 'SUCCESS',
    senderId: 'user_001',
    senderName: 'Rahul Sharma',
    senderUpiId: 'rahul.sharma@payx',
    recipientId: 'contact_004',
    recipientName: 'Anita Desai',
    recipientUpiId: 'anita.desai@payx',
    note: 'Groceries',
    category: 'shopping',
    utr: 'UTR892345678904',
    createdAt: `${lastWeek}T16:20:00Z`,
    completedAt: `${lastWeek}T16:20:12Z`,
    upiTransactionId: 'UPI123456792',
  },
  {
    id: 'txn_005',
    type: 'SENT',
    amount: 200,
    currency: 'INR',
    status: 'PENDING',
    senderId: 'user_001',
    senderName: 'Rahul Sharma',
    senderUpiId: 'rahul.sharma@payx',
    recipientId: 'contact_005',
    recipientName: 'Vikram Reddy',
    recipientUpiId: 'vikram.reddy@payx',
    note: 'Movie tickets',
    category: 'entertainment',
    utr: 'UTR892345678905',
    createdAt: `${today}T14:00:00Z`,
    upiTransactionId: 'UPI123456793',
  },
  {
    id: 'txn_006',
    type: 'RECEIVED',
    amount: 2500,
    currency: 'INR',
    status: 'SUCCESS',
    senderId: 'contact_005',
    senderName: 'Vikram Reddy',
    senderUpiId: 'vikram.reddy@payx',
    recipientId: 'user_001',
    recipientName: 'Rahul Sharma',
    recipientUpiId: 'rahul.sharma@payx',
    note: 'Project advance',
    category: 'transfer',
    utr: 'UTR892345678906',
    createdAt: `${today}T11:00:00Z`,
    completedAt: `${today}T11:00:05Z`,
    upiTransactionId: 'UPI123456794',
  },
  {
    id: 'txn_007',
    type: 'SENT',
    amount: 350,
    currency: 'INR',
    status: 'SUCCESS',
    senderId: 'user_001',
    senderName: 'Rahul Sharma',
    senderUpiId: 'rahul.sharma@payx',
    recipientId: 'contact_001',
    recipientName: 'Amit Kumar',
    recipientUpiId: 'amit.kumar@payx',
    note: 'Petrol',
    category: 'travel',
    utr: 'UTR892345678907',
    createdAt: `${lastWeek}T08:30:00Z`,
    completedAt: `${lastWeek}T08:30:10Z`,
    upiTransactionId: 'UPI123456795',
  },
  {
    id: 'txn_008',
    type: 'FAILED',
    amount: 5000,
    currency: 'INR',
    status: 'FAILED',
    senderId: 'user_001',
    senderName: 'Rahul Sharma',
    senderUpiId: 'rahul.sharma@payx',
    recipientId: 'contact_006',
    recipientName: 'Neha Gupta',
    recipientUpiId: 'neha.gupta@payx',
    note: 'Investment',
    category: 'investment',
    utr: 'UTR892345678908',
    createdAt: `${yesterday}T20:00:00Z`,
    failureReason: 'Insufficient balance',
  },
  {
    id: 'txn_009',
    type: 'SENT',
    amount: 799,
    currency: 'INR',
    status: 'SUCCESS',
    senderId: 'user_001',
    senderName: 'Rahul Sharma',
    senderUpiId: 'rahul.sharma@payx',
    recipientId: 'contact_007',
    recipientName: 'Suresh Nair',
    recipientUpiId: 'suresh.nair@payx',
    note: 'Electricity bill',
    category: 'utilities',
    utr: 'UTR892345678909',
    createdAt: `${lastWeek}T15:45:00Z`,
    completedAt: `${lastWeek}T15:45:09Z`,
    upiTransactionId: 'UPI123456796',
  },
  {
    id: 'txn_010',
    type: 'SENT',
    amount: 1200,
    currency: 'INR',
    status: 'SUCCESS',
    senderId: 'user_001',
    senderName: 'Rahul Sharma',
    senderUpiId: 'rahul.sharma@payx',
    recipientId: 'contact_008',
    recipientName: 'Meera Joshi',
    recipientUpiId: 'meera.joshi@payx',
    note: 'Books',
    category: 'education',
    utr: 'UTR892345678910',
    createdAt: `${yesterday}T13:30:00Z`,
    completedAt: `${yesterday}T13:30:11Z`,
    upiTransactionId: 'UPI123456797',
  },
];

// =====================
// MOCK MERCHANTS
// =====================

export const mockMerchants = [
  {
    id: 'merchant_001',
    name: 'Swiggy',
    logo: 'https://logo.clearbit.com/swiggy.com',
    category: 'Food Delivery',
    address: 'swiggy@restaurant',
    verified: true,
  },
  {
    id: 'merchant_002',
    name: 'Zomato',
    logo: 'https://logo.clearbit.com/zomato.com',
    category: 'Food Delivery',
    address: 'zomato@restaurant',
    verified: true,
  },
  {
    id: 'merchant_003',
    name: 'Amazon',
    logo: 'https://logo.clearbit.com/amazon.com',
    category: 'E-Commerce',
    address: 'amazon@pay',
    verified: true,
  },
  {
    id: 'merchant_004',
    name: 'Flipkart',
    logo: 'https://logo.clearbit.com/flipkart.com',
    category: 'E-Commerce',
    address: 'flipkart@pay',
    verified: true,
  },
  {
    id: 'merchant_005',
    name: 'BookMyShow',
    logo: 'https://logo.clearbit.com/bookmyshow.com',
    category: 'Entertainment',
    address: 'bookmyshow@bm',
    verified: true,
  },
  {
    id: 'merchant_006',
    name: 'Mobile Recharge',
    logo: 'https://logo.clearbit.com/mobile.com',
    category: 'Utilities',
    address: 'recharge@payx',
    verified: true,
  },
  {
    id: 'merchant_007',
    name: 'Electricity Board',
    logo: 'https://logo.clearbit.com/electricity.com',
    category: 'Utilities',
    address: 'electricity@bill',
    verified: true,
  },
  {
    id: 'merchant_008',
    name: 'Gold Silver',
    logo: 'https://logo.clearbit.com/gold.com',
    category: 'Investment',
    address: 'gold@invest',
    verified: true,
  },
];

// =====================
// MOCK OPERATORS
// =====================

export const mockOperators: Operator[] = [
  {
    id: 'op_001',
    name: 'Jio',
    logo: 'https://logo.clearbit.com/jio.com',
    type: 'mobile',
    circle: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Chandigarh'],
    plans: [],
    isActive: true,
  },
  {
    id: 'op_002',
    name: 'Airtel',
    logo: 'https://logo.clearbit.com/airtel.com',
    type: 'mobile',
    circle: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Chandigarh'],
    plans: [],
    isActive: true,
  },
  {
    id: 'op_003',
    name: 'Vi',
    logo: 'https://logo.clearbit.com/vodafone.com',
    type: 'mobile',
    circle: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'],
    plans: [],
    isActive: true,
  },
  {
    id: 'op_004',
    name: 'BSNL',
    logo: 'https://logo.clearbit.com/bsnl.co.in',
    type: 'mobile',
    circle: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'],
    plans: [],
    isActive: true,
  },
  {
    id: 'op_005',
    name: 'Tata Sky',
    logo: 'https://logo.clearbit.com/tatasky.com',
    type: 'dth',
    circle: ['All India'],
    plans: [],
    isActive: true,
  },
  {
    id: 'op_006',
    name: 'Airtel Digital',
    logo: 'https://logo.clearbit.com/airtel.com',
    type: 'dth',
    circle: ['All India'],
    plans: [],
    isActive: true,
  },
  {
    id: 'op_007',
    name: 'Dish TV',
    logo: 'https://logo.clearbit.com/dishtv.in',
    type: 'dth',
    circle: ['All India'],
    plans: [],
    isActive: true,
  },
  {
    id: 'op_008',
    name: 'MSEB',
    logo: 'https://logo.clearbit.com/mahadiscom.in',
    type: 'electricity',
    circle: ['Maharashtra'],
    plans: [],
    isActive: true,
  },
  {
    id: 'op_009',
    name: 'BEST',
    logo: 'https://logo.clearbit.com/bestmumbai.com',
    type: 'electricity',
    circle: ['Mumbai'],
    plans: [],
    isActive: true,
  },
  {
    id: 'op_010',
    name: 'Tata Power',
    logo: 'https://logo.clearbit.com/tatapower.com',
    type: 'electricity',
    circle: ['Delhi', 'Mumbai'],
    plans: [],
    isActive: true,
  },
];

// Mobile Plans for Jio
export const mockJioPlans: Plan[] = [
  {
    id: 'plan_001',
    name: 'Jio 199',
    description: 'Unlimited calls + 1.5GB/day + 100 SMS/day',
    price: 199,
    validity: 23,
    validityUnit: 'days',
    data: 1.5,
    dataUnit: 'GB',
    voice: -1,
    sms: 100,
    isPopular: false,
    isBestValue: false,
    category: 'unlimited',
    features: ['Unlimited calls', '1.5GB/day', '100 SMS/day', 'JioTV', 'JioCinema'],
    offerPrice: 199,
    offerDescription: '23 days validity',
  },
  {
    id: 'plan_002',
    name: 'Jio 249',
    description: 'Unlimited calls + 2GB/day + 100 SMS/day',
    price: 249,
    validity: 28,
    validityUnit: 'days',
    data: 2,
    dataUnit: 'GB',
    voice: -1,
    sms: 100,
    isPopular: true,
    isBestValue: false,
    category: 'unlimited',
    features: ['Unlimited calls', '2GB/day', '100 SMS/day', 'JioTV', 'JioCinema'],
    offerPrice: 249,
    offerDescription: '28 days validity',
  },
  {
    id: 'plan_003',
    name: 'Jio 299',
    description: 'Unlimited calls + 2GB/day + 100 SMS/day + Disney+ Hotstar',
    price: 299,
    validity: 30,
    validityUnit: 'days',
    data: 2,
    dataUnit: 'GB',
    voice: -1,
    sms: 100,
    isPopular: false,
    isBestValue: true,
    category: 'unlimited',
    features: ['Unlimited calls', '2GB/day', '100 SMS/day', 'JioTV', 'JioCinema', 'Disney+ Hotstar'],
    offerPrice: 299,
    offerDescription: 'Best Value Plan',
  },
  {
    id: 'plan_004',
    name: 'Jio 349',
    description: 'Unlimited calls + 3GB/day + 100 SMS/day',
    price: 349,
    validity: 30,
    validityUnit: 'days',
    data: 3,
    dataUnit: 'GB',
    voice: -1,
    sms: 100,
    isPopular: false,
    isBestValue: false,
    category: 'unlimited',
    features: ['Unlimited calls', '3GB/day', '100 SMS/day', 'JioTV', 'JioCinema'],
    offerPrice: 349,
    offerDescription: '30 days validity',
  },
  {
    id: 'plan_005',
    name: 'Jio 599',
    description: 'Unlimited calls + 2GB/day + 100 SMS/day + 56 days validity',
    price: 599,
    validity: 56,
    validityUnit: 'days',
    data: 2,
    dataUnit: 'GB',
    voice: -1,
    sms: 100,
    isPopular: false,
    isBestValue: false,
    category: 'unlimited',
    features: ['Unlimited calls', '2GB/day', '100 SMS/day', 'JioTV', 'JioCinema'],
    offerPrice: 599,
    offerDescription: '56 days validity',
  },
  {
    id: 'plan_006',
    name: 'Jio 799',
    description: 'Unlimited calls + 3GB/day + 100 SMS/day + 84 days validity',
    price: 799,
    validity: 84,
    validityUnit: 'days',
    data: 3,
    dataUnit: 'GB',
    voice: -1,
    sms: 100,
    isPopular: false,
    isBestValue: false,
    category: 'unlimited',
    features: ['Unlimited calls', '3GB/day', '100 SMS/day', 'JioTV', 'JioCinema'],
    offerPrice: 799,
    offerDescription: '84 days validity',
  },
  {
    id: 'plan_007',
    name: 'Jio 999',
    description: 'Unlimited calls + 4GB/day + 100 SMS/day + 90 days validity',
    price: 999,
    validity: 90,
    validityUnit: 'days',
    data: 4,
    dataUnit: 'GB',
    voice: -1,
    sms: 100,
    isPopular: false,
    isBestValue: false,
    category: 'unlimited',
    features: ['Unlimited calls', '4GB/day', '100 SMS/day', 'JioTV', 'JioCinema'],
    offerPrice: 999,
    offerDescription: '90 days validity',
  },
  {
    id: 'plan_008',
    name: 'Jio 1499',
    description: 'Unlimited calls + 6GB/day + 100 SMS/day + 180 days validity',
    price: 1499,
    validity: 180,
    validityUnit: 'days',
    data: 6,
    dataUnit: 'GB',
    voice: -1,
    sms: 100,
    isPopular: false,
    isBestValue: false,
    category: 'unlimited',
    features: ['Unlimited calls', '6GB/day', '100 SMS/day', 'JioTV', 'JioCinema'],
    offerPrice: 1499,
    offerDescription: '180 days validity',
  },
];

// Mobile Plans for Airtel
export const mockAirtelPlans: Plan[] = [
  {
    id: 'plan_101',
    name: 'Airtel 199',
    description: 'Unlimited calls + 1GB/day + 300 SMS/month',
    price: 199,
    validity: 24,
    validityUnit: 'days',
    data: 1,
    dataUnit: 'GB',
    voice: -1,
    sms: 300,
    isPopular: false,
    isBestValue: false,
    category: 'unlimited',
    features: ['Unlimited calls', '1GB/day', '300 SMS/month', 'Airtel Xstream'],
    offerPrice: 199,
    offerDescription: '24 days validity',
  },
  {
    id: 'plan_102',
    name: 'Airtel 299',
    description: 'Unlimited calls + 1.5GB/day + 300 SMS/month',
    price: 299,
    validity: 28,
    validityUnit: 'days',
    data: 1.5,
    dataUnit: 'GB',
    voice: -1,
    sms: 300,
    isPopular: true,
    isBestValue: false,
    category: 'unlimited',
    features: ['Unlimited calls', '1.5GB/day', '300 SMS/month', 'Airtel Xstream'],
    offerPrice: 299,
    offerDescription: '28 days validity',
  },
  {
    id: 'plan_103',
    name: 'Airtel 399',
    description: 'Unlimited calls + 2GB/day + 300 SMS/month + Disney+ Hotstar',
    price: 399,
    validity: 28,
    validityUnit: 'days',
    data: 2,
    dataUnit: 'GB',
    voice: -1,
    sms: 300,
    isPopular: false,
    isBestValue: true,
    category: 'unlimited',
    features: ['Unlimited calls', '2GB/day', '300 SMS/month', 'Airtel Xstream', 'Disney+ Hotstar'],
    offerPrice: 399,
    offerDescription: 'Best Value Plan',
  },
];

// DTH Plans
export const mockDTHPlans: Plan[] = [
  {
    id: 'plan_201',
    name: 'Silver',
    description: '150+ Channels',
    price: 299,
    validity: 30,
    validityUnit: 'days',
    isPopular: false,
    isBestValue: true,
    category: 'unlimited',
    features: ['150+ Channels', 'HD Quality'],
    offerPrice: 299,
    offerDescription: 'Best Value',
  },
  {
    id: 'plan_202',
    name: 'Gold',
    description: '200+ Channels',
    price: 499,
    validity: 30,
    validityUnit: 'days',
    isPopular: true,
    isBestValue: false,
    category: 'unlimited',
    features: ['200+ Channels', 'HD Quality', 'Record'],
    offerPrice: 499,
    offerDescription: 'Popular Choice',
  },
  {
    id: 'plan_203',
    name: 'Platinum',
    description: '250+ Channels',
    price: 799,
    validity: 30,
    validityUnit: 'days',
    isPopular: false,
    isBestValue: false,
    category: 'unlimited',
    features: ['250+ Channels', '4K Quality', 'Record', 'Premium Channels'],
    offerPrice: 799,
    offerDescription: 'Premium',
  },
];

// Set plans for operators
mockOperators[0].plans = mockJioPlans;
mockOperators[1].plans = mockAirtelPlans;
mockOperators[4].plans = mockDTHPlans;
mockOperators[5].plans = mockDTHPlans;

// =====================
// MOCK INVESTMENTS - GOLD
// =====================

export const mockGoldPrice: GoldPrice = {
  currentPrice: 62350,
  buyPrice: 62400,
  sellPrice: 62300,
  priceChange: 450,
  priceChangePercent: 0.73,
  lastUpdated: now.toISOString(),
  gram24k: 6235,
  gram22k: 5715,
  gram18k: 4676,
};

export const mockGoldInvestment: Investment = {
  id: 'inv_gold_001',
  type: 'GOLD',
  name: 'Digital Gold',
  symbol: 'GOLD',
  currentPrice: mockGoldPrice.currentPrice,
  openingPrice: 61900,
  previousClosingPrice: 61900,
  priceChange: 450,
  priceChangePercent: 0.73,
  quantity: 2.5,
  investedAmount: 155750,
  currentValue: 155875,
  profitLoss: 125,
  profitLossPercent: 0.08,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: now.toISOString(),
};

// =====================
// MOCK MUTUAL FUNDS
// =====================

export const mockMutualFunds: MutualFund[] = [
  {
    id: 'mf_001',
    name: 'SBI Blue Chip Fund',
    schemeCode: 'SBINEW',
    fundHouse: 'SBI MF',
    category: 'Equity',
    subCategory: 'Large Cap',
    nav: 752.34,
    navDate: today,
    return1Y: 18.5,
    return3Y: 15.2,
    return5Y: 12.8,
    returnSinceInception: 14.5,
    riskLevel: 'HIGH',
    minimumInvestment: 500,
  },
  {
    id: 'mf_002',
    name: 'HDFC Top 100 Fund',
    schemeCode: 'HDFNEW',
    fundHouse: 'HDFC MF',
    category: 'Equity',
    subCategory: 'Large Cap',
    nav: 892.45,
    navDate: today,
    return1Y: 16.2,
    return3Y: 14.8,
    return5Y: 11.5,
    returnSinceInception: 13.2,
    riskLevel: 'HIGH',
    minimumInvestment: 500,
  },
  {
    id: 'mf_003',
    name: 'ICICI Pru Blue Chip',
    schemeCode: 'ICICINEW',
    fundHouse: 'ICICI Pru MF',
    category: 'Equity',
    subCategory: 'Large Cap',
    nav: 67.89,
    navDate: today,
    return1Y: 17.8,
    return3Y: 15.5,
    return5Y: 12.2,
    returnSinceInception: 14.8,
    riskLevel: 'HIGH',
    minimumInvestment: 500,
  },
  {
    id: 'mf_004',
    name: 'Mirae Asset Large Cap',
    schemeCode: 'MIRAENEW',
    fundHouse: 'Mirae Asset MF',
    category: 'Equity',
    subCategory: 'Large Cap',
    nav: 84.56,
    navDate: today,
    return1Y: 21.2,
    return3Y: 18.5,
    return5Y: 15.8,
    returnSinceInception: 16.2,
    riskLevel: 'HIGH',
    minimumInvestment: 500,
  },
  {
    id: 'mf_005',
    name: 'Axis Blue Chip',
    schemeCode: 'AXISNEW',
    fundHouse: 'Axis MF',
    category: 'Equity',
    subCategory: 'Large Cap',
    nav: 78.92,
    navDate: today,
    return1Y: 19.5,
    return3Y: 16.8,
    return5Y: 13.5,
    returnSinceInception: 15.2,
    riskLevel: 'HIGH',
    minimumInvestment: 500,
  },
  {
    id: 'mf_006',
    name: 'Kotak Standard Multicap',
    schemeCode: 'KOTAKNEW',
    fundHouse: 'Kotak MF',
    category: 'Equity',
    subCategory: 'Multi Cap',
    nav: 1847.23,
    navDate: today,
    return1Y: 22.5,
    return3Y: 19.2,
    return5Y: 16.5,
    returnSinceInception: 17.8,
    riskLevel: 'HIGH',
    minimumInvestment: 500,
  },
  {
    id: 'mf_007',
    name: 'HDFC Hybrid Equity',
    schemeCode: 'HDFCHY',
    fundHouse: 'HDFC MF',
    category: 'Hybrid',
    subCategory: 'Aggressive',
    nav: 452.67,
    navDate: today,
    return1Y: 14.2,
    return3Y: 12.5,
    return5Y: 10.8,
    returnSinceInception: 12.2,
    riskLevel: 'MODERATE',
    minimumInvestment: 500,
  },
  {
    id: 'mf_008',
    name: 'SBI Balanced Advantage',
    schemeCode: 'SBIBAL',
    fundHouse: 'SBI MF',
    category: 'Hybrid',
    subCategory: 'Balanced',
    nav: 23.45,
    navDate: today,
    return1Y: 12.8,
    return3Y: 11.2,
    return5Y: 9.5,
    returnSinceInception: 10.8,
    riskLevel: 'MODERATE',
    minimumInvestment: 500,
  },
  {
    id: 'mf_009',
    name: 'HDFC Short Term Debt',
    schemeCode: 'HDFCST',
    fundHouse: 'HDFC MF',
    category: 'Debt',
    subCategory: 'Short Duration',
    nav: 24.56,
    navDate: today,
    return1Y: 6.5,
    return3Y: 5.8,
    return5Y: 6.2,
    returnSinceInception: 7.2,
    riskLevel: 'LOW',
    minimumInvestment: 5000,
  },
  {
    id: 'mf_010',
    name: 'SBI Liquid Fund',
    schemeCode: 'SBILIQ',
    fundHouse: 'SBI MF',
    category: 'Debt',
    subCategory: 'Liquid',
    nav: 3245.67,
    navDate: today,
    return1Y: 5.2,
    return3Y: 4.8,
    return5Y: 5.5,
    returnSinceInception: 6.2,
    riskLevel: 'LOW',
    minimumInvestment: 500,
  },
];

// =====================
// MOCK INSURANCE
// =====================

export const mockInsurancePolicies: InsurancePolicy[] = [
  {
    id: 'ins_001',
    type: 'TERM',
    provider: ' LIC',
    policyNumber: 'LIC/TM/78945612',
    name: 'LIC eTerm',
    sumAssured: 10000000,
    premiumAmount: 8500,
    premiumFrequency: 'YEARLY',
    nextDueDate: '2026-01-15',
    coverStartDate: '2023-01-15',
    coverEndDate: '2043-01-15',
    status: 'ACTIVE',
  },
  {
    id: 'ins_002',
    type: 'HEALTH',
    provider: 'Star Health',
    policyNumber: 'SH/HE/45678912',
    name: 'Star Comprehensive',
    sumAssured: 500000,
    premiumAmount: 12500,
    premiumFrequency: 'YEARLY',
    nextDueDate: '2025-11-30',
    coverStartDate: '2023-06-01',
    coverEndDate: '2024-05-31',
    status: 'ACTIVE',
  },
  {
    id: 'ins_003',
    type: 'MOTOR',
    provider: 'ICICI Lombard',
    policyNumber: 'ICICI/MC/12345678',
    name: 'Motor Insurance - Car',
    sumAssured: 1500000,
    premiumAmount: 8500,
    premiumFrequency: 'YEARLY',
    nextDueDate: '2025-09-15',
    coverStartDate: '2023-09-15',
    coverEndDate: '2024-09-14',
    status: 'ACTIVE',
  },
];

// =====================
// MOCK PORTFOLIO
// =====================

export const mockPortfolio: Portfolio = {
  id: 'portfolio_001',
  userId: 'user_001',
  investments: [mockGoldInvestment],
  totalValue: 155875,
  todaysChange: 125,
  todaysChangePercent: 0.08,
  overallProfitLoss: 125,
  overallProfitLossPercent: 0.08,
  lastUpdated: now.toISOString(),
};

// =====================
// AI ASSISTANT MESSAGES
// =====================

export const mockAIMessages: AIAssistantMessage[] = [
  {
    id: 'ai_001',
    type: 'assistant',
    message: 'Hello! I\'m your PayX Assistant. How can I help you today?',
    timestamp: now.toISOString(),
    quickActions: [
      { id: 'qa_001', label: 'Send Money', action: 'send_money' },
      { id: 'qa_002', label: 'Scan QR', action: 'scan_qr' },
      { id: 'qa_003', label: 'Recharge', action: 'recharge' },
      { id: 'qa_004', label: 'Check Balance', action: 'check_balance' },
    ],
  },
];

// =====================
// MOCK BILLS
// =====================

export const mockBills: Bill[] = [
  {
    id: 'bill_001',
    type: 'electricity',
    number: 'MSEB-12345678',
    operatorId: 'op_008',
    operatorName: 'MSEB',
    amount: 2450,
    dueDate: '2025-05-15',
    status: 'PENDING',
    consumerName: 'Rahul Sharma',
    billNumber: 'MSEB/2025/04/1234',
  },
  {
    id: 'bill_002',
    type: 'mobile',
    number: '9876543210',
    operatorId: 'op_001',
    operatorName: 'Jio',
    amount: 299,
    dueDate: '2025-05-10',
    status: 'PENDING',
    consumerName: 'Rahul Sharma',
  },
  {
    id: 'bill_003',
    type: 'water',
    number: 'MCGM-WATER-123456',
    operatorId: 'op_011',
    operatorName: 'MCGM Water',
    amount: 850,
    dueDate: '2025-06-01',
    status: 'PENDING',
    consumerName: 'Rahul Sharma',
  },
];

// =====================
// QUICK ACTIONS
// =====================

export const mockQuickActions = [
  { id: 'qa_001', label: 'Mobile', icon: '📱', color: '#6C5CE7', action: 'recharge' },
  { id: 'qa_002', label: 'DTH', icon: '📺', color: '#00CEC9', action: 'recharge' },
  { id: 'qa_003', label: 'Electricity', icon: '⚡', color: '#FDCB6E', action: 'recharge' },
  { id: 'qa_004', label: 'Water', icon: '💧', color: '#74B9FF', action: 'recharge' },
  { id: 'qa_005', label: 'Gas', icon: '🔥', color: '#FD79A8', action: 'recharge' },
  { id: 'qa_006', label: 'Credit Card', icon: '💳', color: '#E84393', action: 'recharge' },
  { id: 'qa_007', label: 'FASTag', icon: '🚗', color: '#55EFC4', action: 'recharge' },
  { id: 'qa_008', label: 'Insurance', icon: '🛡️', color: '#A29BFE', action: 'recharge' },
];

// =====================
// INVESTMENT CATEGORIES
// =====================

export const mockInvestmentCategories = [
  {
    id: 'inv_cat_001',
    name: 'Gold',
    icon: '🥇',
    color: '#FDCB6E',
    description: 'Digital Gold',
    type: 'GOLD' as const,
  },
  {
    id: 'inv_cat_002',
    name: 'Mutual Funds',
    icon: '📈',
    color: '#6C5CE7',
    description: ' SIP Investments',
    type: 'MUTUAL_FUND' as const,
  },
  {
    id: 'inv_cat_003',
    name: 'Insurance',
    icon: '🛡️',
    color: '#00CEC9',
    description: 'Life & Health',
    type: 'INSURANCE' as const,
  },
];

// Service types for recharge
export const mockServiceTypes: { id: ServiceType; name: string; icon: string; color: string }[] = [
  { id: 'mobile', name: 'Mobile', icon: '📱', color: '#6C5CE7' },
  { id: 'dth', name: 'DTH', icon: '📺', color: '#00CEC9' },
  { id: 'electricity', name: 'Electricity', icon: '⚡', color: '#FDCB6E' },
  { id: 'water', name: 'Water', icon: '💧', color: '#74B9FF' },
  { id: 'gas', name: 'Gas', icon: '🔥', color: '#FD79A8' },
  { id: 'credit_card', name: 'Credit Card', icon: '💳', color: '#E84393' },
  { id: 'fastag', name: 'FASTag', icon: '🚗', color: '#55EFC4' },
  { id: 'insurance', name: 'Insurance', icon: '🛡️', color: '#A29BFE' },
];

// =====================
// UTILITY FUNCTIONS
// =====================

// Generate unique IDs
export const generateId = (prefix: string): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Format currency
export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format date
export const formatDate = (dateString: string, format: 'short' | 'long' | 'time' = 'short'): string => {
  const date = new Date(dateString);
  
  if (format === 'time') {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }
  
  if (format === 'long') {
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

// Simulate API delay
export const simulateDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Pagination helper
export const paginate = <T>(items: T[], page: number, limit: number): { data: T[]; hasMore: boolean; totalPages: number } => {
  const totalPages = Math.ceil(items.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    data: items.slice(startIndex, endIndex),
    hasMore: page < totalPages,
    totalPages,
  };
};

// Filter helpers
export const filterByType = <T extends { type: string }>(items: T[], type: string): T[] => {
  return items.filter(item => item.type === type);
};

export const filterByStatus = <T extends { status: string }>(items: T[], status: string): T[] => {
  return items.filter(item => item.status === status);
};

// Sort helpers
export const sortByDate = <T extends { createdAt: string }>(items: T[], order: 'asc' | 'desc' = 'desc'): T[] => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const sortByAmount = <T extends { amount: number }>(items: T[], order: 'asc' | 'desc' = 'desc'): T[] => {
  return [...items].sort((a, b) => {
    return order === 'desc' ? b.amount - a.amount : a.amount - b.amount;
  });
};

// Search helper
export const searchItems = <T extends { name?: string; title?: string; note?: string }>(
  items: T[], 
  query: string
): T[] => {
  const lowerQuery = query.toLowerCase();
  return items.filter(item => 
    item.name?.toLowerCase().includes(lowerQuery) ||
    item.title?.toLowerCase().includes(lowerQuery) ||
    item.note?.toLowerCase().includes(lowerQuery)
  );
};

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Validate UPI ID format
export const isValidUPI = (upiId: string): boolean => {
  const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}$/;
  return upiRegex.test(upiId);
};

// Validate phone number
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Format phone number
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

// Generate random transaction UTR
export const generateUTR = (): string => {
  return `UTR${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
};

// Chip data for charts
export const generateChartData = (days: number = 30, startValue: number = 60000): { timestamp: number; value: number }[] => {
  const data: { timestamp: number; value: number }[] = [];
  let currentValue = startValue;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random fluctuation between -1% and +1%
    const change = (Math.random() - 0.5) * 0.02 * currentValue;
    currentValue += change;
    
    data.push({
      timestamp: date.getTime(),
      value: Math.round(currentValue * 100) / 100,
    });
  }
  
  return data;
};

// Export all mock data
export const mockData = {
  user: mockUser,
  contacts: mockContacts,
  transactions: mockTransactions,
  merchants: mockMerchants,
  operators: mockOperators,
  goldPrice: mockGoldPrice,
  goldInvestment: mockGoldInvestment,
  mutualFunds: mockMutualFunds,
  insurancePolicies: mockInsurancePolicies,
  portfolio: mockPortfolio,
  aiMessages: mockAIMessages,
  bills: mockBills,
  quickActions: mockQuickActions,
  investmentCategories: mockInvestmentCategories,
  serviceTypes: mockServiceTypes,
  jioPlans: mockJioPlans,
  airtelPlans: mockAirtelPlans,
  dthPlans: mockDTHPlans,
};