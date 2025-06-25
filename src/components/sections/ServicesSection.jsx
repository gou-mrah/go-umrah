import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plane, Building, Train, FileText, Car, ShoppingBag } from 'lucide-react';

const ServicesSection = ({ t, handleFeatureClick, currentLang }) => {
  const services = [
    { icon: Building, key: 'umrah', path: '/umrah-packages', color: 'from-emerald-500 to-emerald-600' },
    { icon: Building, key: 'hajj', path: '/hajj-packages', color: 'from-blue-500 to-blue-600' },
    { icon: Plane, key: 'flights', path: '/flights', color: 'from-purple-500 to-purple-600' },
    { icon: Building, key: 'hotels', path: '/hotels', color: 'from-orange-500 to-orange-600' },
    { icon: Train, key: 'train', path: '/haramain-train', color: 'from-green-500 to-green-600' },
    { icon: FileText, key: 'visas', path: '/visas', color: 'from-red-500 to-red-600' },
    { icon: Car, key: 'transport', path: '/transport', color: 'from-indigo-500 to-indigo-600' },
    { icon: ShoppingBag, key: 'store', path: '/store', color: 'from-pink-500 to-pink-600' }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            {t.services.title}
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const serviceData = t.services[service.key];
            
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 card-hover group flex flex-col"
              >
                <div className={`service-icon bg-gradient-to-br ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className={`text-xl font-bold text-gray-900 mb-3 text-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                  {serviceData.title}
                </h3>
                <p className={`text-gray-600 text-center mb-4 leading-relaxed flex-grow ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                  {serviceData.description}
                </p>
                <Link to={service.path} className="w-full mt-auto">
                  <Button 
                    className={`w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg transition-all duration-300 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
                    onClick={() => handleFeatureClick(serviceData.title, service.path)}
                  >
                    {t.buttons.viewDetails}
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;