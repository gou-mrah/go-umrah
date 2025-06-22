import { PaymentMethodDetails as PaddlePaymentMethodDetails } from '@paddle/paddle-node-sdk';
import { CreditCard } from 'lucide-react';

type AllPaddlePaymentTypes = PaddlePaymentMethodDetails['type'];

const PaymentMethodLabels: Partial<Record<AllPaddlePaymentTypes, string>> = {
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
};

interface Props {
  type: AllPaddlePaymentTypes;
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

  // تأكد أن هناك تسمية للنوع الحالي، وإلا اعرض '-'
  return <span className="text-base text-secondary leading-4">{PaymentMethodLabels[type] ?? '-'}</span>;
}
