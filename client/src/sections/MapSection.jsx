import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Phone, Mail, ExternalLink, Sparkles, Building2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';

const MapSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-bmu-surface/60 border-t border-slate-200/80 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-bmu-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-bmu-pink/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 space-y-16">
        <SectionTitle
          badge="Campus Location & Navigation"
          title="Visit Our"
          gradientTitle="University Campus"
          subtitle="Experience our modern campus facilities in Phnom Penh, Cambodia. Explore our academic buildings, collaborative learning commons, and administrative headquarters in interactive 3D."
          align="center"
        />

        {/* 3D Map Container with Perspective and Hover Tilt Effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative max-w-6xl mx-auto"
          style={{ perspective: '1200px' }}
        >
          <div className="p-4 sm:p-6 md:p-8 rounded-3xl bg-white/90 backdrop-blur-2xl border border-slate-200/80 shadow-2xl relative group transition-all duration-500 hover:shadow-glow-bmu hover:border-bmu-pink/50">
            {/* Top Bar / Header above Map */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-bmu-red to-bmu-pink flex items-center justify-center text-white shadow-md animate-pulse">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                    <span>BMU University Headquarters</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[10px] font-extrabold text-bmu-red uppercase tracking-wider">
                      Phnom Penh, Cambodia
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Kingdom of Cambodia • Premier Academic & Research Facilities
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://maps.google.com/?q=BMU+University+Phnom+Penh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold border border-slate-300/80 transition-all shadow-sm hover:scale-105"
                >
                  <Navigation className="w-3.5 h-3.5 text-bmu-red" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Responsive 3D Styled Map Frame */}
            <div className="relative w-full h-[450px] sm:h-[550px] md:h-[600px] rounded-2xl overflow-hidden shadow-inner border border-slate-200/80 bg-slate-100 group-hover:scale-[1.01] transition-transform duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4407.376641091717!2d104.8604471!3d11.5790477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951da7109166b%3A0x1f1a5babaf71d57a!2sBMU%20University!5e1!3m2!1sen!2skh!4v1783487302517!5m2!1sen!2skh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="BMU University 3D Campus Map"
                className="w-full h-full object-cover"
              />

              {/* Floating Glass Overlay Badge (Bottom Left) */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl text-left pointer-events-none sm:pointer-events-auto">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-bmu-red/10 text-bmu-red shrink-0 mt-0.5">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Direct Campus Access
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 leading-snug">
                      Phnom Penh Campus & Student Center
                    </div>
                    <div className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
                      <Clock className="w-3.5 h-3.5 text-bmu-pink" />
                      <span>Mon – Sat: 8:00 AM – 6:00 PM (GMT+7)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quick Directory & Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-slate-200/80 text-left">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-bmu-red flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Location</div>
                  <div className="text-sm font-extrabold text-slate-900">Phnom Penh, Cambodia</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-bmu-pink flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Student Services</div>
                  <div className="text-sm font-extrabold text-slate-900">+855 (0) Phnom Penh Campus</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-bmu-red/10 to-bmu-pink/10 border border-bmu-pink/30">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-bmu-red">Visit Campus</div>
                  <div className="text-sm font-extrabold text-slate-900">Book a Guided Tour</div>
                </div>
                <Link to="/contact">
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-bmu-red to-bmu-pink text-white text-xs font-bold shadow-md hover:scale-105 transition-transform">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default MapSection;
