import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Construction, Package, Plane, Hotel, Train, FileText, CarFront, ShoppingBag, UserCircle, Settings, LogIn } from 'lucide-react';

const iconMap = {
  umrahPackages: Package,
  hajjPackages: Package,
  flights: Plane,
  hotels: Hotel,
  haramainTrain: Train,
  visas: FileText,
  transport: CarFront,
  store: ShoppingBag,
  login: LogIn,
  register: UserCircle,
  default: Settings,
};

const GenericPage = ({ 
  pageKey,
  pageTitle, 
  pageDescription, 
  t, 
  currentLang, 
  isDashboard = false,
  backgroundImage,
  children 
}) => {
  const constructionTitle = currentLang === 'ar' ? 'قيد التطوير' : 'Under Development';
  const constructionMessageBase = currentLang === 'ar' 
    ? `نعمل حالياً على تطوير صفحة "${pageTitle}" بكامل مميزاتها. `
    : `We are currently developing the "${pageTitle}" page with its full features. `;
  
  const specificContentMessage = currentLang === 'ar'
    ? `ستشمل هذه الصفحة قريباً [وصف موجز للوظائف المخطط لها مثل: عرض الباقات مع الفلاتر، نظام الحجز، إلخ]. شكراً لتفهمكم!`
    : `This page will soon include [brief description of planned functionalities e.g., package display with filters, booking system, etc.]. Thank you for your understanding!`;

  const dashboardMessage = currentLang === 'ar'
    ? `مرحباً بك في ${pageTitle}. هذه المنطقة مخصصة لـ ${pageDescription.toLowerCase()}. الوظائف الكاملة قيد التفعيل.`
    : `Welcome to the ${pageTitle}. This area is for ${pageDescription.toLowerCase()}. Full functionality is being activated.`;

  const displayTitle = isDashboard ? pageTitle : pageTitle;
  const displayMessage = isDashboard ? dashboardMessage : `${constructionMessageBase} ${specificContentMessage}`;

  const IconComponent = iconMap[pageKey] || iconMap.default;

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} - ${t.siteName}`}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {backgroundImage && (
          <div className="absolute inset-0">
            <img  
              alt={backgroundImage} 
              className="w-full h-full object-cover"
             src="https://images.unsplash.com/photo-1618672445860-e98bc47fb30e" />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        )}
        <div 
          className={`relative container mx-auto px-4 py-12 min-h-[calc(100vh-4rem)] ${currentLang === 'ar' ? 'text-right' : 'text-left'}`}
        >
          <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 md:p-10 border border-white/20">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              className="mb-6 flex flex-col items-center justify-center"
            >
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <IconComponent className="h-10 w-10 text-primary" />
              </div>
              <motion.h1 
                className={`text-3xl md:text-4xl font-bold text-primary text-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {displayTitle}
              </motion.h1>
            </motion.div>
            
            <motion.p 
              className={`text-lg text-gray-700 leading-relaxed mb-6 text-center max-w-3xl mx-auto ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {pageDescription}
            </motion.p>

            {children ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {children}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className={`p-6 border border-primary/20 rounded-lg bg-primary/5 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'} text-center`}
              >
                <Construction className="h-16 w-16 text-primary/70 mx-auto mb-4" />
                <h2 className={`text-xl font-semibold text-primary/80 mb-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                  {constructionTitle}
                </h2>
                <p className={`text-gray-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                  {displayMessage}
                </p>
                <img  
                    alt={currentLang === 'ar' ? 'صورة للكعبة المشرفة ترمز للخدمات الروحانية' : 'Image of Kaaba symbolizing spiritual services'} 
                    className="mt-6 rounded-lg shadow-md w-full max-w-xs mx-auto h-auto object-cover opacity-70"
                 src="https://images.unsplash.com/photo-1700563490203-cfd1e32401a2" />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default GenericPage;