import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Building2, Sparkles, ArrowRight, ShieldCheck, Cpu, Award, CheckCircle2, Handshake, ExternalLink, Users, Zap, X, Camera, Calendar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import { fetchSettings, fetchPartnerships, fetchPartners } from '../services/api';

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

const Partners = () => {
  const location = useLocation();
  const [selectedMou, setSelectedMou] = useState(null);
  const [activeMouImg, setActiveMouImg] = useState('');
  const [mouList, setMouList] = useState([]);
  const [settingsData, setSettingsData] = useState(null);
  const [internationalPartners, setInternationalPartners] = useState([]);
  const [regionalPartners, setRegionalPartners] = useState([]);
  const [localPartners, setLocalPartners] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPartnerships();
      if (data && data.length > 0) {
        setMouList(data);
      }
      
      const pData = await fetchPartners();
      if (pData && Array.isArray(pData)) {
        setInternationalPartners(pData.filter(p => p.category === 'International Partners & Collaborations'));
        setRegionalPartners(pData.filter(p => p.category === 'Regional Alliances'));
        setLocalPartners(pData.filter(p => p.category === 'Local Partners & Collaborations'));
      }
      
      const settings = await fetchSettings();
      if (settings && Object.keys(settings).length > 0) {
        setSettingsData(settings);
      }
    };
    loadData();
  }, []);

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
        console.error('Failed to load dynamic partner emblems in Partners page:', err);
      }
    };
    loadEmblems();
  }, []);

  // Smooth scroll to hash section when URL changes or on initial load


  useEffect(() => {
    if (selectedMou) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMou]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const yOffset = -100;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);



  return (
    <div className="min-h-screen pt-28 pb-20 bg-bmu-bg relative overflow-hidden text-left">
      {/* Ambient Glows */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-bmu-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-bmu-pink/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 space-y-20 sm:space-y-28">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold uppercase tracking-wider text-bmu-pink mb-4 shadow-sm">
            <Handshake className="w-3.5 h-3.5 text-bmu-red animate-pulse" />
            <span>Global & Regional Alliances</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Our <span className="text-gradient-bmu">Partners & Collaborations</span>
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed">
            BMU University is physically and intellectually embedded in the global technology ecosystem. We bridge academia and industry through deep partnerships with world-renowned international institutes and premier regional technological alliances.
          </p>
        </div>

        {/* OFFICIAL PARTNER EMBLEMS INFINITE SCROLLING CAROUSEL (PAUSE ON HOVER) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/95 backdrop-blur-xl py-10 rounded-3xl border border-slate-200/80 shadow-2xl space-y-8 relative overflow-hidden group max-w-6xl mx-auto"
        >
          <div className="text-center px-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200/60 inline-flex items-center gap-1.5 shadow-sm">
              <Handshake className="w-3.5 h-3.5 text-bmu-red animate-pulse" />
              Official Institutional Partner Emblems — (Hover to Pause)
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

        {/* SECTION 1: INTERNATIONAL PARTNERS & COLLABORATIONS */}
        <section id="international" className="scroll-mt-32">
          <SectionTitle
            badge="Global Reach"
            title="International"
            gradientTitle="Partners & Collaborations"
            subtitle="Our world-spanning dual-degree programs, cleanroom exchanges, and global research consortia."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {internationalPartners.map((partner, idx) => (
              <Card key={idx} glass hoverEffect className="p-8 bg-white border-slate-200 shadow-xl flex flex-col justify-between space-y-6 group">
                <div>
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-bmu-red uppercase tracking-wider">
                      {partner.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-bmu-red" />
                      {partner.location}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-bmu-red transition-colors">
                    {partner.title}
                  </h3>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                    {partner.scope}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {partner.description}
                  </p>
                </div>

                {partner.websiteUrl ? (
                  <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-bmu-red hover:text-bmu-pink transition-colors group/link cursor-pointer">
                    <span>Active Exchange Program</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-bmu-red">
                    <span>Active Exchange Program</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 2: LOCAL PARTNERS & COLLABORATIONS */}
        <section id="local" className="scroll-mt-32">
          <SectionTitle
            badge="Regional Alliances"
            title="Local"
            gradientTitle="Partners & Collaborations"
            subtitle="Our immediate institutional partners, vocational pathways, and scholarship alliances driving academic and career development."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {localPartners.map((partner, idx) => (
              <Card key={idx} glass hoverEffect className="p-8 bg-white border-slate-200 shadow-xl flex flex-col justify-between space-y-6 group">
                <div>
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-bmu-pink uppercase tracking-wider">
                      {partner.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-bmu-pink" />
                      {partner.location}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-bmu-pink transition-colors">
                    {partner.title}
                  </h3>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                    {partner.scope}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {partner.description}
                  </p>
                </div>

                {partner.websiteUrl ? (
                  <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-bmu-pink hover:text-bmu-red transition-colors group/link cursor-pointer">
                    <span>Direct Hiring & Research Pipeline</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-bmu-pink">
                    <span>Direct Hiring & Research Pipeline</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 3: MEMORANDUM OF UNDERSTANDING (MOU) & OFFICIAL SIGNINGS */}
        <section id="mou" className="scroll-mt-32">
          <SectionTitle
            badge="Official Charters"
            title="Memorandum of Understanding"
            gradientTitle="& Official Signings"
            subtitle="Explore our active institutional MOUs, bilateral research charters, and guaranteed academic articulation agreements."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mouList.map((mou, idx) => (
              <Card key={idx} glass hoverEffect className="p-8 bg-white border-slate-200 shadow-xl flex flex-col justify-between space-y-6 group">
                <div className="space-y-6">
                  {/* Signing Ceremony Photo Preview Banner */}
                  <div 
                    onClick={() => { setSelectedMou(mou); setActiveMouImg(mou.image); }}
                    className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 border border-slate-200 shadow-md cursor-pointer group/img"
                  >
                    {mou.image ? (
                      <img 
                        src={mou.image} 
                        alt={`${mou.partner} Signing Ceremony`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" 
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400">
                         <Camera className="w-12 h-12 mb-2 opacity-50" />
                         <span className="text-xs font-bold uppercase tracking-wider">No Photo Available</span>
                      </div>
                    )}
                    
                    {mou.image && (
                      <>
                        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-[10px] font-bold text-emerald-400 flex items-center gap-1.5 shadow-sm">
                          <Camera className="w-3 h-3 text-bmu-pink animate-pulse" />
                          <span>Official Signing Photo</span>
                        </div>
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-4 py-2 rounded-xl bg-white/95 text-slate-900 font-extrabold text-xs shadow-xl flex items-center gap-2">
                            <Camera className="w-4 h-4 text-bmu-red" />
                            View Signing Photo
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-bmu-red uppercase tracking-wider truncate max-w-[200px]">
                        {mou.category}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {mou.status || 'Active Charter'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-bmu-red transition-colors">
                      {mou.partner}
                    </h3>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Handshake className="w-4 h-4 text-bmu-pink shrink-0" />
                      <span>{mou.category} ({mou.date || 'Active'})</span>
                    </div>
                    
                    {mou.signatories && (
                      <div className="text-[11px] font-semibold text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                        <strong className="text-slate-900">Signatories:</strong> {mou.signatories}
                      </div>
                    )}
                    
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {mou.desc || 'Official Memorandum of Understanding defining collaboration pathways and joint initiatives between BMU and partner institution.'}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-bmu-red gap-2 flex-wrap">
                  <span>Official Signed Charter</span>
                  <button
                    onClick={() => { setSelectedMou(mou); setActiveMouImg(mou.image); }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-bmu-red to-bmu-pink text-white font-bold text-xs flex items-center gap-1.5 shadow-glow-red hover:scale-105 transition-all"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Signing Photos</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Industry Collaboration CTA Banner */}
        <Card glass className="p-8 sm:p-14 bg-slate-900 text-white border-slate-800 shadow-2xl rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Corporate & Academic Relations</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Partner Your Organization With BMU Foundries
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We are actively expanding our research consortia. Collaborate with our Turing Award faculty and recruit our elite undergraduate engineers for your next deep-tech initiative.
            </p>
          </div>
          <Link to="/contact">
            <Button variant="primary" size="lg" icon={ArrowRight} className="shadow-glow-bmu shrink-0">
              Initiate Partnership
            </Button>
          </Link>
        </Card>

        {/* SIGNING CEREMONY PHOTO GALLERY MODAL */}
        <AnimatePresence>
          {selectedMou && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl overflow-y-auto"
              onClick={() => setSelectedMou(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto max-h-[95vh] sm:max-h-[90vh] flex flex-col text-left"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-4 sm:p-8 bg-slate-50 text-slate-900 flex items-start sm:items-center justify-between gap-4 border-b border-slate-200 shrink-0">
                  <div className="space-y-1 sm:space-y-2 pr-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-bmu-red/10 border border-bmu-red/20 text-[9px] sm:text-[10px] font-mono font-bold text-bmu-red uppercase tracking-wider">
                      <Camera className="w-3 h-3 animate-pulse" />
                      <span>Official Signing Ceremony Gallery</span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">{selectedMou.partner}</h3>
                    <p className="text-[10px] sm:text-xs text-slate-500">Signed on {selectedMou.date || 'Active'}</p>
                  </div>
                  <button
                    onClick={() => setSelectedMou(null)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-200 hover:bg-bmu-red hover:text-white flex items-center justify-center text-slate-600 transition-colors shrink-0 mt-1 sm:mt-0"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Featured Signing Photo Display */}
                <div className="p-4 sm:p-8 overflow-y-auto space-y-4 sm:space-y-6">
                  { (activeMouImg || selectedMou.image) ? (
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm w-full h-48 sm:h-[400px] flex items-center justify-center group">
                      <img
                        src={activeMouImg || selectedMou.image}
                        alt="MOU Signing Ceremony"
                        className="w-full h-full object-contain sm:object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-white/90 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200/60 flex items-center justify-between text-[10px] sm:text-xs text-slate-800 shadow-sm">
                        <span className="font-bold flex items-center gap-1.5">
                          <Handshake className="w-3 h-3 sm:w-4 sm:h-4 text-bmu-red" />
                          <span className="hidden sm:inline">Official Signing Moment</span>
                          <span className="inline sm:hidden">Signing</span>
                        </span>
                        <span className="text-slate-500 font-mono text-[9px] sm:text-[11px] truncate max-w-[50%] text-right">{selectedMou.category}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm aspect-video flex flex-col items-center justify-center text-slate-400">
                       <Camera className="w-12 h-12 mb-3 opacity-50" />
                       <span className="text-sm font-bold uppercase tracking-wider">No Ceremony Photos Available</span>
                    </div>
                  )}

                  {/* Thumbnail Switcher (Hidden if no gallery) */}
                  {selectedMou.gallery && selectedMou.gallery.length > 1 && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                        Signing Ceremony Photos (Click to view):
                      </label>
                      <div className="flex items-center gap-3 overflow-x-auto pb-2">
                        {selectedMou.gallery.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveMouImg(img)}
                            className={`relative rounded-xl overflow-hidden w-24 sm:w-28 h-16 sm:h-20 shrink-0 border-2 transition-all ${
                              (activeMouImg || selectedMou.image) === img
                                ? 'border-bmu-red shadow-glow-red scale-105 ring-2 ring-bmu-red/30'
                                : 'border-slate-200 opacity-70 hover:opacity-100 hover:scale-102'
                            }`}
                          >
                            <img src={img} alt={`Signing moment ${idx + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description and Signatories */}
                  <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 space-y-2 sm:space-y-3">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                      Agreement Charter Summary
                    </h4>
                    <p className="text-slate-700 text-[11px] sm:text-sm leading-relaxed">{selectedMou.desc || 'Official Memorandum of Understanding defining collaboration pathways and joint initiatives between BMU and partner institution.'}</p>
                    <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-semibold text-slate-600">
                      <span><strong className="text-slate-900">Partner:</strong> {selectedMou.partner}</span>
                      <span className="text-bmu-red font-bold">{selectedMou.status || 'Active Charter'}</span>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
                  <button
                    onClick={() => setSelectedMou(null)}
                    className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[10px] sm:text-xs transition-colors"
                  >
                    Close Gallery
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default Partners;
