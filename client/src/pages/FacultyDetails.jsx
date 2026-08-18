import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Building2, BookOpen } from 'lucide-react';
import { fetchFaculties } from '../services/api';
import ProgramModal from '../components/ProgramModal';
import Container from '../components/Container';

const FacultyDetails = () => {
  const { id } = useParams();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getFacultyData = async () => {
      setLoading(true);
      const data = await fetchFaculties();
      if (data) {
        const found = data.find((f) => (f.id === id || f._id === id));
        setFaculty(found);
      }
      setLoading(false);
    };
    getFacultyData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-bmu-red border-t-transparent"></div>
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Faculty Not Found</h2>
        <Link to="/programs" className="text-bmu-red hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Programs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-32 pb-20">
      <Container>
        <Link to="/programs" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-bmu-red mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Programs
        </Link>

        {/* Dean & Faculty Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 h-full">
            <div className="md:col-span-2 relative min-h-[300px] bg-slate-900">
              {faculty.deanPhoto ? (
                <img 
                  src={faculty.deanPhoto} 
                  alt={faculty.deanName}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40">
                  <Building2 className="w-16 h-16 mb-2 opacity-50" />
                  <span className="text-sm font-bold uppercase tracking-wider">No Photo Provided</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-bmu-red mb-3 text-white shadow-lg">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-black text-white">{faculty.deanName}</h3>
                <p className="text-rose-200 font-bold uppercase tracking-wider text-xs">Dean of Faculty</p>
              </div>
            </div>
            
            <div className="md:col-span-3 p-8 sm:p-12 flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">{faculty.name}</h1>
              
              <div className="relative">
                <div className="absolute -top-4 -left-4 text-6xl text-slate-200 font-serif opacity-50">"</div>
                <p className="text-slate-600 text-lg sm:text-xl italic leading-relaxed relative z-10 pl-6 border-l-4 border-bmu-red">
                  {faculty.deanMessage || "Welcome to our faculty. We are dedicated to providing excellent education and building the leaders of tomorrow."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Majors Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Academic Majors</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(faculty.majors || []).map((major, i) => (
              <motion.div 
                key={major.id || i}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedProgram({
                  id: major.id,
                  title: major.title,
                  department: faculty.name,
                  degree: major.degree,
                  duration: major.duration,
                  tuition: major.tuition,
                  rating: major.rating,
                  studentsEnrolled: major.studentsEnrolled,
                  description: major.description,
                  careerPathways: major.careerPathways || [],
                  curriculumHighlights: major.curriculumHighlights || [],
                  curriculumSemesters: major.curriculumSemesters || [],
                })}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-bmu-red/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-bmu-red group-hover:text-white transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-bmu-red transition-colors">{major.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    {major.degree}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    {major.duration}
                  </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2">
                  {major.description || "Discover more about this major by clicking here."}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-bmu-red uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  View Program Details <span className="ml-1">→</span>
                </div>
              </motion.div>
            ))}
            
            {(faculty.majors || []).length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed">
                No majors have been added to this faculty yet.
              </div>
            )}
          </div>
        </motion.div>
      </Container>

      {/* Program Details Modal Overlay */}
      <ProgramModal 
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />
    </div>
  );
};

export default FacultyDetails;
