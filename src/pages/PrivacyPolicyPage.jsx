import React from 'react';
import GenericPage from './GenericPage';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = ({ t, currentLang }) => {
  const pageData = t.privacyPolicyPage || {};
  const pageTitle = pageData.title || 'Privacy Policy';
  const pageDescription = pageData.description || '';
  const content = pageData.content || [];

  return (
    <GenericPage pageKey="privacyPolicy" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang}>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200/50">
        {content.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-8"
          >
            <h2 className={`text-2xl font-bold text-primary mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{section.title}</h2>
            <div className={`text-gray-700 leading-relaxed space-y-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {Array.isArray(section.text) ? section.text.map((p, i) => <p key={i}>{p}</p>) : <p>{section.text}</p>}
            </div>
            {section.points && (
              <ul className={`mt-4 space-y-3 ${currentLang === 'ar' ? 'pr-5' : 'pl-5'}`}>
                {section.points.map((point, i) => (
                  <li key={i} className={`flex items-start text-gray-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                    <span className="text-primary font-bold mr-3 rtl:ml-3">-</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </GenericPage>
  );
};

export default PrivacyPolicyPage;