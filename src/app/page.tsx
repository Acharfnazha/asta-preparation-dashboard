import PocProgress from "@/components/poc-progress";

// Mission Four POC: a deliberately small experiment, not the final design.
export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>POC: training progress</h1>
      <p>
        Question: can task completion and the progress summary stay consistent
        when tasks are completed, undone, and toggled repeatedly?
      </p>
      <PocProgress />
    </main>
  );
}
