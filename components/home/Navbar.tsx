import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border w-full">
      <div className="w-full py-3 px-4 md:px-10">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center transition-transform group-hover:rotate-12">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground font-sans">TaskMind AI</span>
          </Link>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex gap-6">
              <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">How it works</a>
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">Features</a>
            </div>
            <Link href="/analyze" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2 rounded-md transition-all text-sm shadow-sm">
              Try Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
