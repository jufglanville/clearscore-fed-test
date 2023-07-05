import { StateType } from "../types";

export const saveStateToLocalStorage = (state: StateType) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("ideaBoardState", serializedState);
  } catch (error) {
    console.error("Error saving state to local storage:", error);
  }
};
