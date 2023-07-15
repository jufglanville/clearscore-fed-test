import { saveStateToLocalStorage } from './localStorage';

describe('saveStateToLocalStorage', () => {
  it('should save state to local storage', () => {
    const state = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        createdAt: new Date(),
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Description 2',
        createdAt: new Date(),
      },
    ];

    saveStateToLocalStorage(state);

    const storedState = localStorage.getItem('tasks');
    expect(storedState).toBe(JSON.stringify(state));
  });
});
