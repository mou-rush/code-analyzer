export interface IAnalysisSection {
  bugs?: string;
  security?: string;
  performance?: string;
  improvements?: string;
  learning?: string;
  [key: string]: string | undefined;
}

export interface ICodeMetrics {
  linesOfCode: number;
  complexity: number;
  maintainability: number;
  readability: number;
}
