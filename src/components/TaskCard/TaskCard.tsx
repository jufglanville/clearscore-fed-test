import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Sc from './styles';

import { InputType, TaskType } from '../../types';
import deleteImg from '../../assets/remove.png';

import { Button } from '../Button/Button';
import formatDate from '../../utilities/dateFormatter';

interface Props {
  task: TaskType;
  newTask?: boolean;
  onDelete: (id: string) => void;
  onSave: (task: TaskType) => void;
}
const descriptionMaxLength = 140;

export const TaskCard = ({ task, newTask, onDelete, onSave }: Props) => {
  const [showCharacterCount, setShowCharacterCount] = useState<boolean>(false);
  const { register, getValues, watch } = useForm<TaskType>();
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
    <Sc.Card>
      <Sc.ButtonContainer>
        <Button
          icon={deleteImg}
          style="delete"
          onClick={() => onDelete(task.id)}
        />
      </Sc.ButtonContainer>
      <Sc.Form>
        <Sc.TextAreaHeading
          defaultValue={task.title}
          rows={1}
          placeholder="Title"
          {...register('title')}
          onBlur={handleSave}
          autoFocus={newTask}
        />
        <Sc.TextAreaDescription
          defaultValue={task.description}
          placeholder="Description"
          {...register('description')}
          onBlur={handleSave}
          onFocus={handleFocus}
          maxLength={descriptionMaxLength}
        />
        <Sc.Flex>
          {showCharacterCount && <span>{remainingCharacters}</span>}
          <Sc.DateDisplay>{formatDate(task.createdAt)}</Sc.DateDisplay>
        </Sc.Flex>
      </Sc.Form>
    </Sc.Card>
  );
};
