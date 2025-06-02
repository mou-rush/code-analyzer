import { Download, Share2 } from "lucide-react";

interface ResultPanelProps {
  filterLevel: string;
  setFilterLevel: (level: string) => void;
  onExport: () => void;
  onShare: () => void;
}

export const ResultsPanelActions = ({
  filterLevel,
  setFilterLevel,
  onExport,
  onShare,
}: ResultPanelProps) => {
  return (
    <div className="flex gap-2">
      <select
        value={filterLevel}
        onChange={(e) => setFilterLevel(e.target.value)}
        className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm cursor-pointer"
      >
        <option value="all" className="bg-gray-900 ">
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
        className="p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all cursor-pointer"
        title="Export Report"
      >
        <Download className="w-5 h-5 text-white" />
      </button>

      <button
        onClick={onShare}
        className="p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all cursor-pointer"
        title="Share Results"
      >
        <Share2 className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};
