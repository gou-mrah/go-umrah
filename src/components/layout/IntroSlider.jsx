import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, SkipForward, CheckCircle } from 'lucide-react';

const introSlidesData = (t) => [
  {
    id: 1,
    title: t.siteName,
    subtitle: t.tagline,
    text: t.heroDescriptionShort,
    imageClass: "bg-[url('https://images.unsplash.com/photo-1583171048400-0078339afe3c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&h=800&fit=crop&auto=format')]",
    soundText: currentLang === 'ar' ? "لبيك اللهم لبيك" : "Labbayka Allahumma Labbayk"
  },
  {
    id: 2,
    title: t.services.umrah.title,
    subtitle: t.services.hajj.title,
    text: currentLang === 'ar' ? "رحلتكم الإيمانية تبدأ هنا. اكتشف باقات العمرة والحج المتنوعة والمصممة خصيصاً لراحتكم وخدمتكم." : "Your spiritual journey starts here. Discover diverse Umrah and Hajj packages designed for your comfort and service.",
    imageClass: "bg-[url('https://images.unsplash.com/photo-1604067181575-73d9415069a5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&h=800&fit=crop&auto=format')]",
    soundText: currentLang === 'ar' ? "لبيك لا شريك لك لبيك" : "Labbayka La Sharika Laka Labbayk"
  },
  {
    id: 3,
    title: t.features.title,
    subtitle: currentLang === 'ar' ? "سهولة، موثوقية، ودعم متكامل." : "Ease, Reliability, and Integrated Support.",
    text: currentLang === 'ar' ? "نلتزم بتقديم تجربة حجز سلسة وآمنة، مع دعم فني على مدار الساعة لضمان رحلة خالية من القلق. خدمتكم شرف وأجر." : "We are committed to providing a seamless and secure booking experience, with 24/7 technical support to ensure a worry-free journey. Serving you is an honor and reward.",
    imageClass: "bg-[url('https://images.unsplash.com/photo-1569154941061-e231b4725b1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&h=800&fit=crop&auto=format')]",
    soundText: currentLang === 'ar' ? "إن الحمد والنعمة لك والملك" : "Innal-Hamda Wan-Ni'mata Laka wal-Mulk"
  }
];

let currentLang = 'ar'; 

const IntroSlider = ({ t, currentLang: langProp, onFinish }) => {
  currentLang = langProp;
  const slides = introSlidesData(t);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true); 
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);
  
  useEffect(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(error => console.log("Audio play failed:", error));
    }
  }, [currentIndex, isMuted]);


  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      onFinish();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const currentSlide = slides[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <motion.div 
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className={`relative w-full h-full max-w-4xl max-h-[90vh] md:max-h-[700px] bg-cover bg-center rounded-lg shadow-2xl overflow-hidden flex flex-col justify-between p-8 text-white ${currentSlide.imageClass}`}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10">
          <h2 className={`text-4xl md:text-5xl font-bold mb-2 text-gold ${langProp === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentSlide.title}</h2>
          <h3 className={`text-xl md:text-2xl font-semibold mb-4 text-white/90 ${langProp === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentSlide.subtitle}</h3>
          <p className={`text-md md:text-lg text-white/80 max-w-prose ${langProp === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentSlide.text}</p>
          {currentSlide.soundText && (
            <p className={`mt-4 text-lg italic text-gold/80 ${langProp === 'ar' ? 'font-arabic' : 'font-english'}`}>{currentSlide.soundText}</p>
          )}
        </div>

        <div className="relative z-10 flex items-center justify-between mt-8">
          <Button variant="ghost" onClick={toggleMute} className="text-white hover:bg-white/20 p-2 rounded-full">
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>

          <div className="flex space-x-2 rtl:space-x-reverse">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-gold' : 'bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
          
          <Button 
            onClick={handleNext} 
            className={`bg-gold hover:bg-gold/90 text-primary font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105 ${langProp === 'ar' ? 'font-arabic' : 'font-english'}`}
          >
            {currentIndex < slides.length - 1 ? (
              <>
                {langProp === 'ar' ? 'التالي' : 'Next'} <SkipForward className={`ml-2 rtl:mr-2 rtl:ml-0 h-5 w-5`} />
              </>
            ) : (
              <>
                {langProp === 'ar' ? 'ابدأ الرحلة' : 'Start Journey'} <CheckCircle className={`ml-2 rtl:mr-2 rtl:ml-0 h-5 w-5`} />
              </>
            )}
          </Button>
        </div>
      </motion.div>
      <audio ref={audioRef} src="/assets/sounds/talbiyah_short.mp3" loop={false} muted={isMuted} />
    </div>
  );
};

export default IntroSlider;