import type { IAnalysisSection } from "../../types/index";
import { SECTION_CONFIG } from "../../constants/index";
import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { ResultsPanelActions } from "./ResultsPanelActions";
import { AnalysisCategories } from "./AnalysisCategories";
import { IsAnalysingDisplay } from "./IsAnalysingDisplay";
import { IsAnalysingError } from "./IsAnalysingError";
import { ResultsDashboard } from "./ResultsDashboard";

interface ResultsPanelProps {
  isAnalyzing: boolean;
  error: string | null;
  results: IAnalysisSection | null;
  onExport: () => void;
  onShare: () => void;
  showToastMessage: (message: string) => void;
}

export const ResultsPanel = ({
  isAnalyzing,
  error,
  results,
  onExport,
  onShare,
  showToastMessage,
}: ResultsPanelProps) => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});
  const [filterLevel, setFilterLevel] = useState("all");

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredSections = SECTION_CONFIG.filter((section) => {
    if (filterLevel === "all") return true;
    return section.severity === filterLevel;
  });

  return (
    <div className="w-full max-w-none">
      {/* Header */}
      <div className="mb-6 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-2xl border border-white/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left section: Icon + Title */}
          <div className="flex items-start sm:items-center gap-3">
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

          {/* Right section: Actions */}
          {results && (
            <div className="mt-4 sm:mt-0">
              <ResultsPanelActions
                filterLevel={filterLevel}
                setFilterLevel={setFilterLevel}
                onExport={onExport}
                onShare={onShare}
              />
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full">
        {!isAnalyzing && !error && !results && <AnalysisCategories />}
        {isAnalyzing && <IsAnalysingDisplay />}
        {error && <IsAnalysingError error={error} />}
        {results && (
          <ResultsDashboard
            results={results}
            showToastMessage={showToastMessage}
            filteredSections={filteredSections}
          />
        )}
      </div>
    </div>
  );
};
