import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Download, ExternalLink, Sparkles, Shield, Cpu, Database, FileText, Upload, Plus, CheckCircle2, AlertCircle, X, Maximize2, Filter, FileCheck, Layers } from 'lucide-react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import scholarshipP1 from '../assets/scholarship-p1.png';
import scholarshipP2 from '../assets/scholarship-p2.png';

const Library = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' or 'upload'
  const [selectedDocModal, setSelectedDocModal] = useState(null);
  const isAdmin = localStorage.getItem('bmu_admin_logged_in') === 'true'; // Shows only for authenticated admin per user requirement

  // Upload simulation state (ready for backend API connection)
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Official Announcements');
  const [uploadStatus, setUploadStatus] = useState(null); // null, 'success'

  const categories = ['All', 'Official Announcements', 'Scholarships & Grants', 'Academic Research', 'Student Exchange Reports'];

  // Sample document entries (incorporating our real university documents and papers)
  const [documents, setDocuments] = useState([]);

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Handler for UI-to-Backend Upload simulation
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadTitle || !uploadFile) return;

    // Simulate creating a new document entry (When backend is ready, replace with: const formData = new FormData(); formData.append('pdf', uploadFile); fetch('/api/library/upload', ...))
    const newDoc = {
      id: `doc-${Date.now()}`,
      title: uploadTitle,
      category: uploadCategory,
      author: 'Uploaded via Staff/Student Portal',
      date: 'Just Now',
      format: 'PDF Document (`Ready for Backend Storage`)',
      size: `${(uploadFile.size / (1024 * 1024)).toFixed(2)} MB`,
      downloads: '0',
      desc: `Locally uploaded document (${uploadFile.name}). This frontend component is 100% ready to bind to your backend file storage endpoint!`,
      previewImages: null,
      badge: 'Newly Uploaded',
    };

    setDocuments([newDoc, ...documents]);
    setUploadStatus('success');
    setTimeout(() => {
      setUploadStatus(null);
      setUploadFile(null);
      setUploadTitle('');
      setActiveTab('browse');
    }, 2200);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-bmu-bg relative overflow-hidden text-left">
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-bmu-red/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-bmu-pink/10 rounded-full blur-[130px] pointer-events-none" />

      <Container className="relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold uppercase tracking-wider text-bmu-pink mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-bmu-red animate-pulse" />
            <span>24/7 Digital Knowledge & Document Portal</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
            BMU <span className="text-gradient-bmu">Digital Library</span> & PDF Archives
          </h1>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-3xl mx-auto">
            Access, preview, and download official university scholarship announcements, research papers, and student exchange documentation across our digital library repository.
          </p>
        </div>

                {/* Document Browsing UI */}
        <div className="space-y-8">
            {/* Search & Category Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search PDF documents, authors, keywords..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white shadow-sm border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-bmu-pink transition-all font-medium"
                />
              </div>

              {/* Category Chips */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Document Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDocs.map((doc) => (
                <Card key={doc.id} glass hoverEffect className="p-7 bg-white border-slate-200 shadow-xl flex flex-col justify-between space-y-6 group">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-bmu-red group-hover:scale-110 transition-transform shrink-0">
                        <FileText className="w-7 h-7" />
                      </div>
                      <div className="flex flex-wrap gap-2 justify-end">
                        <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {doc.category}
                        </span>
                        {doc.badge && (
                          <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
                            {doc.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-bmu-pink transition-colors mb-2 leading-snug">
                        {doc.title}
                      </h3>
                      <p className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-3">
                        <span>By: {doc.author}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed font-normal">
                        {doc.desc}
                      </p>
                    </div>
                  </div>

                  {/* Footer & Action Buttons */}
                  <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 font-mono">
                      <span>Format: {doc.format}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {doc.previewImages ? (
                        <Button
                          variant="primary"
                          size="sm"
                          icon={Maximize2}
                          onClick={() => setSelectedDocModal(doc.previewImages)}
                          className="w-full sm:w-auto text-xs shadow-glow-bmu"
                        >
                          Preview Full Document
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Download}
                          onClick={() => alert(`When your backend is built, clicking this will trigger a direct PDF download for: "${doc.title}"!`)}
                          className="w-full sm:w-auto text-xs"
                        >
                          Download PDF
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredDocs.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3 animate-bounce" />
                <h3 className="text-lg font-bold text-slate-800">No matching PDF documents found</h3>
                <p className="text-slate-500 text-sm mt-1">Try clearing your search keyword or selecting a different category filter.</p>
              </div>
            )}
          </div>
      </Container>

      {/* FULL-SCREEN DOCUMENT PREVIEW MODAL */}
      <AnimatePresence>
        {selectedDocModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDocModal(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 max-w-5xl w-full max-h-[92vh] bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Top Bar */}
              <div className="p-4 sm:p-5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-4 text-white">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-bmu-pink" />
                  <span className="font-bold text-sm sm:text-base">Official Document Full Preview</span>
                </div>
                <button
                  onClick={() => setSelectedDocModal(null)}
                  className="p-2 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content Scrollable Area */}
              <div className="p-6 overflow-y-auto space-y-6 flex flex-col items-center justify-center bg-slate-950/40">
                {selectedDocModal.map((imgSrc, i) => (
                  <div key={i} className="w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800 p-2 sm:p-4">
                    <img
                      src={imgSrc}
                      alt={`Document Page ${i + 1}`}
                      className="w-full h-auto rounded-xl object-contain mx-auto"
                    />
                  </div>
                ))}
              </div>

              {/* Modal Bottom Bar */}
              <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Page 1 to {selectedDocModal.length} of Official Document</span>
                <Button variant="primary" size="sm" icon={Download} onClick={() => alert("Ready for PDF download connection when backend is built!")}>
                  Download Official PDF
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Library;
