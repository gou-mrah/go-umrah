import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = ({ t, currentLang }) => {
  const contactInfo = [
    { icon: Mail, label: t.contact.email, value: t.contact.emailValue, type: 'email' },
    { icon: Phone, label: t.contact.phone, value: t.contact.phoneValue, type: 'phone' },
    { icon: MapPin, label: t.contact.address, value: t.contact.addressValue, type: 'address' }
  ];

  const getContactLink = (contact) => {
    if (contact.type === 'email') {
      return `mailto:${contact.value}`;
    }
    if (contact.type === 'phone') {
      const whatsappNumber = `966${contact.value.substring(1)}`;
      return `https://wa.me/${whatsappNumber}`;
    }
    return null;
  };

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold text-white mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
            {t.contact.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-white"
            >
              <contact.icon className="h-8 w-8 mx-auto mb-4 text-gold" />
              <div className={`text-lg font-semibold mb-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{contact.label}</div>
              {getContactLink(contact) ? (
                <a 
                  href={getContactLink(contact)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/80 hover:text-white hover:underline transition-colors ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}
                >
                  {contact.value}
                </a>
              ) : (
                <div className={`text-white/80 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{contact.value}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;