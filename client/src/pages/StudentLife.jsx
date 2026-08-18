import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Trophy, Cpu, Wifi, Sparkles, Heart, Compass, Shield, Terminal, Award, Briefcase, HandHeart, CheckCircle2, ArrowRight, DollarSign, BookOpen, FileText, Maximize2, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import { fetchInternships, fetchCampusLife, fetchCommunityServices } from '../services/api';
import scholarshipP1 from '../assets/scholarship-p1.png';
import scholarshipP2 from '../assets/scholarship-p2.png';
import campusLife1 from '../assets/campus-life-1.png';
import campusLife2 from '../assets/campus-life-2.jpg';
import campusLife3 from '../assets/campus-life-3.png';
import campusLife4 from '../assets/campus-life-4.jpg';
import campusLife5 from '../assets/campus-life-5.jpg';
import intern1 from '../assets/intern-1.jpg';
import intern2 from '../assets/intern-2.png';
import intern3 from '../assets/intern-3.png';
import intern4 from '../assets/intern-4.png';
import volunteerGroup from '../assets/volunteer-group.jpg';

const StudentLife = () => {
  const [selectedDocImage, setSelectedDocImage] = useState(null);
  const [dynamicInternships, setDynamicInternships] = useState([]);
  const [campusLifePhotos, setCampusLifePhotos] = useState([]);
  const [communityServices, setCommunityServices] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      const internData = await fetchInternships();
      if (internData && Array.isArray(internData)) {
        setDynamicInternships(internData);
      }
      
      const campusData = await fetchCampusLife();
      if (campusData && Array.isArray(campusData)) {
        setCampusLifePhotos(campusData);
      }

      const communityData = await fetchCommunityServices();
      if (communityData && Array.isArray(communityData)) {
        setCommunityServices(communityData);
      }
    };
    loadData();
  }, []);

  // Smooth scroll to hash section when URL changes or on initial load
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




  const staticInternships = [];

  const scholarCardsList = [
    ...dynamicInternships.map(item => ({
      name: item.company || item.position,
      role: item.position || item.company,
      workplace: item.description || 'Verified Student Scholar Placement',
      stat: item.status || 'Year 3 Scholar',
      image: item.image || intern1
    }))
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-bmu-bg relative overflow-hidden text-left">
      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-bmu-red/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-bmu-pink/10 rounded-full blur-[130px] pointer-events-none" />

      <Container className="relative z-10 space-y-28">
        {/* SECTION 2: CAMPUS LIFE */}
        <section id="campus-life" className="scroll-mt-32">
          <SectionTitle
            badge="Live Campus Experience"
            title="Vibrant"
            gradientTitle="Campus Life & Activities"
            subtitle="Explore real moments of academic collaboration, peer study, and rich cultural traditions across our student community."
          />

          {/* Authentic Campus Life Photo Gallery */}
          <div className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-bmu-red bg-red-50 border border-red-200 px-3.5 py-1.5 rounded-full inline-block mb-2">
                  Live Campus Moments
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Academic Collaboration & Cultural Celebrations
                </h3>
              </div>
              <p className="text-slate-600 text-sm sm:text-base max-w-md font-normal">
                From peer teamwork in our modern lecture halls to vibrant traditional dance and music exhibitions during term festivals. Click any photo to view full screen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {campusLifePhotos && campusLifePhotos.length > 0 ? (
                campusLifePhotos.map((photo, index) => (
                  <div
                    key={photo.id || index}
                    onClick={() => setSelectedDocImage(photo.image)}
                    className={`group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-slate-200 bg-slate-100 shadow-xl transition-all hover:scale-[1.01] hover:border-bmu-red hover:shadow-2xl flex flex-col justify-between min-h-[300px] sm:min-h-[340px] ${
                      index === 0 ? 'md:col-span-2 min-h-[320px] sm:min-h-[400px]' : ''
                    }`}
                  >
                    <img src={photo.image} alt={photo.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                      <span className="text-xs font-bold uppercase tracking-wider text-yellow-300 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> {photo.category || 'Campus Life'}
                      </span>
                      <h4 className={`font-black mb-1 ${index === 0 ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                        {photo.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 font-normal">{photo.description}</p>
                    </div>
                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur text-yellow-300 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-lg">
                      <span>Zoom Photo</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                  <p className="text-slate-500 font-medium">New campus life photos coming soon.</p>
                </div>
              )}
            </div>
          </div>

        </section>

        {/* SECTION 3: INTERNSHIP */}
        <section id="internship" className="scroll-mt-32">
          <SectionTitle
            badge="Real Student Placements"
            title="Student"
            gradientTitle="Internships & Careers"
            subtitle="Meet our undergraduate scholars actively working and teaching at leading institutions, schools, and academic centers across Cambodia while pursuing their Year 3 degrees."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scholarCardsList.length > 0 ? (
              scholarCardsList.map((intern, idx) => (
                <Card key={idx} glass hoverEffect className="p-6 bg-white border-slate-200 shadow-xl flex flex-col justify-between group overflow-hidden">
                  <div>
                    <div 
                      onClick={() => setSelectedDocImage(intern.image)}
                      className="relative w-full h-64 rounded-2xl overflow-hidden mb-5 bg-slate-100 cursor-pointer border border-slate-200 group-hover:border-bmu-pink transition-colors shadow-sm"
                    >
                      <img src={intern.image} alt={intern.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-yellow-300 text-xs font-bold px-2.5 py-1 rounded-full border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow">
                        <Maximize2 className="w-3 h-3" />
                        <span>Zoom</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider">
                        {intern.stat}
                      </span>
                      <Briefcase className="w-4 h-4 text-bmu-pink" />
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-bmu-pink transition-colors leading-snug">
                      {intern.name}
                    </h3>
                    <div className="text-xs font-bold text-bmu-red uppercase tracking-wider mb-2.5">
                      {intern.role}
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed font-normal">
                      {intern.workplace}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Active Career Integration</span>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                <p className="text-slate-500 font-medium">New student internship placements coming soon.</p>
              </div>
            )}
          </div>

        </section>

        {/* SECTION 4: COMMUNITY SERVICES & VOLUNTEER EXCHANGE */}
        <section id="community-services" className="scroll-mt-32">
          <SectionTitle
            badge="International Exchange & Volunteer Leadership"
            title="Global Education &"
            gradientTitle="Volunteer Appreciation"
            subtitle="Celebrating international academic cooperation, exchange programs, and leadership dedication across ASEAN, China, and Cambodia."
          />

          <div className="space-y-10">
            {communityServices.length > 0 ? (
              communityServices.map((cs) => (
                <Card key={cs._id || cs.id} glass hoverEffect className="p-8 sm:p-12 bg-white border-slate-200 shadow-2xl rounded-3xl overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    {/* Left Column: Photo & Badge */}
                    <div className="lg:col-span-5 flex flex-col space-y-4">
                      <div 
                        onClick={() => setSelectedDocImage(cs.image)}
                        className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 cursor-pointer border border-slate-200 group hover:border-bmu-pink transition-all shadow-md"
                      >
                        <img src={cs.image || volunteerGroup} alt={cs.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur text-yellow-300 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-lg">
                          <span>Zoom Photo</span>
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-1.5 text-bmu-red">
                          <HandHeart className="w-4 h-4" />
                          <span>{cs.programName}</span>
                        </span>
                        <span className="text-slate-400">{cs.duration}</span>
                      </div>
                    </div>

                    {/* Right Column: Appreciation Content */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <div className="space-y-3">
                        {cs.subtitle && (
                          <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 uppercase tracking-wider inline-block">
                            {cs.subtitle}
                          </span>
                        )}
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                          {cs.title}
                        </h3>
                      </div>

                      {cs.acknowledgements && cs.acknowledgements.length > 0 && (
                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                          <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                            <Award className="w-5 h-5 text-bmu-red" />
                            <span>Please respect, thank and deeply appreciate:</span>
                          </h4>
                          <ul className="space-y-3 text-sm text-slate-700 font-medium">
                            {cs.acknowledgements.map((ack, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <div className="w-2 h-2 rounded-full bg-bmu-red mt-1.5 shrink-0" />
                                <span dangerouslySetInnerHTML={{ __html: ack.replace(/^(.*?),/, '<strong>$1</strong>,') }} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal border-l-4 border-bmu-pink pl-4 py-1 whitespace-pre-line">
                        {cs.description}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center text-slate-500 py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                New community services coming soon.
              </div>
            )}
          </div>
        </section>

        {/* Application CTA */}
        <Card glass className="p-8 sm:p-12 bg-gradient-to-r from-bmu-red/15 via-white to-bmu-pink/15 border-slate-300 shadow-xl rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Ready to Join Our Vibrant Innovation Quad?
            </h3>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              Apply today to unlock meritocratic scholarships, Silicon Valley internships, and a lifelong network of changemakers.
            </p>
          </div>
          <Link to="/admission">
            <Button variant="primary" size="lg" icon={ArrowRight} className="shadow-glow-bmu shrink-0">
              Apply for Admission
            </Button>
          </Link>
        </Card>
      </Container>

      {/* FULL-SCREEN LIGHTBOX MODAL FOR OFFICIAL SCHOLARSHIP DOCUMENT VIEW */}
      <AnimatePresence>
        {selectedDocImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDocImage(null)}
            className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/95 backdrop-blur-md p-2 sm:p-6 md:p-10 overflow-y-auto cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 my-4 sm:my-8 cursor-default"
            >
              <div className="sticky top-0 z-30 flex items-center justify-between p-4 px-6 bg-slate-900/95 backdrop-blur text-white border-b border-slate-800 shadow-md">
                <span className="font-bold text-sm sm:text-base flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
                  <span>Official BMU Scholarship Announcement (Full Document View)</span>
                </span>
                <button
                  onClick={() => setSelectedDocImage(null)}
                  className="px-4 py-2 rounded-full bg-bmu-red hover:bg-red-700 text-white font-black text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-lg cursor-pointer shrink-0"
                >
                  <span>Close Full View</span>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-2 sm:p-6 bg-slate-950 flex items-center justify-center overflow-x-auto">
                <img src={selectedDocImage} alt="Official Scholarship Document Full View" className="w-full h-auto max-w-full rounded-xl shadow-2xl block" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentLife;
