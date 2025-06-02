import { Terminal, CheckCircle, Cpu, Eye } from "lucide-react";

export const Header = () => (
  <div className="text-center mb-16 relative">
    <div className="inline-flex items-center gap-4 mb-6">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
          <Terminal className="w-8 h-8 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
    <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
      CodeSense AI
    </h1>
    <p className="text-2xl text-purple-100 font-light mb-8">
      Next-Generation Code Analysis & Intelligence Platform
    </p>
    <div className="flex items-center justify-center gap-8 text-purple-200">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-400" />
        <span>AI-Powered</span>
      </div>
      <div className="flex items-center gap-2">
        <Cpu className="w-5 h-5 text-blue-400" />
        <span>Real-time Analysis</span>
      </div>
      <div className="flex items-center gap-2">
        <Eye className="w-5 h-5 text-purple-400" />
        <span>Deep Insights</span>
      </div>
    </div>
  </div>
);
