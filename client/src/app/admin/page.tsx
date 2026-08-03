'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  Lock,
  Building,
  GraduationCap,
  Award,
  HelpCircle,
  Users,
  Plus,
  Trash2,
  Edit,
  ArrowLeft,
  CheckCircle2,
  Key,
} from 'lucide-react';

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('admin@edunex.io');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [stats, setStats] = useState<any>({
    countriesCount: 10,
    universitiesCount: 6,
    scholarshipsCount: 5,
    faqsCount: 10,
    usersCount: 2,
  });

  const [activeTab, setActiveTab] = useState<'universities' | 'faqs'>('universities');

  // University Form state
  const [uniName, setUniName] = useState('');
  const [uniCity, setUniCity] = useState('');
  const [uniQsRank, setUniQsRank] = useState(100);
  const [uniType, setUniType] = useState('Public');
  const [uniWebsite, setUniWebsite] = useState('');
  const [uniTuition, setUniTuition] = useState('€0 (Tuition Free)');

  // FAQ Form state
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqCategory, setFaqCategory] = useState('Visa');

  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('edunex_token');
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@edunex.io' && password === 'admin123') {
      const mockToken = 'mock-jwt-admin-token-2026';
      localStorage.setItem('edunex_token', mockToken);
      setToken(mockToken);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use demo: admin@edunex.io / admin123');
    }
  };

  const handleCreateUni = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(`Successfully added "${uniName}" to Database!`);
    setUniName('');
    setUniCity('');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleCreateFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(`Successfully created new FAQ record!`);
    setFaqQuestion('');
    setFaqAnswer('');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem('edunex_token');
    setToken(null);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 text-zinc-100 font-sans">
        <Link
          href="/"
          className="mb-8 inline-flex items-center space-x-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> <span>Back to Home</span>
        </Link>

        <div className="w-full max-w-md p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Admin Dashboard Authentication</h1>
            <p className="text-xs text-zinc-400">Manage edunex database records and multi-country profiles.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700/80 rounded-xl text-sm outline-none focus:border-brand-500 text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700/80 rounded-xl text-sm outline-none focus:border-brand-500 text-white"
              />
            </div>

            {loginError && <p className="text-xs text-rose-500 font-medium">{loginError}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 font-extrabold text-xs text-white shadow-lg transition-all"
            >
              Sign In to Admin Portal
            </button>
          </form>

          <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Demo Admin Credentials:</span>
            <span className="font-mono text-brand-400">admin@edunex.io / admin123</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-6 sm:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-brand-500 uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" /> <span>edunex Control Center</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Database & Content Admin Panel</h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/germany"
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
          >
            View Live Hub
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-2" /> {statusMsg}
        </div>
      )}

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-xs text-zinc-400 font-medium">Countries</span>
          <p className="text-2xl font-bold text-white">{stats.countriesCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-xs text-zinc-400 font-medium">Universities</span>
          <p className="text-2xl font-bold text-brand-400">{stats.universitiesCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-xs text-zinc-400 font-medium">Scholarships</span>
          <p className="text-2xl font-bold text-emerald-400">{stats.scholarshipsCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-xs text-zinc-400 font-medium">FAQs Indexed</span>
          <p className="text-2xl font-bold text-indigo-400">{stats.faqsCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
          <span className="text-xs text-zinc-400 font-medium">Admin Users</span>
          <p className="text-2xl font-bold text-purple-400">{stats.usersCount}</p>
        </div>
      </div>

      {/* Module Manager Tabs */}
      <div className="flex items-center space-x-2 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab('universities')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'universities'
              ? 'bg-brand-600 text-white'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Manage Universities
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'faqs'
              ? 'bg-brand-600 text-white'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Manage FAQs
        </button>
      </div>

      {/* Forms */}
      {activeTab === 'universities' ? (
        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center">
            <Plus className="w-5 h-5 text-brand-500 mr-2" /> Add New University Record
          </h3>

          <form onSubmit={handleCreateUni} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">University Name</label>
              <input
                type="text"
                value={uniName}
                onChange={(e) => setUniName(e.target.value)}
                required
                placeholder="e.g. Heidelberg University"
                className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-xs outline-none text-white focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">City</label>
              <input
                type="text"
                value={uniCity}
                onChange={(e) => setUniCity(e.target.value)}
                required
                placeholder="e.g. Heidelberg"
                className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-xs outline-none text-white focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">QS World Rank</label>
              <input
                type="number"
                value={uniQsRank}
                onChange={(e) => setUniQsRank(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-xs outline-none text-white focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Type</label>
              <select
                value={uniType}
                onChange={(e) => setUniType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-xs outline-none text-white focus:border-brand-500"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Tuition Fee</label>
              <input
                type="text"
                value={uniTuition}
                onChange={(e) => setUniTuition(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-xs outline-none text-white focus:border-brand-500"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-xs text-white shadow-md transition-all"
              >
                Create University Record
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center">
            <Plus className="w-5 h-5 text-indigo-500 mr-2" /> Add New FAQ Record
          </h3>

          <form onSubmit={handleCreateFAQ} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Question</label>
              <input
                type="text"
                value={faqQuestion}
                onChange={(e) => setFaqQuestion(e.target.value)}
                required
                placeholder="e.g. How do I book a VFS student visa slot?"
                className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-xs outline-none text-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Answer</label>
              <textarea
                value={faqAnswer}
                onChange={(e) => setFaqAnswer(e.target.value)}
                required
                rows={3}
                placeholder="Provide clear step-by-step guidance..."
                className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-xs outline-none text-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Category</label>
              <select
                value={faqCategory}
                onChange={(e) => setFaqCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-xs outline-none text-white focus:border-indigo-500"
              >
                <option value="Visa">Visa</option>
                <option value="Admission">Admission</option>
                <option value="Blocked Account">Blocked Account</option>
                <option value="APS">APS</option>
                <option value="Jobs">Jobs</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white shadow-md transition-all"
            >
              Create FAQ Entry
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
