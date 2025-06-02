export const IsAnalysingDisplay = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-8">
        <div className="w-24 h-24 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-blue-600 rounded-full animate-spin animate-reverse"></div>
      </div>
      <h3 className="text-2xl font-semibold text-white mb-4">
        AI Analysis in Progress
      </h3>
      <p className="text-purple-200 mb-6">
        Processing your code with advanced algorithms...
      </p>
      <div className="flex items-center gap-4 text-sm text-purple-300">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Scanning for bugs</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-200"></div>
          <span>Checking security</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse animation-delay-400"></div>
          <span>Analyzing performance</span>
        </div>
      </div>
    </div>
  );
};
