import { useState } from "react";
import { PROGRAMMING_LANGUAGES } from "../../constants";
import {
  Code,
  Sparkles,
  Loader,
  PlayCircle,
  RefreshCw,
  Check,
  Copy,
} from "lucide-react";
import { CodeMetricsPanel } from "./CodeMatrics";

interface InputFormProps {
  language: string;
  setLanguage: (lang: string) => void;
  code: string;
  setCode: (code: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  onClear: () => void;
  onLoadExample: () => void;
  showToastMessage: (message: string) => void;
}

export const InputForm = ({
  language,
  setLanguage,
  code,
  setCode,
  onAnalyze,
  isAnalyzing,
  onClear,
  onLoadExample,
  showToastMessage,
}: InputFormProps) => {
  const [copied, setCopied] = useState(false);
  const selectedLang = PROGRAMMING_LANGUAGES.find(
    (lang) => lang.value === language
  );

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      showToastMessage("Code copied to clipboard!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="group relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl lg:rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

        <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-2xl">
          {/* Header Section - Fully Responsive */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
            {/* Title Section */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-white truncate">
                  Code Input
                </h2>
                <p className="text-sm sm:text-base text-purple-200 truncate">
                  Paste your code for AI analysis
                </p>
              </div>
            </div>

            {/* Action Buttons - Responsive Layout */}
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <button
                onClick={onLoadExample}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm cursor-pointer min-w-0"
              >
                <PlayCircle className="w-4 h-4 inline mr-1 sm:mr-2 flex-shrink-0" />
                <span className="hidden xs:inline">Load Example</span>
                <span className="xs:hidden">Example</span>
              </button>
              <button
                onClick={onClear}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm cursor-pointer min-w-0"
              >
                <RefreshCw className="w-4 h-4 inline mr-1 sm:mr-2 flex-shrink-0" />
                <span className="hidden xs:inline">Clear</span>
                <span className="xs:hidden">Clear</span>
              </button>
            </div>
          </div>

          <div className="space-y-4 lg:space-y-6">
            {/* Language Selection */}
            <div>
              <label className="block text-sm font-semibold text-purple-100 mb-2 lg:mb-3">
                Programming Language
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg lg:rounded-xl text-white focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400/20 transition-all appearance-none cursor-pointer backdrop-blur-sm text-sm sm:text-base"
                >
                  {PROGRAMMING_LANGUAGES.map((lang) => (
                    <option
                      key={lang.value}
                      value={lang.value}
                      className="bg-gray-900 text-white"
                    >
                      {lang.icon} {lang.label}
                    </option>
                  ))}
                </select>
                <div
                  className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r ${
                    selectedLang?.color || "from-gray-400 to-gray-600"
                  }`}
                ></div>
              </div>
            </div>

            {/* Code Input Section */}
            <div>
              <div className="flex items-center justify-between mb-2 lg:mb-3 gap-2">
                <label className="block text-sm font-semibold text-purple-100 truncate">
                  Source Code
                </label>
                <button
                  onClick={handleCopy}
                  disabled={!code}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm disabled:opacity-50 cursor-pointer flex-shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">
                    {copied ? "Copied!" : "Copy"}
                  </span>
                </button>
              </div>

              <div className="relative">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`// Paste your ${
                    selectedLang?.label || "code"
                  } here for analysis...
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}`}
                  className="w-full h-64 sm:h-80 lg:h-96 px-3 sm:px-6 py-3 sm:py-4 bg-gray-900/50 border border-white/10 rounded-lg lg:rounded-xl text-green-400 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400/20 transition-all font-mono text-xs sm:text-sm leading-relaxed resize-none backdrop-blur-sm placeholder-gray-500"
                />

                {/* Terminal Dots - Hide on very small screens */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 hidden xs:flex items-center gap-1 sm:gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Analyze Button - Fully Responsive */}
            <button
              onClick={onAnalyze}
              disabled={isAnalyzing || !code.trim()}
              className="group relative w-full py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg lg:rounded-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-2 sm:gap-3 relative z-10">
                  <Loader className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                  <span className="text-base sm:text-lg">
                    <span className="hidden sm:inline">Analyzing Code...</span>
                    <span className="sm:hidden">Analyzing...</span>
                  </span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 sm:gap-3 relative z-10">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-base sm:text-lg">
                    <span className="hidden sm:inline">Analyze Code</span>
                    <span className="sm:hidden">Analyze</span>
                  </span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <CodeMetricsPanel code={code} />
    </div>
  );
};
