import { useState } from 'react';
import Navbar from '../components/Navbar';
import MeshBackground from '../components/MeshBackground';
import AnalyzeForm from '../components/AnalyzeForm';
import AnalyzingLoader from '../components/AnalyzingLoader';
import ResultsCard from '../components/ResultsCard';
import FeatureStrip from '../components/FeatureStrip';
import { analyzeInternship } from '../api';

// View states
const VIEWS = {
  FORM: 'form',
  LOADING: 'loading',
  RESULTS: 'results',
  ERROR: 'error',
};

export default function Home() {
  const [view, setView] = useState(VIEWS.FORM);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (payload) => {
    setApiError('');
    setView(VIEWS.LOADING);

    try {
      const data = await analyzeInternship(payload);
      setResult(data);
      setView(VIEWS.RESULTS);
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err?.message ||
        'Something went wrong. Please try again.';
      setApiError(message);
      setView(VIEWS.ERROR);
    }
  };

  const handleReset = () => {
    setResult(null);
    setApiError('');
    setView(VIEWS.FORM);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <MeshBackground />

      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />

        <main className="flex-1 flex flex-col items-center px-4 py-8">
          {/* ── Hero Text (shown except on results) ── */}
          {view !== VIEWS.RESULTS && (
            <div className="text-center mb-8 mt-4 fade-in">
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <svg width="52" height="52" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M16 3L4 8v8c0 7 5.4 13.5 12 15 6.6-1.5 12-8 12-15V8L16 3z"
                    fill="url(#shieldGrad2)"
                  />
                  <path
                    d="M12 16l3 3 5-6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="shieldGrad2"
                      x1="4"
                      y1="3"
                      x2="28"
                      y2="30"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <h1
                className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #60a5fa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% auto',
                }}
              >
                {view === VIEWS.LOADING ? 'Detect Fake Internships Instantly' : 'Detect Fake Internships Instantly'}
              </h1>

              <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                Paste a listing or URL and our AI will scan it for scam signals, red flags, and
                community reports in seconds.
              </p>
            </div>
          )}

          {/* ── View Switcher ── */}
          <div className="w-full max-w-4xl">
            {view === VIEWS.FORM && (
              <AnalyzeForm onSubmit={handleSubmit} isLoading={false} />
            )}

            {view === VIEWS.LOADING && (
              <div className="flex justify-center">
                <AnalyzingLoader />
              </div>
            )}

            {view === VIEWS.RESULTS && result && (
              <ResultsCard result={result} onReset={handleReset} />
            )}

            {view === VIEWS.ERROR && (
              <div className="glass-card p-8 max-w-lg mx-auto text-center fade-in">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-white mb-2">Analysis Failed</h3>
                <p className="text-slate-400 text-sm mb-6">{apiError}</p>
                <button className="btn-analyze mx-auto" onClick={handleReset}>
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* ── Feature strip — only on form view ── */}
          {view === VIEWS.FORM && <FeatureStrip />}
        </main>

        {/* Footer */}
        <footer className="text-center py-6 text-xs text-slate-600 border-t border-slate-800/40 relative z-10">
          © {new Date().getFullYear()} InternShield — Protecting students from fake internships.
        </footer>
      </div>
    </div>
  );
}
