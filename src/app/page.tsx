import TrainingPlan from "@/components/training-plan";
import { trainingTasks } from "@/lib/tasks";

// Server Component: the static story content renders on the server.
// Only <TrainingPlan> is a Client Component, because it holds task state.
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember-text">
          Black Bulls · Training plan
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase leading-none tracking-wide sm:text-6xl">
          Asta&apos;s Preparation Dashboard
        </h1>
        <p className="mt-4 text-base leading-7 text-dim sm:text-lg sm:leading-8">
          Lucifero is approaching. Asta&apos;s training plan in one place:
          what to practise next, what&apos;s done, and how much is complete.
        </p>
      </header>

      <div className="mt-6 sm:mt-8">
        <TrainingPlan tasks={trainingTasks}>
          <ThreatBrief />
        </TrainingPlan>
      </div>

      <footer className="mt-10 border-t border-line pt-6 text-sm leading-6 text-dim">
        <p>
          Progress is kept for this visit only. Refreshing the page resets
          every task to &quot;Not started&quot;.
        </p>
        <p className="mt-1">
          Fictional assignment scenario. Characters from Black Clover by Yuki
          Tabata; tasks and dashboard created for this assignment.
        </p>
      </footer>
    </main>
  );
}

function ThreatBrief() {
  return (
    <section
      aria-labelledby="threat-heading"
      className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5 sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember-text">
        Threat brief
      </p>
      <h2
        id="threat-heading"
        className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide"
      >
        Lucifero
      </h2>
      <p className="mt-2 leading-7 text-dim">
        A powerful devil who uses gravity magic. His overwhelming strength
        makes him a serious threat.
      </p>
      <dl className="mt-auto grid grid-cols-2 gap-3 pt-5 text-sm">
        <div className="rounded-lg bg-raised px-3 py-2">
          <dt className="text-dim">Magic</dt>
          <dd className="font-semibold">Gravity</dd>
        </div>
        <div className="rounded-lg bg-raised px-3 py-2">
          <dt className="text-dim">Status</dt>
          <dd className="font-semibold">Approaching</dd>
        </div>
      </dl>
    </section>
  );
}
