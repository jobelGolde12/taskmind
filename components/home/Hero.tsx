import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Hero() {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Turn confusing messages into <span className="text-blue-600">clear actions</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        TaskMind AI extracts tasks, deadlines, and urgency from any text. 
        Not a summarizer. A decision & action clarity tool.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
        <Link href="/analyze" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-xl pulse-animation transition flex items-center justify-center gap-3">
          <Zap className="w-6 h-6" />
          Analyze Your Text Now
        </Link>
      </div>
    </div>
  );
}
