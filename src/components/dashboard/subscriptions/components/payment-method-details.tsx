import { PaymentMethodDetails as PaddlePaymentMethodDetails } from '@paddle/paddle-node-sdk';
import { CreditCard } from 'lucide-react';

const PaymentMethodLabels: Partial<Record<PaddlePaymentMethodDetails['type'], string>> = {
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

  const label = PaymentMethodLabels[type] ?? 'Unknown';

  return <span className="text-base text-secondary leading-4">{label}</span>;
}
