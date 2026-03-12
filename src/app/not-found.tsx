"use client"
import Link from "next/link";
import { Home, ArrowLeft, Coffee } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white flex items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center">

        <div className="relative mb-8">
          <div className="text-[180px] font-bold text-orange-600 leading-none opacity-20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center animate-bounce">
                <Coffee className="w-16 h-16 text-orange-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold animate-pulse">
                ?
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back on track!
        </p>


        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}