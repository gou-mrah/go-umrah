import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Building, Star } from 'lucide-react';

const StatsSection = ({ t, currentLang }) => {
  const statsData = [
    { number: '50,000+', label: t.stats.customers, icon: Users },
    { number: '15+', label: t.stats.experience, icon: Clock },
    { number: '200+', label: t.stats.packages, icon: Building },
    { number: '4.9/5', label: t.stats.rating, icon: Star }
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-white"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-4 text-gold" />
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{stat.number}</div>
              <div className={`text-white/80 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;