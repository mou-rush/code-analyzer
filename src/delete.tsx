import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Terminal,
  CheckCircle,
  Cpu,
  Eye,
  Download,
  Share2,
  History,
  FileText,
  BarChart3,
  Settings,
  Moon,
  Sun,
  Code2,
  Zap,
  TrendingUp,
  Shield,
  Bug,
  Lightbulb,
  Clock,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  Copy,
  Save,
  Trash2,
  Filter,
  RefreshCw,
  AlertCircle,
  Search,
  BookOpen,
  Play,
  GitBranch,
  Database,
  Globe,
  Layers,
  Target,
  Award,
} from "lucide-react";

// Mock data for demonstration
const PROGRAMMING_LANGUAGES = [
  {
    value: "javascript",
    label: "JavaScript",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    value: "typescript",
    label: "TypeScript",
    color: "from-blue-400 to-blue-600",
  },
  { value: "python", label: "Python", color: "from-green-400 to-green-600" },
  { value: "java", label: "Java", color: "from-orange-400 to-orange-600" },
  { value: "cpp", label: "C++", color: "from-blue-600 to-purple-600" },
  { value: "csharp", label: "C#", color: "from-purple-400 to-purple-600" },
  { value: "go", label: "Go", color: "from-cyan-400 to-cyan-600" },
  { value: "rust", label: "Rust", color: "from-orange-600 to-red-600" },
  { value: "php", label: "PHP", color: "from-indigo-400 to-indigo-600" },
  { value: "ruby", label: "Ruby", color: "from-red-400 to-red-600" },
];

const ANALYSIS_HISTORY = [
  {
    id: 1,
    name: "React Component",
    language: "javascript",
    date: "2024-06-01",
    score: 92,
  },
  {
    id: 2,
    name: "API Handler",
    language: "typescript",
    date: "2024-05-30",
    score: 88,
  },
  {
    id: 3,
    name: "Data Processing",
    language: "python",
    date: "2024-05-29",
    score: 95,
  },
];

const SECTION_CONFIG = [
  {
    key: "bugs",
    title: "Bugs & Issues",
    icon: Bug,
    gradient: "from-red-500 to-pink-600",
    bgGradient: "from-red-50 to-pink-50",
    borderColor: "border-red-200",
    severity: "high",
  },
  {
    key: "security",
    title: "Security Analysis",
    icon: Shield,
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
    borderColor: "border-orange-200",
    severity: "high",
  },
  {
    key: "performance",
    title: "Performance Optimization",
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    severity: "medium",
  },
  {
    key: "improvements",
    title: "Code Improvements",
    icon: Code2,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    severity: "medium",
  },
  {
    key: "learning",
    title: "Learning Insights",
    icon: Lightbulb,
    gradient: "from-purple-500 to-indigo-600",
    bgGradient: "from-purple-50 to-indigo-50",
    borderColor: "border-purple-200",
    severity: "low",
  },
];

// Enhanced Header Component
const Header = ({ darkMode, toggleDarkMode }) => (
  <div className="text-center mb-16 relative">
    <div className="absolute top-4 right-4">
      <button
        onClick={toggleDarkMode}
        className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-blue-400" />
        )}
      </button>
    </div>

    <div className="inline-flex items-center gap-4 mb-6">
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
          <Terminal className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>

    <h1 className="text-8xl font-black mb-4 bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
      CodeSense AI
    </h1>
    <p className="text-2xl text-purple-100 font-light mb-8">
      Enterprise-Grade Code Analysis & Intelligence Platform
    </p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
        <CheckCircle className="w-6 h-6 text-green-400" />
        <span className="text-purple-200 text-sm">AI-Powered</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
        <Zap className="w-6 h-6 text-yellow-400" />
        <span className="text-purple-200 text-sm">Real-time</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
        <Eye className="w-6 h-6 text-blue-400" />
        <span className="text-purple-200 text-sm">Deep Insights</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
        <Award className="w-6 h-6 text-purple-400" />
        <span className="text-purple-200 text-sm">Professional</span>
      </div>
    </div>
  </div>
);

// Enhanced Statistics Dashboard
const StatsDashboard = ({ results, analysisHistory }) => {
  const calculateOverallScore = (results) => {
    if (!results) return 0;
    const sections = Object.values(results).filter(Boolean);
    return Math.round(85 + Math.random() * 15); // Mock calculation
  };

  const score = calculateOverallScore(results);
  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-500";
    if (score >= 75) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
        </div>
        <h3 className="font-semibold text-gray-800">Code Quality Score</h3>
        <p className="text-sm text-gray-600">Overall assessment</p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <Shield className="w-8 h-8 text-green-600" />
          <span className="text-3xl font-bold text-green-500">A+</span>
        </div>
        <h3 className="font-semibold text-gray-800">Security Grade</h3>
        <p className="text-sm text-gray-600">No vulnerabilities</p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <TrendingUp className="w-8 h-8 text-purple-600" />
          <span className="text-3xl font-bold text-purple-500">
            {analysisHistory.length}
          </span>
        </div>
        <h3 className="font-semibold text-gray-800">Analyses Run</h3>
        <p className="text-sm text-gray-600">This session</p>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <Clock className="w-8 h-8 text-orange-600" />
          <span className="text-3xl font-bold text-orange-500">2.3s</span>
        </div>
        <h3 className="font-semibold text-gray-800">Analysis Time</h3>
        <p className="text-sm text-gray-600">Average response</p>
      </div>
    </div>
  );
};

// Code Comparison Feature
const CodeComparison = ({ isOpen, onClose }) => {
  const [beforeCode, setBeforeCode] = useState("");
  const [afterCode, setAfterCode] = useState("");

  return isOpen ? (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Code Comparison</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Original Code</h3>
            <textarea
              value={beforeCode}
              onChange={(e) => setBeforeCode(e.target.value)}
              className="w-full h-64 p-4 border border-gray-300 rounded-xl font-mono text-sm"
              placeholder="Paste original code here..."
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Improved Code</h3>
            <textarea
              value={afterCode}
              onChange={(e) => setAfterCode(e.target.value)}
              className="w-full h-64 p-4 border border-gray-300 rounded-xl font-mono text-sm"
              placeholder="Paste improved code here..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            Compare
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

// Analysis History Sidebar
const HistorySidebar = ({ isOpen, onClose, history, onSelectHistory }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-40 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Analysis History</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4 h-full overflow-auto">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectHistory(item)}
            className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <span
                className={`text-sm font-bold ${
                  item.score >= 90
                    ? "text-green-500"
                    : item.score >= 75
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {item.score}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="capitalize">{item.language}</span>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Input Form with Live Syntax Highlighting
const EnhancedInputForm = ({
  language,
  setLanguage,
  code,
  setCode,
  onAnalyze,
  isAnalyzing,
  onCompare,
  onShowHistory,
  onSaveCode,
  savedCodes,
}) => {
  const [lineCount, setLineCount] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const lines = code.split("\n").length;
    setLineCount(lines);
  }, [code]);

  const selectedLang = PROGRAMMING_LANGUAGES.find(
    (lang) => lang.value === language
  );

  const handleKeyDown = (e) => {
    // Auto-indent on Enter
    if (e.key === "Enter") {
      const textarea = e.target;
      const lines = textarea.value
        .substring(0, textarea.selectionStart)
        .split("\n");
      const currentLine = lines[lines.length - 1];
      const indent = currentLine.match(/^\s*/)[0];

      setTimeout(() => {
        const start = textarea.selectionStart;
        const newValue =
          textarea.value.substring(0, start) +
          indent +
          textarea.value.substring(start);
        setCode(newValue);
        textarea.setSelectionRange(
          start + indent.length,
          start + indent.length
        );
      }, 0);
    }
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Smart Code Editor
              </h2>
              <p className="text-purple-200">Enhanced with AI assistance</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onCompare}
              className="p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all"
              title="Compare Code"
            >
              <GitBranch className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={onShowHistory}
              className="p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all"
              title="View History"
            >
              <History className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={onSaveCode}
              className="p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all"
              title="Save Code"
            >
              <Save className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-purple-100 mb-3">
                Programming Language
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400/20 transition-all appearance-none cursor-pointer backdrop-blur-sm"
                >
                  {PROGRAMMING_LANGUAGES.map((lang) => (
                    <option
                      key={lang.value}
                      value={lang.value}
                      className="bg-gray-900 text-white"
                    >
                      {lang.label}
                    </option>
                  ))}
                </select>
                <div
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r ${
                    selectedLang?.color || "from-gray-400 to-gray-600"
                  }`}
                ></div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-purple-100 mb-3">
                Saved Templates
              </label>
              <select className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400/20 transition-all appearance-none cursor-pointer backdrop-blur-sm">
                <option value="">Select a template...</option>
                <option value="react-component">React Component</option>
                <option value="api-handler">API Handler</option>
                <option value="data-structure">Data Structure</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-purple-100">
                Source Code
              </label>
              <div className="flex items-center gap-4 text-sm text-purple-200">
                <span>Lines: {lineCount}</span>
                <span>Characters: {code.length}</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-4 flex flex-col text-xs text-gray-500 font-mono leading-relaxed select-none pointer-events-none">
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i + 1} className="h-6 flex items-center">
                    {i + 1}
                  </div>
                ))}
              </div>

              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`// Paste your ${
                  selectedLang?.label || "code"
                } here for advanced AI analysis...
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

// AI will analyze: performance, security, bugs, improvements, and learning insights`}
                className="w-full h-96 pl-16 pr-6 py-4 bg-gray-900/50 border border-white/10 rounded-xl text-green-400 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400/20 transition-all font-mono text-sm leading-relaxed resize-none backdrop-blur-sm placeholder-gray-500"
              />

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>

              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setCode("")}
                  className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all"
                  title="Clear Code"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(code)}
                  className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all"
                  title="Copy Code"
                >
                  <Copy className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={onAnalyze}
              disabled={isAnalyzing || !code.trim()}
              className="group relative py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-3 relative z-10">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  <span className="text-lg">Analyzing...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3 relative z-10">
                  <Zap className="w-6 h-6" />
                  <span className="text-lg">Analyze Code</span>
                </span>
              )}
            </button>

            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-3">
                <Lightbulb className="w-6 h-6" />
                <span className="text-lg">Get Suggestions</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Results Panel with Interactive Features
const EnhancedResultsPanel = ({ isAnalyzing, error, results, onExport }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [filterLevel, setFilterLevel] = useState("all");

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredSections = SECTION_CONFIG.filter((section) => {
    if (filterLevel === "all") return true;
    return section.severity === filterLevel;
  });

  const formatText = (text) => {
    if (!text) return "";
    return text
      .replace(
        /```(\w+)?\n?([\s\S]*?)```/g,
        '<pre class="code-block"><code class="language-$1">$2</code></pre>'
      )
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-gray-900">$1</strong>'
      )
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\n/g, "<br>")
      .replace(/^\*\s+/gm, '<span class="bullet-point">•</span> ')
      .replace(
        /^\d+\.\s+/gm,
        (match) => `<span class="number-point">${match.trim()}</span> `
      );
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl min-h-[600px]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Analysis Dashboard
              </h2>
              <p className="text-blue-200">Comprehensive code insights</p>
            </div>
          </div>

          {results && (
            <div className="flex gap-2">
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm"
              >
                <option value="all" className="bg-gray-900">
                  All Issues
                </option>
                <option value="high" className="bg-gray-900">
                  High Priority
                </option>
                <option value="medium" className="bg-gray-900">
                  Medium Priority
                </option>
                <option value="low" className="bg-gray-900">
                  Low Priority
                </option>
              </select>

              <button
                onClick={onExport}
                className="p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all"
                title="Export Report"
              >
                <Download className="w-5 h-5 text-white" />
              </button>

              <button
                className="p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all"
                title="Share Results"
              >
                <Share2 className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </div>

        {!isAnalyzing && !error && !results && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-8 animate-pulse">
              <Target className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready for Deep Analysis
            </h3>
            <p className="text-purple-200 text-lg max-w-md mb-6">
              Our advanced AI will examine your code across multiple dimensions
              for comprehensive insights
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-purple-300">
              <div className="flex items-center gap-2">
                <Bug className="w-4 h-4" />
                <span>Bug Detection</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Security Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Performance Optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                <span>Learning Insights</span>
              </div>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-blue-600 rounded-full animate-spin animate-reverse"></div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              AI Analysis in Progress
            </h3>
            <p className="text-purple-200 mb-6">
              Processing your code with advanced algorithms...
            </p>
            <div className="flex items-center gap-4 text-sm text-purple-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Scanning for bugs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-200"></div>
                <span>Checking security</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse animation-delay-400"></div>
                <span>Analyzing performance</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-6 py-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <div>
                <h4 className="font-semibold">Analysis Error</h4>
                <p className="text-sm opacity-90">{error}</p>
              </div>
            </div>
          </div>
        )}

        {results && (
          <div className="space-y-6">
            {filteredSections.map(
              ({
                key,
                title,
                icon: Icon,
                gradient,
                bgGradient,
                borderColor,
                severity,
              }) => {
                const content = results[key];
                if (!content?.trim()) return null;

                const isExpanded = expandedSections[key];
                const preview =
                  content.substring(0, 150) +
                  (content.length > 150 ? "..." : "");

                return (
                  <div key={key} className="group/card relative">
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-20 group-hover/card:opacity-40 transition duration-500`}
                    ></div>

                    <div
                      className={`relative bg-gradient-to-br ${bgGradient} backdrop-blur-sm rounded-2xl p-6 border ${borderColor} shadow-lg`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center shadow-lg`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              {title}
                            </h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                severity === "high"
                                  ? "bg-red-100 text-red-700"
                                  : severity === "medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {severity.toUpperCase()} PRIORITY
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(content)
                            }
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                            title="Copy section"
                          >
                            <Copy className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => toggleSection(key)}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isExpanded ? "max-h-none" : "max-h-24"
                        }`}
                      >
                        <div
                          className="prose prose-sm max-w-none text-gray-700 leading-relaxed analysis-content"
                          dangerouslySetInnerHTML={{
                            __html: formatText(isExpanded ? content : preview),
                          }}
                        />
                      </div>

                      {content.length > 150 && (
                        <button
                          onClick={() => toggleSection(key)}
                          className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {isExpanded ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Floating Particles Background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 animate-float`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 20}s`,
          }}
        />
      ))}
    </div>
  );
};

// Main App Component
const CodeSenseApp = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [showComparison, setShowComparison] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState(ANALYSIS_HISTORY);
  const [savedCodes, setSavedCodes] = useState([]);

  // Mock analysis function
  const mockAnalyzeCode = async (language, code) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          bugs: `Found 2 potential issues in your ${language} code:
          
**Memory Leak Risk**: The recursive fibonacci function may cause stack overflow for large values of n.

**Inefficient Algorithm**: The current implementation has O(2^n) time complexity.

**Recommendations**:
- Add input validation for negative numbers
- Consider using memoization or iterative approach
- Implement proper error handling`,

          security: `Security analysis completed for ${language} code:
          
**Low Risk**: No immediate security vulnerabilities detected.

**Best Practices**:
- Input validation should be added
- Consider rate limiting for API endpoints
- Sanitize user inputs if this becomes part of a web application`,

          performance: `Performance analysis reveals optimization opportunities:
          
**Critical**: Exponential time complexity O(2^n) - extremely inefficient for large inputs.

**Optimizations**:
- Use dynamic programming: O(n) time, O(n) space
- Or iterative approach: O(n) time, O(1) space
- Memoization can reduce redundant calculations by 90%+

**Benchmark**: Current implementation takes ~2.5s for n=40, optimized version takes ~0.001s`,

          improvements: `Code quality improvements for better maintainability:
          
**Structure**: Function is well-named and follows clean code principles.

**Enhancements**:
- Add JSDoc comments for better documentation
- Include parameter type checking
- Consider creating a FibonacciCalculator class for complex scenarios
- Add unit tests for edge cases

**Modern JavaScript**: Consider using BigInt for large numbers`,

          learning: `Educational insights and learning opportunities:
          
**Algorithm Concepts**:
- This demonstrates the classic trade-off between simplicity and efficiency
- Great example for understanding recursion vs iteration
- Perfect case study for dynamic programming concepts

**Next Steps**:
- Study memoization patterns
- Explore tail recursion optimization
- Learn about mathematical approaches (Binet's formula)
- Practice with similar problems: factorial, Tower of Hanoi`,
        });
      }, 2000);
    });
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError("Please paste some code to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    try {
      const analysis = await mockAnalyzeCode(language, code);
      setResults(analysis);

      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        name: `Analysis ${analysisHistory.length + 1}`,
        language,
        date: new Date().toISOString().split("T")[0],
        score: 85 + Math.floor(Math.random() * 15),
      };
      setAnalysisHistory((prev) => [newHistoryItem, ...prev]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExport = () => {
    if (!results) return;

    const reportData = {
      timestamp: new Date().toISOString(),
      language,
      results,
      codeLength: code.length,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveCode = () => {
    if (!code.trim()) return;

    const savedCode = {
      id: Date.now(),
      name: `Code ${savedCodes.length + 1}`,
      language,
      code,
      date: new Date().toISOString(),
    };

    setSavedCodes((prev) => [savedCode, ...prev]);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-reverse { animation-direction: reverse; }

        .analysis-content .code-block {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          border: 1px solid #475569;
          border-radius: 12px;
          padding: 16px;
          margin: 16px 0;
          overflow-x: auto;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .analysis-content .code-block code {
          color: #e2e8f0;
          font-family: 'JetBrains Mono', 'Fira Code', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;
          font-size: 14px;
          line-height: 1.6;
          white-space: pre;
        }

        .analysis-content .inline-code {
          background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
          color: #f59e0b;
          padding: 2px 6px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          border: 1px solid #6b7280;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .analysis-content .bullet-point {
          color: #8b5cf6;
          font-weight: bold;
          margin-right: 8px;
        }

        .analysis-content .number-point {
          color: #06b6d4;
          font-weight: bold;
          margin-right: 8px;
        }
      `}</style>

      <div
        className={`min-h-screen transition-all duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
            : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
        } relative overflow-hidden`}
      >
        <FloatingParticles />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {results && (
            <StatsDashboard
              results={results}
              analysisHistory={analysisHistory}
            />
          )}

          <div className="grid lg:grid-cols-2 gap-12">
            <EnhancedInputForm
              language={language}
              setLanguage={setLanguage}
              code={code}
              setCode={setCode}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              onCompare={() => setShowComparison(true)}
              onShowHistory={() => setShowHistory(true)}
              onSaveCode={handleSaveCode}
              savedCodes={savedCodes}
            />

            <EnhancedResultsPanel
              isAnalyzing={isAnalyzing}
              error={error}
              results={results}
              onExport={handleExport}
            />
          </div>
        </div>

        <CodeComparison
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
        />

        <HistorySidebar
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          history={analysisHistory}
          onSelectHistory={(item) => {
            console.log("Selected history item:", item);
            setShowHistory(false);
          }}
        />
      </div>
    </>
  );
};

export default CodeSenseApp;
