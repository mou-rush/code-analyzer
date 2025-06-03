import type { ElementType } from "react";
import { X, Copy } from "lucide-react";
import { formatText } from "../../utils/utils";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  icon: ElementType;
  gradient: string;
  severity: string;
  showToastMessage: (message: string) => void;
}

export const ResultModal = ({
  isOpen,
  onClose,
  title,
  content,
  icon: Icon,
  gradient,
  severity,
  showToastMessage,
}: ResultModalProps) => {
  const getSeverityClasses = (severity: string) => {
    if (severity === "high")
      return "bg-red-500/20 text-red-100 border border-red-400/30";
    if (severity === "medium")
      return "bg-yellow-500/20 text-yellow-100 border border-yellow-400/30";
    return "bg-green-500/20 text-green-100 border border-green-400/30";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        className="  absolute inset-0 bg-black/60  backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold mt-2 inline-block ${getSeverityClasses(
                severity
              )}`}
            >
              {severity.toUpperCase()} PRIORITY
            </span>
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center shadow-md`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold">{title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(content)
                    .then(() => showToastMessage("Content copied to clipboard"))
                    .catch((err) => console.error("Failed to copy:", err));
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors  cursor-pointer"
                title="Copy content"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors  cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
          <div
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed analysis-content"
            dangerouslySetInnerHTML={{ __html: formatText(content) }}
          />
        </div>
      </div>
    </div>
  );
};
