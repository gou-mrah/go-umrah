import React, { useState } from 'react';
import GenericPage from './GenericPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, TrainFront, Users2, CalendarDays, DollarSign, Armchair, CheckSquare, Search, Clock, Wifi, Info, ChevronDown, ChevronUp, MapPin, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const HaramainTrainPage = ({ t, handleFeatureClick, currentLang }) => {
  const haramainTrainService = t.services?.haramainTrain || t.services?.train;
  const pageTitle = t.nav.haramainTrain;
  const pageDescription = haramainTrainService?.description || (currentLang === 'ar' ? 'تنقلوا بسرعة وراحة فائقة بين مكة المكرمة والمدينة المنورة عبر قطار الحرمين الشريفين. احجزوا تذاكركم بسهولة واستمتعوا برحلة عصرية وآمنة.' : 'Travel quickly and comfortably between Makkah and Madinah via the Haramain High Speed Railway. Book your tickets easily and enjoy a modern, safe journey.');

  const backgroundImage = currentLang === 'ar'
    ? "قطار الحرمين السريع أمام الكعبة المشرفة"
    : "Haramain high-speed train with the Holy Kaaba in background";

  const [searchParams, setSearchParams] = useState({
    departureStation: '',
    arrivalStation: '',
    travelDate: '',
    passengers: 1,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const stations = [
    { value: 'makkah', labelAr: 'مكة المكرمة', labelEn: 'Makkah' },
    { value: 'madinah', labelAr: 'المدينة المنورة', labelEn: 'Madinah' },
    { value: 'jeddah_airport', labelAr: 'جدة - مطار الملك عبدالعزيز', labelEn: 'Jeddah - KAIA Airport' },
    { value: 'jeddah_sulaimaniyah', labelAr: 'جدة - السليمانية', labelEn: 'Jeddah - Sulaimaniyah' },
    { value: 'kaec', labelAr: 'مدينة الملك عبدالله الاقتصادية', labelEn: 'KAEC' },
  ];

  const handleInputChange = (name, value) => {
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setIsSearching(true);
    toast({
      title: currentLang === 'ar' ? 'جاري البحث...' : 'Searching...',
      description: currentLang === 'ar' ? 'نبحث عن أفضل الرحلات المتاحة لك.' : 'We are searching for the best available trips for you.',
    });
    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: currentLang === 'ar' ? 'تم العثور على رحلات!' : 'Trips Found!',
        description: currentLang === 'ar' ? 'النتائج المعروضة هي بيانات تجريبية.' : 'The displayed results are sample data.',
      });
    }, 1500);
  };
  
  const filters = [
    { label: currentLang === 'ar' ? 'وقت المغادرة' : 'Departure Time', icon: Clock, type: 'time-range' },
    { label: currentLang === 'ar' ? 'الدرجة' : 'Class', icon: Armchair, type: 'select', options: [currentLang === 'ar' ? 'السياحية' : 'Economy', currentLang === 'ar' ? 'الأعمال' : 'Business'] },
    { label: currentLang === 'ar' ? 'السعر' : 'Price', icon: DollarSign, type: 'range' },
    { label: currentLang === 'ar' ? 'رحلات مباشرة فقط' : 'Direct Trips Only', icon: CheckSquare, type: 'checkbox' },
  ];

  const sampleTrips = Array(2).fill(null).map((_, i) => ({
    id: i + 1,
    departureTime: i === 0 ? `09:00 ${currentLang === 'ar' ? 'ص' : 'AM'}` : `14:30 ${currentLang === 'ar' ? 'م' : 'PM'}`,
    arrivalTime: i === 0 ? `11:15 ${currentLang === 'ar' ? 'ص' : 'AM'}` : `16:45 ${currentLang === 'ar' ? 'م' : 'PM'}`,
    duration: currentLang === 'ar' ? 'ساعتان و 15 دقيقة' : '2h 15m',
    priceEconomy: `${(150 + i * 20)} ${currentLang === 'ar' ? 'ريال' : 'SAR'}`,
    priceBusiness: `${(300 + i * 40)} ${currentLang === 'ar' ? 'ريال' : 'SAR'}`,
    direct: i === 0,
    operator: 'SAR',
    amenities: [
        {icon: Wifi, label: currentLang === 'ar' ? 'واي فاي' : 'WiFi'},
        {icon: Armchair, label: currentLang === 'ar' ? 'مقاعد مريحة' : 'Comfortable Seats'},
    ]
  }));

  return (
    <GenericPage pageKey="haramainTrain" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang} backgroundImage={backgroundImage}>
      <div className="mb-8 p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
          <div>
            <Label htmlFor="departureStation" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'محطة المغادرة' : 'Departure Station'}</Label>
            <Select name="departureStation" value={searchParams.departureStation} onValueChange={(value) => handleSelectChange('departureStation', value)}>
              <SelectTrigger className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                <SelectValue placeholder={currentLang === 'ar' ? 'اختر محطة' : 'Select station'} />
              </SelectTrigger>
              <SelectContent>
                {stations.map(s => <SelectItem key={s.value} value={s.value} className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? s.labelAr : s.labelEn}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="arrivalStation" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'محطة الوصول' : 'Arrival Station'}</Label>
             <Select name="arrivalStation" value={searchParams.arrivalStation} onValueChange={(value) => handleSelectChange('arrivalStation', value)}>
              <SelectTrigger className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                <SelectValue placeholder={currentLang === 'ar' ? 'اختر محطة' : 'Select station'} />
              </SelectTrigger>
              <SelectContent>
                {stations.map(s => <SelectItem key={s.value} value={s.value} className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? s.labelAr : s.labelEn}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="travelDate" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'تاريخ السفر' : 'Travel Date'}</Label>
            <Input type="date" id="travelDate" name="travelDate" value={searchParams.travelDate} onChange={(e) => handleInputChange('travelDate', e.target.value)} className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} />
          </div>
          <div>
            <Label htmlFor="passengersTrain" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'عدد الركاب' : 'Passengers'}</Label>
            <Input type="number" id="passengersTrain" name="passengers" min="1" value={searchParams.passengers} onChange={(e) => handleInputChange('passengers', e.target.value)} className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} />
          </div>
           <Button className={`w-full py-3 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} onClick={handleSearch} disabled={isSearching}>
            <Search className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
            {isSearching ? (currentLang === 'ar' ? 'جاري البحث...' : 'Searching...') : (currentLang === 'ar' ? 'بحث' : 'Search')}
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
                      placeholder={currentLang === 'ar' ? 'اختر...' : 'Select...'}
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
          <div className="text-center p-4 bg-teal-50/80 backdrop-blur-sm border border-teal-200 rounded-lg">
            <h3 className={`font-bold text-teal-800 flex items-center justify-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              <Zap className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
              {currentLang === 'ar' ? 'قريباً: الربط المباشر مع قطار الحرمين' : 'Coming Soon: Direct API Integration'}
            </h3>
            <p className={`text-teal-700 text-sm mt-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {currentLang === 'ar' ? 'نعمل على تجهيز الربط المباشر مع موقع قطار الحرمين لتوفير الحجز الفوري والأسعار المحدثة.' : 'We are preparing for direct API integration with the Haramain Train website for instant booking and live prices.'}
            </p>
          </div>
          {sampleTrips.map(trip => (
            <motion.div 
              key={trip.id} 
              className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: trip.id * 0.1 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <div className="flex items-center mb-2 sm:mb-0">
                  <TrainFront className="h-8 w-8 text-primary mr-3 rtl:ml-3 rtl:mr-0" />
                  <span className={`font-semibold text-lg ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                    {searchParams.departureStation ? stations.find(s=>s.value === searchParams.departureStation)?.[currentLang === 'ar' ? 'labelAr' : 'labelEn'] : (currentLang === 'ar' ? 'مكة' : 'Makkah')}
                    <MapPin className="inline h-4 w-4 mx-1 text-gray-400" />
                    {searchParams.arrivalStation ? stations.find(s=>s.value === searchParams.arrivalStation)?.[currentLang === 'ar' ? 'labelAr' : 'labelEn'] : (currentLang === 'ar' ? 'المدينة' : 'Madinah')}
                  </span>
                </div>
                {trip.direct && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">{currentLang === 'ar' ? 'مباشر' : 'Direct'}</span>}
              </div>
              <div className="grid grid-cols-3 items-center text-center mb-4">
                <div>
                  <p className={`text-lg font-semibold text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{trip.departureTime}</p>
                  <p className={`text-xs text-gray-500 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'المغادرة' : 'Departure'}</p>
                </div>
                <div className="flex flex-col items-center">
                    <span className={`text-sm text-gray-500 my-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{trip.duration}</span>
                </div>
                <div>
                  <p className={`text-lg font-semibold text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{trip.arrivalTime}</p>
                  <p className={`text-xs text-gray-500 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'الوصول' : 'Arrival'}</p>
                </div>
              </div>
               <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
                  {trip.amenities.map(amenity => (
                    <span key={amenity.label} className="flex items-center">
                      <amenity.icon className="mr-1.5 rtl:ml-1.5 rtl:mr-0 h-4 w-4 text-primary/70" /> {amenity.label}
                    </span>
                  ))}
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div>
                    <p className={`text-md font-semibold text-green-600 mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                        {currentLang === 'ar' ? 'السياحية:' : 'Economy:'} {trip.priceEconomy}
                    </p>
                    <p className={`text-md font-semibold text-blue-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                        {currentLang === 'ar' ? 'الأعمال:' : 'Business:'} {trip.priceBusiness}
                    </p>
                </div>
                <Button 
                  size="sm" 
                  className={`mt-2 sm:mt-0 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} 
                  onClick={() => handleFeatureClick(currentLang === 'ar' ? `اختيار مقاعد لرحلة القطار` : `Select Seats for Train Trip`)}
                >
                  {currentLang === 'ar' ? 'اختيار المقاعد والحجز' : 'Select Seats & Book'}
                </Button>
              </div>
            </motion.div>
          ))}
           <div className="mt-6 p-4 bg-blue-50/90 backdrop-blur-sm border border-blue-200 rounded-lg">
                <h4 className={`text-md font-semibold text-blue-700 mb-2 flex items-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                    <Info className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5"/>
                    {currentLang === 'ar' ? 'معلومات إضافية' : 'Additional Information'}
                </h4>
                <ul className={`list-disc list-inside text-sm text-blue-600 space-y-1 ${currentLang === 'ar' ? 'font-arabic pr-4' : 'font-english pl-4'}`}>
                    <li>{currentLang === 'ar' ? 'سياسات الأمتعة: يسمح بحقيبة يد وحقيبة كبيرة لكل راكب.' : 'Baggage Policy: One handbag and one large bag allowed per passenger.'}</li>
                    <li>{currentLang === 'ar' ? 'إرشادات المحطة: يرجى التواجد في المحطة قبل 60 دقيقة من موعد المغادرة.' : 'Station Guidelines: Please be at the station 60 minutes before departure.'}</li>
                </ul>
           </div>
        </main>
      </div>
    </GenericPage>
  );
};

export default HaramainTrainPage;