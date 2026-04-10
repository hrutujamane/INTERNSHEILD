import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav
      className="relative z-10 flex items-center justify-between px-6 py-4"
      style={{ borderBottom: '1px solid rgba(59,130,246,0.1)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="relative">
          {/* Colorful shield icon matching video */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 3L4 8v8c0 7 5.4 13.5 12 15 6.6-1.5 12-8 12-15V8L16 3z" fill="url(#shieldGrad)" />
            <path d="M12 16l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="shieldGrad" x1="4" y1="3" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span
          className="text-xl font-bold tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          InternShield
        </span>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <a href="#" className="hover:text-white transition-colors">How it works</a>
        <a href="#" className="hover:text-white transition-colors">Report a Scam</a>
        <a href="#" className="hover:text-white transition-colors">About</a>
      </div>

      {/* CTA */}
      <button
        className="text-sm font-semibold px-4 py-2 rounded-lg transition-all"
        style={{
          background: 'rgba(59,130,246,0.12)',
          border: '1px solid rgba(59,130,246,0.3)',
          color: '#60a5fa',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(59,130,246,0.22)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(59,130,246,0.12)';
        }}
      >
        Sign In
      </button>
    </nav>
  );
}
