import { TaskType } from '../types';

export const saveStateToLocalStorage = (
  location: string,
  state: TaskType[],
) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(location, serializedState);
  } catch (error) {
    console.error('Error saving state to local storage:', error);
  }
};

export const loadStateFromLocalStorage = (location: string) => {
  try {
    const serializedState = localStorage.getItem(location);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from local storage:', error);
    return undefined;
  }
};
