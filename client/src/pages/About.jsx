import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Cpu, Globe, Users, CheckCircle2, ArrowRight, Sparkles, Building2, BookOpen, Compass, Target, HelpCircle, UserCheck, Clock, Heart, Zap, Check, Star, Quote } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import presidentImg from '../assets/president.jpg';
import team1 from '../assets/team-1.jpg';
import team2 from '../assets/team-2.jpg';
import team3 from '../assets/team-3.png';
import team4 from '../assets/team-4.png';
import team5 from '../assets/team-5.jpg';
import team6 from '../assets/team-6.png';
import { fetchTeam } from '../services/api';

const About = () => {
  const location = useLocation();
  const defaultTeamMembers = [
    {
      id: 'team-bona',
      name: 'H.E. Dr. SENG Bona',
      title: 'Founder and Chairman',
      roleCategory: 'Executive Leadership',
      highlight: 'Institutional Founder',
      photoUrl: team1,
      message: 'Visionary architect of BMU University, dedicated to fostering academic excellence, innovation, and global educational standards across Cambodia and beyond.',
      bio: 'Visionary architect of BMU University, dedicated to fostering academic excellence, innovation, and global educational standards across Cambodia and beyond.',
      order: 1
    },
    {
      id: 'team-porguech',
      name: 'UNG Porguech',
      title: 'Co-founder and President',
      roleCategory: 'Executive Leadership',
      highlight: 'University President',
      photoUrl: team2,
      message: 'Guiding the university\'s strategic advancement, institutional integrity, and transformative educational mission for the next generation of global leaders.',
      bio: 'Guiding the university\'s strategic advancement, institutional integrity, and transformative educational mission for the next generation of global leaders.',
      order: 2
    },
    {
      id: 'team-channareth',
      name: 'VIN Channareth',
      title: 'Vice-president',
      roleCategory: 'University Administration',
      highlight: 'BMU Leadership',
      photoUrl: team3,
      message: 'Overseeing university operations, strategic development, and institutional growth across all faculties and administrative divisions.',
      bio: 'Overseeing university operations, strategic development, and institutional growth across all faculties and administrative divisions.',
      order: 3
    },
    {
      id: 'team-eves',
      name: 'Ms. Linda Anne Eves',
      title: 'Senior Advisor, Academic Affairs',
      roleCategory: 'Academic Governance',
      highlight: 'BMU Leadership',
      photoUrl: team4,
      message: 'Advancing curriculum innovation, international accreditation standards, and pedagogical excellence across all undergraduate and postgraduate programs.',
      bio: 'Advancing curriculum innovation, international accreditation standards, and pedagogical excellence across all undergraduate and postgraduate programs.',
      order: 4
    },
    {
      id: 'team-claire',
      name: 'Ms. Claire de la Mer',
      title: 'Director of International Collaborations',
      roleCategory: 'Global Diplomacy',
      highlight: 'BMU Leadership',
      photoUrl: team5,
      message: 'Spearheading worldwide university partnerships, student exchange programs, dual-degree pathways, and international research alliances.',
      bio: 'Spearheading worldwide university partnerships, student exchange programs, dual-degree pathways, and international research alliances.',
      order: 5
    },
    {
      id: 'team-rhean',
      name: 'Ms. Rhean Ongican',
      title: 'Head of Student Services',
      roleCategory: 'Student Welfare & Success',
      highlight: 'BMU Leadership',
      photoUrl: team6,
      message: 'Leading comprehensive student support, campus life initiatives, career development services, and international student integration.',
      bio: 'Leading comprehensive student support, campus life initiatives, career development services, and international student integration.',
      order: 6
    }
  ];
  const [teamMembers, setTeamMembers] = useState(defaultTeamMembers);

  useEffect(() => {
    fetchTeam().then((data) => {
      if (data && Array.isArray(data) && data.length > 0) {
        setTeamMembers(data);
      }
    }).catch(err => console.warn('Failed to fetch live team inside About.jsx:', err));
  }, []);

  // Smooth scroll to hash section when URL changes or on initial load
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const yOffset = -100; // Account for fixed navbar
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  const timeline = [
    { year: '2013', title: 'True VISIONS Family Established', desc: 'Dr. SENG Bona and Madam MAM Mary founded True VISIONS International Schools in Phnom Penh, Cambodia, building a foundation of academic excellence.' },
    { year: '2024', title: 'Official Royal Recognition', desc: 'Received official recognition through Sub-Decree Number 100, dated April 23, 2024, issued by the Royal Government of Cambodia and signed by Samdech Moha Borvor Thipadei HUN Manet, Prime Minister.' },
    { year: '2024+', title: 'Bonamary University Founded', desc: 'Propelled by remarkable growth and community support, extended their educational vision to the tertiary level to enhance Cambodia\'s educational landscape.' },
    { year: 'Global', title: 'International Pathways & Standards', desc: 'Providing Cambodian and international students with premier standards and articulation pathways to Australia, the USA, the UK, China, Japan, Korea, and beyond.' },
    { year: 'Future', title: 'Fostering Global Leaders', desc: 'Inspiring learners with an entrepreneurial mindset to emerge as global leaders committed to advancing humanity, safeguarding the planet, and achieving wisdom accompanied by virtue.' },
  ];

  const coreValues = [
    {
      icon: UserCheck,
      title: 'Ownership',
      desc: 'We cultivate a culture of pride and dedication, encouraging each member of our community to take ownership of their roles and responsibilities. Through this sense of ownership, we foster a collective commitment to the success and growth of our institution.',
      color: 'from-bmu-red/20 to-bmu-pink/20 text-bmu-red border-bmu-pink/30'
    },
    {
      icon: ShieldCheck,
      title: 'Accountability',
      desc: 'Upholding the principles of transparency and responsibility, we hold ourselves accountable for our actions and decisions. By being answerable to our stakeholders, we build trust and integrity in all facets of our educational endeavors.',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-600 border-emerald-500/30'
    },
    {
      icon: Sparkles,
      title: 'Creativity',
      desc: 'Embracing innovation and original thinking as cornerstones of progress, we encourage a culture of creativity. We believe that fostering creative minds is fundamental to addressing complex challenges and driving positive change.',
      color: 'from-amber-500/20 to-orange-500/20 text-amber-600 border-amber-500/30'
    },
    {
      icon: Users,
      title: 'Team Spirit',
      desc: 'Recognizing the strength in collaboration, we foster a sense of unity and cooperation. Through a collective team spirit, we aim to create an inclusive environment where diverse perspectives converge, leading to shared achievements.',
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-600 border-blue-500/30'
    }
  ];

  const selfImagePillars = [
    { num: '01', title: 'A Collaborative Multinational University', icon: Globe },
    { num: '02', title: 'A Pathway to Global Careers', icon: Compass },
    { num: '03', title: 'Leading in Entrepreneurial Mindset Development', icon: Zap },
    { num: '04', title: 'A Preferred Destination for International Students in Cambodia', icon: Building2 },
  ];

  const strategicGoals = [
    { num: '01', title: 'Strengthening Governance and Management', category: 'Leadership & Policy' },
    { num: '02', title: 'Enhancing the IQA System', category: 'Internal Quality Assurance' },
    { num: '03', title: 'Improving Administrative and HR Affairs', category: 'Operations & People' },
    { num: '04', title: 'Enhancing Financial Affairs', category: 'Sustainable Growth' },
    { num: '05', title: 'Improving Academic Affairs', category: 'Curriculum & Faculty' },
    { num: '06', title: 'Advancing Digital and Information Technology', category: 'Modern Infrastructure' },
    { num: '07', title: 'Strengthening Marketing Efforts', category: 'Outreach & Brand' },
    { num: '08', title: 'Expanding Local and International Relations', category: 'Global Partnerships' },
  ];

  const whyBmuReasons = [
    { title: 'Commitment to Academic Excellence', desc: 'We prioritize academic excellence by recruiting highly qualified faculty.' },
    { title: 'Modern Infrastructure', desc: 'Our facilities provide a conducive learning environment.' },
    { title: 'International Exposure', desc: 'Gain a global perspective through our international programs and collaborations.' },
    { title: 'Industry Partnerships', desc: 'Connect with industry leaders and enhance your practical knowledge through our partnerships.' },
    { title: 'Scholarships and Financial Aid', desc: 'We offer various scholarships and financial aid options to support your education.' },
    { title: 'Networking Opportunities', desc: 'Build valuable connections with professionals and peers to enrich your academic and professional journey.' },
    { title: 'Research and Innovation', desc: 'Engage in cutting-edge research and innovation projects, fostering a culture of intellectual curiosity.' },
    { title: 'Career Services', desc: 'Our comprehensive career services aim to guide you towards a successful and fulfilling professional path.' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-bmu-bg relative overflow-hidden text-left">
      {/* Ambient Glows */}
      <div className="absolute top-20 left-1/3 w-[600px] h-[600px] bg-bmu-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/3 w-[600px] h-[600px] bg-bmu-pink/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 space-y-28">
        {/* Header / Intro */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold uppercase tracking-wider text-bmu-pink mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-bmu-red animate-pulse" />
            <span>Premier International University in Cambodia</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Architecting the <span className="text-gradient-bmu">Next Century</span> of Human Innovation
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed">
            Bonamary University (BMU) was established by Dr. SENG Bona and Madam MAM Mary, a dedicated couple with a profound commitment to education, actively contributing to the enhancement of Cambodia's educational landscape.
          </p>
        </div>

        {/* SECTION 1: HISTORY OF BMU */}
        <section id="history" className="scroll-mt-32 space-y-12">
          <SectionTitle
            badge="History & Heritage"
            title="History of"
            gradientTitle="Bonamary University"
            subtitle="Established by Dr. SENG Bona and Madam MAM Mary, officially recognized through Sub-Decree Number 100 on April 23, 2024."
          />

          {/* Featured Official History Card */}
          <Card glass className="p-8 sm:p-12 bg-white/95 border-slate-200 shadow-xl space-y-8 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-bmu-red/10 to-bmu-pink/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-bmu-red to-bmu-pink flex items-center justify-center text-white shadow-glow-red">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-bmu-pink">Official Heritage & Foundation</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">The Story of Bonamary University</h3>
              </div>
            </div>

            <div className="space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                <strong className="text-slate-900 font-bold">Bonamary University</strong> was established by <span className="text-bmu-red font-semibold">Dr. SENG Bona and Madam MAM Mary</span>, a dedicated couple with a profound commitment to education. It received official recognition through <strong className="text-slate-900 font-semibold">Sub-Decree Number 100, dated April 23, 2024</strong>, issued by the Royal Government of Cambodia and signed by <strong className="text-slate-900 font-semibold">Samdech Moha Borvor Thipadei HUN Manet</strong>, Prime Minister of the Royal Government of Cambodia.
              </p>
              <p>
                Dr. SENG Bona and Madam Mary serve as the CEOs and Co-founders of the <strong className="text-slate-900 font-semibold">True VISIONS Family</strong>, which comprises True VISIONS International Schools in Phnom Penh, Cambodia, established in 2013. Propelled by remarkable growth and steadfast community support, they embarked on extending their educational vision to the tertiary level by establishing Bonamary University. Their objective is to actively contribute to the enhancement of Cambodia's educational landscape through the creation of a collaborative multinational institution.
              </p>
              <p>
                Bonamary University provides Cambodian and international students with opportunities to engage with international educational standards within Cambodia or pursue studies, employment, or residency abroad, particularly in <strong className="text-slate-900 font-semibold">Australia, the USA, the UK, China, Japan, Korea, and other nations</strong>. Moreover, BMU places a strong emphasis on fostering an entrepreneurial mindset, inspiring learners to emerge as global leaders or entrepreneurs committed to advancing humanity and safeguarding the planet.
              </p>
              <p>
                The ultimate goal of BMU's educational mission is to see its graduates equipped with in-depth knowledge, skills, exemplary character, and wisdom.
              </p>
            </div>

            {/* Official Motto / Wisdom Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg border border-slate-700 relative overflow-hidden">
              <Quote className="w-12 h-12 text-bmu-pink/20 absolute -bottom-2 -right-2 rotate-180 pointer-events-none" />
              <p className="text-lg sm:text-2xl font-black italic tracking-wide text-center leading-relaxed text-gradient-bmu">
                "Knowledge, Skills, and Character lead to Wisdom. And Wisdom must always be accompanied by Virtue."
              </p>
              <p className="text-center text-slate-400 text-xs sm:text-sm mt-3 font-mono font-bold tracking-widest uppercase">
                — Bonamary University
              </p>
            </div>
          </Card>

          {/* Timeline Section */}
          <div className="pt-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-8 flex items-center gap-2">
              <Clock className="w-6 h-6 text-bmu-red" />
              <span>Milestones & Expansion</span>
            </h3>
            <div className="relative border-l-2 border-bmu-pink/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-bmu-pink group-hover:scale-125 group-hover:shadow-glow-red transition-all duration-300 shadow-md" />
                  
                  <div className="text-xs font-mono font-extrabold text-bmu-red bg-bmu-red/10 px-3 py-1 rounded-md inline-block border border-bmu-red/20 mb-2">
                    {item.year}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 group-hover:text-bmu-red transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-base max-w-3xl leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: PHILOSOPHY */}
        <section id="philosophy" className="scroll-mt-32">
          <Card glass className="p-8 sm:p-12 bg-white/95 border-slate-200 shadow-xl space-y-8 relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-bmu-pink/10 to-bmu-red/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-bmu-red to-bmu-pink flex items-center justify-center text-white shadow-glow-red shrink-0">
                  <Compass className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-bmu-pink">University Philosophy</span>
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900">A Beacon of Wisdom & Virtue</h2>
                </div>
              </div>
            </div>

            {/* Featured Philosophy Quote Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-bmu-red/5 via-bmu-pink/5 to-bmu-red/5 border border-bmu-red/20 text-center relative overflow-hidden">
              <Sparkles className="w-6 h-6 text-bmu-red mx-auto mb-3 animate-pulse" />
              <p className="text-lg sm:text-2xl font-black text-slate-900 leading-relaxed max-w-3xl mx-auto italic">
                "In loyalty to its mission, Bonamary University stands for a commitment to education as a beacon guiding individuals toward wisdom and virtue."
              </p>
              <div className="mt-4 inline-block px-4 py-1 rounded-full bg-white border border-bmu-red/30 text-xs font-bold text-bmu-red uppercase tracking-wider shadow-sm">
                Official University Philosophy
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              <div className="space-y-3 p-6 rounded-2xl bg-slate-50 border border-slate-100/80 hover:bg-white hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-bmu-red shrink-0" />
                  <span>Knowledge & Mastery</span>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  Equipping learners with rigorous international standards, deep technical proficiency, and critical academic inquiry across all disciplines.
                </p>
              </div>

              <div className="space-y-3 p-6 rounded-2xl bg-slate-50 border border-slate-100/80 hover:bg-white hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-bmu-red shrink-0" />
                  <span>Character & Virtue</span>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  We believe true education extends beyond intellectual achievement. Wisdom must always be accompanied by ethical integrity, empathy, and virtuous leadership.
                </p>
              </div>

              <div className="space-y-3 p-6 rounded-2xl bg-slate-50 border border-slate-100/80 hover:bg-white hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-bmu-red shrink-0" />
                  <span>Global Stewardship</span>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  Fostering an entrepreneurial mindset that inspires graduates to emerge as collaborative global leaders committed to advancing humanity and safeguarding the planet.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* SECTION 3: MOTO - VISION - MISSION */}
        <section id="mission-vision" className="scroll-mt-32">
          <SectionTitle
            badge="Motto • Vision • Mission"
            title="The Guiding Principles of"
            gradientTitle="BMU University"
            subtitle="The core directives that fuel our campus culture and academic ambitions."
          />

          {/* Motto Banner */}
          <div className="mb-8 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white text-center shadow-xl border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-bmu-red/20 rounded-full blur-3xl pointer-events-none" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-bmu-pink mb-3 block">University Motto</span>
            <h3 className="text-3xl sm:text-5xl font-black italic tracking-wide text-gradient-bmu">
              "Wisdom. Virtue."
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-normal">
              Guiding every scholar toward exemplary character and intellectual excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <Card glass hoverEffect className="p-8 sm:p-10 border-slate-200 bg-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-bmu-red/10 border border-bmu-red/30 flex items-center justify-center text-bmu-red mb-6">
                  <Globe className="w-7 h-7" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">Our Vision</h2>
                <p className="text-slate-700 text-lg sm:text-xl font-medium leading-relaxed mb-6 font-normal">
                  To be one of the leading universities in Cambodia.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-bmu-red">
                <Sparkles className="w-4 h-4" />
                <span>Excellence in Cambodian Higher Education</span>
              </div>
            </Card>

            {/* Mission Card */}
            <Card glass hoverEffect className="p-8 sm:p-10 border-slate-200 bg-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-bmu-pink/10 border border-bmu-pink/30 flex items-center justify-center text-bmu-pink mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">Our Mission</h2>
                <p className="text-slate-700 text-lg sm:text-xl font-medium leading-relaxed mb-6 font-normal">
                  To provide educational services to prepare students for global careers.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-bmu-pink">
                <Sparkles className="w-4 h-4" />
                <span>Global Career Readiness</span>
              </div>
            </Card>
          </div>
        </section>

        {/* SECTION 4: CORE VALUES */}
        <section id="core-values" className="scroll-mt-32">
          <SectionTitle
            badge="Our Pillars"
            title="University"
            gradientTitle="Core Values"
            subtitle="The moral and intellectual code that binds every student, researcher, and professor at BMU."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((val, idx) => (
              <Card key={idx} glass hoverEffect className="p-8 bg-white border-slate-200 shadow-lg space-y-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${val.color} border flex items-center justify-center`}>
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{val.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">{val.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 5: STRATEGIC GOALS */}
        <section id="strategic-goals" className="scroll-mt-32 space-y-16">
          <SectionTitle
            badge="Institutional Commitment"
            title="Our Self-Image &"
            gradientTitle="Strategic Goals"
            subtitle="Carefully aligned with National and International Quality Frameworks, MOEYS Guidelines, and ACC Standards."
          />

          {/* Self-Image Section */}
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-bmu-pink mb-2 block">Institutional Identity</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Building Our Self-Image</h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                To achieve our Vision and fulfill our Mission, we are firmly committed to building our Self-Image as:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {selfImagePillars.map((pillar, idx) => (
                <Card key={idx} glass hoverEffect className="p-6 bg-white border-slate-200 shadow-lg flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-bmu-red/10 to-bmu-pink/10 border border-bmu-red/20 flex items-center justify-center text-bmu-red">
                        <pillar.icon className="w-6 h-6" />
                      </div>
                      <span className="text-xl font-black font-mono text-slate-300">#{pillar.num}</span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 leading-snug">{pillar.title}</h4>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-bmu-pink">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Core Institutional Identity</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Strategic Goals Section */}
          <div className="space-y-8 pt-8 border-t border-slate-200/80">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 relative overflow-hidden text-center max-w-4xl mx-auto">
              <div className="absolute top-0 right-0 w-96 h-96 bg-bmu-red/20 rounded-full blur-3xl pointer-events-none" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-bmu-pink uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-bmu-red" />
                <span>Regulatory & Quality Compliance</span>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-normal">
                We will carefully set our strategic goals in accordance with the <strong className="text-white font-semibold">National and International Quality Frameworks, MOEYS Guidelines, Education Quality Standards of the Accreditation Committee of Cambodia (ACC)</strong>, and other relevant rules and regulations of the Kingdom of Cambodia, as follows:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {strategicGoals.map((goal, idx) => (
                <Card key={idx} glass className="p-6 bg-white border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-bmu-red uppercase tracking-wider">
                        Goal {goal.num}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">{goal.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{goal.title}</h3>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>Alignment</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ACC / MOEYS</span>
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: WHY BMU? */}
        <section id="why-bmu" className="scroll-mt-32">
          <SectionTitle
            badge="The BMU Advantage"
            title="Why Choose"
            gradientTitle="BMU University?"
            subtitle="Discover the distinctive advantages and opportunities that define the student experience at Bonamary University."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyBmuReasons.map((reason, idx) => (
              <Card key={idx} glass hoverEffect className="p-6 bg-white border-slate-200 shadow-md space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-bmu-red/10 flex items-center justify-center text-bmu-red font-black text-sm mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{reason.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-normal">{reason.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 7: MESSAGE FROM THE PRESIDENT */}
        {(() => {
          const leadershipLeader = teamMembers.find((m) => m.roleCategory === 'Message from Leadership') || teamMembers.find((m) => m.name && m.name.includes('Porguech')) || teamMembers.find((m) => m.roleCategory === 'Executive Leadership' && !m.name?.includes('Bona'));
          const managementTeam = teamMembers.filter((m) => (!leadershipLeader || m.id !== leadershipLeader.id));
          return (
            <>
              <section id="president-message" className="scroll-mt-32">
                <Card glass className="p-8 sm:p-14 bg-gradient-to-br from-white via-slate-50 to-rose-50/30 border-slate-200 shadow-2xl relative overflow-hidden">
                  <Quote className="absolute top-6 right-8 w-24 h-24 text-slate-200/50 pointer-events-none -z-0" />
                  
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    {/* President Photo & Title */}
                    <div className="lg:col-span-5 flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-bmu-red to-bmu-pink rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-500" />
                        <img
                          src={(leadershipLeader && leadershipLeader.photoUrl) ? leadershipLeader.photoUrl : presidentImg}
                          alt={leadershipLeader ? leadershipLeader.name : "Mr. UNG Porguech, President of Bonamary University"}
                          className="relative w-64 sm:w-80 h-72 sm:h-96 object-cover rounded-2xl shadow-2xl border-2 border-white object-top"
                        />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900">{leadershipLeader ? leadershipLeader.name : "Mr. UNG Porguech"}</h4>
                      <p className="text-sm font-bold text-bmu-red uppercase tracking-wider mt-1">
                        {leadershipLeader ? leadershipLeader.title : "President of Bonamary University"}
                      </p>
                      <div className="mt-4 font-mono text-xs font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                        Official Presidential Welcome
                      </div>
                    </div>

                    {/* President Message Content */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bmu-red/10 border border-bmu-red/20 text-xs font-bold text-bmu-red uppercase tracking-wider">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Message from Leadership</span>
                      </div>

                      <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                        "{leadershipLeader && leadershipLeader.message ? leadershipLeader.message : <>Where ambition meets opportunity, and where your <span className="text-gradient-bmu">journey to excellence begins</span>.</>}"
                      </h2>

                      <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                        {leadershipLeader && leadershipLeader.bio ? (
                          <p className="whitespace-pre-line">{leadershipLeader.bio}</p>
                        ) : (
                          <>
                            <p>
                              It is my great honor to welcome you to Bonamary University – a place where education, innovation, and opportunity converge to shape the future of Cambodia.
                            </p>
                            <p>
                              From my own humble beginnings to my journey through education and leadership, I have always believed that education has the power to transform lives. At BMU, we are driven by this belief and guided by our mission to provide quality, accessible, and globally relevant higher education for all.
                            </p>
                            <p>
                              Our vision is to become one of the leading universities in Cambodia – one that equips students with the knowledge, skills, international certifications, and character they need to thrive in the 21st century. We embrace innovation in every aspect of our work, from smart classrooms to career-based learning, and from international partnerships to entrepreneurial thinking.
                            </p>
                            <p>
                              At BMU, we do not just prepare students for degrees – we prepare them for life. Whether you are a student, parent, partner, or member of our academic family, I invite you to join us in building a new generation of leaders for Cambodia.
                            </p>
                            <p className="font-semibold text-slate-900">
                              Welcome to Bonamary University – where ambition meets opportunity, and where your journey to excellence begins.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              {/* SECTION 8: OUR EXECUTIVE MANAGEMENT TEAM */}
              {managementTeam.length > 0 && (
                <section id="management-team" className="scroll-mt-32 pt-16">
                  <SectionTitle
                    badge="Executive Leadership"
                    title="Our Management"
                    gradientTitle="Team"
                    subtitle="Meet the visionary administrative and university executives guiding Bonamary University toward global excellence."
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {managementTeam.map((member) => (
                      <Card key={member.id} glass hoverEffect className="p-6 bg-white border-slate-200 shadow-xl flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                          {member.photoUrl ? (
                            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-md">
                              <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                            </div>
                          ) : (
                            <div className="w-full h-64 rounded-2xl bg-gradient-to-tr from-rose-100 to-red-50 border border-rose-200 flex items-center justify-center text-rose-700 font-black text-4xl shadow-inner">
                              {member.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-bold text-xs uppercase border border-rose-200 inline-block mb-2">
                              {member.highlight || member.roleCategory}
                            </span>
                            <h3 className="text-xl font-black text-slate-900">{member.name}</h3>
                            <p className="text-sm font-extrabold text-bmu-red mb-2">{member.title}</p>
                            {member.message && (
                              <p className="text-xs font-semibold text-slate-500 italic mb-3">"{member.message}"</p>
                            )}
                            <p className="text-slate-600 text-xs leading-relaxed font-normal">{member.bio}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </>
          );
        })()}

        {/* Accreditation & Governance Banner */}
        <Card glass className="p-8 sm:p-12 bg-slate-900 text-white border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left rounded-3xl">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Officially Chartered & Accredited</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Recognized by Sub-Decree 100 & ACC Accredited
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Bonamary University is officially recognized by the Royal Government of Cambodia under Sub-Decree No. 100 and adheres to the National and International Quality Frameworks, MOEYS Guidelines, and ACC Education Quality Standards.
            </p>
          </div>
          <Link to="/admission">
            <Button variant="primary" size="lg" icon={ArrowRight} className="shadow-glow-bmu shrink-0">
              Apply for Admission
            </Button>
          </Link>
        </Card>
      </Container>
    </div>
  );
};

export default About;
