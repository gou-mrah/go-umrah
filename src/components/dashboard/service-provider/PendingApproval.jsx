import React from 'react';

const PendingApproval = ({ currentLang }) => {
  return (
    <div className="mt-8 text-center p-6 bg-yellow-100 text-yellow-800 rounded-lg">
      {currentLang === 'ar' ? 'طلبك قيد المراجعة. سيتم إعلامك قريباً.' : 'Your application is under review. You will be notified soon.'}
    </div>
  );
};

export default PendingApproval;