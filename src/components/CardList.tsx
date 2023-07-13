import { useReducer } from 'react';
import { ideaReducer } from '../reducers/ideaReducer';
import { SortType, TaskType, StateType } from '../types';

import { ScContainer, ScFlex } from '../styled/styled';
import addImg from '../assets/plus.png';

import Card from './Card';
import Sort from './Sort';
import Notification from './Notification';
import Button from './Button';

const initialState: StateType = {
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  notification: '',
  isNewTask: false,
};

const CardList = () => {
  const [state, dispatch] = useReducer(ideaReducer, initialState);

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
      <ScFlex>
        <Sort onSort={handleSort} />
        <Button icon={addImg} type="add" onClick={handleCreate} />
      </ScFlex>
      <Notification
        notification={state.notification}
        clearNotification={clearNotification}
      />
      <ScContainer>
        {state.tasks.map(task => (
          <Card
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onSave={handleSave}
            newTask={state.isNewTask}
          />
        ))}
      </ScContainer>
    </>
  );
};

export default CardList;
