import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericPage from './GenericPage';
import { Button } from '@/components/ui/button';
import { Filter, Star, MapPin, Briefcase, Globe2, Home, PlaneTakeoff, ChevronLeft, ChevronRight, Search, Building, DollarSign, CalendarDays, Hotel } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const HajjPackagesPage = ({ t, handleFeatureClick, currentLang }) => {
  const navigate = useNavigate();
  const { hajjCompanies } = useApp();
  const [activeCategory, setActiveCategory] = useState(null);
  
  const pageTitle = t.nav.hajjPackages;
  const pageDescription = t.services.hajj.description;
  const tHajj = t.hajjCompaniesPage || {};

  const backgroundImage = currentLang === 'ar'
    ? "الكعبة المشرفة خلال موسم الحج محاطة بالحجاج"
    : "The Kaaba during Hajj season surrounded by pilgrims";

  const internationalHajjPackages = [
    { id: 'int_hajj_1', name: currentLang === 'ar' ? 'باقة الحج الفاخرة من المملكة المتحدة' : 'UK 5-Star Hajj Package', country: currentLang === 'ar' ? 'المملكة المتحدة' : 'United Kingdom', duration: currentLang === 'ar' ? '14 يوم' : '14 Days', hotel: currentLang === 'ar' ? 'فنادق 5 نجوم قرب الحرم' : '5-Star Hotels near Haram', price: '5000', currency: '£', rating: 4.9, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad' },
    { id: 'int_hajj_2', name: currentLang === 'ar' ? 'باقة الحج الاقتصادية من مصر' : 'Egypt Economy Hajj Package', country: currentLang === 'ar' ? 'مصر' : 'Egypt', duration: currentLang === 'ar' ? '20 يوم' : '20 Days', hotel: currentLang === 'ar' ? 'فنادق 3 نجوم' : '3-Star Hotels', price: '2500', currency: '$', rating: 4.5, image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e' },
    { id: 'int_hajj_3', name: currentLang === 'ar' ? 'باقة الحج المريحة من إندونيسيا' : 'Indonesia Comfort Hajj Package', country: currentLang === 'ar' ? 'إندونيسيا' : 'Indonesia', duration: currentLang === 'ar' ? '25 يوم' : '25 Days', hotel: currentLang === 'ar' ? 'فنادق 4 نجوم' : '4-Star Hotels', price: '3500', currency: '$', rating: 4.7, image: 'https://images.unsplash.com/photo-1555400082-8dd4d78c670b' },
    { id: 'int_hajj_4', name: currentLang === 'ar' ? 'باقة الحج الشاملة من تركيا' : 'Turkey All-Inclusive Hajj Package', country: currentLang === 'ar' ? 'تركيا' : 'Turkey', duration: currentLang === 'ar' ? '18 يوم' : '18 Days', hotel: currentLang === 'ar' ? 'فنادق 4 نجوم مع وجبات' : '4-Star Hotels with meals', price: '4000', currency: '€', rating: 4.6, image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b' },
  ];

  const CompanyCard = ({ company }) => (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 flex flex-col overflow-hidden"
      onClick={() => navigate(`/hajj-company/${company.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="relative h-40 bg-gray-200 flex items-center justify-center">
        <img  alt={company.logo} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1485531865381-286666aa80a9" />
        <div className="absolute bottom-2 right-2 flex items-center bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-md">
          <Star className="mr-1 h-3 w-3 fill-current" /> {company.rating}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h4 className={`text-lg font-bold text-primary mb-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{company.name}</h4>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-gray-500" />
          <span>{company.city}</span>
        </div>
        <Button 
          className={`w-full mt-auto ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
        >
          {t.buttons.viewDetails}
        </Button>
      </div>
    </motion.div>
  );

  const DomesticCompaniesView = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [cityFilter, setCityFilter] = useState("all");
    const cities = ["all", ...new Set(hajjCompanies.map(c => c.city))];
    const filteredCompanies = hajjCompanies
      .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(c => cityFilter === "all" || c.city === cityFilter);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg h-fit sticky top-24 border border-gray-200/50">
          <h3 className={`text-xl font-bold mb-6 flex items-center text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            <Filter className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
            {tHajj.filterTitle || 'Filter Companies'}
          </h3>
          <div className="space-y-5">
            <div>
              <Label className={`block text-sm font-semibold text-gray-800 mb-1.5 flex items-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                <Search className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-gray-500" />
                {tHajj.searchPlaceholder || 'Search...'}
              </Label>
              <Input 
                type="text"
                placeholder={tHajj.searchPlaceholder || 'Search by company name...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full p-2.5 border border-gray-300 rounded-lg shadow-sm text-sm ${currentLang === 'ar' ? 'font-arabic placeholder:text-right' : 'font-english'}`}
              />
            </div>
            <div>
              <Label className={`block text-sm font-semibold text-gray-800 mb-1.5 flex items-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                <Building className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-gray-500" />
                {tHajj.cityFilter || 'City'}
              </Label>
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={tHajj.allCities || 'All Cities'} />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>
                      {city === "all" ? (tHajj.allCities || 'All Cities') : city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <h3 className={`text-2xl font-bold mb-6 text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {t.services.hajj.types.domestic} ({filteredCompanies.length})
          </h3>
          <AnimatePresence>
            <motion.div
              key="companies-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map(company => <CompanyCard key={company.id} company={company} />)
              ) : (
                <p className="col-span-full text-center text-gray-500">{currentLang === 'ar' ? 'لا توجد شركات تطابق بحثك.' : 'No companies match your search.'}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    );
  };

  const InternationalPackagesView = () => {
    const [filters, setFilters] = useState({ country: 'all', price: 'all', rating: 'all' });
    const countries = ['all', ...new Set(internationalHajjPackages.map(p => p.country))];
    
    const filteredPackages = internationalHajjPackages.filter(p => {
        const countryMatch = filters.country === 'all' || p.country === filters.country;
        const ratingMatch = filters.rating === 'all' || p.rating >= parseInt(filters.rating);
        const priceMatch = filters.price === 'all' || 
            (filters.price === 'low' && p.price <= 3000) ||
            (filters.price === 'mid' && p.price > 3000 && p.price <= 4500) ||
            (filters.price === 'high' && p.price > 4500);
        return countryMatch && ratingMatch && priceMatch;
    });

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg h-fit sticky top-24 border border-gray-200/50">
          <h3 className={`text-xl font-bold mb-6 flex items-center text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            <Filter className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
            {currentLang === 'ar' ? 'تصفية الباقات' : 'Filter Packages'}
          </h3>
          <div className="space-y-5">
            <div>
              <Label className={`block text-sm font-semibold text-gray-800 mb-1.5 flex items-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                <Globe2 className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-gray-500" />
                {currentLang === 'ar' ? 'الدولة' : 'Country'}
              </Label>
              <Select value={filters.country} onValueChange={(value) => setFilters(f => ({...f, country: value}))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {countries.map(c => <SelectItem key={c} value={c}>{c === 'all' ? (currentLang === 'ar' ? 'كل الدول' : 'All Countries') : c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className={`block text-sm font-semibold text-gray-800 mb-1.5 flex items-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                <DollarSign className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-gray-500" />
                {currentLang === 'ar' ? 'السعر' : 'Price'}
              </Label>
              <Select value={filters.price} onValueChange={(value) => setFilters(f => ({...f, price: value}))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{currentLang === 'ar' ? 'كل الأسعار' : 'All Prices'}</SelectItem>
                  <SelectItem value="low">{currentLang === 'ar' ? 'منخفض' : 'Low'}</SelectItem>
                  <SelectItem value="mid">{currentLang === 'ar' ? 'متوسط' : 'Medium'}</SelectItem>
                  <SelectItem value="high">{currentLang === 'ar' ? 'مرتفع' : 'High'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className={`block text-sm font-semibold text-gray-800 mb-1.5 flex items-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                <Star className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-gray-500" />
                {currentLang === 'ar' ? 'التقييم' : 'Rating'}
              </Label>
              <Select value={filters.rating} onValueChange={(value) => setFilters(f => ({...f, rating: value}))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{currentLang === 'ar' ? 'كل التقييمات' : 'All Ratings'}</SelectItem>
                  <SelectItem value="4">{currentLang === 'ar' ? '4 نجوم فأكثر' : '4 Stars & up'}</SelectItem>
                  <SelectItem value="4.5">{currentLang === 'ar' ? '4.5 نجوم فأكثر' : '4.5 Stars & up'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>
        <main className="lg:col-span-3">
          <h3 className={`text-2xl font-bold mb-6 text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {t.services.hajj.types.international} ({filteredPackages.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPackages.map(pkg => (
              <motion.div 
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 flex flex-col overflow-hidden"
              >
                <div className="relative h-48">
                  <img alt={pkg.name} className="w-full h-full object-cover" src={pkg.image} />
                  <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">{pkg.country}</div>
                  <div className="absolute bottom-2 right-2 flex items-center bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    <Star className="mr-1 h-3 w-3 fill-current" /> {pkg.rating}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className={`text-lg font-bold text-primary mb-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{pkg.name}</h4>
                  <div className="flex items-center text-sm text-gray-600 mb-1"><CalendarDays className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-gray-500" /> {pkg.duration}</div>
                  <div className="flex items-center text-sm text-gray-600 mb-3"><Hotel className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-gray-500" /> {pkg.hotel}</div>
                  <p className={`text-2xl font-bold text-green-600 mb-4 ${currentLang === 'ar' ? 'text-right' : 'text-left'}`}>{pkg.currency}{pkg.price}</p>
                  <Button onClick={() => handleFeatureClick(currentLang === 'ar' ? `حجز باقة ${pkg.name}` : `Book ${pkg.name}`)} className={`w-full mt-auto ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{t.buttons.bookNow}</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    );
  };

  const CategorySelector = ({ onSelect }) => (
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
      <h2 className={`text-3xl font-bold text-center text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
        {currentLang === 'ar' ? 'اختر فئة الحجاج' : 'Select Pilgrim Category'}
      </h2>
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg cursor-pointer text-center border border-gray-200/50"
          onClick={() => onSelect('domestic')}
        >
          <Home className="h-16 w-16 mx-auto text-primary mb-4" />
          <h3 className={`text-2xl font-bold text-primary mb-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{t.services.hajj.types.domestic}</h3>
          <p className={`text-gray-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'تصفح شركات الحج المعتمدة للمواطنين والمقيمين.' : 'Browse accredited Hajj companies for citizens and residents.'}</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg cursor-pointer text-center border border-gray-200/50"
          onClick={() => onSelect('international')}
        >
          <PlaneTakeoff className="h-16 w-16 mx-auto text-primary mb-4" />
          <h3 className={`text-2xl font-bold text-primary mb-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{t.services.hajj.types.international}</h3>
          <p className={`text-gray-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'باقات شاملة للحجاج القادمين من جميع أنحاء العالم.' : 'All-inclusive packages for pilgrims from around the world.'}</p>
        </motion.div>
      </div>
    </div>
  );

  return (
    <GenericPage pageKey="hajjPackages" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang} backgroundImage={backgroundImage}>
      {!activeCategory ? (
        <CategorySelector onSelect={setActiveCategory} />
      ) : (
        <>
          <Button 
              onClick={() => setActiveCategory(null)} 
              variant="outline"
              className={`mb-6 flex items-center gap-2 bg-white/80 hover:bg-white ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
          >
              {currentLang === 'ar' ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" /> }
              {tHajj.backToSelection || 'Back to Category Selection'}
          </Button>
          
          {activeCategory === 'domestic' && <DomesticCompaniesView />}
          {activeCategory === 'international' && <InternationalPackagesView />}
        </>
      )}
    </GenericPage>
  );
};

export default HajjPackagesPage;