// PayX Ultra Pro - Custom Hooks
// Reusable hooks for common functionality

import { useState, useEffect, useCallback, useRef } from 'react';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../context/ThemeContext';
import { simulateDelay, paginate } from '../data/mockData';

// =====================
// HAPTIC FEEDBACK HOOK
// =====================

export const useHapticFeedback = () => {
  const { settings } = useTheme();
  
  const impactLight = useCallback(async () => {
    if (settings?.hapticEnabled !== false) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [settings?.hapticEnabled]);
  
  const impactMedium = useCallback(async () => {
    if (settings?.hapticEnabled !== false) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [settings?.hapticEnabled]);
  
  const impactHeavy = useCallback(async () => {
    if (settings?.hapticEnabled !== false) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }, [settings?.hapticEnabled]);
  
  const selection = useCallback(async () => {
    if (settings?.hapticEnabled !== false) {
      await Haptics.selectionAsync();
    }
  }, [settings?.hapticEnabled]);
  
  const notification = useCallback(async (type: 'success' | 'warning' | 'error') => {
    if (settings?.hapticEnabled !== false) {
      switch (type) {
        case 'success':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'warning':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
        case 'error':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
      }
    }
  }, [settings?.hapticEnabled]);
  
  return {
    impactLight,
    impactMedium,
    impactHeavy,
    selection,
    notification,
  };
};

// =====================
// LOADING STATE HOOK
// =====================

interface LoadingState {
  isLoading: boolean;
  isRefreshing: boolean;
  isPaginating: boolean;
  error: string | null;
}

export const useLoading = (initialState: boolean = false) => {
  const [state, setState] = useState<LoadingState>({
    isLoading: initialState,
    isRefreshing: false,
    isPaginating: false,
    error: null,
  });
  
  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading, error: null }));
  }, []);
  
  const setRefreshing = useCallback((refreshing: boolean) => {
    setState(prev => ({ ...prev, isRefreshing: refreshing, error: null }));
  }, []);
  
  const setPaginating = useCallback((paginating: boolean) => {
    setState(prev => ({ ...prev, isPaginating: paginating, error: null }));
  }, []);
  
  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error, isLoading: false, isRefreshing: false, isPaginating: false }));
  }, []);
  
  const reset = useCallback(() => {
    setState({
      isLoading: false,
      isRefreshing: false,
      isPaginating: false,
      error: null,
    });
  }, []);
  
  return {
    ...state,
    setLoading,
    setRefreshing,
    setPaginating,
    setError,
    reset,
  };
};

// =====================
// PAGINATION HOOK
// =====================

interface PaginationResult<T> {
  data: T[];
  isLoading: boolean;
  isRefreshing: boolean;
  isPaginating: boolean;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
  error: string | null;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  reset: () => void;
}

export const usePagination = <T,>(
  fetchFn: (page: number) => Promise<T[]>,
  pageSize: number = 10,
  initialData: T[] = []
): PaginationResult<T> => {
  const [data, setData] = useState<T[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = useCallback(async (page: number, refresh: boolean = false) => {
    try {
      if (refresh) {
        setIsRefreshing(true);
      } else if (page === 1) {
        setIsLoading(true);
      } else {
        setIsPaginating(true);
      }
      
      setError(null);
      
      const newData = await fetchFn(page);
      const totalP = Math.ceil(newData.length / pageSize);
      
      if (refresh || page === 1) {
        setData(newData);
      } else {
        setData(prev => [...prev, ...newData]);
      }
      
      setCurrentPage(page);
      setTotalPages(totalP);
      setHasMore(page < totalP);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      setIsPaginating(false);
    }
  }, [pageSize]);
  
  useEffect(() => {
    fetchData(1);
  }, []);
  
  const refresh = useCallback(async () => {
    await fetchData(1, true);
  }, [fetchData]);
  
  const loadMore = useCallback(async () => {
    if (!isPaginating && hasMore) {
      await fetchData(currentPage + 1);
    }
  }, [currentPage, hasMore, isPaginating, fetchData]);
  
  const reset = useCallback(() => {
    setData(initialData);
    setCurrentPage(1);
    setHasMore(false);
    setError(null);
  }, [initialData]);
  
  return {
    data,
    isLoading,
    isRefreshing,
    isPaginating,
    hasMore,
    currentPage,
    totalPages,
    error,
    refresh,
    loadMore,
    reset,
  };
};

// =====================
// INFINITE SCROLL HOOK
// =====================

interface InfiniteScrollResult {
  isLoading: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  error: string | null;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  refresh: () => Promise<void>;
}

export const useInfiniteScroll = <T,>(
  items: T[],
  fetchMore: () => Promise<void>,
  hasMore: boolean,
  isLoading: boolean = false,
  threshold: number = 200
): InfiniteScrollResult => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchMore();
        }
      },
      { rootMargin: `${threshold}px` }
    );
    
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    
    return () => observer.disconnect();
  }, [hasMore, isLoading, threshold, fetchMore]);
  
  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await fetchMore();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchMore]);
  
  return {
    isLoading,
    isRefreshing,
    hasMore,
    error,
    loadMoreRef: loadMoreRef as React.RefObject<HTMLDivElement>,
    refresh,
  };
};

// =====================
// PULL TO REFRESH HOOK
// =====================

interface PullToRefreshResult {
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const usePullToRefresh = (
  onRefresh: () => Promise<void>
): PullToRefreshResult => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  }, [onRefresh]);
  
  return {
    isRefreshing,
    onRefresh: refresh,
  };
};

// =====================
// SKELETON LOADER HOOK
// =====================

interface SkeletonItem {
  width: number | string;
  height: number;
  borderRadius: number;
}

export const useSkeletonLoader = (
  items: number = 5,
  pattern: SkeletonItem[] = [
    { width: '100%', height: 80, borderRadius: 12 },
    { width: '100%', height: 80, borderRadius: 12 },
    { width: '100%', height: 80, borderRadius: 12 },
    { width: '100%', height: 80, borderRadius: 12 },
    { width: '100%', height: 80, borderRadius: 12 },
  ]
): SkeletonItem[] => {
  const skeletonItems: SkeletonItem[] = [];
  
  for (let i = 0; i < items; i++) {
    const patternIndex = i % pattern.length;
    skeletonItems.push({
      width: pattern[patternIndex].width,
      height: pattern[patternIndex].height,
      borderRadius: pattern[patternIndex].borderRadius,
    });
  }
  
  return skeletonItems;
};

// =====================
// ANIMATION HOOK
// =====================

interface AnimationConfig {
  duration: number;
  easing?: (value: number) => number;
}

export const useMicroAnimation = (
  config: AnimationConfig = { duration: 300 }
) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  
  const startAnimation = useCallback((callback?: () => void) => {
    setIsAnimating(true);
    setAnimationProgress(0);
    
    setTimeout(() => {
      setAnimationProgress(1);
      if (callback) callback();
    }, config.duration);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, config.duration);
  }, [config.duration]);
  
  const reset = useCallback(() => {
    setIsAnimating(false);
    setAnimationProgress(0);
  }, []);
  
  return {
    isAnimating,
    animationProgress,
    startAnimation,
    reset,
    progress: animationProgress,
  };
};

// =====================
// SEARCH HOOK
// =====================

export const useSearch = <T,>(
  items: T[],
  searchFn: (items: T[], query: string) => T[]
) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(() => {
    if (!query) {
      setFilteredItems(items);
      return;
    }
    
    setIsSearching(true);
    const results = searchFn(items, query);
    setFilteredItems(results);
    setIsSearching(false);
  }, [query, items, searchFn]);
  
  const clearSearch = useCallback(() => {
    setQuery('');
    setFilteredItems(items);
  }, [items]);
  
  const updateQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);
  
  return {
    query,
    filteredItems,
    isSearching,
    clearSearch,
    updateQuery,
    hasResults: filteredItems.length > 0,
    hasQuery: query.length > 0,
  };
};

// =====================
// TIMER HOOK
// =====================

export const useTimer = (
  initialSeconds: number = 60,
  onComplete?: () => void
) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            setIsActive(false);
            setIsComplete(true);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds, onComplete]);
  
  const start = useCallback(() => {
    setSeconds(initialSeconds);
    setIsActive(true);
    setIsComplete(false);
  }, [initialSeconds]);
  
  const pause = useCallback(() => {
    setIsActive(false);
  }, []);
  
  const resume = useCallback(() => {
    if (seconds > 0) {
      setIsActive(true);
    }
  }, [seconds]);
  
  const reset = useCallback(() => {
    setSeconds(initialSeconds);
    setIsActive(false);
    setIsComplete(false);
  }, [initialSeconds]);
  
  return {
    seconds,
    isActive,
    isComplete,
    start,
    pause,
    resume,
    reset,
    formattedTime: `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`,
  };
};

// =====================
// DEBOUNCE HOOK
// =====================

export const useDebounce = <T,>(
  value: T,
  delay: number = 300
): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
};

// =====================
// FORMAT HOOK
// =====================

export const useFormatters = () => {
  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  }, []);
  
  const formatNumber = useCallback((num: number): string => {
    return new Intl.NumberFormat('en-IN').format(num);
  }, []);
  
  const formatCompact = useCallback((num: number): string => {
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(2)}Cr`;
    }
    if (num >= 100000) {
      return `${(num / 100000).toFixed(2)}L`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toString();
  }, []);
  
  const formatDate = useCallback((date: string | Date, format: 'short' | 'long' | 'time' = 'short'): string => {
    const d = new Date(date);
    
    if (format === 'time') {
      return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    }
    
    if (format === 'long') {
      return d.toLocaleDateString('en-IN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }, []);
  
  const formatRelativeTime = useCallback((date: string | Date): string => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }, []);
  
  const formatPhone = useCallback((phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
  }, []);
  
  return {
    formatCurrency,
    formatNumber,
    formatCompact,
    formatDate,
    formatRelativeTime,
    formatPhone,
  };
};

// =====================
// VALIDATION HOOK
// =====================

interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

export const useValidation = () => {
  const validateUPI = useCallback((upiId: string): ValidationResult => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}$/;
    if (!upiId) {
      return { isValid: false, error: 'UPI ID is required' };
    }
    if (!upiRegex.test(upiId)) {
      return { isValid: false, error: 'Invalid UPI ID format' };
    }
    return { isValid: true, error: null };
  }, []);
  
  const validatePhone = useCallback((phone: string): ValidationResult => {
    const cleaned = phone.replace(/\D/g, '');
    if (!cleaned) {
      return { isValid: false, error: 'Phone number is required' };
    }
    if (cleaned.length !== 10) {
      return { isValid: false, error: 'Phone number must be 10 digits' };
    }
    if (!/^[6-9]/.test(cleaned)) {
      return { isValid: false, error: 'Phone number must start with 6-9' };
    }
    return { isValid: true, error: null };
  }, []);
  
  const validateAmount = useCallback((amount: number, min: number = 1, max: number = 100000): ValidationResult => {
    if (!amount || amount <= 0) {
      return { isValid: false, error: 'Amount is required' };
    }
    if (amount < min) {
      return { isValid: false, error: `Minimum amount is ₹${min}` };
    }
    if (amount > max) {
      return { isValid: false, error: `Maximum amount is ₹${max}` };
    }
    return { isValid: true, error: null };
  }, []);
  
  const validatePIN = useCallback((pin: string): ValidationResult => {
    if (!pin) {
      return { isValid: false, error: 'PIN is required' };
    }
    if (pin.length !== 4) {
      return { isValid: false, error: 'PIN must be 4 digits' };
    }
    if (!/^\d{4}$/.test(pin)) {
      return { isValid: false, error: 'PIN must contain only digits' };
    }
    return { isValid: true, error: null };
  }, []);
  
  return {
    validateUPI,
    validatePhone,
    validateAmount,
    validatePIN,
  };
};

// =====================
// STORAGE HOOK
// =====================

export const useStorage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const save = useCallback(async <T,>(key: string, data: T): Promise<void> => {
    setIsSaving(true);
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } finally {
      setIsSaving(false);
    }
  }, []);
  
  const load = useCallback(async <T,>(key: string): Promise<T | null> => {
    setIsLoading(true);
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const remove = useCallback(async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  }, []);
  
  return {
    isSaving,
    isLoading,
    save,
    load,
    remove,
  };
};

// =====================
// KEYBOARD HOOK
// =====================

export const useKeyboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (event) => {
      setIsVisible(true);
      setKeyboardHeight(event.endCoordinates.height);
    });
    
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsVisible(false);
      setKeyboardHeight(0);
    });
    
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  
  return {
    isVisible,
    keyboardHeight,
  };
};

// Need to import Keyboard
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';