import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Shield, Globe, LogOut, Activity, Database, Sparkles } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('bmu_token');
    localStorage.removeItem('bmu_user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-gray-100 selection:bg-rose-600 selection:text-white font-sans">
      {/* Executive Command Center Topbar - Dedicated for Admin only */}
      <header className="sticky top-0 z-50 bg-[#111827]/95 backdrop-blur-md border-b border-gray-800 px-6 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 via-red-600 to-amber-600 flex items-center justify-center shadow-lg shadow-rose-900/40">
              <Shield className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                  BMU Executive Command Center
                  <span className="text-[10px] uppercase tracking-wider font-semibold bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full border border-rose-500/30">
                    CMS Portal v2.0
                  </span>
                </h1>
              </div>
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                Live Foundry Database Connection • University Executive Clearance
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 bg-gray-900/80 px-3 py-1.5 rounded-lg border border-gray-800 text-xs text-gray-300">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>MongoDB Atlas:</span>
              <span className="text-emerald-400 font-medium">BmuWeb Cluster</span>
            </div>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-medium text-gray-200 border border-gray-700 transition-all shadow-sm hover:border-gray-600"
            >
              <Globe className="w-3.5 h-3.5 text-rose-400" />
              <span>View Public Student Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 hover:border-rose-600 text-xs font-medium transition-all shadow-sm"
              title="Secure Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace Container */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* Isolated Minimal Enterprise Footer for Admin */}
      <footer className="bg-[#0f1422] border-t border-gray-800/80 py-4 px-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 BMU University Executive Enclave • Secure Content Management Portal</p>
          <div className="flex items-center space-x-4 text-gray-400">
            <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-emerald-400" /> API Gateway Online</span>
            <span>•</span>
            <span>All mutations synced with real-time audit log</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
