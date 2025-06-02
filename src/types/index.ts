export interface IAnalysisSection {
  bugs?: string;
  security?: string;
  performance?: string;
  improvements?: string;
  learning?: string;
}

export interface ICodeMetrics {
  linesOfCode: number;
  complexity: number;
  maintainability: number;
  readability: number;
}
