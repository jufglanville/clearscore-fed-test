import { SortType, TaskType } from '../../types';
import { saveStateToLocalStorage } from '../../utilities/localStorage';

export type StateType = {
  tasks: TaskType[];
  notification: string;
  isNewTask: boolean;
};

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

export const cardListReducer = (
  state: StateType,
  action: ToDoAction,
): StateType => {
  switch (action.type) {
    case 'CREATE_TODO':
      const newTask = {
        ...taskTemplate,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
      };
      const newTaskState = [newTask, ...state.tasks];
      saveStateToLocalStorage(newTaskState);

      return {
        tasks: newTaskState,
        isNewTask: true,
        notification: 'Task Created',
      };

    case 'DELETE_TODO':
      const deleteTask = state.tasks.filter(
        (task: TaskType) => task.id !== action.payload,
      );
      saveStateToLocalStorage(deleteTask);
      return {
        tasks: deleteTask,
        isNewTask: false,
        notification: 'Task Deleted',
      };

    case 'UPDATE_TODO':
      const index = state.tasks.findIndex(
        (task: TaskType) => task.id === action.payload.id,
      );
      const updateTask = [...state.tasks];
      updateTask[index] = { ...action.payload, createdAt: new Date() };
      saveStateToLocalStorage(updateTask);
      return {
        tasks: updateTask,
        isNewTask: false,
        notification: 'Task Updated',
      };

    case 'SORT_TODO':
      const sortComparison = sortComparisons[action.payload];
      const sorted = [...state.tasks].sort(sortComparison);
      return {
        tasks: sorted,
        isNewTask: false,
        notification: 'Tasks Sorted',
      };

    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: '',
      };

    default:
      return state;
  }
};
