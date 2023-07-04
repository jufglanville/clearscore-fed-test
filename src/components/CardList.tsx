import styled from "styled-components";
import Card from "./Card";
import { TaskType } from "../types";

interface Props {
  tasks: TaskType[];
  onDelete: (id: string) => void;
  onSave: (task: TaskType) => void;
}

const CardList = ({ tasks, onDelete, onSave }: Props) => {
  return (
    <Container>
      {tasks.map((task) => (
        <Card key={task.id} task={task} onDelete={onDelete} onSave={onSave} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 3rem;

  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
`;

export default CardList;
