import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/context/AuthContext';
import { useServiceProviders, useUmrahPackages, useHajjPackages, useSupabaseMutation } from '@/hooks/useSupabase';
import { serviceProviderService, packageService } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

import RegistrationForm from './service-provider/RegistrationForm';
import PendingApproval from './service-provider/PendingApproval';
import PackagesTab from './service-provider/PackagesTab';
import AddPackageForm from './service-provider/AddPackageForm';
import ProfileTab from './service-provider/ProfileTab';

const ServiceProviderDashboard = ({ t, currentLang }) => {
  const { user } = useAuth();
  const { data: serviceProviders, refetch: refetchProviders } = useServiceProviders();
  const { data: umrahPackages, refetch: refetchUmrah } = useUmrahPackages();
  const { data: hajjPackages, refetch: refetchHajj } = useHajjPackages();
  const { mutate } = useSupabaseMutation();
  const { toast } = useToast();

  const [registrationData, setRegistrationData] = useState({
    company_name: '',
    commercial_registration_number: '',
    tourism_license_number: '',
    address: ''
  });

  const [packageData, setPackageData] = useState({
    title: '',
    description: '',
    price: '',
    duration_days: '',
    city: '',
    hotel_rating: '',
    includes: '',
    type: 'umrah'
  });

  const currentProvider = useMemo(() => serviceProviders?.find(p => p.profile_id === user?.id), [serviceProviders, user]);

  const handleRegisterProvider = async (e) => {
    e.preventDefault();
    try {
      await mutate(() => serviceProviderService.create({
        ...registrationData,
        profile_id: user.id
      }));
      toast({
        title: currentLang === 'ar' ? 'تم الإرسال' : 'Submitted',
        description: currentLang === 'ar' ? 'تم إرسال طلبك للمراجعة' : 'Your application has been submitted for review',
      });
      setRegistrationData({ company_name: '', commercial_registration_number: '', tourism_license_number: '', address: '' });
      refetchProviders();
    } catch (error) {
      toast({
        title: currentLang === 'ar' ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleCreatePackage = async (e) => {
    e.preventDefault();
    try {
      const packagePayload = {
        ...packageData,
        provider_id: currentProvider.id,
        price: parseFloat(packageData.price),
        duration_days: parseInt(packageData.duration_days),
        hotel_rating: packageData.hotel_rating ? parseInt(packageData.hotel_rating) : null,
        includes: packageData.includes.trim() ? JSON.parse(packageData.includes) : null,
        is_active: true,
      };

      if (packageData.type === 'umrah') {
        await mutate(() => packageService.createUmrahPackage(packagePayload));
        refetchUmrah();
      } else {
        await mutate(() => packageService.createHajjPackage(packagePayload));
        refetchHajj();
      }
      
      toast({
        title: currentLang === 'ar' ? 'تم الإنشاء' : 'Created',
        description: currentLang === 'ar' ? 'تم إنشاء الباقة بنجاح' : 'Package created successfully',
      });
      
      setPackageData({ title: '', description: '', price: '', duration_days: '', city: '', hotel_rating: '', includes: '', type: 'umrah' });
    } catch (error) {
      toast({
        title: currentLang === 'ar' ? 'خطأ' : 'Error',
        description: `JSON format for 'includes' may be invalid. ${error.message}`,
        variant: 'destructive',
      });
    }
  };
  
  if (!currentProvider) {
    return (
      <RegistrationForm
        registrationData={registrationData}
        setRegistrationData={setRegistrationData}
        handleRegisterProvider={handleRegisterProvider}
        currentLang={currentLang}
      />
    );
  }

  if (!currentProvider.is_approved) {
    return <PendingApproval currentLang={currentLang} />;
  }
  
  const providerUmrahPackages = umrahPackages?.filter(pkg => pkg.provider_id === currentProvider.id) || [];
  const providerHajjPackages = hajjPackages?.filter(pkg => pkg.provider_id === currentProvider.id) || [];

  return (
    <Tabs defaultValue="packages" className="w-full mt-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="packages" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'الباقات' : 'Packages'}
        </TabsTrigger>
        <TabsTrigger value="create" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'إضافة باقة' : 'Add Package'}
        </TabsTrigger>
        <TabsTrigger value="profile" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'الملف الشخصي' : 'Profile'}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="packages">
        <PackagesTab
          umrahPackages={providerUmrahPackages}
          hajjPackages={providerHajjPackages}
          currentLang={currentLang}
        />
      </TabsContent>

      <TabsContent value="create">
        <AddPackageForm
          packageData={packageData}
          setPackageData={setPackageData}
          handleCreatePackage={handleCreatePackage}
          currentLang={currentLang}
        />
      </TabsContent>

      <TabsContent value="profile">
        <ProfileTab provider={currentProvider} currentLang={currentLang} />
      </TabsContent>
    </Tabs>
  );
};

export default ServiceProviderDashboard;