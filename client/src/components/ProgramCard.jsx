import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Award, ArrowUpRight, BookOpen, Building2 } from 'lucide-react';
import Card from './Card';

const ProgramCard = ({ program, onSelect }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Card
        glass
        hoverEffect
        className="h-full p-0 flex flex-col justify-between border-slate-200 hover:border-bmu-pink/40 bg-bmu-card/70 backdrop-blur-xl group cursor-pointer transition-all duration-300 shadow-lg hover:shadow-glow-pink overflow-hidden"
        onClick={() => onSelect(program)}
      >
        <div>
          {/* Program Hero Image Banner */}
          {program.image && (
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              
              {/* Top Badges overlayed on image */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/20 text-rose-300 text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                  {program.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-900 text-[11px] font-bold uppercase tracking-wider shadow-md">
                  {program.degree}
                </span>
              </div>
              
              {/* Department badge on bottom left of image */}
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-semibold truncate max-w-full">
                  <Building2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="truncate">{program.department}</span>
                </div>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-7">
            {/* Top Badges if no image */}
            {!program.image && (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-bmu-red/20 to-bmu-pink/20 border border-bmu-pink/30 text-bmu-pink text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                    {program.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
                    {program.degree}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-2">
                  <Building2 className="w-3.5 h-3.5 text-bmu-red" />
                  <span>{program.department}</span>
                </div>
              </>
            )}

            {/* Program Title */}
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 group-hover:text-bmu-pink transition-colors line-clamp-2 leading-snug">
              {program.title}
            </h3>

            {/* Short Description */}
            <p className="text-slate-700 text-sm leading-relaxed mb-6 line-clamp-3 font-normal">
              {program.description}
            </p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-200 mb-6 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <div className="p-1.5 rounded-lg bg-slate-100/80 text-bmu-pink">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-500 font-bold">Duration</div>
                  <div className="font-semibold text-slate-900">{program.duration.split(' ')[0]} {program.duration.split(' ')[1]}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <div className="p-1.5 rounded-lg bg-slate-100/80 text-bmu-red">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-500 font-bold">Tuition</div>
                  <div className="font-semibold text-slate-900">{program.tuition.split(' ')[0]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA & Curriculum Preview */}
        <div className="px-6 sm:px-7 pb-6 pt-4 mt-auto border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(program);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-bmu-red text-white hover:bg-gradient-to-r hover:from-bmu-red hover:to-bmu-pink text-xs font-bold transition-all duration-300 shadow-md hover:shadow-glow-red cursor-pointer"
          >
            <span>Explore Details</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProgramCard;
