import { TaskType } from '../types';
import {
  saveStateToLocalStorage,
  loadStateFromLocalStorage,
} from './localStorage';

const location = 'testLocation';

jest.spyOn(global, 'Date');

const task = {
  id: '1',
  title: 'Test Task',
  description: 'Test Desc',
  createdAt: new Date('2021-01-01'),
};

describe('saveStateToLocalStorage', () => {
  beforeEach(() => {
    // Reset 'localStorage' before each test
    jest
      .spyOn(global.Storage.prototype, 'setItem')
      .mockImplementation(() => {});
    jest
      .spyOn(global.Storage.prototype, 'getItem')
      .mockImplementation(() => JSON.stringify([task]));
  });

  it('should save the state to local storage', () => {
    const state: TaskType[] = [task];

    saveStateToLocalStorage(location, state);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      location,
      JSON.stringify(state),
    );
  });

  it('should handle the error', () => {
    // Mock localStorage.setItem to throw an error
    jest.spyOn(global.Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error();
    });

    const state: TaskType[] = [task];

    expect(() => {
      saveStateToLocalStorage(location, state);
    }).toThrow('Error saving task to local storage');
  });
});

describe('loadStateFromLocalStorage', () => {
  it('should load the state from local storage', async () => {
    const loadedState = await loadStateFromLocalStorage(location);
    expect(loadedState).toEqual([task]);
  });

  it('should handle the error', () => {
    // Mock localStorage.getItem to return null
    jest.spyOn(global.Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error();
    });

    expect(() => {
      loadStateFromLocalStorage(location);
    }).toThrowError('Error loading state from local storage');
  });
});
