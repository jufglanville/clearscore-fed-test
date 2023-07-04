import { useState } from "react";
import styled from "styled-components";

import { InputType, TaskType } from "../types";
import deleteImg from "../assets/remove.png";

import Button from "./Button";
import DateDisplay from "./DateDisplay";
import Input from "./Input";

interface Props {
  task: TaskType;
  onDelete: (id: string) => void;
  onSave: (task: TaskType) => void;
}

const Card = ({ task, onDelete, onSave }: Props) => {
  const [cardTask, setCardTask] = useState(task);

  const handleChange = (type: InputType, value: string) => {
    const newTask = { ...cardTask, [type.toLowerCase()]: value };
    setCardTask(newTask);
    onSave(newTask);
  };

  return (
    <CardElement>
      <ButtonContainer>
        <Button
          type="delete"
          icon={deleteImg}
          onClick={() => onDelete(cardTask.id)}
        />
      </ButtonContainer>
      <TitleContainer>
        <Input
          type="Title"
          value={cardTask.title}
          focus={true}
          onChange={(val) => handleChange("Title", val)}
        />
      </TitleContainer>
      <DescriptionContainer>
        <Input
          type="Description"
          maxLength={140}
          value={cardTask.description}
          onChange={(val) => handleChange("Description", val)}
        />
      </DescriptionContainer>
      <DateContainer>
        <DateDisplay date={cardTask.createdAt} />
      </DateContainer>
    </CardElement>
  );
};

const CardElement = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #ffffff8a;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const TitleContainer = styled.div`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const DescriptionContainer = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 400;
`;

const DateContainer = styled.div`
  align-self: flex-end;
  margin-top: auto;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: -1rem;
  right: -0.5rem;
  line-height: 0;
`;

export default Card;
