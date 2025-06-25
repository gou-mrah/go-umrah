import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GenericPage from './GenericPage';
import NotFoundPage from './NotFoundPage';
import { Button } from '@/components/ui/button';
import { Star, Phone, Mail, Globe, MapPin, Building, UserCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

const RatingForm = ({ t, currentLang, handleFeatureClick }) => {
  const { user } = useAuth();
  const tHajj = t.hajjCompaniesPage || {};

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tHajj.ratingFormTitle || 'Submit Your Rating'}</CardTitle>
        <CardDescription className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tHajj.ratingFormDescription || 'Only pilgrims of the current year can submit a rating.'}</CardDescription>
      </CardHeader>
      <CardContent>
        {user ? (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <Label htmlFor="rating" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tHajj.yourRating || 'Your Rating'}</Label>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 text-gray-300 cursor-pointer hover:text-yellow-400 transition-colors" />
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="review" className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tHajj.yourReview || 'Your Review'}</Label>
              <Textarea id="review" placeholder={currentLang === 'ar' ? 'اكتب مراجعتك هنا...' : 'Write your review here...'} className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`} />
            </div>
            <Button className="w-full" onClick={() => handleFeatureClick(tHajj.submitReview, '#')}>
              {tHajj.submitReview || 'Submit Review'}
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <p className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'يرجى تسجيل الدخول لتقييم الشركة.' : 'Please log in to rate the company.'}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


const HajjCompanyDetailsPage = ({ t, currentLang, handleFeatureClick }) => {
  const { companyId } = useParams();
  const { hajjCompanies } = useApp();
  const tHajj = t.hajjCompaniesPage || {};
  
  const company = hajjCompanies.find(c => c.id === companyId);

  if (!company) {
    return <NotFoundPage t={t} currentLang={currentLang} />;
  }

  const pageTitle = `${t.hajjCompaniesPage.title}: ${company.name}`;
  const pageDescription = company.description;

  return (
    <GenericPage pageKey="hajjCompanyDetails" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang}>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200/50">
        <div className="relative h-64 md:h-80">
          <img  className="w-full h-full object-cover" alt={company.images[0]} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h1 className={`text-3xl md:text-4xl font-bold text-white ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{company.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center text-yellow-400">
                {[...Array(Math.floor(company.rating))].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                {company.rating % 1 !== 0 && <Star className="h-5 w-5 fill-current" style={{ clipPath: `polygon(0 0, ${company.rating % 1 * 100}% 0, ${company.rating % 1 * 100}% 100%, 0 100%)` }} />}
                {[...Array(5 - Math.ceil(company.rating))].map((_, i) => <Star key={i} className="h-5 w-5 text-gray-300 fill-current opacity-50" />)}
              </div>
              <span className="text-white ml-2 text-sm">({company.rating})</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className={`text-2xl font-bold text-primary mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tHajj.aboutCompany || 'About the Company'}</h2>
            <p className={`text-gray-700 leading-relaxed mb-8 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{company.description}</p>

            <h3 className={`text-xl font-bold text-primary mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentLang === 'ar' ? 'معرض الصور' : 'Gallery'}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {company.images.map((img, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} className="rounded-lg overflow-hidden shadow-md">
                   <img  className="w-full h-32 object-cover" alt={img} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </motion.div>
              ))}
            </div>

            <Button size="lg" className="w-full md:w-auto" onClick={() => handleFeatureClick(tHajj.viewPackages || 'View Company Packages', '#')}>
              {tHajj.viewPackages || 'View Company Packages'}
            </Button>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tHajj.contactInfo || 'Contact Information'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0"/>
                  <a href={`tel:${company.contact.phone}`} className="text-gray-800 hover:text-primary transition-colors text-sm break-all">{company.contact.phone}</a>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0"/>
                  <a href={`mailto:${company.contact.email}`} className="text-gray-800 hover:text-primary transition-colors text-sm break-all">{company.contact.email}</a>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Globe className="h-5 w-5 text-primary flex-shrink-0"/>
                  <a href={`http://${company.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-primary transition-colors text-sm break-all">{company.contact.website}</a>
                </div>
                 <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1"/>
                  <span className={`text-gray-800 text-sm ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{company.city}</span>
                </div>
              </CardContent>
            </Card>

            <RatingForm t={t} currentLang={currentLang} handleFeatureClick={handleFeatureClick} />
          </div>
        </div>
      </div>
    </GenericPage>
  );
};

export default HajjCompanyDetailsPage;