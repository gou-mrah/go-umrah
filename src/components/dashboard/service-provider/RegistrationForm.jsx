import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const RegistrationForm = ({ registrationData, setRegistrationData, handleRegisterProvider, currentLang }) => {
  return (
    <div className="mt-8">
      <h3 className={`text-2xl font-semibold mb-6 text-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
        {currentLang === 'ar' ? 'تسجيل كمقدم خدمة' : 'Register as a Service Provider'}
      </h3>
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <form onSubmit={handleRegisterProvider} className="space-y-4">
            <div>
              <Label htmlFor="companyName">{currentLang === 'ar' ? 'اسم الشركة' : 'Company Name'}</Label>
              <Input
                id="companyName"
                value={registrationData.company_name}
                onChange={(e) => setRegistrationData({ ...registrationData, company_name: e.target.value })}
                placeholder={currentLang === 'ar' ? 'مثال: شركة النشامى للسياحة' : 'e.g., Al Nashama Tourism'}
                required
              />
            </div>
            <div>
              <Label htmlFor="commercialReg">{currentLang === 'ar' ? 'رقم السجل التجاري' : 'Commercial Registration Number'}</Label>
              <Input
                id="commercialReg"
                value={registrationData.commercial_registration_number}
                onChange={(e) => setRegistrationData({ ...registrationData, commercial_registration_number: e.target.value })}
                placeholder="1234567890"
              />
            </div>
            <div>
              <Label htmlFor="tourismLicense">{currentLang === 'ar' ? 'رقم ترخيص السياحة' : 'Tourism License Number'}</Label>
              <Input
                id="tourismLicense"
                value={registrationData.tourism_license_number}
                onChange={(e) => setRegistrationData({ ...registrationData, tourism_license_number: e.target.value })}
                placeholder="TL123456"
              />
            </div>
            <div>
              <Label htmlFor="address">{currentLang === 'ar' ? 'العنوان' : 'Address'}</Label>
              <Textarea
                id="address"
                value={registrationData.address}
                onChange={(e) => setRegistrationData({ ...registrationData, address: e.target.value })}
                placeholder={currentLang === 'ar' ? 'العنوان الكامل للشركة' : 'Full company address'}
              />
            </div>
            <Button type="submit" className="w-full">
              {currentLang === 'ar' ? 'إرسال للمراجعة' : 'Submit for Review'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;