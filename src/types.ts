export type TaskType = {
  id: string
  title: string
  description: string
  createdAt: Date
}

export type InputType = 'Title' | 'Description'

export type SortType = 'createdAtDesc' | 'titleDesc' | 'titleAsc' | 'createdAtAsc'

export interface State {
  tasks: TaskType[];
  edit: {
    isEdit: boolean;
    task: TaskType;
  };
  notification: string;
}