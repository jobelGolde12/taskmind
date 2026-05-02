import Link from 'next/link';
import { Send } from 'lucide-react';

export default function QuickAnalyze() {
  return (
    <div className="cozy-card overflow-hidden group border-2">
      <div className="p-8 md:p-16 text-center">
        <h2 className="text-[2.5rem] font-bold text-foreground mb-6 font-sans">Ready to clear the clutter?</h2>
        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-lg">Paste any message below for instant analysis. No registration required, 100% private.</p>
        
        <Link href="/analyze">
          <div className="w-full h-48 border-2 border-dashed border-border rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-secondary/20 transition-all duration-300 group/box">
            <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center mb-5 group-hover/box:scale-110 transition-transform">
              <Send className="w-7 h-7 text-primary group-hover/box:text-primary transition-colors" />
            </div>
            <span className="text-foreground font-bold text-xl font-sans">Go to Analyze Page</span>
            <span className="text-muted-foreground text-sm mt-2">Click to start your first analysis</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
