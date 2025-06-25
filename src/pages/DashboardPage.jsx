import React from 'react';
import GenericPage from './GenericPage';
import { useAuth } from '@/context/AuthContext';
import SuperAdminDashboard from '@/components/dashboard/SuperAdminDashboard';
import ServiceProviderDashboard from '@/components/dashboard/ServiceProviderDashboard';
import CustomerDashboard from '@/components/dashboard/CustomerDashboard';

const DashboardPage = ({ t, handleFeatureClick, currentLang, dashboardType }) => {
  const { user } = useAuth();
  
  let pageTitle = "";
  let pageSpecificDescription = "";

  switch (dashboardType) {
    case 'superAdmin':
      pageTitle = t.nav.superAdminDashboard;
      pageSpecificDescription = t.dashboards.superAdmin.description;
      break;
    case 'serviceProvider':
      pageTitle = t.nav.serviceProviderDashboard;
      pageSpecificDescription = t.dashboards.serviceProvider.description;
      break;
    case 'customer':
      pageTitle = t.nav.customerDashboard;
      pageSpecificDescription = t.dashboards.customer.description;
      break;
    default:
      pageTitle = currentLang === 'ar' ? 'لوحة التحكم' : 'Dashboard';
      pageSpecificDescription = currentLang === 'ar' ? 'لوحة التحكم الرئيسية.' : 'Main dashboard area.';
  }

  const renderDashboardContent = () => {
    if (!user) {
      return (
        <div className="text-center p-8">
          <p className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            {currentLang === 'ar' ? 'يرجى تسجيل الدخول لعرض لوحة التحكم.' : 'Please log in to view the dashboard.'}
          </p>
        </div>
      );
    }

    switch (dashboardType) {
      case 'superAdmin':
        return <SuperAdminDashboard t={t} currentLang={currentLang} />;
      case 'serviceProvider':
        return <ServiceProviderDashboard t={t} currentLang={currentLang} />;
      case 'customer':
        return <CustomerDashboard t={t} currentLang={currentLang} />;
      default:
        return null;
    }
  };

  return (
    <GenericPage 
      pageKey={dashboardType} 
      pageTitle={pageTitle} 
      pageDescription={pageSpecificDescription} 
      t={t} 
      currentLang={currentLang} 
      isDashboard={true}
    >
      {renderDashboardContent()}
    </GenericPage>
  );
};

export default DashboardPage;