import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GenericPage from './GenericPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import PasswordStrength from '@/components/ui/PasswordStrength';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Chrome, Eye, EyeOff, Phone, MessageSquare, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

const RegisterPage = ({ t, handleFeatureClick, currentLang }) => {
  const tPage = t.registerPage || {};
  const pageTitle = currentLang === 'ar' ? 'إنشاء حساب جديد' : 'Create a New Account';
  const pageDescription = currentLang === 'ar' ? 'انضم إلى منصتنا للاستفادة من أفضل خدمات الحج والعمرة.' : 'Join our platform to get the best Hajj and Umrah services.';
  
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('customer');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    agreeToTerms: false
  });
  const { toast } = useToast();
  const { register, signInWithSocial } = useAuth();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialRegister = async (platform) => {
    try {
      setLoading(true);
      await signInWithSocial(platform.toLowerCase());
    } catch (error) {
      toast({
        title: tPage.registerFailedTitle || 'Registration Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneRegister = () => {
    toast({
      title: tPage.phoneRegisterTitle || 'WhatsApp Registration',
      description: tPage.phoneRegisterDescription || 'This feature is coming soon.',
    });
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast({
        title: currentLang === 'ar' ? 'خطأ في البيانات' : 'Invalid Data',
        description: currentLang === 'ar' ? 'يرجى إدخال الاسم الكامل.' : 'Please enter your full name.',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: currentLang === 'ar' ? 'خطأ في البيانات' : 'Invalid Data',
        description: currentLang === 'ar' ? 'يرجى إدخال البريد الإلكتروني.' : 'Please enter your email address.',
        variant: 'destructive',
      });
      return false;
    }

    if (password.length < 6) {
      toast({
        title: currentLang === 'ar' ? 'كلمة مرور ضعيفة' : 'Weak Password',
        description: currentLang === 'ar' ? 'يجب أن تكون كلمة المرور 6 أحرف على الأقل.' : 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast({
        title: tPage.passwordErrorTitle || 'Passwords do not match',
        description: tPage.passwordErrorDescription || 'Please ensure both passwords are the same.',
        variant: 'destructive',
      });
      return false;
    }
    
    if (!formData.agreeToTerms) {
      toast({
        title: tPage.termsErrorTitle || 'Terms not accepted',
        description: tPage.termsErrorDescription || 'You must agree to the terms and conditions.',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register(formData.fullName, formData.email, password, role);
      toast({
        title: currentLang === 'ar' ? 'تم إنشاء الحساب بنجاح' : 'Account Created Successfully',
        description: currentLang === 'ar' ? 'مرحباً بك في منصة جو عمرة!' : 'Welcome to Go Umrah platform!',
      });
    } catch (error) {
      toast({
        title: tPage.registerFailedTitle || 'Registration Failed',
        description: error.message || tPage.registerFailedDescription,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <GenericPage pageKey="register" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang}>
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg space-y-8 bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-200/50">
          <div>
            <h2 className={`text-center text-3xl font-extrabold text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {tPage.title || pageTitle}
            </h2>
            <p className={`mt-2 text-center text-sm text-gray-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {tPage.subtitle || (currentLang === 'ar' ? 'هل لديك حساب بالفعل؟' : 'Already have an account?')}{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary/80 underline underline-offset-4 transition-colors">
                {tPage.signInLink || (currentLang === 'ar' ? 'تسجيل الدخول' : 'Sign in')}
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            <h3 className={`text-center text-lg font-semibold text-gray-700 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {tPage.quickRegister || (currentLang === 'ar' ? 'تسجيل سريع' : 'Quick Register')}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={() => handleSocialRegister('Google')} 
                className="w-full"
                disabled={loading}
              >
                <Chrome className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                Google
              </Button>
              <Button 
                variant="outline" 
                onClick={handlePhoneRegister} 
                className="w-full"
                disabled={loading}
              >
                <MessageSquare className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                {currentLang === 'ar' ? 'واتساب' : 'WhatsApp'}
              </Button>
            </div>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {tPage.registerWithDetails || (currentLang === 'ar' ? 'أو سجل ببياناتك' : 'Or register with your details')}
              </span>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            
             <div className="space-y-2">
              <Label htmlFor="user-role">
                {tPage.registerAsLabel || (currentLang === 'ar' ? 'التسجيل كـ' : 'Register as')}
              </Label>
              <Select value={role} onValueChange={setRole} disabled={loading}>
                <SelectTrigger id="user-role">
                  <SelectValue placeholder={tPage.registerAsLabel || (currentLang === 'ar' ? 'اختر نوع الحساب' : 'Select account type')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">
                    {tPage.roleCustomer || (currentLang === 'ar' ? 'ضيف الرحمن (عميل)' : 'Guest of Allah (Customer)')}
                  </SelectItem>
                  <SelectItem value="service_provider">
                    {tPage.roleServiceProvider || (currentLang === 'ar' ? 'مقدم خدمة' : 'Service Provider')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full-name">
                  {tPage.fullNameLabel || (currentLang === 'ar' ? 'الاسم الكامل' : 'Full Name')}
                </Label>
                <Input 
                  id="full-name" 
                  name="fullName" 
                  type="text" 
                  required 
                  placeholder={tPage.fullNamePlaceholder || (currentLang === 'ar' ? 'مثال: عبد الله محمد' : 'e.g., John Doe')} 
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-address">
                  {tPage.emailLabel || (currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email Address')}
                </Label>
                <Input 
                  id="email-address" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder={tPage.emailPlaceholder || 'you@example.com'} 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone-number">
                {tPage.phoneLabel || (currentLang === 'ar' ? 'رقم الجوال' : 'Phone Number')}
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  id="phone-number" 
                  name="phone" 
                  type="tel" 
                  placeholder={tPage.phonePlaceholder || (currentLang === 'ar' ? 'مثال: 966551234567+' : 'e.g., +1 123 456 7890')} 
                  className="pl-10 rtl:pr-10 rtl:pl-3"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                {tPage.passwordLabel || (currentLang === 'ar' ? 'كلمة المرور' : 'Password')}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder={tPage.passwordPlaceholder || (currentLang === 'ar' ? 'أدخل كلمة مرور قوية' : 'Enter a strong password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute inset-y-0 right-0 rtl:left-0 rtl:right-auto pr-3 rtl:pl-3 rtl:pr-0 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <PasswordStrength password={password} t={t} currentLang={currentLang} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">
                {tPage.confirmPasswordLabel || (currentLang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password')}
              </Label>
               <div className="relative">
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder={tPage.passwordPlaceholder || (currentLang === 'ar' ? 'أدخل كلمة المرور مرة أخرى' : 'Enter password again')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  className="absolute inset-y-0 right-0 rtl:left-0 rtl:right-auto pr-3 rtl:pl-3 rtl:pr-0 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-sm">
                  {tPage.passwordMismatch || (currentLang === 'ar' ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.')}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="terms" 
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                disabled={loading}
              />
              <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                {tPage.agreeToTerms || (currentLang === 'ar' ? 'أوافق على' : 'I agree to the')}{' '}
                <Link to="/terms-and-conditions" className="font-medium text-primary hover:text-primary/80 underline underline-offset-4">
                  {tPage.termsAndConditionsLink || (currentLang === 'ar' ? 'الشروط والأحكام' : 'Terms and Conditions')}
                </Link>
              </Label>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 animate-spin" />}
                {loading 
                  ? (currentLang === 'ar' ? 'جاري الإنشاء...' : 'Creating account...') 
                  : (tPage.createAccountButton || (currentLang === 'ar' ? 'إنشاء حساب' : 'Create Account'))
                }
              </Button>
            </div>
          </form>
        </div>
      </div>
    </GenericPage>
  );
};

export default RegisterPage;