import type { ICodeMetrics } from "../types";

export const calculateCodeMetrics = (code: string): ICodeMetrics => {
  const lines = code.split("\n").filter((line) => line.trim().length > 0);
  const linesOfCode = lines.length;

  const complexity = Math.min(Math.max(Math.floor(linesOfCode / 10), 1), 10);
  const maintainability = Math.max(10 - Math.floor(linesOfCode / 20), 1);
  const readability = Math.max(
    10 - Math.floor(code.split(/[{}();]/).length / linesOfCode),
    1
  );
  return { linesOfCode, complexity, maintainability, readability };
};

export const formatText = (text: string) => {
  if (!text) return "";
  return text
    .replace(
      /```(\w+)?\n?([\s\S]*?)```/g,
      '<pre class="code-block"><code class="language-$1">$2</code></pre>'
    )
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold text-gray-900">$1</strong>'
    )
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/\n/g, "<br>")
    .replace(/^\*\s+/gm, '<span class="bullet-point">•</span> ')
    .replace(
      /^\d+\.\s+/gm,
      (match) => `<span class="number-point">${match.trim()}</span> `
    );
};
