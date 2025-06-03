import { Terminal, CheckCircle, Cpu, Eye } from "lucide-react";

export const Header = () => (
  <div className="text-center mb-16 relative px-4 sm:px-6">
    <div className="inline-flex items-center gap-4 mb-6">
      <div className="relative">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
          <Terminal className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Title */}
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent leading-tight">
      CodeSense AI
    </h1>

    {/* Subtitle */}
    <p className="text-lg sm:text-xl md:text-2xl text-purple-100 font-light mb-6 sm:mb-8 max-w-3xl mx-auto">
      Next-Generation Code Analysis & Intelligence Platform
    </p>

    {/* Features */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-purple-200 text-sm sm:text-base">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
        <span>AI-Powered</span>
      </div>
      <div className="flex items-center gap-2">
        <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
        <span>Real-time Analysis</span>
      </div>
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
        <span>Deep Insights</span>
      </div>
    </div>
  </div>
);
