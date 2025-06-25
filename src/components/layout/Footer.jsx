import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MessageSquare, Music, ShieldCheck, FileText, MessageCircle, AlertTriangle, BookOpen, Info, HelpCircle } from 'lucide-react';

const Footer = ({ t, handleFeatureClick, currentLang }) => {
  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/GoUmrahOfficial', icon: <Facebook className="w-6 h-6" /> },
    { name: 'Twitter', url: 'https://twitter.com/GoUmrahOfficial', icon: <Twitter className="w-6 h-6" /> },
    { name: 'Instagram', url: 'https://instagram.com/GoUmrahOfficial', icon: <Instagram className="w-6 h-6" /> },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/GoUmrahOfficial', icon: <Linkedin className="w-6 h-6" /> },
    { name: 'YouTube', url: 'https://youtube.com/GoUmrahOfficial', icon: <Youtube className="w-6 h-6" /> },
    { name: 'WhatsApp', url: 'https://wa.me/966557123435', icon: <MessageSquare className="w-6 h-6" /> },
    { name: 'Snapchat', url: 'https://snapchat.com/add/GoUmrahOfficial', icon: <Instagram className="w-6 h-6" /> },
    { name: 'TikTok', url: 'https://tiktok.com/@GoUmrahOfficial', icon: <Music className="w-6 h-6" /> }
  ];

  const tFooter = t.footer || {};
  
  const mainLinks = [
      ...t.nav ? [
          { key: 'umrahPackages', path: '/umrah-packages' },
          { key: 'hajjPackages', path: '/hajj-packages' },
          { key: 'flights', path: '/flights' },
          { key: 'hotels', path: '/hotels' },
      ] : []
  ];

  const infoLinks = [
    { key: 'aboutUs', path: '/about-us', icon: <Info className="w-4 h-4 mr-2 rtl:ml-2" /> },
    { key: 'faq', path: '/faq', icon: <HelpCircle className="w-4 h-4 mr-2 rtl:ml-2" /> },
    { key: 'licenses', path: '/licenses', icon: <BookOpen className="w-4 h-4 mr-2 rtl:ml-2" /> },
    { key: 'complaints', path: '/complaints', icon: <MessageCircle className="w-4 h-4 mr-2 rtl:ml-2" /> },
  ];

  const legalLinks = [
    { key: 'privacyPolicy', path: '/privacy-policy', icon: <ShieldCheck className="w-4 h-4 mr-2 rtl:ml-2" /> },
    { key: 'termsAndConditions', path: '/terms-and-conditions', icon: <FileText className="w-4 h-4 mr-2 rtl:ml-2" /> },
    { key: 'cancellationPolicy', path: '/cancellation-policy', icon: <AlertTriangle className="w-4 h-4 mr-2 rtl:ml-2" /> },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-center md:text-start">
          
          <div className="lg:col-span-2">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img  
                alt="جو عمرة - Go Umrah Logo" 
                className="h-16 w-auto"
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/1f03af3e-d937-4eb4-92d4-52bc2833e0f1/fcb82d25ee1e052909e54e0fa1751ac5.jpg" />
            </div>
            <p className={`text-gray-400 mt-4 max-w-sm mx-auto md:mx-0 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{t.heroDescription}</p>
            <div className="mt-6 flex justify-center md:justify-start items-center flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <p className={`text-lg font-semibold text-white mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tFooter.mainLinks || 'خدماتنا'}</p>
            <ul className="space-y-3">
              {mainLinks.map(link => (
                <li key={link.key}>
                  <Link to={link.path} className={`inline-flex items-center justify-center md:justify-start text-gray-400 hover:text-gold transition-colors ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                    {t.nav[link.key] || link.key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <p className={`text-lg font-semibold text-white mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tFooter.infoLinks || 'معلومات'}</p>
            <ul className="space-y-3">
              {infoLinks.map(link => (
                <li key={link.key}>
                  <Link to={link.path} className={`inline-flex items-center justify-center md:justify-start text-gray-400 hover:text-gold transition-colors ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                    {link.icon}
                    {tFooter[link.key] || t.nav[link.key] || link.key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={`text-lg font-semibold text-white mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tFooter.legalLinks || 'قانوني'}</p>
            <ul className="space-y-3">
              {legalLinks.map(link => (
                <li key={link.key}>
                  <Link to={link.path} className={`inline-flex items-center justify-center md:justify-start text-gray-400 hover:text-gold transition-colors ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                    {link.icon}
                    {tFooter[link.key] || link.key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      <div className="bg-white py-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-12 flex-wrap">
            <div className="flex flex-col items-center gap-3 text-center">
              <a href="https://www.mt.gov.sa" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img className="h-[80px] w-auto max-w-[200px] object-contain" alt="Saudi Ministry of Tourism Logo" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/1f03af3e-d937-4eb4-92d4-52bc2833e0f1/12c25fa4ba3a6e16d7744820fd722da5.jpg" />
              </a>
              <p className={`text-sm text-gray-700 max-w-xs leading-relaxed ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tFooter.tourismLicense}</p>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <a href="https://e.mci.gov.sa/auth/document/display/30637" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/1f03af3e-d937-4eb4-92d4-52bc2833e0f1/8ee808d0b50af5c70e3d4fe99d28e1a5.png" className="h-[80px] w-auto max-w-[200px] object-contain" alt="Saudi Business Center Logo" />
              </a>
              <p className={`text-sm text-gray-700 max-w-xs leading-relaxed ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tFooter.sbcLicense}</p>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <a href="https://www.media.gov.sa" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/1f03af3e-d937-4eb4-92d4-52bc2833e0f1/3c905d3889ee9ada59af73cf2c7a97bf.png" className="h-[80px] w-auto max-w-[200px] object-contain" alt="Saudi Ministry of Media Logo" />
              </a>
              <p className={`text-sm text-gray-700 max-w-xs leading-relaxed ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tFooter.mediaLicense}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className={`text-gray-400 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tFooter.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;