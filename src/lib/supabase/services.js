import { supabase } from './client';

export const serviceProviderService = {
  async getAll() {
    const { data, error } = await supabase
      .from('service_providers')
      .select(`
        *,
        profiles!service_providers_profile_id_fkey(full_name, phone)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(data) {
    const { data: result, error } = await supabase
      .from('service_providers')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async update(id, data) {
    const { data: result, error } = await supabase
      .from('service_providers')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async approve(id) {
    return this.update(id, { is_approved: true });
  },

  async reject(id) {
    return this.update(id, { is_approved: false });
  }
};

export const packageService = {
  async getUmrahPackages(filters = {}) {
    let query = supabase
      .from('umrah_packages')
      .select(`
        *,
        service_providers!umrah_packages_provider_id_fkey(
          company_name,
          profiles!service_providers_profile_id_fkey(full_name)
        )
      `)
      .eq('is_active', true);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) query = query.eq(key, value);
    });

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getHajjPackages(filters = {}) {
    let query = supabase
      .from('hajj_packages')
      .select(`
        *,
        service_providers!hajj_packages_provider_id_fkey(
          company_name,
          profiles!service_providers_profile_id_fkey(full_name)
        )
      `)
      .eq('is_active', true);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) query = query.eq(key, value);
    });

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createUmrahPackage(data) {
    const { data: result, error } = await supabase
      .from('umrah_packages')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async createHajjPackage(data) {
    const { data: result, error } = await supabase
      .from('hajj_packages')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  }
};

export const flightService = {
  async getAll(filters = {}) {
    let query = supabase
      .from('flights')
      .select(`
        *,
        service_providers!flights_provider_id_fkey(
          company_name
        )
      `)
      .eq('is_active', true);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) query = query.eq(key, value);
    });

    const { data, error } = await query.order('departure_time', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async create(data) {
    const { data: result, error } = await supabase
      .from('flights')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  }
};

export const hotelService = {
  async getAll(filters = {}) {
    let query = supabase
      .from('hotels')
      .select(`
        *,
        service_providers!hotels_provider_id_fkey(
          company_name
        )
      `)
      .eq('is_active', true);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) query = query.eq(key, value);
    });

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(data) {
    const { data: result, error } = await supabase
      .from('hotels')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  }
};

export const storeService = {
  async getProducts(filters = {}) {
    let query = supabase
      .from('store_products')
      .select('*')
      .eq('is_active', true);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) query = query.eq(key, value);
    });

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createProduct(data) {
    const { data: result, error } = await supabase
      .from('store_products')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  }
};

export const orderService = {
  async getAll(userId = null) {
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(orderData, orderItems) {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
    
    if (orderError) throw orderError;

    const itemsWithOrderId = orderItems.map(item => ({
      ...item,
      order_id: order.id
    }));

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsWithOrderId)
      .select();
    
    if (itemsError) throw itemsError;

    return { order, items };
  }
};

export const visaService = {
  async getAll(userId = null) {
    let query = supabase
      .from('visa_applications')
      .select(`
        *,
        profiles!visa_applications_user_id_fkey(
          full_name,
          email,
          phone
        )
      `);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(data) {
    const { data: result, error } = await supabase
      .from('visa_applications')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async updateStatus(id, status) {
    const { data: result, error } = await supabase
      .from('visa_applications')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  }
};

export const complaintService = {
  async getAll(userId = null) {
    let query = supabase
      .from('complaints')
      .select(`
        *,
        profiles!complaints_user_id_fkey(
          full_name
        )
      `);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(data) {
    const { data: result, error } = await supabase
      .from('complaints')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async updateStatus(id, status) {
    const { data: result, error } = await supabase
      .from('complaints')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  }
};