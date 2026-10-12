"use client";

import { useState, type ReactNode } from "react";
import { calculateProgress, toggleTask } from "@/lib/progress";
import type { TrainingTask } from "@/lib/tasks";

type TrainingPlanProps = {
  tasks: TrainingTask[];
  // Server-rendered content (the threat brief) shown next to the progress card.
  children: ReactNode;
};

export default function TrainingPlan({ tasks, children }: TrainingPlanProps) {
  // Single source of truth: the IDs of completed tasks. Everything else
  // (status text, count, percentage) is derived from it on each render.
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  // Only used to word the screen-reader announcement.
  const [lastChangedId, setLastChangedId] = useState<string | null>(null);

  const { completed, total, percentage } = calculateProgress(
    tasks.map((task) => task.id),
    completedIds,
  );

  const lastChanged = tasks.find((task) => task.id === lastChangedId);
  const announcement = lastChanged
    ? `${lastChanged.name} ${completedIds.has(lastChanged.id) ? "completed" : "marked as not started"}. ` +
      `${completed} of ${total} tasks complete, ${percentage}% of the plan.`
    : "";

  function handleToggle(taskId: string) {
    // Functional update, as in the POC: always toggles the latest state.
    setCompletedIds((ids) => toggleTask(ids, taskId));
    setLastChangedId(taskId);
  }

  return (
    <div className="space-y-8">
      {/* Progress comes first so it is on the first screen of a phone. */}
      <div className="grid gap-4 lg:grid-cols-2">
        <section
          aria-labelledby="progress-heading"
          className="rounded-2xl border border-line bg-surface p-5 sm:p-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember-text">
            Preparation progress
          </p>
          <h2 id="progress-heading" className="sr-only">
            Training plan progress
          </h2>
          <div className="mt-2 flex items-end justify-between gap-4">
            <p className="font-display text-xl font-semibold uppercase tracking-wide sm:text-2xl">
              {completed} / {total} tasks complete
            </p>
            <p
              className="font-display text-4xl font-semibold leading-none sm:text-5xl"
              aria-hidden="true"
            >
              {percentage}%
            </p>
          </div>
          <div
            role="progressbar"
            aria-label="Training plan completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percentage}
            aria-valuetext={`${percentage}% of the training plan complete`}
            className="mt-4 h-3 overflow-hidden rounded-full bg-raised"
          >
            {/* scaleX (not width) so the animation stays on the compositor. */}
            <div
              className="h-full origin-left rounded-full bg-ember transition-transform duration-300 ease-out motion-reduce:transition-none"
              style={{ transform: `scaleX(${percentage / 100})` }}
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-dim">
            The percentage shows how much of Asta&apos;s training plan is
            complete. It is not a prediction of the fight with Lucifero.
          </p>
        </section>

        {children}
      </div>

      <section aria-labelledby="tasks-heading">
        <h2
          id="tasks-heading"
          className="font-display text-2xl font-semibold uppercase tracking-wide"
        >
          Training tasks
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {tasks.map((task) => {
            const isDone = completedIds.has(task.id);
            return (
              <li
                key={task.id}
                className={`flex flex-col rounded-2xl border p-5 transition-colors duration-200 motion-reduce:transition-none ${
                  isDone
                    ? "border-done/60 bg-raised"
                    : "border-line bg-surface"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                      task.priority === "High"
                        ? "border-ember-text/60 text-ember-text"
                        : "border-line text-dim"
                    }`}
                  >
                    {task.priority} priority
                  </span>
                  <span
                    className={`flex items-center gap-1.5 text-sm font-semibold ${
                      isDone ? "text-done" : "text-dim"
                    }`}
                  >
                    <StatusIcon done={isDone} />
                    {isDone ? "Completed" : "Not started"}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold">{task.name}</h3>
                <p className="mt-2 flex-1 leading-7 text-dim">
                  {task.description}
                </p>
                <button
                  type="button"
                  onClick={() => handleToggle(task.id)}
                  className={`mt-5 min-h-11 w-full cursor-pointer rounded-xl px-4 py-2.5 text-base font-semibold transition-colors duration-200 motion-reduce:transition-none ${
                    isDone
                      ? "border border-line bg-transparent text-warm hover:bg-surface"
                      : "border border-transparent bg-ember text-white hover:bg-ember-hover"
                  }`}
                >
                  {isDone ? "Undo" : "Mark complete"}
                  <span className="sr-only"> – {task.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}

function StatusIcon({ done }: { done: boolean }) {
  return done ? (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      <path
        d="M6 10.5l2.5 2.5L14 7.5"
        fill="none"
        stroke="#141518"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
      <circle
        cx="10"
        cy="10"
        r="8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
