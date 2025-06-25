import React from 'react';
import GenericPage from './GenericPage';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, Send } from 'lucide-react';

const ComplaintsPage = ({ t, currentLang }) => {
  const pageData = t.complaintsPage || {};
  const pageTitle = pageData.title || 'Complaints and Suggestions';
  const pageDescription = pageData.description || '';
  const formText = pageData.form || {};
  const processText = pageData.process || {};
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: currentLang === 'ar' ? 'تم الإرسال بنجاح' : 'Submitted Successfully',
      description: currentLang === 'ar' ? 'شكراً لملاحظاتك. سنقوم بمراجعتها قريباً.' : 'Thank you for your feedback. We will review it shortly.',
    });
    e.target.reset();
  };

  return (
    <GenericPage pageKey="complaints" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
        <motion.div
            initial={{ opacity: 0, x: currentLang === 'ar' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-lg border border-gray-200/60"
        >
          <h2 className={`text-3xl font-bold text-primary mb-6 text-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{formText.title}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className={`font-semibold ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{formText.name}</Label>
                <Input id="name" type="text" required className="mt-2"/>
              </div>
               <div>
                <Label htmlFor="phone" className={`font-semibold ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{formText.phone}</Label>
                <Input id="phone" type="tel" required className="mt-2"/>
              </div>
            </div>
            <div>
                <Label htmlFor="email" className={`font-semibold ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{formText.email}</Label>
                <Input id="email" type="email" required className="mt-2"/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="bookingRef" className={`font-semibold ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{formText.bookingRef}</Label>
                    <Input id="bookingRef" type="text" className="mt-2"/>
                </div>
                <div>
                    <Label htmlFor="complaintType" className={`font-semibold ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{formText.complaintType}</Label>
                    <Select>
                        <SelectTrigger className="mt-2"><SelectValue placeholder={currentLang === 'ar' ? 'اختر نوع الطلب' : 'Select request type'} /></SelectTrigger>
                        <SelectContent>
                            {(formText.complaintTypeOptions || []).map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
              <Label htmlFor="subject" className={`font-semibold ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{formText.subject}</Label>
              <Input id="subject" type="text" required className="mt-2"/>
            </div>
            <div>
              <Label htmlFor="message" className={`font-semibold ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{formText.message}</Label>
              <Textarea id="message" rows={5} required className="mt-2"/>
            </div>
            <Button type="submit" className="w-full" size="lg">
              <Send className="mr-2 rtl:ml-2 h-4 w-4"/>
              {formText.submit}
            </Button>
          </form>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, x: currentLang === 'ar' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 bg-primary/5 p-8 rounded-2xl border border-primary/20"
        >
            <h2 className={`text-2xl font-bold text-primary mb-6 text-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{processText.title}</h2>
            <p className={`text-gray-600 mb-6 text-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{processText.text}</p>
            <ul className="space-y-4">
                {(processText.points || []).map((point, i) => (
                    <li key={i} className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0 mt-1" />
                        <span className={`text-gray-700 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>{point}</span>
                    </li>
                ))}
            </ul>
        </motion.div>
      </div>
    </GenericPage>
  );
};

export default ComplaintsPage;