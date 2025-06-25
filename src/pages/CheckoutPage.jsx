import React from 'react';
import { useNavigate } from 'react-router-dom';
import GenericPage from './GenericPage';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, ShoppingCart, CreditCard, Package, Moon, FileText, Shirt } from 'lucide-react';

const itemIcons = {
  umrah: Moon,
  hajj: Package,
  visa: FileText,
  store: Shirt,
  default: Package
};

const CheckoutPage = ({ t, currentLang }) => {
  const { cart, removeFromCart, clearCart, user } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const tCheckout = t.checkoutPage || {};

  const pageTitle = tCheckout.title || t.nav.checkout;
  const pageDescription = tCheckout.description || (currentLang === 'ar' 
    ? 'مراجعة طلبك وإتمام عملية الدفع. تأكد من جميع الخدمات والمنتجات في سلتك قبل المتابعة.'
    : 'Review your order and complete the payment process. Please check all services and products in your cart before proceeding.');

  const total = cart.reduce((acc, item) => {
    const priceString = item.price.replace(/[^0-9.-]+/g,"");
    return acc + (parseFloat(priceString) || 0);
  }, 0);

  const handleConfirmOrder = () => {
    if (!user) {
      toast({
        title: tCheckout.pleaseLogin,
        description: tCheckout.loginToProceed,
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      toast({
        title: tCheckout.cartEmpty,
        description: tCheckout.addItemsToCart,
        variant: 'destructive',
      });
      return;
    }

    const orderId = `GO-${Date.now()}`;
    clearCart();
    navigate(`/confirmation/${orderId}`);
  };

  return (
    <GenericPage pageKey="checkout" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang}>
      <div className="max-w-4xl mx-auto">
        {cart.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className={`mt-4 text-2xl font-semibold ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tCheckout.cartEmptyTitle}</h3>
            <p className={`mt-2 text-gray-500 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tCheckout.cartEmptyDescription}</p>
            <Button className="mt-6" onClick={() => navigate('/')}>{tCheckout.backToHome}</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => {
                const Icon = itemIcons[item.type] || itemIcons.default;
                return (
                  <div key={item.cartId} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <Icon className="h-8 w-8 text-primary mr-4 rtl:ml-4 rtl:mr-0" />
                      <div>
                        <h4 className={`font-semibold ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{item.name}</h4>
                        <p className={`text-sm text-gray-500 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{item.price}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.cartId)}>
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg shadow-lg sticky top-24">
                <h3 className={`text-xl font-bold mb-4 border-b pb-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tCheckout.orderSummary}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{`${tCheckout.total} (${cart.length} ${tCheckout.items})`}</span>
                    <span className={`font-semibold ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{total.toFixed(2)} {currentLang === 'ar' ? 'ريال' : 'SAR'}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tCheckout.taxes}</span>
                    <span className={`${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{tCheckout.calculatedAtCheckout}</span>
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={handleConfirmOrder}>
                  <CreditCard className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
                  {tCheckout.confirmAndPay}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </GenericPage>
  );
};

export default CheckoutPage;