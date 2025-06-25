import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const AllLinksPage = ({ t, currentLang }) => {
  const linkSections = [
    {
      title: currentLang === 'ar' ? 'لوحات التحكم' : 'Dashboards',
      links: [
        { name: currentLang === 'ar' ? 'لوحة تحكم المدير العام' : 'Super Admin Dashboard', path: '/dashboard/super-admin' },
        { name: currentLang === 'ar' ? 'لوحة تحكم مقدم الخدمة' : 'Service Provider Dashboard', path: '/dashboard/service-provider' },
        { name: currentLang === 'ar' ? 'لوحة تحكم العميل' : 'Customer Dashboard', path: '/dashboard/customer' },
      ],
    },
    {
      title: currentLang === 'ar' ? 'صفحات المصادقة' : 'Authentication Pages',
      links: [
        { name: currentLang === 'ar' ? 'تسجيل الدخول' : 'Login', path: '/login' },
        { name: currentLang === 'ar' ? 'تسجيل حساب جديد' : 'Register', path: '/register' },
      ],
    },
    {
      title: currentLang === 'ar' ? 'الصفحات الرئيسية' : 'Main Pages',
      links: [
        { name: currentLang === 'ar' ? 'الصفحة الرئيسية' : 'Home', path: '/' },
        { name: currentLang === 'ar' ? 'باقات العمرة' : 'Umrah Packages', path: '/umrah-packages' },
        { name: currentLang === 'ar' ? 'باقات الحج' : 'Hajj Packages', path: '/hajj-packages' },
        { name: currentLang === 'ar' ? 'المتجر' : 'Store', path: '/store' },
      ],
    },
    {
      title: currentLang === 'ar' ? 'صفحات المعلومات' : 'Information Pages',
      links: [
        { name: currentLang === 'ar' ? 'من نحن' : 'About Us', path: '/about-us' },
        { name: currentLang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ', path: '/faq' },
        { name: currentLang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy', path: '/privacy-policy' },
        { name: currentLang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions', path: '/terms-and-conditions' },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'جميع روابط الموقع' : 'All Site Links'}
        </h1>
        <p className={`mt-4 text-lg text-gray-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'دليلك السريع للوصول إلى جميع صفحات منصة جو عمرة.' : 'Your quick guide to all pages on the Go Umrah platform.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {linkSections.map((section, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-gray-100">
              <CardTitle className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Button asChild variant="outline" className="w-full justify-between">
                      <Link to={link.path}>
                        <span className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{link.name}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllLinksPage;