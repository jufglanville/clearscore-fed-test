import { SortType, TaskType } from '../types';
import { saveStateToLocalStorage } from '../utilities/localStorage';

interface CreateToDo {
  type: 'CREATE_TODO';
}

interface DeleteToDo {
  type: 'DELETE_TODO';
  payload: string;
}

interface UpdateToDo {
  type: 'UPDATE_TODO';
  payload: TaskType;
}

interface SortToDo {
  type: 'SORT_TODO';
  payload: SortType;
}

interface ClearNotification {
  type: 'CLEAR_NOTIFICATION';
}

export type ToDoAction =
  | CreateToDo
  | DeleteToDo
  | UpdateToDo
  | SortToDo
  | ClearNotification;

export const taskTemplate: TaskType = {
  id: '',
  title: '',
  description: '',
  createdAt: new Date(),
};

const sortComparisons: Record<SortType, (a: TaskType, b: TaskType) => number> =
  {
    createdAtAsc: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    createdAtDesc: (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    titleAsc: (a, b) => a.title.localeCompare(b.title),
    titleDesc: (a, b) => b.title.localeCompare(a.title),
  };

export const ideaReducer = (
  state: TaskType[],
  action: ToDoAction,
): TaskType[] => {
  switch (action.type) {
    case 'CREATE_TODO':
      const newTask = {
        ...taskTemplate,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
      };
      const newTaskState = [newTask, ...state];
      saveStateToLocalStorage(newTaskState);

      return newTaskState;

    case 'DELETE_TODO':
      const deleteTask = state.filter(
        (task: TaskType) => task.id !== action.payload,
      );
      saveStateToLocalStorage(deleteTask);
      return deleteTask;

    case 'UPDATE_TODO':
      const index = state.findIndex(
        (task: TaskType) => task.id === action.payload.id,
      );
      const updateTask = [...state];
      updateTask[index] = { ...action.payload, createdAt: new Date() };
      saveStateToLocalStorage(updateTask);
      return updateTask;

    case 'SORT_TODO':
      const sortComparison = sortComparisons[action.payload];
      return [...state].sort(sortComparison);

    default:
      return state;
  }
};
