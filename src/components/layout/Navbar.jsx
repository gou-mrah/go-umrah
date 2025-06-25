import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Globe, ShoppingCart, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { content } from '@/lib/content/index'; 
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

const Navbar = ({ currentLang, toggleLanguage, t, handleFeatureClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useApp();
  const { user, profile, logout } = useAuth();

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
    { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const navLinks = [
    { key: 'umrahPackages', path: '/umrah-packages' },
    { key: 'hajjPackages', path: '/hajj-packages' },
    { key: 'flights', path: '/flights' },
    { key: 'hotels', path: '/hotels' },
    { key: 'haramainTrain', path: '/haramain-train' },
    { key: 'visas', path: '/visas' },
    { key: 'transport', path: '/transport' },
    { key: 'store', path: '/store' },
  ];

  const getDashboardPath = () => {
    switch (profile?.role) {
      case 'super_admin':
        return '/dashboard/super-admin';
      case 'service_provider':
        return '/dashboard/service-provider';
      default:
        return '/dashboard/customer';
    }
  };

  const handleNavClick = (path, featureName) => {
    if (path.startsWith('/dashboard')) {
      handleFeatureClick(featureName, path); 
    }
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLanguageChange = (langCode) => {
    toggleLanguage(langCode);
    setIsLangMenuOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 navbar-shadow">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img  
                alt="جو عمرة - Go Umrah Logo" 
                className="h-12 w-auto"
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/1f03af3e-d937-4eb4-92d4-52bc2833e0f1/fcb82d25ee1e052909e54e0fa1751ac5.jpg" />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:flex-grow">
            <div className={`flex items-baseline ${currentLang === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'} mx-auto`}>
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  onClick={() => handleNavClick(link.path, t.nav[link.key])}
                  className={`text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
                >
                  {t.nav[link.key]}
                </Link>
              ))}
            </div>
          </div>

          <div className={`hidden md:flex items-center ${currentLang === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center ${currentLang === 'ar' ? 'space-x-reverse space-x-1' : 'space-x-1'} text-gray-700 hover:text-primary transition-colors p-2 rounded-md hover:bg-gray-100`}
                aria-label="Select Language"
              >
                <Globe className="h-5 w-5" />
                <span className="text-lg">{currentLanguage.flag}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-3 ${currentLang === lang.code ? 'bg-primary/10 text-primary' : 'text-gray-700'}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/checkout" className="relative p-2 text-gray-700 hover:text-primary transition-colors rounded-md hover:bg-gray-100">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cart.length}
                </span>
              )}
            </Link>

            {user && profile ? (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button variant="ghost" size="sm" onClick={() => handleNavClick(getDashboardPath(), profile.full_name)}>
                  <User className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
                  {profile.full_name.split(' ')[0]}
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout} className="border-primary text-primary hover:bg-primary/5 hover:text-primary">
                  <LogOut className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
                  {t.nav.logout}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleNavClick('/login', t.nav.login)}
                  className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'} border-primary text-primary hover:bg-primary/5 hover:text-primary`}
                >
                  {t.nav.login}
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleNavClick('/register', t.nav.register)}
                  className={`bg-primary hover:bg-primary/90 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
                >
                  {t.nav.register}
                </Button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
             <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`flex items-center text-gray-700 hover:text-primary transition-colors p-2 rounded-md hover:bg-gray-100 mr-2 rtl:ml-2 rtl:mr-0`}
              aria-label="Select Language"
            >
              <Globe className="h-5 w-5" />
              <span className="text-lg ml-1">{currentLanguage.flag}</span>
            </button>
            <Link to="/checkout" className="relative p-2 text-gray-700 hover:text-primary transition-colors rounded-md hover:bg-gray-100 mr-2 rtl:ml-2 rtl:mr-0">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cart.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                onClick={() => handleNavClick(link.path, t.nav[link.key])}
                className={`block w-full ${currentLang === 'ar' ? 'text-right' : 'text-left'} px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
              >
                {t.nav[link.key]}
              </Link>
            ))}
            {user && profile ? (
              <>
                <button onClick={() => handleNavClick(getDashboardPath(), profile.full_name)} className={`block w-full ${currentLang === 'ar' ? 'text-right' : 'text-left'} px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                  {profile.full_name}
                </button>
                <button onClick={handleLogout} className={`block w-full ${currentLang === 'ar' ? 'text-right' : 'text-left'} px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                  {t.nav.logout}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('/login',t.nav.login)}
                  className={`block w-full ${currentLang === 'ar' ? 'text-right' : 'text-left'} px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
                >
                  {t.nav.login}
                </button>
                <button
                  onClick={() => handleNavClick('/register', t.nav.register)}
                  className={`block w-full ${currentLang === 'ar' ? 'text-right' : 'text-left'} px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
                >
                  {t.nav.register}
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}

      {isLangMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-b shadow-lg z-40">
          <div className="grid grid-cols-2 gap-1 p-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center space-x-2 p-2 rounded-md text-sm hover:bg-gray-100 ${currentLang === lang.code ? 'bg-primary/10 text-primary' : 'text-gray-700'}`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="truncate">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;