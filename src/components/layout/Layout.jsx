import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children, currentLang, toggleLanguage, t, handleFeatureClick }) => {
  return (
    <div className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
      <Navbar 
        currentLang={currentLang} 
        toggleLanguage={toggleLanguage} 
        t={t} 
        handleFeatureClick={handleFeatureClick} 
      />
      <main>{children}</main>
      <Footer t={t} handleFeatureClick={handleFeatureClick} currentLang={currentLang} />
      <Toaster />
    </div>
  );
};

export default Layout;