import { useTask } from "../context/IdeaContext";
import styled from "styled-components";

import Button from "./Button";
import Sort from "./Sort";
import addImg from "../assets/plus.png";

const Header = () => {
  const { addTask } = useTask();

  return (
    <HeaderElement>
      <Title>Idea Board</Title>
      <Container>
        <Sort />
        <Button icon={addImg} type="add" onClick={addTask} />
      </Container>
    </HeaderElement>
  );
};

const HeaderElement = styled.header``;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 500px) {
    flex-direction: column-reverse;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  color: #ffffff9e;
  font-size: 3rem;
`;

export default Header;
