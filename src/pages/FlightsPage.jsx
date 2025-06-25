import React, { useState } from 'react';
import GenericPage from './GenericPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, PlaneTakeoff, PlaneLanding, CalendarDays, Users2, DollarSign, Briefcase, Clock, ArrowRightLeft, Luggage, Star, MapPin, Search, XCircle, ChevronDown, ChevronUp, Bell, Columns, Wifi, Coffee, Utensils, Monitor, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const FlightsPage = ({ t, handleFeatureClick, currentLang }) => {
  const pageTitle = t.nav.flights;
  const pageDescription = t.services.flights.description;
  
  const backgroundImage = currentLang === 'ar'
    ? "منظر جوي للمسجد الحرام والكعبة المشرفة"
    : "Aerial view of the Grand Mosque and the Kaaba in Mecca";

  const [searchParams, setSearchParams] = useState({
    tripType: 'roundtrip',
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    cabinClass: 'economy',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (name, value) => {
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name, value) => {
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    setIsSearching(true);
    toast({
      title: currentLang === 'ar' ? 'جاري البحث...' : 'Searching...',
      description: currentLang === 'ar' ? 'نبحث عن أفضل الرحلات لك عبر Flynas API' : 'Searching for the best flights via Flynas API',
    });
    
    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: currentLang === 'ar' ? 'تم العثور على رحلات!' : 'Flights Found!',
        description: currentLang === 'ar' ? 'عثرنا على أفضل العروض المتاحة' : 'Found the best available deals',
      });
    }, 2000);
  };

  const filters = [
    { label: currentLang === 'ar' ? 'السعر' : 'Price', icon: DollarSign, type: 'range' },
    { label: currentLang === 'ar' ? 'شركات الطيران' : 'Airlines', icon: Briefcase, type: 'checkboxes', options: ['Saudia', 'Flynas', 'Emirates', 'Qatar Airways', 'Etihad', 'Turkish Airlines'] },
    { label: currentLang === 'ar' ? 'أوقات المغادرة' : 'Departure Times', icon: Clock, type: 'time-range' },
    { label: currentLang === 'ar' ? 'أوقات الوصول' : 'Arrival Times', icon: Clock, type: 'time-range' },
    { label: currentLang === 'ar' ? 'عدد محطات التوقف' : 'Number of Stops', icon: ArrowRightLeft, type: 'select', options: [currentLang === 'ar' ? 'مباشر' : 'Direct', '1', '2+'] },
    { label: currentLang === 'ar' ? 'المطارات البديلة' : 'Alternative Airports', icon: MapPin, type: 'checkboxes', options: [currentLang === 'ar' ? 'عرض المطارات القريبة' : 'Show nearby airports'] },
    { label: currentLang === 'ar' ? 'مدة الرحلة' : 'Flight Duration', icon: Clock, type: 'range' },
    { label: currentLang === 'ar' ? 'أوزان الأمتعة' : 'Baggage Allowance', icon: Luggage, type: 'select', options: ['20kg+', '30kg+', '40kg+', 'Hand-carry only'] },
    { label: currentLang === 'ar' ? 'الخطوط المفضلة' : 'Preferred Airlines', icon: Star, type: 'text-multi' },
    { label: currentLang === 'ar' ? 'نقطة التوقف (ترانزيت)' : 'Stopover Point', icon: MapPin, type: 'text' },
    { label: currentLang === 'ar' ? 'المواعيد المحددة' : 'Specific Times', icon: CalendarDays, type: 'checkboxes', options: [currentLang === 'ar' ? 'صباحاً (6-12)' : 'Morning (6-12)', currentLang === 'ar' ? 'ظهراً (12-18)' : 'Afternoon (12-18)', currentLang === 'ar' ? 'مساءً (18-24)' : 'Evening (18-24)', currentLang === 'ar' ? 'ليلاً (0-6)' : 'Night (0-6)'] },
    { label: currentLang === 'ar' ? 'نوع التذكرة' : 'Ticket Type', icon: Briefcase, type: 'select', options: [currentLang === 'ar' ? 'قابلة للاسترداد' : 'Refundable', currentLang === 'ar' ? 'قابلة للتعديل' : 'Changeable', currentLang === 'ar' ? 'غير قابلة للاسترداد' : 'Non-refundable'] },
  ];

  const sampleFlights = Array(4).fill(null).map((_, i) => ({
    id: i + 1,
    airline: ['Saudia', 'Flynas', 'Emirates', 'Qatar Airways'][i],
    flightNumber: `${['SV', 'XY', 'EK', 'QR'][i]}${1234 + i}`,
    departureTime: [`06:00 ${currentLang === 'ar' ? 'ص' : 'AM'}`, `08:30 ${currentLang === 'ar' ? 'ص' : 'AM'}`, `14:15 ${currentLang === 'ar' ? 'م' : 'PM'}`, `20:45 ${currentLang === 'ar' ? 'م' : 'PM'}`][i],
    arrivalTime: [`08:30 ${currentLang === 'ar' ? 'ص' : 'AM'}`, `10:45 ${currentLang === 'ar' ? 'ص' : 'AM'}`, `16:30 ${currentLang === 'ar' ? 'م' : 'PM'}`, `23:00 ${currentLang === 'ar' ? 'م' : 'PM'}`][i],
    duration: [`${currentLang === 'ar' ? 'ساعتان و 30 دقيقة' : '2h 30m'}`, `${currentLang === 'ar' ? 'ساعتان و 15 دقيقة' : '2h 15m'}`, `${currentLang === 'ar' ? 'ساعتان و 15 دقيقة' : '2h 15m'}`, `${currentLang === 'ar' ? 'ساعتان و 15 دقيقة' : '2h 15m'}`][i],
    price: `${(650 + i * 200)} ${currentLang === 'ar' ? 'ريال' : 'SAR'}`,
    originalPrice: i > 0 ? `${(750 + i * 200)} ${currentLang === 'ar' ? 'ريال' : 'SAR'}` : null,
    stops: i === 0 ? (currentLang === 'ar' ? 'مباشر' : 'Direct') : i === 1 ? (currentLang === 'ar' ? 'توقف واحد (الرياض)' : '1 Stop (Riyadh)') : i === 2 ? (currentLang === 'ar' ? 'مباشر' : 'Direct') : (currentLang === 'ar' ? 'توقف واحد (دبي)' : '1 Stop (Dubai)'),
    aircraft: ['Boeing 787', 'Airbus A320', 'Airbus A380', 'Boeing 777'][i],
    amenities: [
      ...(i >= 2 ? [{ icon: Wifi, label: currentLang === 'ar' ? 'واي فاي مجاني' : 'Free WiFi' }] : []),
      ...(i >= 1 ? [{ icon: Utensils, label: currentLang === 'ar' ? 'وجبة مجانية' : 'Free Meal' }] : []),
      ...(i >= 2 ? [{ icon: Monitor, label: currentLang === 'ar' ? 'شاشة ترفيه' : 'Entertainment Screen' }] : []),
      ...(i === 3 ? [{ icon: Coffee, label: currentLang === 'ar' ? 'مشروبات مجانية' : 'Free Beverages' }] : []),
    ],
    baggage: i === 0 ? '20kg' : i === 1 ? '25kg' : i === 2 ? '30kg' : '35kg',
    logo: `${['Saudia', 'Flynas', 'Emirates', 'Qatar Airways'][i]} Airlines logo`,
    rating: (4.2 + i * 0.2).toFixed(1),
    onTimePerformance: `${85 + i * 3}%`
  }));

  return (
    <GenericPage pageKey="flights" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang} backgroundImage={backgroundImage}>
      <div className="mb-8 p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-end">
          <div className="xl:col-span-2">
            <Label htmlFor="tripType" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'نوع الرحلة' : 'Trip Type'}</Label>
            <Select name="tripType" value={searchParams.tripType} onValueChange={(value) => handleSelectChange('tripType', value)}>
              <SelectTrigger className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                <SelectValue placeholder={currentLang === 'ar' ? 'اختر نوع الرحلة' : 'Select trip type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="roundtrip" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'ذهاب وعودة' : 'Round Trip'}</SelectItem>
                <SelectItem value="one-way" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'ذهاب فقط' : 'One Way'}</SelectItem>
                <SelectItem value="multi-city" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'متعدد المدن' : 'Multi-City'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="departureCity" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'مدينة المغادرة' : 'Departure City'}</Label>
            <Input type="text" id="departureCity" name="departureCity" value={searchParams.departureCity} onChange={(e) => handleInputChange('departureCity', e.target.value)} placeholder={currentLang === 'ar' ? 'مثال: جدة (JED)' : 'e.g., Jeddah (JED)'} className={`${currentLang === 'ar' ? 'font-arabic placeholder:text-right' : 'font-english'}`} />
          </div>
          <div>
            <Label htmlFor="arrivalCity" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'مدينة الوصول' : 'Arrival City'}</Label>
            <Input type="text" id="arrivalCity" name="arrivalCity" value={searchParams.arrivalCity} onChange={(e) => handleInputChange('arrivalCity', e.target.value)} placeholder={currentLang === 'ar' ? 'مثال: المدينة (MED)' : 'e.g., Madinah (MED)'} className={`${currentLang === 'ar' ? 'font-arabic placeholder:text-right' : 'font-english'}`} />
          </div>
           <div>
            <Label htmlFor="departureDate" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'تاريخ المغادرة' : 'Departure Date'}</Label>
            <Input type="date" id="departureDate" name="departureDate" value={searchParams.departureDate} onChange={(e) => handleInputChange('departureDate', e.target.value)} className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} />
          </div>
          {searchParams.tripType === 'roundtrip' && (
            <div>
              <Label htmlFor="returnDate" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'تاريخ العودة' : 'Return Date'}</Label>
              <Input type="date" id="returnDate" name="returnDate" value={searchParams.returnDate} onChange={(e) => handleInputChange('returnDate', e.target.value)} className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} />
            </div>
          )}
          <div className="xl:col-start-1">
            <Label htmlFor="passengers" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'عدد الركاب' : 'Passengers'}</Label>
            <Input type="number" id="passengers" name="passengers" min="1" max="9" value={searchParams.passengers} onChange={(e) => handleInputChange('passengers', e.target.value)} className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} />
          </div>
          <div>
            <Label htmlFor="cabinClass" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'درجة السفر' : 'Cabin Class'}</Label>
             <Select name="cabinClass" value={searchParams.cabinClass} onValueChange={(value) => handleSelectChange('cabinClass', value)}>
              <SelectTrigger className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'السياحية' : 'Economy'}</SelectItem>
                <SelectItem value="premium-economy" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'السياحية المميزة' : 'Premium Economy'}</SelectItem>
                <SelectItem value="business" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'الأعمال' : 'Business'}</SelectItem>
                <SelectItem value="first" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'الأولى' : 'First'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            className={`w-full py-3 xl:col-start-6 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'} ${isSearching ? 'opacity-75' : ''}`} 
            onClick={handleSearch}
            disabled={isSearching}
          >
            <Search className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
            {isSearching ? (currentLang === 'ar' ? 'جاري البحث...' : 'Searching...') : (currentLang === 'ar' ? 'بحث عبر Flynas API' : 'Search via Flynas API')}
          </Button>
        </div>
         <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={() => handleFeatureClick(currentLang === 'ar' ? "إشعارات الأسعار" : "Price Alerts")}>
                <Bell className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />{currentLang === 'ar' ? 'تفعيل إشعارات الأسعار' : 'Price Alerts'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleFeatureClick(currentLang === 'ar' ? "مقارنة الأسعار" : "Price Comparison")}>
                <Columns className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />{currentLang === 'ar' ? 'مقارنة الأسعار' : 'Compare Prices'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleFeatureClick(currentLang === 'ar' ? "التقويم المرن" : "Flexible Calendar")}>
                <CalendarDays className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />{currentLang === 'ar' ? 'التقويم المرن' : 'Flexible Calendar'}
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg h-fit sticky top-24 border border-gray-200/50">
          <button onClick={() => setShowFilters(!showFilters)} className={`w-full flex items-center justify-between text-xl font-bold mb-4 text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'} lg:pointer-events-none`}>
             <span className="flex items-center">
                 <Filter className="mr-2 rtl:ml-2 rtl:mr-0 h-6 w-6" />
                 {currentLang === 'ar' ? 'تصفية النتائج' : 'Filter Results'}
             </span>
             {showFilters ? <ChevronUp className="h-6 w-6 lg:hidden" /> : <ChevronDown className="h-6 w-6 lg:hidden" />}
          </button>
          <AnimatePresence>
             {(showFilters || window.innerWidth >= 1024) && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5 overflow-hidden"
                >
                    {filters.map(filter => (
                    <div key={filter.label}>
                        <label className={`block text-sm font-semibold text-gray-800 mb-1.5 flex items-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                        <filter.icon className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 text-gray-500" />
                        {filter.label}
                        </label>
                        <Input 
                        type="text" 
                        placeholder={currentLang === 'ar' ? 'متاح قريباً...' : 'Coming soon...'}
                        className={`w-full p-2.5 border border-gray-300 rounded-lg shadow-sm text-sm ${currentLang === 'ar' ? 'font-arabic placeholder:text-right' : 'font-english'}`} 
                        />
                    </div>
                    ))}
                    <Button 
                    className={`w-full mt-6 py-3 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} 
                    onClick={() => handleFeatureClick(currentLang === 'ar' ? "تطبيق الفلاتر" : "Apply Filters")}
                    >
                    {currentLang === 'ar' ? 'تطبيق الفلاتر' : 'Apply Filters'}
                    </Button>
                </motion.div>
             )}
          </AnimatePresence>
        </aside>

        <main className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <span className={`text-sm text-gray-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {currentLang === 'ar' ? `عرض ${sampleFlights.length} رحلات متاحة` : `Showing ${sampleFlights.length} available flights`}
            </span>
            <Select onValueChange={(value) => handleFeatureClick(`${currentLang === 'ar' ? 'ترتيب حسب' : 'Sort by'} ${value}`)}>
              <SelectTrigger className={`w-[200px] ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                <SelectValue placeholder={currentLang === 'ar' ? 'ترتيب حسب...' : 'Sort by...'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'السعر' : 'Price'}</SelectItem>
                <SelectItem value="duration" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'مدة الرحلة' : 'Duration'}</SelectItem>
                <SelectItem value="departure" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'وقت المغادرة' : 'Departure Time'}</SelectItem>
                <SelectItem value="rating" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'التقييم' : 'Rating'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {sampleFlights.map(flight => (
            <motion.div 
              key={flight.id} 
              className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: flight.id * 0.1 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <div className="flex items-center mb-2 sm:mb-0">
                  <img alt={flight.logo} className="h-8 w-auto mr-3 rtl:ml-3 rtl:mr-0" src="https://images.unsplash.com/photo-1674656514074-7ddae7087e81" />
                  <div>
                    <span className={`font-semibold text-lg ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{flight.airline}</span>
                    <p className={`text-xs text-gray-500 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{flight.flightNumber} • {flight.aircraft}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="text-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mx-auto" />
                    <span className={`text-xs text-gray-500 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{flight.rating}</span>
                  </div>
                  <div className="text-center">
                    <Clock className="h-4 w-4 text-green-500 mx-auto" />
                    <span className={`text-xs text-gray-500 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{flight.onTimePerformance}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center text-center mb-4">
                <div>
                  <p className={`text-lg font-semibold text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{flight.departureTime}</p>
                  <p className={`text-xs text-gray-500 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{searchParams.departureCity || (currentLang === 'ar' ? 'جدة' : 'Jeddah')}</p>
                </div>
                <div className="flex flex-col items-center">
                    <PlaneTakeoff className="h-5 w-5 text-gray-400 transform scale-x-[-1] rtl:scale-x-[1]" />
                    <span className={`text-xs text-gray-500 my-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{flight.duration}</span>
                    <span className={`text-xs text-gray-500 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{flight.stops}</span>
                    <PlaneLanding className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className={`text-lg font-semibold text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{flight.arrivalTime}</p>
                  <p className={`text-xs text-gray-500 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{searchParams.arrivalCity || (currentLang === 'ar' ? 'المدينة' : 'Madinah')}</p>
                </div>
              </div>

              {flight.amenities.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
                  {flight.amenities.map((amenity, idx) => (
                    <span key={idx} className="flex items-center">
                      <amenity.icon className="mr-1.5 rtl:ml-1.5 rtl:mr-0 h-4 w-4 text-primary/70" /> {amenity.label}
                    </span>
                  ))}
                  <span className="flex items-center">
                    <Luggage className="mr-1.5 rtl:ml-1.5 rtl:mr-0 h-4 w-4 text-primary/70" /> {flight.baggage}
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-2 sm:mb-0">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <p className={`text-2xl font-bold text-green-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{flight.price}</p>
                    {flight.originalPrice && (
                      <p className={`text-lg text-gray-500 line-through ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{flight.originalPrice}</p>
                    )}
                  </div>
                  <p className={`text-xs text-gray-500 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'شامل الضرائب والرسوم' : 'Includes taxes & fees'}</p>
                </div>
                <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="sm" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} onClick={() => handleFeatureClick(currentLang === 'ar' ? `مقارنة رحلة ${flight.airline}` : `Compare ${flight.airline} Flight`)}>
                        <Columns className="mr-1 rtl:ml-1 rtl:mr-0 h-4 w-4" /> {currentLang === 'ar' ? 'مقارنة' : 'Compare'}
                    </Button>
                    <Button size="sm" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} onClick={() => handleFeatureClick(currentLang === 'ar' ? `حجز رحلة ${flight.airline}` : `Book ${flight.airline} Flight`)}>
                        {t.buttons.bookNow}
                    </Button>
                </div>
              </div>
            </motion.div>
          ))}
           <div className="text-center mt-8">
             <Button variant="outline" onClick={() => handleFeatureClick(currentLang === 'ar' ? "عرض المزيد من الرحلات" : "View More Flights")}>
                 {currentLang === 'ar' ? 'عرض المزيد من الرحلات' : 'View More Flights'}
             </Button>
          </div>
        </main>
      </div>
    </GenericPage>
  );
};

export default FlightsPage;