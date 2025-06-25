import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ComplaintsTab = ({ complaints, handleComplaintStatusUpdate, t, currentLang }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'الشكاوى والاقتراحات' : 'Complaints & Suggestions'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complaints?.map(complaint => (
            <div key={complaint.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{complaint.subject}</h3>
                  <p className="text-sm text-gray-600">{complaint.full_name} - {complaint.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  complaint.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {complaint.status}
                </span>
              </div>
              <p className="text-sm mb-3">{complaint.message}</p>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleComplaintStatusUpdate(complaint.id, 'in_progress')}>
                  {currentLang === 'ar' ? 'قيد المعالجة' : 'In Progress'}
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleComplaintStatusUpdate(complaint.id, 'resolved')}>
                  {currentLang === 'ar' ? 'تم الحل' : 'Resolved'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplaintsTab;