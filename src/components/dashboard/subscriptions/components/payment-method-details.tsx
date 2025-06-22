import { PaymentMethodDetails as PaddlePaymentMethodDetails } from '@paddle/paddle-node-sdk';
import { CreditCard } from 'lucide-react';

type AllPaddlePaymentTypes = PaddlePaymentMethodDetails['type'];

type AllowedPaymentMethodType = Extract<
  AllPaddlePaymentTypes,
  | 'card'
  | 'alipay'
  | 'wire_transfer'
  | 'apple_pay'
  | 'google_pay'
  | 'paypal'
  | 'ideal'
  | 'bancontact'
  | 'offline'
  | 'unknown'
>;

const PaymentMethodLabels: Record<AllowedPaymentMethodType, string> = {
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
  type: AllowedPaymentMethodType;
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

  return <span className="text-base text-secondary leading-4">{PaymentMethodLabels[type]}</span>;
}
