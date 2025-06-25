import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import GenericPage from './GenericPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star, Phone, Mail, Globe, MapPin, MessageSquare, Calendar, User, MoonStar as StarIcon, Send, CheckCircle, Award, Clock, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const ServiceProviderDetailsPage = ({ t, currentLang, handleFeatureClick }) => {
  const { providerId } = useParams();
  const { toast } = useToast();
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    comment: '',
    isHajjPilgrim: false
  });

  const providerData = {
    id: providerId,
    name: currentLang === 'ar' ? 'شركة النور للحج والعمرة' : 'Al-Noor Hajj & Umrah Company',
    rating: 4.8,
    reviews: 125,
    totalClients: 2500,
    yearsExperience: 15,
    description: currentLang === 'ar' 
      ? 'نقدم أفضل الخدمات لضيوف الرحمن، مع خبرة تمتد لأكثر من 15 عامًا في تنظيم رحلات الحج والعمرة. راحتكم هي أولويتنا القصوى، ونحن ملتزمون بتقديم تجربة روحانية لا تُنسى.' 
      : 'We provide the best services for the guests of Allah, with over 15 years of experience in organizing Hajj and Umrah trips. Your comfort is our top priority, and we are committed to providing an unforgettable spiritual experience.',
    contact: {
      phone: '+966 12 345 6789',
      email: 'info@alnoor-hajj.com',
      website: 'www.alnoor-hajj.com',
      address: currentLang === 'ar' 
        ? '123 شارع الملك عبد العزيز، مكة المكرمة، المملكة العربية السعودية' 
        : '123 King Abdulaziz St, Makkah, Saudi Arabia'
    },
    services: currentLang === 'ar' 
      ? ['باقات العمرة المتنوعة', 'برامج الحج الشاملة', 'حجز الفنادق والطيران', 'النقل والمواصلات', 'الإرشاد الديني', 'خدمة عملاء 24/7']
      : ['Diverse Umrah Packages', 'Comprehensive Hajj Programs', 'Hotel & Flight Booking', 'Transportation Services', 'Religious Guidance', '24/7 Customer Service'],
    certifications: currentLang === 'ar'
      ? ['معتمد من وزارة الحج والعمرة', 'عضو في اتحاد وكالات السفر السعودي', 'شهادة الجودة ISO 9001']
      : ['Certified by Ministry of Hajj & Umrah', 'Member of Saudi Travel Agents Union', 'ISO 9001 Quality Certificate'],
    image: 'A modern office for a Hajj and Umrah travel agency'
  };

  const sampleReviews = [
    {
      id: 1,
      name: currentLang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      rating: 5,
      date: '2024-01-15',
      comment: currentLang === 'ar' 
        ? 'تجربة رائعة مع شركة النور. الخدمة ممتازة والتنظيم مثالي. أنصح بها بشدة.'
        : 'Amazing experience with Al-Noor company. Excellent service and perfect organization. Highly recommended.',
      isHajjPilgrim: true
    },
    {
      id: 2,
      name: currentLang === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      rating: 4,
      date: '2024-01-10',
      comment: currentLang === 'ar'
        ? 'خدمة جيدة جداً، الفنادق كانت قريبة من الحرم والطعام لذيذ.'
        : 'Very good service, hotels were close to Haram and food was delicious.',
      isHajjPilgrim: false
    },
    {
      id: 3,
      name: currentLang === 'ar' ? 'عبدالله السعيد' : 'Abdullah Al-Saeed',
      rating: 5,
      date: '2024-01-05',
      comment: currentLang === 'ar'
        ? 'الحمد لله، تمكنت من أداء العمرة بكل راحة وطمأنينة. شكراً لفريق العمل المتميز.'
        : 'Alhamdulillah, I was able to perform Umrah with complete comfort and peace of mind. Thanks to the excellent team.',
      isHajjPilgrim: false
    }
  ];

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    toast({
      title: currentLang === 'ar' ? 'تم إرسال التقييم بنجاح' : 'Review Submitted Successfully',
      description: currentLang === 'ar' 
        ? 'شكراً لك على تقييمك. سيتم مراجعته ونشره قريباً.'
        : 'Thank you for your review. It will be reviewed and published soon.',
    });
    setReviewForm({ name: '', rating: 5, comment: '', isHajjPilgrim: false });
  };

  const pageTitle = currentLang === 'ar' ? `تفاصيل مقدم الخدمة: ${providerData.name}` : `Service Provider: ${providerData.name}`;
  const pageDescription = providerData.description;

  return (
    <GenericPage pageKey="providerDetails" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang}>
      <div className="space-y-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200/50">
          <div className="relative h-64">
            <img  className="w-full h-full object-cover" alt={providerData.name} src="https://images.unsplash.com/photo-1595539657491-b5d4b9c11a22" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className={`text-3xl font-bold text-white ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{providerData.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center text-yellow-400">
                  {[...Array(Math.floor(providerData.rating))].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                  {providerData.rating % 1 !== 0 && <Star className="h-5 w-5 fill-current opacity-50" />}
                  {[...Array(5 - Math.ceil(providerData.rating))].map((_, i) => <Star key={i} className="h-5 w-5 text-gray-400" />)}
                </div>
                <span className="text-white ml-2 text-sm">({providerData.rating} / {providerData.reviews} {currentLang === 'ar' ? 'تقييم' : 'reviews'})</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-primary/10 rounded-xl">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className={`text-2xl font-bold text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{providerData.totalClients.toLocaleString()}</div>
                <div className={`text-sm text-gray-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'عميل سعيد' : 'Happy Clients'}</div>
              </div>
              <div className="text-center p-4 bg-secondary/10 rounded-xl">
                <Clock className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className={`text-2xl font-bold text-secondary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{providerData.yearsExperience}</div>
                <div className={`text-sm text-gray-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'سنة خبرة' : 'Years Experience'}</div>
              </div>
              <div className="text-center p-4 bg-green-100 rounded-xl">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className={`text-2xl font-bold text-green-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>100%</div>
                <div className={`text-sm text-gray-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'موثوق' : 'Trusted'}</div>
              </div>
            </div>

            <h2 className={`text-2xl font-bold text-primary mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'عن الشركة' : 'About the Company'}</h2>
            <p className={`text-gray-700 leading-relaxed mb-8 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{providerData.description}</p>

            <h3 className={`text-xl font-bold text-primary mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'خدماتنا' : 'Our Services'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {providerData.services.map((service, index) => (
                <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0"/>
                  <span className={`text-gray-700 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{service}</span>
                </div>
              ))}
            </div>

            <h3 className={`text-xl font-bold text-primary mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'الشهادات والاعتمادات' : 'Certifications & Accreditations'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {providerData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-yellow-50 rounded-lg">
                  <Award className="h-5 w-5 text-yellow-600 flex-shrink-0"/>
                  <span className={`text-gray-700 text-sm ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{cert}</span>
                </div>
              ))}
            </div>

            <h2 className={`text-2xl font-bold text-primary mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'معلومات التواصل' : 'Contact Information'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="h-6 w-6 text-primary"/>
                <a href={`tel:${providerData.contact.phone}`} className="text-gray-800 hover:text-primary transition-colors">{providerData.contact.phone}</a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="h-6 w-6 text-primary"/>
                <a href={`mailto:${providerData.contact.email}`} className="text-gray-800 hover:text-primary transition-colors">{providerData.contact.email}</a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Globe className="h-6 w-6 text-primary"/>
                <a href={`http://${providerData.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-primary transition-colors">{providerData.contact.website}</a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="h-6 w-6 text-primary"/>
                <span className="text-gray-800">{providerData.contact.address}</span>
              </div>
            </div>

            <Button size="lg" className="w-full md:w-auto mb-8" onClick={() => handleFeatureClick(currentLang === 'ar' ? 'حجز باقة من هذا المزود' : 'Booking a package from this provider')}>
              {currentLang === 'ar' ? 'عرض باقات هذا المزود' : 'View Provider\'s Packages'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50">
            <h3 className={`text-xl font-bold text-primary mb-6 flex items-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              <MessageSquare className="h-6 w-6 mr-2 rtl:ml-2 rtl:mr-0" />
              {currentLang === 'ar' ? 'تقييمات العملاء' : 'Customer Reviews'}
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {sampleReviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className={`font-semibold text-gray-800 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{review.name}</span>
                      {review.isHajjPilgrim && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {currentLang === 'ar' ? 'حاج هذا العام' : 'This Year\'s Pilgrim'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}
                      {[...Array(5 - review.rating)].map((_, i) => <StarIcon key={i} className="h-4 w-4 text-gray-300" />)}
                    </div>
                  </div>
                  <p className={`text-gray-600 text-sm mb-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{review.comment}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                    {new Date(review.date).toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'en-US')}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50">
            <h3 className={`text-xl font-bold text-primary mb-6 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {currentLang === 'ar' ? 'اترك تقييمك' : 'Leave Your Review'}
            </h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <Label htmlFor="reviewName" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                  {currentLang === 'ar' ? 'الاسم' : 'Name'}
                </Label>
                <Input
                  id="reviewName"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                  placeholder={currentLang === 'ar' ? 'اكتب اسمك' : 'Enter your name'}
                  required
                />
              </div>
              
              <div>
                <Label className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                  {currentLang === 'ar' ? 'التقييم' : 'Rating'}
                </Label>
                <div className="flex items-center space-x-1 rtl:space-x-reverse mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({...reviewForm, rating: star})}
                      className="focus:outline-none"
                    >
                      <StarIcon className={`h-6 w-6 ${star <= reviewForm.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="reviewComment" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                  {currentLang === 'ar' ? 'التعليق' : 'Comment'}
                </Label>
                <textarea
                  id="reviewComment"
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                  placeholder={currentLang === 'ar' ? 'شاركنا تجربتك مع هذا المزود...' : 'Share your experience with this provider...'}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows="4"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <input
                  type="checkbox"
                  id="isHajjPilgrim"
                  checked={reviewForm.isHajjPilgrim}
                  onChange={(e) => setReviewForm({...reviewForm, isHajjPilgrim: e.target.checked})}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <Label htmlFor="isHajjPilgrim" className={`text-sm ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                  {currentLang === 'ar' ? 'أنا من حجاج هذا العام' : 'I am a pilgrim of this year'}
                </Label>
              </div>

              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {currentLang === 'ar' ? 'إرسال التقييم' : 'Submit Review'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </GenericPage>
  );
};

export default ServiceProviderDetailsPage;