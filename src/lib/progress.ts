export type Progress = {
  completed: number;
  total: number;
  percentage: number;
};

// The only source of truth is the set of completed task IDs. The count and the
// percentage are always derived from it, so they can never disagree.
export function calculateProgress(
  taskIds: readonly string[],
  completedIds: ReadonlySet<string>,
): Progress {
  const total = taskIds.length;
  const completed = taskIds.filter((id) => completedIds.has(id)).length;
  const raw = total === 0 ? 0 : (completed / total) * 100;
  const percentage = Math.min(100, Math.max(0, Math.round(raw)));

  return { completed, total, percentage };
}

// Returns a new Set so React sees a new value and re-renders.
export function toggleTask(
  completedIds: ReadonlySet<string>,
  taskId: string,
): Set<string> {
  const next = new Set(completedIds);
  if (next.has(taskId)) {
    next.delete(taskId);
  } else {
    next.add(taskId);
  }
  return next;
}
