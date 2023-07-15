import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import {
  ScFlex,
  ScForm,
  ScTextAreaHeading,
  ScTextAreaDescription,
} from '../styled/styled';

import { InputType, TaskType } from '../types';
import deleteImg from '../assets/remove.png';

import Button from './Button';
import formatDate from '../utilities/dateFormatter';

interface Props {
  task: TaskType;
  newTask?: boolean;
  onDelete: (id: string) => void;
  onSave: (task: TaskType) => void;
}
const descriptionMaxLength = 140;

const Card = ({ task, newTask, onDelete, onSave }: Props) => {
  const [showCharacterCount, setShowCharacterCount] = useState<boolean>(false);
  const { register, getValues, watch } = useForm<TaskType>({
    defaultValues: task,
  });
  const description = watch('description', task.description);
  const remainingCharacters = descriptionMaxLength - description.length;

  const handleFocus = () => {
    setShowCharacterCount(true);
  };

  const handleSave = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setShowCharacterCount(false);
    const input = e.target.name as InputType;
    const newInputValue = getValues(input);

    // Check if entered value is different from the original
    if (task[input] !== newInputValue) {
      onSave({ ...task, [input]: newInputValue });
    }
  };

  return (
    <ScForm>
      <ScButtonContainer>
        <Button
          icon={deleteImg}
          type="delete"
          onClick={() => onDelete(task.id)}
        />
      </ScButtonContainer>
      <ScTextAreaHeading
        rows={1}
        placeholder="Title"
        {...register('title')}
        onBlur={handleSave}
        autoFocus={newTask}
      />
      <ScTextAreaDescription
        placeholder="Description"
        {...register('description')}
        onBlur={handleSave}
        onFocus={handleFocus}
        maxLength={descriptionMaxLength}
      />
      <ScFlex>
        {showCharacterCount && <span>{remainingCharacters}</span>}
        <ScDateDisplay>{formatDate(task.createdAt)}</ScDateDisplay>
      </ScFlex>
    </ScForm>
  );
};

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
