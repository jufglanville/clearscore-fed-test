export type TaskType = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
};

export type InputType = 'title' | 'description';

export type SortType =
  | 'createdAtDesc'
  | 'titleDesc'
  | 'titleAsc'
  | 'createdAtAsc';

export type StateType = {
  tasks: TaskType[];
  notification: string;
  isNewTask: boolean;
};
