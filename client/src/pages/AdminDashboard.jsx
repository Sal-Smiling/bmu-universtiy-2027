import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Cpu, Database, Server, Upload, Sparkles, BookOpen, FileText, Plus, Trash2, 
  CheckCircle2, AlertCircle, Users, Award, Bell, Search, ExternalLink, RefreshCw, HandHeart, 
  Settings, LogOut, ArrowRight, Eye, Layers, FolderPlus, Globe, Activity, Image as ImageIcon, Edit2, Save, X, ArrowUp, ArrowDown
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Card from '../components/Card';
import { fetchPrograms, fetchSettings, saveSetting, fetchPartners, createPartner, updatePartner, deletePartner, fetchTeam, createTeamMember, updateTeamMember, deleteTeamMember, reorderTeamMember, fetchEvents, createEvent, updateEvent, deleteEvent, fetchInternships, createInternship, updateInternship, deleteInternship, fetchScholarships, createScholarship, updateScholarship, deleteScholarship, fetchCampusLife, createCampusLife, updateCampusLife, deleteCampusLife, fetchCommunityServices, createCommunityService, updateCommunityService, deleteCommunityService, fetchPartnerships, createPartnership, updatePartnership, deletePartnership, fetchNews, createNews, updateNews, deleteNews, fetchFaculties, createFaculty, updateFaculty, deleteFaculty } from '../services/api';
import carousel1 from "../assets/carousel-1.jpg";
import carousel2 from "../assets/carousel-2.jpg";
import carousel3 from "../assets/carousel-3.jpg";
import carousel4 from "../assets/carousel-4.jpg";
import partner2 from "../assets/partner-2.png";
import partner3 from "../assets/partner-3.png";
import partner4 from "../assets/partner-4.png";
import partner5 from "../assets/partner-5.png";
import partner6 from "../assets/partner-6.png";
import partner7 from "../assets/partner-7.png";
import partner9 from "../assets/partner-9.png";
import partner10 from "../assets/partner-10.png";
import partner11 from "../assets/partner-11.png";
import team1 from "../assets/team-1.jpg";
import team2 from "../assets/team-2.jpg";
import team3 from "../assets/team-3.png";
import team4 from "../assets/team-4.png";
import team5 from "../assets/team-5.jpg";
import team6 from "../assets/team-6.png";

const resizeAndReadAsDataURL = (file, reader) => {
  if (!file.type.match(/image.*/)) {
    reader.readAsDataURL(file);
    return;
  }
  const img = document.createElement('img');
  img.onload = () => {
    const canvas = document.createElement('canvas');
    let width = img.width;
    let height = img.height;
    const MAX_SIZE = 1200;
    if (width > height) {
      if (width > MAX_SIZE) {
        height *= MAX_SIZE / width;
        width = MAX_SIZE;
      }
    } else {
      if (height > MAX_SIZE) {
        width *= MAX_SIZE / height;
        height = MAX_SIZE;
      }
    }
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    // Simulate reader.onloadend
    Object.defineProperty(reader, 'result', {
      get: () => dataUrl,
      configurable: true
    });
    if (reader.onloadend) reader.onloadend({ target: reader });
  };
  img.src = URL.createObjectURL(file);
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('programs');

  // --- Advertisement Modal State ---
  const [promoActive, setPromoActive] = useState(true);
  const [promoTitle, setPromoTitle] = useState('');
  const [promoSubtitle, setPromoSubtitle] = useState('');
  const [promoDescription, setPromoDescription] = useState('');
  const [promoImage, setPromoImage] = useState('');

  useEffect(() => {
    fetch('/api/v1/settings/promo_advertisement')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const promo = data.data;
          setPromoActive(promo.tag === 'active');
          setPromoTitle(promo.title || '');
          setPromoSubtitle(promo.subtitle || '');
          setPromoDescription(promo.content || '');
          setPromoImage(promo.image || '');
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handlePromoImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPromoImage(reader.result);
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const savePromoToDb = async (e) => {
    if (e) e.preventDefault();
    try {
      await fetch('/api/v1/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'BMU-ADMIN-2026'
        },
        body: JSON.stringify({
          key: 'promo_advertisement',
          tag: promoActive ? 'active' : 'inactive',
          title: promoTitle,
          subtitle: promoSubtitle,
          content: promoDescription,
          image: promoImage
        })
      });
      alert('Advertisement Campaign Saved!');
    } catch (err) {
      console.error(err);
      alert('Error saving advertisement');
    }
  };

  // --- International Gallery State ---
  const [intlGalleryList, setIntlGalleryList] = useState([]);
  const [newIntlTitle, setNewIntlTitle] = useState('');
  const [newIntlImage, setNewIntlImage] = useState('');

  useEffect(() => {
    fetch('/api/v1/settings/international_gallery')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.slides) {
          setIntlGalleryList(data.data.slides);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const saveIntlGalleryToDb = async (newGallery) => {
    try {
      await fetch('/api/v1/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'BMU-ADMIN-2026'
        },
        body: JSON.stringify({
          key: 'international_gallery',
          slides: newGallery
        })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleIntlImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit. Please select a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewIntlImage(reader.result);
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleAddIntlPhoto = (e) => {
    e.preventDefault();
    if (!newIntlTitle || !newIntlImage) return;
    const newEntry = {
      id: 'ig-' + Date.now(),
      title: newIntlTitle,
      imageUrl: newIntlImage
    };
    const updated = [newEntry, ...intlGalleryList];
    setIntlGalleryList(updated);
    saveIntlGalleryToDb(updated);
    setNewIntlTitle('');
    setNewIntlImage('');
  };

  const handleDeleteIntlPhoto = (id) => {
    if (!window.confirm("Delete this photo?")) return;
    const updated = intlGalleryList.filter(img => img.id !== id);
    setIntlGalleryList(updated);
    saveIntlGalleryToDb(updated);
  };
 // 'programs', 'settings', 'team', 'mou', 'news', 'events', 'internships', 'library', 'applications'
  const [apiHealth, setApiHealth] = useState({ status: 'ONLINE', server: 'BMU API Foundry v1.0', db: 'MongoDB Atlas Connected (M0 Cluster)' });
  const [loading, setLoading] = useState(false);

  // --- Global Editing Modal State ---
  const [editingItem, setEditingItem] = useState(null); // { type: 'program' | 'doc' | 'news' | 'mou' | 'team' | 'event' | 'internship', data: {...} }

  // --- Academic Programs & Degrees Management State ---
  const [facultiesList, setFacultiesList] = useState([]);
  const [newFacultyName, setNewFacultyName] = useState('');
  const [newFacultyDeanName, setNewFacultyDeanName] = useState('');
  const [newFacultyDeanMessage, setNewFacultyDeanMessage] = useState('');
  const [newFacultyDeanPhoto, setNewFacultyDeanPhoto] = useState('');
  const [newFacultyImage, setNewFacultyImage] = useState('');
  const [newFacultyMajors, setNewFacultyMajors] = useState([]);
  const [facultyActionSuccess, setFacultyActionSuccess] = useState('');

  const [intFacultiesList, setIntFacultiesList] = useState([]);
  const [newIntFacultyName, setNewIntFacultyName] = useState('');
  const [newIntFacultyDeanName, setNewIntFacultyDeanName] = useState('');
  const [newIntFacultyDeanMessage, setNewIntFacultyDeanMessage] = useState('');
  const [newIntFacultyDeanPhoto, setNewIntFacultyDeanPhoto] = useState('');
  const [newIntFacultyImage, setNewIntFacultyImage] = useState('');
  const [newIntFacultyMajors, setNewIntFacultyMajors] = useState([]);
  const [intFacultyActionSuccess, setIntFacultyActionSuccess] = useState('');

  const [programsList, setProgramsList] = useState([]);
  const [newProgTitle, setNewProgTitle] = useState('');
  const [newProgDept, setNewProgDept] = useState('Faculty of Computing & Defense Systems');
  const [newProgDegree, setNewProgDegree] = useState('Undergraduate');
  const [newProgCategory, setNewProgCategory] = useState('Artificial Intelligence');
  const [newProgDuration, setNewProgDuration] = useState('4 Years');
  const [newProgTuition, setNewProgTuition] = useState('$3,200 / Year');
  const [newProgDesc, setNewProgDesc] = useState('');
  const [progActionSuccess, setProgActionSuccess] = useState('');

  // --- Settings State (Banner, Stats, Tuition) ---
  const [settingsData, setSettingsData] = useState({
    banner: { 
      title: 'International Academic Symposium', 
      subtitle: 'BMU students & faculty hosting global research partners at our state-of-the-art auditorium.',
      tag: 'Global Collaboration',
      image: '',
      slides: [
        {
          id: 'slide-1',
          image: carousel1,
          tag: "Global Collaboration",
          title: "International Academic Symposium",
          subtitle: "BMU students & faculty hosting global research partners at our state-of-the-art auditorium.",
        },
        {
          id: 'slide-2',
          image: carousel2,
          tag: "University Leadership",
          title: "Presidential Vision & Innovation Hall",
          subtitle: "Empowering undergraduate innovators and celebrating academic excellence across all faculties.",
        },
        {
          id: 'slide-3',
          image: carousel3,
          tag: "Robotics Championship",
          title: "True Visions Robotics & Digital Skills 2026",
          subtitle: "Our engineering champions receiving national honors and research grant awards on stage.",
        },
        {
          id: 'slide-4',
          image: carousel4,
          tag: "Executive Mentorship",
          title: "Advanced Supercomputing Lecture Series",
          subtitle: "Immersive classroom experiences led by distinguished professors and industry pioneers.",
        },
      ]
    },
    stats: { content: { activeStudents: '12,450+', faculties: '8 Academic Schools', institutions: '15+ Global Centers' } },
    tuition_fees: { content: [{ degree: 'Undergraduate BS (AI & Computing)', fee: '$8,500 / Year', scholarship: 'Up to 50% Merit Aid' }] },
    partner_emblems: {
      emblems: [
        { id: 'emb-1', src: partner10, name: 'BMU Official Headquarters Logo' },
        { id: 'emb-2', src: partner11, name: 'True VISIONS International School of Cambodia' },
        { id: 'emb-3', src: partner9, name: 'MISPP Information Security & Public Policy' },
        { id: 'emb-4', src: partner4, name: 'Google Digital Garage' },
        { id: 'emb-5', src: partner5, name: 'Yulin Normal University' },
        { id: 'emb-6', src: partner6, name: 'Nanning College for Vocational Technology' },
        { id: 'emb-7', src: partner7, name: 'EDU CLaaS' },
        { id: 'emb-8', src: partner3, name: 'University of Roehampton London' },
        { id: 'emb-9', src: partner2, name: 'ICC (International Computing Consortia)' },
      ]
    }
  });
  const [settingsSuccess, setSettingsSuccess] = useState('');

  // --- New Carousel Banner Slide State ---
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlideSubtitle, setNewSlideSubtitle] = useState('');
  const [newSlideTag, setNewSlideTag] = useState('Global Collaboration');
  const [newSlideImage, setNewSlideImage] = useState('');

  // --- New Official Partner Emblem State ---
  const [newEmblemName, setNewEmblemName] = useState('');
  const [newEmblemImage, setNewEmblemImage] = useState('');

  // --- Leadership & Management Team State ---
  const [teamList, setTeamList] = useState([
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
  ]);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamTitle, setNewTeamTitle] = useState('');
  const [newTeamCategory, setNewTeamCategory] = useState('Executive Leadership');
  const [newTeamHighlight, setNewTeamHighlight] = useState('');
  const [newTeamMessage, setNewTeamMessage] = useState('');
  const [newTeamPhotoUrl, setNewTeamPhotoUrl] = useState('');
  const [newTeamBio, setNewTeamBio] = useState('');
  const [newTeamFacebook, setNewTeamFacebook] = useState('');
  const [newTeamEmail, setNewTeamEmail] = useState('');
  const [newTeamDepartment, setNewTeamDepartment] = useState('Academic Leadership & Deans');
  const [newTeamEducation, setNewTeamEducation] = useState('Ph.D. / Advanced Executive Leadership');
  const [newTeamPublications, setNewTeamPublications] = useState('35');
  const [newTeamCitations, setNewTeamCitations] = useState('1,800+');
  const [newTeamOffice, setNewTeamOffice] = useState('Executive Academic Wing');

  // --- Events & Campus Life State ---
  const [eventsList, setEventsList] = useState([
    { id: 'ev-1', title: 'Annual Quantum & AI Research Symposium 2026', category: 'Upcoming Events & Symposia', eventDate: 'August 14, 2026', location: 'SCIF Enclave Auditorium', description: 'Featuring keynote addresses from global technology leaders.' },
    { id: 'ev-2', title: 'BMU Community Clean-Up & Tech Literacy Drive', category: 'Community Service', eventDate: 'July 25, 2026', location: 'Phnom Penh Innovation Hub', description: 'Student-led community empowerment project.' }
  ]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('August 2026');
  const [newEventDesc, setNewEventDesc] = useState('');
  const [newEventImage, setNewEventImage] = useState('');

  // --- Internships & Careers State ---
  const [internshipsList, setInternshipsList] = useState([
    { id: 'int-1', company: 'eduCLaaS Singapore', position: 'Cloud Solutions Engineering Intern', stipend: '$1,500 / Month', status: 'Open for Applications', description: '6-month immersive work-study placement.' },
    { id: 'int-2', company: 'True VISIONS & Quantum Labs', position: 'AI Security Red Team Analyst Intern', stipend: '$2,000 / Month', status: 'Open for Applications', description: 'Embedded defense research internship.' }
  ]);
  const [newIntCompany, setNewIntCompany] = useState('');
  const [newIntPos, setNewIntPos] = useState('');
  const [newIntStipend, setNewIntStipend] = useState('$1,500 / Month');
  const [newIntStatus, setNewIntStatus] = useState('Year 3 Scholar');
  const [newIntDesc, setNewIntDesc] = useState('');
  const [newIntImage, setNewIntImage] = useState('');

  // --- Scholarships & Financial Aid State ---
  const [scholarshipsList, setScholarshipsList] = useState([]);
  const [newScholarshipTitle, setNewScholarshipTitle] = useState('');
  const [newScholarshipSubtitle, setNewScholarshipSubtitle] = useState('');
  const [newScholarshipDesc, setNewScholarshipDesc] = useState('');
  const [newScholarshipYear, setNewScholarshipYear] = useState('Academic Year 2025–2026');
  const [newScholarshipImage1, setNewScholarshipImage1] = useState('');
  const [newScholarshipImage2, setNewScholarshipImage2] = useState('');
  const [newScholarshipStatus, setNewScholarshipStatus] = useState('Active');

  // --- Campus Life & Activities State ---
  const [campusLifeList, setCampusLifeList] = useState([]);
  const [newCampusTitle, setNewCampusTitle] = useState('');
  const [newCampusCategory, setNewCampusCategory] = useState('');
  const [newCampusDesc, setNewCampusDesc] = useState('');
  const [newCampusImage, setNewCampusImage] = useState('');

  // --- Community Services State ---
  const [communityServicesList, setCommunityServicesList] = useState([]);
  const [newCommunityTitle, setNewCommunityTitle] = useState('');
  const [newCommunitySubtitle, setNewCommunitySubtitle] = useState('');
  const [newCommunityProgram, setNewCommunityProgram] = useState('Volunteer Exchange Program');
  const [newCommunityDuration, setNewCommunityDuration] = useState('14-Day Global Visit');
  const [newCommunityDesc, setNewCommunityDesc] = useState('');
  const [newCommunityAcks, setNewCommunityAcks] = useState('');
  const [newCommunityImage, setNewCommunityImage] = useState('');

  // --- Library PDF / Document Management State ---
  const [documents, setDocuments] = useState([]);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('Research Whitepaper');
  const [newDocFile, setNewDocFile] = useState(null);
  const [docUploadSuccess, setDocUploadSuccess] = useState(false);

  // --- News & Multi-Image Gallery State ---
  const [newsList, setNewsList] = useState([
    {
      id: 'news-1',
      title: 'BMU Launches First SCIF AI & Quantum Computing Enclave in Southeast Asia',
      category: 'Campus Expansion',
      date: 'July 8, 2026',
      photosCount: 5,
    },
    {
      id: 'news-2',
      title: 'Presidential Delegation Signs Strategic Dual-Degree Agreement with Yulin University',
      category: 'Global Partnerships',
      date: 'July 5, 2026',
      photosCount: 6,
    },
  ]);
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState('Academic Research');
  const [newNewsSummary, setNewNewsSummary] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');
  const [newNewsAuthor, setNewNewsAuthor] = useState('');
  const [newNewsImage, setNewNewsImage] = useState('');
  const [newNewsGallery, setNewNewsGallery] = useState([]);
  const [newNewsTags, setNewNewsTags] = useState('');

  // --- Partners State (Global Reach) ---
  const [partnersList, setPartnersList] = useState([]);
  const [newPartnerTitle, setNewPartnerTitle] = useState('');
  const [newPartnerCategory, setNewPartnerCategory] = useState('International Partners & Collaborations');
  const [newPartnerLocation, setNewPartnerLocation] = useState('Global');
  const [newPartnerBadge, setNewPartnerBadge] = useState('Global Partner');
  const [newPartnerScope, setNewPartnerScope] = useState('Dual Degree & Research Articulation');
  const [newPartnerDesc, setNewPartnerDesc] = useState('');
  const [newPartnerWebsiteUrl, setNewPartnerWebsiteUrl] = useState('');

  // --- MOU & Partnerships State ---
  const [mouList, setMouList] = useState([
    {
      id: 'mou-1',
      partner: 'eduCLaaS Singapore & True VISIONS',
      category: 'Work-Study Articulation & Cloud Academy',
      date: 'July 4, 2026',
      status: 'Active Charter',
    },
    {
      id: 'mou-2',
      partner: 'Yulin University (China)',
      category: '2+2 Dual Bachelor Degree Exchange',
      date: 'June 29, 2026',
      status: 'Signed & Ratified',
    },
    {
      id: 'mou-3',
      partner: 'UCAM (Catholic University of Murcia, Spain)',
      category: 'Postgraduate Quantum Business MBA Partnership',
      date: 'June 18, 2026',
      status: 'Active Charter',
    },
  ]);
  const [newMouPartner, setNewMouPartner] = useState('');
  const [newMouCategory, setNewMouCategory] = useState('Dual Degree & Student Exchange');
  const [newMouImage, setNewMouImage] = useState('');
  const [newMouGallery, setNewMouGallery] = useState([]);

  // --- Admission Applications State ---
  const [applications, setApplications] = useState([
    {
      id: 'APP-8492',
      studentName: 'Sokha Chan',
      program: 'B.Sc. in AI & Supercomputing Engineering',
      gpa: '3.95',
      status: 'Pending Verification',
      submittedDate: 'July 9, 2026',
    },
    {
      id: 'APP-8493',
      studentName: 'Elena Rostova',
      program: 'M.Sc. in Cyber Red-Team & Defense Systems',
      gpa: '4.00',
      status: 'Approved & Enrolled',
      submittedDate: 'July 7, 2026',
    },
    {
      id: 'APP-8494',
      studentName: 'David K. Vance',
      program: 'Ph.D. in Quantum Cryptography & Materials',
      gpa: '3.88',
      status: 'Interview Scheduled',
      submittedDate: 'July 6, 2026',
    },
  ]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPrograms();
      if (data && data.length > 0) {
        setProgramsList(data);
      }
      const facData = await fetchFaculties();
      if (facData && Array.isArray(facData)) {
        setFacultiesList(facData.filter(f => f.scope !== 'International Academic Programs'));
        setIntFacultiesList(facData.filter(f => f.scope === 'International Academic Programs'));
      }
      const settings = await fetchSettings();
      if (settings && Object.keys(settings).length > 0) {
        setSettingsData((prev) => ({
          ...prev,
          ...settings,
          banner: {
            ...(prev.banner || {}),
            ...(settings.banner || {}),
            slides: (settings.banner?.slides && Array.isArray(settings.banner.slides) && settings.banner.slides.length > 0)
              ? settings.banner.slides
              : prev.banner?.slides || []
          },
          stats: {
            ...(prev.stats || {}),
            ...(settings.stats || {}),
            content: {
              ...(prev.stats?.content || { activeStudents: '12,450+', faculties: '8 Academic Schools', institutions: '15+ Global Centers' }),
              ...(settings.stats?.content || {})
            }
          },
          tuition_fees: {
            ...(prev.tuition_fees || {}),
            ...(settings.tuition_fees || {}),
            content: (settings.tuition_fees?.content && Array.isArray(settings.tuition_fees.content) && settings.tuition_fees.content.length > 0)
              ? settings.tuition_fees.content
              : prev.tuition_fees?.content || []
          },
          partner_emblems: {
            ...(prev.partner_emblems || {}),
            ...(settings.partner_emblems || {}),
            emblems: (settings.partner_emblems?.emblems && Array.isArray(settings.partner_emblems.emblems) && settings.partner_emblems.emblems.length > 0)
              ? settings.partner_emblems.emblems.map((emb) => ({
                  ...emb,
                  src: (!emb.src ? '' : emb.src.includes('partner-10') ? partner10 : emb.src.includes('partner-11') ? partner11 : emb.src.includes('partner-9') ? partner9 : emb.src.includes('partner-4') ? partner4 : emb.src.includes('partner-5') ? partner5 : emb.src.includes('partner-6') ? partner6 : emb.src.includes('partner-7') ? partner7 : emb.src.includes('partner-3') ? partner3 : emb.src.includes('partner-2') ? partner2 : emb.src)
                }))
              : prev.partner_emblems?.emblems || []
          }
        }));
      }
      const ptrList = await fetchPartners();
      if (ptrList && Array.isArray(ptrList) && ptrList.length > 0) {
        setPartnersList(ptrList);
      } else if (ptrList && Array.isArray(ptrList) && ptrList.length === 0) {
        setPartnersList([]);
      }
      const pList = await fetchPartnerships();
      if (pList && Array.isArray(pList) && pList.length > 0) {
        setMouList(pList);
      } else if (pList && Array.isArray(pList) && pList.length === 0) {
        setMouList([]);
      }
      const tList = await fetchTeam();
      if (tList && tList.length > 0) {
        setTeamList(tList);
      }
      const eList = await fetchEvents();
      if (eList && eList.length > 0) {
        setEventsList(eList);
      }
      const iList = await fetchInternships();
      if (iList && Array.isArray(iList) && iList.length > 0) {
        setInternshipsList(iList);
      } else if (iList && Array.isArray(iList) && iList.length === 0) {
        setInternshipsList([]);
      }
      const sList = await fetchScholarships();
      if (sList && Array.isArray(sList) && sList.length > 0) {
        setScholarshipsList(sList);
      } else if (sList && Array.isArray(sList) && sList.length === 0) {
        setScholarshipsList([]);
      }
      const cList = await fetchCampusLife();
      if (cList && Array.isArray(cList) && cList.length > 0) {
        setCampusLifeList(cList);
      } else if (cList && Array.isArray(cList) && cList.length === 0) {
        setCampusLifeList([]);
      }
      const csList = await fetchCommunityServices();
      if (csList && Array.isArray(csList) && csList.length > 0) {
        setCommunityServicesList(csList);
      } else if (csList && Array.isArray(csList) && csList.length === 0) {
        setCommunityServicesList([]);
      }
      const nList = await fetchNews();
      if (nList && Array.isArray(nList) && nList.length > 0) {
        setNewsList(nList);
      } else if (nList && Array.isArray(nList) && nList.length === 0) {
        setNewsList([]);
      }
    };
    loadData();
  }, []);

  // --- Program CRUD Handlers ---
  const handleCreateProgram = async (e) => {
    e.preventDefault();
    if (!newProgTitle) return;
    const newProg = {
      id: `prog-${Date.now()}`,
      title: newProgTitle,
      department: newProgDept,
      degree: newProgDegree,
      category: newProgCategory,
      duration: newProgDuration,
      tuition: newProgTuition,
      description: newProgDesc || 'Rigorous academic program aligned with national and global quality standards.',
      scope: newProgDegree === 'Undergraduate' ? 'International' : 'National',
      curriculumHighlights: ['Advanced Theoretical Foundations', 'SCIF Enclave Practical Labs', 'Capstones'],
    };
    setProgramsList([newProg, ...programsList]);
    setNewProgTitle('');
    setNewProgDesc('');
    setProgActionSuccess('New academic program inserted and published across campus!');
    setTimeout(() => setProgActionSuccess(''), 3500);
  };

  const handleDeleteProgram = (id) => {
    setProgramsList(programsList.filter((p) => p.id !== id));
  };

  const handleFacultyImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit. Please select a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewFacultyImage(reader.result);
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleFacultyDeanPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit. Please select a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewFacultyDeanPhoto(reader.result);
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleCreateFaculty = async (e) => {
    e.preventDefault();
    if (!newFacultyName || !newFacultyDeanName) return;
    const newFaculty = {
      id: `fac-${Date.now()}`,
      name: newFacultyName,
      image: newFacultyImage,
      deanName: newFacultyDeanName,
      deanMessage: newFacultyDeanMessage,
      deanPhoto: newFacultyDeanPhoto,
      majors: newFacultyMajors
    };
    try {
      await createFaculty(newFaculty);
      const fresh = await fetchFaculties();
      if (fresh) {
        setFacultiesList(fresh.filter(f => f.scope !== 'International Academic Programs'));
        setIntFacultiesList(fresh.filter(f => f.scope === 'International Academic Programs'));
      }
      setNewFacultyName('');
      setNewFacultyImage('');
      setNewFacultyDeanName('');
      setNewFacultyDeanMessage('');
      setNewFacultyDeanPhoto('');
      setNewFacultyMajors([]);
      setFacultyActionSuccess('National Faculty added successfully!');
      setTimeout(() => setFacultyActionSuccess(''), 3500);
    } catch (err) {
      console.warn('Error creating faculty:', err);
    }
  };

  const handleDeleteFaculty = async (id) => {
    try {
      await deleteFaculty(id);
      const fresh = await fetchFaculties();
      if (fresh) {
        setFacultiesList(fresh.filter(f => f.scope !== 'International Academic Programs'));
        setIntFacultiesList(fresh.filter(f => f.scope === 'International Academic Programs'));
      }
    } catch (err) {
      console.warn('Error deleting faculty:', err);
    }
  };

  const handleIntFacultyImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File is too large. Max size is 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewIntFacultyImage(reader.result);
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleIntFacultyDeanPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File is too large. Max size is 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewIntFacultyDeanPhoto(reader.result);
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleCreateIntFaculty = async (e) => {
    e.preventDefault();
    if (!newIntFacultyName || !newIntFacultyDeanName) return;
    const newFaculty = {
      id: `int-fac-${Date.now()}`,
      name: newIntFacultyName,
      image: newIntFacultyImage,
      deanName: newIntFacultyDeanName,
      deanMessage: newIntFacultyDeanMessage,
      deanPhoto: newIntFacultyDeanPhoto,
      scope: 'International Academic Programs',
      majors: newIntFacultyMajors
    };
    try {
      await createFaculty(newFaculty);
      const fresh = await fetchFaculties();
      if (fresh) {
        setFacultiesList(fresh.filter(f => f.scope !== 'International Academic Programs'));
        setIntFacultiesList(fresh.filter(f => f.scope === 'International Academic Programs'));
      }
      setNewIntFacultyName('');
      setNewIntFacultyImage('');
      setNewIntFacultyDeanName('');
      setNewIntFacultyDeanMessage('');
      setNewIntFacultyDeanPhoto('');
      setNewIntFacultyMajors([]);
      setIntFacultyActionSuccess('International Faculty added successfully!');
      setTimeout(() => setIntFacultyActionSuccess(''), 3500);
    } catch (err) {
      console.warn('Error creating international faculty:', err);
    }
  };

  // Handle PDF/Document Upload to Backend / Local State
  const handleDocUpload = (e) => {
    e.preventDefault();
    if (!newDocTitle) return;

    const newDocObj = {
      id: `doc-${Date.now()}`,
      title: newDocTitle,
      category: newDocCategory,
      fileSize: newDocFile ? `${(newDocFile.size / (1024 * 1024)).toFixed(2)} MB` : '2.4 MB',
      downloads: 0,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setDocuments([newDocObj, ...documents]);
    setNewDocTitle('');
    setNewDocFile(null);
    setDocUploadSuccess(true);
    setTimeout(() => setDocUploadSuccess(false), 3500);
  };

  const handleDeleteDoc = (id) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  const handleNewsImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    if (files.length > 20) {
      alert('You can upload up to 20 photos. Extra files were skipped.');
      files.splice(20);
    }
    
    const validFiles = files.filter(f => f.size <= 2 * 1024 * 1024);
    if (validFiles.length < files.length) {
      alert('Some files exceed 2MB limit and were skipped.');
    }

    const readers = validFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        resizeAndReadAsDataURL(file, reader);
      });
    });

    Promise.all(readers).then(results => {
      setNewNewsGallery(prev => [...prev, ...results]);
      if (!newNewsImage && results.length > 0) {
        setNewNewsImage(results[0]);
      }
    });
  };

  const handleEditNewsImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length || !editingItem || editingItem.type !== 'news') return;
    
    if (files.length > 20) {
      alert('You can upload up to 20 photos. Extra files were skipped.');
      files.splice(20);
    }
    
    const validFiles = files.filter(f => f.size <= 2 * 1024 * 1024);
    if (validFiles.length < files.length) {
      alert('Some files exceed 2MB limit and were skipped.');
    }

    const readers = validFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        resizeAndReadAsDataURL(file, reader);
      });
    });

    Promise.all(readers).then(results => {
      const currentGallery = editingItem.data.gallery || [];
      const newGallery = [...currentGallery, ...results];
      const mainImage = newGallery.length > 0 ? newGallery[0] : editingItem.data.image;
      
      setEditingItem({
        ...editingItem,
        data: {
          ...editingItem.data,
          gallery: newGallery,
          image: mainImage
        }
      });
    });
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    if (!newNewsTitle || !newNewsSummary || !newNewsContent || !newNewsImage) {
      alert('Please fill out Title, Summary, Content, and upload at least one image.');
      return;
    }
    
    const newItem = {
      id: `news-${Date.now()}`,
      title: newNewsTitle,
      category: newNewsCategory,
      summary: newNewsSummary,
      content: newNewsContent,
      author: newNewsAuthor || 'BMU Admin',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: newNewsImage,
      gallery: newNewsGallery,
      tags: newNewsTags ? newNewsTags.split(',').map(t => t.trim()).filter(t => t) : [],
    };
    
    try {
      const tempItem = { ...newItem };
      setNewsList([tempItem, ...newsList]);
      
      setNewNewsTitle('');
      setNewNewsSummary('');
      setNewNewsContent('');
      setNewNewsAuthor('');
      setNewNewsImage('');
      setNewNewsGallery([]);
      setNewNewsTags('');

      await createNews(newItem);
      const fresh = await fetchNews();
      if (fresh && Array.isArray(fresh)) setNewsList(fresh);
      setSettingsSuccess('News Article published successfully!');
      setTimeout(() => setSettingsSuccess(''), 3500);
    } catch (err) {
      console.warn('Backend create failed for news:', err);
      setSettingsSuccess('Error creating news article.');
      setTimeout(() => setSettingsSuccess(''), 4500);
    }
  };

  const handleDeleteNews = async (id) => {
    setNewsList(newsList.filter((n) => n.id !== id && n._id !== id));
    try {
      await deleteNews(id);
      const fresh = await fetchNews();
      if (fresh && Array.isArray(fresh)) setNewsList(fresh);
      setSettingsSuccess('News Article deleted successfully!');
    } catch (err) {
      console.warn('Backend delete failed for news:', err);
    }
  };

  const handleMouImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    const validFiles = files.filter(f => f.size <= 2 * 1024 * 1024);
    if (validFiles.length < files.length) {
      alert('Some files exceed 2MB limit and were skipped.');
    }

    const readers = validFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        resizeAndReadAsDataURL(file, reader);
      });
    });

    Promise.all(readers).then(results => {
      setNewMouGallery(prev => [...prev, ...results]);
      if (!newMouImage && results.length > 0) {
        setNewMouImage(results[0]);
      }
    });
  };

  const handleAddMou = async (e) => {
    e.preventDefault();
    if (!newMouPartner) return;
    const newItem = {
      id: `mou-${Date.now()}`,
      partner: newMouPartner,
      category: newMouCategory,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Active Charter',
      image: newMouImage,
      gallery: newMouGallery,
    };
    try {
      const tempItem = { ...newItem };
      setMouList([tempItem, ...mouList]);
      
      setNewMouPartner('');
      setNewMouImage('');
      setNewMouGallery([]);

      await createPartnership(newItem);
      const fresh = await fetchPartnerships();
      if (fresh && Array.isArray(fresh)) setMouList(fresh);
      setSettingsSuccess('New MOU & Partner added successfully!');
      setTimeout(() => setSettingsSuccess(''), 3500);
    } catch (err) {
      console.warn('Backend create failed for partnership:', err);
      setSettingsSuccess('Error creating partnership: Image might be too large.');
      setTimeout(() => setSettingsSuccess(''), 4500);
    }
  };

  const handleDeleteMou = async (id) => {
    setMouList(mouList.filter((m) => m.id !== id && m._id !== id));
    try {
      await deletePartnership(id);
      const fresh = await fetchPartnerships();
      if (fresh && Array.isArray(fresh)) setMouList(fresh);
      setSettingsSuccess('Partnership deleted successfully!');
    } catch (err) {
      console.warn('Backend delete failed for partnership:', err);
    }
  };

  // --- Save Edit Changes ---
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    if (editingItem.type === 'program') {
      setProgramsList(programsList.map((p) => (p.id === editingItem.data.id ? editingItem.data : p)));
    } else if (editingItem.type === 'faculty') {
      setFacultiesList(facultiesList.map((f) => ((f.id === editingItem.data.id || f._id === editingItem.data._id) ? editingItem.data : f)));
      try {
        await updateFaculty(editingItem.data.id || editingItem.data._id, editingItem.data);
        const fresh = await fetchFaculties();
        if (fresh) setFacultiesList(fresh);
        setSettingsSuccess('Faculty updated successfully!');
        setTimeout(() => setSettingsSuccess(''), 3500);
      } catch (err) {
        console.warn('Backend update failed for faculty:', err);
      }
    } else if (editingItem.type === 'doc') {
      setDocuments(documents.map((d) => (d.id === editingItem.data.id ? editingItem.data : d)));
    } else if (editingItem.type === 'news') {
      const updatedList = newsList.map((n) => ((n.id === editingItem.data.id || n._id === editingItem.data.id) ? editingItem.data : n));
      setNewsList(updatedList);
      try {
        await updateNews(editingItem.data.id || editingItem.data._id, editingItem.data);
        const fresh = await fetchNews();
        if (fresh && Array.isArray(fresh)) setNewsList(fresh);
        setSettingsSuccess('News updated successfully!');
        setTimeout(() => setSettingsSuccess(''), 3500);
      } catch (err) {
        console.warn('Backend update failed for news:', err);
        setSettingsSuccess('Error updating news.');
        setTimeout(() => setSettingsSuccess(''), 4500);
      }
    } else if (editingItem.type === 'mou') {
      const updatedList = mouList.map((m) => (m.id === editingItem.data.id ? editingItem.data : m));
      setMouList(updatedList);
      try {
        await updatePartnership(editingItem.data.id, editingItem.data);
        const fresh = await fetchPartnerships();
        if (fresh && Array.isArray(fresh)) setMouList(fresh);
        setSettingsSuccess('Partnership updated successfully!');
        setTimeout(() => setSettingsSuccess(''), 3500);
      } catch (err) {
        console.warn('Backend update failed for partnership:', err);
        setSettingsSuccess('Error updating partnership.');
        setTimeout(() => setSettingsSuccess(''), 4500);
      }
    } else if (editingItem.type === 'team') {
      const updatedList = teamList.map((t) => (t.id === editingItem.data.id ? editingItem.data : t));
      setTeamList(updatedList);
      try {
        await updateTeamMember(editingItem.data.id, editingItem.data);
        const fresh = await fetchTeam();
        if (fresh && fresh.length > 0) setTeamList(fresh);
        setSettingsSuccess('Team member updated successfully!');
      } catch (err) {
        console.warn('Backend update failed for team member:', err);
      }
    } else if (editingItem.type === 'event') {
      const updatedList = eventsList.map((ev) => (ev.id === editingItem.data.id ? editingItem.data : ev));
      setEventsList(updatedList);
      try {
        await updateEvent(editingItem.data.id, editingItem.data);
        const fresh = await fetchEvents();
        if (fresh && fresh.length > 0) setEventsList(fresh);
        setSettingsSuccess('Announcement updated successfully!');
      } catch (err) {
        console.warn('Backend update failed for announcement:', err);
      }
    } else if (editingItem.type === 'internship') {
      const updatedList = internshipsList.map((int) => (int.id === editingItem.data.id ? editingItem.data : int));
      setInternshipsList(updatedList);
      try {
        await updateInternship(editingItem.data.id, editingItem.data);
        const fresh = await fetchInternships();
        if (fresh && Array.isArray(fresh)) setInternshipsList(fresh);
        setSettingsSuccess('Internship & Career opportunity updated successfully!');
      } catch (err) {
        console.warn('Backend update failed for internship:', err);
      }
    } else if (editingItem.type === 'scholarship') {
      const updatedList = scholarshipsList.map((s) => (s.id === editingItem.data.id ? editingItem.data : s));
      setScholarshipsList(updatedList);
      try {
        await updateScholarship(editingItem.data.id, editingItem.data);
        const fresh = await fetchScholarships();
        if (fresh && Array.isArray(fresh)) setScholarshipsList(fresh);
        setSettingsSuccess('Scholarship announcement updated successfully!');
        setTimeout(() => setSettingsSuccess(''), 3500);
      } catch (err) {
        console.warn('Backend update failed for scholarship:', err);
        setSettingsSuccess('Error updating scholarship: Image might be too large.');
        setTimeout(() => setSettingsSuccess(''), 4500);
      }
    } else if (editingItem.type === 'campus-life') {
      const updatedList = campusLifeList.map((c) => (c.id === editingItem.data.id ? editingItem.data : c));
      setCampusLifeList(updatedList);
      try {
        await updateCampusLife(editingItem.data.id, editingItem.data);
        const fresh = await fetchCampusLife();
        if (fresh && Array.isArray(fresh)) setCampusLifeList(fresh);
        setSettingsSuccess('Campus life photo updated successfully!');
        setTimeout(() => setSettingsSuccess(''), 3500);
      } catch (err) {
        console.warn('Backend update failed for campus life:', err);
        setSettingsSuccess('Error updating campus life photo: Image might be too large.');
        setTimeout(() => setSettingsSuccess(''), 4500);
      }
    } else if (editingItem.type === 'community-service') {
      const updatedList = communityServicesList.map((cs) => (cs.id === editingItem.data.id ? editingItem.data : cs));
      setCommunityServicesList(updatedList);
      try {
        await updateCommunityService(editingItem.data.id, editingItem.data);
        const fresh = await fetchCommunityServices();
        if (fresh && Array.isArray(fresh)) setCommunityServicesList(fresh);
        setSettingsSuccess('Community service updated successfully!');
        setTimeout(() => setSettingsSuccess(''), 3500);
      } catch (err) {
        console.warn('Backend update failed for community service:', err);
        setSettingsSuccess('Error updating community service: Image might be too large.');
        setTimeout(() => setSettingsSuccess(''), 4500);
      }
    } else if (editingItem.type === 'slide') {
      const updatedSlides = (settingsData.banner.slides || []).map((s) => (s.id === editingItem.data.id ? editingItem.data : s));
      const newBannerData = {
        ...settingsData.banner,
        slides: updatedSlides
      };
      setSettingsData({
        ...settingsData,
        banner: newBannerData
      });
      saveSetting('banner', {
        title: newBannerData.title || '',
        subtitle: newBannerData.subtitle || '',
        tag: newBannerData.tag || 'Global Collaboration',
        image: newBannerData.image || '',
        slides: updatedSlides
      });
    } else if (editingItem.type === 'partner') {
      const updatedList = partnersList.map((p) => ((p.id || p._id) === (editingItem.data.id || editingItem.data._id) ? editingItem.data : p));
      setPartnersList(updatedList);
      try {
        await updatePartner(editingItem.data.id || editingItem.data._id, editingItem.data);
        const fresh = await fetchPartners();
        if (fresh && Array.isArray(fresh)) setPartnersList(fresh);
        setSettingsSuccess('Partner updated successfully!');
        setTimeout(() => setSettingsSuccess(''), 3500);
      } catch (err) {
        console.warn('Backend update failed for partner:', err);
        setSettingsSuccess('Error updating partner.');
        setTimeout(() => setSettingsSuccess(''), 4500);
      }
    } else if (editingItem.type === 'emblem') {
      const updatedEmblems = (settingsData.partner_emblems?.emblems || []).map((e) => (e.id === editingItem.data.id ? editingItem.data : e));
      const newEmblemsObj = { emblems: updatedEmblems };
      setSettingsData({
        ...settingsData,
        partner_emblems: newEmblemsObj
      });
      saveSetting('partner_emblems', newEmblemsObj);
    }
    setEditingItem(null);
  };

  const handleStatusChange = (appId, newStatus) => {
    setApplications(applications.map((app) => (app.id === appId ? { ...app, status: newStatus } : app)));
  };

  const handleAddBannerSlide = (e) => {
    e.preventDefault();
    if (!newSlideTitle || !newSlideImage) {
      alert('Please provide at least a Banner Image and Title!');
      return;
    }
    const newSlide = {
      id: `slide-${Date.now()}`,
      image: newSlideImage,
      tag: newSlideTag || 'Featured Banner',
      title: newSlideTitle,
      subtitle: newSlideSubtitle || 'Excellence in Higher Education & Research'
    };
    const updatedSlides = [...(settingsData.banner.slides || []), newSlide];
    setSettingsData({
      ...settingsData,
      banner: {
        ...settingsData.banner,
        slides: updatedSlides
      }
    });
    setNewSlideTitle('');
    setNewSlideSubtitle('');
    setNewSlideTag('Global Collaboration');
    setNewSlideImage('');
    setSettingsSuccess('New Banner Slide added to the list below! Remember to click Publish All Banner Slides Live.');
    setTimeout(() => setSettingsSuccess(''), 3500);
  };

  const handleDeleteBannerSlide = (slideId) => {
    const updatedSlides = (settingsData.banner.slides || []).filter((s) => s.id !== slideId);
    setSettingsData({
      ...settingsData,
      banner: {
        ...settingsData.banner,
        slides: updatedSlides
      }
    });
    setSettingsSuccess('Slide removed from the list. Remember to click Publish All Banner Slides Live.');
    setTimeout(() => setSettingsSuccess(''), 3500);
  };

  const handleNewSlideImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewSlideImage(reader.result);
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleAddEmblem = async (e) => {
    e.preventDefault();
    if (!newEmblemName || !newEmblemImage) {
      alert('Please provide both the Institutional Partner Name and upload/paste the Emblem Logo Image!');
      return;
    }
    const newEmb = {
      id: `emb-${Date.now()}`,
      name: newEmblemName,
      src: newEmblemImage
    };
    const updatedEmblems = [...(settingsData.partner_emblems?.emblems || []), newEmb];
    const newEmblemsObj = { emblems: updatedEmblems };
    setSettingsData({
      ...settingsData,
      partner_emblems: newEmblemsObj
    });
    setNewEmblemName('');
    setNewEmblemImage('');
    setSettingsSuccess('New partner emblem added! Saving directly to live portal database...');
    await saveSetting('partner_emblems', newEmblemsObj);
    setSettingsSuccess('Official Institutional Partner Emblems successfully published live!');
    setTimeout(() => setSettingsSuccess(''), 3500);
  };

  const handleDeleteEmblem = async (embId) => {
    const updatedEmblems = (settingsData.partner_emblems?.emblems || []).filter((e) => e.id !== embId);
    const newEmblemsObj = { emblems: updatedEmblems };
    setSettingsData({
      ...settingsData,
      partner_emblems: newEmblemsObj
    });
    setSettingsSuccess('Emblem removed! Syncing changes with database...');
    await saveSetting('partner_emblems', newEmblemsObj);
    setSettingsSuccess('Official Institutional Partner Emblems updated successfully!');
    setTimeout(() => setSettingsSuccess(''), 3500);
  };

  const handleNewEmblemImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEmblemImage(reader.result);
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await saveSetting('banner', { 
      title: settingsData.banner?.title || '', 
      subtitle: settingsData.banner?.subtitle || '',
      tag: settingsData.banner?.tag || 'Global Collaboration',
      image: settingsData.banner?.image || '',
      slides: settingsData.banner?.slides || []
    });
    await saveSetting('partner_emblems', {
      emblems: settingsData.partner_emblems?.emblems || []
    });
    await saveSetting('stats', { content: settingsData.stats?.content || { activeStudents: '12,450+', faculties: '8 Academic Schools', institutions: '15+ Global Centers' } });
    await saveSetting('tuition_fees', { content: settingsData.tuition_fees?.content || [] });
    setSettingsSuccess('All Website Hero Carousel Slides, Partner Emblems, Stats, and Tuition Schedules saved and published live across student portal!');
    setTimeout(() => setSettingsSuccess(''), 3500);
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettingsData((prev) => ({
          ...prev,
          banner: { ...prev.banner, image: reader.result }
        }));
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleAddTeam = async (e) => {
    e.preventDefault();
    if (!newTeamName) return;
    const newMemberData = {
      id: `team-${Date.now()}`,
      name: newTeamName,
      title: newTeamTitle || 'Executive University Leader',
      roleCategory: newTeamCategory,
      highlight: newTeamHighlight || '',
      message: newTeamMessage || 'Shaping the next generation of Southeast Asian quantum pioneers.',
      photoUrl: newTeamPhotoUrl || '',
      bio: newTeamBio || 'Distinguished academic leader with extensive industry and research credentials.',
      facebook: newTeamFacebook || 'https://facebook.com/bonamary',
      email: newTeamEmail || 'info@bonamary.edu.kh',
      department: newTeamDepartment || 'Academic Leadership & Deans',
      education: newTeamEducation || 'Ph.D. / Advanced Executive Leadership',
      publications: Number(newTeamPublications) || 35,
      citations: newTeamCitations || '1,800+',
      office: newTeamOffice || 'Executive Academic Wing'
    };
    setTeamList([...teamList, newMemberData]);
    try {
      await createTeamMember(newMemberData);
      const fresh = await fetchTeam();
      if (fresh && fresh.length > 0) setTeamList(fresh);
      setSettingsSuccess('Management team member added successfully!');
    } catch (err) {
      console.warn('Backend create failed for team member:', err);
    }
    setNewTeamName('');
    setNewTeamTitle('');
    setNewTeamHighlight('');
    setNewTeamMessage('');
    setNewTeamPhotoUrl('');
    setNewTeamBio('');
    setNewTeamFacebook('');
    setNewTeamEmail('');
    setNewTeamDepartment('Academic Leadership & Deans');
    setNewTeamEducation('Ph.D. / Advanced Executive Leadership');
    setNewTeamPublications('35');
    setNewTeamCitations('1,800+');
    setNewTeamOffice('Executive Academic Wing');
  };

  const handleDeleteTeam = async (id) => {
    setTeamList(teamList.filter((t) => t.id !== id));
    try {
      await deleteTeamMember(id);
      const fresh = await fetchTeam();
      if (fresh && fresh.length > 0) setTeamList(fresh);
      setSettingsSuccess('Team member deleted successfully!');
    } catch (err) {
      console.warn('Backend delete failed for team member:', err);
    }
  };

  const handleReorderTeam = async (id, direction) => {
    try {
      const updatedList = await reorderTeamMember(id, direction);
      if (updatedList && updatedList.length > 0) {
        setTeamList(updatedList);
        setSettingsSuccess(`Moved team member ${direction === 'up' ? 'up ↑' : 'down ↓'} successfully!`);
      } else {
        const fresh = await fetchTeam();
        if (fresh && fresh.length > 0) setTeamList(fresh);
      }
    } catch (err) {
      console.warn('Failed reordering team member:', err);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEventTitle) return;
    const eventId = `ev-${Date.now()}`;
    const newEvent = {
        id: eventId,
        title: newEventTitle,
        category: 'Announcement',
        eventDate: newEventDate,
        location: 'BMU SCIF Enclave Campus',
        description: newEventDesc || 'Strategic university gathering featuring academic workshops and student symposiums.',
        photos: [newEventImage].filter(Boolean)
    };
    
    // Optimistic update
    setEventsList([newEvent, ...eventsList]);
    setNewEventTitle('');
    setNewEventDesc('');
    setNewEventImage('');

    try {
      await createEvent(newEvent);
      const fresh = await fetchEvents();
      if (fresh && fresh.length > 0) setEventsList(fresh);
      setSettingsSuccess('Announcement published successfully!');
    } catch (err) {
      console.warn('Backend create failed for announcement:', err);
    }
  };

  const handleDeleteEvent = async (id) => {
    setEventsList(eventsList.filter((ev) => ev.id !== id));
    try {
      await deleteEvent(id);
      setSettingsSuccess('Announcement deleted successfully!');
    } catch (err) {
      console.warn('Backend delete failed for announcement:', err);
    }
  };

  const handleNewEventImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEventImage(reader.result);
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleNewIntImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewIntImage(reader.result);
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleEditIntImageChange = (e) => {
    const file = e.target.files[0];
    if (file && editingItem && editingItem.type === 'internship') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingItem({
          ...editingItem,
          data: { ...editingItem.data, image: reader.result }
        });
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleNewScholImage1Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewScholarshipImage1(reader.result);
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleNewScholImage2Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewScholarshipImage2(reader.result);
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleEditScholImage1Change = (e) => {
    const file = e.target.files[0];
    if (file && editingItem && editingItem.type === 'scholarship') {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...(editingItem.data.images || [])];
        newImages[0] = reader.result;
        setEditingItem({
          ...editingItem,
          data: { ...editingItem.data, images: newImages }
        });
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleEditScholImage2Change = (e) => {
    const file = e.target.files[0];
    if (file && editingItem && editingItem.type === 'scholarship') {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...(editingItem.data.images || [])];
        newImages[1] = reader.result;
        setEditingItem({
          ...editingItem,
          data: { ...editingItem.data, images: newImages }
        });
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleEditCampusLifeImageChange = (e) => {
    const file = e.target.files[0];
    if (file && editingItem && (editingItem.type === 'campus-life' || editingItem.type === 'community-service')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingItem({
          ...editingItem,
          data: { ...editingItem.data, image: reader.result }
        });
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleAddInternship = async (e) => {
    e.preventDefault();
    if (!newIntCompany || !newIntPos) return;
    const newInt = {
      id: `int-${Date.now()}`,
      company: newIntCompany,
      position: newIntPos,
      stipend: newIntStipend || '$1,500 / Month',
      status: newIntStatus || 'Year 3 Scholar',
      image: newIntImage || '',
      description: newIntDesc || 'Direct work-study articulation opportunity for high-merit students.'
    };
    setInternshipsList([newInt, ...internshipsList]);
    setNewIntCompany('');
    setNewIntPos('');
    setNewIntDesc('');
    setNewIntImage('');
    setNewIntStatus('Year 3 Scholar');
    try {
      await createInternship(newInt);
      const fresh = await fetchInternships();
      if (fresh && Array.isArray(fresh)) setInternshipsList(fresh);
      setSettingsSuccess('New internship opportunity created successfully!');
    } catch (err) {
      console.warn('Backend create failed for internship:', err);
    }
  };

  const handleDeleteInternship = async (id) => {
    setInternshipsList(internshipsList.filter((i) => i.id !== id));
    try {
      await deleteInternship(id);
      const fresh = await fetchInternships();
      if (fresh && Array.isArray(fresh)) setInternshipsList(fresh);
      setSettingsSuccess('Internship deleted successfully!');
    } catch (err) {
      console.warn('Backend delete failed for internship:', err);
    }
  };
  // --- Scholarship Handlers ---
  const handleAddScholarship = async (e) => {
    e.preventDefault();
    if (!newScholarshipTitle) return;
    const newSchol = {
      id: `schol-${Date.now()}`,
      title: newScholarshipTitle,
      subtitle: newScholarshipSubtitle,
      description: newScholarshipDesc,
      academicYear: newScholarshipYear || 'Academic Year 2025–2026',
      status: newScholarshipStatus || 'Active',
      images: [newScholarshipImage1, newScholarshipImage2].filter(Boolean)
    };
    setScholarshipsList([newSchol, ...scholarshipsList]);
    setNewScholarshipTitle('');
    setNewScholarshipSubtitle('');
    setNewScholarshipDesc('');
    setNewScholarshipYear('Academic Year 2025–2026');
    setNewScholarshipImage1('');
    setNewScholarshipImage2('');
    try {
      await createScholarship(newSchol);
      const fresh = await fetchScholarships();
      if (fresh && Array.isArray(fresh)) setScholarshipsList(fresh);
      setSettingsSuccess('New scholarship announcement created successfully!');
      setTimeout(() => setSettingsSuccess(''), 3500);
    } catch (err) {
      console.warn('Backend create failed for scholarship:', err);
      setSettingsSuccess('Error creating scholarship: Image might be too large.');
      setTimeout(() => setSettingsSuccess(''), 4500);
    }
  };

  const handleDeleteScholarship = async (id) => {
    setScholarshipsList(scholarshipsList.filter((s) => s.id !== id));
    try {
      await deleteScholarship(id);
      const fresh = await fetchScholarships();
      if (fresh && Array.isArray(fresh)) setScholarshipsList(fresh);
      setSettingsSuccess('Scholarship deleted successfully!');
    } catch (err) {
      console.warn('Backend delete failed for scholarship:', err);
    }
  };

  // --- Campus Life Handlers ---
  const handleCampusLifeImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit. Please select a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCampusImage(reader.result);
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleAddCampusLife = async (e) => {
    e.preventDefault();
    if (!newCampusTitle) return;
    const newItem = {
      title: newCampusTitle,
      category: newCampusCategory || 'General',
      description: newCampusDesc,
      image: newCampusImage
    };
    try {
      // Optimistic update
      const tempItem = { id: `cl-${Date.now()}`, ...newItem };
      setCampusLifeList([tempItem, ...campusLifeList]);
      
      setNewCampusTitle('');
      setNewCampusCategory('');
      setNewCampusDesc('');
      setNewCampusImage('');

      await createCampusLife(newItem);
      const fresh = await fetchCampusLife();
      if (fresh && Array.isArray(fresh)) setCampusLifeList(fresh);
      setSettingsSuccess('New campus life photo added successfully!');
      setTimeout(() => setSettingsSuccess(''), 3500);
    } catch (err) {
      console.warn('Backend create failed for campus life:', err);
      // Revert optimistic update on failure
      setCampusLifeList(campusLifeList);
      setSettingsSuccess('Error creating campus life photo: Server unreachable or image too large.');
      setTimeout(() => setSettingsSuccess(''), 4500);
    }
  };

  const handleDeleteCampusLife = async (id) => {
    setCampusLifeList(campusLifeList.filter((c) => c.id !== id && c._id !== id));
    try {
      await deleteCampusLife(id);
      const fresh = await fetchCampusLife();
      if (fresh && Array.isArray(fresh)) setCampusLifeList(fresh);
      setSettingsSuccess('Campus life photo deleted successfully!');
      setTimeout(() => setSettingsSuccess(''), 3500);
    } catch (err) {
      console.warn('Backend delete failed for campus life:', err);
    }
  };

  // --- Community Services Handlers ---
  const handleCommunityImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit. Please select a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCommunityImage(reader.result);
      };
      resizeAndReadAsDataURL(file, reader);
    }
  };

  const handleAddCommunityService = async (e) => {
    e.preventDefault();
    if (!newCommunityTitle) return;
    const newItem = {
      title: newCommunityTitle,
      subtitle: newCommunitySubtitle,
      programName: newCommunityProgram,
      duration: newCommunityDuration,
      description: newCommunityDesc,
      acknowledgements: newCommunityAcks.split('\n').filter(Boolean),
      image: newCommunityImage
    };
    try {
      // Optimistic update
      const tempItem = { id: `cs-${Date.now()}`, ...newItem };
      setCommunityServicesList([tempItem, ...communityServicesList]);
      
      setNewCommunityTitle('');
      setNewCommunitySubtitle('');
      setNewCommunityProgram('Volunteer Exchange Program');
      setNewCommunityDuration('14-Day Global Visit');
      setNewCommunityDesc('');
      setNewCommunityAcks('');
      setNewCommunityImage('');

      await createCommunityService(newItem);
      const fresh = await fetchCommunityServices();
      if (fresh && Array.isArray(fresh)) setCommunityServicesList(fresh);
      setSettingsSuccess('New community service added successfully!');
      setTimeout(() => setSettingsSuccess(''), 3500);
    } catch (err) {
      console.warn('Backend create failed for community service:', err);
      // Revert optimistic update on failure
      setCommunityServicesList(communityServicesList);
      setSettingsSuccess('Error creating community service: Server unreachable or image too large.');
      setTimeout(() => setSettingsSuccess(''), 4500);
    }
  };

  const handleDeleteCommunityService = async (id) => {
    setCommunityServicesList(communityServicesList.filter((c) => c.id !== id && c._id !== id));
    try {
      await deleteCommunityService(id);
      const fresh = await fetchCommunityServices();
      if (fresh && Array.isArray(fresh)) setCommunityServicesList(fresh);
      setSettingsSuccess('Community service deleted successfully!');
      setTimeout(() => setSettingsSuccess(''), 3500);
    } catch (err) {
      console.warn('Backend delete failed for community service:', err);
    }
  };
  // --- Partners Handlers (Global Reach) ---
  const handleAddPartner = async (e) => {
    e.preventDefault();
    const newPartner = {
      id: `partner-${Date.now()}`,
      title: newPartnerTitle,
      category: newPartnerCategory,
      location: newPartnerLocation,
      badge: newPartnerBadge,
      scope: newPartnerScope,
      description: newPartnerDesc,
      websiteUrl: newPartnerWebsiteUrl,
    };
    try {
      await createPartner(newPartner);
      const fresh = await fetchPartners();
      if (fresh && Array.isArray(fresh)) setPartnersList(fresh);
      setNewPartnerTitle('');
      setNewPartnerCategory('International Partners & Collaborations');
      setNewPartnerLocation('Global');
      setNewPartnerBadge('Global Partner');
      setNewPartnerScope('Dual Degree & Research Articulation');
      setNewPartnerDesc('');
      setNewPartnerWebsiteUrl('');
      setSettingsSuccess('Partner added successfully!');
      setTimeout(() => setSettingsSuccess(''), 3500);
    } catch (err) {
      console.warn('Backend create failed for partner:', err);
    }
  };

  const handleDeletePartner = async (id) => {
    try {
      await deletePartner(id);
      const fresh = await fetchPartners();
      if (fresh && Array.isArray(fresh)) setPartnersList(fresh);
      setSettingsSuccess('Partner deleted successfully!');
      setTimeout(() => setSettingsSuccess(''), 3500);
    } catch (err) {
      console.warn('Backend delete failed for partner:', err);
    }
  };



  return (
    <div className="py-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 text-left">
      {/* Top Section Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>Executive Admin Command Enclave • Full CMS Permissions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            BMU <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">Content & Data Foundry</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Real-time management for Website Banner, Active Students, Tuition, Leadership, Partners, News, Events, and Careers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 shadow-sm flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <div className="text-xs">
              <div className="font-bold text-gray-200">{apiHealth.status}</div>
              <div className="text-gray-400 font-mono text-[11px]">{apiHealth.db}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Navigation Tabs - All 9 Modules */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 p-2.5 rounded-2xl bg-gray-900/80 border border-gray-800 shadow-lg">
        {[
          { id: 'programs', label: 'Programs & Degrees', icon: BookOpen, count: programsList.length || '12+' },
          { id: 'international', label: 'International Gallery', icon: ImageIcon, count: intlGalleryList.length },
          { id: 'advertisement', label: 'Advertisement Popup', icon: Sparkles, count: promoActive ? 'Active' : 'Inactive' },
          { id: 'settings', label: 'Banner, Stats & Tuition', icon: Settings, count: '3 Sections' },
          { id: 'team', label: 'Leadership & Team', icon: Users, count: teamList.length },
          { id: 'mou', label: 'Partners & MOU Signings', icon: Globe, count: mouList.length },
          { id: 'global-reach', label: 'Global Reach & Partners', icon: Globe, count: partnersList.length },
          { id: 'news', label: 'News & Gallery Manager', icon: ImageIcon, count: newsList.length },
          { id: 'events', label: 'Announcements', icon: Award, count: eventsList.length },
          { id: 'internships', label: 'Internships & Careers', icon: FileText, count: internshipsList.length },
          { id: 'scholarships', label: 'Scholarships & Aid', icon: Award, count: scholarshipsList.length },
          { id: 'campus-life', label: 'Campus Life Photos', icon: ImageIcon, count: campusLifeList.length },
          { id: 'community-services', label: 'Community Services', icon: HandHeart, count: communityServicesList.length },
          { id: 'library', label: 'Library & PDF Upload', icon: Upload, count: documents.length },
          { id: 'applications', label: 'Student Admissions Inbox', icon: Bell, count: applications.length },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-900/30 border border-rose-500 scale-[1.02]'
                  : 'text-gray-300 hover:bg-gray-800/80 hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${activeTab === tab.id ? 'text-white' : 'text-rose-400'}`} />
                <span className="truncate">{tab.label}</span>
              </div>
              {tab.count && (
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono shrink-0 ${activeTab === tab.id ? 'bg-black/30 text-white font-bold' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

                {/* TAB 0: PROGRAMS & DEGREES MANAGER (INSERT, UPDATE, DELETE) */}
        {activeTab === 'programs' && (
          <>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-1 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                  <div className="p-3 rounded-2xl bg-bmu-red/10 text-bmu-red">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Insert International Faculty</h3>
                    <p className="text-xs text-slate-500">Manage International Faculties & Majors</p>
                  </div>
                </div>

                {intFacultyActionSuccess && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{intFacultyActionSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleCreateIntFaculty} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Faculty Name *</label>
                    <input
                      type="text"
                      required
                      value={newIntFacultyName}
                      onChange={(e) => setNewIntFacultyName(e.target.value)}
                      placeholder="e.g. Faculty of Global AI"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Faculty Cover Image (Max 2MB)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIntFacultyImageUpload}
                      className="w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                    />
                    {newIntFacultyImage && (
                      <img src={newIntFacultyImage} alt="Preview" className="mt-3 h-20 w-full object-cover rounded-xl border border-slate-200" />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Dean Name *</label>
                    <input
                      type="text"
                      required
                      value={newIntFacultyDeanName}
                      onChange={(e) => setNewIntFacultyDeanName(e.target.value)}
                      placeholder="e.g. Dr. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Dean Message *</label>
                    <textarea
                      required
                      value={newIntFacultyDeanMessage}
                      onChange={(e) => setNewIntFacultyDeanMessage(e.target.value)}
                      placeholder="Welcome message from Dean..."
                      rows={3}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Dean Photo (Max 2MB)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIntFacultyDeanPhotoUpload}
                      className="w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-bmu-red/10 file:text-bmu-red hover:file:bg-bmu-red/20"
                    />
                    {newIntFacultyDeanPhoto && (
                      <img src={newIntFacultyDeanPhoto} alt="Preview" className="mt-3 h-16 w-16 object-cover rounded-full border border-slate-200" />
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-bmu-red to-bmu-pink text-white font-extrabold text-sm shadow-glow-red hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Insert International Faculty</span>
                  </button>
                </form>
              </Card>

              {/* Faculties List */}
              <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Active International Faculties</h3>
                    <p className="text-xs text-slate-500">{intFacultiesList.length} Faculties Indexed</p>
                  </div>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {intFacultiesList.map((faculty) => (
                    <div key={faculty.id || faculty._id} className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-bmu-red/30 transition-all shadow-sm flex flex-col sm:flex-row gap-4 sm:items-center">
                      {faculty.deanPhoto && (
                        <img src={faculty.deanPhoto} alt={faculty.deanName} className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-200" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-extrabold text-slate-900 truncate">{faculty.name}</h4>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold tracking-wider uppercase border border-slate-200 shrink-0">
                            {faculty.majors?.length || 0} Majors
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium">Dean: {faculty.deanName}</p>
                      </div>

                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <button
                          onClick={() => {
                            setEditingItem({ type: 'faculty', data: faculty });
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        >
                          <Edit2 className="w-4 h-4 shrink-0" />
                          <span>Manage Majors</span>
                        </button>
                        <button
                          onClick={() => handleDeleteFaculty(faculty.id || faculty._id)}
                          className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                          title="Delete Faculty"
                        >
                          <Trash2 className="w-4 h-4 shrink-0" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 pt-12 border-t border-slate-200">
              {/* National Faculties Create Form */}
              <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-1 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                  <div className="p-3 rounded-2xl bg-bmu-red/10 text-bmu-red">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Insert National Faculty</h3>
                    <p className="text-xs text-slate-500">Manage Faculties & Majors</p>
                  </div>
                </div>

                {facultyActionSuccess && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{facultyActionSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleCreateFaculty} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Faculty Name *</label>
                    <input
                      type="text"
                      required
                      value={newFacultyName}
                      onChange={(e) => setNewFacultyName(e.target.value)}
                      placeholder="e.g. Faculty of Law"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Faculty Cover Image (Max 2MB)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFacultyImageUpload}
                      className="w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                    />
                    {newFacultyImage && (
                      <img src={newFacultyImage} alt="Preview" className="mt-3 h-20 w-full object-cover rounded-xl border border-slate-200" />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Dean Name *</label>
                    <input
                      type="text"
                      required
                      value={newFacultyDeanName}
                      onChange={(e) => setNewFacultyDeanName(e.target.value)}
                      placeholder="e.g. Dr. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Dean Message *</label>
                    <textarea
                      required
                      value={newFacultyDeanMessage}
                      onChange={(e) => setNewFacultyDeanMessage(e.target.value)}
                      placeholder="Welcome message from Dean..."
                      rows={3}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Dean Photo (Max 2MB)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFacultyDeanPhotoUpload}
                      className="w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-bmu-red/10 file:text-bmu-red hover:file:bg-bmu-red/20"
                    />
                    {newFacultyDeanPhoto && (
                      <img src={newFacultyDeanPhoto} alt="Preview" className="mt-3 h-16 w-16 object-cover rounded-full border border-slate-200" />
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Faculty</span>
                  </button>
                </form>
              </Card>

              {/* Faculties List */}
              <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Active Faculties</h3>
                    <p className="text-xs text-slate-500">{facultiesList.length} Faculties Indexed</p>
                  </div>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {facultiesList.map((faculty) => (
                    <div key={faculty.id || faculty._id} className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-bmu-red/30 transition-all shadow-sm flex flex-col sm:flex-row gap-4 sm:items-center">
                      {faculty.deanPhoto && (
                        <img src={faculty.deanPhoto} alt={faculty.deanName} className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-200" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-extrabold text-slate-900 truncate">{faculty.name}</h4>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold tracking-wider uppercase border border-slate-200 shrink-0">
                            {faculty.majors?.length || 0} Majors
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium">Dean: {faculty.deanName}</p>
                      </div>

                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <button
                          onClick={() => {
                            setEditingItem({ type: 'faculty', data: faculty });
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        >
                          <Edit2 className="w-4 h-4 shrink-0" />
                          <span>Manage Majors</span>
                        </button>
                        <button
                          onClick={() => handleDeleteFaculty(faculty.id || faculty._id)}
                          className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                          title="Delete Faculty"
                        >
                          <Trash2 className="w-4 h-4 shrink-0" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </>
        )}

        {/* TAB 1: LIBRARY & PDF DOCUMENT UPLOAD MANAGER */}
        {activeTab === 'library' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Form Box */}
            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="p-3 rounded-2xl bg-bmu-red/10 text-bmu-red">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Upload New PDF / Document</h3>
                  <p className="text-xs text-slate-500">Publish institutional archives to `/library`</p>
                </div>
              </div>

              {docUploadSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Document uploaded and published to Library instantly!</span>
                </div>
              )}

              <form onSubmit={handleDocUpload} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Document Title *</label>
                  <input
                    type="text"
                    required
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    placeholder="e.g. 2026 Quantum Scholarship Handbook"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Document Category *</label>
                  <select
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red font-semibold"
                  >
                    <option value="Scholarship Announcement">Scholarship Announcement</option>
                    <option value="Research Whitepaper">Research Whitepaper</option>
                    <option value="Exchange Report">Exchange Report</option>
                    <option value="Syllabus Archive">Syllabus Archive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Attach PDF / DOC File *</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-bmu-red transition-colors bg-slate-50/50 cursor-pointer relative">
                    <input
                      key={newDocFile ? newDocFile.name : Date.now()}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setNewDocFile(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <FolderPlus className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    {newDocFile ? (
                      <div className="text-xs font-bold text-bmu-red truncate">{newDocFile.name}</div>
                    ) : (
                      <div className="text-xs text-slate-600">
                        <strong className="text-slate-900">Click to select file</strong> or drag & drop PDF (Max 25MB)
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-bmu-red to-bmu-pink text-white font-extrabold text-sm shadow-glow-red hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Publish Document to Library</span>
                </button>
              </form>
            </Card>

            {/* Active Documents Archive List */}
            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Active Library PDF Repository</h3>
                  <p className="text-xs text-slate-500">Live documents accessible to students and faculty</p>
                </div>
                <Link to="/library" className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5">
                  <span>View Public Library</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {(documents || []).map((doc) => (
                  <div key={doc.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-bmu-red transition-all">
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="p-2.5 rounded-xl bg-bmu-red/10 text-bmu-red shrink-0 mt-0.5">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] uppercase tracking-wider">
                          {doc.category}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1 truncate">{doc.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 truncate">
                          <span>Size: {doc.fileSize}</span>
                          <span>•</span>
                          <span>Downloads: {doc.downloads}</span>
                          <span>•</span>
                          <span>Published: {doc.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-slate-200/60 sm:border-0">
                      <button
                        onClick={() => setEditingItem({ type: 'doc', data: { ...doc } })}
                        className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Edit Document"
                      >
                        <Edit2 className="w-4 h-4 shrink-0" />
                        <span>Update</span>
                      </button>
                      <button
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Delete Document"
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* TAB 2: NEWS & MULTI-IMAGE GALLERY MANAGER */}
        {activeTab === 'news' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="p-3 rounded-2xl bg-bmu-pink/10 text-bmu-pink">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Post University News</h3>
                  <p className="text-xs text-slate-500">With multi-photo gallery support</p>
                </div>
              </div>

              <form onSubmit={handleAddNews} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Article Headline *</label>
                  <input
                    type="text"
                    required
                    value={newNewsTitle}
                    onChange={(e) => setNewNewsTitle(e.target.value)}
                    placeholder="e.g. BMU Students Win ASEAN AI Hackathon 2026"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">News Category *</label>
                  <select
                    value={newNewsCategory}
                    onChange={(e) => setNewNewsCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none font-semibold"
                  >
                    <option value="Academic Research">Academic Research</option>
                    <option value="Campus Expansion">Campus Expansion</option>
                    <option value="Global Partnerships">Global Partnerships</option>
                    <option value="Student Achievements">Student Achievements</option>
                    <option value="Innovation & Entrepreneurship">Innovation & Entrepreneurship</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Author</label>
                    <input
                      type="text"
                      value={newNewsAuthor}
                      onChange={(e) => setNewNewsAuthor(e.target.value)}
                      placeholder="e.g. Dr. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={newNewsTags}
                      onChange={(e) => setNewNewsTags(e.target.value)}
                      placeholder="e.g. AI, Hackathon, Students"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-pink"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Short Summary *</label>
                  <textarea
                    required
                    value={newNewsSummary}
                    onChange={(e) => setNewNewsSummary(e.target.value)}
                    placeholder="Brief summary of the article..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-pink"
                    rows="2"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Full Content *</label>
                  <textarea
                    required
                    value={newNewsContent}
                    onChange={(e) => setNewNewsContent(e.target.value)}
                    placeholder="Full article content..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-pink"
                    rows="4"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Attach Gallery Photos (Multi-Select) *</label>
                  <label className="cursor-pointer border-2 border-dashed border-slate-300 rounded-2xl p-5 text-center bg-slate-50 text-xs text-slate-600 block hover:bg-slate-100 transition-colors">
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleNewsImageUpload} />
                    <ImageIcon className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                    <span>Click to Upload up to 20 photos (Max 2MB each)</span>
                    {newNewsGallery.length > 0 && (
                      <div className="mt-2 text-bmu-red font-semibold">{newNewsGallery.length} photo(s) selected</div>
                    )}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-bmu-pink to-bmu-red text-white font-extrabold text-sm shadow-glow-red hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish News Article</span>
                </button>
              </form>
            </Card>

            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-xl font-black text-slate-900">Published News Articles & Galleries</h3>
                <Link to="/news" className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5">
                  <span>View News Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {newsList.map((news) => (
                  <div key={news.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden">
                    <div className="min-w-0 flex-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] uppercase inline-block truncate max-w-full">
                        {news.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1 truncate">{news.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">Published: {news.date} • 📸 {news.photosCount} photos attached in gallery</p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-slate-200/60 sm:border-0">
                      <button
                        onClick={() => setEditingItem({ type: 'news', data: { ...news } })}
                        className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Edit News"
                      >
                        <Edit2 className="w-4 h-4 shrink-0" />
                        <span>Update</span>
                      </button>
                      <button
                        onClick={() => handleDeleteNews(news.id)}
                        className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Delete News"
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* TAB 3: STUDENT ADMISSIONS INBOX */}
        {activeTab === 'applications' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Student Admissions & Enrollment Inbox</h3>
                  <p className="text-xs text-slate-500">Review applications submitted from the `/admission` portal</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-bmu-red/10 text-bmu-red text-xs font-bold">
                  {applications.length} Active Candidates
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-black uppercase text-slate-600 bg-slate-50">
                      <th className="p-3.5">App ID</th>
                      <th className="p-3.5">Student Name</th>
                      <th className="p-3.5">Applied Program</th>
                      <th className="p-3.5">Previous GPA</th>
                      <th className="p-3.5">Submission Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-slate-900">{app.id}</td>
                        <td className="p-3.5 font-bold text-slate-900">{app.studentName}</td>
                        <td className="p-3.5 text-slate-600">{app.program}</td>
                        <td className="p-3.5 font-mono font-bold text-emerald-600">{app.gpa}</td>
                        <td className="p-3.5 text-slate-500 text-xs">{app.submittedDate}</td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            app.status === 'Approved & Enrolled'
                              ? 'bg-emerald-100 text-emerald-800'
                              : app.status === 'Pending Verification'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleStatusChange(app.id, 'Approved & Enrolled')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(app.id, 'Interview Scheduled')}
                            className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-300 transition-colors"
                          >
                            Interview
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {/* TAB 4: MOU & PARTNERS MANAGER */}
        {activeTab === 'mou' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="p-3 rounded-2xl bg-bmu-red/10 text-bmu-red">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Add MOU & Partner</h3>
                  <p className="text-xs text-slate-500">With Signing Photos support</p>
                </div>
              </div>

              <form onSubmit={handleAddMou} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Partner University / Organization *</label>
                  <input
                    type="text"
                    required
                    value={newMouPartner}
                    onChange={(e) => setNewMouPartner(e.target.value)}
                    placeholder="e.g. Oxford Quantum Institute"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Partnership Scope *</label>
                  <select
                    value={newMouCategory}
                    onChange={(e) => setNewMouCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none font-semibold"
                  >
                    <option value="Dual Degree & Student Exchange">Dual Degree & Student Exchange</option>
                    <option value="Joint Research & SCIF Enclave">Joint Research & SCIF Enclave</option>
                    <option value="Work-Study Cloud Academy">Work-Study Cloud Academy</option>
                    <option value="Faculty Articulation Charter">Faculty Articulation Charter</option>
                    <option value="Official Charters Memorandum of Understanding & Official Signings">Official Charters Memorandum of Understanding & Official Signings</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Attach Signing Ceremony Photos</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMouImageUpload}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-bmu-red/10 file:text-bmu-red hover:file:bg-bmu-red/20 transition-colors"
                  />
                  {newMouGallery.length > 0 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                      {newMouGallery.map((img, i) => (
                        <div key={i} className="relative shrink-0">
                          <img src={img} alt={`Preview ${i+1}`} className="h-16 w-auto rounded border border-slate-200 object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              const updatedGallery = newMouGallery.filter((_, idx) => idx !== i);
                              setNewMouGallery(updatedGallery);
                              if (i === 0) {
                                setNewMouImage(updatedGallery[0] || '');
                              }
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-sm"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-bmu-red to-bmu-pink text-white font-extrabold text-sm shadow-glow-red hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insert MOU Charter</span>
                </button>
              </form>
            </Card>

            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-xl font-black text-slate-900">Signed MOU Charters ({mouList.length})</h3>
                <Link to="/partners#mou" className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5">
                  <span>View Partners Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {mouList.map((mou) => (
                  <div key={mou.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden">
                    <div className="min-w-0 flex-1 flex gap-4 items-center">
                      {mou.image && (
                        <img src={mou.image} alt={mou.partner} className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0" />
                      )}
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] uppercase inline-block truncate max-w-full">
                          {mou.category}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1 truncate">{mou.partner}</h4>
                        <p className="text-xs text-slate-500 mt-0.5 truncate">Signed: {mou.date} • Status: <strong className="text-emerald-600">{mou.status}</strong> {mou.image ? '• 📸 Photo Attached' : ''}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-slate-200/60 sm:border-0">
                      <button
                        onClick={() => setEditingItem({ type: 'mou', data: { ...mou } })}
                        className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Edit MOU"
                      >
                        <Edit2 className="w-4 h-4 shrink-0" />
                        <span>Update</span>
                      </button>
                      <button
                        onClick={() => handleDeleteMou(mou.id)}
                        className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Delete MOU"
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* TAB 4.5: GLOBAL REACH & PARTNERS */}
        {activeTab === 'global-reach' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="p-3 rounded-2xl bg-bmu-red/10 text-bmu-red">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Add Global Partner</h3>
                  <p className="text-xs text-slate-500">For International & Local Reach</p>
                </div>
              </div>

              <form onSubmit={handleAddPartner} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Partner University / Organization *</label>
                  <input
                    type="text"
                    required
                    value={newPartnerTitle}
                    onChange={(e) => setNewPartnerTitle(e.target.value)}
                    placeholder="e.g. Oxford Quantum Institute"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Category *</label>
                  <select
                    value={newPartnerCategory}
                    onChange={(e) => setNewPartnerCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none font-semibold"
                  >
                    <option value="International Partners & Collaborations">International Partners & Collaborations</option>
                    <option value="Local Partners & Collaborations">Local Partners & Collaborations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Location *</label>
                  <input
                    type="text"
                    required
                    value={newPartnerLocation}
                    onChange={(e) => setNewPartnerLocation(e.target.value)}
                    placeholder="e.g. Global"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Badge Title</label>
                  <input
                    type="text"
                    required
                    value={newPartnerBadge}
                    onChange={(e) => setNewPartnerBadge(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Partnership Scope</label>
                  <input
                    type="text"
                    required
                    value={newPartnerScope}
                    onChange={(e) => setNewPartnerScope(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Description *</label>
                  <textarea
                    required
                    value={newPartnerDesc}
                    onChange={(e) => setNewPartnerDesc(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red"
                    rows="3"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Website / Social Link</label>
                  <input
                    type="url"
                    value={newPartnerWebsiteUrl}
                    onChange={(e) => setNewPartnerWebsiteUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-red"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-bmu-red to-bmu-pink text-white font-extrabold text-sm shadow-glow-red hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insert Partner</span>
                </button>
              </form>
            </Card>

            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-xl font-black text-slate-900">Partners ({partnersList.length})</h3>
                <Link to="/partners" className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5">
                  <span>View Partners Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {partnersList.map((partner) => (
                  <div key={partner.id || partner._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden">
                    <div className="min-w-0 flex-1 flex gap-4 items-center">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] uppercase inline-block truncate max-w-full">
                          {partner.category}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1 truncate">{partner.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5 truncate">Scope: {partner.scope} • Location: <strong className="text-emerald-600">{partner.location}</strong></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-slate-200/60 sm:border-0">
                      <button
                        onClick={() => setEditingItem({ type: 'partner', data: { ...partner } })}
                        className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Edit Partner"
                      >
                        <Settings className="w-4 h-4 shrink-0" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeletePartner(partner.id || partner._id)}
                        className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Delete Partner"
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* TAB 5: SYSTEM HEALTH & MONGODB PRICING GUIDE */}
        {activeTab === 'system' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card glass className="p-6 bg-white border-slate-300 shadow-sm space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase">Express Node.js Server</div>
                <div className="text-2xl font-black text-slate-900">Port 5000 Active</div>
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 mt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>REST API v1.0 Foundational Engine</span>
                </p>
              </Card>

              <Card glass className="p-6 bg-white border-slate-300 shadow-sm space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase">MongoDB Atlas Cluster</div>
                <div className="text-2xl font-black text-slate-900">M0 Free Tier ($0/mo)</div>
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 mt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>512 MB Storage • 500 Max Connections</span>
                </p>
              </Card>

              <Card glass className="p-6 bg-white border-slate-300 shadow-sm space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase">Domain & SSL Link</div>
                <div className="text-2xl font-black text-slate-900">Custom Domain Ready</div>
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 mt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>$0 DNS CNAME Linkage</span>
                </p>
              </Card>
            </div>

            {/* Hosting & Database Pricing Guide Card for the User */}
            <Card glass className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border-slate-800 shadow-2xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-bmu-red/20 text-bmu-red">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">MongoDB Atlas & Node.js Hosting Pricing Breakdown</h3>
                  <p className="text-xs text-slate-300">Detailed reference since you already own your domain</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
                  <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase w-fit">
                    Recommended for Startup
                  </div>
                  <h4 className="text-lg font-black text-white">M0 Shared Cluster</h4>
                  <div className="text-2xl font-extrabold text-emerald-400">$0 <span className="text-xs text-slate-400 font-normal">/ month forever</span></div>
                  <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-700">
                    <li>✅ 512 MB Cloud Storage</li>
                    <li>✅ Shared CPU & RAM</li>
                    <li>✅ Up to 500 simultaneous student connections</li>
                    <li>✅ Free automated backup snapshots</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-bmu-red/50 shadow-glow-red space-y-3 relative">
                  <div className="px-2.5 py-1 rounded-full bg-bmu-red text-white text-[10px] font-bold uppercase w-fit">
                    Production Upgrade
                  </div>
                  <h4 className="text-lg font-black text-white">M2 / M5 Dedicated Shared</h4>
                  <div className="text-2xl font-extrabold text-white">$9 – $25 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                  <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-700">
                    <li>⚡ 2 GB to 5 GB Dedicated NVMe Storage</li>
                    <li>⚡ Faster burstable network throughput</li>
                    <li>⚡ No connection throttles during admission peaks</li>
                    <li>⚡ Custom backup schedules</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
                  <div className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase w-fit">
                    Enterprise University
                  </div>
                  <h4 className="text-lg font-black text-white">M10 Dedicated Cluster</h4>
                  <div className="text-2xl font-extrabold text-blue-400">$57 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                  <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-700">
                    <li>🏆 10 GB+ Dedicated Storage & 2 GB RAM</li>
                    <li>🏆 Multi-region low-latency redundancy</li>
                    <li>🏆 Advanced encryption at rest & audit logs</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* --- TAB: SETTINGS (BANNER, STATS & TUITION MANAGER) --- */}
        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {settingsSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-sm font-bold shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{settingsSuccess}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Banner & Hero Manager */}
              <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                  <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Website Hero Banner & Carousel Slides List</h3>
                    <p className="text-xs text-slate-500">Live configuration for main landing page headline & multi-slide carousel</p>
                  </div>
                </div>

                {/* Add New Banner Slide Form */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-rose-600" />
                    <span>Add New Carousel Banner Slide to List</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Badge / Tag</label>
                      <input
                        type="text"
                        value={newSlideTag}
                        onChange={(e) => setNewSlideTag(e.target.value)}
                        placeholder="e.g. Global Collaboration"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none focus:border-rose-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Banner Image URL</label>
                      <input
                        type="text"
                        value={newSlideImage}
                        onChange={(e) => setNewSlideImage(e.target.value)}
                        placeholder="Paste image URL or upload file..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-rose-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Upload Banner Image File from PC</label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Choose Photo from PC</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleNewSlideImageChange}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-slate-500 font-medium">
                        {newSlideImage ? 'Image file loaded & ready!' : 'Select a JPG/PNG/WebP image file'}
                      </span>
                    </div>
                  </div>

                  {newSlideImage && (
                    <div className="relative rounded-xl overflow-hidden border border-slate-300 shadow-sm max-h-40 bg-slate-900">
                      <img
                        src={newSlideImage}
                        alt="New Slide Preview"
                        className="w-full h-36 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-xs font-bold text-white uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded">New Banner Slide Preview</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Slide Title / Headline</label>
                      <input
                        type="text"
                        value={newSlideTitle}
                        onChange={(e) => setNewSlideTitle(e.target.value)}
                        placeholder="e.g. International Academic Symposium"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-rose-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Slide Subtitle / Description</label>
                      <textarea
                        rows={2}
                        value={newSlideSubtitle}
                        onChange={(e) => setNewSlideSubtitle(e.target.value)}
                        placeholder="e.g. BMU students & faculty hosting global research partners..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-rose-600"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddBannerSlide}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4 text-rose-400" />
                    <span>+ Add Banner Slide to Carousel List Below</span>
                  </button>
                </div>

                {/* Current Active Slides List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      Active Carousel Banners List ({settingsData.banner.slides?.length || 0})
                    </h4>
                    <span className="text-xs text-rose-600 font-bold">Live Widescreen Carousel</span>
                  </div>

                  <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                    {(settingsData.banner.slides || []).map((slide, idx) => (
                      <div key={slide.id || idx} className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-300 transition-all">
                        <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 flex-shrink-0 relative">
                          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                          <span className="absolute top-1 left-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">#{idx + 1}</span>
                        </div>
                        <div className="flex-grow min-w-0">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 font-bold text-[10px] uppercase tracking-wider mb-1">
                            {slide.tag || 'Banner'}
                          </span>
                          <h5 className="text-sm font-extrabold text-slate-900 truncate">{slide.title}</h5>
                          <p className="text-xs text-slate-500 line-clamp-1">{slide.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => setEditingItem({ type: 'slide', data: { ...slide } })}
                            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 text-slate-400 hover:text-blue-600 transition-all shadow-sm"
                            title="Edit Slide"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBannerSlide(slide.id)}
                            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-300 text-slate-400 hover:text-rose-600 transition-all shadow-sm"
                            title="Remove Slide"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {(!settingsData.banner.slides || settingsData.banner.slides.length === 0) && (
                      <div className="text-center py-6 text-slate-400 text-xs font-semibold">
                        No custom slides added yet. Using default university slides.
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 text-white font-black text-sm shadow-md hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 mt-4"
                >
                  <Save className="w-5 h-5" />
                  <span>Publish All Carousel Banners & Changes Live</span>
                </button>
              </Card>

              {/* OFFICIAL INSTITUTIONAL PARTNER EMBLEMS MANAGER */}
              <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                  <div className="p-3 rounded-2xl bg-rose-50 text-rose-600">
                    <Users className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      Official Institutional Partner Emblems — (Hover to Pause)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Live configuration for the infinite marquee emblems on your main landing page & partners directory
                    </p>
                  </div>
                </div>

                {/* Add New Partner Emblem Box */}
                <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-rose-900 uppercase tracking-wider flex items-center gap-2">
                      <Plus className="w-4 h-4 text-rose-600" /> Add New Official Partner Emblem Logo
                    </h4>
                    <span className="text-[10px] font-extrabold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-md">Live Upload</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Institutional Partner Name / Title *</label>
                      <input
                        type="text"
                        value={newEmblemName}
                        onChange={(e) => setNewEmblemName(e.target.value)}
                        placeholder="e.g. Oxford Computing Institute / Google Cloud Consortia"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Emblem Image URL (or upload below)</label>
                      <input
                        type="text"
                        value={newEmblemImage}
                        onChange={(e) => setNewEmblemImage(e.target.value)}
                        placeholder="Paste image URL..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600"
                      />
                    </div>
                  </div>

                  {/* PC File Upload Button for Emblem */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-sm transition-all">
                        <Upload className="w-4 h-4" />
                        <span>Choose Emblem Logo from PC</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleNewEmblemImageChange}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-slate-600 font-medium truncate max-w-[220px]">
                        {newEmblemImage ? 'Logo image file selected & ready!' : 'Upload transparent PNG / JPG / WebP logo'}
                      </span>
                    </div>

                    {newEmblemImage && (
                      <div className="h-14 px-3 py-1 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center">
                        <img src={newEmblemImage} alt="Logo Preview" className="max-h-12 w-auto object-contain" />
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleAddEmblem}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4 text-rose-400" />
                    <span>+ Add Institutional Emblem to Marquee List Below</span>
                  </button>
                </div>

                {/* Current Active Emblems Marquee List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      Active Institutional Emblems ({settingsData.partner_emblems?.emblems?.length || 0})
                    </h4>
                    <span className="text-xs text-rose-600 font-bold">Infinite Scrolling Marquee</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[440px] overflow-y-auto pr-1">
                    {(settingsData.partner_emblems?.emblems || []).map((emb, idx) => (
                      <div key={emb.id || idx} className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-300 transition-all shadow-sm">
                        <div className="w-20 h-14 rounded-xl overflow-hidden bg-white border border-slate-300 flex items-center justify-center p-2 flex-shrink-0 relative">
                          <img src={emb.src} alt={emb.name} className="max-h-10 w-auto object-contain" />
                          <span className="absolute top-1 left-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">#{idx + 1}</span>
                        </div>
                        <div className="flex-grow min-w-0">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 font-bold text-[9px] uppercase tracking-wider mb-0.5">
                            Official Partner
                          </span>
                          <h5 className="text-xs font-extrabold text-slate-900 truncate">{emb.name}</h5>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => setEditingItem({ type: 'emblem', data: { ...emb } })}
                            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 text-slate-400 hover:text-blue-600 transition-all shadow-sm"
                            title="Edit Emblem"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEmblem(emb.id)}
                            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-300 text-slate-400 hover:text-rose-600 transition-all shadow-sm"
                            title="Remove Emblem"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {(!settingsData.partner_emblems?.emblems || settingsData.partner_emblems?.emblems?.length === 0) && (
                      <div className="col-span-full text-center py-6 text-slate-400 text-xs font-semibold">
                        No custom partner emblems added yet. Using default institutional emblems.
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 text-white font-black text-sm shadow-md hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 mt-4"
                >
                  <Save className="w-5 h-5" />
                  <span>Publish All Partner Emblems & Changes Live</span>
                </button>
              </Card>

              {/* University Key Metrics & Stats Manager */}
              <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">University Key Metrics & Stats</h3>
                    <p className="text-xs text-slate-500">Live statistics counters displayed across homepage & about</p>
                  </div>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Active Students</label>
                      <input
                        type="text"
                        value={settingsData.stats?.content?.activeStudents || ''}
                        onChange={(e) => setSettingsData({ ...settingsData, stats: { ...(settingsData.stats || {}), content: { ...(settingsData.stats?.content || {}), activeStudents: e.target.value } } })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-black text-center focus:outline-none focus:border-amber-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Faculties</label>
                      <input
                        type="text"
                        value={settingsData.stats?.content?.faculties || ''}
                        onChange={(e) => setSettingsData({ ...settingsData, stats: { ...(settingsData.stats || {}), content: { ...(settingsData.stats?.content || {}), faculties: e.target.value } } })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-black text-center focus:outline-none focus:border-amber-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Global Centers</label>
                      <input
                        type="text"
                        value={settingsData.stats?.content?.institutions || ''}
                        onChange={(e) => setSettingsData({ ...settingsData, stats: { ...(settingsData.stats || {}), content: { ...(settingsData.stats?.content || {}), institutions: e.target.value } } })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-black text-center focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Update Live University Counters</span>
                  </button>
                </form>
              </Card>
            </div>
          </motion.div>
        )}

        {/* --- TAB: LEADERSHIP & MANAGEMENT TEAM MANAGER --- */}
        {activeTab === 'team' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Add Executive / Dean</h3>
                  <p className="text-xs text-slate-500">Publish to Leadership & Management roster</p>
                </div>
              </div>

              <form onSubmit={handleAddTeam} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Name & Title *</label>
                  <input
                    type="text"
                    required
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="e.g. Dr. Bona Mary"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Executive Job Title</label>
                  <input
                    type="text"
                    value={newTeamTitle}
                    onChange={(e) => setNewTeamTitle(e.target.value)}
                    placeholder="e.g. President & Founder"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Leadership Section *</label>
                  <select
                    value={newTeamCategory}
                    onChange={(e) => setNewTeamCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none font-semibold"
                  >
                    <option value="Executive Leadership">Executive Leadership</option>
                    <option value="Message from Leadership">Message from Leadership</option>
                    <option value="Our Management Team">Our Management Team</option>
                    <option value="University Administration">University Administration</option>
                    <option value="Academic Governance">Academic Governance</option>
                    <option value="Global Diplomacy">Global Diplomacy</option>
                    <option value="Student Welfare & Success">Student Welfare & Success</option>
                    <option value="Faculty & Deans">Faculty & Deans</option>
                    <option value="Board of Trustees">Board of Trustees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Highlight Sub-Badge (Optional)</label>
                  <input
                    type="text"
                    value={newTeamHighlight}
                    onChange={(e) => setNewTeamHighlight(e.target.value)}
                    placeholder="e.g. Institutional Founder, University President"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Photo URL or Upload from PC</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTeamPhotoUrl}
                      onChange={(e) => setNewTeamPhotoUrl(e.target.value)}
                      placeholder="https://... or upload ->"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-rose-600"
                    />
                    <label className="cursor-pointer bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>PC Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewTeamPhotoUrl(reader.result);
                            };
                            resizeAndReadAsDataURL(file, reader);
                          }
                        }}
                      />
                    </label>
                  </div>
                  {newTeamPhotoUrl && (
                    <div className="mt-2.5 flex items-center gap-3 p-2 bg-slate-100 rounded-xl border border-slate-200">
                      <img src={newTeamPhotoUrl} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-white shadow-sm" />
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Photo Attached
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Leadership Message / Quote</label>
                  <textarea
                    rows={2}
                    value={newTeamMessage}
                    onChange={(e) => setNewTeamMessage(e.target.value)}
                    placeholder="e.g. Welcome to BMU University..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Biography / Profile Description</label>
                  <textarea
                    rows={2}
                    value={newTeamBio}
                    onChange={(e) => setNewTeamBio(e.target.value)}
                    placeholder="e.g. Distinguished academic leader with over 20 years..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Facebook URL</label>
                    <input
                      type="text"
                      value={newTeamFacebook}
                      onChange={(e) => setNewTeamFacebook(e.target.value)}
                      placeholder="https://facebook.com/bonamary"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-rose-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={newTeamEmail}
                      onChange={(e) => setNewTeamEmail(e.target.value)}
                      placeholder="info@bonamary.edu.kh"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-rose-600"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600 block mb-2">Faculty & Deans Academic Details (Optional)</span>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Academic Department / Faculty</label>
                      <select
                        value={newTeamDepartment}
                        onChange={(e) => setNewTeamDepartment(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none font-semibold"
                      >
                        <option value="Academic Leadership & Deans">Academic Leadership & Deans</option>
                        <option value="Faculty of Law and Social Sciences">Faculty of Law and Social Sciences</option>
                        <option value="Faculty of Business Administration and Tourism">Faculty of Business Administration and Tourism</option>
                        <option value="Faculty of Technology and Science">Faculty of Technology and Science</option>
                        <option value="Faculty of Engineering and Architecture">Faculty of Engineering and Architecture</option>
                        <option value="Faculty of Education and Languages">Faculty of Education and Languages</option>
                        <option value="School of Computing & Digital Skilling">School of Computing & Digital Skilling</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Education / Degree</label>
                        <input
                          type="text"
                          value={newTeamEducation}
                          onChange={(e) => setNewTeamEducation(e.target.value)}
                          placeholder="Ph.D. / Advanced Executive Leadership"
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Office Location</label>
                        <input
                          type="text"
                          value={newTeamOffice}
                          onChange={(e) => setNewTeamOffice(e.target.value)}
                          placeholder="Executive Academic Wing"
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Publications</label>
                        <input
                          type="number"
                          value={newTeamPublications}
                          onChange={(e) => setNewTeamPublications(e.target.value)}
                          placeholder="35"
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Citations</label>
                        <input
                          type="text"
                          value={newTeamCitations}
                          onChange={(e) => setNewTeamCitations(e.target.value)}
                          placeholder="1,800+"
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-extrabold text-sm shadow-md hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insert Executive Leader</span>
                </button>
              </form>
            </Card>

            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-xl font-black text-slate-900">University Management Directory ({teamList.length})</h3>
              </div>

              <div className="space-y-3">
                {teamList.map((member, idx) => (
                  <div key={member.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      {member.photoUrl ? (
                        <img src={member.photoUrl} alt={member.name} className="w-14 h-14 rounded-xl object-cover border border-slate-300 shadow-sm shrink-0" />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-700 font-extrabold text-lg shrink-0">
                          {member.name ? member.name.charAt(0) : 'T'}
                        </div>
                      )}
                      <div className="space-y-1 min-w-0 flex-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px] uppercase border border-rose-200 inline-block max-w-full truncate">
                          {member.highlight ? `${member.roleCategory} • ${member.highlight}` : member.roleCategory}
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900 truncate">{member.name}</h4>
                        <p className="text-xs font-semibold text-slate-600 truncate">{member.title}</p>
                        <p className="text-xs text-slate-500 italic truncate">"{member.message}"</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-slate-200/60 sm:border-0 flex-wrap">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleReorderTeam(member.id, 'up')}
                          disabled={idx === 0}
                          className="p-2 rounded-xl bg-slate-200/80 hover:bg-slate-800 hover:text-white text-slate-700 transition-all flex items-center justify-center shadow-sm disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                          title="Move Up Step by Step"
                        >
                          <ArrowUp className="w-4 h-4 shrink-0" />
                        </button>
                        <button
                          onClick={() => handleReorderTeam(member.id, 'down')}
                          disabled={idx === teamList.length - 1}
                          className="p-2 rounded-xl bg-slate-200/80 hover:bg-slate-800 hover:text-white text-slate-700 transition-all flex items-center justify-center shadow-sm disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                          title="Move Down Step by Step"
                        >
                          <ArrowDown className="w-4 h-4 shrink-0" />
                        </button>
                      </div>
                      <button
                        onClick={() => setEditingItem({ type: 'team', data: { ...member } })}
                        className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Edit Leader"
                      >
                        <Edit2 className="w-4 h-4 shrink-0" />
                        <span>Update</span>
                      </button>
                      <button
                        onClick={() => handleDeleteTeam(member.id)}
                        className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Delete Leader"
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* --- TAB: EVENTS & CAMPUS LIFE MANAGER --- */}
        {activeTab === 'events' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Post Announcement</h3>
                  <p className="text-xs text-slate-500">Publish official announcements & bulletins</p>
                </div>
              </div>

              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Announcement Title *</label>
                  <input
                    type="text"
                    required
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="e.g. Fall Admissions Update"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-600 font-semibold"
                  />
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Date / Month</label>
                    <input
                      type="text"
                      value={newEventDate}
                      onChange={(e) => setNewEventDate(e.target.value)}
                      placeholder="e.g. August 2026"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Attachment (Photo or Document Image)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleNewEventImageChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-bmu-pink file:text-white hover:file:bg-bmu-red"
                  />
                  {newEventImage && (
                    <img src={newEventImage} alt="Preview" className="h-16 mt-2 rounded object-cover" />
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Event Description & Location</label>
                  <textarea
                    rows={3}
                    value={newEventDesc}
                    onChange={(e) => setNewEventDesc(e.target.value)}
                    placeholder="e.g. Keynote address at SCIF Enclave auditorium..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-600"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-extrabold text-sm shadow-md hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Announcement</span>
                </button>
              </form>
            </Card>

            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-xl font-black text-slate-900">Official Announcements Chronicle ({eventsList.length})</h3>
              </div>

              <div className="space-y-3">
                {eventsList.map((ev) => (
                  <div key={ev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden">
                    <div className="min-w-0 flex-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] uppercase inline-block truncate max-w-full">
                        {ev.category}
                      </span>
                      <h4 className="text-base font-extrabold text-slate-900 mt-1 truncate">{ev.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">🗓️ {ev.eventDate} • 📍 {ev.location}</p>
                      <p className="text-xs text-slate-600 mt-1 truncate">{ev.description}</p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-slate-200/60 sm:border-0">
                      <button
                        onClick={() => setEditingItem({ type: 'event', data: { ...ev } })}
                        className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Edit Announcement"
                      >
                        <Edit2 className="w-4 h-4 shrink-0" />
                        <span>Update</span>
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(ev.id)}
                        className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Delete Announcement"
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* --- TAB: INTERNSHIPS & CAREERS MANAGER --- */}
        {activeTab === 'internships' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Add Student Internship & Career Opportunity</h3>
                  <p className="text-xs text-slate-500">Publish work-study placements & industry roles</p>
                </div>
              </div>

              <form onSubmit={handleAddInternship} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Student Name (Khmer / English) *</label>
                  <input
                    type="text"
                    required
                    value={newIntCompany}
                    onChange={(e) => setNewIntCompany(e.target.value)}
                    placeholder="e.g. ផេង ដាលីស (Pheng Dalis)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-cyan-600 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Position / Role Title (Khmer / English) *</label>
                  <input
                    type="text"
                    required
                    value={newIntPos}
                    onChange={(e) => setNewIntPos(e.target.value)}
                    placeholder="e.g. គ្រប់គ្រងថ្នាក់ភាសាចិន នៅ BMU (Year 3)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-cyan-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Year / Scholar Status *</label>
                  <select
                    value={newIntStatus}
                    onChange={(e) => setNewIntStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none font-bold"
                  >
                    <option value="Year 1 Scholar">Year 1 Scholar</option>
                    <option value="Year 2 Scholar">Year 2 Scholar</option>
                    <option value="Year 3 Scholar">Year 3 Scholar</option>
                    <option value="Year 4 Scholar">Year 4 Scholar</option>
                    <option value="Active Scholar Placement">Active Scholar Placement</option>
                    <option value="Alumni Scholar">Alumni Scholar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Company Logo / Opportunity Image URL or Upload</label>
                  <input
                    type="text"
                    value={newIntImage}
                    onChange={(e) => setNewIntImage(e.target.value)}
                    placeholder="Paste image URL or choose file below..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none mb-2"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleNewIntImageChange}
                    className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-cyan-100 file:text-cyan-800 hover:file:bg-cyan-200 cursor-pointer"
                  />
                  {newIntImage && (
                    <div className="mt-2.5 p-2 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-3">
                      <img src={newIntImage} alt="Internship Preview" className="h-14 w-14 object-cover rounded-lg border border-slate-300" />
                      <div className="flex-1 min-w-0 text-xs font-bold text-slate-700 truncate">
                        Image loaded & ready!
                      </div>
                      <button
                        type="button"
                        onClick={() => setNewIntImage('')}
                        className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 text-xs font-bold shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Workplace / Role Description (English / Khmer) *</label>
                  <textarea
                    rows={3}
                    required
                    value={newIntDesc}
                    onChange={(e) => setNewIntDesc(e.target.value)}
                    placeholder="e.g. Chinese Language Class Manager at Bonamary University"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-cyan-600"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-extrabold text-sm shadow-md hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Scholar / Career Opportunity</span>
                </button>
              </form>
            </Card>

            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-xl font-black text-slate-900">Student Internships & Industry Careers ({internshipsList.length})</h3>
              </div>

              <div className="space-y-3">
                {internshipsList.map((int) => (
                  <div key={int.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden">
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      {int.image && (
                        <img src={int.image} alt={int.position} className="h-14 w-14 rounded-xl object-cover border border-slate-300 shrink-0 shadow-sm" />
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-bold text-[10px] uppercase inline-block truncate max-w-full">
                          {int.status}
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900 mt-1 truncate">{int.position}</h4>
                        <p className="text-xs font-bold text-slate-700 truncate">{int.company} • Stipend: <span className="text-emerald-600">{int.stipend}</span></p>
                        <p className="text-xs text-slate-500 mt-1 truncate">{int.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-slate-200/60 sm:border-0">
                      <button
                        onClick={() => setEditingItem({ type: 'internship', data: { ...int } })}
                        className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Edit Internship"
                      >
                        <Edit2 className="w-4 h-4 shrink-0" />
                        <span>Update</span>
                      </button>
                      <button
                        onClick={() => handleDeleteInternship(int.id)}
                        className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Delete Internship"
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* --- SCHOLARSHIPS MANAGER --- */}
        {activeTab === 'scholarships' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="p-6 sm:p-8 bg-white border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-bmu-pink/10 text-bmu-pink flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Post New Scholarship Announcement</h3>
                  <p className="text-sm font-semibold text-slate-500">Upload official financial aid and merit scholarship letters.</p>
                </div>
              </div>
              <form onSubmit={handleAddScholarship} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Scholarship Title *</label>
                    <input
                      type="text"
                      required
                      value={newScholarshipTitle}
                      onChange={(e) => setNewScholarshipTitle(e.target.value)}
                      placeholder="e.g. 'I Am a Teacher' 100% Full-Tuition Scholarship"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Subtitle (Khmer / Localized)</label>
                    <input
                      type="text"
                      value={newScholarshipSubtitle}
                      onChange={(e) => setNewScholarshipSubtitle(e.target.value)}
                      placeholder="e.g. អាហារូបករណ៍ខ្ញុំជាគ្រូបង្រៀន"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-pink"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Academic Year</label>
                    <input
                      type="text"
                      value={newScholarshipYear}
                      onChange={(e) => setNewScholarshipYear(e.target.value)}
                      placeholder="e.g. Academic Year 2025–2026"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Status</label>
                    <select
                      value={newScholarshipStatus}
                      onChange={(e) => setNewScholarshipStatus(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-pink font-bold"
                    >
                      <option value="Active">Active</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Main Announcement Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={newScholarshipDesc}
                    onChange={(e) => setNewScholarshipDesc(e.target.value)}
                    placeholder="Provide the main text explaining the scholarship coverage and requirements."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-pink"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Document Page 1 Image URL or Upload</label>
                    <input
                      type="text"
                      value={newScholarshipImage1}
                      onChange={(e) => setNewScholarshipImage1(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-pink mb-2"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleNewScholImage1Change}
                      className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-pink-100 file:text-pink-800 hover:file:bg-pink-200 cursor-pointer"
                    />
                    {newScholarshipImage1 && (
                      <div className="mt-2.5 p-2 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-3">
                        <img src={newScholarshipImage1} alt="Page 1 Preview" className="h-10 w-10 object-cover rounded-lg border border-slate-300" />
                        <div className="flex-1 min-w-0 text-xs font-bold text-slate-700 truncate">Image loaded!</div>
                        <button type="button" onClick={() => setNewScholarshipImage1('')} className="px-2 py-1 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 text-xs font-bold shrink-0">Clear</button>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Document Page 2 Image URL or Upload</label>
                    <input
                      type="text"
                      value={newScholarshipImage2}
                      onChange={(e) => setNewScholarshipImage2(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-bmu-pink mb-2"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleNewScholImage2Change}
                      className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-pink-100 file:text-pink-800 hover:file:bg-pink-200 cursor-pointer"
                    />
                    {newScholarshipImage2 && (
                      <div className="mt-2.5 p-2 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-3">
                        <img src={newScholarshipImage2} alt="Page 2 Preview" className="h-10 w-10 object-cover rounded-lg border border-slate-300" />
                        <div className="flex-1 min-w-0 text-xs font-bold text-slate-700 truncate">Image loaded!</div>
                        <button type="button" onClick={() => setNewScholarshipImage2('')} className="px-2 py-1 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 text-xs font-bold shrink-0">Clear</button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-bmu-pink to-bmu-red text-white font-extrabold text-sm shadow-md hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Scholarship Announcement</span>
                </button>
              </form>
            </Card>

            <Card className="p-6 sm:p-8 bg-white border border-slate-200">
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2 mb-6">
                <Database className="w-5 h-5 text-slate-400" />
                Active Scholarships & Aid ({scholarshipsList.length})
              </h3>
              
              <div className="grid gap-3">
                {scholarshipsList.map((schol) => (
                  <div key={schol.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-bmu-pink hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto min-w-0">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300 flex items-center justify-center">
                        {schol.images && schol.images.length > 0 && schol.images[0] ? (
                          <img src={schol.images[0]} alt={schol.title} className="w-full h-full object-cover" />
                        ) : (
                          <FileText className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${schol.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>{schol.status}</span>
                          <span className="text-xs font-bold text-slate-500 truncate">{schol.academicYear}</span>
                        </div>
                        <h4 className="text-base font-extrabold text-slate-900 mt-1 truncate">{schol.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 truncate max-w-lg">{schol.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-slate-200/60 sm:border-0">
                      <button
                        onClick={() => setEditingItem({ type: 'scholarship', data: { ...schol } })}
                        className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Edit Scholarship"
                      >
                        <Edit2 className="w-4 h-4 shrink-0" />
                        <span>Update</span>
                      </button>
                      <button
                        onClick={() => handleDeleteScholarship(schol.id)}
                        className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                        title="Delete Scholarship"
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
        {/* --- CAMPUS LIFE MANAGER --- */}
        {activeTab === 'campus-life' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="p-6 sm:p-8 bg-white border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Add Campus Life Photo</h3>
                  <p className="text-sm text-slate-500 mt-1">Upload photos to dynamically display in the Student Life gallery.</p>
                </div>
              </div>

              <form onSubmit={handleAddCampusLife} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Photo Title *</label>
                    <input
                      type="text"
                      required
                      value={newCampusTitle}
                      onChange={(e) => setNewCampusTitle(e.target.value)}
                      placeholder="e.g. Students in AI Lab"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category</label>
                    <input
                      type="text"
                      value={newCampusCategory}
                      onChange={(e) => setNewCampusCategory(e.target.value)}
                      placeholder="e.g. Academics, Sports, Community"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newCampusDesc}
                    onChange={(e) => setNewCampusDesc(e.target.value)}
                    placeholder="Brief description of the activity..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Photo Image *</label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleCampusLifeImageUpload}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {newCampusImage && (
                    <div className="mt-3">
                      <img src={newCampusImage} alt="Preview" className="h-24 rounded-lg object-cover shadow-sm border border-slate-200" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Campus Life Photo</span>
                </button>
              </form>
            </Card>

            <Card className="p-6 sm:p-8 bg-white border border-slate-200">
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2 mb-6">
                <Database className="w-5 h-5 text-slate-400" />
                Active Campus Life Photos ({campusLifeList.length})
              </h3>
              
              <div className="grid gap-3">
                {campusLifeList.map((item) => (
                  <div key={item.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-500 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto min-w-0">
                      <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300 flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-orange-100 text-orange-700">{item.category}</span>
                        </div>
                        <h4 className="text-base font-extrabold text-slate-900 mt-1 truncate">{item.title}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-slate-200/60 sm:border-0">
                      <button
                        onClick={() => setEditingItem({ type: 'campus-life', data: { ...item } })}
                        className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                      >
                        <Edit2 className="w-4 h-4 shrink-0" />
                        <span>Update</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCampusLife(item.id || item._id)}
                        className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-all flex items-center justify-center gap-1.5 text-xs font-extrabold shadow-sm shrink-0 flex-1 sm:flex-initial"
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
        {/* --- TAB: COMMUNITY SERVICES MANAGER --- */}
        {activeTab === 'advertisement' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Advertisement Modal Manager</h2>
                <p className="text-sm text-gray-500 mt-1">Manage the global popup advertisement shown to new visitors.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold ${promoActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {promoActive ? 'Campaign is Active' : 'Campaign is Inactive'}
                </span>
                <button
                  onClick={() => setPromoActive(!promoActive)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${promoActive ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${promoActive ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <form onSubmit={savePromoToDb} className="space-y-6 max-w-4xl">
                
                <div className="max-w-2xl">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Poster Image Graphic *</label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group h-full min-h-[250px]">
                      {promoImage ? (
                        <div className="absolute inset-0 p-2">
                          <img src={promoImage} alt="Preview" className="w-full h-full object-cover rounded-xl shadow-sm" />
                          <div className="absolute inset-2 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                            <p className="text-white text-sm font-bold">Change Image</p>
                          </div>
                          <input type="file" accept="image/*" onChange={handlePromoImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                          <Upload className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="text-sm font-bold">Click to upload poster</p>
                          <p className="text-xs mt-1">Recommended aspect ratio: 21:9</p>
                          <input type="file" accept="image/*" required onChange={handlePromoImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end">
                  <button type="submit" className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-xl shadow-lg transition-colors flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Save Campaign Settings
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}
        
        {activeTab === 'international' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div>
                <h2 className="text-2xl font-black text-gray-900">International Gallery</h2>
                <p className="text-sm text-gray-500 mt-1">Manage the 3 photos for the eduCLaaS / Explore International Faculties section.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-rose-500" /> Add New Photo
                  </h3>
                  <form onSubmit={handleAddIntlPhoto} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Caption / Title *</label>
                      <input type="text" required value={newIntlTitle} onChange={e => setNewIntlTitle(e.target.value)} placeholder="e.g. Work-Study International..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Upload Image *</label>
                      <div className="relative border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                        {newIntlImage ? (
                          <div className="relative h-32 w-full">
                            <img src={newIntlImage} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                              <p className="text-white text-xs font-bold">Change Image</p>
                            </div>
                            <input type="file" accept="image/*" onChange={handleIntlImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-6 text-gray-500">
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="text-xs font-bold">Click to upload or drag & drop</p>
                            <p className="text-[10px] mt-1">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                            <input type="file" accept="image/*" required onChange={handleIntlImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                          </div>
                        )}
                      </div>
                    </div>
                    <button type="submit" className="w-full py-3 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-colors mt-4">
                      Insert Photo
                    </button>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                {intlGalleryList.length === 0 ? (
                  <div className="text-center p-12 bg-white rounded-2xl border border-dashed border-gray-300">
                    <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-gray-900">No Photos Yet</h3>
                    <p className="text-gray-500 text-sm">Add some photos to display in the International section.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {intlGalleryList.map(img => (
                      <div key={img.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <img src={img.imageUrl} alt={img.title} className="w-full h-40 object-cover bg-gray-100" />
                        <div className="p-4 flex flex-col flex-1 justify-between">
                          <p className="text-sm font-bold text-gray-900 line-clamp-2">{img.title}</p>
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                            <button onClick={() => handleDeleteIntlPhoto(img.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'community-services' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card glass className="p-6 sm:p-8 bg-white border-slate-300 shadow-glow-bmu lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600">
                  <HandHeart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Add Community Service</h3>
                  <p className="text-xs text-slate-500">Upload volunteer & exchange programs</p>
                </div>
              </div>

              <form onSubmit={handleAddCommunityService} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={newCommunityTitle}
                    onChange={(e) => setNewCommunityTitle(e.target.value)}
                    placeholder="e.g. 2025 Volunteer Event"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={newCommunitySubtitle}
                    onChange={(e) => setNewCommunitySubtitle(e.target.value)}
                    placeholder="e.g. Translation or brief subtitle"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Program Name *</label>
                    <input
                      type="text"
                      required
                      value={newCommunityProgram}
                      onChange={(e) => setNewCommunityProgram(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none focus:border-rose-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={newCommunityDuration}
                      onChange={(e) => setNewCommunityDuration(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none focus:border-rose-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={newCommunityDesc}
                    onChange={(e) => setNewCommunityDesc(e.target.value)}
                    placeholder="Program description..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Acknowledgements (One per line)</label>
                  <textarea
                    rows={4}
                    value={newCommunityAcks}
                    onChange={(e) => setNewCommunityAcks(e.target.value)}
                    placeholder="Dr. Sar Rithy, President...&#10;Mr. Lim Wutthy, Founder..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1 flex items-center justify-between">
                    <span>Program Photo *</span>
                    {newCommunityImage && (
                      <button type="button" onClick={() => setNewCommunityImage('')} className="px-2 py-1 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 text-xs font-bold shrink-0">Clear</button>
                    )}
                  </label>
                  {newCommunityImage ? (
                    <img src={newCommunityImage} alt="Preview" className="w-full h-32 object-cover rounded-xl border border-slate-200 shadow-sm" />
                  ) : (
                    <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-6 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-2 group cursor-pointer text-center h-32 bg-slate-50">
                      <ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-rose-500 transition-colors" />
                      <div className="text-xs font-semibold text-slate-600">Select PC Image</div>
                      <input type="file" accept="image/*" onChange={handleCommunityImageUpload} required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-3 rounded-xl font-bold shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>Publish Community Service</span>
                </button>
              </form>
            </Card>

            <Card glass className="p-6 sm:p-8 bg-white border-slate-200 shadow-xl lg:col-span-2">
              <h3 className="text-xl font-black text-slate-900 mb-6">Community Services Archive ({communityServicesList.length})</h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {communityServicesList.map((cs) => (
                  <div key={cs.id || cs._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-rose-300 transition-colors gap-4 shadow-sm group">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      {cs.image ? (
                        <img src={cs.image} alt={cs.title} className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0" />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center shrink-0">
                          <ImageIcon className="w-6 h-6 text-slate-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-rose-100 border border-rose-200 text-[10px] font-bold text-rose-700 uppercase">{cs.programName}</span>
                          <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded shrink-0">{cs.duration}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 truncate">{cs.title}</h4>
                        <p className="text-xs text-slate-500 truncate">{cs.subtitle || 'No subtitle'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto w-full sm:w-auto">
                      <button
                        onClick={() => setEditingItem({ type: 'community-service', data: cs })}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold border border-blue-200 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Update</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCommunityService(cs.id || cs._id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold border border-red-200 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* --- GLOBAL EDIT / UPDATE MODAL FOR ALL ENTRIES --- */}
        <AnimatePresence>
          {editingItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-slate-200 relative text-left max-h-[90vh] flex flex-col my-auto"
              >
                <button
                  onClick={() => setEditingItem(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 shrink-0 pr-10">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                    <Edit2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      Update {editingItem.type === 'slide' ? 'Carousel Banner Slide' : editingItem.type === 'emblem' ? 'Official Partner Emblem' : editingItem.type === 'program' ? 'International Academic Program' : editingItem.type === 'faculty' ? 'National Faculty & Majors' : editingItem.type === 'doc' ? 'Library Document' : editingItem.type === 'news' ? 'News Article' : editingItem.type === 'internship' ? 'Internship & Career' : editingItem.type === 'scholarship' ? 'Scholarship Announcement' : 'MOU Charter'}
                    </h3>
                    <p className="text-xs text-slate-500">Modify properties directly in database & campus portal</p>
                  </div>
                </div>

                <form onSubmit={handleSaveEdit} className="space-y-4 overflow-y-auto pr-1 sm:pr-2 flex-1">
                  {editingItem.type === 'slide' ? (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Slide Title / Headline *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.data.title || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, title: e.target.value },
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Slide Subtitle / Description</label>
                        <textarea
                          rows={2}
                          value={editingItem.data.subtitle || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, subtitle: e.target.value },
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 font-medium"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Badge / Tag</label>
                          <input
                            type="text"
                            value={editingItem.data.tag || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, tag: e.target.value },
                              })
                            }
                            placeholder="e.g. Global Collaboration"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Banner Image URL</label>
                          <input
                            type="text"
                            value={editingItem.data.image || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, image: e.target.value },
                              })
                            }
                            placeholder="Paste image URL or upload below..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Upload Replacement Image File from PC</label>
                        <div className="flex items-center gap-3">
                          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Choose Photo from PC</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setEditingItem({
                                      ...editingItem,
                                      data: { ...editingItem.data, image: reader.result }
                                    });
                                  };
                                  resizeAndReadAsDataURL(file, reader);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                          <span className="text-xs text-slate-500 font-medium truncate max-w-[200px]">
                            {editingItem.data.image ? 'New image loaded & ready!' : 'Select JPG/PNG/WebP'}
                          </span>
                        </div>
                      </div>
                      {editingItem.data.image && (
                        <div className="relative rounded-xl overflow-hidden border border-slate-300 shadow-sm max-h-36 bg-slate-900">
                          <img
                            src={editingItem.data.image}
                            alt="Slide Preview"
                            className="w-full h-32 object-cover"
                          />
                        </div>
                      )}
                    </>
                  ) : editingItem.type === 'emblem' ? (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Institutional Partner Name / Title *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.data.name || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, name: e.target.value },
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Emblem Image URL</label>
                        <input
                          type="text"
                          value={editingItem.data.src || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, src: e.target.value },
                            })
                          }
                          placeholder="Paste image URL or choose file below..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Upload Replacement Emblem Logo from PC</label>
                        <div className="flex items-center gap-3">
                          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Choose Logo from PC</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setEditingItem({
                                      ...editingItem,
                                      data: { ...editingItem.data, src: reader.result }
                                    });
                                  };
                                  resizeAndReadAsDataURL(file, reader);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                          <span className="text-xs text-slate-500 font-medium truncate max-w-[200px]">
                            {editingItem.data.src ? 'New emblem logo loaded!' : 'Select JPG/PNG/WebP'}
                          </span>
                        </div>
                      </div>
                      {editingItem.data.src && (
                        <div className="relative rounded-xl overflow-hidden border border-slate-300 shadow-sm p-4 bg-slate-50 flex items-center justify-center max-h-36">
                          <img
                            src={editingItem.data.src}
                            alt="Emblem Preview"
                            className="max-h-24 w-auto object-contain"
                          />
                        </div>
                      )}
                    </>
                  ) : editingItem.type === 'team' ? (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.data.name || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, name: e.target.value }
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Executive Job Title *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.data.title || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, title: e.target.value }
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Leadership Section *</label>
                        <select
                          value={editingItem.data.roleCategory || 'Our Management Team'}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, roleCategory: e.target.value }
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 font-semibold"
                        >
                          <option value="Executive Leadership">Executive Leadership</option>
                          <option value="Message from Leadership">Message from Leadership</option>
                          <option value="Our Management Team">Our Management Team</option>
                          <option value="University Administration">University Administration</option>
                          <option value="Academic Governance">Academic Governance</option>
                          <option value="Global Diplomacy">Global Diplomacy</option>
                          <option value="Student Welfare & Success">Student Welfare & Success</option>
                          <option value="Faculty & Deans">Faculty & Deans</option>
                          <option value="Board of Trustees">Board of Trustees</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Highlight Sub-Badge (Optional)</label>
                        <input
                          type="text"
                          value={editingItem.data.highlight || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, highlight: e.target.value }
                            })
                          }
                          placeholder="e.g. Institutional Founder, University President"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Photo URL or PC Upload</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingItem.data.photoUrl || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, photoUrl: e.target.value }
                              })
                            }
                            placeholder="https://... or upload from PC ->"
                            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                          />
                          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload PC</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setEditingItem({
                                      ...editingItem,
                                      data: { ...editingItem.data, photoUrl: reader.result }
                                    });
                                  };
                                  resizeAndReadAsDataURL(file, reader);
                                }
                              }}
                            />
                          </label>
                        </div>
                        {editingItem.data.photoUrl && (
                          <div className="mt-2 flex items-center gap-3 p-2 bg-slate-100 rounded-xl border border-slate-200">
                            <img src={editingItem.data.photoUrl} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-white shadow-sm" />
                            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Photo Attached
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Leadership Quote / Message</label>
                        <textarea
                          rows={2}
                          value={editingItem.data.message || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, message: e.target.value }
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Biography / Profile Description</label>
                        <textarea
                          rows={3}
                          value={editingItem.data.bio || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, bio: e.target.value }
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Facebook Link</label>
                          <input
                            type="text"
                            value={editingItem.data.facebook || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, facebook: e.target.value }
                              })
                            }
                            placeholder="https://facebook.com/bonamary"
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email Address</label>
                          <input
                            type="email"
                            value={editingItem.data.email || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, email: e.target.value }
                              })
                            }
                            placeholder="info@bonamary.edu.kh"
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                          />
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 block mb-2.5">Faculty & Deans Academic Details (Optional)</span>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Academic Department / Faculty</label>
                            <select
                              value={editingItem.data.department || 'Academic Leadership & Deans'}
                              onChange={(e) =>
                                setEditingItem({
                                  ...editingItem,
                                  data: { ...editingItem.data, department: e.target.value }
                                })
                              }
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none font-semibold"
                            >
                              <option value="Academic Leadership & Deans">Academic Leadership & Deans</option>
                              <option value="Faculty of Law and Social Sciences">Faculty of Law and Social Sciences</option>
                              <option value="Faculty of Business Administration and Tourism">Faculty of Business Administration and Tourism</option>
                              <option value="Faculty of Technology and Science">Faculty of Technology and Science</option>
                              <option value="Faculty of Engineering and Architecture">Faculty of Engineering and Architecture</option>
                              <option value="Faculty of Education and Languages">Faculty of Education and Languages</option>
                              <option value="School of Computing & Digital Skilling">School of Computing & Digital Skilling</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Education / Degree</label>
                              <input
                                type="text"
                                value={editingItem.data.education || ''}
                                onChange={(e) =>
                                  setEditingItem({
                                    ...editingItem,
                                    data: { ...editingItem.data, education: e.target.value }
                                  })
                                }
                                placeholder="Ph.D. / Advanced Executive Leadership"
                                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Office Location</label>
                              <input
                                type="text"
                                value={editingItem.data.office || ''}
                                onChange={(e) =>
                                  setEditingItem({
                                    ...editingItem,
                                    data: { ...editingItem.data, office: e.target.value }
                                  })
                                }
                                placeholder="Executive Academic Wing"
                                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Publications</label>
                              <input
                                type="number"
                                value={editingItem.data.publications || ''}
                                onChange={(e) =>
                                  setEditingItem({
                                    ...editingItem,
                                    data: { ...editingItem.data, publications: Number(e.target.value) || 0 }
                                  })
                                }
                                placeholder="35"
                                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Citations</label>
                              <input
                                type="text"
                                value={editingItem.data.citations || ''}
                                onChange={(e) =>
                                  setEditingItem({
                                    ...editingItem,
                                    data: { ...editingItem.data, citations: e.target.value }
                                  })
                                }
                                placeholder="1,800+"
                                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : editingItem.type === 'news' ? (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Article Headline *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.data.title || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, title: e.target.value }
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none font-semibold"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category *</label>
                          <select
                            value={editingItem.data.category || 'Academic Research'}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, category: e.target.value }
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none font-semibold"
                          >
                            <option value="Academic Research">Academic Research</option>
                            <option value="Campus Expansion">Campus Expansion</option>
                            <option value="Global Partnerships">Global Partnerships</option>
                            <option value="Student Achievements">Student Achievements</option>
                            <option value="Innovation & Entrepreneurship">Innovation & Entrepreneurship</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Author</label>
                          <input
                            type="text"
                            value={editingItem.data.author || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, author: e.target.value }
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Short Summary</label>
                        <textarea
                          rows={2}
                          value={editingItem.data.summary || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, summary: e.target.value }
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Content</label>
                        <textarea
                          rows={4}
                          value={editingItem.data.content || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, content: e.target.value }
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                          <label className="block text-sm font-bold uppercase text-slate-700">
                            Photo Gallery ({(editingItem.data.gallery || []).length} / 20)
                          </label>
                          {(editingItem.data.gallery || []).length > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingItem({
                                  ...editingItem,
                                  data: { ...editingItem.data, gallery: [], image: '' }
                                });
                              }}
                              className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                            >
                              Clear All Photos
                            </button>
                          )}
                        </div>
                        
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleEditNewsImageUpload}
                          className="w-full mb-4 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-bmu-pink file:text-white hover:file:bg-bmu-red"
                        />
                        
                        {(editingItem.data.gallery || []).length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                            {editingItem.data.gallery.map((img, i) => (
                              <div key={i} className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-video">
                                <img src={img} alt={`Preview ${i+1}`} className="w-full h-full object-cover" />
                                {i === 0 && (
                                  <div className="absolute top-1 left-1 bg-bmu-red text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-sm">Cover</div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ) : editingItem.type === 'internship' ? (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Student Name (Khmer / English) *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.data.company || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, company: e.target.value }
                            })
                          }
                          placeholder="e.g. ផេង ដាលីស (Pheng Dalis)"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Position / Role Title (Khmer / English) *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.data.position || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, position: e.target.value }
                            })
                          }
                          placeholder="e.g. គ្រប់គ្រងថ្នាក់ភាសាចិន នៅ BMU (Year 3)"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Year / Scholar Status *</label>
                        <select
                          value={editingItem.data.status || 'Year 3 Scholar'}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, status: e.target.value }
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none font-bold"
                        >
                          <option value="Year 1 Scholar">Year 1 Scholar</option>
                          <option value="Year 2 Scholar">Year 2 Scholar</option>
                          <option value="Year 3 Scholar">Year 3 Scholar</option>
                          <option value="Year 4 Scholar">Year 4 Scholar</option>
                          <option value="Active Scholar Placement">Active Scholar Placement</option>
                          <option value="Alumni Scholar">Alumni Scholar</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Company Logo / Opportunity Image URL or Upload</label>
                        <input
                          type="text"
                          value={editingItem.data.image || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, image: e.target.value }
                            })
                          }
                          placeholder="Paste image URL or choose file below..."
                          className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none mb-2"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleEditIntImageChange}
                          className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-cyan-100 file:text-cyan-800 hover:file:bg-cyan-200 cursor-pointer"
                        />
                        {editingItem.data.image && (
                          <div className="mt-2.5 p-2 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-3">
                            <img src={editingItem.data.image} alt="Internship Preview" className="h-14 w-14 object-cover rounded-lg border border-slate-300" />
                            <div className="flex-1 min-w-0 text-xs font-bold text-slate-700 truncate">
                              Image loaded & ready!
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setEditingItem({
                                  ...editingItem,
                                  data: { ...editingItem.data, image: '' }
                                })
                              }
                              className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 text-xs font-bold shrink-0"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Role Description & Eligibility</label>
                        <textarea
                          rows={3}
                          value={editingItem.data.description || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, description: e.target.value }
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                    </>
                  ) : editingItem.type === 'campus-life' ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Photo Title *</label>
                          <input
                            type="text"
                            required
                            value={editingItem.data.title || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, title: e.target.value }
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category</label>
                          <input
                            type="text"
                            value={editingItem.data.category || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, category: e.target.value }
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={editingItem.data.description || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, description: e.target.value }
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Photo Upload</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleEditCampusLifeImageChange}
                          className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {editingItem.data.image && (
                          <div className="mt-2">
                            <img src={editingItem.data.image} alt="Preview" className="h-20 object-contain rounded-md" />
                          </div>
                        )}
                      </div>
                    </>
                  ) : editingItem.type === 'community-service' ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Title *</label>
                          <input
                            type="text"
                            required
                            value={editingItem.data.title || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, title: e.target.value }
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={editingItem.data.subtitle || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, subtitle: e.target.value }
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Program Name *</label>
                          <input
                            type="text"
                            required
                            value={editingItem.data.programName || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, programName: e.target.value }
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Duration</label>
                          <input
                            type="text"
                            value={editingItem.data.duration || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, duration: e.target.value }
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Description *</label>
                        <textarea
                          rows={3}
                          required
                          value={editingItem.data.description || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, description: e.target.value }
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Acknowledgements</label>
                        <textarea
                          rows={3}
                          value={Array.isArray(editingItem.data.acknowledgements) ? editingItem.data.acknowledgements.join('\n') : (editingItem.data.acknowledgements || '')}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, acknowledgements: e.target.value.split('\n') }
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Program Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleEditCampusLifeImageChange}
                          className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {editingItem.data.image && (
                          <div className="mt-2 flex items-center justify-between">
                            <img src={editingItem.data.image} alt="Preview" className="h-20 object-contain rounded-md" />
                            <button
                              type="button"
                              onClick={() => setEditingItem({ ...editingItem, data: { ...editingItem.data, image: '' } })}
                              className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 text-xs font-bold shrink-0"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  ) : editingItem.type === 'scholarship' ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Scholarship Title *</label>
                          <input
                            type="text"
                            required
                            value={editingItem.data.title || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, title: e.target.value }
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={editingItem.data.subtitle || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, subtitle: e.target.value }
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Academic Year</label>
                          <input
                            type="text"
                            value={editingItem.data.academicYear || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, academicYear: e.target.value }
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Status</label>
                          <select
                            value={editingItem.data.status || 'Active'}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, status: e.target.value }
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none font-bold"
                          >
                            <option value="Active">Active</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={editingItem.data.description || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, description: e.target.value }
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Document Page 1 URL or Upload</label>
                          <input
                            type="text"
                            value={(editingItem.data.images && editingItem.data.images[0]) || ''}
                            onChange={(e) => {
                              const newImages = [...(editingItem.data.images || [])];
                              newImages[0] = e.target.value;
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, images: newImages }
                              });
                            }}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none mb-2"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleEditScholImage1Change}
                            className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-pink-100 file:text-pink-800 hover:file:bg-pink-200 cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Document Page 2 URL or Upload</label>
                          <input
                            type="text"
                            value={(editingItem.data.images && editingItem.data.images[1]) || ''}
                            onChange={(e) => {
                              const newImages = [...(editingItem.data.images || [])];
                              newImages[1] = e.target.value;
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, images: newImages }
                              });
                            }}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none mb-2"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleEditScholImage2Change}
                            className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-pink-100 file:text-pink-800 hover:file:bg-pink-200 cursor-pointer"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {editingItem.type !== 'faculty' && (
                        <>
                          <div>
                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Title / Headline / Partner Name *</label>
                            <input
                          type="text"
                          required
                          value={editingItem.data.title || editingItem.data.partner || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: {
                                ...editingItem.data,
                                [editingItem.data.title !== undefined ? 'title' : 'partner']: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category / Scope *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.data.category || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, category: e.target.value },
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 font-semibold"
                        />
                      </div>

                      {editingItem.type === 'partner' && (
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Website / Social Link</label>
                          <input
                            type="url"
                            value={editingItem.data.websiteUrl || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: { ...editingItem.data, websiteUrl: e.target.value },
                              })
                            }
                            placeholder="https://..."
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600"
                          />
                        </div>
                      )}

                      {editingItem.type === 'mou' && (
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Signing Photos</label>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              if (!files.length) return;
                              
                              const validFiles = files.filter(f => f.size <= 2 * 1024 * 1024);
                              if (validFiles.length < files.length) {
                                alert('Some files exceed 2MB limit and were skipped.');
                              }

                              const readers = validFiles.map(file => {
                                return new Promise((resolve) => {
                                  const reader = new FileReader();
                                  reader.onloadend = () => resolve(reader.result);
                                  resizeAndReadAsDataURL(file, reader);
                                });
                              });

                              Promise.all(readers).then(results => {
                                const currentGallery = (editingItem.data.gallery && editingItem.data.gallery.length > 0) 
                                  ? editingItem.data.gallery 
                                  : (editingItem.data.image ? [editingItem.data.image] : []);
                                const newGallery = [...currentGallery, ...results];
                                setEditingItem({
                                  ...editingItem,
                                  data: { 
                                    ...editingItem.data, 
                                    gallery: newGallery,
                                    image: newGallery[0] || editingItem.data.image
                                  }
                                });
                              });
                            }}
                            className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-blue-100 file:text-blue-800 hover:file:bg-blue-200 cursor-pointer"
                          />
                          
                          {(() => {
                            const previewGallery = (editingItem.data.gallery && editingItem.data.gallery.length > 0)
                              ? editingItem.data.gallery
                              : (editingItem.data.image ? [editingItem.data.image] : []);
                            
                            if (previewGallery.length === 0) return null;
                            
                            return (
                              <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                                {previewGallery.map((img, i) => (
                                  <div key={i} className="relative shrink-0">
                                    <img src={img} alt={`Preview ${i+1}`} className="h-16 w-auto rounded border border-slate-200 object-cover" />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newGallery = previewGallery.filter((_, idx) => idx !== i);
                                        setEditingItem({
                                          ...editingItem,
                                          data: {
                                            ...editingItem.data,
                                            gallery: newGallery,
                                            image: newGallery[0] || ''
                                          }
                                        });
                                      }}
                                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-sm"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            );
                          })()}
                        </div>
                      )}

                      {editingItem.type === 'program' && (
                        <>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Duration</label>
                              <input
                                type="text"
                                value={editingItem.data.duration || ''}
                                onChange={(e) =>
                                  setEditingItem({
                                    ...editingItem,
                                    data: { ...editingItem.data, duration: e.target.value },
                                  })
                                }
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Tuition</label>
                              <input
                                type="text"
                                value={editingItem.data.tuition || ''}
                                onChange={(e) =>
                                  setEditingItem({
                                    ...editingItem,
                                    data: { ...editingItem.data, tuition: e.target.value },
                                  })
                                }
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Department</label>
                            <input
                              type="text"
                              value={editingItem.data.department || ''}
                              onChange={(e) =>
                                setEditingItem({
                                  ...editingItem,
                                  data: { ...editingItem.data, department: e.target.value },
                                })
                              }
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm"
                            />
                          </div>
                            </>
                          )}
                        </>
                      )}
                      
                      {editingItem.type === 'faculty' && (
                        <div className="space-y-6">
                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                            <div>
                              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Faculty Name</label>
                              <input
                                type="text"
                                required
                                value={editingItem.data.name || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, name: e.target.value } })}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Faculty Cover Image (Optional)</label>
                              {editingItem.data.image && (
                                <div className="flex items-center gap-2 mb-2">
                                  <img src={editingItem.data.image} alt="Cover" className="w-16 h-10 rounded-lg object-cover" />
                                  <button type="button" onClick={() => setEditingItem({ ...editingItem, data: { ...editingItem.data, image: '' } })} className="text-xs text-red-500 font-bold">Remove</button>
                                </div>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    if (file.size > 2 * 1024 * 1024) return alert('File too large');
                                    const reader = new FileReader();
                                    reader.onloadend = () => setEditingItem({ ...editingItem, data: { ...editingItem.data, image: reader.result } });
                                    resizeAndReadAsDataURL(file, reader);
                                  }
                                }}
                                className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-blue-100 file:text-blue-800 hover:file:bg-blue-200 cursor-pointer"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Dean Name</label>
                                <input
                                  type="text"
                                  required
                                  value={editingItem.data.deanName || ''}
                                  onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, deanName: e.target.value } })}
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Dean Photo</label>
                                {editingItem.data.deanPhoto && (
                                  <div className="flex items-center gap-2 mb-2">
                                    <img src={editingItem.data.deanPhoto} alt="Dean" className="w-8 h-8 rounded-full object-cover" />
                                    <button type="button" onClick={() => setEditingItem({ ...editingItem, data: { ...editingItem.data, deanPhoto: '' } })} className="text-xs text-red-500 font-bold">Remove</button>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      if (file.size > 2 * 1024 * 1024) return alert('File too large');
                                      const reader = new FileReader();
                                      reader.onloadend = () => setEditingItem({ ...editingItem, data: { ...editingItem.data, deanPhoto: reader.result } });
                                      resizeAndReadAsDataURL(file, reader);
                                    }
                                  }}
                                  className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-blue-100 file:text-blue-800 hover:file:bg-blue-200 cursor-pointer"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Dean Message</label>
                              <textarea
                                required
                                value={editingItem.data.deanMessage || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, deanMessage: e.target.value } })}
                                rows={2}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="border-t border-slate-200 pt-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-sm font-black text-slate-900">Manage Majors</h4>
                              <button
                                type="button"
                                onClick={() => {
                                  const newMajor = { id: `maj-${Date.now()}`, title: 'New Major', description: '', degree: 'Undergraduate', duration: '4 Years', tuition: '$500 / Year', careerPathways: [], curriculumHighlights: [] };
                                  setEditingItem({
                                    ...editingItem,
                                    data: { ...editingItem.data, majors: [...(editingItem.data.majors || []), newMajor] }
                                  });
                                }}
                                className="px-3 py-1.5 rounded-lg bg-bmu-red/10 text-bmu-red text-xs font-bold flex items-center gap-1 hover:bg-bmu-red/20 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                                Add Major
                              </button>
                            </div>
                            
                            <div className="space-y-4">
                              {(editingItem.data.majors || []).map((major, index) => (
                                <div key={major.id} className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm space-y-3 relative">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newMajors = editingItem.data.majors.filter(m => m.id !== major.id);
                                      setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                    }}
                                    className="absolute top-4 right-4 p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                  
                                  <div>
                                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Major Title</label>
                                    <input
                                      type="text"
                                      value={major.title}
                                      onChange={(e) => {
                                        const newMajors = [...editingItem.data.majors];
                                        newMajors[index].title = e.target.value;
                                        setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                      }}
                                      className="w-[85%] px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Degree</label>
                                      <input
                                        type="text"
                                        value={major.degree}
                                        onChange={(e) => {
                                          const newMajors = [...editingItem.data.majors];
                                          newMajors[index].degree = e.target.value;
                                          setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                        }}
                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Duration</label>
                                      <input
                                        type="text"
                                        value={major.duration}
                                        onChange={(e) => {
                                          const newMajors = [...editingItem.data.majors];
                                          newMajors[index].duration = e.target.value;
                                          setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                        }}
                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Tuition Fee</label>
                                      <input
                                        type="text"
                                        value={major.tuition || ''}
                                        onChange={(e) => {
                                          const newMajors = [...editingItem.data.majors];
                                          newMajors[index].tuition = e.target.value;
                                          setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                        }}
                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm"
                                        placeholder="$500 / Year"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Student Rating</label>
                                      <input
                                        type="text"
                                        value={major.rating || ''}
                                        onChange={(e) => {
                                          const newMajors = [...editingItem.data.majors];
                                          newMajors[index].rating = e.target.value;
                                          setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                        }}
                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm"
                                        placeholder="4.9"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Students Enrolled</label>
                                      <input
                                        type="text"
                                        value={major.studentsEnrolled || ''}
                                        onChange={(e) => {
                                          const newMajors = [...editingItem.data.majors];
                                          newMajors[index].studentsEnrolled = e.target.value;
                                          setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                        }}
                                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm"
                                        placeholder="150+"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Description</label>
                                    <textarea
                                      value={major.description}
                                      onChange={(e) => {
                                        const newMajors = [...editingItem.data.majors];
                                        newMajors[index].description = e.target.value;
                                        setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                      }}
                                      rows={2}
                                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-sm"
                                    />
                                  </div>
                                  
                                  
                                  <div className="border-t border-slate-200 pt-3 mt-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <h5 className="text-xs font-bold uppercase text-slate-700">Curriculum Semesters</h5>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newMajors = [...editingItem.data.majors];
                                          const currentSemesters = newMajors[index].curriculumSemesters || [];
                                          newMajors[index].curriculumSemesters = [...currentSemesters, { semesterName: `Semester ${currentSemesters.length + 1}`, courses: [] }];
                                          setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                        }}
                                        className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold hover:bg-blue-100 transition-colors"
                                      >
                                        + Add Semester
                                      </button>
                                    </div>
                                    
                                    <div className="space-y-3">
                                      {(major.curriculumSemesters || []).map((sem, sIndex) => (
                                        <div key={sIndex} className="p-3 bg-slate-100 border border-slate-200 rounded-lg">
                                          <div className="flex items-center justify-between mb-2">
                                            <input
                                              type="text"
                                              value={sem.semesterName}
                                              onChange={(e) => {
                                                const newMajors = [...editingItem.data.majors];
                                                newMajors[index].curriculumSemesters[sIndex].semesterName = e.target.value;
                                                setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                              }}
                                              className="text-xs text-slate-900 font-bold bg-white border border-slate-300 px-2 py-1.5 rounded w-1/2 focus:outline-none focus:border-blue-500"
                                              placeholder="Semester Name"
                                            />
                                            <div className="flex items-center gap-2">
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const newMajors = [...editingItem.data.majors];
                                                  newMajors[index].curriculumSemesters[sIndex].courses.push({ code: '', title: '', credits: '' });
                                                  setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                                }}
                                                className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded font-bold hover:bg-green-100"
                                              >
                                                + Add Course
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const newMajors = [...editingItem.data.majors];
                                                  newMajors[index].curriculumSemesters.splice(sIndex, 1);
                                                  setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                                }}
                                                className="text-[10px] text-red-500 hover:underline font-bold"
                                              >
                                                Remove
                                              </button>
                                            </div>
                                          </div>
                                          
                                          {sem.courses && sem.courses.length > 0 && (
                                            <div className="space-y-2 mt-2">
                                              {sem.courses.map((course, cIndex) => (
                                                <div key={cIndex} className="flex items-center gap-2">
                                                  <input
                                                    type="text"
                                                    placeholder="Code"
                                                    value={course.code}
                                                    onChange={(e) => {
                                                      const newMajors = [...editingItem.data.majors];
                                                      newMajors[index].curriculumSemesters[sIndex].courses[cIndex].code = e.target.value;
                                                      setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                                    }}
                                                    className="w-[20%] text-slate-900 bg-white text-xs px-2 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
                                                  />
                                                  <input
                                                    type="text"
                                                    placeholder="Course Title"
                                                    value={course.title}
                                                    onChange={(e) => {
                                                      const newMajors = [...editingItem.data.majors];
                                                      newMajors[index].curriculumSemesters[sIndex].courses[cIndex].title = e.target.value;
                                                      setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                                    }}
                                                    className="flex-1 text-slate-900 bg-white text-xs px-2 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
                                                  />
                                                  <input
                                                    type="text"
                                                    placeholder="Cr"
                                                    value={course.credits}
                                                    onChange={(e) => {
                                                      const newMajors = [...editingItem.data.majors];
                                                      newMajors[index].curriculumSemesters[sIndex].courses[cIndex].credits = e.target.value;
                                                      setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                                    }}
                                                    className="w-12 text-slate-900 bg-white text-xs px-2 py-1.5 border border-slate-300 rounded text-center focus:outline-none focus:border-blue-500"
                                                  />
                                                  <button
                                                    type="button"
                                                    onClick={() => {
                                                      const newMajors = [...editingItem.data.majors];
                                                      newMajors[index].curriculumSemesters[sIndex].courses.splice(cIndex, 1);
                                                      setEditingItem({ ...editingItem, data: { ...editingItem.data, majors: newMajors } });
                                                    }}
                                                    className="text-red-400 hover:text-red-600 p-1"
                                                  >
                                                    <X className="w-3.5 h-3.5" />
                                                  </button>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                </div>
                              ))}
                              {(editingItem.data.majors || []).length === 0 && (
                                <p className="text-xs text-slate-500 italic text-center py-4">No majors added to this faculty yet.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="pt-4 mt-2 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0 sticky bottom-0 bg-white py-2 z-10">
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-lg transition-all flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;

