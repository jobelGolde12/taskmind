'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
      
      {/* 🧱 BACKGROUND TILES ONLY */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        
        {/* Top Left */}
        <div className="absolute -top-10 -left-10 grid grid-cols-3 gap-4 opacity-40 md:opacity-100">
          {[...Array(9)].map((_, i) => (
            <div
              key={`tl-${i}`}
              className="tile"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </div>

        {/* Bottom Right */}
        <div className="absolute -bottom-10 -right-10 grid grid-cols-3 gap-4 opacity-40 md:opacity-100">
          {[...Array(9)].map((_, i) => (
            <div
              key={`br-${i}`}
              className="tile"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </div>
      </div>

      {/* ✨ CONTENT */}
      <div className="text-center px-4 relative z-10">
        <h1 className="text-[2.5rem] md:text-[4rem] font-bold text-foreground mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
          Turn confusing messages into{' '}
          <span className="text-primary italic">clear actions</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-normal">
          TaskMind AI extracts tasks, deadlines, and urgency from any text.
          Not a summarizer. A decision & action clarity tool.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/analyze"
            className="w-full sm:w-auto px-8 py-4 rounded-md font-bold text-lg
              transition-all hover:scale-105 active:scale-95
              bg-primary text-primary-foreground
              flex items-center justify-center gap-3
              shadow-md pulse-animation"
          >
            <Zap className="w-6 h-6" />
            Analyze Your Text Now
          </Link>
        </div>
      </div>

      {/* 🎨 STYLES */}
      <style jsx>{`
        .tile {
          width: 80px;
          height: 80px;
          border-radius: 12px;

          /* ✅ THEME SAFE (CAFE) */
          background: var(--secondary);
          border: 1px solid var(--border);

          /* ✅ SOFT 3D DEPTH */
          box-shadow:
            12px 12px 24px rgba(93, 68, 50, 0.1),
            -8px -8px 16px rgba(255, 255, 255, 0.8);

          animation: wallShift 10s ease-in-out infinite;
        }

        @keyframes wallShift {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          50% {
            transform: translate(-8px, 8px) rotate(2deg);
          }
          100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
        }

        @media (max-width: 768px) {
          .tile {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </section>
  );
}
