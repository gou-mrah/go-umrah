import React from 'react';
import GenericPage from './GenericPage';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const FAQPage = ({ t, currentLang }) => {
  const pageData = t.faqPage || {};
  const pageTitle = pageData.title || (currentLang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions');
  const pageDescription = pageData.description || (currentLang === 'ar' ? 'تجد هنا إجابات للأسئلة الأكثر شيوعاً حول خدماتنا.' : 'Find answers to the most common questions about our services here.');
  const faqs = pageData.faqs || [];

  return (
    <GenericPage pageKey="faq" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-gray-200/50">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className={`text-lg text-right font-semibold hover:text-primary transition-colors ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className={`text-gray-600 leading-relaxed pt-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                     {Array.isArray(faq.answer) 
                       ? <ul className="list-disc list-inside space-y-2">{faq.answer.map((item, i) => <li key={i}>{item}</li>)}</ul>
                       : faq.answer
                     }
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: faqs.length * 0.1 + 0.2 }}
            className="mt-12 text-center bg-primary/5 p-6 rounded-lg border border-dashed"
          >
              <HelpCircle className="mx-auto h-10 w-10 text-primary mb-4"/>
              <h3 className={`text-xl font-bold text-primary mb-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                {pageData.stillHaveQuestions?.title || (currentLang === 'ar' ? 'لا تزال لديك أسئلة؟' : 'Still have questions?')}
              </h3>
              <p className={`text-gray-700 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                {pageData.stillHaveQuestions?.text || (currentLang === 'ar' ? 'لا تتردد في التواصل مع فريق الدعم لدينا. نحن هنا لمساعدتك على مدار الساعة.' : 'Don\'t hesitate to contact our support team. We are here to help you around the clock.')}
              </p>
          </motion.div>

        </motion.div>
      </div>
    </GenericPage>
  );
};

export default FAQPage;