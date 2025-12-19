import type { IAnalysisSection } from "./src/types";

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text: string }>;
    };
    text?: string;
  }>;
}

export const callGeminiAPI = async (
  language: string,
  code: string
): Promise<string> => {
  const apiKey = localStorage.getItem("gemini_api_key");

  // import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("API key not configured. Please set your Gemini API key.");
  }

  const prompt = `You are an expert code reviewer and programming mentor. Analyze the following ${language} code and provide a comprehensive review in the following categories:
  
  1. **BUGS & ISSUES**: Identify any bugs, logical errors, or potential runtime issues
  2. **SECURITY VULNERABILITIES**: Point out security risks, injection vulnerabilities, or unsafe practices  
  3. **PERFORMANCE OPTIMIZATIONS**: Suggest performance improvements and efficiency gaps
  4. **CODE IMPROVEMENTS**: Recommend better practices, refactoring opportunities, and cleaner code patterns
  5. **LEARNING INSIGHTS**: Provide educational explanations and alternative approaches for learning
  
  For each category, be specific and provide examples where possible. If a category has no issues, say "No issues found" for that section.
  
  Code to analyze:
  \`\`\`${language}
  ${code}
  \`\`\`
  
  Please format your response clearly with each category separated.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error?.message ||
        `HTTP ${response.status}: Failed to analyze code. Please check your API key.`
    );
  }

  const data: GeminiResponse = await response.json();

  if (data.candidates && data.candidates.length > 0) {
    const candidate = data.candidates[0];
    if (candidate.content?.parts?.[0]?.text) {
      return candidate.content.parts[0].text;
    } else if (candidate.text) {
      return candidate.text;
    }
  }

  throw new Error("No valid response received from API");
};

const parseAnalysis = (text: string): IAnalysisSection => {
  if (!text || typeof text !== "string") return {};

  const sections: IAnalysisSection = {};
  const patterns = [
    {
      key: "bugs" as keyof IAnalysisSection,
      regex:
        /(?:\*{0,2}(?:\d+\.?\s*)?(?:BUGS?\s*&?\s*ISSUES?|BUG\s*ANALYSIS|CRITICAL\s*ISSUES?)(?:\*{0,2}):?\s*)([\s\S]*?)(?=(?:\*{0,2}(?:\d+\.?\s*)?(?:SECURITY|PERFORMANCE|CODE\s*IMPROVEMENTS|LEARNING|$))|$)/i,
    },
    {
      key: "security" as keyof IAnalysisSection,
      regex:
        /(?:\*{0,2}(?:\d+\.?\s*)?(?:SECURITY\s*VULNERABILITIES?|SECURITY\s*ANALYSIS)(?:\*{0,2}):?\s*)([\s\S]*?)(?=(?:\*{0,2}(?:\d+\.?\s*)?(?:PERFORMANCE|CODE\s*IMPROVEMENTS|LEARNING|$))|$)/i,
    },
    {
      key: "performance" as keyof IAnalysisSection,
      regex:
        /(?:\*{0,2}(?:\d+\.?\s*)?(?:PERFORMANCE\s*OPTIMIZATIONS?|PERFORMANCE\s*ANALYSIS|PERFORMANCE\s*BOOST)(?:\*{0,2}):?\s*)([\s\S]*?)(?=(?:\*{0,2}(?:\d+\.?\s*)?(?:CODE\s*IMPROVEMENTS|LEARNING|$))|$)/i,
    },
    {
      key: "improvements" as keyof IAnalysisSection,
      regex:
        /(?:\*{0,2}(?:\d+\.?\s*)?(?:CODE\s*IMPROVEMENTS?|IMPROVEMENTS?|REFACTORING|CODE\s*ENHANCEMENT)(?:\*{0,2}):?\s*)([\s\S]*?)(?=(?:\*{0,2}(?:\d+\.?\s*)?(?:LEARNING|EDUCATIONAL|$))|$)/i,
    },
    {
      key: "learning" as keyof IAnalysisSection,
      regex:
        /(?:\*{0,2}(?:\d+\.?\s*)?(?:LEARNING\s*INSIGHTS?|EDUCATIONAL?|LEARNING\s*OPPORTUNITIES?|KNOWLEDGE\s*INSIGHTS?)(?:\*{0,2}):?\s*)([\s\S]*?)$/i,
    },
  ];

  patterns.forEach((pattern) => {
    const match = text.match(pattern.regex);
    if (match?.[1]) {
      sections[pattern.key] = match[1].trim();
    }
  });

  return sections;
};

export const analyzeCode = async (
  language: string,
  code: string
): Promise<IAnalysisSection> => {
  const analysisText = await callGeminiAPI(language, code);
  return parseAnalysis(analysisText);
};
