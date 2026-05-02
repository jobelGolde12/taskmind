import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border py-16 w-full mt-12">
      <div className="w-full px-4 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-2 mb-4 group">
              <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center transition-transform group-hover:rotate-12">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground font-sans">TaskMind AI</span>
            </div>
            <p className="text-muted-foreground text-base max-w-sm leading-relaxed">
              Empowering clarity through local, privacy-first AI intelligence. Designed for a cozy, productive experience.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-primary font-bold text-lg font-sans">AI-Powered Action Intelligence</p>
            <p className="text-muted-foreground text-sm font-medium">© 2024 TaskMind AI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
