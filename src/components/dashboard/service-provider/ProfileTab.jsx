import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const ProfileTab = ({ provider, currentLang }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'معلومات الشركة' : 'Company Information'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>{currentLang === 'ar' ? 'اسم الشركة' : 'Company Name'}</Label>
            <p className="text-lg font-semibold">{provider.company_name}</p>
          </div>
          <div>
            <Label>{currentLang === 'ar' ? 'رقم السجل التجاري' : 'Commercial Registration'}</Label>
            <p>{provider.commercial_registration_number || 'N/A'}</p>
          </div>
          <div>
            <Label>{currentLang === 'ar' ? 'رقم ترخيص السياحة' : 'Tourism License'}</Label>
            <p>{provider.tourism_license_number || 'N/A'}</p>
          </div>
          <div>
            <Label>{currentLang === 'ar' ? 'العنوان' : 'Address'}</Label>
            <p>{provider.address || 'N/A'}</p>
          </div>
          <div>
            <Label>{currentLang === 'ar' ? 'حالة الموافقة' : 'Approval Status'}</Label>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              provider.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {provider.is_approved ? (currentLang === 'ar' ? 'مقبول' : 'Approved') : (currentLang === 'ar' ? 'معلق' : 'Pending')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;