import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

const AddPackageForm = ({ packageData, setPackageData, handleCreatePackage, currentLang }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'إضافة باقة جديدة' : 'Add New Package'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreatePackage} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="packageType">{currentLang === 'ar' ? 'نوع الباقة' : 'Package Type'}</Label>
              <Select value={packageData.type} onValueChange={(value) => setPackageData({ ...packageData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="umrah">{currentLang === 'ar' ? 'عمرة' : 'Umrah'}</SelectItem>
                  <SelectItem value="hajj">{currentLang === 'ar' ? 'حج' : 'Hajj'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="packageTitle">{currentLang === 'ar' ? 'عنوان الباقة' : 'Package Title'}</Label>
              <Input
                id="packageTitle"
                value={packageData.title}
                onChange={(e) => setPackageData({ ...packageData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="packagePrice">{currentLang === 'ar' ? 'السعر' : 'Price'}</Label>
              <Input
                id="packagePrice"
                type="number"
                step="0.01"
                value={packageData.price}
                onChange={(e) => setPackageData({ ...packageData, price: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="packageDuration">{currentLang === 'ar' ? 'المدة (أيام)' : 'Duration (Days)'}</Label>
              <Input
                id="packageDuration"
                type="number"
                value={packageData.duration_days}
                onChange={(e) => setPackageData({ ...packageData, duration_days: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="packageCity">{currentLang === 'ar' ? 'المدينة' : 'City'}</Label>
              <Input
                id="packageCity"
                value={packageData.city}
                onChange={(e) => setPackageData({ ...packageData, city: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="hotelRating">{currentLang === 'ar' ? 'تصنيف الفندق' : 'Hotel Rating'}</Label>
              <Select value={packageData.hotel_rating} onValueChange={(value) => setPackageData({ ...packageData, hotel_rating: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={currentLang === 'ar' ? 'اختر التصنيف' : 'Select Rating'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 {currentLang === 'ar' ? 'نجوم' : 'Stars'}</SelectItem>
                  <SelectItem value="4">4 {currentLang === 'ar' ? 'نجوم' : 'Stars'}</SelectItem>
                  <SelectItem value="5">5 {currentLang === 'ar' ? 'نجوم' : 'Stars'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="packageDescription">{currentLang === 'ar' ? 'الوصف' : 'Description'}</Label>
            <Textarea
              id="packageDescription"
              value={packageData.description}
              onChange={(e) => setPackageData({ ...packageData, description: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="packageIncludes">{currentLang === 'ar' ? 'ما يشمله (JSON)' : 'Includes (JSON)'}</Label>
            <Textarea
              id="packageIncludes"
              value={packageData.includes}
              onChange={(e) => setPackageData({ ...packageData, includes: e.target.value })}
              placeholder='["Hotel", "Transport", "Meals"]'
            />
          </div>
          <Button type="submit" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            {currentLang === 'ar' ? 'إضافة الباقة' : 'Add Package'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddPackageForm;