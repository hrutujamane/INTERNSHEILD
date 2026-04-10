import { useEffect, useRef, useState } from 'react';

const VERDICT_COLORS = {
  safe: '#22c55e',
  suspicious: '#f59e0b',
  scam: '#ef4444',
};

/**
 * Animated circular arc gauge that fills to the trust score value.
 */
export default function TrustScoreGauge({ score, verdict }) {
  const [displayScore, setDisplayScore] = useState(0);
  const animRef = useRef(null);

  const color = VERDICT_COLORS[verdict] || '#f59e0b';

  // Animate count-up
  useEffect(() => {
    let start = null;
    const duration = 1200;

    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [score]);

  // SVG arc calculation
  const SIZE = 200;
  const STROKE = 14;
  const R = (SIZE - STROKE) / 2;
  const CIRCUMFERENCE = Math.PI * R; // Half circle arc
  const CENTER = SIZE / 2;

  // Arc goes from 180deg to 0deg (bottom half excluded; we do ~270deg arc)
  // We use a full circle approach with dashoffset
  const FULL_CIRC = 2 * Math.PI * R;
  // We want ~75% of circle (270 degrees)
  const ARC_FRACTION = 0.75;
  const ARC_LEN = FULL_CIRC * ARC_FRACTION;
  const fillLen = (displayScore / 100) * ARC_LEN;
  const gap = FULL_CIRC - ARC_LEN;

  // Rotate so the arc starts at ~135deg (bottom-left) and ends at ~45deg (bottom-right)
  const startAngle = 135;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ transform: `rotate(${startAngle}deg)` }}
      >
        {/* Background track */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={R}
          fill="none"
          stroke="rgba(30, 58, 110, 0.7)"
          strokeWidth={STROKE}
          strokeDasharray={`${ARC_LEN} ${gap}`}
          strokeLinecap="round"
        />
        {/* Filled arc */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={R}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeDasharray={`${fillLen} ${FULL_CIRC - fillLen}`}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dasharray 0.05s ease',
            filter: `drop-shadow(0 0 8px ${color}88)`,
          }}
        />
      </svg>

      {/* Score number — positioned over SVG */}
      <div
        style={{ marginTop: `-${SIZE * 0.72}px`, marginBottom: `${SIZE * 0.18}px` }}
        className="flex flex-col items-center pointer-events-none"
      >
        <span
          className="text-5xl font-extrabold leading-none"
          style={{ color }}
        >
          {displayScore}
        </span>
        <span className="text-xs tracking-widest text-slate-400 uppercase mt-1">
          Trust Score
        </span>
      </div>
    </div>
  );
}
