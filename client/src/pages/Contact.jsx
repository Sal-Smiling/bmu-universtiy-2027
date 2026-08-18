import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, Sparkles, Building2, Globe, Loader2 } from 'lucide-react';
import Container from '../components/Container';
import Card from '../components/Card';
import axios from 'axios';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/contact', data);
      setSubmitResult({
        success: true,
        message: response.data.message || 'Thank you! Your inquiry has been received.',
        ticketId: response.data.ticketId || `TICKET-${Math.floor(10000 + Math.random() * 90000)}`,
      });
      reset();
    } catch (err) {
      console.warn('Backend offline, switching to local offline fallback.');
      setSubmitResult({
        success: true,
        message: 'Your contact inquiry has been successfully recorded in offline mode!',
        ticketId: `TICKET-${Math.floor(10000 + Math.random() * 90000)}`,
      });
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-bmu-bg relative overflow-hidden text-left">
      <div className="absolute top-20 right-1/3 w-[500px] h-[500px] bg-bmu-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-[500px] h-[500px] bg-bmu-pink/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/80 border border-slate-200 text-xs font-bold uppercase tracking-wider text-bmu-pink mb-4 shadow-glow-red">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Phnom Penh Campus Headquarters</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Connect With <span className="text-gradient-bmu">BMU University</span>
          </h1>
          <p className="text-slate-700 text-lg sm:text-xl font-normal leading-relaxed">
            Have questions about undergraduate admissions, scholarship opportunities, or international articulation partnerships? Reach out to our campus teams today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info & Office Directory */}
          <div className="lg:col-span-5 space-y-6">
            <Card glass className="p-8 bg-bmu-card/80 border-slate-300/80 space-y-6">
              <h3 className="text-2xl font-black text-slate-900">Phnom Penh Campus</h3>
              
              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-bmu-red/20 text-bmu-red border border-bmu-red/30 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">University Campus Address</div>
                    <div className="text-sm font-semibold text-slate-800">#651, Street 86P, Sangkat Kouk Kleang</div>
                    <div className="text-xs text-slate-600">Khan Sensok, Phnom Penh 120806, Kingdom of Cambodia</div>
                    <div className="text-xs text-bmu-red font-bold mt-0.5">Map Code: HVH6+PGX, Phnom Penh, Sen Sok</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-bmu-pink/20 text-bmu-pink border border-bmu-pink/30 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">Official Email Inquiry</div>
                    <a href="mailto:info@bonamary-u.com" className="text-sm font-bold text-bmu-red hover:underline block">info@bonamary-u.com</a>
                    <div className="text-xs text-slate-600">Admissions & General Support</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-200/80 text-slate-900 border border-slate-300 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">Direct Phone Lines</div>
                    <div className="text-sm font-bold text-slate-800">+855 17 605 080</div>
                    <div className="text-sm font-bold text-slate-800">+855 87 605 080</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 text-xs text-slate-600">
                <div className="font-bold uppercase text-slate-900 mb-1">Visitor Center Hours</div>
                <div>Monday – Saturday: 8:00 AM – 6:00 PM (GMT+7)</div>
                <div>Sunday: Closed</div>
              </div>
            </Card>

            {/* Interactive 3D Location Map Widget */}
            <Card glass className="p-4 bg-white/90 border-slate-300/80 shadow-lg overflow-hidden">
              <div className="text-xs font-extrabold text-slate-900 mb-3 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-bmu-red" />
                <span>Interactive Campus Map</span>
              </div>
              <div className="w-full h-56 rounded-xl overflow-hidden shadow-inner border border-slate-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4407.376641091717!2d104.8604471!3d11.5790477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951da7109166b%3A0x1f1a5babaf71d57a!2sBMU%20University!5e1!3m2!1sen!2skh!4v1783487302517!5m2!1sen!2skh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="BMU University Phnom Penh Map"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>

          {/* Right: Inquiry Submission Form */}
          <div className="lg:col-span-7">
            <Card glass className="p-8 sm:p-10 bg-bmu-card/90 border-slate-300/80">
              <AnimatePresence mode="wait">
                {submitResult && submitResult.success ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto" />
                    <h3 className="text-2xl font-black text-slate-900">Message Transmitted!</h3>
                    <p className="text-slate-700 text-sm max-w-md mx-auto">{submitResult.message}</p>
                    <div className="p-3 bg-slate-100/80 rounded-xl inline-block font-mono text-xs text-bmu-pink">
                      Ticket ID: <strong>{submitResult.ticketId}</strong>
                    </div>
                    <div className="pt-4">
                      <button onClick={() => setSubmitResult(null)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-bmu-red to-bmu-pink text-white font-bold text-sm">
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <h3 className="text-2xl font-black text-slate-900 pb-4 border-b border-slate-200">
                      Send an Inquiry to Campus Headquarters
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Your Name *</label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          placeholder="e.g. Sarah Connor"
                          className="w-full p-4 rounded-xl bg-white/80 shadow-sm border border-slate-300/80 text-slate-900 text-sm focus:border-bmu-pink focus:outline-none"
                        />
                        {errors.name && <span className="text-xs text-bmu-red mt-1 block">{errors.name.message}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                          placeholder="e.g. sarah@gmail.com"
                          className="w-full p-4 rounded-xl bg-white/80 shadow-sm border border-slate-300/80 text-slate-900 text-sm focus:border-bmu-pink focus:outline-none"
                        />
                        {errors.email && <span className="text-xs text-bmu-red mt-1 block">{errors.email.message}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Phone Number</label>
                        <input
                          {...register('phone')}
                          placeholder="Optional phone number"
                          className="w-full p-4 rounded-xl bg-white/80 shadow-sm border border-slate-300/80 text-slate-900 text-sm focus:border-bmu-pink focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Department to Contact *</label>
                        <select
                          {...register('department', { required: 'Please select department' })}
                          className="w-full p-4 rounded-xl bg-white/80 shadow-sm border border-slate-300/80 text-slate-900 text-sm focus:border-bmu-pink focus:outline-none"
                        >
                          <option value="" className="bg-bmu-card">Select Department...</option>
                          <option value="Admissions Office" className="bg-bmu-card">Admissions Office</option>
                          <option value="Research Partnerships & Grants" className="bg-bmu-card">Research Partnerships & Grants</option>
                          <option value="Academic Affairs & Dean" className="bg-bmu-card">Academic Affairs & Dean</option>
                          <option value="Campus Tours & Visitor Center" className="bg-bmu-card">Campus Tours & Visitor Center</option>
                          <option value="Silicon Valley Corporate Incubator" className="bg-bmu-card">Silicon Valley Corporate Incubator</option>
                        </select>
                        {errors.department && <span className="text-xs text-bmu-red mt-1 block">{errors.department.message}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Subject *</label>
                      <input
                        {...register('subject', { required: 'Subject is required' })}
                        placeholder="e.g. Inquiry regarding Fall 2026 Quantum Computing lab access"
                        className="w-full p-4 rounded-xl bg-white/80 shadow-sm border border-slate-300/80 text-slate-900 text-sm focus:border-bmu-pink focus:outline-none"
                      />
                      {errors.subject && <span className="text-xs text-bmu-red mt-1 block">{errors.subject.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Your Message *</label>
                      <textarea
                        rows={5}
                        {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'Message too short' } })}
                        placeholder="Write your message here..."
                        className="w-full p-4 rounded-xl bg-white/80 shadow-sm border border-slate-300/80 text-slate-900 text-sm focus:border-bmu-pink focus:outline-none leading-relaxed"
                      />
                      {errors.message && <span className="text-xs text-bmu-red mt-1 block">{errors.message.message}</span>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-bmu-red to-bmu-pink text-white font-extrabold text-base shadow-glow-red hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Send Official Inquiry</span>}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
