import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckSquare, Clock, FileText, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useOrders, useVisaApplications, useComplaints } from '@/hooks/useSupabase';

const CustomerDashboard = ({ t, currentLang }) => {
  const { user } = useAuth();
  const { data: orders } = useOrders(user?.id);
  const { data: visaApplications } = useVisaApplications(user?.id);
  const { data: complaints } = useComplaints(user?.id);

  const stats = [
    { title: currentLang === 'ar' ? 'الطلبات المكتملة' : 'Completed Orders', value: orders?.filter(o => o.status === 'completed').length || 0, icon: CheckSquare },
    { title: currentLang === 'ar' ? 'الطلبات المعلقة' : 'Pending Orders', value: orders?.filter(o => o.status === 'pending').length || 0, icon: Clock },
    { title: currentLang === 'ar' ? 'طلبات التأشيرة' : 'Visa Applications', value: visaApplications?.length || 0, icon: FileText },
    { title: currentLang === 'ar' ? 'الشكاوى' : 'Complaints', value: complaints?.length || 0, icon: MessageSquare },
  ];

  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              {currentLang === 'ar' ? 'طلباتي الأخيرة' : 'My Recent Orders'}
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
              {currentLang === 'ar' ? 'طلبات التأشيرة' : 'Visa Applications'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {visaApplications?.slice(0, 5).map((application) => (
                <div key={application.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{application.nationality}</p>
                    <p className="text-sm text-gray-600">{new Date(application.arrival_date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    application.status === 'approved' ? 'bg-green-100 text-green-800' :
                    application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;