import React from 'react';
import GenericPage from './GenericPage';
import { motion } from 'framer-motion';
import { ShieldCheck, Banknote, Landmark, Building, Tv, Users } from 'lucide-react';

const LicensesPage = ({ t, currentLang }) => {
  const pageData = t.licensesPage || {};
  const pageTitle = pageData.title || 'Official Licenses';
  const pageDescription = pageData.description || '';
  const licenses = pageData.licenses || [];

  const iconMap = {
    'سجل تجاري': Building,
    'ترخيص خدمات السفر والسياحة': Landmark,
    'شهادة توثيق تجارة إلكترونية': ShieldCheck,
    'ترخيص إعلامي': Tv,
    'شهادة معروف الإلكترونية': Users,
    'ضريبة القيمة المضافة (VAT)': Banknote,
    'الرقم الضريبي (VAT)': Banknote,
    'Commercial Registration': Building,
    'Travel and Tourism Services License': Landmark,
    'E-commerce Documentation Certificate': ShieldCheck,
    'Media License': Tv,
    'Maarouf E-certificate': Users,
    'Value Added Tax (VAT) Registration': Banknote,
    'VAT Number': Banknote,
  };

  return (
    <GenericPage pageKey="licenses" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {licenses.map((license, index) => {
            const IconComponent = iconMap[license.name] || ShieldCheck;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="p-6 bg-primary/5 flex flex-col items-center text-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                        <IconComponent className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className={`text-lg font-bold text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{license.name}</h3>
                    <p className={`text-sm text-gray-500 mt-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{license.authority}</p>
                </div>
                <div className="p-6 bg-gray-50">
                    <p className={`text-2xl font-mono text-gray-800 text-center tracking-wider bg-white border border-dashed p-3 rounded-lg dir-ltr`}>{license.number}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </GenericPage>
  );
};

export default LicensesPage;