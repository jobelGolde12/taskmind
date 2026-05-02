import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-9 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-gray-800">TaskMind AI</span>
          </div>
          <div className="flex space-x-4">
            <div className="hidden md:flex gap-3 mt-2">
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium">How it works</a>
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium">Features</a>
            </div>
            <Link href="/analyze" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition">
              Try Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
