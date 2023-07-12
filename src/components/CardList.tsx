import { useReducer, useState } from 'react';
import styled from 'styled-components';

import { ideaReducer } from '../reducers/ideaReducer';
import { SortType, TaskType } from '../types';

import Card from './Card';
import Sort from './Sort';
import Notification from './Notification';
import Button from './Button';

import addImg from '../assets/plus.png';

// Get initial state from localStorage
const initialState: TaskType[] = JSON.parse(
  localStorage.getItem('tasks') || '[]',
);

const CardList = () => {
  const [state, dispatch] = useReducer(ideaReducer, initialState);
  const [notification, setNotification] = useState<string>('');
  // const [newTaskCreated, setNewTaskCreated] = useState<boolean>(false);

  const handleCreate = () => {
    dispatch({ type: 'CREATE_TODO' });
    setNotification('Task Created');
    // setNewTaskCreated(true);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
    setNotification('Task Deleted');
  };

  const handleSave = (task: TaskType) => {
    dispatch({ type: 'UPDATE_TODO', payload: task });
    setNotification('Task Saved');
  };

  const handleSort = (sort: SortType) => {
    dispatch({ type: 'SORT_TODO', payload: sort });
    setNotification('Tasks Sorted');
  };

  return (
    <>
      <ScFlex>
        <Sort onSort={handleSort} />
        <Button icon={addImg} type="add" onClick={handleCreate} />
      </ScFlex>
      <Notification
        notification={notification}
        clearNotification={() => setNotification('')}
      />
      <ScContainer>
        {state.map((task, index) => (
          <Card
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onSave={handleSave}
            // newTask={newTaskCreated && index === 0}
          />
        ))}
      </ScContainer>
    </>
  );
};

const ScContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 3rem;

  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
`;

const ScFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export default CardList;
