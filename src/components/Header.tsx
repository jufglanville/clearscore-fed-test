import { TaskContext } from '../context/IdeaContext';
import styled from 'styled-components';

import Button from './Button';
import Sort from './Sort';
import addImg from '../assets/plus.png';
import { useContext } from 'react';

const Header = () => {
  const { addTask } = useContext(TaskContext);

  return (
    <header>
      <ScTitle>Idea Board</ScTitle>
      <ScContainer>
        <Sort />
        <Button icon={addImg} type="add" onClick={addTask} />
      </ScContainer>
    </header>
  );
};

const ScContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 500px) {
    flex-direction: column-reverse;
  }
`;

const ScTitle = styled.h1`
  text-align: center;
  font-weight: 700;
  color: #ffffff9e;
  font-size: 3rem;
`;

export default Header;
