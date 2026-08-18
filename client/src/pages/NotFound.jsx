import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowLeft, Sparkles, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-bmu-bg relative overflow-hidden flex items-center justify-center text-center">
      {/* Ambient Glows */}
      <div className="absolute w-[600px] h-[600px] bg-bmu-red/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-bmu-pink/15 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto space-y-6 bg-bmu-card/80 backdrop-blur-2xl p-10 sm:p-14 rounded-3xl border border-slate-300/80 shadow-glow-bmu"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-bmu-red to-bmu-pink flex items-center justify-center mx-auto text-white shadow-glow-red animate-bounce">
            <AlertTriangle className="w-10 h-10" />
          </div>

          <div className="text-7xl sm:text-9xl font-black text-gradient-bmu tracking-tighter">
            404
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Lost in the Quantum Realm
          </h1>

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            The page or laboratory coordinate you are attempting to access has undergone quantum decoherence or has been moved to another sector of our Silicon Valley campus.
          </p>

          <div className="pt-6">
            <Link to="/">
              <Button variant="primary" size="lg" icon={ArrowLeft} className="shadow-glow-red">
                Return to Campus Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default NotFound;
