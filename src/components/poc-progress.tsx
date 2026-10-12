"use client";

import { useState } from "react";
import { calculateProgress, toggleTask } from "@/lib/progress";
import { trainingTasks } from "@/lib/tasks";

// POC only: plain markup to test that completion and the summary stay consistent.
export default function PocProgress() {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const { completed, total, percentage } = calculateProgress(
    trainingTasks.map((task) => task.id),
    completedIds,
  );

  return (
    <div>
      <p data-testid="summary">
        Completed: {completed} / {total} ({percentage}%)
      </p>
      <ul>
        {trainingTasks.map((task) => {
          const isDone = completedIds.has(task.id);
          return (
            <li key={task.id}>
              <button
                type="button"
                aria-pressed={isDone}
                onClick={() => setCompletedIds((ids) => toggleTask(ids, task.id))}
              >
                {isDone ? "Undo" : "Complete"}
              </button>{" "}
              {task.name}: {isDone ? "done" : "not done"}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
