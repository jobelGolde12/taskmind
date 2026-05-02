import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">TaskMind AI</span>
            </div>
            <p className="text-gray-400">Turn messages into actionable tasks.</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-gray-400">AI-Powered Action Intelligence</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
