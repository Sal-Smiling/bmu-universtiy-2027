import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Play, Pause, Users, BookOpen, Building2 } from 'lucide-react';
import Card from '../components/Card';
import TechBg from '../components/TechBg';
import { fetchSettings } from '../services/api';

// Import official university banner images
import carousel1 from '../assets/carousel-1.jpg';
import carousel2 from '../assets/carousel-2.jpg';
import carousel3 from '../assets/carousel-3.jpg';
import carousel4 from '../assets/carousel-4.jpg';

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const Hero = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [settings, setSettings] = useState({
    banner: {
      title: 'Shaping Quantum Pioneers & Ethical Innovators',
      subtitle: 'Leading research, dual degrees, and technological breakthroughs across Southeast Asia and the globe.'
    },
    stats: {
      content: {
        activeStudents: '12,450+',
        faculties: '8 Academic Schools',
        institutions: '15+ Global Centers'
      }
    }
  });

  useEffect(() => {
    const loadHeroData = async () => {
      const data = await fetchSettings();
      if (data && Object.keys(data).length > 0) {
        setSettings((prev) => ({ ...prev, ...data }));
      }
    };
    loadHeroData();
  }, []);

  const defaultSlides = [
    {
      id: 1,
      image: carousel1,
      tag: t("Global Collaboration"),
      title: t("International Academic Symposium"),
      subtitle: t("BMU students & faculty hosting global research partners at our state-of-the-art auditorium."),
    },
    {
      id: 2,
      image: carousel2,
      tag: t("University Leadership"),
      title: t("Presidential Vision & Innovation Hall"),
      subtitle: t("Empowering undergraduate innovators and celebrating academic excellence across all faculties."),
    },
    {
      id: 3,
      image: carousel3,
      tag: t("Robotics Championship"),
      title: t("True Visions Robotics & Digital Skills 2026"),
      subtitle: t("Our engineering champions receiving national honors and research grant awards on stage."),
    },
    {
      id: 4,
      image: carousel4,
      tag: t("Executive Mentorship"),
      title: t("Advanced Supercomputing Lecture Series"),
      subtitle: t("Immersive classroom experiences led by distinguished professors and industry pioneers."),
    },
  ];

  const slides = (settings?.banner?.slides && Array.isArray(settings.banner.slides) && settings.banner.slides.length > 0)
    ? settings.banner.slides.map((s, idx) => ({
        ...s,
        image: s.image || defaultSlides[idx % defaultSlides.length].image,
        tag: s.tag || 'Global Collaboration',
        title: s.title || 'Excellence in Research & Innovation',
        subtitle: s.subtitle || ''
      }))
    : defaultSlides.map((slide, idx) => {
        if (idx === 0) {
          return {
            ...slide,
            image: settings?.banner?.image || slide.image,
            tag: settings?.banner?.tag || slide.tag,
            title: settings?.banner?.title || slide.title,
            subtitle: settings?.banner?.subtitle || slide.subtitle,
          };
        }
        return slide;
      });

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Kinetic typography animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-24 pb-16 overflow-hidden">
      {/* 1. Technology Grid Animated Background */}
      <TechBg />

      {/* 2. Foreground Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-6xl mx-auto space-y-8"
        >
          {/* 🎬 CINEMATIC WIDESCREEN UNIVERSITY CAROUSEL SLIDER */}
          <motion.div
            variants={itemVariants}
            className="relative w-full max-w-6xl mx-auto h-[420px] sm:h-[540px] lg:h-[640px] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/90 group bg-slate-950"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover object-center"
                />
                {/* Gradient overlays for readability and aesthetics */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/30 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-900/60 to-transparent pointer-events-none" />
                
                {/* Caption content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-12 text-left z-10 flex flex-col justify-end">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="max-w-3xl space-y-2 sm:space-y-3"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bmu-red text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-glow-red">
                      <Sparkles className="w-3 h-3 animate-spin" />
                      {slides[currentSlide].tag}
                    </span>
                    <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                      {slides[currentSlide].title}
                    </h3>
                    <p className="text-slate-200 text-sm sm:text-base lg:text-lg font-normal max-w-2xl leading-relaxed drop-shadow">
                      {slides[currentSlide].subtitle}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 hover:bg-white/90 backdrop-blur-md border border-white/40 text-white hover:text-slate-900 flex items-center justify-center transition-all duration-300 shadow-lg opacity-80 group-hover:opacity-100 hover:scale-110 focus:outline-none"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 hover:bg-white/90 backdrop-blur-md border border-white/40 text-white hover:text-slate-900 flex items-center justify-center transition-all duration-300 shadow-lg opacity-80 group-hover:opacity-100 hover:scale-110 focus:outline-none"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide Indicators and Play/Pause Controls */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
              <div className="flex items-center gap-1.5 mr-2 border-r border-white/20 pr-3">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? 'w-8 bg-gradient-to-r from-bmu-red to-bmu-pink shadow-glow-red'
                        : 'w-2.5 bg-white/40 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="text-white/80 hover:text-white transition-colors focus:outline-none"
                title={isPaused ? "Resume slideshow" : "Pause slideshow"}
              >
                {isPaused ? <Play className="w-4 h-4 text-bmu-pink animate-pulse" /> : <Pause className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          {/* Glassmorphism Feature Cards Widget */}
          <motion.div
            variants={itemVariants}
            className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 text-left"
          >
            {[
              {
                icon: Users,
                title: 'Active Students',
                value: settings?.stats?.content?.activeStudents || '12,450+',
                desc: 'Enrolled scholars across undergraduate & postgraduate degree programs',
                color: 'text-bmu-red',
                border: 'border-bmu-red/30',
              },
              {
                icon: BookOpen,
                title: 'Faculties',
                value: settings?.stats?.content?.faculties || '8 Academic Schools',
                desc: 'Specialized academic divisions driving STEM, computing & humanities',
                color: 'text-bmu-pink',
                border: 'border-bmu-pink/30',
              },
              {
                icon: Building2,
                title: 'Institutions',
                value: settings?.stats?.content?.institutions || '15+ Global Centers',
                desc: 'Premier university chartered in Phnom Penh, Kingdom of Cambodia',
                color: 'text-[#FF2A6D]',
                border: 'border-slate-300/80',
              },
            ].map((widget, idx) => (
              <Card
                key={idx}
                glass
                hoverEffect
                className={`p-5 bg-bmu-card/60 backdrop-blur-xl border ${widget.border} hover:shadow-glow-pink transition-all duration-300 group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-slate-100/80 border border-slate-200 ${widget.color} group-hover:scale-110 transition-transform`}>
                    <widget.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/60">
                    Live Status
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight mb-1">
                  {widget.value}
                </div>
                <div className="text-sm font-bold text-slate-800 mb-1">
                  {widget.title}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {widget.desc}
                </p>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

