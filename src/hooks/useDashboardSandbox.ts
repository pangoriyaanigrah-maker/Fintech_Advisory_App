'use client';

import { useState } from 'react';

interface LogEntry {
  id: string;
  score: number;
}

export function useDashboardSandbox() {
  const [spendingTotal, setSpendingTotal] = useState(42300);
  const [wellnessScore, setWellnessScore] = useState(88);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  function simulateSpending() {
    const newSpending = spendingTotal + 1500;
    const newScore = Math.max(72, wellnessScore - 2);

    setSpendingTotal(newSpending);
    setWellnessScore(newScore);

    const newLog: LogEntry = {
      id: `log-${Date.now()}`,
      score: newScore,
    };

    setLogs((prev) => [newLog, ...prev].slice(0, 2));
  }

  function resetSpending() {
    setSpendingTotal(42300);
    setWellnessScore(88);
    setLogs([]);
  }

  return {
    spendingTotal,
    wellnessScore,
    logs,
    simulateSpending,
    resetSpending,
  };
}
