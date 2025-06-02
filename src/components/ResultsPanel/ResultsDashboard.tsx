import { Copy, ChevronUp, ChevronDown } from "lucide-react";
import type { IAnalysisSection } from "../../types";
import { formatText } from "../../utils/utils";
import type { SECTION_CONFIG } from "../../constants";

interface ResultsDashboardProps {
  results: IAnalysisSection;
  showToastMessage: (message: string) => void;
  toggleSection: (key: string) => void;
  filteredSections: typeof SECTION_CONFIG;
  expandedSections: { [key: string]: boolean };
}

export const ResultsDashboard = ({
  results,

  showToastMessage,
  toggleSection,
  filteredSections,
  expandedSections,
}: ResultsDashboardProps) => {
  return (
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
            content.substring(0, 150) + (content.length > 150 ? "..." : "");

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
                      onClick={() => {
                        navigator.clipboard
                          .writeText(content)
                          .then(() =>
                            showToastMessage("Content copied to clipboard")
                          )
                          .catch((err) =>
                            console.error("Failed to copy:", err)
                          );
                      }}
                      className="p-2 hover:bg-white/50 rounded-lg transition-colors cursor-pointer"
                      title="Copy section"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => toggleSection(key)}
                      className="p-2 hover:bg-white/50 rounded-lg transition-colors cursor-pointer"
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
                    className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
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
  );
};
