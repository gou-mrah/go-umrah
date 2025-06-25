import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const IntroPage = ({ onFinish }) => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <img 
        className="absolute inset-0 w-full h-full object-cover opacity-60 blur-sm"
        alt="The Holy Kaaba in Mecca at night, with a soft glow"
       src="https://images.unsplash.com/photo-1691486187220-0b581d19c796" />

      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[50vw] h-[50vh] bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 text-center text-white flex flex-col items-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 100, damping: 12 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold font-arabic [text-shadow:0_0_15px_rgba(255,215,0,0.6),0_0_30px_rgba(0,0,0,0.5)]" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
            جو عمرة
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-2xl sm:text-3xl font-semibold font-arabic text-gold [text-shadow:1px_1px_5px_rgba(0,0,0,0.5)]"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          خدمتكم شرف وأجر
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12"
        >
          <Button
            onClick={onFinish}
            size="lg"
            className="bg-gold hover:bg-gold/90 text-primary px-10 py-6 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group font-arabic"
          >
            استكشف المنصة
            <ArrowLeft className="mr-3 h-6 w-6 transform transition-transform duration-300 group-hover:-translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroPage;