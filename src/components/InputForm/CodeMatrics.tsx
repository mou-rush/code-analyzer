import { BarChart3 } from "lucide-react";
import { calculateCodeMetrics } from "../../utils/utils";

export const CodeMetricsPanel = ({ code }: { code: string }) => {
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
