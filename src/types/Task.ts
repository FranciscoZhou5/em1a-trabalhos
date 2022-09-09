export interface Task {
  id: number;
  title: string;
  due: string;
  type: "test" | "task";
  owner: string;
  description: string;
}
