'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, ArrowRight, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 px-6 py-16 text-center sm:px-12 sm:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Action Intelligence</span>
          </div>
          
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Turn Messages into
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {' '}Actionable Tasks
            </span>
          </h1>
          
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            TaskMind AI instantly extracts tasks, deadlines, and decisions from your emails, 
            messages, and announcements. Privacy-first, browser-based AI.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/analyze">
              <Button size="lg" className="group">
                Start Analyzing
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/upload">
              <Button size="lg" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
      </section>

      {/* Features Grid */}
      <section>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">Powerful Features</h2>
          <p className="mt-2 text-muted-foreground">Everything you need to stay on top of your tasks</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Zap}
            title="Instant Analysis"
            description="Get actionable tasks from any text in seconds using advanced AI"
          />
          <FeatureCard
            icon={Shield}
            title="Privacy First"
            description="All processing happens in your browser. Your data never leaves your device"
          />
          <FeatureCard
            icon={CheckCircle2}
            title="Smart Extraction"
            description="Automatically detects tasks, deadlines, decisions, and unclear items"
          />
          <FeatureCard
            icon={FileText}
            title="Multiple Formats"
            description="Paste text or upload files. Export results to JSON, Markdown, or CSV"
          />
          <FeatureCard
            icon={Sparkles}
            title="Urgency Scoring"
            description="AI-powered priority scoring helps you focus on what matters most"
          />
          <FeatureCard
            icon={ArrowRight}
            title="Next Steps"
            description="Get clear, actionable next steps from confusing or vague messages"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <p className="mt-2 text-muted-foreground">Three simple steps to action clarity</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <StepCard
            number="1"
            title="Input Your Text"
            description="Paste an email, message, or announcement. Or upload a file."
          />
          <StepCard
            number="2"
            title="AI Analysis"
            description="Our AI extracts tasks, deadlines, decisions, and identifies confusion."
          />
          <StepCard
            number="3"
            title="Take Action"
            description="Review, prioritize, and act on your extracted tasks with clarity."
          />
        </div>
      </section>

      {/* Use Cases */}
      <section>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">Perfect For</h2>
          <p className="mt-2 text-muted-foreground">Designed for everyone who deals with messages</p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <UseCaseCard
            title="Students"
            description="School announcements, assignments, project deadlines"
          />
          <UseCaseCard
            title="Professionals"
            description="Work emails, meeting notes, project updates"
          />
          <UseCaseCard
            title="Teams"
            description="Team communications, action items, decisions"
          />
          <UseCaseCard
            title="Everyone"
            description="Bills, government notices, important documents"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 text-center">
        <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
        <p className="mx-auto mb-6 mt-2 max-w-xl text-muted-foreground">
          Start analyzing your messages and never miss an action item again.
        </p>
        <Link href="/analyze">
          <Button size="lg">
            Try TaskMind AI Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/[0.07]"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="relative">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold">
        {number}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

interface UseCaseCardProps {
  title: string;
  description: string;
}

function UseCaseCard({ title, description }: UseCaseCardProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
