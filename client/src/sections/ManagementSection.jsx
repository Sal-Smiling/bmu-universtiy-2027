import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Users, Award, ShieldCheck, Sparkles, Globe, GraduationCap, Facebook, Mail, ArrowRight, Star } from 'lucide-react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import { fetchTeam } from '../services/api';

// Import Management Team photos
import team1 from '../assets/team-1.jpg';
import team2 from '../assets/team-2.jpg';
import team3 from '../assets/team-3.png';
import team4 from '../assets/team-4.png';
import team5 from '../assets/team-5.jpg';
import team6 from '../assets/team-6.png';

const ManagementSection = () => {
  const { t } = useTranslation();
  const defaultTopExecutives = [
    {
      id: 'team-bona',
      name: 'H.E. Dr. SENG Bona',
      title: 'Founder and Chairman',
      badge: 'Executive Leadership',
      image: team1,
      desc: 'Visionary architect of BMU University, dedicated to fostering academic excellence, innovation, and global educational standards across Cambodia and beyond.',
      highlight: 'Institutional Founder',
      color: 'from-amber-500/20 via-red-500/10 to-transparent',
      borderColor: 'hover:border-amber-400/50',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      facebook: 'https://facebook.com/bonamary',
      email: 'info@bonamary.edu.kh',
    },
    {
      id: 'team-porguech',
      name: 'UNG Porguech',
      title: 'Co-founder and President',
      badge: 'Executive Leadership',
      image: team2,
      desc: 'Guiding the university\'s strategic advancement, institutional integrity, and transformative educational mission for the next generation of global leaders.',
      highlight: 'University President',
      color: 'from-bmu-red/20 via-pink-500/10 to-transparent',
      borderColor: 'hover:border-bmu-red/50',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      facebook: 'https://facebook.com/bonamary',
      email: 'info@bonamary.edu.kh',
    },
  ];

  const defaultSeniorLeadership = [
    {
      id: 'team-channareth',
      name: 'VIN Channareth',
      title: 'Vice-president',
      badge: 'University Administration',
      image: team3,
      desc: 'Overseeing university operations, strategic development, and institutional growth across all faculties and administrative divisions.',
      color: 'from-blue-500/10 via-indigo-500/5 to-transparent',
      borderColor: 'hover:border-blue-400/50',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      facebook: 'https://facebook.com/bonamary',
      email: 'info@bonamary.edu.kh',
    },
    {
      id: 'team-eves',
      name: 'Ms. Linda Anne Eves',
      title: 'Senior Advisor, Academic Affairs',
      badge: 'Academic Governance',
      image: team4,
      desc: 'Advancing curriculum innovation, international accreditation standards, and pedagogical excellence across all undergraduate and postgraduate programs.',
      color: 'from-purple-500/10 via-pink-500/5 to-transparent',
      borderColor: 'hover:border-purple-400/50',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      facebook: 'https://facebook.com/bonamary',
      email: 'info@bonamary.edu.kh',
    },
    {
      id: 'team-claire',
      name: 'Ms. Claire de la Mer',
      title: 'Director of International Collaborations',
      badge: 'Global Diplomacy',
      image: team5,
      desc: 'Spearheading worldwide university partnerships, student exchange programs, dual-degree pathways, and international research alliances.',
      color: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      borderColor: 'hover:border-emerald-400/50',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      facebook: 'https://facebook.com/bonamary',
      email: 'info@bonamary.edu.kh',
    },
    {
      id: 'team-rhean',
      name: 'Ms. Rhean Ongican',
      title: 'Head of Student Services',
      badge: 'Student Welfare & Success',
      image: team6,
      desc: 'Leading comprehensive student support, campus life initiatives, career development services, and international student integration.',
      color: 'from-amber-500/10 via-orange-500/5 to-transparent',
      borderColor: 'hover:border-amber-400/50',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      facebook: 'https://facebook.com/bonamary',
      email: 'info@bonamary.edu.kh',
    },
  ];

  const [topExecutives, setTopExecutives] = useState(defaultTopExecutives);
  const [seniorLeadership, setSeniorLeadership] = useState(defaultSeniorLeadership);

  useEffect(() => {
    const loadLiveTeam = async () => {
      try {
        const teamData = await fetchTeam();
        if (teamData && Array.isArray(teamData) && teamData.length > 0) {
          const topColors = [
            { color: 'from-amber-500/20 via-red-500/10 to-transparent', borderColor: 'hover:border-amber-400/50', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
            { color: 'from-bmu-red/20 via-pink-500/10 to-transparent', borderColor: 'hover:border-bmu-red/50', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' },
          ];
          const seniorColors = [
            { color: 'from-blue-500/10 via-indigo-500/5 to-transparent', borderColor: 'hover:border-blue-400/50', badgeColor: 'bg-blue-100 text-blue-800 border-blue-200' },
            { color: 'from-purple-500/10 via-pink-500/5 to-transparent', borderColor: 'hover:border-purple-400/50', badgeColor: 'bg-purple-100 text-purple-800 border-purple-200' },
            { color: 'from-emerald-500/10 via-teal-500/5 to-transparent', borderColor: 'hover:border-emerald-400/50', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
            { color: 'from-amber-500/10 via-orange-500/5 to-transparent', borderColor: 'hover:border-amber-400/50', badgeColor: 'bg-amber-100 text-amber-800 border-amber-200' }
          ];

          const liveTop = teamData
            .filter((m) => m.roleCategory === 'Executive Leadership' || m.roleCategory === 'Message from Leadership' || m.highlight === 'Institutional Founder' || m.highlight === 'University President' || m.name?.includes('SENG Bona') || m.name?.includes('Porguech'))
            .map((m, idx) => {
              const style = topColors[idx % topColors.length];
              return {
                id: m.id,
                name: m.name,
                title: m.title,
                badge: m.roleCategory || 'Executive Leadership',
                image: m.photoUrl || (idx === 0 ? team1 : team2),
                desc: m.message || m.bio || '',
                highlight: m.highlight || (idx === 0 ? 'Institutional Founder' : 'University President'),
                color: style.color,
                borderColor: style.borderColor,
                badgeColor: style.badgeColor,
                facebook: m.facebook || 'https://facebook.com/bonamary',
                email: m.email || 'info@bonamary.edu.kh'
              };
            });

          const liveSenior = teamData
            .filter((m) => m.roleCategory === 'University Administration' || m.roleCategory === 'Academic Governance' || m.roleCategory === 'Global Diplomacy' || m.roleCategory === 'Student Welfare & Success' || m.roleCategory === 'Our Management Team' || m.name?.includes('Channareth') || m.name?.includes('Eves') || m.name?.includes('Claire') || m.name?.includes('Rhean'))
            .map((m, idx) => {
              const style = seniorColors[idx % seniorColors.length];
              const defaultImgs = [team3, team4, team5, team6];
              return {
                id: m.id,
                name: m.name,
                title: m.title,
                badge: m.roleCategory || 'BMU Leadership',
                image: m.photoUrl || defaultImgs[idx % defaultImgs.length],
                desc: m.message || m.bio || '',
                color: style.color,
                borderColor: style.borderColor,
                badgeColor: style.badgeColor,
                facebook: m.facebook || 'https://facebook.com/bonamary',
                email: m.email || 'info@bonamary.edu.kh'
              };
            });

          if (liveTop.length > 0) setTopExecutives(liveTop);
          if (liveSenior.length > 0) setSeniorLeadership(liveSenior);
        }
      } catch (err) {
        console.warn('Failed to load live team in ManagementSection:', err);
      }
    };
    loadLiveTeam();
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-bmu-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-bmu-pink/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <SectionTitle
          badge="University Leadership"
          title="Our Management"
          gradientTitle="Team"
          subtitle="Meet the distinguished educators, visionary founders, and global leaders guiding BMU University toward academic excellence and international recognition."
          align="center"
        />

        {/* TOP EXECUTIVES (2-COLUMN FEATURED GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {topExecutives.map((exec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <Card
                glass
                hoverEffect
                className={`p-0 overflow-hidden bg-white/90 border border-slate-200/80 shadow-xl transition-all duration-500 group ${exec.borderColor} flex flex-col sm:flex-row h-full`}
              >
                {/* Photo Container */}
                <div className="sm:w-1/2 relative overflow-hidden bg-slate-100 min-h-[320px] sm:min-h-full">
                  <img
                    src={exec.image}
                    alt={exec.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r ${exec.color} opacity-60 group-hover:opacity-30 transition-opacity`} />
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm ${exec.badgeColor}`}>
                      {exec.badge}
                    </span>
                  </div>
                </div>

                {/* Bio & Details Container */}
                <div className="sm:w-1/2 p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{exec.highlight}</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-bmu-red transition-colors mb-1">
                      {exec.name}
                    </h3>
                    <p className="text-sm font-extrabold text-gradient-bmu mb-4">
                      {exec.title}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {exec.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold text-slate-500">BMU Executive Board</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={exec.facebook || 'https://facebook.com/bonamary'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-slate-50 hover:bg-[#1877F2] hover:text-white transition-colors text-slate-600 shadow-sm inline-flex items-center justify-center"
                        aria-label="Facebook Profile"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                      <a
                        href={exec.email && exec.email.includes('@') ? `mailto:${exec.email}` : `mailto:info@bonamary.edu.kh`}
                        className="p-2 rounded-full bg-slate-50 hover:bg-bmu-pink hover:text-white transition-colors text-slate-600 shadow-sm inline-flex items-center justify-center"
                        aria-label="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* SENIOR LEADERSHIP (4-COLUMN GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {seniorLeadership.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.15 }}
              className="h-full"
            >
              <Card
                glass
                hoverEffect
                className={`p-0 overflow-hidden bg-white/90 border border-slate-200/80 shadow-lg transition-all duration-500 group ${leader.borderColor} flex flex-col h-full`}
              >
                {/* Photo Container */}
                <div className="relative aspect-[4/4.5] overflow-hidden bg-slate-100">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${leader.color} opacity-70 group-hover:opacity-40 transition-opacity`} />
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${leader.badgeColor}`}>
                      {leader.badge}
                    </span>
                  </div>
                </div>

                {/* Bio & Details Container */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-bmu-red transition-colors mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-extrabold text-gradient-bmu uppercase tracking-wider mb-3">
                      {leader.title}
                    </p>
                    <p className="text-slate-600 text-xs leading-relaxed font-normal">
                      {leader.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400">
                    <span className="text-[11px] font-semibold text-slate-500">BMU Leadership</span>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={leader.facebook || 'https://facebook.com/bonamary'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-slate-50 hover:bg-[#1877F2] hover:text-white transition-colors text-slate-600 shadow-sm inline-flex items-center justify-center"
                        aria-label="Facebook Profile"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={leader.email && leader.email.includes('@') ? `mailto:${leader.email}` : `mailto:info@bonamary.edu.kh`}
                        className="p-1.5 rounded-full bg-slate-50 hover:bg-bmu-pink hover:text-white transition-colors text-slate-600 shadow-sm inline-flex items-center justify-center"
                        aria-label="Send Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ManagementSection;
