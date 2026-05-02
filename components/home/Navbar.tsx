'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for dynamic styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300
        ${scrolled
          ? 'bg-background/95 backdrop-blur-lg border-border shadow-sm'
          : 'bg-background/80 backdrop-blur-md border-transparent'}
      `}
    >
      <div className="w-full py-3 px-4 md:px-10">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <div
              className="
                w-8 h-8 bg-primary rounded-md flex items-center justify-center
                transition-all duration-300 ease-out
                group-hover:rotate-12 group-hover:scale-110
                group-active:scale-95
              "
            >
              <Zap className="w-5 h-5 text-primary-foreground transition-transform duration-300 group-hover:scale-110" />
            </div>

            <span
              className="
                text-xl font-bold tracking-tight text-foreground font-sans
                transition-colors duration-300
                group-hover:text-primary
              "
            >
              TaskMind
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <div className="hidden md:flex gap-6">
              <a
                href="#how-it-works"
                className="
                  text-muted-foreground text-sm font-medium relative
                  transition-colors duration-300 hover:text-primary
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:bg-primary
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                How it works
              </a>

              <a
                href="#features"
                className="
                  text-muted-foreground text-sm font-medium relative
                  transition-colors duration-300 hover:text-primary
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:bg-primary
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                Features
              </a>
            </div>

            {/* CTA Button */}
            <Link
              href="/analyze"
              className="
                relative overflow-hidden
                bg-primary text-primary-foreground font-semibold text-sm
                px-5 py-2 rounded-md shadow-sm
                transition-all duration-300 ease-out
                hover:bg-primary/90 hover:shadow-md
                active:scale-95
                before:absolute before:inset-0
                before:bg-white/10 before:opacity-0
                before:transition-opacity before:duration-300
                hover:before:opacity-100
              "
            >
              <span className="relative z-10">Try Now</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}