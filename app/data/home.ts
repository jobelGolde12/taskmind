import { Zap, Calendar, AlertTriangle, Highlighter, Lightbulb, Languages, GraduationCap, Briefcase, Users, FileText, Check } from 'lucide-react';

export const processSteps = [
  {
    icon: FileText,
    title: '1. Paste Text',
    description: 'Email, announcement, memo',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    icon: Lightbulb,
    title: '2. AI Analysis',
    description: 'Tasks, deadlines, urgency',
    color: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    icon: Check,
    title: '3. Take Action',
    description: 'Clear next steps',
    color: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
];

export const features = [
  {
    icon: Zap,
    title: 'Action Extractor',
    description: 'Detects verbs like submit, attend, pay, respond and turns them into clear action items.',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    icon: Calendar,
    title: 'Deadline Detector',
    description: 'Converts "by end of week" → actual date with clear visual indicators.',
    color: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    icon: AlertTriangle,
    title: 'Urgency Classifier',
    description: 'Visual color indicators (green/yellow/red) to show how urgent an action is.',
    color: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    icon: Highlighter,
    title: 'Confusion Highlighter',
    description: 'Marks sentences that cause misunderstanding and explains them in simple words.',
    color: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    icon: Lightbulb,
    title: 'One-Sentence Guidance',
    description: '"If you do only one thing, do this." Clear next step recommendation.',
    color: 'bg-amber-100',
    iconColor: 'text-amber-600'
  },
  {
    icon: Languages,
    title: 'Privacy First',
    description: 'All processing happens in your browser. Your data never leaves your device.',
    color: 'bg-indigo-100',
    iconColor: 'text-indigo-600'
  }
];

export const userTypes = [
  {
    icon: GraduationCap,
    title: 'Students',
    items: ['School announcements', 'Thesis instructions', 'Group project messages'],
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
    bgColor: 'from-blue-50',
    borderColor: 'border-blue-100',
    checkColor: 'text-blue-500'
  },
  {
    icon: Briefcase,
    title: 'Workers',
    items: ['Manager emails', 'HR notices', 'Meeting invites'],
    color: 'bg-green-100',
    iconColor: 'text-green-600',
    bgColor: 'from-green-50',
    borderColor: 'border-green-100',
    checkColor: 'text-green-500'
  },
  {
    icon: Users,
    title: 'Everyone',
    items: ['Bills & notices', 'Government letters', 'Long messages'],
    color: 'bg-purple-100',
    iconColor: 'text-purple-600',
    bgColor: 'from-purple-50',
    borderColor: 'border-purple-100',
    checkColor: 'text-purple-500'
  }
];

export const howItWorksSteps = [
  {
    number: 1,
    title: 'Paste Your Text',
    description: 'Copy any email, message, or announcement and paste it into the analyzer',
    color: 'bg-blue-600'
  },
  {
    number: 2,
    title: 'AI Analysis',
    description: 'Our AI extracts tasks, deadlines, decisions, and identifies confusing parts',
    color: 'bg-green-600'
  },
  {
    number: 3,
    title: 'Take Action',
    description: 'Review, prioritize, and act on your extracted tasks with clarity',
    color: 'bg-purple-600'
  }
];
