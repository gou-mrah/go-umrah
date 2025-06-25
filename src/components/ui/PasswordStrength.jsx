import React from 'react';
import { motion } from 'framer-motion';

const PasswordStrength = ({ password, t, currentLang }) => {
  const getStrength = (pass) => {
    let score = 0;
    if (!pass) return score;

    if (pass.length >= 8) score++;
    if (pass.match(/[a-z]/)) score++;
    if (pass.match(/[A-Z]/)) score++;
    if (pass.match(/[0-9]/)) score++;
    if (pass.match(/[^a-zA-Z0-9]/)) score++;
    
    return score;
  };

  const strength = getStrength(password);
  const tPassword = t?.passwordStrength || {};
  const strengthLabels = tPassword.levels || ['Very Weak', 'Weak', 'Okay', 'Good', 'Strong', 'Very Strong'];
  const strengthColors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#16a34a'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: { width: '100%', transition: { duration: 0.5, ease: 'circOut' } },
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className={`text-xs font-semibold text-gray-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            {tPassword.label || 'Password strength:'}
        </span>
        <span className="text-xs font-bold" style={{ color: strengthColors[strength] }}>
          {strengthLabels[strength]}
        </span>
      </div>
      <motion.div 
        className="flex space-x-1 rtl:space-x-reverse"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
            {strength > index && (
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: strengthColors[strength] }}
                variants={barVariants}
              />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PasswordStrength;