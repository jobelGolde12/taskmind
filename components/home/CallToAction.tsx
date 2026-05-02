import Link from 'next/link';
import { Play, ShieldCheck } from 'lucide-react';

export default function CallToAction() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-10 text-center text-white">
      <h2 className="text-3xl font-bold mb-4">Stop guessing what to do next</h2>
      <p className="text-xl mb-8 opacity-90">Get clear actions from any confusing message in seconds</p>
      <Link
        href="/analyze"
        className="
          bg-white
          w-full sm:w-auto lg:w-[30%]
          text-center
          text-blue-600
          hover:bg-gray-100
          font-bold
          text-base sm:text-lg
          px-6 sm:px-10
          py-3 sm:py-4
          rounded-xl
          transition
          flex items-center justify-center gap-3
          mx-auto
        "
      >
        <Play className="w-5 h-5 sm:w-6 sm:h-6" />
        Start Analyzing Now
      </Link>

      <p className="mt-6 opacity-80 flex items-center justify-center gap-2">
        <ShieldCheck className="w-5 h-5" />
        No login required • Privacy-friendly • Works on mobile
      </p>
    </div>
  );
}
