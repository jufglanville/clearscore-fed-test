import { useReducer } from 'react';
import { cardListReducer } from './CardListReducer';
import { SortType, TaskType, StateType } from '../../types';

import * as Sc from './styles';
import addImg from '../../assets/plus.png';

import Card from '../Card/Card';
import Sort from '../Sort/Sort';
import Notification from '../Notification/Notification';
import Button from '../Button/Button';

const initialState: StateType = {
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  notification: '',
  isNewTask: false,
};

const CardList = () => {
  const [state, dispatch] = useReducer(cardListReducer, initialState);

  const handleCreate = () => {
    dispatch({ type: 'CREATE_TODO' });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const handleSave = (task: TaskType) => {
    dispatch({ type: 'UPDATE_TODO', payload: task });
  };

  const handleSort = (sort: SortType) => {
    dispatch({ type: 'SORT_TODO', payload: sort });
  };

  const clearNotification = () => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  };

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
