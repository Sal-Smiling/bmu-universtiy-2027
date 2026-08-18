import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import { fetchSettings } from '../services/api';

// Import official partner logos (excluding banner screenshots)
import partner2 from '../assets/partner-2.png';
import partner3 from '../assets/partner-3.png';
import partner4 from '../assets/partner-4.png';
import partner5 from '../assets/partner-5.png';
import partner6 from '../assets/partner-6.png';
import partner7 from '../assets/partner-7.png';
import partner9 from '../assets/partner-9.png';
import partner10 from '../assets/partner-10.png';
import partner11 from '../assets/partner-11.png';

const PartnersSection = () => {
  const { t } = useTranslation();
  const defaultLogoList = [
    { src: partner10, name: 'BMU Official Headquarters Logo' },
    { src: partner11, name: 'True VISIONS International School of Cambodia' },
    { src: partner9, name: 'MISPP Information Security & Public Policy' },
    { src: partner4, name: 'Google Digital Garage' },
    { src: partner5, name: 'Yulin Normal University' },
    { src: partner6, name: 'Nanning College for Vocational Technology' },
    { src: partner7, name: 'EDU CLaaS' },
    { src: partner3, name: 'University of Roehampton London' },
    { src: partner2, name: 'ICC (International Computing Consortia)' },
  ];

  const [emblemsList, setEmblemsList] = useState(defaultLogoList);

  const resolveEmblemSrc = (src) => {
    if (!src) return '';
    if (src.includes('partner-10')) return partner10;
    if (src.includes('partner-11')) return partner11;
    if (src.includes('partner-9')) return partner9;
    if (src.includes('partner-4')) return partner4;
    if (src.includes('partner-5')) return partner5;
    if (src.includes('partner-6')) return partner6;
    if (src.includes('partner-7')) return partner7;
    if (src.includes('partner-3')) return partner3;
    if (src.includes('partner-2')) return partner2;
    return src;
  };

  useEffect(() => {
    const loadEmblems = async () => {
      try {
        const settings = await fetchSettings();
        if (settings && settings.partner_emblems && settings.partner_emblems.emblems && settings.partner_emblems.emblems.length > 0) {
          const resolved = settings.partner_emblems.emblems.map((emb) => ({
            ...emb,
            src: resolveEmblemSrc(emb.src)
          }));
          setEmblemsList(resolved);
        }
      } catch (err) {
        console.error('Failed to load dynamic partner emblems:', err);
      }
    };
    loadEmblems();
  }, []);

  return (
    <section className="py-24 bg-bmu-surface/60 border-t border-slate-200/80 relative overflow-hidden">
      {/* Ambient glowing background circles */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-bmu-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-bmu-pink/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-bmu-red/10 text-bmu-red text-xs font-bold uppercase tracking-wider">
            <Handshake className="w-4 h-4" />
            <span>{t("Global Academic Consortia")}</span>
          </div>

          <SectionTitle
            title={t("Building Global Bridges & Dual-Degree Innovation")}
            subtitle={t("Through our active MoUs and institutional partnerships with elite universities across Southeast Asia and the UK, we unlock limitless research opportunities and cross-border mobility.")}
            gradientTitle={t("Global Bridges & Dual-Degree Innovation")}
          />
        </div>

        {/* Marquee Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-xl overflow-hidden py-8"
        >
          <div className="text-center mb-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
              {t("Official Institutional Partner Emblems — (Hover to Pause)")}
            </span>
          </div>

          {/* Infinite Scrolling Marquee Container */}
          <div className="relative w-full overflow-hidden flex items-center py-4">
            {/* Left & Right Fade Gradients for Ultra-Premium Smoothness */}
            <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex items-center gap-10 sm:gap-14 px-6">
              {[...emblemsList, ...emblemsList].map((logo, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center p-5 sm:p-6 rounded-2xl bg-slate-50/90 border border-slate-200/70 shadow-sm hover:shadow-lg hover:scale-105 hover:border-bmu-pink/50 hover:bg-white transition-all duration-300 shrink-0 w-48 sm:w-56 h-24 sm:h-28"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-14 sm:max-h-16 max-w-[150px] sm:max-w-[170px] w-auto object-contain filter drop-shadow-sm transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Global Network CTA */}
        <div className="text-center pt-4">
          <Link to="/partners">
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-bmu-red to-bmu-pink text-white font-bold shadow-glow-red hover:shadow-glow-bmu hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
              <span>{t("View All International & Local Alliances")}</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default PartnersSection;
