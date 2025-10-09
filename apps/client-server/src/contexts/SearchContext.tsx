"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Quote, QuoteApiResponse } from '@/types/quote';

export interface SearchFilters {
  nights: string;
  people: string;
  destination: string;
  priceRange: string;
  departureDate: string;
  holidayType: string; // For holiday type filtering
  country: string;
  region: string;
  resort: string;
  category: string;
}

interface SearchContextType {
  filters: SearchFilters;
  quotes: Quote[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalQuotes: number;
    hasMore: boolean;
  };
  updateFilters: (newFilters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  loadMore: () => Promise<void>;
  searchQuotes: () => Promise<void>;
}

const defaultFilters: SearchFilters = {
  nights: '',
  people: '',
  destination: '',
  priceRange: '',
  departureDate: '',
  holidayType: '',
  country: '',
  region: '',
  resort: '',
  category: ''
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalQuotes: 0,
    hasMore: false
  });

  const ITEMS_PER_PAGE = 16;

  const buildQueryParams = useCallback((page: number = 1) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', ITEMS_PER_PAGE.toString());

    if (filters.nights) params.append('nights', filters.nights);
    if (filters.people) params.append('people', filters.people);
    if (filters.priceRange) params.append('priceRange', filters.priceRange);
    if (filters.departureDate) params.append('departureDate', filters.departureDate);
    if (filters.destination) params.append('destination', filters.destination);
    if (filters.holidayType) params.append('holidayType', filters.holidayType);
    if (filters.country) params.append('country', filters.country);
    if (filters.region) params.append('region', filters.region);
    if (filters.resort) params.append('resort', filters.resort);
    if (filters.category) params.append('category', filters.category);

    return params.toString();
  }, [filters]);

  const fetchQuotes = useCallback(async (page: number = 1, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const queryString = buildQueryParams(page);
      const response = await fetch(`/api/quotes?${queryString}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: QuoteApiResponse = await response.json();

      if (append) {
        setQuotes(prev => [...prev, ...data.data]);
      } else {
        setQuotes(data.data);
      }
      
      setPagination({
        currentPage: data.meta.currentPage,
        totalPages: data.meta.totalPages,
        totalQuotes: data.meta.total,
        hasMore: data.meta.currentPage < data.meta.totalPages
      });    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [buildQueryParams]);

  const searchQuotes = useCallback(async () => {
    await fetchQuotes(1, false);
  }, [fetchQuotes]);

  const loadMore = async () => {
    if (pagination.hasMore && !loading) {
      await fetchQuotes(pagination.currentPage + 1, true);
    }
  };

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setQuotes([]);
    setPagination({
      currentPage: 1,
      totalPages: 0,
      totalQuotes: 0,
      hasMore: false
    });
  };

  // Initial load and auto-search when filters change
  useEffect(() => {
    const hasActiveFilters = Object.values(filters).some(value => value !== '');
    if (hasActiveFilters) {
      searchQuotes();
    }
  }, [filters, searchQuotes]);

  // Load initial quotes on mount
  useEffect(() => {
    fetchQuotes(1, false);
  }, [fetchQuotes]);

  // All filtering is now handled server-side by the API

  return (
    <SearchContext.Provider value={{
      filters,
      quotes,
      loading,
      error,
      pagination,
      updateFilters,
      resetFilters,
      loadMore,
      searchQuotes
    }}>
      {children}
    </SearchContext.Provider>
  );
};