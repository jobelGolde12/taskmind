'use client';

import { Zap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border py-16 w-full mt-12 overflow-hidden">
      <div className="w-full px-4 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-12"
        >

          {/* LEFT */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm">
            <div className="flex items-center space-x-3 mb-4 group cursor-pointer">
              
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md"
              >
                <Zap className="w-6 h-6 text-primary-foreground" />
              </motion.div>

              <span className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                TaskMind
              </span>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering clarity through fast, privacy-conscious AI intelligence.
              Designed for a cozy and productive experience.
            </p>
          </div>

          {/* CENTER */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-primary font-semibold text-base">
              AI-Powered Action Intelligence
            </p>

            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/jobelGolde12/taskmind.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {/* GitHub SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
              >
                <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 008 10.95c.58.1.79-.25.79-.55v-2.1c-3.25.7-3.94-1.56-3.94-1.56-.53-1.34-1.3-1.7-1.3-1.7-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.2 1.8 1.2 1.05 1.8 2.75 1.28 3.42.98.1-.76.4-1.28.73-1.58-2.6-.3-5.33-1.3-5.33-5.8 0-1.28.45-2.33 1.2-3.15-.12-.3-.52-1.5.12-3.12 0 0 .98-.3 3.2 1.2a11.1 11.1 0 015.82 0c2.2-1.5 3.18-1.2 3.18-1.2.65 1.62.25 2.82.13 3.12.75.82 1.2 1.87 1.2 3.15 0 4.52-2.74 5.5-5.35 5.8.42.36.8 1.08.8 2.18v3.24c0 .3.2.66.8.55A11.5 11.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/>
              </svg>

              <span className="text-sm">GitHub</span>
            </motion.a>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              Made with
              <motion.span whileHover={{ scale: 1.2 }} className="text-red-500">
                <Heart className="w-4 h-4 fill-red-500" />
              </motion.span>
              by TaskMind
            </p>

            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} TaskMind AI. All rights reserved.
            </p>
          </div>

        </motion.div>
      </div>
    </footer>
  );
}
