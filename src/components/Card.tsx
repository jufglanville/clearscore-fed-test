import { TaskContext } from '../context/IdeaContext';
import styled from 'styled-components';

import { InputType, TaskType } from '../types';
import deleteImg from '../assets/remove.png';

import Button from './Button';
import Input from './Input';
import { useContext } from 'react';

interface Props {
  task: TaskType;
}

const Card = ({ task }: Props) => {
  const { deleteTask, saveTask, state } = useContext(TaskContext);
  const { edit } = state;

  const handleChange = (type: InputType, value: string) => {
    saveTask({ ...task, [type.toLowerCase()]: value });
  };

  const formatDate = (date: Date) => {
    const format = new Date(date);
    return format.toLocaleDateString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <ScCardElement>
      <ScButtonContainer>
        <Button
          type="delete"
          icon={deleteImg}
          onClick={() => deleteTask(task.id)}
        />
      </ScButtonContainer>
      <ScTitleContainer>
        <Input
          type="Title"
          value={task.title}
          focus={edit.isEdit}
          onChange={val => handleChange('Title', val)}
        />
      </ScTitleContainer>
      <ScDescriptionContainer>
        <Input
          type="Description"
          maxLength={140}
          value={task.description}
          onChange={val => handleChange('Description', val)}
        />
      </ScDescriptionContainer>
      <ScDateDisplay>Last modified: {formatDate(task.createdAt)}</ScDateDisplay>
    </ScCardElement>
  );
};

const ScCardElement = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #ffffff8a;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const ScTitleContainer = styled.div`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ScDescriptionContainer = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 400;
`;

const ScDateDisplay = styled.p`
  align-self: flex-end;
  margin-top: auto;
  font-size: 0.8rem;
  font-style: italic;
  color: #000;
`;

const ScButtonContainer = styled.div`
  position: absolute;
  top: -1rem;
  right: -0.5rem;
  line-height: 0;
`;

export default Card;
