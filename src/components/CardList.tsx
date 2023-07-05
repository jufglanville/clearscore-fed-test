import { useTask } from "../context/IdeaContext";
import styled from "styled-components";
import Card from "./Card";

const CardList = () => {
  const { tasks } = useTask();
  return (
    <Container>
      {tasks.map((task) => (
        <Card
          key={task.id}
          task={task}
        />
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
