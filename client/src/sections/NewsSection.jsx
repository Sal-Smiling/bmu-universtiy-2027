import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Sparkles, BookOpen, X, Loader2, Trophy, Megaphone, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import { fetchNews } from '../services/api';

const NewsSection = () => {
  const { t } = useTranslation();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeModalImg, setActiveModalImg] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const data = await fetchNews();
      setNewsList(data || []);
      setLoading(false);
    };
    getNews();
  }, []);

  const featuredArticle = newsList.find((a) => a.featured) || newsList[0];
  const recentArticles = newsList.filter((a) => a.id !== featuredArticle?.id).slice(0, 3);

  return (
    <section className="py-24 bg-bmu-surface/50 border-t border-slate-200/60 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-bmu-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-bmu-pink/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <SectionTitle
          badge="Research Chronicle"
          title="Latest News &"
          gradientTitle="Discoveries"
          subtitle="Explore our ongoing academic achievements, international partnerships, and student leadership highlights."
          align="center"
        />

        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 text-bmu-pink animate-spin mx-auto mb-4" />
            <div className="text-slate-900 font-bold text-lg">Loading Chronicle Dispatch...</div>
          </div>
        ) : (
          <>
            {/* FEATURED HEADLINE CARD */}
            {featuredArticle && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <Card
                  glass
                  hoverEffect
                  className="p-6 sm:p-8 lg:p-10 bg-white/95 border border-slate-200/80 shadow-2xl cursor-pointer group"
                  onClick={() => {
                    setSelectedArticle(featuredArticle);
                    setActiveModalImg(featuredArticle.image || (featuredArticle.gallery && featuredArticle.gallery[0]));
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200">
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>

                    <div className="lg:col-span-5 space-y-4 text-left">
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-bold uppercase tracking-wider">
                          {featuredArticle.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-bmu-red" />
                          {featuredArticle.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-bmu-pink" />
                          {featuredArticle.readTime}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-bmu-red transition-colors leading-tight">
                        {featuredArticle.title}
                      </h3>

                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 font-normal">
                        {featuredArticle.summary}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5 font-medium text-slate-600">
                          <User className="w-4 h-4 text-bmu-red" />
                          {featuredArticle.author}
                        </span>
                        <span className="flex items-center gap-1 text-bmu-red font-bold group-hover:translate-x-1 transition-transform">
                          <span>Read Full Story</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* RECENT NEWS GRID (3 COLUMNS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
              {recentArticles.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="h-full"
                >
                  <Card
                    glass
                    hoverEffect
                    className="h-full flex flex-col justify-between p-6 bg-white/90 border border-slate-200/80 shadow-lg group cursor-pointer"
                    onClick={() => {
                      setSelectedArticle(article);
                      setActiveModalImg(article.image || (article.gallery && article.gallery[0]));
                    }}
                  >
                    <div>
                      <div className="relative h-48 rounded-xl overflow-hidden mb-5 border border-slate-200">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-slate-300/40 text-white text-[10px] font-extrabold uppercase">
                          {article.category}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-semibold">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-bmu-red" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-bmu-pink" />
                          {article.readTime}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-bmu-red transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h4>

                      <p className="text-slate-600 text-xs leading-relaxed mb-6 line-clamp-3 font-normal">
                        {article.summary}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4 pt-4 border-t border-slate-100">
                        {article.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-600 font-semibold">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold text-bmu-red group-hover:translate-x-1 transition-transform">
                        <span>Read Chronicle</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* EXPLORE ALL NEWS CTA BANNER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link to="/news">
                <Button variant="primary" icon={ArrowRight} className="px-8 py-4 text-base font-extrabold shadow-glow-red hover:shadow-glow-bmu hover:scale-105 transition-all">
                  Explore All News & Events
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </Container>

      {/* Interactive Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col text-left"
            >
              <div className="relative w-full shrink-0 bg-slate-950 flex items-center justify-center">
                <img src={activeModalImg || selectedArticle.image} alt={selectedArticle.title} className="w-full max-h-[50vh] sm:max-h-[60vh] object-contain transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-black/40 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md border border-white/20 transition-all z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-bmu-red text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 inline-block shadow-md">
                    {selectedArticle.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-md">
                    {selectedArticle.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar">
                <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-200 text-xs text-slate-600 font-semibold">
                  <span>By <strong className="text-slate-900">{selectedArticle.author}</strong></span>
                  <span>Published on <strong className="text-slate-900">{selectedArticle.date}</strong></span>
                  <span>{selectedArticle.readTime}</span>
                </div>

                {/* Photo Gallery inside News Article on Home Page */}
                {selectedArticle.gallery && selectedArticle.gallery.length > 0 && (
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                      <span>Article Photo Gallery ({selectedArticle.gallery.length} Photos)</span>
                      <span className="text-bmu-pink font-semibold">Click thumbnail to inspect</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 sm:gap-3">
                      {selectedArticle.gallery.map((imgUrl, i) => (
                        <div
                          key={i}
                          onClick={() => setActiveModalImg(imgUrl)}
                          className={`relative h-16 sm:h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                            activeModalImg === imgUrl || (!activeModalImg && selectedArticle.image === imgUrl)
                              ? 'border-bmu-red scale-95 shadow-md'
                              : 'border-transparent hover:opacity-80'
                          }`}
                        >
                          <img src={imgUrl} alt={`${selectedArticle.title} gallery ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-slate-700 text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
                  {selectedArticle.content}
                </div>

                <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags?.map((t, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-bmu-red font-mono font-semibold">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase mr-1">Share:</span>
                      <button 
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/news?article=' + (selectedArticle.id || selectedArticle._id))}`, '_blank')} 
                        className="p-2 rounded-full bg-slate-100 hover:bg-[#1877F2] hover:text-white text-slate-600 transition-colors" 
                        title="Share on Facebook"
                      >
                        <Facebook className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + '/news?article=' + (selectedArticle.id || selectedArticle._id))}&text=${encodeURIComponent(selectedArticle.title)}`, '_blank')} 
                        className="p-2 rounded-full bg-slate-100 hover:bg-[#1DA1F2] hover:text-white text-slate-600 transition-colors" 
                        title="Share on Twitter"
                      >
                        <Twitter className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.origin + '/news?article=' + (selectedArticle.id || selectedArticle._id))}&title=${encodeURIComponent(selectedArticle.title)}`, '_blank')} 
                        className="p-2 rounded-full bg-slate-100 hover:bg-[#0A66C2] hover:text-white text-slate-600 transition-colors" 
                        title="Share on LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          const url = window.location.origin + '/news?article=' + (selectedArticle.id || selectedArticle._id);
                          navigator.clipboard.writeText(url).then(() => alert('Link copied to clipboard!'));
                        }} 
                        className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors" 
                        title="Copy Link"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-bold border border-slate-300 ml-2"
                  >
                    Close Story
                  </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NewsSection;
