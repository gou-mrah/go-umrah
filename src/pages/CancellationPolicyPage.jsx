import React from 'react';
import GenericPage from './GenericPage';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const CancellationPolicyPage = ({ t, currentLang }) => {
  const pageData = t.cancellationPolicyPage || {};
  const pageTitle = pageData.title || 'Cancellation Policy';
  const pageDescription = pageData.description || '';
  const content = pageData.content || [];

  return (
    <GenericPage pageKey="cancellationPolicy" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang}>
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

        {pageData.note && (
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: content.length * 0.1 }}
            className="mt-10 p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3 rtl:mr-3 rtl:ml-0">
                  <p className={`text-sm text-yellow-700 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                    {pageData.note}
                  </p>
                </div>
              </div>
          </motion.div>
        )}
      </div>
    </GenericPage>
  );
};

export default CancellationPolicyPage;