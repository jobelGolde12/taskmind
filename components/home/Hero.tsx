import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Hero() {
  return (
    <div className="text-center py-12 md:py-20">
      <h1 className="text-[2.5rem] md:text-[4rem] font-bold text-foreground mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
        Turn confusing messages into <span className="text-primary italic">clear actions</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground w-full mb-10 max-w-2xl mx-auto font-normal">
        TaskMind AI extracts tasks, deadlines, and urgency from any text. 
        Not a summarizer. A decision & action clarity tool.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link href="/analyze" className="w-full sm:w-auto px-8 py-4 rounded-md font-bold text-lg transition-all hover:scale-105 active:scale-95 bg-primary text-primary-foreground flex items-center justify-center gap-3 shadow-md pulse-animation">
          <Zap className="w-6 h-6" />
          Analyze Your Text Now
        </Link>
      </div>
    </div>
  );
}
