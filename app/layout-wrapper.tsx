'use client';

import { motion } from 'framer-motion';
import { Sparkles, Upload, History, LayoutDashboard, Moon, Sun, Menu, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { Providers } from './providers';

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <LayoutUI>{children}</LayoutUI>
    </Providers>
  );
}

function LayoutUI({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { darkMode, toggleDarkMode, sidebarOpen, toggleSidebar } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/analyze', icon: Sparkles, label: 'Analyze' },
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/upload', icon: Upload, label: 'Upload' },
    { href: '/history', icon: History, label: 'History' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-lg">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleSidebar()}
              className="rounded-lg p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">TaskMind AI</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/settings"
              className="rounded-lg p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
            </Link>
            <button
              onClick={toggleDarkMode}
              className="rounded-lg p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/10 bg-background/50 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden'
          )}
        >
          <div className="flex h-full flex-col pt-16 lg:pt-0">
            <nav className="flex-1 space-y-1 p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-white/10 text-foreground'
                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Sidebar footer */}
            <div className="border-t border-white/10 p-4">
              <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-3">
                <p className="text-xs font-medium text-foreground">Privacy First</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  All processing happens in your browser
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}
