import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, Globe, Award, Clock, CheckCircle, Star, Zap, Target, Eye, Lightbulb } from 'lucide-react';

const AboutUsPage = ({ t, currentLang }) => {
  const pageTitle = currentLang === 'ar' ? 'من نحن' : 'About Us';
  const pageDescription = currentLang === 'ar' 
    ? 'تعرف على منصة جو عمرة - رؤيتنا، رسالتنا، وكيف نخدم ملايين المسلمين حول العالم في رحلتهم الروحانية المقدسة.'
    : 'Learn about Go Umrah platform - our vision, mission, and how we serve millions of Muslims worldwide in their sacred spiritual journey.';

  const aboutContent = {
    ar: {
      hero: {
        title: "من نحن",
        subtitle: "منصة جو عمرة - بوابتكم الروحانية نحو الكعبة المشرفة",
        description: "نحن منصة رقمية متطورة تهدف إلى تسهيل وتنظيم رحلات الحج والعمرة للمسلمين من جميع أنحاء العالم. نجمع بين التكنولوجيا الحديثة والخبرة العميقة في خدمة ضيوف الرحمن."
      },
      vision: {
        title: "رؤيتنا",
        description: "أن نكون المنصة الرائدة عالمياً في تنظيم رحلات الحج والعمرة، ونساهم في تحقيق حلم كل مسلم بأداء هذه الفريضة المقدسة بأفضل الطرق وأيسرها."
      },
      mission: {
        title: "رسالتنا",
        description: "نسعى لتقديم خدمات متكاملة وموثوقة تشمل جميع جوانب رحلة الحج والعمرة، من التخطيط والحجز إلى الإرشاد والمتابعة، مع ضمان أعلى معايير الجودة والأمان."
      },
      values: {
        title: "قيمنا الأساسية",
        items: [
          { icon: Heart, title: "الإخلاص", description: "نعمل بإخلاص وتفانٍ لخدمة ضيوف الرحمن" },
          { icon: Shield, title: "الثقة والأمان", description: "نضمن أعلى معايير الأمان والموثوقية في جميع خدماتنا" },
          { icon: Users, title: "التميز في الخدمة", description: "نسعى دائماً لتقديم تجربة استثنائية لعملائنا" },
          { icon: Globe, title: "الشمولية", description: "نخدم المسلمين من جميع أنحاء العالم بلا استثناء" }
        ]
      },
      services: {
        title: "خدماتنا الشاملة",
        subtitle: "نقدم مجموعة متكاملة من الخدمات لضمان رحلة مباركة ومريحة",
        items: [
          { icon: CheckCircle, title: "باقات العمرة والحج", description: "باقات متنوعة تناسب جميع الميزانيات والاحتياجات" },
          { icon: Star, title: "حجز الطيران والفنادق", description: "أفضل الأسعار والخيارات للطيران والإقامة" },
          { icon: Zap, title: "النقل والمواصلات", description: "خدمات نقل آمنة ومريحة بين المشاعر المقدسة" },
          { icon: Target, title: "التأشيرات والوثائق", description: "مساعدة كاملة في إجراءات التأشيرات والوثائق المطلوبة" },
          { icon: Eye, title: "الإرشاد الديني", description: "مرشدون متخصصون لمساعدتكم في أداء المناسك" },
          { icon: Lightbulb, title: "الدعم على مدار الساعة", description: "فريق دعم متاح 24/7 لمساعدتكم في أي وقت" }
        ]
      },
      technology: {
        title: "التكنولوجيا المتقدمة",
        description: "نستخدم أحدث التقنيات لضمان تجربة سلسة وآمنة:",
        features: [
          "منصة حجز إلكترونية متطورة",
          "تطبيق جوال سهل الاستخدام",
          "نظام دفع آمن ومتعدد الخيارات",
          "تتبع الرحلات والحجوزات في الوقت الفعلي",
          "دعم متعدد اللغات",
          "ذكاء اصطناعي لتحسين التوصيات"
        ]
      },
      stats: {
        title: "إنجازاتنا بالأرقام",
        items: [
          { number: "500,000+", label: "حاج ومعتمر سعيد" },
          { number: "50+", label: "دولة نخدمها" },
          { number: "1000+", label: "شريك موثوق" },
          { number: "99.8%", label: "معدل رضا العملاء" }
        ]
      },
      team: {
        title: "فريقنا المتخصص",
        description: "يضم فريقنا خبراء في السياحة الدينية، التكنولوجيا، وخدمة العملاء، جميعهم ملتزمون بتقديم أفضل خدمة ممكنة لضيوف الرحمن."
      },
      contact: {
        title: "تواصل معنا",
        description: "نحن هنا لخدمتكم ومساعدتكم في تحقيق حلم الحج والعمرة. تواصلوا معنا في أي وقت."
      }
    },
    en: {
      hero: {
        title: "About Us",
        subtitle: "Go Umrah Platform - Your Spiritual Gateway to the Holy Kaaba",
        description: "We are an advanced digital platform aimed at facilitating and organizing Hajj and Umrah journeys for Muslims from around the world. We combine modern technology with deep expertise in serving the guests of Allah."
      },
      vision: {
        title: "Our Vision",
        description: "To be the world's leading platform in organizing Hajj and Umrah journeys, contributing to fulfilling every Muslim's dream of performing this sacred obligation in the best and easiest ways."
      },
      mission: {
        title: "Our Mission",
        description: "We strive to provide comprehensive and reliable services covering all aspects of Hajj and Umrah journeys, from planning and booking to guidance and follow-up, ensuring the highest standards of quality and safety."
      },
      values: {
        title: "Our Core Values",
        items: [
          { icon: Heart, title: "Sincerity", description: "We work with sincerity and dedication to serve Allah's guests" },
          { icon: Shield, title: "Trust & Security", description: "We ensure the highest standards of safety and reliability in all our services" },
          { icon: Users, title: "Service Excellence", description: "We always strive to provide an exceptional experience for our customers" },
          { icon: Globe, title: "Inclusivity", description: "We serve Muslims from all over the world without exception" }
        ]
      },
      services: {
        title: "Our Comprehensive Services",
        subtitle: "We offer an integrated range of services to ensure a blessed and comfortable journey",
        items: [
          { icon: CheckCircle, title: "Umrah & Hajj Packages", description: "Diverse packages suitable for all budgets and needs" },
          { icon: Star, title: "Flight & Hotel Booking", description: "Best prices and options for flights and accommodation" },
          { icon: Zap, title: "Transport & Transportation", description: "Safe and comfortable transport services between holy sites" },
          { icon: Target, title: "Visas & Documents", description: "Complete assistance with visa procedures and required documents" },
          { icon: Eye, title: "Religious Guidance", description: "Specialized guides to help you perform the rituals" },
          { icon: Lightbulb, title: "24/7 Support", description: "Support team available around the clock to help you anytime" }
        ]
      },
      technology: {
        title: "Advanced Technology",
        description: "We use the latest technologies to ensure a smooth and secure experience:",
        features: [
          "Advanced electronic booking platform",
          "User-friendly mobile application",
          "Secure multi-option payment system",
          "Real-time trip and booking tracking",
          "Multi-language support",
          "AI for improved recommendations"
        ]
      },
      stats: {
        title: "Our Achievements in Numbers",
        items: [
          { number: "500,000+", label: "Happy Pilgrims" },
          { number: "50+", label: "Countries We Serve" },
          { number: "1000+", label: "Trusted Partners" },
          { number: "99.8%", label: "Customer Satisfaction Rate" }
        ]
      },
      team: {
        title: "Our Specialized Team",
        description: "Our team includes experts in religious tourism, technology, and customer service, all committed to providing the best possible service to Allah's guests."
      },
      contact: {
        title: "Contact Us",
        description: "We are here to serve you and help you achieve your dream of Hajj and Umrah. Contact us anytime."
      }
    }
  };

  const content = aboutContent[currentLang];

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} - ${t.siteName}`}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      
      <div className="relative">
        <div className="absolute inset-0">
          <img  
            alt={currentLang === 'ar' ? 'منظر جوي للكعبة المشرفة والمسجد الحرام' : 'Aerial view of the Holy Kaaba and Grand Mosque'} 
            className="w-full h-full object-cover"
           src="https://images.unsplash.com/photo-1618672445860-e98bc47fb30e" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className={`text-5xl md:text-6xl font-bold text-white mb-6 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {content.hero.title}
            </h1>
            <p className={`text-2xl text-gold mb-8 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {content.hero.subtitle}
            </p>
            <p className={`text-lg text-white/90 max-w-4xl mx-auto leading-relaxed ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {content.hero.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl"
            >
              <Eye className="h-12 w-12 text-primary mb-4" />
              <h2 className={`text-3xl font-bold text-primary mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                {content.vision.title}
              </h2>
              <p className={`text-gray-700 leading-relaxed ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                {content.vision.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl"
            >
              <Target className="h-12 w-12 text-primary mb-4" />
              <h2 className={`text-3xl font-bold text-primary mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                {content.mission.title}
              </h2>
              <p className={`text-gray-700 leading-relaxed ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                {content.mission.description}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl mb-20"
          >
            <h2 className={`text-4xl font-bold text-primary text-center mb-12 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {content.values.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.values.items.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className={`text-xl font-bold text-gray-800 mb-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                      {value.title}
                    </h3>
                    <p className={`text-gray-600 text-sm ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl mb-20"
          >
            <h2 className={`text-4xl font-bold text-primary text-center mb-4 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {content.services.title}
            </h2>
            <p className={`text-gray-600 text-center mb-12 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {content.services.subtitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.services.items.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <IconComponent className="h-10 w-10 text-primary mb-4" />
                    <h3 className={`text-lg font-bold text-gray-800 mb-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                      {service.title}
                    </h3>
                    <p className={`text-gray-600 text-sm ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                      {service.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl"
            >
              <h2 className={`text-3xl font-bold text-primary mb-6 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                {content.technology.title}
              </h2>
              <p className={`text-gray-700 mb-6 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                {content.technology.description}
              </p>
              <ul className="space-y-3">
                {content.technology.features.map((feature, index) => (
                  <li key={index} className={`flex items-center text-gray-700 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl"
            >
              <h2 className={`text-3xl font-bold text-primary mb-8 text-center ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                {content.stats.title}
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {content.stats.items.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`text-3xl font-bold text-primary mb-2 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                      {stat.number}
                    </div>
                    <div className={`text-gray-600 text-sm ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl mb-20"
          >
            <h2 className={`text-3xl font-bold text-primary text-center mb-6 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {content.team.title}
            </h2>
            <p className={`text-gray-700 text-center leading-relaxed ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {content.team.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-primary/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center"
          >
            <h2 className={`text-3xl font-bold text-white mb-6 ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {content.contact.title}
            </h2>
            <p className={`text-white/90 text-lg leading-relaxed ${currentLang === 'ar' ? 'font-arabic' : 'font-english'}`}>
              {content.contact.description}
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;