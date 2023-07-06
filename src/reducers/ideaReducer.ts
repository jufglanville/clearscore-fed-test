import { StateType, SortType, TaskType } from '../types';
import { saveStateToLocalStorage } from '../utilities/localStorage';

interface AddToDo {
  type: 'ADD_TODO';
}

interface DeleteToDo {
  type: 'DELETE_TODO';
  payload: string;
}

interface SaveToDo {
  type: 'SAVE_TODO';
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
  | AddToDo
  | DeleteToDo
  | SaveToDo
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

export const reducer = (state: StateType, action: ToDoAction): StateType => {
  switch (action.type) {
    case 'ADD_TODO':
      const newTask = {
        ...taskTemplate,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
      };
      const newAddState = {
        tasks: [newTask, ...state.tasks],
        edit: { isEdit: true, task: newTask },
        notification: 'Task Added',
      };
      saveStateToLocalStorage(newAddState);
      return newAddState;
    case 'DELETE_TODO':
      const newDeleteState = {
        tasks: state.tasks.filter(
          (task: TaskType) => task.id !== action.payload,
        ),
        edit: { isEdit: false, task: taskTemplate },
        notification: 'Task Deleted',
      };
      saveStateToLocalStorage(newDeleteState);
      return newDeleteState;
    case 'SAVE_TODO':
      const index = state.tasks.findIndex(
        (task: TaskType) => task.id === action.payload.id,
      );
      const newTasks = [...state.tasks];
      newTasks[index] = { ...action.payload, createdAt: new Date() };
      const newSaveState = {
        tasks: newTasks,
        edit: { isEdit: false, task: taskTemplate },
        notification: 'Task Updated',
      };
      saveStateToLocalStorage(newSaveState);
      return newSaveState;
    case 'SORT_TODO':
      const sortComparison = sortComparisons[action.payload];
      const sortedTasks = [...state.tasks].sort(sortComparison);
      return {
        tasks: sortedTasks,
        edit: { isEdit: false, task: taskTemplate },
        notification: '',
      };
    case 'CLEAR_NOTIFICATION':
      const clearNotificationState = { ...state, notification: '' };
      saveStateToLocalStorage(clearNotificationState);
      return clearNotificationState;
    default:
      return state;
  }
};
