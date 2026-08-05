'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

// ── Apple, Google, Meta SVG icons ───────────────────────────────────────────
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const MetaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" style={{ color: '#0082FB' }} xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Integrate backend auth
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ backgroundColor: '#F4F4F5' }}>
      {/* ── Split-panel Card ───────────────────────────────────────────── */}
      <div
        className="w-full flex overflow-hidden"
        style={{
          maxWidth: '960px',
          borderRadius: '24px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 24px 64px -12px rgba(0,0,0,0.14)',
          minHeight: '580px',
        }}
      >
        {/* ── Left: Form Panel ──────────────────────────────────────────── */}
        <div className="flex-1 bg-white flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 min-w-0 w-full md:max-w-[520px]">
          {/* Wordmark */}
          <Link href="/" className="inline-flex items-center gap-2.5 mb-10 group w-fit">
            <div className="w-8 h-8 rounded-xl overflow-hidden relative border border-slate-200/80 shadow-sm flex items-center justify-center bg-white shrink-0">
              <Image src="/images/edunex_logo.png" alt="edunex logo" width={32} height={32} className="object-cover" />
            </div>
            <div className="flex items-center">
              <span
                className="font-extrabold tracking-tight font-sans text-2xl"
                style={{ letterSpacing: '-0.03em', color: '#0F172A' }}
              >
                edu
              </span>
              <span
                className="font-extrabold tracking-tight font-sans text-2xl"
                style={{ letterSpacing: '-0.03em', color: '#475569' }}
              >
                nex
              </span>
            </div>
          </Link>

          {/* Heading */}
          <h1
            className="font-serif font-bold mb-1"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: '#0F172A', lineHeight: 1.2 }}
          >
            Welcome back
          </h1>
          <p className="font-sans mb-8" style={{ color: '#4B5563', fontSize: '0.9375rem' }}>
            Login to your edunex account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold font-sans mb-1.5" style={{ color: '#0F172A' }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 text-sm font-sans rounded-xl border transition-all duration-200 outline-none"
                  style={{
                    borderColor: '#E2E8F0',
                    color: '#0F172A',
                    backgroundColor: '#FAFAFA',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2563EB';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.backgroundColor = '#FAFAFA';
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="block text-sm font-semibold font-sans" style={{ color: '#0F172A' }}>
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-sans font-medium transition-colors duration-150"
                  style={{ color: '#2563EB' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#1D4ED8')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#2563EB')}
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 text-sm font-sans rounded-xl border transition-all duration-200 outline-none"
                  style={{
                    borderColor: '#E2E8F0',
                    color: '#0F172A',
                    backgroundColor: '#FAFAFA',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2563EB';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.backgroundColor = '#FAFAFA';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150"
                  style={{ color: '#9CA3AF' }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 font-bold text-sm font-sans rounded-full transition-all duration-200"
              style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                opacity: isLoading ? 0.7 : 1,
                transform: 'scale(1)',
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.015)';
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1E293B';
                }
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0F172A';
              }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Logging in…
                </span>
              ) : (
                <>
                  Login
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: '#E2E8F0' }} />
            <span className="text-xs font-sans font-medium" style={{ color: '#9CA3AF' }}>
              Or continue with
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#E2E8F0' }} />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'login-apple', label: 'Apple', icon: <AppleIcon /> },
              { id: 'login-google', label: 'Google', icon: <GoogleIcon /> },
              { id: 'login-meta', label: 'Meta', icon: <MetaIcon /> },
            ].map(({ id, label, icon }) => (
              <button
                key={id}
                id={id}
                type="button"
                aria-label={`Continue with ${label}`}
                className="flex items-center justify-center py-3 rounded-xl border transition-all duration-150"
                style={{ borderColor: '#E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A' }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F8FAFC';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#CBD5E1';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FFFFFF';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#E2E8F0';
                }}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Footer line */}
          <p className="text-center text-sm font-sans mt-6" style={{ color: '#6B7280' }}>
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold transition-colors duration-150"
              style={{ color: '#2563EB' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#1D4ED8')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#2563EB')}
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* ── Right: Image Panel ────────────────────────────────────────── */}
        <div
          className="hidden md:block relative flex-1 overflow-hidden"
          style={{ borderRadius: '0 24px 24px 0', minWidth: '340px' }}
        >
          <Image
            src="/images/auth_campus_panel.png"
            alt="Beautiful European university campus with students"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 0vw, 50vw"
          />
          {/* Subtle scrim for polish */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.08) 0%, rgba(15,23,42,0.02) 100%)' }}
          />
          {/* Floating badge */}
          <div
            className="absolute bottom-8 left-6 right-6"
            style={{
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(12px)',
              borderRadius: '16px',
              padding: '16px 20px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            }}
          >
            <p className="font-serif font-bold text-base mb-0.5" style={{ color: '#0F172A' }}>
              Your global education awaits
            </p>
            <p className="font-sans text-xs" style={{ color: '#4B5563' }}>
              Join thousands of students navigating study abroad with edunex
            </p>
          </div>
        </div>
      </div>

      {/* ── Legal disclaimer ──────────────────────────────────────────────── */}
      <p className="text-center text-xs font-sans mt-5 max-w-sm" style={{ color: '#9CA3AF' }}>
        By clicking continue, you agree to our{' '}
        <Link
          href="/terms"
          className="underline transition-colors duration-150"
          style={{ color: '#6B7280' }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#374151')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#6B7280')}
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy"
          className="underline transition-colors duration-150"
          style={{ color: '#6B7280' }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#374151')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#6B7280')}
        >
          Privacy Policy
        </Link>
        .
      </p>
    </main>
  );
}
