export type Filter = "all" | "completed" | "pending";

export type Task = {
  id: string;
  title: string;
  status: "completed" | "pending";
};
