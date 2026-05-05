import Link from 'next/link';
import { Play, ShieldCheck } from 'lucide-react';

export default function CallToAction() {
  return (
    <div className="bg-primary rounded-md shadow-lg p-12 md:p-20 text-center text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-black/5" />
      <div className="relative z-10">
        <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold mb-6 tracking-tight font-sans leading-tight">Stop guessing what to do next</h2>
        <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto font-normal">Get clear actions from any confusing message in seconds with AI-powered analysis.</p>
        <Link
          href="/analyze"
          className="
            bg-surface
            w-full sm:w-auto
            text-primary
            hover:bg-secondary
            font-bold
            text-xl
            px-12
            py-5
            rounded-md
            transition-all
            hover:scale-105
            active:scale-95
            flex items-center justify-center gap-3
            mx-auto
            shadow-xl
          "
        >
          <Play className="w-6 h-6 fill-current" />
          Start Analyzing Now
        </Link>

        <p className="mt-10 opacity-70 flex items-center justify-center gap-2 text-sm font-medium">
          <ShieldCheck className="w-5 h-5" />
          No login required • Privacy-friendly • Fast Analysis
        </p>
      </div>
    </div>
  );
}
