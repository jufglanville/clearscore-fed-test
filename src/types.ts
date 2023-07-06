export type TaskType = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
};

export type InputType = 'Title' | 'Description';

export type SortType =
  | 'createdAtDesc'
  | 'titleDesc'
  | 'titleAsc'
  | 'createdAtAsc';

export type EditType = {
  isEdit: boolean;
  task: TaskType;
};

export type StateType = {
  tasks: TaskType[];
  edit: EditType;
  notification: string;
};
