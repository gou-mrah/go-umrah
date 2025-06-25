import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const HeroSection = ({ t, handleFeatureClick, currentLang }) => {

  return (
    <section 
      className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(90vh-4rem)] lg:min-h-[calc(80vh-4rem)] flex items-center justify-center overflow-hidden"
    >
      <img  
        className="absolute inset-0 w-full h-full object-cover"
        alt="The Holy Kaaba in Mecca surrounded by pilgrims during prayer"
       src="https://images.unsplash.com/photo-1513072064285-240f87fa81e8" />

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

      <div className="absolute inset-0 islamic-pattern opacity-20"></div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8"
        >
          <div className="space-y-3 md:space-y-4">
            <motion.h1 
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white text-shadow ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {t.heroTitle}
            </motion.h1>
            <motion.p 
              className={`text-lg sm:text-xl md:text-2xl text-gold font-semibold text-shadow ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t.heroSubtitleSecondary}
            </motion.p>
          </div>

          <motion.p 
            className={`text-md sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t.heroDescriptionShort}
          </motion.p>

          <motion.div 
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center ${currentLang === 'ar' ? 'sm:space-x-reverse sm:space-x-4' : 'sm:space-x-4'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className={`bg-gold hover:bg-gold/90 text-primary px-6 sm:px-8 py-2 sm:py-3 text-md sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
              onClick={() => {
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t.buttons.bookNow}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className={`border-2 border-white text-white bg-primary/50 hover:bg-primary/70 hover:text-white px-6 sm:px-8 py-2 sm:py-3 text-md sm:text-lg font-semibold rounded-lg transition-all duration-300 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
              onClick={() => window.location.href = '/about-us'}
            >
              {t.buttons.learnMore}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute top-10 left-5 sm:top-20 sm:left-10 animate-float opacity-70">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold/10 rounded-full blur-lg"></div>
      </div>
      <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 animate-float opacity-70" style={{ animationDelay: '2s' }}>
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full blur-lg"></div>
      </div>
    </section>
  );
};

export default HeroSection;