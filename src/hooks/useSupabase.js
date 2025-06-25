import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export const useSupabaseQuery = (table, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase.from(table).select(options.select || '*');
      
      if (options.filters) {
        options.filters.forEach(filter => {
          query = query.eq(filter.column, filter.value);
        });
      }
      
      if (options.orderBy) {
        query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending });
      }
      
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data: result, error } = await query;
      
      if (error) throw error;
      
      setData(result || []);
    } catch (err) {
      setError(err);
      console.error(`Error fetching ${table}:`, err);
    } finally {
      setLoading(false);
    }
  }, [table, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const useSupabaseMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (operation) => {
    try {
      setLoading(true);
      setError(null);
      const result = await operation();
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};

export const useServiceProviders = () => {
  return useSupabaseQuery('service_providers', {
    select: `
      *,
      profiles!service_providers_profile_id_fkey(full_name, phone)
    `,
    orderBy: { column: 'created_at', ascending: false }
  });
};

export const useUmrahPackages = (filters = {}) => {
  return useSupabaseQuery('umrah_packages', {
    select: `
      *,
      service_providers!umrah_packages_provider_id_fkey(
        company_name,
        profiles!service_providers_profile_id_fkey(full_name)
      )
    `,
    filters: Object.entries(filters).map(([key, value]) => ({ column: key, value })),
    orderBy: { column: 'created_at', ascending: false }
  });
};

export const useHajjPackages = (filters = {}) => {
  return useSupabaseQuery('hajj_packages', {
    select: `
      *,
      service_providers!hajj_packages_provider_id_fkey(
        company_name,
        profiles!service_providers_profile_id_fkey(full_name)
      )
    `,
    filters: Object.entries(filters).map(([key, value]) => ({ column: key, value })),
    orderBy: { column: 'created_at', ascending: false }
  });
};

export const useFlights = (filters = {}) => {
  return useSupabaseQuery('flights', {
    select: `
      *,
      service_providers!flights_provider_id_fkey(
        company_name,
        profiles!service_providers_profile_id_fkey(full_name)
      )
    `,
    filters: Object.entries(filters).map(([key, value]) => ({ column: key, value })),
    orderBy: { column: 'departure_time', ascending: true }
  });
};

export const useHotels = (filters = {}) => {
  return useSupabaseQuery('hotels', {
    select: `
      *,
      service_providers!hotels_provider_id_fkey(
        company_name,
        profiles!service_providers_profile_id_fkey(full_name)
      )
    `,
    filters: Object.entries(filters).map(([key, value]) => ({ column: key, value })),
    orderBy: { column: 'created_at', ascending: false }
  });
};

export const useStoreProducts = (filters = {}) => {
  return useSupabaseQuery('store_products', {
    filters: Object.entries(filters).map(([key, value]) => ({ column: key, value })),
    orderBy: { column: 'created_at', ascending: false }
  });
};

export const useOrders = (userId = null) => {
  const options = {
    select: `
      *,
      order_items(*)
    `,
    orderBy: { column: 'created_at', ascending: false }
  };

  if (userId) {
    options.filters = [{ column: 'user_id', value: userId }];
  }

  return useSupabaseQuery('orders', options);
};

export const useVisaApplications = (userId = null) => {
  const options = {
    orderBy: { column: 'created_at', ascending: false }
  };

  if (userId) {
    options.filters = [{ column: 'user_id', value: userId }];
  }

  return useSupabaseQuery('visa_applications', options);
};

export const useComplaints = (userId = null) => {
  const options = {
    orderBy: { column: 'created_at', ascending: false }
  };

  if (userId) {
    options.filters = [{ column: 'user_id', value: userId }];
  }

  return useSupabaseQuery('complaints', options);
};