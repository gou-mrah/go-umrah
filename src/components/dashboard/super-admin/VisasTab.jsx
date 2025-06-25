import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const VisasTab = ({ visaApplications, handleVisaStatusUpdate, t, currentLang }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'طلبات التأشيرة' : 'Visa Applications'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">{currentLang === 'ar' ? 'الاسم' : 'Name'}</th>
                <th scope="col" className="px-6 py-3">{currentLang === 'ar' ? 'الجنسية' : 'Nationality'}</th>
                <th scope="col" className="px-6 py-3">{currentLang === 'ar' ? 'تاريخ الوصول' : 'Arrival Date'}</th>
                <th scope="col" className="px-6 py-3">{currentLang === 'ar' ? 'الحالة' : 'Status'}</th>
                <th scope="col" className="px-6 py-3 text-center">{currentLang === 'ar' ? 'إجراء' : 'Action'}</th>
              </tr>
            </thead>
            <tbody>
              {visaApplications?.map(application => (
                <tr key={application.id} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {application.full_name}
                  </td>
                  <td className="px-6 py-4">{application.nationality}</td>
                  <td className="px-6 py-4">{new Date(application.arrival_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      application.status === 'approved' ? 'bg-green-100 text-green-800' :
                      application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2 justify-center">
                    <Button size="sm" onClick={() => handleVisaStatusUpdate(application.id, 'approved')}>
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleVisaStatusUpdate(application.id, 'rejected')}>
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisasTab;