import { TaskContext } from '../context/IdeaContext';
import styled from 'styled-components';
import Card from './Card';
import { useContext } from 'react';

const CardList = () => {
  const { state } = useContext(TaskContext);
  const { tasks } = state;

  return (
    <ScContainer>
      {tasks.map(task => (
        <Card key={task.id} task={task} />
      ))}
    </ScContainer>
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

export default CardList;
