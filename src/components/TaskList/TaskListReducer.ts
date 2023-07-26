import { SortType, TaskType } from '../../types';
import { saveStateToLocalStorage } from '../../utilities/localStorage';

export type StateType = {
  tasks: TaskType[];
  notification: string;
  isNewTask: boolean;
};

interface SetTasks {
  type: 'SET_TASKS';
  tasks: TaskType[];
}

interface CreateTask {
  type: 'CREATE_TASK';
}

interface DeleteTask {
  type: 'DELETE_TASK';
  taskId: string;
}

interface UpdateTask {
  type: 'UPDATE_TASK';
  task: TaskType;
}

interface SortTask {
  type: 'SORT_TASK';
  sortType: SortType;
}

interface ClearNotification {
  type: 'CLEAR_NOTIFICATION';
}

export type TaskAction =
  | SetTasks
  | CreateTask
  | DeleteTask
  | UpdateTask
  | SortTask
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

export const taskListReducer = (
  state: StateType,
  action: TaskAction,
): StateType => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        tasks: action.tasks,
        isNewTask: false,
        notification: 'Tasks Loaded',
      };

    case 'CREATE_TASK':
      const newTask = {
        ...taskTemplate,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
      };
      const newTaskState = [newTask, ...state.tasks];
      saveStateToLocalStorage('tasks', newTaskState);

      return {
        tasks: newTaskState,
        isNewTask: true,
        notification: 'Task Created',
      };

    case 'DELETE_TASK':
      const deleteTask = state.tasks.filter(
        (task: TaskType) => task.id !== action.taskId,
      );
      saveStateToLocalStorage('tasks', deleteTask);
      return {
        tasks: deleteTask,
        isNewTask: false,
        notification: 'Task Deleted',
      };

    case 'UPDATE_TASK':
      const index = state.tasks.findIndex(
        (task: TaskType) => task.id === action.task.id,
      );
      const updateTask = [...state.tasks];
      updateTask[index] = { ...action.task, createdAt: new Date() };
      saveStateToLocalStorage('tasks', updateTask);
      return {
        tasks: updateTask,
        isNewTask: false,
        notification: 'Task Updated',
      };

    case 'SORT_TASK':
      const sortComparison = sortComparisons[action.sortType];
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
