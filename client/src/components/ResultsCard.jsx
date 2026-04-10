import { ArrowLeft, AlertTriangle, CheckCircle2, XCircle, Users, Lightbulb, Flag } from 'lucide-react';
import TrustScoreGauge from './TrustScoreGauge';

const VERDICT_CONFIG = {
  safe: {
    label: 'Likely Safe',
    icon: <CheckCircle2 size={28} className="text-green-400" />,
    emoji: '✅',
    desc: 'This listing appears legitimate. Always verify independently.',
    color: '#22c55e',
    bgClass: 'verdict-badge-safe',
  },
  suspicious: {
    label: 'Suspicious',
    icon: <AlertTriangle size={28} className="text-yellow-400" />,
    emoji: '⚠️',
    desc: 'Proceed with caution — some red flags detected.',
    color: '#f59e0b',
    bgClass: 'verdict-badge-suspicious',
  },
  scam: {
    label: 'Likely a Scam',
    icon: <XCircle size={28} className="text-red-400" />,
    emoji: '🚨',
    desc: 'High risk detected — this listing shows strong scam indicators.',
    color: '#ef4444',
    bgClass: 'verdict-badge-scam',
  },
};

function ScoreBar({ score, verdict }) {
  const color =
    verdict === 'safe' ? '#22c55e' : verdict === 'scam' ? '#ef4444' : '#f59e0b';
  return (
    <div className="mt-4">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-sm text-slate-300">
          Trust Score:{' '}
          <strong style={{ color }}>{score}/100</strong>
          <span className="ml-2 text-slate-400 font-normal">
            ({verdict === 'safe' ? 'Low Risk' : verdict === 'scam' ? 'High Risk' : 'Medium Risk'})
          </span>
        </span>
      </div>
      <div className="h-2 rounded-full" style={{ background: 'rgba(30,58,110,0.6)' }}>
        <div
          className="h-2 rounded-full transition-all duration-700"
          style={{
            width: `${score}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

function SeverityPill({ severity }) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full severity-${severity}`}
    >
      {severity.toUpperCase()}
    </span>
  );
}

export default function ResultsCard({ result, onReset }) {
  const { trustScore, verdict, summary, redFlags, actionableSteps, communityReportCount, companyName, jobTitle } =
    result;

  const config = VERDICT_CONFIG[verdict] || VERDICT_CONFIG.suspicious;

  return (
    <div className="w-full max-w-4xl mx-auto fade-in">
      {/* Back button */}
      <button
        onClick={onReset}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft size={16} />
        Analyze another listing
      </button>

      {/* ── Hero Result Card ── */}
      <div
        className="glass-card-dark p-8 mb-5 text-center"
        style={{ border: `1px solid ${config.color}33` }}
      >
        <div className="flex items-center justify-center gap-3 mb-1">
          {config.icon}
          <h2 className="text-3xl font-extrabold text-white">{config.label}</h2>
        </div>
        <p className="text-slate-400 text-sm mb-6">{config.desc}</p>

        <TrustScoreGauge score={trustScore} verdict={verdict} />

        <ScoreBar score={trustScore} verdict={verdict} />

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${config.bgClass}`}>
            <Flag size={12} />
            {config.label.toUpperCase()}
          </span>
          {jobTitle && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
              {jobTitle}
            </span>
          )}
          {companyName && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
              {companyName}
            </span>
          )}
        </div>

        {summary && (
          <p className="mt-5 text-sm text-slate-300 italic max-w-xl mx-auto">
            "{summary}"
          </p>
        )}
      </div>

      {/* ── Two Column: Red Flags + Community ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Red Flags */}
        <div className="glass-card-dark p-6">
          <div className="flex items-center gap-2 mb-1">
            <span>🚩</span>
            <h3 className="font-bold text-white text-base">Why We Flagged This</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">Signals detected in the listing</p>

          {redFlags && redFlags.length > 0 ? (
            <div className="flex flex-col gap-3">
              {redFlags.map((flag, i) => (
                <div key={i} className="rounded-lg p-3" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.1)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-slate-200">{flag.type}</span>
                    <SeverityPill severity={flag.severity || 'medium'} />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{flag.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">No specific red flags identified.</p>
          )}
        </div>

        {/* Community Reports */}
        <div className="glass-card-dark p-6 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-1 self-start">
            <Users size={18} className="text-slate-400" />
            <h3 className="font-bold text-white text-base">Community Reports</h3>
          </div>
          <p className="text-xs text-slate-500 mb-6 self-start">What other students found</p>

          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-extrabold mb-3"
            style={{
              background: communityReportCount > 0
                ? 'rgba(245,158,11,0.15)'
                : 'rgba(34,197,94,0.1)',
              border: `3px solid ${communityReportCount > 0 ? '#f59e0b' : '#22c55e'}`,
              color: communityReportCount > 0 ? '#f59e0b' : '#22c55e',
            }}
          >
            {communityReportCount}
          </div>
          <p
            className="text-sm font-semibold mb-2"
            style={{ color: communityReportCount > 0 ? '#f59e0b' : '#22c55e' }}
          >
            {communityReportCount > 0
              ? `${communityReportCount} suspicious report${communityReportCount !== 1 ? 's' : ''} found`
              : 'No reports found'}
          </p>
          <p className="text-xs text-slate-500">
            {communityReportCount > 0
              ? 'A few students have raised concerns about similar listings.'
              : 'This company has no prior suspicious reports from our community.'}
          </p>
        </div>
      </div>

      {/* ── What You Can Do Next ── */}
      {actionableSteps && actionableSteps.length > 0 && (
        <div className="glass-card-dark p-6 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb size={18} className="text-blue-400" />
            <h3 className="font-bold text-white text-base">What You Can Do Next</h3>
          </div>
          <p className="text-xs text-slate-500 mb-5">Actionable steps to protect yourself</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {actionableSteps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: 'rgba(15,32,64,0.5)', border: '1px solid rgba(59,130,246,0.1)' }}
              >
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa' }}
                >
                  {i + 1}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Analyze Again ── */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="btn-analyze mx-auto"
        >
          Analyze Another Listing
        </button>
      </div>
    </div>
  );
}
