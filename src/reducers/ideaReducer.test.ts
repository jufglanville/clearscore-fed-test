import {
  ideaReducer,
  StateType,
  ToDoAction,
  taskTemplate,
} from './ideaReducer';

const initialState: StateType = {
  tasks: [],
  notification: '',
  isNewTask: false,
};

describe('ideaReducer', () => {
  it('should handle CREATE_TODO action', () => {
    const action: ToDoAction = { type: 'CREATE_TODO' };
    const state = ideaReducer(initialState, action);

    expect(state.tasks.length).toBe(1);
    expect(state.isNewTask).toBe(true);
    expect(state.notification).toBe('Task Created');
  });

  it('should handle DELETE_TODO action', () => {
    const existingTask = { ...taskTemplate, id: '1' };
    const initialStateWithTasks: StateType = {
      ...initialState,
      tasks: [existingTask],
    };
    const action: ToDoAction = { type: 'DELETE_TODO', payload: '1' };
    const state = ideaReducer(initialStateWithTasks, action);

    expect(state.tasks.length).toBe(0);
    expect(state.isNewTask).toBe(false);
    expect(state.notification).toBe('Task Deleted');
  });

  it('should handle UPDATE_TODO action', () => {
    const existingTask = { ...taskTemplate, id: '1', title: 'Old Title' };
    const initialStateWithTasks: StateType = {
      ...initialState,
      tasks: [existingTask],
    };
    const updatedTask = { ...existingTask, title: 'New Title' };
    const action: ToDoAction = { type: 'UPDATE_TODO', payload: updatedTask };
    const state = ideaReducer(initialStateWithTasks, action);

    expect(state.tasks.length).toBe(1);
    expect(state.tasks[0].title).toBe('New Title');
    expect(state.isNewTask).toBe(false);
    expect(state.notification).toBe('Task Updated');
  });

  it('should handle createdAtAsc SORT_TODO action', () => {
    const task1 = {
      ...taskTemplate,
      id: '1',
      title: 'Task 1',
      createdAt: new Date(2022, 1, 1),
    };
    const task2 = {
      ...taskTemplate,
      id: '2',
      title: 'Task 2',
      createdAt: new Date(2021, 1, 1),
    };
    const task3 = {
      ...taskTemplate,
      id: '3',
      title: 'Task 3',
      createdAt: new Date(2023, 1, 1),
    };
    const initialStateWithTasks: StateType = {
      ...initialState,
      tasks: [task1, task2, task3],
    };
    const action: ToDoAction = { type: 'SORT_TODO', payload: 'createdAtAsc' };
    const state = ideaReducer(initialStateWithTasks, action);

    expect(state.tasks.length).toBe(3);
    expect(state.tasks[0].id).toBe('2');
    expect(state.tasks[1].id).toBe('1');
    expect(state.tasks[2].id).toBe('3');
    expect(state.isNewTask).toBe(false);
    expect(state.notification).toBe('Tasks Sorted');
  });

  it('should handle createdAtDesc SORT_TODO action', () => {
    const task1 = {
      ...taskTemplate,
      id: '1',
      title: 'Task 1',
      createdAt: new Date(2022, 1, 1),
    };
    const task2 = {
      ...taskTemplate,
      id: '2',
      title: 'Task 2',
      createdAt: new Date(2021, 1, 1),
    };
    const task3 = {
      ...taskTemplate,
      id: '3',
      title: 'Task 3',
      createdAt: new Date(2023, 1, 1),
    };
    const initialStateWithTasks: StateType = {
      ...initialState,
      tasks: [task1, task2, task3],
    };
    const action: ToDoAction = { type: 'SORT_TODO', payload: 'createdAtDesc' };
    const state = ideaReducer(initialStateWithTasks, action);

    expect(state.tasks.length).toBe(3);
    expect(state.tasks[0].id).toBe('3');
    expect(state.tasks[1].id).toBe('1');
    expect(state.tasks[2].id).toBe('2');
    expect(state.isNewTask).toBe(false);
    expect(state.notification).toBe('Tasks Sorted');
  });

  it('should handle titleAsc SORT_TODO action', () => {
    const task1 = {
      ...taskTemplate,
      id: '1',
      title: 'B Task',
      createdAt: new Date(2022, 1, 1),
    };
    const task2 = {
      ...taskTemplate,
      id: '2',
      title: 'A Task',
      createdAt: new Date(2021, 1, 1),
    };
    const task3 = {
      ...taskTemplate,
      id: '3',
      title: 'C Task',
      createdAt: new Date(2023, 1, 1),
    };
    const initialStateWithTasks: StateType = {
      ...initialState,
      tasks: [task1, task2, task3],
    };
    const action: ToDoAction = {
      type: 'SORT_TODO',
      payload: 'titleAsc',
    };
    const state = ideaReducer(initialStateWithTasks, action);

    expect(state.tasks.length).toBe(3);
    expect(state.tasks[0].id).toBe('2');
    expect(state.tasks[1].id).toBe('1');
    expect(state.tasks[2].id).toBe('3');
    expect(state.isNewTask).toBe(false);
    expect(state.notification).toBe('Tasks Sorted');
  });

  it('should handle titleDesc SORT_TODO action', () => {
    const task1 = {
      ...taskTemplate,
      id: '1',
      title: 'B Task',
      createdAt: new Date(2022, 1, 1),
    };
    const task2 = {
      ...taskTemplate,
      id: '2',
      title: 'A Task',
      createdAt: new Date(2021, 1, 1),
    };
    const task3 = {
      ...taskTemplate,
      id: '3',
      title: 'C Task',
      createdAt: new Date(2023, 1, 1),
    };
    const initialStateWithTasks: StateType = {
      ...initialState,
      tasks: [task1, task2, task3],
    };
    const action: ToDoAction = {
      type: 'SORT_TODO',
      payload: 'titleDesc',
    };
    const state = ideaReducer(initialStateWithTasks, action);

    expect(state.tasks.length).toBe(3);
    expect(state.tasks[0].id).toBe('3');
    expect(state.tasks[1].id).toBe('1');
    expect(state.tasks[2].id).toBe('2');
    expect(state.isNewTask).toBe(false);
    expect(state.notification).toBe('Tasks Sorted');
  });

  it('should handle CLEAR_NOTIFICATION action', () => {
    const existingTask = { ...taskTemplate, id: '1' };
    const initialStateWithTasks: StateType = {
      ...initialState,
      tasks: [existingTask],
      notification: 'Test Notification',
    };
    const action: ToDoAction = { type: 'CLEAR_NOTIFICATION' };
    const state = ideaReducer(initialStateWithTasks, action);

    expect(state.tasks.length).toBe(1);
    expect(state.isNewTask).toBe(false);
    expect(state.notification).toBe('');
  });

  it('should return the initial state for unknown action types', () => {
    const action: ToDoAction = { type: 'UNKNOWN_ACTION' } as any;
    const state = ideaReducer(initialState, action);

    expect(state).toBe(initialState);
  });
});
