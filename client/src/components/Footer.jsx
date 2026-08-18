import React from 'react';
import { useTranslation } from 'react-i18next';
// from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import bmuLogo from '../assets/logo.png';

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const TiktokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const TelegramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bmu-surface border-t border-slate-200 relative overflow-hidden pt-16 pb-12">
      {/* Background glowing gradient accents */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-bmu-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-bmu-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block group focus:outline-none">
              <img 
                src={bmuLogo} 
                alt="Bonamary University (BMU) Logo" 
                className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Empowering the next generation of innovators, engineers, and researchers through world-class technology education, futuristic AI research Labs, and immersive campus experiences.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: TiktokIcon, href: 'https://tiktok.com', label: 'TikTok' },
                { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
                { icon: TelegramIcon, href: 'https://telegram.org', label: 'Telegram' },
                { icon: YoutubeIcon, href: 'https://youtube.com', label: 'YouTube' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100/80 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white hover:bg-gradient-to-tr hover:from-bmu-red hover:to-bmu-pink hover:border-transparent hover:shadow-glow-pink hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-slate-900 font-bold text-base tracking-wider uppercase border-l-2 border-bmu-red pl-3">
              Academics
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Academic Programs', path: '/programs' },
                { name: 'Undergraduate Degrees', path: '/programs' },
                { name: 'Postgraduate & PhD', path: '/programs' },
                { name: 'Faculty & Professors', path: '/faculty' },
                { name: 'Partners & Collabs', path: '/partners' },
                { name: 'MOU & Signings', path: '/partners#mou' },
                { name: 'University Library', path: '/library' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-slate-600 hover:text-bmu-pink transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Campus & Admissions */}
          <div className="space-y-4">
            <h4 className="text-slate-900 font-bold text-base tracking-wider uppercase border-l-2 border-bmu-pink pl-3">
              Admissions
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Apply Online', path: '/admission' },
                { name: 'Tuition & Scholarships', path: '/admission' },
                { name: 'Student Life', path: '/students' },
                { name: 'News & Events', path: '/news' },
                { name: 'Student Portal Login', path: '/login' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-slate-600 hover:text-bmu-pink transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-slate-900 font-bold text-base tracking-wider uppercase border-l-2 border-bmu-red pl-3">
              Contact Us
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-bmu-red shrink-0 mt-0.5" />
                <span>#651, Street 86P, Sangkat Kouk Kleang, Khan Sensok, Phnom Penh 120806, Kingdom of Cambodia</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-bmu-pink shrink-0" />
                <span>+855 17 605 080  <br />+855 87 605 080</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-bmu-red shrink-0" />
                <a href="mailto:info@bonamary-u.com" className="hover:text-bmu-red transition-colors font-medium">info@bonamary-u.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} BMU University. {t("All rights reserved.")}</p>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-slate-700 transition-colors">{t("Privacy Policy")}</Link>
            <Link to="#" className="hover:text-slate-700 transition-colors">{t("Terms of Service")}</Link>
            <Link to="#" className="hover:text-slate-700 transition-colors">Security & Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
