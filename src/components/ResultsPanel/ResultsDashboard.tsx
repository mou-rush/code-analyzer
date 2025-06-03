import { Copy, Maximize2 } from "lucide-react";
import type { IAnalysisSection } from "../../types";
import { formatText } from "../../utils/utils";
import type { SECTION_CONFIG } from "../../constants";
import { useState, type ElementType } from "react";
import { ResultModal } from "./ResultModal";

interface ResultsDashboardProps {
  results: IAnalysisSection;
  showToastMessage: (message: string) => void;
  filteredSections: typeof SECTION_CONFIG;
}

export const ResultsDashboard = ({
  results,
  showToastMessage,
  filteredSections,
}: ResultsDashboardProps) => {
  interface ModalData {
    key: string;
    title: string;
    icon: ElementType;
    gradient: string;
    severity: string;
    content: string;
  }

  const [modalData, setModalData] = useState<ModalData | null>(null);

  const openModal = (sectionData: ModalData) => {
    setModalData(sectionData);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
      <div className="grid gap-4 auto-rows-fr">
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

            const preview =
              content.substring(0, 110) + (content.length > 110 ? "..." : "");
            const hasMoreContent = content.length > 110;

            return (
              <div key={key} className="group/card relative">
                {/* Glow effect */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-xl blur opacity-15 group-hover/card:opacity-30 transition duration-300`}
                />

                {/* Card */}
                <div
                  className={`relative bg-gradient-to-br ${bgGradient} backdrop-blur-sm rounded-xl p-5 border ${borderColor} shadow-md hover:shadow-lg transition-all duration-300`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-gray-800 truncate">
                          {title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-semibold inline-block mt-1 ${
                            severity === "high"
                              ? "bg-red-100 text-red-700"
                              : severity === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {severity.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
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

                      {hasMoreContent && (
                        <button
                          onClick={() =>
                            openModal({
                              key,
                              title,
                              icon: Icon,
                              gradient,
                              severity,
                              content,
                            })
                          }
                          className="p-2 hover:bg-white/50 rounded-lg transition-colors cursor-pointer"
                          title="Full view"
                        >
                          <Maximize2 className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="overflow-hidden transition-all duration-300 
                    max-h-48"
                  >
                    <div
                      className="prose prose-sm max-w-none text-gray-700 leading-relaxed analysis-content"
                      dangerouslySetInnerHTML={{
                        __html: formatText(preview),
                      }}
                    />
                  </div>

                  {/* Action buttons */}
                  <div className="mt-3 flex items-center justify-between">
                    {hasMoreContent && (
                      <button
                        onClick={() =>
                          openModal({
                            key,
                            title,
                            icon: Icon,
                            gradient,
                            severity,
                            content,
                          })
                        }
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer "
                      >
                        Show More
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Modal */}
      {modalData && (
        <ResultModal
          isOpen={!!modalData}
          onClose={closeModal}
          title={modalData.title}
          content={modalData.content}
          icon={modalData.icon}
          gradient={modalData.gradient}
          severity={modalData.severity}
          showToastMessage={showToastMessage}
        />
      )}
    </>
  );
};
