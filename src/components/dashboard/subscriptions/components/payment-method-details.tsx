import { PaymentMethodDetails as PaddlePaymentMethodDetails } from '@paddle/paddle-node-sdk';
import { CreditCard } from 'lucide-react';

// تعريف التسميات لجميع أنواع الدفع التي قد تظهر في Paddle
const PaymentMethodLabels: Record<PaddlePaymentMethodDetails['type'], string> = {
  card: 'Card',
  alipay: 'Alipay',
  wire_transfer: 'Wire Transfer',
  apple_pay: 'Apple Pay',
  google_pay: 'Google Pay',
  paypal: 'PayPal',
  ideal: 'iDEAL',
  bancontact: 'Bancontact',
  offline: 'Offline',
  unknown: 'Unknown',
  korea_local: 'Korea Local', // أضفت هذا النوع حسب الخطأ اللي ظهر
  // إذا هناك أي نوع آخر في PaddlePaymentMethodDetails['type'] أضفه هنا بنفس الطريقة
};

interface Props {
  type: PaddlePaymentMethodDetails['type'];
  card?: PaddlePaymentMethodDetails['card'];
}

export function PaymentMethodDetails({ type, card }: Props) {
  if (type === 'card') {
    return (
      <>
        <CreditCard size={18} />
        <span className="text-base text-secondary leading-4">**** {card?.last4}</span>
      </>
    );
  }

  // لو نوع الدفع غير معروف أو غير موجود في الـ labels
  const label = PaymentMethodLabels[type] ?? 'Unknown';

  return <span className="text-base text-secondary leading-4">{label}</span>;
}
