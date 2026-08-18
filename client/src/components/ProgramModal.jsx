import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, BookOpen, Clock, DollarSign, Building2, Sparkles, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

const ProgramModal = ({ program, onClose }) => {
  // Lock background scroll when modal is open
  useEffect(() => {
    if (program) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [program]);

  if (!program) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-white/95 shadow-md backdrop-blur-md transition-opacity"
        />

        {/* Modal Content Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-bmu-card border border-slate-300/80 rounded-3xl shadow-glow-bmu overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header Gradient Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-bmu-red/30 via-[#FF2A6D]/20 to-bmu-pink/30 border-b border-slate-200 shrink-0">
            {program.image && (
              <div className="absolute inset-0 z-0">
                <img src={program.image} alt={program.title} className="w-full h-full object-cover opacity-25" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
              </div>
            )}
            <div className="relative z-10 p-6 sm:p-8">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-200/80 hover:bg-white/40 text-slate-900 transition-colors border border-slate-200 z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-bmu-red/30 border border-bmu-red text-slate-900 text-xs font-bold uppercase tracking-wider">
                  {program.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider">
                  {program.degree} Degree
                </span>
                {program.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-bmu-pink/30 border border-bmu-pink text-bmu-pink text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>Featured Program</span>
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
                {program.title}
              </h2>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Building2 className="w-4 h-4 text-bmu-pink" />
                <span>{program.department}</span>
              </div>
            </div>
          </div>

          {/* Scrollable Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-left custom-scrollbar">
            {/* Quick Stats Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white/[0.03] border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-bmu-red/20 text-bmu-red border border-bmu-red/30">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-slate-600">Duration</div>
                  <div className="text-base font-extrabold text-slate-900">{program.duration}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-bmu-pink/20 text-bmu-pink border border-bmu-pink/30">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-slate-600">Tuition Fee</div>
                  <div className="text-base font-extrabold text-slate-900">{program.tuition}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-200/80 text-slate-900 border border-slate-300">
                  <Award className="w-6 h-6 text-[#FF2A6D]" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-slate-600">Student Rating</div>
                  <div className="text-base font-extrabold text-slate-900">{program.rating || '4.9'} / 5.0 ({program.studentsEnrolled || '150+'} Active)</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-bmu-pink" />
                <span>Program Overview</span>
              </h3>
              <p className="text-slate-700 text-base leading-relaxed">
                {program.description}
              </p>
            </div>



            {/* Curriculum Highlights */}
            {program.curriculumHighlights && program.curriculumHighlights.length > 0 && (
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-bmu-pink" />
                  <span>Curriculum Highlights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {program.curriculumHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-sm text-slate-700 bg-white/[0.02] p-3 rounded-xl border border-slate-200/60"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-bmu-red shrink-0" />
                      <span className="font-medium text-slate-900">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

            )}

            {/* Detailed Academic Curriculum */}
            {program.curriculumSemesters && program.curriculumSemesters.length > 0 && (
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-bmu-red" />
                  <span>Academic Curriculum</span>
                </h3>
                <div className="space-y-6">
                  {program.curriculumSemesters.map((sem, idx) => {
                    const totalCredits = sem.courses.reduce((acc, curr) => {
                      const num = parseInt(curr.credits);
                      return acc + (isNaN(num) ? 0 : num);
                    }, 0);

                    return (
                      <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="bg-slate-50 py-3 px-4 border-b border-slate-200 text-center">
                          <h4 className="font-bold text-slate-900">{sem.semesterName}</h4>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm text-slate-700">
                            <tbody>
                              {sem.courses.map((course, cIdx) => (
                                <tr key={cIdx} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                  <td className="py-3 px-4 font-medium text-red-600 w-[20%] border-r border-slate-100">{course.code}</td>
                                  <td className="py-3 px-4 text-red-600 border-r border-slate-100">{course.title}</td>
                                  <td className="py-3 px-4 text-red-600 text-center font-medium w-[15%]">{course.credits}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot className="bg-slate-50 border-t border-slate-200">
                              <tr>
                                <td colSpan={2} className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-200">Total</td>
                                <td className="py-3 px-4 text-center font-bold text-slate-900">{totalCredits > 0 ? totalCredits : ''}</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Career Pathways */}
            {program.careerPathways && program.careerPathways.length > 0 && (
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-bmu-pink" />
                  <span>Direct Career Pathways & Global Placement</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {program.careerPathways.map((path, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-sm text-slate-700 bg-white/[0.02] p-3 rounded-xl border border-slate-200/60"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="font-medium text-slate-900">{path}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer CTA */}
          <div className="p-6 bg-bmu-surface border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="text-left">
              <div className="text-xs font-bold text-slate-600 uppercase">Next Intake: Fall 2026</div>
              <div className="text-sm font-semibold text-slate-900">Application Deadline: November 30, 2026</div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-200/80 hover:bg-slate-200 text-slate-900 font-bold text-sm border border-slate-300 transition-all duration-300"
              >
                Close
              </button>
              <Link to="/admission" className="flex-1 sm:flex-initial" onClick={onClose}>
                <Button variant="primary" size="md" icon={ArrowRight} className="w-full shadow-glow-red">
                  Apply For This Program
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProgramModal;
