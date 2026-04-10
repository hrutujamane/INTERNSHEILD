import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const STEPS = [
  { id: 'extract', label: 'Extracting data...', icon: '🔍', durationMs: 2500 },
  { id: 'analyze', label: 'Analyzing content...', icon: '🧠', durationMs: 3000 },
  { id: 'community', label: 'Checking community reports...', icon: '🌐', durationMs: 2000 },
  { id: 'score', label: 'Generating trust score...', icon: '📊', durationMs: 2500 },
];

export default function AnalyzingLoader() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Advance steps over time
  useEffect(() => {
    const timers = [];
    let elapsed = 0;

    STEPS.forEach((step, i) => {
      const t = setTimeout(() => {
        setCurrentStep(i);
      }, elapsed);
      timers.push(t);
      elapsed += step.durationMs;
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  // Animate progress bar smoothly
  useEffect(() => {
    let start = null;
    const totalDuration = STEPS.reduce((s, st) => s + st.durationMs, 0);

    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(Math.round(pct));
      if (pct < 100) requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const getStepState = (idx) => {
    if (idx < currentStep) return 'done';
    if (idx === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="glass-card p-8 w-full max-w-xl mx-auto shadow-2xl fade-in">
      <h2 className="text-2xl font-bold text-center text-white mb-1">
        Analyzing Internship
      </h2>
      <p className="text-center text-slate-400 text-sm mb-8">
        Our AI is scanning this listing for you...
      </p>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Progress</span>
          <span className="font-semibold text-blue-400">{progress}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-3">
        {STEPS.map((step, idx) => {
          const state = getStepState(idx);
          return (
            <div key={step.id} className={`step-row ${state}`}>
              <span className="text-xl" style={{ opacity: state === 'pending' ? 0.4 : 1 }}>
                {step.icon}
              </span>
              <span
                className="flex-1 text-sm font-medium"
                style={{ color: state === 'pending' ? 'rgba(148,163,184,0.5)' : '#e2e8f0' }}
              >
                {step.label}
              </span>
              {state === 'done' && (
                <CheckCircle2 size={18} className="text-green-400" />
              )}
              {state === 'active' && (
                <div className="spinner" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
