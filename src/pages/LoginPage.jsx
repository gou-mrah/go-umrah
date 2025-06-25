import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GenericPage from './GenericPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Chrome, Eye, EyeOff, MessageSquare, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

const LoginPage = ({ t, handleFeatureClick, currentLang }) => {
  const tPage = t.loginPage || {};
  const pageTitle = currentLang === 'ar' ? 'تسجيل الدخول' : 'Login';
  const pageDescription = currentLang === 'ar' ? 'قم بتسجيل الدخول إلى حسابك للوصول إلى خدماتنا.' : 'Log in to your account to access our services.';

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const { toast } = useToast();
  const { login, signInWithSocial } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialLogin = async (platform) => {
    try {
      setLoading(true);
      await signInWithSocial(platform.toLowerCase());
    } catch (error) {
      toast({
        title: tPage.loginFailedTitle || 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = () => {
    toast({
      title: tPage.phoneLoginTitle || 'WhatsApp Login',
      description: tPage.phoneLoginDescription || 'This feature is coming soon.',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast({
        title: currentLang === 'ar' ? 'خطأ في البيانات' : 'Invalid Data',
        description: currentLang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة.' : 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await login(loginData.email, loginData.password);
      toast({
        title: currentLang === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Login Successful',
        description: currentLang === 'ar' ? 'مرحباً بك في منصة جو عمرة!' : 'Welcome to Go Umrah platform!',
      });
    } catch (error) {
      toast({
        title: tPage.loginFailedTitle || 'Login Failed',
        description: error.message || tPage.loginFailedDescription,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <GenericPage pageKey="login" pageTitle={pageTitle} pageDescription={pageDescription} t={t} currentLang={currentLang}>
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8 bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-200/50">
          <div>
            <h2 className={`text-center text-3xl font-extrabold text-primary ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {tPage.title || pageTitle}
            </h2>
            <p className={`mt-2 text-center text-sm text-gray-600 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {tPage.subtitle || (currentLang === 'ar' ? 'أو' : 'Or')}{' '}
              <Link to="/register" className="font-medium text-primary hover:text-primary/80 underline underline-offset-4 transition-colors">
                {tPage.createAccountLink || (currentLang === 'ar' ? 'أنشئ حساباً جديداً' : 'create a new account')}
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            <h3 className={`text-center text-lg font-semibold text-gray-700 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {tPage.quickLogin || (currentLang === 'ar' ? 'دخول سريع' : 'Quick Login')}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={() => handleSocialLogin('Google')} 
                className="w-full"
                disabled={loading}
              >
                <Chrome className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                Google
              </Button>
              <Button 
                variant="outline" 
                onClick={handlePhoneLogin} 
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
                {tPage.continueWithEmail || (currentLang === 'ar' ? 'أو المتابعة بالبريد الإلكتروني' : 'Or continue with email')}
              </span>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email-address" className="sr-only">
                  {tPage.emailPlaceholder || (currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email address')}
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="rounded-t-md"
                  placeholder={tPage.emailPlaceholder || (currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email address')}
                  value={loginData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  {tPage.passwordPlaceholder || (currentLang === 'ar' ? 'كلمة المرور' : 'Password')}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="rounded-b-md"
                    placeholder={tPage.passwordPlaceholder || (currentLang === 'ar' ? 'كلمة المرور' : 'Password')}
                    value={loginData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
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
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox 
                  id="remember-me" 
                  name="remember-me" 
                  checked={loginData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
                  disabled={loading}
                />
                <Label htmlFor="remember-me" className="ml-2 rtl:mr-2 rtl:ml-0 block text-sm text-gray-900 cursor-pointer">
                  {tPage.rememberMe || (currentLang === 'ar' ? 'تذكرني' : 'Remember me')}
                </Label>
              </div>

              <div className="text-sm">
                <button 
                  type="button" 
                  onClick={() => handleFeatureClick(tPage.forgotPassword || (currentLang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'))} 
                  className="font-medium text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                  disabled={loading}
                >
                  {tPage.forgotPassword || (currentLang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?')}
                </button>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4 animate-spin" />}
                {loading 
                  ? (currentLang === 'ar' ? 'جاري الدخول...' : 'Signing in...') 
                  : (tPage.signInButton || (currentLang === 'ar' ? 'تسجيل الدخول' : 'Sign in'))
                }
              </Button>
            </div>
          </form>
        </div>
      </div>
    </GenericPage>
  );
};

export default LoginPage;