import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ScFlex } from '../styled/styled';

import { InputType, TaskType } from '../types';
import deleteImg from '../assets/remove.png';

import Button from './Button';
import formatDate from '../utilities/date-formatter';

interface Props {
  task: TaskType;
  onDelete: (id: string) => void;
  onSave: (task: TaskType) => void;
}

const Card = ({ task, onDelete, onSave }: Props) => {
  const [showCharacterCount, setShowCharacterCount] = useState<boolean>(false);
  const { register, watch, getValues } = useForm<TaskType>({
    defaultValues: task,
  });

  const descriptionMaxLength = 140;
  const description = watch('description', task.description);
  const remainingCharacters = descriptionMaxLength - description.length;

  const handleFocus = () => {
    setShowCharacterCount(true);
  };

  const handleBlur = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setShowCharacterCount(false);
    // Check if entered value is different from the original
    const input = e.target.name as InputType;
    const newInputValue = getValues(input);
    if (task[input] === newInputValue) return;

    // If different, save the new value
    onSave({ ...task, [input]: newInputValue });
  };

  return (
    <ScCardElement>
      <ScButtonContainer>
        <Button
          icon={deleteImg}
          type="delete"
          onClick={() => onDelete(task.id)}
        />
      </ScButtonContainer>
      <ScTitleContainer
        rows={1}
        placeholder="Title"
        {...register('title')}
        onBlur={handleBlur}
        autoFocus={true}
      />
      <ScDescriptionContainer
        placeholder="Description"
        {...register('description')}
        onBlur={handleBlur}
        onFocus={handleFocus}
        maxLength={descriptionMaxLength}
      />
      <ScFlex>
        {showCharacterCount && <p>{remainingCharacters}</p>}
        <ScDateDisplay>{formatDate(task.createdAt)}</ScDateDisplay>
      </ScFlex>
    </ScCardElement>
  );
};

const ScCardElement = styled.form`
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

const ScTitleContainer = styled.textarea`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 0.5rem;
  padding: 0.5rem;
  &:focus {
    background: #ffffff66;
  }
`;

const ScDescriptionContainer = styled.textarea`
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 400;
  border-radius: 0.5rem;
  padding: 0.5rem;
  &:focus {
    background: #ffffff66;
  }
`;

const ScDateDisplay = styled.p`
  align-self: flex-end;
  margin-top: auto;
  margin-left: auto;
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
