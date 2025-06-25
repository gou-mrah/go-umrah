import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import AboutUsPage from '@/pages/AboutUsPage';
import UmrahPackagesPage from '@/pages/UmrahPackagesPage';
import HajjPackagesPage from '@/pages/HajjPackagesPage';
import HajjCompanyDetailsPage from '@/pages/HajjCompanyDetailsPage';
import FlightsPage from '@/pages/FlightsPage';
import HotelsPage from '@/pages/HotelsPage';
import HaramainTrainPage from '@/pages/HaramainTrainPage';
import VisasPage from '@/pages/VisasPage';
import TransportPage from '@/pages/TransportPage';
import StorePage from '@/pages/StorePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import CheckoutPage from '@/pages/CheckoutPage';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage';
import ServiceProviderDetailsPage from '@/pages/ServiceProviderDetailsPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsAndConditionsPage from '@/pages/TermsAndConditionsPage';
import CancellationPolicyPage from '@/pages/CancellationPolicyPage';
import ComplaintsPage from '@/pages/ComplaintsPage';
import LicensesPage from '@/pages/LicensesPage';
import FAQPage from '@/pages/FAQPage';
import NotFoundPage from '@/pages/NotFoundPage'; 
import IntroPage from '@/pages/IntroPage';
import TestPage from '@/pages/TestPage';
import AllLinksPage from '@/pages/AllLinksPage';
import { content as appContent } from '@/lib/content/index';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

function App() {
  const [currentLang, setCurrentLang] = useState('ar');
  const { toast } = useToast();
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(false);
  const { addToCart } = useApp();
  const { user, logout } = useAuth();

  useEffect(() => {
    const introShown = localStorage.getItem('introShown');
    if (!introShown) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroFinish = () => {
    setShowIntro(false);
    localStorage.setItem('introShown', 'true');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleLanguage = (langCode) => {
    const newLang = langCode || (currentLang === 'ar' ? 'en' : 'ar');
    setCurrentLang(newLang);
    
    const langNames = {
      ar: 'العربية', en: 'English', id: 'Bahasa Indonesia', ur: 'اردو', 
      hi: 'हिन्दी', ms: 'Bahasa Melayu', fa: 'فارسی', tr: 'Türkçe',
      ml: 'മലയാളം', ha: 'Hausa', es: 'Español', uz: 'O\'zbekcha', de: 'Deutsch'
    };
    
    toast({
      title: newLang === 'en' ? "Language switched to English" : 
            newLang === 'ar' ? "تم تغيير اللغة إلى العربية" :
            `Language changed to ${langNames[newLang]}`,
      description: newLang === 'en' ? "The interface language has been changed" : 
                  newLang === 'ar' ? "تم تغيير لغة الواجهة" :
                  "Interface language has been updated",
    });
  };

  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = ['ar', 'ur', 'fa'].includes(currentLang) ? 'rtl' : 'ltr';
    if (['ar', 'ur', 'fa'].includes(currentLang)) {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-english');
    } else {
      document.body.classList.add('font-english');
      document.body.classList.remove('font-arabic');
    }
  }, [currentLang]);

  const handleAddToCart = (item, itemType) => {
    addToCart({ ...item, type: itemType });
    toast({
      title: currentLang === 'ar' ? "تمت الإضافة إلى السلة" : "Added to Cart",
      description: `${item.name} ${currentLang === 'ar' ? 'أضيفت إلى سلة مشترياتك.' : 'has been added to your cart.'}`,
    });
  };
  
  const handleFeatureClick = (featureName, path = "") => {
    const isActualPage = path && path !== "#" && !path.startsWith('/dashboard'); 
    const isDashboard = path && path.startsWith('/dashboard');

    if (isActualPage || isDashboard) {
       toast({
        title: currentLang === 'ar' ? `جاري التوجيه إلى ${featureName}` : `Redirecting to ${featureName}`,
        description: currentLang === 'ar' ? `سيتم توجيهك قريباً إلى صفحة ${featureName}.` : `You will be redirected to the ${featureName} page shortly.`,
      });
    } else {
      toast({
        title: currentLang === 'ar' ? `🚧 ${featureName} غير مطبقة بعد` : `🚧 ${featureName} isn't implemented yet`,
        description: currentLang === 'ar' ? "يمكنك طلبها في رسالتك التالية! 🚀" : "You can request it in your next prompt! 🚀",
      });
    }
  };
  

  const t = appContent[currentLang] || appContent['ar'];

  const commonPageProps = { t, handleFeatureClick, currentLang, handleAddToCart };

  if (showIntro) {
    return <IntroPage onFinish={handleIntroFinish} />;
  }

  return (
    <>
      <Helmet>
        <title>{t.siteName} - {t.tagline}</title>
        <meta name="description" content={t.heroDescriptionShort} />
      </Helmet>

      <Navbar 
        currentLang={currentLang} 
        toggleLanguage={toggleLanguage} 
        t={t} 
        handleFeatureClick={handleFeatureClick}
      />
      
      <main className="pt-20 bg-gray-50/50">
        <Routes>
          <Route path="/" element={<HomePage {...commonPageProps} />} />
          <Route path="/about-us" element={<AboutUsPage {...commonPageProps} />} />
          <Route path="/umrah-packages" element={<UmrahPackagesPage {...commonPageProps} />} />
          <Route path="/hajj-packages" element={<HajjPackagesPage {...commonPageProps} />} />
          <Route path="/hajj-company/:companyId" element={<HajjCompanyDetailsPage {...commonPageProps} />} />
          <Route path="/flights" element={<FlightsPage {...commonPageProps} />} />
          <Route path="/hotels" element={<HotelsPage {...commonPageProps} />} />
          <Route path="/haramain-train" element={<HaramainTrainPage {...commonPageProps} />} />
          <Route path="/visas" element={<VisasPage {...commonPageProps} />} />
          <Route path="/transport" element={<TransportPage {...commonPageProps} />} />
          <Route path="/store" element={<StorePage {...commonPageProps} />} />
          <Route path="/login" element={<LoginPage {...commonPageProps} />} />
          <Route path="/register" element={<RegisterPage {...commonPageProps} />} />
          <Route path="/checkout" element={<CheckoutPage {...commonPageProps} />} />
          <Route path="/confirmation/:orderId" element={<OrderConfirmationPage {...commonPageProps} />} />
          <Route path="/provider/:providerId" element={<ServiceProviderDetailsPage {...commonPageProps} />} />
          <Route path="/dashboard/super-admin" element={<DashboardPage {...commonPageProps} dashboardType="superAdmin" />} />
          <Route path="/dashboard/service-provider" element={<DashboardPage {...commonPageProps} dashboardType="serviceProvider" />} />
          <Route path="/dashboard/customer" element={<DashboardPage {...commonPageProps} dashboardType="customer" />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage {...commonPageProps} />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage {...commonPageProps} />} />
          <Route path="/cancellation-policy" element={<CancellationPolicyPage {...commonPageProps} />} />
          <Route path="/complaints" element={<ComplaintsPage {...commonPageProps} />} />
          <Route path="/licenses" element={<LicensesPage {...commonPageProps} />} />
          <Route path="/faq" element={<FAQPage {...commonPageProps} />} />
          <Route path="/test" element={<TestPage {...commonPageProps} />} />
          <Route path="/all-links" element={<AllLinksPage {...commonPageProps} />} />
          <Route path="*" element={<NotFoundPage {...commonPageProps} />} />
        </Routes>
      </main>
      
      <Footer t={t} handleFeatureClick={handleFeatureClick} currentLang={currentLang} />
      <Toaster />
    </>
  );
}

export default App;