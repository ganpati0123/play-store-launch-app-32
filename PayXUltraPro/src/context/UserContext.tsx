// PayX Ultra Pro - User Context
// Manages user data, favorites, history, and settings

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  Contact, 
  Transaction, 
  FavoriteItem, 
  ActivityHistory, 
  User, 
  ServiceType,
  Bill 
} from '../types';
import { mockUser, mockContacts, mockTransactions, mockBills } from '../data/mockData';

// Storage keys
const FAVORITES_KEY = '@PayXUltraPro:favorites';
const HISTORY_KEY = '@PayXUltraPro:history';
const CONTACTS_KEY = '@PayXUltraPro:contacts';
const TRANSACTIONS_KEY = '@PayXUltraPro:transactions';
const USER_KEY = '@PayXUltraPro:user';
const SETTINGS_KEY = '@PayXUltraPro:settings';
const BILLS_KEY = '@PayXUltraPro:bills';

// Default user settings
const defaultSettings = {
  theme: 'system',
  hapticEnabled: true,
  soundEnabled: true,
  biometricEnabled: false,
  pinEnabled: true,
  defaultPaymentMethod: 'upi',
  autoLockTimeout: 5,
};

interface UserContextType {
  // User
  user: User | null;
  updateUser: (updates: Partial<User>) => Promise<void>;
  
  // Contacts
  contacts: Contact[];
  addContact: (contact: Contact) => Promise<void>;
  removeContact: (id: string) => Promise<void>;
  updateContact: (id: string, updates: Partial<Contact>) => Promise<void>;
  
  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => Promise<void>;
  
  // Favorites
  favorites: FavoriteItem[];
  addFavorite: (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string, type: string) => boolean;
  
  // History
  history: ActivityHistory[];
  addHistory: (item: Omit<ActivityHistory, 'id' | 'timestamp'>) => Promise<void>;
  clearHistory: () => Promise<void>;
  
  // Bills
  bills: Bill[];
  addBill: (bill: Bill) => Promise<void>;
  markBillAsPaid: (id: string) => Promise<void>;
  
  // Settings
  settings: typeof defaultSettings;
  updateSettings: (updates: Partial<typeof defaultSettings>) => Promise<void>;
  
  // Loading states
  isLoading: boolean;
  isInitialized: boolean;
  
  // Helper functions
  getContactById: (id: string) => Contact | undefined;
  getTransactionById: (id: string) => Transaction | undefined;
  searchContacts: (query: string) => Contact[];
  searchTransactions: (query: string) => Transaction[];
  getRecentContacts: (limit?: number) => Contact[];
  getFavoriteContacts: () => Contact[];
  getTransactionsByType: (type: string) => Transaction[];
  getTransactionsByStatus: (status: string) => Transaction[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [history, setHistory] = useState<ActivityHistory[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [settings, setSettings] = useState<typeof defaultSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize all data on mount
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    setIsLoading(true);
    
    try {
      // Load user
      const savedUser = await AsyncStorage.getItem(USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(mockUser);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(mockUser));
      }
      
      // Load contacts
      const savedContacts = await AsyncStorage.getItem(CONTACTS_KEY);
      if (savedContacts) {
        setContacts(JSON.parse(savedContacts));
      } else {
        setContacts(mockContacts);
        await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(mockContacts));
      }
      
      // Load transactions
      const savedTransactions = await AsyncStorage.getItem(TRANSACTIONS_KEY);
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      } else {
        setTransactions(mockTransactions);
        await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(mockTransactions));
      }
      
      // Load favorites
      const savedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
      
      // Load history
      const savedHistory = await AsyncStorage.getItem(HISTORY_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      
      // Load bills
      const savedBills = await AsyncStorage.getItem(BILLS_KEY);
      if (savedBills) {
        setBills(JSON.parse(savedBills));
      } else {
        setBills(mockBills);
        await AsyncStorage.setItem(BILLS_KEY, JSON.stringify(mockBills));
      }
      
      // Load settings
      const savedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // User functions
  const updateUser = useCallback(async (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  }, [user]);

  // Contacts functions
  const addContact = useCallback(async (contact: Contact) => {
    const newContacts = [...contacts, contact];
    setContacts(newContacts);
    await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(newContacts));
  }, [contacts]);

  const removeContact = useCallback(async (id: string) => {
    const newContacts = contacts.filter(c => c.id !== id);
    setContacts(newContacts);
    await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(newContacts));
  }, [contacts]);

  const updateContact = useCallback(async (id: string, updates: Partial<Contact>) => {
    const newContacts = contacts.map(c => c.id === id ? { ...c, ...updates } : c);
    setContacts(newContacts);
    await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(newContacts));
  }, [contacts]);

  // Transactions functions
  const addTransaction = useCallback(async (transaction: Transaction) => {
    const newTransactions = [transaction, ...transactions];
    setTransactions(newTransactions);
    await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(newTransactions));
  }, [transactions]);

  // Favorites functions
  const addFavorite = useCallback(async (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => {
    const newFavorite: FavoriteItem = {
      ...item,
      id: `fav_${Date.now()}`,
      addedAt: new Date().toISOString(),
    };
    const newFavorites = [...favorites, newFavorite];
    setFavorites(newFavorites);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  }, [favorites]);

  const removeFavorite = useCallback(async (id: string) => {
    const newFavorites = favorites.filter(f => f.id !== id);
    setFavorites(newFavorites);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  }, [favorites]);

  const isFavorite = useCallback((id: string, type: string): boolean => {
    return favorites.some(f => f.data.id === id && f.type === type);
  }, [favorites]);

  // History functions
  const addHistoryItem = useCallback(async (item: Omit<ActivityHistory, 'id' | 'timestamp'>) => {
    const newHistoryItem: ActivityHistory = {
      ...item,
      id: `hist_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    const newHistory = [newHistoryItem, ...history].slice(0, 100); // Keep last 100 items
    setHistory(newHistory);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  }, [history]);

  const clearHistory = useCallback(async () => {
    setHistory([]);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify([]));
  }, []);

  // Bills functions
  const addBill = useCallback(async (bill: Bill) => {
    const newBills = [...bills, bill];
    setBills(newBills);
    await AsyncStorage.setItem(BILLS_KEY, JSON.stringify(newBills));
  }, [bills]);

  const markBillAsPaid = useCallback(async (id: string) => {
    const newBills = bills.map(b => 
      b.id === id ? { ...b, status: 'PAID' as const, paymentDate: new Date().toISOString() } : b
    );
    setBills(newBills);
    await AsyncStorage.setItem(BILLS_KEY, JSON.stringify(newBills));
  }, [bills]);

  // Settings functions
  const updateSettings = useCallback(async (updates: Partial<typeof defaultSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  }, [settings]);

  // Helper functions
  const getContactById = useCallback((id: string): Contact | undefined => {
    return contacts.find(c => c.id === id);
  }, [contacts]);

  const getTransactionById = useCallback((id: string): Transaction | undefined => {
    return transactions.find(t => t.id === id);
  }, [transactions]);

  const searchContacts = useCallback((query: string): Contact[] => {
    if (!query) return contacts;
    const lowerQuery = query.toLowerCase();
    return contacts.filter(c => 
      c.name.toLowerCase().includes(lowerQuery) ||
      c.phone.includes(query) ||
      c.upiId.toLowerCase().includes(lowerQuery)
    );
  }, [contacts]);

  const searchTransactions = useCallback((query: string): Transaction[] => {
    if (!query) return transactions;
    const lowerQuery = query.toLowerCase();
    return transactions.filter(t => 
      t.recipientName.toLowerCase().includes(lowerQuery) ||
      t.senderName.toLowerCase().includes(lowerQuery) ||
      t.note?.toLowerCase().includes(lowerQuery) ||
      t.utr?.toLowerCase().includes(lowerQuery)
    );
  }, [transactions]);

  const getRecentContacts = useCallback((limit?: number): Contact[] => {
    const sorted = [...contacts].sort((a, b) => {
      const dateA = a.lastTransactionDate ? new Date(a.lastTransactionDate).getTime() : 0;
      const dateB = b.lastTransactionDate ? new Date(b.lastTransactionDate).getTime() : 0;
      return dateB - dateA;
    });
    return limit ? sorted.slice(0, limit) : sorted;
  }, [contacts]);

  const getFavoriteContacts = useCallback((): Contact[] => {
    return contacts.filter(c => c.isFavorite);
  }, [contacts]);

  const getTransactionsByType = useCallback((type: string): Transaction[] => {
    return transactions.filter(t => t.type === type);
  }, [transactions]);

  const getTransactionsByStatus = useCallback((status: string): Transaction[] => {
    return transactions.filter(t => t.status === status);
  }, [transactions]);

  const value: UserContextType = {
    user,
    updateUser,
    contacts,
    addContact,
    removeContact,
    updateContact,
    transactions,
    addTransaction,
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    history,
    addHistory: addHistoryItem,
    clearHistory,
    bills,
    addBill,
    markBillAsPaid,
    settings,
    updateSettings,
    isLoading,
    isInitialized,
    getContactById,
    getTransactionById,
    searchContacts,
    searchTransactions,
    getRecentContacts,
    getFavoriteContacts,
    getTransactionsByType,
    getTransactionsByStatus,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;