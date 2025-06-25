import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit3, Trash2 } from 'lucide-react';

const PackageList = ({ packages, type, currentLang }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {packages.map((pkg) => (
      <div key={pkg.id} className="border rounded-lg p-4">
        <h3 className="font-semibold">{pkg.title}</h3>
        <p className="text-sm text-gray-600">{pkg.city}</p>
        <p className="text-lg font-bold text-primary">{pkg.price} {currentLang === 'ar' ? 'ريال' : 'SAR'}</p>
        <p className="text-sm">{pkg.duration_days} {currentLang === 'ar' ? 'أيام' : 'days'}</p>
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="outline">
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="text-red-600">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    ))}
  </div>
);

const PackagesTab = ({ umrahPackages, hajjPackages, currentLang }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            {currentLang === 'ar' ? 'باقات العمرة' : 'Umrah Packages'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PackageList packages={umrahPackages} type="Umrah" currentLang={currentLang} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            {currentLang === 'ar' ? 'باقات الحج' : 'Hajj Packages'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PackageList packages={hajjPackages} type="Hajj" currentLang={currentLang} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PackagesTab;