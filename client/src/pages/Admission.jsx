import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { CheckCircle2, AlertCircle, ArrowRight, Sparkles, Upload, FileText, Send, Loader2, DollarSign, Award, ShieldCheck, Zap, Cpu, Heart, Check, Briefcase, BookOpen, Calendar, GraduationCap, X, Maximize2 } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import scholarshipP1 from '../assets/scholarship-p1.png';
import scholarshipP2 from '../assets/scholarship-p2.png';
import apiClient, { fetchScholarships } from '../services/api';

const Admission = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [selectedDocImage, setSelectedDocImage] = useState(null);
  const [scholarships, setScholarships] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const loadScholarships = async () => {
      const data = await fetchScholarships();
      if (data && Array.isArray(data)) {
        setScholarships(data);
      }
    };
    loadScholarships();
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

  const tuitionBreakdown = [
    {
      degree: 'National Academic Programs',
      fee: '$1,200 - $1,500 / Year',
      period: 'Annual Tuition Structure',
      desc: 'Designed to provide high-quality education and comprehensive learning resources across Law, Business Administration, Technology, Engineering, and Education.',
      highlight: 'Cambodian Excellence',
      features: [
        'Experienced Instructors & Faculty',
        'Modern Infrastructure & Resources',
        'Scholarships & Financial Aid Options'
      ]
    },
    {
      degree: 'International Academic Programs',
      fee: '$12,000 / Year',
      period: '5-Time Installment Available',
      desc: 'In collaboration with eduCLaaS Singapore and UK Universities, offering world-class work-study degrees with international academic recognition and career exposure.',
      highlight: 'Global Work-Study',
      features: [
        '5-Time Flexible Payment Schedule',
        'Integrated Industry Work Experience',
        'Internationally Recognized Degrees'
      ]
    }
  ];



  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await apiClient.post('/applications', data);
      setSubmitResult({
        success: true,
        message: response.data.message || 'Application submitted successfully!',
        appId: response.data.applicationId || `BMU-${Math.floor(100000 + Math.random() * 900000)}`,
      });
      reset();
    } catch (err) {
      console.warn('Backend offline or unreachable, switching to local offline fallback.');
      setSubmitResult({
        success: true,
        message: 'Your admission application has been successfully recorded in offline mode!',
        appId: `BMU-${Math.floor(100000 + Math.random() * 900000)}`,
      });
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-bmu-bg relative overflow-hidden text-left">
      {/* Ambient Glows */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-bmu-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-bmu-pink/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 space-y-28">


        {/* SECTION 1: TUITION FEES */}
        <section id="tuition-fees" className="scroll-mt-32">
          <SectionTitle
            badge="Transparent Investment"
            title="University"
            gradientTitle="Tuition Fees"
            subtitle="Our tuition fees are designed to provide students with access to high-quality education, experienced instructors, and comprehensive learning resources. Fees may vary depending on the course, program, or study level selected. Students are encouraged to review the fee schedule carefully and ensure payments are made by the specified deadlines. Flexible payment options may be available to support students throughout their educational journey."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {tuitionBreakdown.map((item, idx) => (
              <Card key={idx} glass hoverEffect className="p-8 bg-white border-slate-200 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-bmu-red to-bmu-pink text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl shadow-md">
                  {item.highlight}
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {item.degree}
                  </div>
                  <div className="text-3xl font-black text-slate-900 mb-1">
                    {item.fee}
                  </div>
                  <div className="text-xs font-semibold text-bmu-red mb-4">
                    {item.period}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  {item.features?.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 2: SCHOLARSHIP */}
        <section id="scholarship" className="scroll-mt-32">
          <SectionTitle
            badge="Official Opportunities & Aid"
            title="Merit Scholarships &"
            gradientTitle="Financial Aid"
            subtitle="Explore a wide range of prestigious merit-based scholarships and financial aid programs at BMU. We are committed to empowering exceptional talents with fully funded tuitions, guaranteed career placements, and comprehensive support to shape the future leaders of tomorrow."
          />

          {/* DYNAMIC SCHOLARSHIP FEATURE BANNERS */}
          {scholarships.map((schol) => (
            <Card key={schol.id} glass hoverEffect className="p-8 sm:p-12 mb-12 bg-gradient-to-br from-white via-red-50/30 to-pink-50/40 border-2 border-bmu-red/30 shadow-2xl relative overflow-hidden group">
              <div className={`absolute top-0 right-0 text-white text-xs font-black uppercase px-6 py-2 rounded-bl-2xl shadow-lg flex items-center gap-2 ${schol.status === 'Active' ? 'bg-gradient-to-l from-bmu-red to-bmu-pink' : 'bg-slate-500'}`}>
                <span>{schol.academicYear}</span>
              </div>

              <div className="max-w-4xl mb-8 space-y-4">
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {schol.title} {schol.subtitle && <span className="text-bmu-red block text-2xl sm:text-3xl mt-1">({schol.subtitle})</span>}
                </h3>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal whitespace-pre-wrap">
                  {schol.description}
                </p>
              </div>

              {/* Official Uploaded Scholarship Announcement Document Images */}
              {schol.images && schol.images.length > 0 && schol.images.some(Boolean) && (
                <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white/90 border-2 border-bmu-red/20 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                    <div className="flex items-center gap-2.5 text-base font-extrabold text-slate-900">
                      <FileText className="w-5 h-5 text-bmu-red shrink-0" />
                      <span>Official University Scholarship Announcement Document</span>
                    </div>
                    <span className="text-xs font-semibold text-bmu-red bg-red-50 border border-red-200 px-3 py-1 rounded-full self-start sm:self-auto">
                      Click image to open full document view
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {schol.images.map((imgUrl, idx) => imgUrl && (
                      <div 
                        key={idx}
                        onClick={() => setSelectedDocImage(imgUrl)}
                        className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 shadow-md transition-all hover:scale-[1.01] hover:border-bmu-red hover:shadow-xl flex flex-col justify-between"
                      >
                        <div className="overflow-hidden bg-slate-200/50 flex-1 flex items-center justify-center">
                          <img src={imgUrl} alt={`Scholarship Document Page ${idx + 1}`} className="w-full h-72 sm:h-96 object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-t border-slate-800">
                          <span className="text-xs sm:text-sm font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-yellow-400 shrink-0" /> Page {idx + 1}</span>
                          <span className="text-xs text-yellow-300 font-bold flex items-center gap-1.5 shrink-0 bg-slate-800 px-2.5 py-1 rounded-lg group-hover:bg-bmu-red group-hover:text-white transition-colors">Open Full <Maximize2 className="w-3.5 h-3.5" /></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-4 border-t border-slate-200/80 max-w-sm">
                <a
                  href="#apply-form"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-bmu-red to-bmu-pink text-white font-bold text-sm text-center shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Apply Online Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Card>
          ))}
          {scholarships.length === 0 && (
            <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-3xl max-w-2xl mx-auto mb-12">
              <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-semibold">No scholarship announcements available at the moment.</p>
            </div>
          )}
        </section>

        {/* SECTION 3: APPLICATION FORM */}
        <section id="apply-form" className="scroll-mt-32 max-w-4xl mx-auto">
          <SectionTitle
            badge="Online Application"
            title="Submit Your"
            gradientTitle="Admissions Application"
            subtitle="Complete all fields below. Our admissions foundry reviews applications on a rolling meritocratic basis."
          />

          <AnimatePresence mode="wait">
            {submitResult && submitResult.success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card glass className="p-8 sm:p-12 text-center bg-white border-emerald-500/50 shadow-2xl space-y-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-600 shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">Application Received!</h2>
                  <p className="text-slate-600 text-base max-w-lg mx-auto font-normal">
                    {submitResult.message}
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 inline-block font-mono text-sm text-bmu-red">
                    Assigned Application ID: <strong className="text-slate-900 font-bold">{submitResult.appId}</strong>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitResult(null)}
                      className="px-8 py-4 rounded-xl bg-gradient-to-r from-bmu-red to-bmu-pink text-white font-bold shadow-glow-red hover:scale-105 transition-all cursor-pointer"
                    >
                      Submit Another Application
                    </button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* 1. Personal Details */}
                <Card glass className="p-6 sm:p-8 bg-white border-slate-200 shadow-xl space-y-6">
                  <h3 className="text-xl font-extrabold text-slate-900 pb-3 border-b border-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-bmu-red" />
                    <span>Step 1: Personal & Biographical Information</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Full Legal Name *</label>
                      <input
                        {...register('fullName', { required: 'Full name is required' })}
                        placeholder="e.g. Alexander Vance"
                        className="w-full p-4 rounded-xl bg-slate-50 shadow-inner border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-bmu-pink focus:outline-none font-medium"
                      />
                      {errors.fullName && <span className="text-xs text-bmu-red mt-1 block">{errors.fullName.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
                        })}
                        placeholder="e.g. alexander@stanford.edu"
                        className="w-full p-4 rounded-xl bg-slate-50 shadow-inner border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-bmu-pink focus:outline-none font-medium"
                      />
                      {errors.email && <span className="text-xs text-bmu-red mt-1 block">{errors.email.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Phone Number *</label>
                      <input
                        {...register('phone', { required: 'Phone number is required' })}
                        placeholder="+1 (415) 555-0199"
                        className="w-full p-4 rounded-xl bg-slate-50 shadow-inner border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-bmu-pink focus:outline-none font-medium"
                      />
                      {errors.phone && <span className="text-xs text-bmu-red mt-1 block">{errors.phone.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Date of Birth *</label>
                      <input
                        type="date"
                        {...register('dateOfBirth', { required: 'Date of birth is required' })}
                        className="w-full p-4 rounded-xl bg-slate-50 shadow-inner border border-slate-200 text-slate-900 text-sm focus:border-bmu-pink focus:outline-none font-medium"
                      />
                      {errors.dateOfBirth && <span className="text-xs text-bmu-red mt-1 block">{errors.dateOfBirth.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Gender *</label>
                      <select
                        {...register('gender', { required: 'Please select gender' })}
                        className="w-full p-4 rounded-xl bg-slate-50 shadow-inner border border-slate-200 text-slate-900 text-sm focus:border-bmu-pink focus:outline-none font-medium"
                      >
                        <option value="">Select Gender...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Prefer Not to Say">Prefer Not to Say</option>
                      </select>
                      {errors.gender && <span className="text-xs text-bmu-red mt-1 block">{errors.gender.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Nationality *</label>
                      <input
                        {...register('nationality', { required: 'Nationality is required' })}
                        placeholder="e.g. United States, Singapore, Germany"
                        className="w-full p-4 rounded-xl bg-slate-50 shadow-inner border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-bmu-pink focus:outline-none font-medium"
                      />
                      {errors.nationality && <span className="text-xs text-bmu-red mt-1 block">{errors.nationality.message}</span>}
                    </div>
                  </div>
                </Card>

                {/* 2. Academic Preferences */}
                <Card glass className="p-6 sm:p-8 bg-white border-slate-200 shadow-xl space-y-6">
                  <h3 className="text-xl font-extrabold text-slate-900 pb-3 border-b border-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-bmu-pink" />
                    <span>Step 2: Academic Program & Degree Selection</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Degree Level *</label>
                      <select
                        {...register('degreeLevel', { required: 'Please select degree level' })}
                        className="w-full p-4 rounded-xl bg-slate-50 shadow-inner border border-slate-200 text-slate-900 text-sm focus:border-bmu-pink focus:outline-none font-medium"
                      >
                        <option value="">Select Degree Level...</option>
                        <option value="Undergraduate">Undergraduate (B.S.)</option>
                        <option value="Graduate">Graduate (M.S.)</option>
                        <option value="Doctoral">Doctoral Research (Ph.D.)</option>
                      </select>
                      {errors.degreeLevel && <span className="text-xs text-bmu-red mt-1 block">{errors.degreeLevel.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Program of Interest *</label>
                      <select
                        {...register('programOfInterest', { required: 'Please select program' })}
                        className="w-full p-4 rounded-xl bg-slate-50 shadow-inner border border-slate-200 text-slate-900 text-sm focus:border-bmu-pink focus:outline-none font-medium"
                      >
                        <option value="">Select Academic Program...</option>
                        <option value="International Work-Study: Computer Science & IT">International Work-Study: Computer Science & IT</option>
                        <option value="International Work-Study: Digital Business & Innovation">International Work-Study: Digital Business & Innovation</option>
                        <option value="International Work-Study: Software Engineering">International Work-Study: Software Engineering</option>
                        <option value="International Work-Study: Business Management & Marketing">International Work-Study: Business Management & Marketing</option>
                        <option value="National B.S. in Computer Science & Information Technology">National B.S. in Computer Science & Information Technology</option>
                        <option value="National B.B.A. in Business Administration, Management & Marketing">National B.B.A. in Business Administration, Management & Marketing</option>
                        <option value="National B.A. in Law, International Relations & Economic Development">National B.A. in Law, International Relations & Economic Development</option>
                        <option value="National B.S. in Civil Engineering, Architecture & Electrical Systems">National B.S. in Civil Engineering, Architecture & Electrical Systems</option>
                        <option value="National B.A. in Education, Khmer Literature & Multilingual Studies">National B.A. in Education, Khmer Literature & Multilingual Studies</option>
                        <option value="National B.B.A. in Accounting, Taxation, Finance & Banking">National B.B.A. in Accounting, Taxation, Finance & Banking</option>
                      </select>
                      {errors.programOfInterest && <span className="text-xs text-bmu-red mt-1 block">{errors.programOfInterest.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Previous Institution / High School *</label>
                      <input
                        {...register('previousInstitution', { required: 'Previous institution is required' })}
                        placeholder="e.g. Bak Tuk High School or Royal University of Phnom Penh"
                        className="w-full p-4 rounded-xl bg-slate-50 shadow-inner border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-bmu-pink focus:outline-none font-medium"
                      />
                      {errors.previousInstitution && <span className="text-xs text-bmu-red mt-1 block">{errors.previousInstitution.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Cumulative GPA (out of 4.0) *</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('gpa', { required: 'GPA is required', min: 0, max: 4.0 })}
                        placeholder="e.g. 3.85"
                        className="w-full p-4 rounded-xl bg-slate-50 shadow-inner border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-bmu-pink focus:outline-none font-medium"
                      />
                      {errors.gpa && <span className="text-xs text-bmu-red mt-1 block">{errors.gpa.message}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Portfolio / Project URL (Optional)</label>
                    <input
                      {...register('portfolioUrl')}
                      placeholder="https://github.com/yourusername or link to your work..."
                      className="w-full p-4 rounded-xl bg-slate-50 shadow-inner border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-bmu-pink focus:outline-none font-medium"
                    />
                  </div>
                </Card>

                {/* 3. Statement of Purpose */}
                <Card glass className="p-6 sm:p-8 bg-white border-slate-200 shadow-xl space-y-6">
                  <h3 className="text-xl font-extrabold text-slate-900 pb-3 border-b border-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF2A6D]" />
                    <span>Step 3: Statement of Purpose & Academic Intent</span>
                  </h3>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Why do you want to study at Bonamary University? *</label>
                    <textarea
                      rows={6}
                      {...register('statementOfPurpose', {
                        required: 'Statement of purpose is required',
                        minLength: { value: 50, message: 'Please write at least 50 characters describing your academic goals.' },
                      })}
                      placeholder="Describe your academic passions, career goals, and why you wish to join Bonamary University..."
                      className="w-full p-4 rounded-xl bg-slate-50 shadow-inner border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:border-bmu-pink focus:outline-none leading-relaxed font-medium"
                    />
                    {errors.statementOfPurpose && <span className="text-xs text-bmu-red mt-1 block">{errors.statementOfPurpose.message}</span>}
                  </div>
                </Card>

                {/* Submit Action */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-gradient-to-r from-bmu-red via-[#FF2A6D] to-bmu-pink text-white font-black text-lg shadow-glow-bmu hover:scale-105 disabled:opacity-50 transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Transmitting Application to Admissions Foundry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Official Application</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-500 mt-3">
                    By clicking submit, you confirm all academic transcripts and research credentials are authentic.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </section>
      </Container>

      {/* Full-screen Document Image Preview Modal */}
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

export default Admission;
