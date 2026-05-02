import Link from 'next/link';
import { Send } from 'lucide-react';

export default function QuickAnalyze() {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Analyze</h2>
        <p className="text-gray-600 mb-6">Paste your text below for instant analysis</p>
        
        <Link href="/analyze">
          <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
            <Send className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-gray-500 font-medium">Go to Analyze Page</span>
            <span className="text-gray-400 text-sm">Click to start analyzing</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
