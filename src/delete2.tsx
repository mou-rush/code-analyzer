import { useState, useEffect, useRef } from "react";
import {
  Terminal,
  CheckCircle,
  Cpu,
  Eye,
  Code,
  Sparkles,
  Loader,
  XCircle,
  Download,
  Share2,
  History,
  BookOpen,
  Zap,
  Shield,
  TrendingUp,
  FileText,
  Clock,
  Star,
  Copy,
  Check,
  BarChart3,
  PieChart,
  Settings,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  RefreshCw,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  PlayCircle,
  StopCircle,
} from "lucide-react";

// Types
interface IAnalysisSection {
  bugs?: string;
  security?: string;
  performance?: string;
  improvements?: string;
  learning?: string;
}

interface AnalysisHistory {
  id: string;
  timestamp: Date;
  language: string;
  code: string;
  results: IAnalysisSection;
  score: number;
}

interface CodeMetrics {
  linesOfCode: number;
  complexity: number;
  maintainability: number;
  readability: number;
}

// Constants
const PROGRAMMING_LANGUAGES = [
  {
    value: "javascript",
    label: "JavaScript",
    icon: "🟨",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    value: "typescript",
    label: "TypeScript",
    icon: "🔷",
    color: "from-blue-400 to-blue-600",
  },
  {
    value: "python",
    label: "Python",
    icon: "🐍",
    color: "from-green-400 to-blue-500",
  },
  {
    value: "react",
    label: "React",
    icon: "⚛️",
    color: "from-cyan-400 to-blue-500",
  },
  {
    value: "java",
    label: "Java",
    icon: "☕",
    color: "from-orange-400 to-red-500",
  },
  {
    value: "cpp",
    label: "C++",
    icon: "⚡",
    color: "from-blue-500 to-purple-600",
  },
  {
    value: "csharp",
    label: "C#",
    icon: "🔷",
    color: "from-purple-400 to-pink-500",
  },
  {
    value: "php",
    label: "PHP",
    icon: "🐘",
    color: "from-purple-600 to-blue-600",
  },
  {
    value: "ruby",
    label: "Ruby",
    icon: "💎",
    color: "from-red-400 to-pink-500",
  },
  { value: "go", label: "Go", icon: "🔵", color: "from-cyan-400 to-blue-500" },
];

const SECTION_CONFIG = [
  {
    key: "bugs" as keyof IAnalysisSection,
    title: "Bugs & Issues",
    icon: XCircle,
    gradient: "from-red-500 to-pink-600",
    bgGradient: "from-red-50 to-pink-50",
    borderColor: "border-red-200",
  },
  {
    key: "security" as keyof IAnalysisSection,
    title: "Security Analysis",
    icon: Shield,
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
    borderColor: "border-orange-200",
  },
  {
    key: "performance" as keyof IAnalysisSection,
    title: "Performance Optimization",
    icon: TrendingUp,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
  },
  {
    key: "improvements" as keyof IAnalysisSection,
    title: "Code Improvements",
    icon: Zap,
    gradient: "from-blue-500 to-purple-600",
    bgGradient: "from-blue-50 to-purple-50",
    borderColor: "border-blue-200",
  },
  {
    key: "learning" as keyof IAnalysisSection,
    title: "Learning Insights",
    icon: BookOpen,
    gradient: "from-purple-500 to-indigo-600",
    bgGradient: "from-purple-50 to-indigo-50",
    borderColor: "border-purple-200",
  },
];

// Mock analysis function (replace with your actual API call)
const analyzeCode = async (
  language: string,
  code: string
): Promise<IAnalysisSection> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    bugs: `Found 2 potential issues in your ${language} code:\n\n• **Variable Declaration**: The variable 'result' might be undefined in certain conditions\n• **Error Handling**: Missing try-catch blocks for async operations\n\n\`\`\`${language}\n// Improved version\ntry {\n  const result = await someAsyncOperation();\n  return result;\n} catch (error) {\n  console.error('Operation failed:', error);\n}\n\`\`\``,
    security: `Security analysis complete. Found 1 concern:\n\n• **Input Validation**: User input should be sanitized before processing\n• **Authentication**: Consider implementing proper authentication mechanisms\n\nOverall security score: **7/10**`,
    performance: `Performance optimization suggestions:\n\n• **Algorithm Complexity**: Current O(n²) complexity can be improved to O(n log n)\n• **Memory Usage**: Consider using more efficient data structures\n• **Caching**: Implement memoization for repeated calculations\n\nEstimated performance improvement: **40%**`,
    improvements: `Code quality improvements:\n\n• **Naming Conventions**: Use more descriptive variable names\n• **Function Decomposition**: Break down large functions into smaller, reusable components\n• **Documentation**: Add JSDoc comments for better maintainability\n\n\`\`\`${language}\n// Better naming\nconst calculateUserScore = (userData) => {\n  // Implementation\n};\n\`\`\``,
    learning: `Key learning opportunities:\n\n• **Design Patterns**: Consider implementing the Observer pattern for better event handling\n• **Best Practices**: Follow ${language} coding standards and conventions\n• **Testing**: Implement unit tests to ensure code reliability\n\n**Pro Tip**: Use linting tools like ESLint to catch issues early in development.`,
  };
};

// Utility functions
const calculateCodeMetrics = (code: string): CodeMetrics => {
  const lines = code.split("\n").filter((line) => line.trim().length > 0);
  const linesOfCode = lines.length;

  // Simple heuristics for demonstration
  const complexity = Math.min(Math.max(Math.floor(linesOfCode / 10), 1), 10);
  const maintainability = Math.max(10 - Math.floor(linesOfCode / 20), 1);
  const readability = Math.max(
    10 - Math.floor(code.split(/[{}();]/).length / linesOfCode),
    1
  );

  return { linesOfCode, complexity, maintainability, readability };
};

const calculateOverallScore = (results: IAnalysisSection): number => {
  let score = 100;

  // Deduct points based on issues found
  if (results.bugs && !results.bugs.toLowerCase().includes("no issues"))
    score -= 20;
  if (results.security && !results.security.toLowerCase().includes("no issues"))
    score -= 15;
  if (
    results.performance &&
    results.performance.toLowerCase().includes("can be improved")
  )
    score -= 10;

  return Math.max(score, 0);
};

const exportResults = (
  results: IAnalysisSection,
  language: string,
  code: string
) => {
  const report = `# Code Analysis Report
Generated on: ${new Date().toLocaleString()}
Language: ${language}

## Original Code
\`\`\`${language}
${code}
\`\`\`

## Analysis Results

### Bugs & Issues
${results.bugs || "No issues found"}

### Security Analysis
${results.security || "No security concerns"}

### Performance Optimization
${results.performance || "No performance issues"}

### Code Improvements
${results.improvements || "Code looks good"}

### Learning Insights
${results.learning || "No additional insights"}
`;

  const blob = new Blob([report], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `code-analysis-${Date.now()}.md`;
  a.click();
  URL.revokeObjectURL(url);
};

// Components
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 animate-pulse`}
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

const Header = ({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => (
  <div className="text-center mb-16 relative">
    <div className="absolute top-0 right-0">
      <button
        onClick={toggleDarkMode}
        className="p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>

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

const CodeMetricsPanel = ({ code }: { code: string }) => {
  const metrics = code ? calculateCodeMetrics(code) : null;

  if (!metrics) return null;

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        Code Metrics
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {metrics.linesOfCode}
          </div>
          <div className="text-sm text-purple-200">Lines of Code</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {metrics.complexity}/10
          </div>
          <div className="text-sm text-purple-200">Complexity</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {metrics.maintainability}/10
          </div>
          <div className="text-sm text-purple-200">Maintainability</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {metrics.readability}/10
          </div>
          <div className="text-sm text-purple-200">Readability</div>
        </div>
      </div>
    </div>
  );
};

const HistoryPanel = ({
  history,
  onSelectHistory,
}: {
  history: AnalysisHistory[];
  onSelectHistory: (item: AnalysisHistory) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (history.length === 0) return null;

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <History className="w-5 h-5" />
          Analysis History ({history.length})
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          {isExpanded ? (
            <Minimize2 className="w-4 h-4 text-white" />
          ) : (
            <Maximize2 className="w-4 h-4 text-white" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {history.slice(0, 5).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectHistory(item)}
              className="p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-white">
                    {
                      PROGRAMMING_LANGUAGES.find(
                        (l) => l.value === item.language
                      )?.label
                    }
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-purple-200">
                      {item.score}/100
                    </span>
                  </div>
                </div>
                <div className="text-xs text-purple-300">
                  {item.timestamp.toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const InputForm = ({
  language,
  setLanguage,
  code,
  setCode,
  onAnalyze,
  isAnalyzing,
  onClear,
  onLoadExample,
}: {
  language: string;
  setLanguage: (lang: string) => void;
  code: string;
  setCode: (code: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  onClear: () => void;
  onLoadExample: () => void;
}) => {
  const [copied, setCopied] = useState(false);
  const selectedLang = PROGRAMMING_LANGUAGES.find(
    (lang) => lang.value === language
  );

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="group relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Code Input</h2>
                <p className="text-purple-200">
                  Paste your code for AI analysis
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onLoadExample}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
              >
                <PlayCircle className="w-4 h-4 inline mr-2" />
                Load Example
              </button>
              <button
                onClick={onClear}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4 inline mr-2" />
                Clear
              </button>
            </div>
          </div>

          <div className="space-y-6">
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
                      {lang.icon} {lang.label}
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
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-purple-100">
                  Source Code
                </label>
                <button
                  onClick={handleCopy}
                  disabled={!code}
                  className="flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm disabled:opacity-50"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy"}
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
                  className="w-full h-96 px-6 py-4 bg-gray-900/50 border border-white/10 rounded-xl text-green-400 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400/20 transition-all font-mono text-sm leading-relaxed resize-none backdrop-blur-sm placeholder-gray-500"
                />
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>

            <button
              onClick={onAnalyze}
              disabled={isAnalyzing || !code.trim()}
              className="group relative w-full py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-3 relative z-10">
                  <Loader className="w-6 h-6 animate-spin" />
                  <span className="text-lg">Analyzing Code...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3 relative z-10">
                  <Sparkles className="w-6 h-6" />
                  <span className="text-lg">Analyze Code</span>
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

const ResultsPanel = ({
  isAnalyzing,
  error,
  results,
  language,
  code,
  overallScore,
  onExport,
  onShare,
}: {
  isAnalyzing: boolean;
  error: string | null;
  results: IAnalysisSection | null;
  language: string;
  code: string;
  overallScore: number;
  onExport: () => void;
  onShare: () => void;
}) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const formatText = (text: string): string => {
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
    <div className="space-y-6">
      <div className="group relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl min-h-[600px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Analysis Results
                </h2>
                <p className="text-blue-200">AI-powered code insights</p>
              </div>
            </div>

            {results && (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {overallScore}/100
                  </div>
                  <div className="text-sm text-purple-200">Overall Score</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={onShare}
                    className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-white"
                    title="Share Results"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onExport}
                    className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-white"
                    title="Export Report"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {!isAnalyzing && !error && !results && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Code className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready for Analysis
              </h3>
              <p className="text-purple-200 text-lg max-w-md">
                Paste your code and let our AI provide comprehensive insights
                and recommendations
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative mb-8">
                <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <div
                  className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"
                  style={{ animationDirection: "reverse" }}
                ></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                AI Analysis in Progress
              </h3>
              <p className="text-purple-200">
                Examining your code with advanced algorithms...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-6 py-4 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-400" />
                <div>
                  <h4 className="font-semibold">Analysis Error</h4>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              </div>
            </div>
          )}

          {results && (
            <div className="space-y-6">
              {SECTION_CONFIG.map(
                ({
                  key,
                  title,
                  icon: Icon,
                  gradient,
                  bgGradient,
                  borderColor,
                }) => {
                  const content = results[key];
                  if (!content?.trim()) return null;

                  const isExpanded = expandedSections[key] !== false;

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
                              className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center shadow-lg`}
                            >
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">
                              {title}
                            </h3>
                          </div>
                          <button
                            onClick={() => toggleSection(key)}
                            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                          >
                            {isExpanded ? (
                              <ArrowUp className="w-4 h-4" />
                            ) : (
                              <ArrowDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {isExpanded && (
                          <div
                            className="prose prose-sm max-w-none text-gray-700 leading-relaxed analysis-content"
                            dangerouslySetInnerHTML={{
                              __html: formatText(content),
                            }}
                          />
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
    </div>
  );
};

// Main App Component
const CodeSenseApp = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<IAnalysisSection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [showToast, setShowToast] = useState("");

  const showToastMessage = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(""), 3000);
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
      const analysis = await analyzeCode(language, code);
      const score = calculateOverallScore(analysis);

      setResults(analysis);
      setOverallScore(score);

      // Add to history
      const historyItem: AnalysisHistory = {
        id: Date.now().toString(),
        timestamp: new Date(),
        language,
        code: code.substring(0, 200) + (code.length > 200 ? "..." : ""),
        results: analysis,
        score,
      };

      setHistory((prev) => [historyItem, ...prev].slice(0, 10)); // Keep last 10 analyses
      showToastMessage("Analysis completed successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setResults(null);
    setError(null);
    setOverallScore(0);
  };

  const handleLoadExample = () => {
    const examples = {
      javascript: `function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

// Usage example
console.log(fibonacci(10));`,
      python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Usage example
print(fibonacci(10))`,
      java: `public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n-1) + fibonacci(n-2);
    }
    
    public static void main(String[] args) {
        System.out.println(fibonacci(10));
    }
}`,
    };

    setCode(examples[language as keyof typeof examples] || examples.javascript);
  };

  const handleExport = () => {
    if (results) {
      exportResults(results, language, code);
      showToastMessage("Report exported successfully!");
    }
  };

  const handleShare = async () => {
    if (results) {
      const shareText = `Check out my code analysis results on CodeSense AI! Overall Score: ${overallScore}/100`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: "CodeSense AI Analysis",
            text: shareText,
            url: window.location.href,
          });
        } catch (err) {
          // Fallback to clipboard
          await navigator.clipboard.writeText(shareText);
          showToastMessage("Results copied to clipboard!");
        }
      } else {
        await navigator.clipboard.writeText(shareText);
        showToastMessage("Results copied to clipboard!");
      }
    }
  };

  const handleSelectHistory = (item: AnalysisHistory) => {
    setLanguage(item.language);
    setCode(item.code);
    setResults(item.results);
    setOverallScore(item.score);
    showToastMessage("Historical analysis loaded!");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

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
          font-family: "JetBrains Mono", "Fira Code", Monaco, "Cascadia Code", "Roboto Mono", monospace;
          font-size: 14px;
          line-height: 1.6;
          white-space: pre;
        }

        .analysis-content .inline-code {
          background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
          color: #f59e0b;
          padding: 2px 6px;
          border-radius: 6px;
          font-family: "JetBrains Mono", monospace;
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

        .toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(16, 185, 129, 0.9);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          backdrop-filter: blur(10px);
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .floating-action-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 100;
        }

        .floating-action-button:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 40px rgba(139, 92, 246, 0.4);
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

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>

        {/* Toast notification */}
        {showToast && (
          <div className="toast">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {showToast}
            </div>
          </div>
        )}

        {/* Floating action button for quick actions */}
        <div
          className="floating-action-button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-6">
              <InputForm
                language={language}
                setLanguage={setLanguage}
                code={code}
                setCode={setCode}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
                onClear={handleClear}
                onLoadExample={handleLoadExample}
              />

              <HistoryPanel
                history={history}
                onSelectHistory={handleSelectHistory}
              />
            </div>

            {/* Right Column */}
            <ResultsPanel
              isAnalyzing={isAnalyzing}
              error={error}
              results={results}
              language={language}
              code={code}
              overallScore={overallScore}
              onExport={handleExport}
              onShare={handleShare}
              setShowToast={setShowToast}
            />
          </div>

          {/* Additional Features Section */}
          {results && (
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              {/* Performance Insights */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Performance Score
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {Math.max(85 - (code.split("\n").length > 50 ? 15 : 0), 60)}
                    %
                  </div>
                  <p className="text-sm text-purple-200">
                    Based on code complexity and optimization opportunities
                  </p>
                </div>
              </div>

              {/* Security Rating */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Security Rating
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {results.security?.toLowerCase().includes("no issues")
                      ? "A+"
                      : "B+"}
                  </div>
                  <p className="text-sm text-purple-200">
                    Security vulnerability assessment
                  </p>
                </div>
              </div>

              {/* Maintainability Index */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Maintainability
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {calculateCodeMetrics(code).maintainability}/10
                  </div>
                  <p className="text-sm text-purple-200">
                    Code maintainability index
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-20 text-center text-purple-300">
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Powered by Advanced AI</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Real-time Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Secure & Private</span>
              </div>
            </div>
            <p className="text-sm opacity-75">
              © 2025 CodeSense AI. Built with passion for developers, by
              developers.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default CodeSenseApp;
