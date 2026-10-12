export type Priority = "High" | "Medium";

export type TrainingTask = {
  id: string;
  name: string;
  description: string;
  priority: Priority;
};

// Fictional teaching data from the assignment brief. Every task starts incomplete.
export const trainingTasks: TrainingTask[] = [
  {
    id: "sword-control",
    name: "Sword control",
    description: "Practise precise anti-magic sword movements.",
    priority: "High",
  },
  {
    id: "physical-endurance",
    name: "Physical endurance",
    description: "Complete a focused strength and stamina session.",
    priority: "Medium",
  },
  {
    id: "team-coordination",
    name: "Team coordination",
    description: "Review a preparation plan with the Black Bulls.",
    priority: "High",
  },
];
