import { supabase } from '@/lib/supabase';

export const serviceProviderService = {
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
  },

  async updateUmrahPackage(id, data) {
    const { data: result, error } = await supabase
      .from('umrah_packages')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async updateHajjPackage(id, data) {
    const { data: result, error } = await supabase
      .from('hajj_packages')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async deleteUmrahPackage(id) {
    const { error } = await supabase
      .from('umrah_packages')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async deleteHajjPackage(id) {
    const { error } = await supabase
      .from('hajj_packages')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const flightService = {
  async create(data) {
    const { data: result, error } = await supabase
      .from('flights')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async update(id, data) {
    const { data: result, error } = await supabase
      .from('flights')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async delete(id) {
    const { error } = await supabase
      .from('flights')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const hotelService = {
  async create(data) {
    const { data: result, error } = await supabase
      .from('hotels')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async update(id, data) {
    const { data: result, error } = await supabase
      .from('hotels')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async delete(id) {
    const { error } = await supabase
      .from('hotels')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const trainService = {
  async create(data) {
    const { data: result, error } = await supabase
      .from('haramain_train_tickets')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async update(id, data) {
    const { data: result, error } = await supabase
      .from('haramain_train_tickets')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async delete(id) {
    const { error } = await supabase
      .from('haramain_train_tickets')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const transportService = {
  async create(data) {
    const { data: result, error } = await supabase
      .from('transport_services')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async update(id, data) {
    const { data: result, error } = await supabase
      .from('transport_services')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async delete(id) {
    const { error } = await supabase
      .from('transport_services')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const storeService = {
  async createProduct(data) {
    const { data: result, error } = await supabase
      .from('store_products')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async updateProduct(id, data) {
    const { data: result, error } = await supabase
      .from('store_products')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async deleteProduct(id) {
    const { error } = await supabase
      .from('store_products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const orderService = {
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
  },

  async updateStatus(id, status) {
    const { data: result, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  }
};

export const visaService = {
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

export const reviewService = {
  async create(data) {
    const { data: result, error } = await supabase
      .from('reviews')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async update(id, data) {
    const { data: result, error } = await supabase
      .from('reviews')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async delete(id) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};