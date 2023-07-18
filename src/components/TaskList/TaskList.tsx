import { useEffect, useReducer } from 'react';
import { taskListReducer } from './TaskListReducer';
import { SortType, TaskType, StateType } from '../../types';

import * as Sc from './styles';
import addImg from '../../assets/plus.png';

import Card from '../TaskCard/TaskCard';
import Sort from '../Sort/Sort';
import Notification from '../Notification/Notification';
import Button from '../Button/Button';

import { loadStateFromLocalStorage } from '../../utilities/localStorage';

const CardList = () => {
  const initialState: StateType = {
    tasks: [],
    notification: '',
    isNewTask: false,
  };

  const [state, dispatch] = useReducer(taskListReducer, initialState);

  const handleCreate = () => {
    dispatch({ type: 'CREATE_TASK' });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_TASK', taskId: id });
  };

  const handleSave = (task: TaskType) => {
    dispatch({ type: 'UPDATE_TASK', task: task });
  };

  const handleSort = (sort: SortType) => {
    dispatch({ type: 'SORT_TASK', sortType: sort });
  };

  const clearNotification = () => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  };

  useEffect(() => {
    const tasks = loadStateFromLocalStorage('tasks');

    if (tasks) {
      dispatch({ type: 'SET_TASKS', tasks: tasks });
    }
  }, []);

  return (
    <>
      <Sc.Flex>
        <Sort onSort={handleSort} />
        <Button icon={addImg} type="add" onClick={handleCreate} />
      </Sc.Flex>
      <Notification
        notification={state.notification}
        clearNotification={clearNotification}
      />
      <Sc.Container data-testid="card-list">
        {state.tasks.map(task => (
          <Card
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onSave={handleSave}
            newTask={state.isNewTask}
          />
        ))}
      </Sc.Container>
    </>
  );
};

export default CardList;
