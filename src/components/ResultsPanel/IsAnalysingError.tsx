import { AlertCircle } from "lucide-react";

export const IsAnalysingError = ({ error }: { error: string }) => {
  return (
    <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-6 py-4 rounded-xl backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-6 h-6 text-red-400" />
        <div>
          <h4 className="font-semibold">Analysis Error</h4>
          <p className="text-sm opacity-90">{error}</p>
        </div>
      </div>
    </div>
  );
};
