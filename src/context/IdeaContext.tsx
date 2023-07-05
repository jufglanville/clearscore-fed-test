import {
  ReactElement,
  createContext,
  useReducer,
  useCallback,
  useContext,
} from "react";
import { Task } from "../utilities/task";
import { StateType, SortType, TaskType, EditType } from "../types";
import { saveStateToLocalStorage } from "../utilities/localStorage";

const savedState = localStorage.getItem("ideaBoardState");

export const initialState: StateType = savedState
  ? JSON.parse(savedState)
  : {
      tasks: [],
      edit: {
        isEdit: false,
        task: new Task() as TaskType,
      },
      notification: "",
    };

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
    createdAtAsc: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    createdAtDesc: (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    titleAsc: (a, b) => a.title.localeCompare(b.title),
    titleDesc: (a, b) => b.title.localeCompare(a.title),
  };

export const reducer = (state: StateType, action: ToDoAction): StateType => {
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
      newTasks[index] = { ...action.payload, createdAt: new Date()};
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
      const clearNotificationState = { ...state, notification: "" };
      saveStateToLocalStorage(clearNotificationState);
      return clearNotificationState;
    default:
      return state;
  }
};

const useTaskContext = (initialState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearNotification = useCallback(() => {
    dispatch({ type: "CLEAR_NOTIFICATION" });
  }, []);

  const sortTasks = useCallback((sortBy: SortType) => {
    dispatch({ type: "SORT_TODO", payload: sortBy });
  }, []);

  const addTask = useCallback(() => {
    dispatch({ type: "ADD_TODO" });
  }, []);

  const deleteTask = useCallback((id: string) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  }, []);

  const saveTask = useCallback((task: TaskType) => {
    dispatch({ type: "SAVE_TODO", payload: task });
  }, []);

  return { state, clearNotification, sortTasks, addTask, deleteTask, saveTask };
};

type UseTaskContextType = ReturnType<typeof useTaskContext>;

const initialContextState: UseTaskContextType = {
  state: initialState,
  clearNotification: () => {},
  sortTasks: (sortBy: SortType) => {},
  addTask: () => {},
  deleteTask: (id: string) => {},
  saveTask: (task: TaskType) => {},
};

export const TaskContext =
  createContext<UseTaskContextType>(initialContextState);

type ChildrenType = {
  children?: ReactElement | undefined;
};

export const TaskProvider = ({
  children,
  ...initialState
}: ChildrenType & StateType): ReactElement => {
  return (
    <TaskContext.Provider value={useTaskContext(initialState)}>
      {children}
    </TaskContext.Provider>
  );
};

type UseTaskHookType = {
  tasks: TaskType[];
  edit: EditType;
  sortTasks: (sortBy: SortType) => void;
  addTask: () => void;
  deleteTask: (id: string) => void;
  saveTask: (task: TaskType) => void;
};

export const useTask = (): UseTaskHookType => {
  const {
    state: { tasks, edit },
    sortTasks,
    addTask,
    deleteTask,
    saveTask,
  } = useContext(TaskContext);
  return { tasks, edit, sortTasks, addTask, deleteTask, saveTask };
};

type UseNotificationHookType = {
  notification: string;
  clearNotification: () => void;
};

export const useNotification = (): UseNotificationHookType => {
  const {
    state: { notification },
    clearNotification,
  } = useContext(TaskContext);
  return { notification, clearNotification };
};
