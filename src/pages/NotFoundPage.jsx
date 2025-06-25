import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = ({ t, currentLang }) => {
  const pageTitle = currentLang === 'ar' ? 'صفحة غير موجودة' : 'Page Not Found';
  const message = currentLang === 'ar' ? 'عذراً، الصفحة التي تبحث عنها غير موجودة.' : 'Sorry, the page you are looking for does not exist.';
  const goHomeText = currentLang === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Go back to Homepage';

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} - ${t.siteName}`}</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={`container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center text-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        >
          <AlertTriangle className="h-24 w-24 text-primary mx-auto mb-8" />
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {pageTitle}
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {message}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <Link
            to="/"
            className="btn-primary inline-flex items-center px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {goHomeText}
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
};

export default NotFoundPage;