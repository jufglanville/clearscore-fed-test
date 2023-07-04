import { Task } from "../utilities/task";
import { State, SortType, TaskType } from "../types";
import { saveStateToLocalStorage } from "../utilities/localStorage";

interface AddToDo {
  type: "ADD_TODO";
}

interface DeleteToDo {
  type: "DELETE_TODO";
  payload: string;
}

interface SaveToDo {
  type: "SAVE_TODO";
  payload: Task;
}

interface SortToDo {
  type: "SORT_TODO";
  payload: SortType;
}

interface ClearNotification {
  type: "CLEAR_NOTIFICATION";
}

export type ToDoAction =
  | AddToDo
  | DeleteToDo
  | SaveToDo
  | SortToDo
  | ClearNotification;

const sortComparisons: Record<SortType, (a: TaskType, b: TaskType) => number> =
  {
    createdAtAsc: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    createdAtDesc: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    titleAsc: (a, b) => a.title.localeCompare(b.title),
    titleDesc: (a, b) => b.title.localeCompare(a.title),
  };

export const reducer = (state: State, action: ToDoAction) => {
  switch (action.type) {
    case "ADD_TODO":
      const newTask = new Task();
      const newAddState = {
        tasks: [newTask, ...state.tasks],
        edit: { isEdit: true, task: newTask },
        notification: "Task Added",
      };
      saveStateToLocalStorage(newAddState);
      return newAddState;
    case "DELETE_TODO":
      const newDeleteState = {
        tasks: state.tasks.filter(
          (task: TaskType) => task.id !== action.payload
        ),
        edit: { isEdit: false, task: new Task() },
        notification: "Task Deleted",
      };
      saveStateToLocalStorage(newDeleteState);
      return newDeleteState;
    case "SAVE_TODO":
      const index = state.tasks.findIndex(
        (task: TaskType) => task.id === action.payload.id
      );
      const newTasks = [...state.tasks];
      newTasks[index] = action.payload;
      const newSaveState = {
        tasks: newTasks,
        edit: { isEdit: false, task: new Task() },
        notification: "Task Updated",
      };
      saveStateToLocalStorage(newSaveState);
      return newSaveState;
    case "SORT_TODO":
      const sortComparison = sortComparisons[action.payload];
      const sortedTasks = [...state.tasks].sort(sortComparison);
      return {
        tasks: sortedTasks,
        edit: { isEdit: false, task: new Task() },
        notification: "",
      };
    case "CLEAR_NOTIFICATION":
      return { ...state, notification: "" };
    default:
      return state;
  }
};

