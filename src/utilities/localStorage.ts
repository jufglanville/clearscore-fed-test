import { TaskType } from '../types';

export const saveStateToLocalStorage = (state: TaskType[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState);
  } catch (error) {
    console.error('Error saving state to local storage:', error);
  }
};
