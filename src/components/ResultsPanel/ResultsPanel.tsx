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
            <ResultsPanelActions
              filterLevel={filterLevel}
              setFilterLevel={setFilterLevel}
              onExport={onExport}
              onShare={onShare}
            />
          )}
        </div>

        {!isAnalyzing && !error && !results && <AnalysisCategories />}

        {isAnalyzing && <IsAnalysingDisplay />}

        {error && <IsAnalysingError error={error} />}

        {results && (
          <ResultsDashboard
            results={results}
            showToastMessage={showToastMessage}
            toggleSection={toggleSection}
            filteredSections={filteredSections}
            expandedSections={expandedSections}
          />
        )}
      </div>
    </div>
  );
};
