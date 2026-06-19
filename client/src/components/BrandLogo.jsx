import { Hexagon, Zap } from 'lucide-react';

export default function BrandLogo({ size = 'nav' }) {
  const isHero = size === 'hero';

  return (
    <div className={`flex flex-col items-center select-none ${isHero ? 'mb-2' : ''}`}>
      <div className={`flex items-center ${isHero ? 'gap-5 flex-col sm:flex-row' : 'gap-3'}`}>
        <div
          className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 ${
            isHero ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-10 h-10 rounded-xl'
          }`}
        >
          <Hexagon
            className="absolute text-white/20 animate-pulse"
            size={isHero ? 88 : 32}
            strokeWidth={1}
          />
          <Zap
            className="text-white relative z-10"
            size={isHero ? 44 : 20}
            strokeWidth={2.5}
          />
        </div>

        <div className={`flex flex-col ${isHero ? 'text-center sm:text-left' : ''}`}>
          <span
            className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-300 tracking-tight leading-none ${
              isHero ? 'text-5xl sm:text-6xl md:text-7xl' : 'text-xl'
            }`}
          >
            INPLA
          </span>
          <span
            className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 tracking-[0.35em] leading-none ${
              isHero ? 'text-2xl sm:text-3xl md:text-4xl mt-2' : 'text-xs tracking-widest mt-0.5'
            }`}
          >
            SHIELD
          </span>
        </div>
      </div>

      {isHero && (
        <p
          className="mt-6 text-base sm:text-lg max-w-md text-center leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          Detect fake internships before they detect you.
        </p>
      )}
    </div>
  );
}
