import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mail, MapPin, BookOpen, Award, Sparkles, X, ArrowUpRight, Filter, Building2 } from 'lucide-react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import { fetchTeam } from '../services/api';

const Faculty = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedProf, setSelectedProf] = useState(null);
  const [dynamicDeans, setDynamicDeans] = useState([]);

  useEffect(() => {
    fetchTeam().then((data) => {
      if (data && data.length > 0) {
        const deans = data
          .filter((t) => t.roleCategory === 'Faculty & Deans' || t.roleCategory === 'Academic Governance')
          .map((t) => ({
            id: t.id,
            name: t.name,
            title: t.title,
            department: t.department || 'Academic Leadership & Deans',
            specialization: t.message || t.highlight || 'Distinguished Academic & Research Leadership',
            image: t.photoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
            bio: t.bio || t.message || 'Distinguished faculty member and dean at Bonamary University.',
            education: t.education || 'Ph.D. / Advanced Executive Leadership',
            publications: t.publications ?? 35,
            citations: t.citations || '1,800+',
            email: t.email || 'deans@bmu.edu.kh',
            office: t.office || 'Executive Academic Wing',
          }));
        setDynamicDeans(deans);
      }
    });
  }, []);

  const departments = [
    'All',
    'Academic Leadership & Deans',
    'Faculty of Law and Social Sciences',
    'Faculty of Business Administration and Tourism',
    'Faculty of Technology and Science',
    'Faculty of Engineering and Architecture',
    'Faculty of Education and Languages',
    'School of Computing & Digital Skilling',
  ];

  const filteredFaculty = useMemo(() => {
    const combined = dynamicDeans;
    return combined.filter((prof) => {
      const matchesSearch =
        prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.bio.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = selectedDept === 'All' || prof.department === selectedDept;

      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDept, dynamicDeans]);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-bmu-bg relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-bmu-red/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-bmu-pink/10 rounded-full blur-[130px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/80 border border-slate-200 text-xs font-bold uppercase tracking-wider text-bmu-pink mb-4 shadow-glow-red">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Academic Leadership & Mentorship</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Meet Our <span className="text-gradient-bmu">Distinguished</span> Faculty
          </h1>
          <p className="text-slate-700 text-lg sm:text-xl font-normal leading-relaxed">
            Be mentored by leading academic scholars, researchers, and industry professionals dedicated to academic excellence across our five National Faculties and International Work-Study programs.
          </p>
        </div>

        {/* Search & Department Filter Bar */}
        <div className="mb-12 space-y-6 bg-bmu-surface/80 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty by name, department, or research specialization (e.g., Law, Business, AI, Architecture)..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/90 shadow-sm border border-slate-300/80 text-slate-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:border-bmu-pink focus:ring-2 focus:ring-bmu-pink/20 transition-all font-medium"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedDept === dept
                    ? 'bg-gradient-to-r from-bmu-red to-bmu-pink text-white shadow-glow-red'
                    : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {dept === 'All' ? 'All Departments' : dept.split('(')[0].replace('Department of ', '').replace('School of ', '').replace('Institute of ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredFaculty.map((prof, idx) => (
            <motion.div
              key={prof.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="h-full"
            >
              <Card
                glass
                hoverEffect
                className="h-full flex flex-col justify-between p-6 bg-bmu-card/70 border-slate-200 hover:border-bmu-pink/40 group cursor-pointer"
                onClick={() => setSelectedProf(prof)}
              >
                <div>
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-5 border border-slate-200">
                    <img
                      src={prof.image}
                      alt={prof.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-bmu-red/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider">
                        {prof.title.split('&')[0]}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 group-hover:text-bmu-pink transition-colors">
                    {prof.name}
                  </h3>
                  <div className="text-xs font-bold text-bmu-pink mb-3">
                    {prof.specialization}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-6 line-clamp-3 font-normal">
                    {prof.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-mono">
                    <BookOpen className="w-3.5 h-3.5 text-bmu-red" />
                    {prof.publications} Papers
                  </span>
                  <span className="flex items-center gap-1 text-bmu-pink font-bold group-hover:translate-x-1 transition-transform">
                    <span>View Research Profile</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Professor Profile Modal */}
      <AnimatePresence>
        {selectedProf && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProf(null)}
              className="fixed inset-0 bg-white/95 shadow-md backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-3xl bg-bmu-card border border-slate-300 rounded-3xl shadow-glow-bmu overflow-hidden z-10 max-h-[90vh] flex flex-col text-left"
            >
              <div className="p-6 sm:p-8 bg-gradient-to-r from-bmu-red/30 via-black to-bmu-pink/30 border-b border-slate-200 relative">
                <button
                  onClick={() => setSelectedProf(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-200/80 hover:bg-white/20 text-slate-900 border border-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <img src={selectedProf.image} alt={selectedProf.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-bmu-pink shadow-glow-red shrink-0 object-top" />
                  <div>
                    <span className="px-3 py-1 rounded-full bg-bmu-pink/20 border border-bmu-pink/40 text-bmu-pink text-xs font-bold uppercase mb-2 inline-block">
                      {selectedProf.department}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{selectedProf.name}</h2>
                    <p className="text-sm font-semibold text-slate-700">{selectedProf.title}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-center">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-600">Education</div>
                    <div className="text-xs font-extrabold text-slate-900 mt-1">{selectedProf.education || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-600">Publications</div>
                    <div className="text-base font-black text-bmu-pink mt-1">{selectedProf.publications}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-600">Citations</div>
                    <div className="text-base font-black text-bmu-red mt-1">{selectedProf.citations}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-600">Office</div>
                    <div className="text-xs font-bold text-slate-900 mt-1">{selectedProf.office}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2">Biography of BMU</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{selectedProf.bio}</p>
                </div>

                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Mail className="w-4 h-4 text-bmu-pink" />
                    <span className="font-mono text-slate-900">{selectedProf.email}</span>
                  </div>
                  <button onClick={() => setSelectedProf(null)} className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-200 text-slate-900 text-sm font-bold border border-slate-300">
                    Close Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Faculty;
