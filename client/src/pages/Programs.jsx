import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Sparkles, BookOpen, Cpu, Award, ArrowRight, X, Loader2, Globe, Building2, CheckCircle2 } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import ProgramCard from '../components/ProgramCard';
import ProgramModal from '../components/ProgramModal';
import { fetchPrograms, fetchFaculties } from '../services/api';
import educlaasIntroImg from '../assets/educlaas-intro.png';
import educlaasDegreesImg from '../assets/educlaas-degrees.png';
import educlaasProgramsImg from '../assets/educlaas-programs.png';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [intlGalleryList, setIntlGalleryList] = useState([]);

  useEffect(() => {
    fetch('/api/v1/settings/international_gallery')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.slides && data.data.slides.length > 0) {
          setIntlGalleryList(data.data.slides);
        }
      })
      .catch(err => console.error('Failed to load international gallery:', err));
  }, []);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScope, setSelectedScope] = useState('All'); // 'All' | 'International' | 'National'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDegree, setSelectedDegree] = useState('All');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const location = useLocation();

  const categories = ['All', 'Computer Science', 'Digital Business', 'Software Engineering', 'Business Management', 'Law & Social Sciences', 'Engineering', 'Education & Languages', 'Artificial Intelligence', 'Cybersecurity'];
  const degrees = ['All', 'Undergraduate', 'Graduate', 'Doctoral'];

  // Listen to URL hash for International vs National scope filtering from Navbar dropdown
  useEffect(() => {
    if (location.hash === '#international') {
      setSelectedScope('International');
    } else if (location.hash === '#national') {
      setSelectedScope('National');
    } else {
      setSelectedScope('All');
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const getProgramsData = async () => {
      setLoading(true);
      const data = await fetchPrograms();
      setPrograms(data);
      const facData = await fetchFaculties();
      if (facData) setFaculties(facData);
      setLoading(false);
    };
    getProgramsData();
  }, []);

  // Filter logic
  const intFaculties = faculties.filter(f => f.scope === 'International Academic Programs');
  const natFaculties = faculties.filter(f => f.scope !== 'International Academic Programs');

const allMajors = useMemo(() => {
    let majors = [];
    faculties.forEach(fac => {
      if (fac.majors && Array.isArray(fac.majors)) {
        fac.majors.forEach(m => {
          majors.push({
            ...m,
            department: fac.name,
            scope: fac.scope === 'International Academic Programs' ? 'International' : 'National',
            category: 'All' // Fallback since category doesn't exist on Faculty schema
          });
        });
      }
    });
    return majors;
  }, [faculties]);

  const filteredPrograms = useMemo(() => {
    return allMajors.filter((prog) => {
      const titleMatch = prog.title ? prog.title.toLowerCase().includes(searchQuery.toLowerCase()) : false;
      const deptMatch = prog.department ? prog.department.toLowerCase().includes(searchQuery.toLowerCase()) : false;
      const descMatch = prog.description ? prog.description.toLowerCase().includes(searchQuery.toLowerCase()) : false;
      
      const highlightsMatch = (prog.curriculumHighlights || []).some((h) => 
        h ? h.toLowerCase().includes(searchQuery.toLowerCase()) : false
      );

      const matchesSearch = titleMatch || deptMatch || descMatch || highlightsMatch;

      const matchesScope = selectedScope === 'All' || prog.scope === selectedScope;
      const matchesCategory = selectedCategory === 'All' || prog.category === selectedCategory;
      const matchesDegree = selectedDegree === 'All' || prog.degree === selectedDegree;

      return matchesSearch && matchesScope && matchesCategory && matchesDegree;
    });
  }, [allMajors, searchQuery, selectedScope, selectedCategory, selectedDegree]);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-bmu-bg relative overflow-hidden text-left">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-bmu-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-[600px] h-[600px] bg-bmu-pink/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Explore <span className="text-gradient-bmu">Academic Programs</span>
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed">
            Choose between our world-renowned <strong className="text-slate-900">International Academic Programs</strong> (featuring 2-Year Work-Study Bachelor's Degrees in collaboration with eduCLaaS Singapore, University of Roehampton UK, and UCAM) and <strong className="text-slate-900">National Academic Programs</strong> designed for Cambodian leadership and digital excellence.
          </p>
        </div>

        {/* SCOPE SWITCHER BANNER (International vs National) */}
        <div id="international" className="scroll-mt-32">
          <div id="national" className="scroll-mt-32">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-2 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-4xl mx-auto">
              {[
                { id: 'All', label: 'All Academic Programs', icon: BookOpen, desc: 'View complete university catalog' },
                { id: 'International', label: 'International Academic Programs', icon: Globe, desc: '2-Year Work-Study Bachelor\'s Degrees' },
                { id: 'National', label: 'National Academic Programs', icon: Building2, desc: 'Cambodian Leadership & Tech Tracks' },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = selectedScope === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedScope(tab.id);
                      window.history.pushState(null, '', tab.id === 'All' ? '/programs' : `/programs#${tab.id.toLowerCase()}`);
                    }}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all text-center group cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-bmu-red to-bmu-pink text-white shadow-glow-red scale-[1.02]'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-100'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-600 group-hover:text-bmu-red shadow-sm'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-sm mb-0.5">{tab.label}</span>
                    <span className={`text-[11px] leading-tight ${isActive ? 'text-white/90' : 'text-slate-500'}`}>{tab.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* EDUCLAAS PARTNERSHIP & WORK-STUDY DEGREE SHOWCASE */}
        {(selectedScope === 'All' || selectedScope === 'International') && (
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#5a1035] text-white p-8 sm:p-14 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Ambient glow inside card */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-bmu-pink/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-10">
              {/* Title & Overview */}
              <div className="max-w-4xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider text-rose-300">
                  <Globe className="w-3.5 h-3.5 text-rose-400" />
                  <span>In Collaboration with eduCLaaS Singapore</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  Work-Study International <span className="text-gradient-bmu">Bachelor's Degrees</span>
                </h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                  Bonamary University (BMU) in Phnom Penh has partnered with <strong className="text-white">eduCLaaS</strong>, a Pan-Asia digital skilling platform, to offer an innovative Work-Study Degree (WSD) program designed to equip students with both academic knowledge and practical industry experience.
                </p>
              </div>

              {/* 3 Pillar Cards: Overview, Highlights, Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4 hover:bg-white/15 transition duration-300">
                  <div className="w-12 h-12 rounded-xl bg-bmu-red/30 flex items-center justify-center text-rose-300 font-bold">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Program Overview</h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    <li><strong className="text-white">Integrated Learning Approach:</strong> Combines academic studies with real-world work experience in professional settings.</li>
                    <li><strong className="text-white">International Degrees:</strong> Earn degrees from internationally recognized institutions, including University of Roehampton UK and eduCLaaS Singapore.</li>
                    <li><strong className="text-white">English-Medium Instruction:</strong> All courses conducted in English, preparing students for global careers.</li>
                    <li><strong className="text-white">Work-Based Learning:</strong> Hands-on experience through internships and projects with international companies, earning income while studying.</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4 hover:bg-white/15 transition duration-300">
                  <div className="w-12 h-12 rounded-xl bg-bmu-pink/30 flex items-center justify-center text-rose-300 font-bold">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Curriculum Highlights</h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    <li><strong className="text-white">Competency-Based Education:</strong> Focuses on developing specific skills aligned with industry needs, ensuring graduates are job-ready.</li>
                    <li><strong className="text-white">Blended Learning:</strong> A mix of online modules, live classes, and mentoring sessions provides a flexible and comprehensive learning experience.</li>
                    <li><strong className="text-white">Accelerated Pathway:</strong> Complete your bachelor's degree in a shorter time frame (2-Year Bachelor's Degrees) compared to traditional programs, entering the workforce sooner.</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4 hover:bg-white/15 transition duration-300">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-300 font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Additional Benefits</h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    <li><strong className="text-white">Scholarship Opportunities:</strong> BMU offers scholarships for eligible students, making quality education more accessible.</li>
                    <li><strong className="text-white">Global Exposure:</strong> Students may participate in study tours and exchange programs, gaining international experience.</li>
                    <li><strong className="text-white">Career Support:</strong> Includes job placement assistance, helping graduates secure positions in the digital economy.</li>
                  </ul>
                </div>
              </div>

              {/* Bottom Summary & Uploaded Images Showcase */}
              <div className="space-y-6 pt-6 border-t border-white/10">
                <p className="text-sm sm:text-base text-slate-300 italic max-w-4xl font-normal">
                  "This collaboration between BMU and eduCLaaS represents a commitment to developing a skilled digital workforce in Cambodia and beyond, aligning education with the evolving demands of the global job market."
                </p>

                {/* Uploaded Images Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {intlGalleryList.length > 0 ? (
                    intlGalleryList.map(img => (
                      <div key={img.id} className="group relative overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl bg-white/5">
                        <img src={img.imageUrl} alt={img.title} className="w-full h-auto object-cover group-hover:scale-105 transition duration-500" />
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="group relative overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl bg-white/5">
                        <img src={educlaasIntroImg} alt="Introducing eduCLaaS Pan-Asia Digital Platform" className="w-full h-auto object-cover group-hover:scale-105 transition duration-500" />
                      </div>
                      <div className="group relative overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl bg-white/5">
                        <img src={educlaasDegreesImg} alt="Work-Study International Bachelors Degree Majors" className="w-full h-auto object-cover group-hover:scale-105 transition duration-500" />
                      </div>
                      <div className="group relative overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl bg-white/5">
                        <img src={educlaasProgramsImg} alt="Our Programs at eduCLaaS" className="w-full h-auto object-cover group-hover:scale-105 transition duration-500" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Dynamic International Faculties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 mt-8 border-t border-white/10">
                <div className="col-span-full">
                  <h3 className="text-2xl font-bold text-white mb-2">Explore International Faculties</h3>
                  <p className="text-slate-300 text-sm">Discover our specialized schools offering global degrees.</p>
                </div>
                {intFaculties.map((faculty) => (
                  <Link 
                    to={`/programs/faculty/${faculty.id || faculty._id}`} 
                    key={faculty.id || faculty._id} 
                    className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4 hover:bg-white/20 transition duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-44 w-full rounded-xl overflow-hidden relative mb-4 bg-slate-800">
                        {faculty.image || faculty.deanPhoto ? (
                          <img
                            src={faculty.image || faculty.deanPhoto}
                            alt={faculty.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-white/50">
                            <Globe className="w-10 h-10 mb-2 opacity-50" />
                            <span className="text-xs font-bold uppercase tracking-wider">No Photo</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">{faculty.name}</h3>
                      <p className="text-sm text-slate-300 line-clamp-2">
                        {faculty.majors?.length || 0} Academic Majors Available
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/10 mt-auto flex items-center justify-between text-xs font-bold text-rose-300 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      <span>View Faculty Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
                {intFaculties.length === 0 && !loading && (
                  <div className="col-span-full py-10 text-center text-white/60 text-sm">
                    No International Faculties found.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* NATIONAL ACADEMIC PROGRAMS & CAMBODIAN FACULTIES SHOWCASE */}
        {(selectedScope === 'All' || selectedScope === 'National') && (
          <div className="bg-gradient-to-br from-slate-900 via-[#1e293b] to-[#7b1e4a] text-white p-8 sm:p-14 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Ambient glow inside card */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-bmu-red/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-10">
              {/* Title & Overview */}
              <div className="max-w-4xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider text-rose-300">
                  <Building2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>National Academic Programs</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  Excellence in <span className="text-gradient-bmu">Cambodian Higher Education</span>
                </h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                  National Academics in Cambodia play a vital role in the country's educational framework, focusing on higher education, research, and the promotion of academic excellence. These institutions aim to develop skilled professionals and contribute to the nation’s socio-economic development.
                </p>
              </div>

              {/* Dynamic Faculties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {natFaculties.map((faculty) => (
                  <Link 
                    to={`/programs/faculty/${faculty.id || faculty._id}`} 
                    key={faculty.id || faculty._id} 
                    className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4 hover:bg-white/20 transition duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-44 w-full rounded-xl overflow-hidden relative mb-4 bg-slate-800">
                        {faculty.image || faculty.deanPhoto ? (
                          <img
                            src={faculty.image || faculty.deanPhoto}
                            alt={faculty.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-white/50">
                            <Building2 className="w-10 h-10 mb-2 opacity-50" />
                            <span className="text-xs font-bold uppercase tracking-wider">No Photo</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">{faculty.name}</h3>
                      <p className="text-sm text-slate-300 line-clamp-2">
                        {faculty.majors?.length || 0} Academic Majors Available
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/10 mt-auto flex items-center justify-between text-xs font-bold text-rose-300 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      <span>View Faculty Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
                {natFaculties.length === 0 && !loading && (
                  <div className="col-span-full py-10 text-center text-white/60 text-sm">
                    No National Faculties found.
                  </div>
                )}
              </div>

              {/* Bottom Summary */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-sm sm:text-base text-slate-300 italic max-w-4xl font-normal">
                  "Our National Academic Programs are rigorously structured to meet national quality frameworks and ACC standards, fostering intellectual curiosity, professional ethics, and leadership across all five faculties."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filter & Search Dashboard */}
        <div className="space-y-6 bg-white/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by degree title, research topic, or skill (e.g., Computer Science, Law, Digital Business, Architecture)..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 shadow-inner border border-slate-200 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-bmu-pink focus:ring-2 focus:ring-bmu-pink/20 transition-all font-medium"
            />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase text-slate-500 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-bmu-red" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Degree Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase text-slate-500 mr-2">Degree:</span>
              {degrees.map((deg) => (
                <button
                  key={deg}
                  onClick={() => setSelectedDegree(deg)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedDegree === deg
                      ? 'bg-bmu-red text-white font-extrabold shadow-glow-red'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {deg}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Scope Banner Indicator */}
        {selectedScope !== 'All' && (
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 text-white shadow-lg border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-bmu-red to-bmu-pink flex items-center justify-center text-white">
                {selectedScope === 'International' ? <Globe className="w-5 h-5 animate-spin-slow" /> : <Building2 className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">
                  Showing {selectedScope} Academic Programs ({filteredPrograms.length})
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedScope === 'International'
                    ? '2-Year Work-Study Bachelor\'s Degrees in partnership with eduCLaaS Singapore, University of Roehampton UK, and UCAM.'
                    : 'Cambodian national degree programs aligned with MOEYS and ACC education quality standards.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedScope('All');
                window.history.pushState(null, '', '/programs');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer shrink-0"
            >
              Show All Programs
            </button>
          </div>
        )}

        {/* Loading Indicator */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 text-bmu-pink animate-spin mx-auto mb-4" />
            <div className="text-slate-900 font-bold text-lg">Loading Academic Programs...</div>
          </div>
        ) : (
          /* Programs Grid */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((prog) => (
                  <ProgramCard
                    key={prog.id}
                    program={prog}
                    onSelect={(p) => setSelectedProgram(p)}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-lg"
                >
                  <Cpu className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-slate-900 mb-1">No Academic Programs Found</h3>
                  <p className="text-slate-600 text-sm">Try adjusting your search query or switching between International and National scopes.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>

      {/* Program Detail Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <ProgramModal
            program={selectedProgram}
            onClose={() => setSelectedProgram(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Programs;
