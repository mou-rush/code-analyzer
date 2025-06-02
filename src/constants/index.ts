import { Code2, TrendingUp, Shield, Bug, Lightbulb } from "lucide-react";
export const PROGRAMMING_LANGUAGES = [
  {
    value: "javascript",
    label: "JavaScript",
    color: "from-yellow-400 to-orange-500",
    icon: "⚡",
  },
  {
    value: "python",
    label: "Python",
    color: "from-blue-400 to-blue-600",
    icon: "🐍",
  },
  {
    value: "java",
    label: "Java",
    color: "from-red-400 to-red-600",
    icon: "☕",
  },
  {
    value: "cpp",
    label: "C++",
    color: "from-purple-400 to-purple-600",
    icon: "⚙️",
  },
  {
    value: "csharp",
    label: "C#",
    color: "from-green-400 to-green-600",
    icon: "#️⃣",
  },
  {
    value: "php",
    label: "PHP",
    color: "from-indigo-400 to-indigo-600",
    icon: "🌐",
  },
  {
    value: "ruby",
    label: "Ruby",
    color: "from-red-500 to-pink-500",
    icon: "💎",
  },
  { value: "go", label: "Go", color: "from-cyan-400 to-cyan-600", icon: "🚀" },
  {
    value: "rust",
    label: "Rust",
    color: "from-orange-500 to-red-500",
    icon: "🦀",
  },
  {
    value: "typescript",
    label: "TypeScript",
    color: "from-blue-500 to-indigo-600",
    icon: "📘",
  },
  {
    value: "react",
    label: "React",
    color: "from-cyan-400 to-blue-500",
    icon: "⚛️",
  },
  {
    value: "vue",
    label: "Vue.js",
    color: "from-green-400 to-emerald-500",
    icon: "🍃",
  },
  {
    value: "sql",
    label: "SQL",
    color: "from-purple-400 to-purple-600",
    icon: "📊",
  },
];
export const SECTION_CONFIG = [
  {
    key: "bugs",
    title: "Bugs & Issues",
    icon: Bug,
    gradient: "from-red-500 to-pink-600",
    bgGradient: "from-red-50 to-pink-50",
    borderColor: "border-red-200",
    severity: "high",
  },
  {
    key: "security",
    title: "Security Analysis",
    icon: Shield,
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50",
    borderColor: "border-orange-200",
    severity: "high",
  },
  {
    key: "performance",
    title: "Performance Optimization",
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    severity: "medium",
  },
  {
    key: "improvements",
    title: "Code Improvements",
    icon: Code2,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    severity: "medium",
  },
  {
    key: "learning",
    title: "Learning Insights",
    icon: Lightbulb,
    gradient: "from-purple-500 to-indigo-600",
    bgGradient: "from-purple-50 to-indigo-50",
    borderColor: "border-purple-200",
    severity: "low",
  },
];

export const examples = {
  javascript: `function fibonacci(n) {
if (n <= 1) return n;
return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,

  python: `def fibonacci(n):
if n <= 1:
    return n
return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`,

  java: `public class Fibonacci {
public static int fibonacci(int n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

public static void main(String[] args) {
  System.out.println(fibonacci(10));
}
}`,

  cpp: `#include <iostream>
using namespace std;

int fibonacci(int n) {
if (n <= 1) return n;
return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
cout << fibonacci(10);
return 0;
}`,

  csharp: `using System;

class Program {
static int Fibonacci(int n) {
  if (n <= 1) return n;
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

static void Main() {
  Console.WriteLine(Fibonacci(10));
}
}`,

  php: `<?php
function fibonacci($n) {
if ($n <= 1) return $n;
return fibonacci($n - 1) + fibonacci($n - 2);
}

echo fibonacci(10);
?>`,

  ruby: `def fibonacci(n)
return n if n <= 1
fibonacci(n - 1) + fibonacci(n - 2)
end

puts fibonacci(10)`,

  go: `package main

import "fmt"

func fibonacci(n int) int {
if n <= 1 {
  return n
}
return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
fmt.Println(fibonacci(10))
}`,

  rust: `fn fibonacci(n: u32) -> u32 {
if n <= 1 {
  return n;
}
return fibonacci(n - 1) + fibonacci(n - 2);
}

fn main() {
println!("{}", fibonacci(10));
}`,

  typescript: `function fibonacci(n: number): number {
if (n <= 1) return n;
return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,

  react: `import React from 'react';

function Fibonacci({ n }: { n: number }) {
const fibonacci = (num: number): number => {
  if (num <= 1) return num;
  return fibonacci(num - 1) + fibonacci(num - 2);
};

return <div>Fibonacci of {n} is {fibonacci(n)}</div>;
}

export default function App() {
return <Fibonacci n={10} />;
}`,

  vue: `<template>
<div>Fibonacci of 10 is {{ fibonacci(10) }}</div>
</template>

<script>
export default {
methods: {
  fibonacci(n) {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}
};
</script>`,

  sql: `-- Generate Fibonacci series up to 10 in SQL (using recursive CTE)
WITH RECURSIVE fib(n, value) AS (
SELECT 0, 0
UNION ALL
SELECT 1, 1
UNION ALL
SELECT n + 1, value + (SELECT value FROM fib WHERE n = fib.n - 1)
FROM fib
WHERE n < 9
)
SELECT value FROM fib;`,
};
