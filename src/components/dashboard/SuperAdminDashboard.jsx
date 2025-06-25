import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ShoppingBag, FileText, PackagePlus, Store } from 'lucide-react';
import { useServiceProviders, useUmrahPackages, useHajjPackages, useStoreProducts, useOrders, useVisaApplications, useComplaints } from '@/hooks/useSupabase';
import { serviceProviderService, storeService, visaService, complaintService } from '@/lib/supabase';
import { useSupabaseMutation } from '@/hooks/useSupabase';
import { useToast } from '@/components/ui/use-toast';

import OverviewTab from './super-admin/OverviewTab';
import ProvidersTab from './super-admin/ProvidersTab';
import ProductsTab from './super-admin/ProductsTab';
import VisasTab from './super-admin/VisasTab';
import ComplaintsTab from './super-admin/ComplaintsTab';

const SuperAdminDashboard = ({ t, currentLang }) => {
  const { data: providers, loading: providersLoading, refetch: refetchProviders } = useServiceProviders();
  const { data: umrahPackages, refetch: refetchUmrah } = useUmrahPackages();
  const { data: hajjPackages, refetch: refetchHajj } = useHajjPackages();
  const { data: products, refetch: refetchProducts } = useStoreProducts();
  const { data: orders, refetch: refetchOrders } = useOrders();
  const { data: visaApplications, refetch: refetchVisas } = useVisaApplications();
  const { data: complaints, refetch: refetchComplaints } = useComplaints();
  const { mutate } = useSupabaseMutation();
  const { toast } = useToast();

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock_quantity: ''
  });

  const handleProviderStatusChange = async (providerId, isApproved) => {
    try {
      await mutate(() => 
        isApproved 
          ? serviceProviderService.approve(providerId)
          : serviceProviderService.reject(providerId)
      );
      
      toast({
        title: currentLang === 'ar' ? 'تم التحديث' : 'Updated',
        description: currentLang === 'ar' 
          ? `تم ${isApproved ? 'قبول' : 'رفض'} مقدم الخدمة بنجاح`
          : `Service provider ${isApproved ? 'approved' : 'rejected'} successfully`,
      });
      
      refetchProviders();
    } catch (error) {
      toast({
        title: currentLang === 'ar' ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await mutate(() => storeService.createProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock_quantity: parseInt(newProduct.stock_quantity)
      }));
      
      toast({
        title: currentLang === 'ar' ? 'تم الإنشاء' : 'Created',
        description: currentLang === 'ar' ? 'تم إنشاء المنتج بنجاح' : 'Product created successfully',
      });
      
      setNewProduct({ name: '', description: '', price: '', category: '', stock_quantity: '' });
      refetchProducts();
    } catch (error) {
      toast({
        title: currentLang === 'ar' ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleVisaStatusUpdate = async (applicationId, status) => {
    try {
      await mutate(() => visaService.updateStatus(applicationId, status));
      
      toast({
        title: currentLang === 'ar' ? 'تم التحديث' : 'Updated',
        description: currentLang === 'ar' ? 'تم تحديث حالة طلب التأشيرة' : 'Visa application status updated',
      });
      refetchVisas();
    } catch (error) {
      toast({
        title: currentLang === 'ar' ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleComplaintStatusUpdate = async (complaintId, status) => {
    try {
      await mutate(() => complaintService.updateStatus(complaintId, status));
      
      toast({
        title: currentLang === 'ar' ? 'تم التحديث' : 'Updated',
        description: currentLang === 'ar' ? 'تم تحديث حالة الشكوى' : 'Complaint status updated',
      });
      refetchComplaints();
    } catch (error) {
      toast({
        title: currentLang === 'ar' ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const stats = [
    { title: currentLang === 'ar' ? 'مقدمو الخدمات' : 'Service Providers', value: providers?.length || 0, icon: Users },
    { title: currentLang === 'ar' ? 'باقات العمرة' : 'Umrah Packages', value: umrahPackages?.length || 0, icon: PackagePlus },
    { title: currentLang === 'ar' ? 'باقات الحج' : 'Hajj Packages', value: hajjPackages?.length || 0, icon: PackagePlus },
    { title: currentLang === 'ar' ? 'المنتجات' : 'Products', value: products?.length || 0, icon: Store },
    { title: currentLang === 'ar' ? 'الطلبات' : 'Orders', value: orders?.length || 0, icon: ShoppingBag },
    { title: currentLang === 'ar' ? 'طلبات التأشيرة' : 'Visa Applications', value: visaApplications?.length || 0, icon: FileText },
  ];

  return (
    <Tabs defaultValue="overview" className="w-full mt-4">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'نظرة عامة' : 'Overview'}
        </TabsTrigger>
        <TabsTrigger value="providers" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'مقدمو الخدمات' : 'Providers'}
        </TabsTrigger>
        <TabsTrigger value="products" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'المنتجات' : 'Products'}
        </TabsTrigger>
        <TabsTrigger value="visas" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'التأشيرات' : 'Visas'}
        </TabsTrigger>
        <TabsTrigger value="complaints" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'الشكاوى' : 'Complaints'}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <OverviewTab 
          stats={stats}
          orders={orders}
          visaApplications={visaApplications}
          handleVisaStatusUpdate={handleVisaStatusUpdate}
          t={t}
          currentLang={currentLang}
        />
      </TabsContent>

      <TabsContent value="providers">
        <ProvidersTab 
          providers={providers}
          providersLoading={providersLoading}
          handleProviderStatusChange={handleProviderStatusChange}
          t={t}
          currentLang={currentLang}
        />
      </TabsContent>

      <TabsContent value="products">
        <ProductsTab 
          products={products}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleCreateProduct={handleCreateProduct}
          t={t}
          currentLang={currentLang}
        />
      </TabsContent>

      <TabsContent value="visas">
        <VisasTab 
          visaApplications={visaApplications}
          handleVisaStatusUpdate={handleVisaStatusUpdate}
          t={t}
          currentLang={currentLang}
        />
      </TabsContent>

      <TabsContent value="complaints">
        <ComplaintsTab 
          complaints={complaints}
          handleComplaintStatusUpdate={handleComplaintStatusUpdate}
          t={t}
          currentLang={currentLang}
        />
      </TabsContent>
    </Tabs>
  );
};

export default SuperAdminDashboard;