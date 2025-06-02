import { useState } from "react";

import type { IAnalysisSection } from "./types";
import { analyzeCode } from "../googleGemini";
import { InputForm } from "./components/InputForm/InputForm";
import { FloatingParticles } from "./components/FloatingParticles/FloatingParticles";
import { Header } from "./components/Header/Header";
import { ResultsPanel } from "./components/ResultsPanel/ResultsPanel";
import { CheckCircle } from "lucide-react";
import { examples } from "./constants/index";

const CodeSenseApp = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<IAnalysisSection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [overallScore, setOverallScore] = useState(0);
  const [showToast, setShowToast] = useState("");

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
      setResults(analysis);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsAnalyzing(false);
    }
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
        } catch (error) {
          console.error("Sharing failed:", error);

          await navigator.clipboard.writeText(shareText);
          showToastMessage("Results copied to clipboard!");
        }
      } else {
        await navigator.clipboard.writeText(shareText);
        showToastMessage("Results copied to clipboard!");
      }
    }
  };
  console.log("setShowToast", showToast);
  const showToastMessage = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(""), 3000);
  };

  const handleClear = () => {
    setCode("");
    setResults(null);
    setError(null);
    setOverallScore(0);
  };

  const handleExport = () => {
    if (results) {
      exportResults(results, language, code);
      showToastMessage("Report exported successfully!");
    }
  };
  const handleLoadExample = () => {
    setCode(examples[language as keyof typeof examples] || examples.javascript);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <FloatingParticles />
      {/* Toast notification */}
      {showToast && (
        <div className="toast">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {showToast}
          </div>
        </div>
      )}

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <Header />

        <div className="grid lg:grid-cols-2 gap-12">
          <InputForm
            language={language}
            setLanguage={setLanguage}
            code={code}
            setCode={setCode}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
            onClear={handleClear}
            onLoadExample={handleLoadExample}
            showToastMessage={showToastMessage}
          />

          <ResultsPanel
            isAnalyzing={isAnalyzing}
            error={error}
            results={results}
            onExport={handleExport}
            showToastMessage={showToastMessage}
            onShare={handleShare}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeSenseApp;
