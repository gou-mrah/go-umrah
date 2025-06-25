import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Star } from 'lucide-react';

const FeaturesSection = ({ t, currentLang }) => {
  const featuresData = [
    { icon: Shield, key: 'trust' },
    { icon: Clock, key: 'support' },
    { icon: Star, key: 'experience' } 
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            {t.features.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => {
            const IconComponent = feature.icon;
            const featureContent = t.features[feature.key];
            
            if (!featureContent) {
              console.error(`Feature content for key "${feature.key}" is undefined in t.features:`, t.features);
              return null; 
            }

            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-8 rounded-xl bg-gray-50 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="service-icon bg-primary mb-6">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                  {featureContent.title}
                </h3>
                <p className={`text-gray-600 leading-relaxed ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                  {featureContent.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;