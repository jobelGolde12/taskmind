'use client';

import { motion } from 'framer-motion';
import { Sparkles, Upload, History, LayoutDashboard, Moon, Sun, Menu, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { Providers } from './providers';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <LayoutUI>{children}</LayoutUI>
    </Providers>
  );
}

function LayoutUI({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { darkMode, toggleDarkMode, sidebarOpen, toggleSidebar } = useAppStore();

  const navItems = [
    { href: '/analyze', icon: Sparkles, label: 'Analyze' },
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/upload', icon: Upload, label: 'Upload' },
    { href: '/history', icon: History, label: 'History' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isHomePage = pathname === '/';

  return (
    <div className={cn("flex min-h-screen w-full bg-background text-foreground transition-colors duration-300 font-sans")}>
      {/* SIDEBAR (FIXED LEFT) */}
      {!isHomePage && (
        <aside
          className={cn(
            'fixed top-0 left-0 h-screen w-64 border-r border-border bg-white transition-transform duration-300 z-40',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
        >
          <div className="flex h-full flex-col">
            {/* LOGO */}
            <div className="flex items-center gap-3 h-20 px-6 border-b border-border">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary shadow-sm">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">TaskMind</span>
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 space-y-1.5 p-4 mt-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-4 py-3 text-sm font-bold transition-all duration-200',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-secondary hover:text-primary'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* FOOTER */}
            <div className="border-t border-border p-6 bg-secondary/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-success" />
                <p className="text-xs font-bold text-foreground">Local Processing</p>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
                Your data stays in your browser. 100% private.
              </p>
            </div>
          </div>
        </aside>
      )}

      {/* RIGHT SIDE (HEADER + CONTENT) */}
      <div
        className={cn(
          'flex flex-col flex-1 min-w-0',
          !isHomePage && 'lg:ml-64'
        )}
      >
        {/* HEADER */}
        {!isHomePage && (
          <header className="sticky top-0 z-30 h-20 flex items-center justify-between px-6 md:px-10 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="rounded-md p-2.5 text-muted-foreground hover:bg-secondary hover:text-primary lg:hidden transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-bold tracking-tight text-foreground capitalize font-sans">
                {pathname.slice(1) || 'TaskMind'}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/settings"
                className="rounded-md p-2.5 text-muted-foreground hover:bg-secondary hover:text-primary transition-all"
              >
                <Settings className="h-5 w-5" />
              </Link>

              <button
                onClick={toggleDarkMode}
                className="rounded-md p-2.5 text-muted-foreground hover:bg-secondary hover:text-primary transition-all"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </header>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1">
          <div className={cn("w-full h-full", !isHomePage && "max-w-7xl mx-auto p-4 md:p-8 lg:p-10")}>
            {isHomePage ? (
              <>{children}</>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full"
              >
                {children}
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
