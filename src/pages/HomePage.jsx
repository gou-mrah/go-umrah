import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ContactSection from '@/components/sections/ContactSection';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HomePage = ({ t, handleFeatureClick, currentLang }) => {
  return (
    <div className="bg-gray-50/50">
      <HeroSection t={t} handleFeatureClick={handleFeatureClick} currentLang={currentLang} />
      <StatsSection t={t} currentLang={currentLang} />
      <ServicesSection t={t} handleFeatureClick={handleFeatureClick} currentLang={currentLang} />
      <FeaturesSection t={t} currentLang={currentLang} />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className={`text-3xl font-bold mb-4 text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            {currentLang === 'ar' ? 'هل لديك أسئلة؟' : 'Have Questions?'}
          </h2>
          <p className={`text-gray-600 mb-8 max-w-2xl mx-auto ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            {currentLang === 'ar' ? 'تصفح قسم الأسئلة الشائعة للعثور على إجابات سريعة لاستفساراتكم.' : 'Browse our FAQ section to find quick answers to your inquiries.'}
          </p>
          <Button asChild size="lg">
            <Link to="/faq">{currentLang === 'ar' ? 'الذهاب إلى الأسئلة الشائعة' : 'Go to FAQ'}</Link>
          </Button>
        </div>
      </motion.div>

      <ContactSection t={t} currentLang={currentLang} />
    </div>
  );
};

export default HomePage;