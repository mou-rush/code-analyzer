import { useState, useEffect } from "react";
import { Key, Eye, EyeOff, X, Check } from "lucide-react";

export const ApiKeyManager = ({ onKeyUpdate }) => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem("gemini_api_key");
    if (storedKey) {
      setApiKey(storedKey);
      setHasKey(true);
      onKeyUpdate?.(storedKey);
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("gemini_api_key", apiKey.trim());
      setHasKey(true);
      setIsModalOpen(false);
      onKeyUpdate?.(apiKey.trim());
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem("gemini_api_key");
    setApiKey("");
    setHasKey(false);
    setIsModalOpen(true);
    onKeyUpdate?.(null);
  };

  return (
    <>
      {/* API Key Status Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={`fixed cursor-pointer top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          hasKey
            ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
            : "bg-red-500/20 text-red-300 hover:bg-red-500/30 animate-pulse"
        }`}
      >
        <Key className="w-4 h-4" />
        {hasKey ? "API Key Set" : "Set API Key"}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Key className="w-6 h-6 text-purple-400" />
                Gemini API Key
              </h2>
              {hasKey && (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <p className="text-slate-300 mb-6">
              Enter your Google Gemini API key to use this code analyzer. Your
              key is stored locally in your browser.
            </p>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showKey ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveKey}
                  disabled={!apiKey.trim()}
                  className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  <Check className="w-5 h-5" />
                  Save Key
                </button>

                {hasKey && (
                  <button
                    onClick={handleRemoveKey}
                    className="cursor-pointer px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg font-medium transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300 mb-2">
                <strong>Don't have an API key?</strong>
              </p>
              <p className="text-xs text-blue-200 mb-2">
                Get your free API key from Google AI Studio:
              </p>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 underline"
              >
                https://aistudio.google.com/app/apikey
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
