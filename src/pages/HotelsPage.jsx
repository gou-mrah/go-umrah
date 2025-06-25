import React, { useState } from 'react';
import GenericPage from './GenericPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, DollarSign, Star, MapPin, Wifi, ParkingCircle, Utensils, Archive, Briefcase, Users2, CalendarDays, Search, ChevronDown, ChevronUp, Tag, MessageSquare, Coffee, Dumbbell, Car, Waves, Baby, Shield, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const HotelsPage = ({ t, handleFeatureClick, currentLang }) => {
  const pageTitle = t.nav.hotels;
  const pageDescription = t.services.hotels.description;
  
  const backgroundImage = currentLang === 'ar'
    ? "الكعبة المشرفة من نافذة فندق مطل"
    : "View of the Kaaba from an overlooking hotel window";

  const [searchParams, setSearchParams] = useState({
    city: '',
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    rooms: 1,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (name, value) => {
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    setIsSearching(true);
    toast({
      title: currentLang === 'ar' ? 'جاري البحث...' : 'Searching...',
      description: currentLang === 'ar' ? 'نبحث عن أفضل الفنادق عبر Agoda API' : 'Searching for the best hotels via Agoda API',
    });
    
    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: currentLang === 'ar' ? 'تم العثور على فنادق!' : 'Hotels Found!',
        description: currentLang === 'ar' ? 'عثرنا على أفضل العروض المتاحة' : 'Found the best available deals',
      });
    }, 2000);
  };

  const filters = [
    { label: currentLang === 'ar' ? 'السعر لكل ليلة' : 'Price per Night', icon: DollarSign, type: 'range' },
    { label: currentLang === 'ar' ? 'التصنيف (نجوم)' : 'Star Rating', icon: Star, type: 'stars' },
    { label: currentLang === 'ar' ? 'البعد عن الحرم' : 'Distance from Haram', icon: MapPin, type: 'select', options: ['< 200m', '200m - 500m', '500m - 1km', '> 1km'] },
    { label: currentLang === 'ar' ? 'المرافق الأساسية' : 'Basic Amenities', icon: Wifi, type: 'checkboxes', options: [currentLang === 'ar' ? 'واي فاي مجاني' : 'Free WiFi', currentLang === 'ar' ? 'موقف سيارات' : 'Parking', currentLang === 'ar' ? 'مطعم' : 'Restaurant', currentLang === 'ar' ? 'خدمة الغرف' : 'Room Service'] },
    { label: currentLang === 'ar' ? 'المرافق الإضافية' : 'Additional Amenities', icon: Coffee, type: 'checkboxes', options: [currentLang === 'ar' ? 'مسبح' : 'Swimming Pool', currentLang === 'ar' ? 'صالة رياضية' : 'Fitness Center', currentLang === 'ar' ? 'سبا' : 'Spa', currentLang === 'ar' ? 'مركز أعمال' : 'Business Center'] },
    { label: currentLang === 'ar' ? 'تقييمات النزلاء' : 'Guest Reviews', icon: MessageSquare, type: 'select', options: ['9.0+', '8.0+', '7.0+', '6.0+'] },
    { label: currentLang === 'ar' ? 'نوع الإقامة' : 'Property Type', icon: Briefcase, type: 'select', options: [currentLang === 'ar' ? 'فندق' : 'Hotel', currentLang === 'ar' ? 'شقة فندقية' : 'Apartment Hotel', currentLang === 'ar' ? 'منتجع' : 'Resort', currentLang === 'ar' ? 'نزل' : 'Inn'] },
    { label: currentLang === 'ar' ? 'سياسات الإلغاء' : 'Cancellation Policy', icon: Archive, type: 'select', options: [currentLang === 'ar' ? 'إلغاء مجاني' : 'Free Cancellation', currentLang === 'ar' ? 'غير قابل للاسترداد' : 'Non-refundable'] },
    { label: currentLang === 'ar' ? 'العروض الخاصة' : 'Special Deals', icon: Tag, type: 'checkboxes', options: [currentLang === 'ar' ? 'عروض اللحظة الأخيرة' : 'Last Minute Deals', currentLang === 'ar' ? 'إقامة طويلة' : 'Extended Stay', currentLang === 'ar' ? 'عروض مبكرة' : 'Early Bird'] },
    { label: currentLang === 'ar' ? 'اسم الفندق' : 'Hotel Name', icon: MapPin, type: 'text' },
    { label: currentLang === 'ar' ? 'خدمات العائلات' : 'Family Services', icon: Baby, type: 'checkboxes', options: [currentLang === 'ar' ? 'مناسب للأطفال' : 'Kid-Friendly', currentLang === 'ar' ? 'أسرة إضافية' : 'Extra Beds', currentLang === 'ar' ? 'خدمة حضانة' : 'Babysitting'] },
  ];

  const sampleHotels = Array(6).fill(null).map((_, i) => ({
    id: i + 1,
    name: `${currentLang === 'ar' ? 'فندق' : 'Hotel'} ${['جوهرة الحرم', 'قصر مكة', 'برج الساعة', 'دار التوحيد', 'الماسة الذهبية', 'قمة الإيمان'][i]}`,
    nameEn: ['Jewel of Haram', 'Makkah Palace', 'Clock Tower', 'Dar Al-Tawhid', 'Golden Diamond', 'Peak of Faith'][i],
    rating: [5, 4, 5, 3, 4, 5][i],
    guestRating: [(9.2 - i * 0.3).toFixed(1)],
    reviewCount: [1250, 890, 2100, 450, 670, 1800][i],
    price: `${(400 + i * 150)} ${currentLang === 'ar' ? 'ريال/الليلة' : 'SAR/Night'}`,
    originalPrice: i % 2 === 0 ? `${(500 + i * 150)} ${currentLang === 'ar' ? 'ريال/الليلة' : 'SAR/Night'}` : null,
    distance: `${(i + 1) * 50} ${currentLang === 'ar' ? 'متر من الحرم' : 'm from Haram'}`,
    amenities: [
      { icon: Wifi, label: currentLang === 'ar' ? 'واي فاي مجاني' : 'Free WiFi' },
      ...(i >= 1 ? [{ icon: ParkingCircle, label: currentLang === 'ar' ? 'موقف سيارات' : 'Parking' }] : []),
      { icon: Utensils, label: currentLang === 'ar' ? 'مطعم' : 'Restaurant' },
      ...(i >= 2 ? [{ icon: Dumbbell, label: currentLang === 'ar' ? 'صالة رياضية' : 'Fitness Center' }] : []),
      ...(i >= 3 ? [{ icon: Waves, label: currentLang === 'ar' ? 'مسبح' : 'Swimming Pool' }] : []),
      ...(i >= 4 ? [{ icon: Car, label: currentLang === 'ar' ? 'خدمة النقل' : 'Shuttle Service' }] : []),
      ...(i === 5 ? [{ icon: Coffee, label: currentLang === 'ar' ? 'لاونج تنفيذي' : 'Executive Lounge' }] : []),
    ],
    description: currentLang === 'ar' 
      ? `فندق فاخر يوفر إقامة مريحة وإطلالات خلابة على ${i % 2 === 0 ? 'الحرم الشريف' : 'المدينة'}، مع سهولة الوصول إلى المسجد الحرام والخدمات المحيطة. يتميز بـ${i >= 3 ? 'مرافق عالمية المستوى و' : ''}خدمة عملاء متميزة على مدار الساعة.`
      : `A luxurious hotel offering comfortable stays and stunning ${i % 2 === 0 ? 'Haram' : 'city'} views, with easy access to Al-Masjid Al-Haram and surrounding services. Features ${i >= 3 ? 'world-class facilities and ' : ''}excellent 24/7 customer service.`,
    image: `Luxurious hotel room with ${i % 2 === 0 ? 'Haram' : 'city'} view at ${i % 3 === 0 ? 'night' : 'day'} ${i}`,
    specialOffers: i % 3 === 0 ? [currentLang === 'ar' ? 'إفطار مجاني' : 'Free Breakfast'] : i % 3 === 1 ? [currentLang === 'ar' ? 'إلغاء مجاني' : 'Free Cancellation'] : [currentLang === 'ar' ? 'ترقية مجانية للغرفة' : 'Free Room Upgrade'],
    isPopular: i === 0 || i === 2,
    hasPromotion: i % 2 === 0
  }));

  return (
    <GenericPage pageKey="hotels" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang} backgroundImage={backgroundImage}>
      <div className="mb-8 p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-end">
          <div className="xl:col-span-1">
            <Label htmlFor="city" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'المدينة أو الوجهة' : 'City or Destination'}</Label>
            <Input type="text" id="city" name="city" value={searchParams.city} onChange={(e) => handleInputChange('city', e.target.value)} placeholder={currentLang === 'ar' ? 'مثال: مكة المكرمة' : 'e.g., Makkah'} className={`${currentLang === 'ar' ? 'font-arabic placeholder:text-right' : 'font-english'}`} />
          </div>
          <div>
            <Label htmlFor="checkIn" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'تاريخ الدخول' : 'Check-in Date'}</Label>
            <Input type="date" id="checkIn" name="checkIn" value={searchParams.checkIn} onChange={(e) => handleInputChange('checkIn', e.target.value)} className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} />
          </div>
          <div>
            <Label htmlFor="checkOut" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'تاريخ المغادرة' : 'Check-out Date'}</Label>
            <Input type="date" id="checkOut" name="checkOut" value={searchParams.checkOut} onChange={(e) => handleInputChange('checkOut', e.target.value)} className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
                <Label htmlFor="adults" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'البالغون' : 'Adults'}</Label>
                <Input type="number" id="adults" name="adults" min="1" max="10" value={searchParams.adults} onChange={(e) => handleInputChange('adults', e.target.value)} className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} />
            </div>
            <div>
                <Label htmlFor="children" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'الأطفال' : 'Children'}</Label>
                <Input type="number" id="children" name="children" min="0" max="8" value={searchParams.children} onChange={(e) => handleInputChange('children', e.target.value)} className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} />
            </div>
          </div>
          <div>
            <Label htmlFor="rooms" className={`block text-sm font-medium mb-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'الغرف' : 'Rooms'}</Label>
            <Input type="number" id="rooms" name="rooms" min="1" max="5" value={searchParams.rooms} onChange={(e) => handleInputChange('rooms', e.target.value)} className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} />
          </div>
          <Button 
            className={`w-full py-3 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'} ${isSearching ? 'opacity-75' : ''}`} 
            onClick={handleSearch}
            disabled={isSearching}
          >
            <Search className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
            {isSearching ? (currentLang === 'ar' ? 'جاري البحث...' : 'Searching...') : (currentLang === 'ar' ? 'بحث عبر Agoda API' : 'Search via Agoda API')}
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <Button variant="outline" size="sm" onClick={() => handleFeatureClick(currentLang === 'ar' ? "خريطة الفنادق" : "Hotel Map")}>
              <MapPin className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />{currentLang === 'ar' ? 'عرض على الخريطة' : 'View on Map'}
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleFeatureClick(currentLang === 'ar' ? "مقارنة الفنادق" : "Compare Hotels")}>
              <Shield className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />{currentLang === 'ar' ? 'مقارنة الفنادق' : 'Compare Hotels'}
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleFeatureClick(currentLang === 'ar' ? "عروض اللحظة الأخيرة" : "Last Minute Deals")}>
              <Zap className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />{currentLang === 'ar' ? 'عروض اللحظة الأخيرة' : 'Last Minute Deals'}
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
              {currentLang === 'ar' ? `عرض ${sampleHotels.length} فنادق متاحة` : `Showing ${sampleHotels.length} available hotels`}
            </span>
            <Select onValueChange={(value) => handleFeatureClick(`${currentLang === 'ar' ? 'ترتيب حسب' : 'Sort by'} ${value}`)}>
              <SelectTrigger className={`w-[200px] ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                <SelectValue placeholder={currentLang === 'ar' ? 'ترتيب حسب...' : 'Sort by...'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'السعر' : 'Price'}</SelectItem>
                <SelectItem value="rating" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'التقييم' : 'Rating'}</SelectItem>
                <SelectItem value="distance" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'المسافة من الحرم' : 'Distance from Haram'}</SelectItem>
                <SelectItem value="popularity" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'الشعبية' : 'Popularity'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {sampleHotels.map(hotel => (
            <motion.div 
              key={hotel.id} 
              className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row gap-6 border border-gray-200/50 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: hotel.id * 0.1 }}
            >
              {hotel.isPopular && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {currentLang === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                </div>
              )}
              {hotel.hasPromotion && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {currentLang === 'ar' ? 'عرض خاص' : 'Special Deal'}
                </div>
              )}
              
              <img alt={currentLang === 'ar' ? `صورة فندق ${hotel.name}` : `Image of ${hotel.nameEn} hotel`} className="w-full md:w-1/3 h-48 md:h-auto object-cover rounded-md shadow-md" src="https://images.unsplash.com/photo-1644473968199-150d0a098163" />
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                   <h4 className={`text-2xl font-bold text-primary mb-1 sm:mb-0 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? hotel.name : hotel.nameEn}</h4>
                   <div className="flex items-center">
                      {Array(hotel.rating).fill(0).map((_, idx) => <Star key={idx} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                      {Array(5 - hotel.rating).fill(0).map((_, idx) => <Star key={`empty-${idx}`} className="h-5 w-5 text-gray-300" />)}
                   </div>
                </div>
                
                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-2">
                  <p className={`text-sm text-gray-500 flex items-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                    <MapPin className="inline h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0"/>{hotel.distance}
                  </p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1 rtl:ml-1 rtl:mr-0" />
                    <span className={`text-sm font-semibold ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{hotel.guestRating}</span>
                    <span className={`text-xs text-gray-500 ml-1 rtl:mr-1 rtl:ml-0 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>({hotel.reviewCount} {currentLang === 'ar' ? 'تقييم' : 'reviews'})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {hotel.originalPrice && (
                      <span className={`text-lg text-gray-500 line-through ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{hotel.originalPrice}</span>
                    )}
                    <p className={`text-xl font-semibold text-green-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{hotel.price}</p>
                  </div>
                  {hotel.specialOffers.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {hotel.specialOffers.map((offer, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {offer}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
                  {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                    <span key={idx} className="flex items-center">
                      <amenity.icon className="mr-1.5 rtl:ml-1.5 rtl:mr-0 h-4 w-4 text-primary/70" /> {amenity.label}
                    </span>
                  ))}
                  {hotel.amenities.length > 4 && (
                    <span className={`text-primary cursor-pointer hover:underline ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                      +{hotel.amenities.length - 4} {currentLang === 'ar' ? 'المزيد' : 'more'}
                    </span>
                  )}
                </div>
                
                <p className={`text-gray-700 mb-4 text-sm leading-relaxed ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{hotel.description}</p>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline"
                    className={`flex-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
                    onClick={() => handleFeatureClick(`${currentLang === 'ar' ? 'عرض تفاصيل فندق' : 'View Hotel Details'} ${currentLang === 'ar' ? hotel.name : hotel.nameEn}`)}
                  >
                    {t.buttons.viewDetails}
                  </Button>
                  <Button 
                    className={`flex-1 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
                    onClick={() => handleFeatureClick(`${currentLang === 'ar' ? 'حجز فندق' : 'Book Hotel'} ${currentLang === 'ar' ? hotel.name : hotel.nameEn}`)}
                  >
                    {t.buttons.bookNow}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="text-center mt-8">
             <Button variant="outline" onClick={() => handleFeatureClick(currentLang === 'ar' ? "عرض المزيد من الفنادق" : "View More Hotels")}>
                 {currentLang === 'ar' ? 'عرض المزيد من الفنادق' : 'View More Hotels'}
             </Button>
          </div>
        </main>
      </div>
    </GenericPage>
  );
};

export default HotelsPage;