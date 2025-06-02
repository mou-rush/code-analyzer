import { Target, Bug, Shield, TrendingUp, Lightbulb } from "lucide-react";

export const AnalysisCategories = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-8 animate-pulse">
        <Target className="w-16 h-16 text-white" />
      </div>
      <h3 className="text-3xl font-bold text-white mb-4">
        Ready for Deep Analysis
      </h3>
      <p className="text-purple-200 text-lg max-w-md mb-6">
        Our advanced AI will examine your code across multiple dimensions for
        comprehensive insights
      </p>
      <div className="grid grid-cols-2 gap-4 text-sm text-purple-300">
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4" />
          <span>Bug Detection</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>Security Analysis</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span>Performance Optimization</span>
        </div>
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          <span>Learning Insights</span>
        </div>
      </div>
    </div>
  );
};
