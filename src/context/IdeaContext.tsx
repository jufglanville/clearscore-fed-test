import { ReactElement, createContext, useReducer } from 'react';
import { reducer, taskTemplate } from '../reducers/ideaReducer';
import { StateType, SortType, TaskType } from '../types';

const savedState = localStorage.getItem('ideaBoardState');

const initialState: StateType = savedState
  ? JSON.parse(savedState)
  : {
      tasks: [],
      edit: {
        isEdit: false,
        task: taskTemplate as TaskType,
      },
      notification: '',
    };

export const useTaskContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearNotification = () => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  };

  const sortTasks = (sortBy: SortType) => {
    dispatch({ type: 'SORT_TODO', payload: sortBy });
  };

  const addTask = () => {
    dispatch({ type: 'ADD_TODO' });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const saveTask = (task: TaskType) => {
    dispatch({ type: 'SAVE_TODO', payload: task });
  };

  return { state, clearNotification, sortTasks, addTask, deleteTask, saveTask };
};

type UseTaskContextType = ReturnType<typeof useTaskContext>;

const initialContextState: UseTaskContextType = {
  state: initialState,
  clearNotification: () => {},
  sortTasks: (_sortBy: SortType) => {},
  addTask: () => {},
  deleteTask: (_id: string) => {},
  saveTask: (_task: TaskType) => {},
};

export const TaskContext =
  createContext<UseTaskContextType>(initialContextState);

export const TaskProvider = ({
  children,
}: {
  children?: ReactElement;
}): ReactElement => {
  const taskContextValue = useTaskContext();

  return (
    <TaskContext.Provider value={taskContextValue}>
      {children}
    </TaskContext.Provider>
  );
};
