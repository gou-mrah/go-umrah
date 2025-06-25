import React from 'react';
import { useParams, Link } from 'react-router-dom';
import GenericPage from './GenericPage';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Home } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const OrderConfirmationPage = ({ t, currentLang }) => {
  const { orderId } = useParams();
  const { user } = useApp();

  const pageTitle = currentLang === 'ar' ? 'تم تأكيد الطلب' : 'Order Confirmed';
  const pageDescription = currentLang === 'ar' 
    ? 'شكراً لثقتك في جو عمرة. لقد تم استلام طلبك بنجاح.'
    : 'Thank you for choosing Go Umrah. Your order has been received successfully.';

  return (
    <GenericPage pageKey="confirmation" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang}>
      <div className="max-w-2xl mx-auto text-center bg-white p-8 rounded-xl shadow-2xl border border-green-200">
        <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-4" />
        <h2 className={`text-3xl font-bold text-gray-800 mb-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? `شكراً لك، ${user ? user.fullName.split(' ')[0] : ''}!` : `Thank you, ${user ? user.fullName.split(' ')[0] : ''}!`}
        </h2>
        <p className={`text-lg text-gray-600 mb-6 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {pageDescription}
        </p>
        <div className={`p-4 bg-gray-100 rounded-md mb-6 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          <p className="text-sm text-gray-500">{currentLang === 'ar' ? 'رقم طلبك هو:' : 'Your order number is:'}</p>
          <p className="text-2xl font-mono font-bold text-primary tracking-wider">{orderId}</p>
        </div>
        <p className={`text-sm text-gray-500 mb-6 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
          {currentLang === 'ar' ? 'سيتم إرسال تفاصيل الطلب إلى بريدك الإلكتروني المسجل. يمكنك متابعة حالة طلبك من لوحة التحكم الخاصة بك.' : 'Order details will be sent to your registered email. You can track your order status from your dashboard.'}
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/dashboard/customer">
            <Button variant="outline">
              <Package className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
              {currentLang === 'ar' ? 'الذهاب إلى طلباتي' : 'Go to My Orders'}
            </Button>
          </Link>
          <Link to="/">
            <Button>
              <Home className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
              {currentLang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </Button>
          </Link>
        </div>
      </div>
    </GenericPage>
  );
};

export default OrderConfirmationPage;