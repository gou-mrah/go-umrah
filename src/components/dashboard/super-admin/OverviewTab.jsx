import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const OverviewTab = ({ stats, orders, visaApplications, handleVisaStatusUpdate, t, currentLang }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium text-gray-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {currentLang === 'ar' ? 'الطلبات الأخيرة' : 'Recent Orders'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders?.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">#{order.order_number}</p>
                    <p className="text-sm text-gray-600">{order.total_amount} {currentLang === 'ar' ? 'ريال' : 'SAR'}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {currentLang === 'ar' ? 'طلبات التأشيرة المعلقة' : 'Pending Visa Applications'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {visaApplications?.filter(app => app.status === 'pending').slice(0, 5).map((application) => (
                <div key={application.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{application.full_name}</p>
                    <p className="text-sm text-gray-600">{application.nationality}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleVisaStatusUpdate(application.id, 'approved')}>
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleVisaStatusUpdate(application.id, 'rejected')}>
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OverviewTab;