import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ChevronRight, ChevronDown, BookOpen, Compass, Award, Target, HelpCircle, UserCheck, Clock, Globe, Building2, Heart, Briefcase, Users, Handshake, DollarSign, Calendar } from 'lucide-react';
import Button from './Button';
import { useTranslation } from 'react-i18next';
import enFlag from '../assets/flags/en.svg';
import khFlag from '../assets/flags/kh.svg';
import chFlag from '../assets/flags/ch.svg';
import bmuLogo from '../assets/logo.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem('bmu_lang') || 'En');
  const langFlags = { En: <img src={enFlag} alt="EN" className="w-4 h-3 object-cover rounded-[2px] shadow-sm" />, Kh: <img src={khFlag} alt="KH" className="w-4 h-3 object-cover rounded-[2px] shadow-sm" />, Ch: <img src={chFlag} alt="CH" className="w-4 h-3 object-cover rounded-[2px] shadow-sm" /> };
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About Us', 
      path: '/about',
      subItems: [
        { name: 'History', path: '/about#history', icon: Clock },
        { name: 'Philosophy', path: '/about#philosophy', icon: BookOpen },
        { name: 'Moto - Vision - Mission', path: '/about#mission-vision', icon: Compass },
        { name: 'Core Values', path: '/about#core-values', icon: Award },
        { name: 'Strategic Goals', path: '/about#strategic-goals', icon: Target },
        { name: 'Why BMU?', path: '/about#why-bmu', icon: HelpCircle },
        { name: 'Message from the President', path: '/about#president-message', icon: UserCheck },
      ]
    },
    { 
      name: 'Academic Programs', 
      path: '/programs',
      subItems: [
        { name: 'International Academic Programs', path: '/programs#international', icon: Globe },
        { name: 'National Academic Programs', path: '/programs#national', icon: Building2 },
      ]
    },
    { 
      name: 'Admission', 
      path: '/admission',
      subItems: [
        { name: 'Tuition Fees', path: '/admission#tuition-fees', icon: DollarSign },
        { name: 'Scholarship', path: '/admission#scholarship', icon: Award },
      ]
    },
    { 
      name: 'Partners & Collaborations', 
      path: '/partners',
      subItems: [
        { name: 'International', path: '/partners#international', icon: Globe },
        { name: 'Local', path: '/partners#local', icon: Building2 },
        { name: 'MOU & Official Signings', path: '/partners#mou', icon: Handshake },
      ]
    },
    { 
      name: 'Students', 
      path: '/students',
      subItems: [
        { name: 'Campus life', path: '/students#campus-life', icon: Heart },
        { name: 'Internship', path: '/students#internship', icon: Briefcase },
        { name: 'Community Services', path: '/students#community-services', icon: Users },
      ]
    },
    { name: 'Library', path: '/library' },
    { 
      name: 'News', 
      path: '/news',
      subItems: [
        { name: 'Events', path: '/news#events', icon: Calendar },
        { name: 'Announcements', path: '/news#announcements', icon: Sparkles },
      ]
    },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    localStorage.setItem('bmu_lang', language);
    i18n.changeLanguage(language);
    if (language === 'Kh') {
      document.documentElement.classList.add('lang-kh');
    } else {
      document.documentElement.classList.remove('lang-kh');
    }
  }, [language, i18n]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileSub = (name) => {
    setMobileExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-2.5'
          : 'bg-white/70 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group focus:outline-none shrink-0 py-1">
            <img 
              src={bmuLogo} 
              alt="Bonamary University (BMU) Logo" 
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5">
            {navLinks.map((link) => {
              const isDropdown = !!link.subItems;
              const isCurrentPath = location.pathname === link.path;

              return (
                <div
                  key={link.path}
                  className="relative group"
                  onMouseEnter={() => isDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => isDropdown && setActiveDropdown(null)}
                >
                  <NavLink
                    to={link.path}
                    className={`relative px-2 xl:px-2.5 py-2 text-[11px] xl:text-xs 2xl:text-sm font-bold transition-colors duration-200 rounded-lg flex items-center gap-1 hover:text-bmu-red whitespace-nowrap ${
                      isCurrentPath ? 'text-bmu-red font-extrabold' : 'text-slate-700'
                    }`}
                  >
                    <span className="relative z-10">{t(link.name)}</span>
                    {isDropdown && (
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180 text-bmu-red' : 'text-slate-400'}`} />
                    )}
                    {isCurrentPath && !isDropdown && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-slate-100 rounded-lg border border-slate-200 -z-0"
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </NavLink>

                  {/* Desktop Dropdown Menu */}
                  {isDropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className={`absolute left-0 top-full mt-1 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-xl p-2.5 z-50 space-y-1 ${
                            link.name === 'About Us' ? 'w-72' : link.name === 'Academic Programs' ? 'w-80' : 'w-64'
                          }`}
                        >
                          <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {t("Explore")} {t(link.name)}
                            </span>
                          </div>
                          {link.subItems.map((sub) => {
                            const IconComponent = sub.icon;
                            return (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-bmu-red transition-all group/item"
                              >
                                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover/item:bg-bmu-red/10 group-hover/item:text-bmu-red transition-colors shrink-0">
                                  <IconComponent className="w-3.5 h-3.5" />
                                </div>
                                <span className="flex-1 leading-tight">{t(sub.name)}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all shrink-0" />
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="relative" onMouseEnter={() => setLangDropdownOpen(true)} onMouseLeave={() => setLangDropdownOpen(false)}>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors text-sm font-bold mr-1">
                <span>{langFlags[language]}</span>
                <span className="text-xs">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 bg-white border border-slate-200 shadow-lg rounded-xl p-1 z-50 w-24 overflow-hidden"
                  >
                    {['En', 'Kh', 'Ch'].map(lang => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setLangDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${language === lang ? 'bg-bmu-red/10 text-bmu-red' : 'text-slate-600 hover:bg-slate-100'}`}
                      >
                        <span className="text-sm">{langFlags[lang]}</span>
                        <span>{lang === 'En' ? 'English' : lang === 'Kh' ? 'Khmer' : 'Chinese'}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/login">
              <Button variant="secondary" size="sm" className="border-slate-300 text-xs px-3">
                {t("Login")}
              </Button>
            </Link>
            <Link to="/admission">
              <Button variant="primary" size="sm" className="text-xs px-3">
                {t("Apply Now")}
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors text-sm font-bold"
              >
                <span>{langFlags[language]}</span>
                <span className="text-xs">{language}</span>
              </button>
              
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 bg-white border border-slate-200 shadow-xl rounded-xl p-1 z-50 w-28"
                  >
                    {['En', 'Kh', 'Ch'].map(lang => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setLangDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${language === lang ? 'bg-bmu-red/10 text-bmu-red' : 'text-slate-600 hover:bg-slate-100'}`}
                      >
                        <span className="text-sm">{langFlags[lang]}</span>
                        <span>{lang === 'En' ? 'English' : lang === 'Kh' ? 'Khmer' : 'Chinese'}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/login" className="sm:hidden">
              <Button variant="secondary" size="sm" className="px-3 py-1.5 text-xs">
                {t("Login")}
              </Button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-bmu-pink"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link) => {
                const isDropdown = !!link.subItems;

                if (isDropdown) {
                  const isExpanded = !!mobileExpanded[link.name];

                  return (
                    <div key={link.path} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <NavLink
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            `flex-1 px-4 py-3 rounded-xl text-base font-bold transition-all ${
                              isActive ? 'text-bmu-red bg-slate-100' : 'text-slate-700 hover:bg-slate-50'
                            }`
                          }
                        >
                          {t(link.name)}
                        </NavLink>
                        <button
                          onClick={() => toggleMobileSub(link.name)}
                          className="p-3 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
                        >
                          <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180 text-bmu-red' : ''}`} />
                        </button>
                      </div>

                      {/* Mobile Sub-Items */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-1 border-l-2 border-bmu-red/30 ml-4 overflow-hidden"
                          >
                            {link.subItems.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                onClick={() => {
                                  setIsOpen(false);
                                  setMobileExpanded({});
                                }}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:text-bmu-red hover:bg-slate-50 transition-colors"
                              >
                                <sub.icon className="w-4 h-4 text-bmu-red shrink-0" />
                                <span>{sub.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-bmu-red/10 to-bmu-pink/10 text-bmu-red border border-bmu-pink/30 font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </NavLink>
                );
              })}

              <div className="pt-4 mt-4 border-t border-slate-200 flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full">
                  <Button variant="secondary" size="md" className="w-full justify-center">
                    Student & Faculty Portal {t("Login")}
              </Button>
                </Link>
                <Link to="/admission" onClick={() => setIsOpen(false)} className="w-full">
                  <Button variant="primary" size="md" className="w-full justify-center">
                    Apply for Admission
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
