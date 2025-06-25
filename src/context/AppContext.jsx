import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user } = useAuth();

  const [cart, setCart] = useState([]);
  const [services, setServices] = useState({
    umrahPackages: [],
    hajjPackages: [],
    flights: [],
    hotels: [],
    trainTickets: [],
    transportServices: [],
    storeProducts: [],
  });
  const [orders, setOrders] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);

  const hajjCompanies = [
    { id: 'hajj-1', name: 'شركة الحرمين للحج والعمرة', city: 'مكة المكرمة', rating: 4.8 },
    { id: 'hajj-2', name: 'مؤسسة الأنصار للحج والعمرة', city: 'المدينة المنورة', rating: 4.6 },
    { id: 'hajj-3', name: 'شركة المشاعر المقدسة', city: 'مكة المكرمة', rating: 4.9 },
    { id: 'hajj-4', name: 'مجموعة الحج الذهبي', city: 'جدة', rating: 4.7 },
    { id: 'hajj-5', name: 'شركة الطواف للحج والعمرة', city: 'مكة المكرمة', rating: 4.5 },
    { id: 'hajj-6', name: 'مؤسسة الهدى للحج والعمرة', city: 'المدينة المنورة', rating: 4.4 }
  ];

  useEffect(() => {
    const storedCart = localStorage.getItem('go-umrah-cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('go-umrah-cart');
      }
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('go-umrah-cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('go-umrah-cart');
    }
  }, [cart]);

  const loadAllServices = async () => {
    setLoadingServices(true);
    try {
      const [
        umrahData, hajjData, flightsData, hotelsData, 
        trainData, transportData, storeData
      ] = await Promise.allSettled([
        supabase.from('umrah_packages').select('*'),
        supabase.from('hajj_packages').select('*'),
        supabase.from('flights').select('*'),
        supabase.from('hotels').select('*'),
        supabase.from('haramain_train_tickets').select('*'),
        supabase.from('transport_services').select('*'),
        supabase.from('store_products').select('*')
      ]);

      setServices({
        umrahPackages: umrahData.status === 'fulfilled' ? umrahData.value.data || [] : [],
        hajjPackages: hajjData.status === 'fulfilled' ? hajjData.value.data || [] : [],
        flights: flightsData.status === 'fulfilled' ? flightsData.value.data || [] : [],
        hotels: hotelsData.status === 'fulfilled' ? hotelsData.value.data || [] : [],
        trainTickets: trainData.status === 'fulfilled' ? trainData.value.data || [] : [],
        transportServices: transportData.status === 'fulfilled' ? transportData.value.data || [] : [],
        storeProducts: storeData.status === 'fulfilled' ? storeData.value.data || [] : [],
      });
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoadingServices(false);
    }
  };

  const loadUserOrders = async () => {
    if (!user) return;
    try {
      const { data } = await supabase.from('orders').select('*, order_items(*)').eq('user_id', user.id);
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading user orders:', error);
    }
  };

  useEffect(() => {
    loadAllServices();
  }, []);

  useEffect(() => {
    if (user) {
      loadUserOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  const addToCart = (item, itemType) => {
    const cartItem = { ...item, cartId: Date.now() + Math.random(), type: itemType, quantity: item.quantity || 1 };
    setCart(prevCart => [...prevCart, cartItem]);
  };

  const removeFromCart = (cartId) => {
    setCart(prevCart => prevCart.filter(item => item.cartId !== cartId));
  };

  const updateCartItemQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item => 
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('go-umrah-cart');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = typeof item.price === 'string' 
        ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) 
        : item.price;
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  const processCheckout = async (paymentMethod = 'cash') => {
    if (!user || cart.length === 0) {
      throw new Error('User must be logged in and cart must not be empty');
    }

    try {
      const total = getCartTotal();
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({ user_id: user.id, total_amount: total, status: 'pending' })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cart.map(item => ({
        order_id: order.id,
        item_type: item.type,
        item_id: item.id,
        quantity: item.quantity || 1,
        price_at_purchase: typeof item.price === 'string' 
          ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) 
          : item.price
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      clearCart();
      await loadUserOrders();

      return order;
    } catch (error) {
      console.error('Error processing checkout:', error);
      throw error;
    }
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    processCheckout,
    orders,
    services,
    loadingServices,
    loadUserOrders,
    hajjCompanies,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};