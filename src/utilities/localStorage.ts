import { TaskType } from '../types';

export const saveStateToLocalStorage = (
  location: string,
  state: TaskType[],
) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(location, serializedState);
  } catch (error) {
    throw new Error('Error saving task to local storage');
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
    throw new Error('Error loading state from local storage');
  }
};
