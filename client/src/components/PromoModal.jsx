import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, X, ArrowRight, CheckCircle2, Award, Zap, Code2, ShieldAlert, RefreshCw, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const PromoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  
  // Dynamic advertisement data
  const [promoData, setPromoData] = useState({
    isActive: true,
    title: 'BMU Certified Short Courses & AI Bootcamps',
    subtitle: 'Special Executive Intake • July 2026',
    description: "Fast-track your tech career with intensive 8-week executive bootcamps taught by BMU's top computer science researchers and industry leaders.",
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
  });

  useEffect(() => {
    fetch('https://bmu-universtiy-2027-server.vercel.app/api/v1/settings/promo_advertisement')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const promo = data.data;
          setPromoData({
            isActive: promo.tag === 'active',
            title: promo.title || 'BMU Certified Short Courses & AI Bootcamps',
            subtitle: promo.subtitle || 'Special Executive Intake • July 2026',
            description: promo.content || "Fast-track your tech career with intensive 8-week executive bootcamps taught by BMU's top computer science researchers and industry leaders.",
            image: promo.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
          });
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!promoData.isActive) return;
    
    // Check if advertisement has been shown in this browser session
    const hasSeenPromo = sessionStorage.getItem('bmu_shortcourse_promo_v1');
    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('bmu_shortcourse_promo_v1', 'true');
      }, 1200); // 1.2s delay for smooth first entrance
      return () => clearTimeout(timer);
    }
  }, [promoData.isActive]);

  // 15-second countdown logic when modal is open
  useEffect(() => {
    let interval = null;
    if (isOpen && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isOpen && timeLeft === 0) {
      // Auto close when timer reaches 0
      setIsOpen(false);
    }
    return () => clearInterval(interval);
  }, [isOpen, timeLeft]);

  // Function to manually trigger / replay the ad for testing purposes
  const triggerAdReplay = () => {
    setTimeLeft(15);
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Testing Badge hidden per user request */}
      {/* <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 bg-slate-900/90 text-white px-3.5 py-2 rounded-full shadow-2xl border border-bmu-red/50 backdrop-blur-md text-xs font-semibold hover:scale-105 transition-transform cursor-pointer" onClick={triggerAdReplay} title="Click to test the 15-second Short Course Advertisement Modal">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        <Sparkles className="w-3.5 h-3.5 text-bmu-pink" />
        <span>Test Short Course Ad (15s)</span>
      </div> */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl overflow-y-auto"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto text-left flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Countdown & Close Header */}
              <div className="bg-slate-900 px-6 py-3.5 border-b border-slate-800 flex items-center justify-between text-white shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-bmu-red text-[10px] font-black uppercase tracking-wider text-white flex items-center gap-1 animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    Advertisement
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    Auto-closing in <strong className="text-emerald-400 text-sm font-extrabold">{timeLeft}s</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTimeLeft(15)}
                    title="Reset 15s Timer"
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors text-xs flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-bmu-red text-white transition-colors"
                    aria-label="Close Ad"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar for 15s timer */}
              <div className="w-full bg-slate-800 h-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-bmu-red via-bmu-pink to-emerald-400"
                  initial={{ width: '100%' }}
                  animate={{ width: `${(timeLeft / 15) * 100}%` }}
                  transition={{ duration: 1, ease: 'linear' }}
                />
              </div>

              {/* Full Poster Image */}
              <div className="w-full bg-slate-100 flex justify-center border-b border-slate-100 overflow-hidden relative">
                <img
                  src={promoData.image}
                  alt={promoData.title}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              </div>

              {/* Ad Content Body */}
              <div className="p-4 sm:p-6">
                {/* Footer Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    Close Ad ({timeLeft}s)
                  </button>
                  <Link
                    to="/programs"
                    onClick={() => setIsOpen(false)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-bmu-red to-bmu-pink text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow-red hover:scale-105 transition-transform"
                  >
                    <span>Explore Short Courses Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PromoModal;
