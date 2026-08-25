import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, Cpu, Key, CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { login } from '../services/api';
import Container from '../components/Container';
import Card from '../components/Card';
import bmuLogo from '../assets/logo.png';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [portalType, setPortalType] = useState('Student Foundry');

  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setLoginError('');
    try {
      const res = await login(data.email, data.password);
      if (res.success) {
        setLoggedIn(true);
        localStorage.setItem('bmu_admin_logged_in', 'true');
        localStorage.setItem('token', res.token);
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-bmu-bg relative overflow-hidden flex items-center justify-center text-left">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-bmu-red/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-bmu-pink/15 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 max-w-lg">
        <Card glass className="p-8 sm:p-10 bg-bmu-card/90 border-slate-300 shadow-glow-bmu space-y-6">
          <div className="text-center space-y-2">
            <img 
              src={bmuLogo} 
              alt="Bonamary University Logo" 
              className="h-12 sm:h-14 mx-auto my-2 object-contain" 
            />
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              BMU <span className="text-gradient-bmu">Portal</span> Login
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-normal">
              Access your supercomputing GPU quotas, SCIF lab credentials, and academic foundry schedules.
            </p>
          </div>

          {/* Portal Selector */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-white/80 shadow-sm border border-slate-200">
            {['Student Foundry', 'Faculty & SCIF'].map((type) => (
              <button
                key={type}
                onClick={() => setPortalType(type)}
                type="button"
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  portalType === type
                    ? 'bg-gradient-to-r from-bmu-red to-bmu-pink text-white shadow-glow-red'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {loggedIn ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mx-auto text-green-400 shadow-glow-red">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Session Authenticated</h3>
              <p className="text-slate-700 text-xs">Welcome back to the BMU {portalType} Gateway. Your admin clearance is active.</p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/admin" className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-bmu-red to-bmu-pink text-white font-extrabold text-xs shadow-glow-red hover:scale-105 transition-all">
                  Launch Admin Dashboard
                </Link>
                <Link to="/" className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-200/80 hover:bg-slate-200 text-slate-900 font-bold text-xs border border-slate-300">
                  Return to Campus Home
                </Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">University ID or Email *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    {...register('email', { required: 'University email is required' })}
                    placeholder="e.g. avance@bmu.edu or BMU-84920"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/90 shadow-sm border border-slate-300/80 text-slate-900 placeholder-gray-500 text-sm focus:border-bmu-pink focus:outline-none font-mono"
                  />
                </div>
                {errors.email && <span className="text-[11px] text-bmu-red mt-1 block">{errors.email.message}</span>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase text-slate-700">Biometric / Quantum Key *</label>
                  <a href="#reset" className="text-[11px] font-bold text-bmu-pink hover:underline">Forgot Key?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    placeholder="••••••••••••••••"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/90 shadow-sm border border-slate-300/80 text-slate-900 placeholder-gray-500 text-sm focus:border-bmu-pink focus:outline-none font-mono"
                  />
                </div>
                {errors.password && <span className="text-[11px] text-bmu-red mt-1 block">{errors.password.message}</span>}
                {loginError && <span className="text-[11px] text-bmu-red mt-1 block">{loginError}</span>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-bmu-red to-bmu-pink text-white font-extrabold text-sm shadow-glow-red hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Authenticate & Enter Enclave</span>}
                </button>
              </div>

              <div className="text-center pt-4 border-t border-slate-200 text-xs text-slate-600">
                <span>Not a registered student or researcher? </span>
                <Link to="/admission" className="text-bmu-pink font-bold hover:underline">
                  Apply for Admission
                </Link>
              </div>
            </form>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Login;

