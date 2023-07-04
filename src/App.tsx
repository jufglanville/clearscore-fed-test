import { useReducer } from "react";
import styled from "styled-components";

import "./styles.css";
import { reducer, ToDoAction } from "./hooks/ToDoReducer";
import { State, TaskType } from "./types";
import { Task } from "./utilities/task";
import addImg from "./assets/plus.png";

import CardList from "./components/CardList";
import Button from "./components/Button";
import Sort from "./components/Sort";
import Notification from "./components/Notification";

function App() {
  const savedState = localStorage.getItem("ideaBoardState");
  const initialState: State = savedState
    ? JSON.parse(savedState)
    : {
        tasks: [],
        edit: {
          isEdit: false,
          task: new Task() as TaskType,
        },
      };

  const [state, dispatch] = useReducer<React.Reducer<State, ToDoAction>>(
    reducer,
    initialState
  );

  return (
    <Body>
      <Notification
        notification={state.notification}
        clearNotification={() => dispatch({ type: "CLEAR_NOTIFICATION" })}
      />
      <header>
        <Title>Idea Board</Title>
        <Container>
          <Sort
            onSort={(sortBy) =>
              dispatch({ type: "SORT_TODO", payload: sortBy })
            }
          />
          <Button
            icon={addImg}
            type="add"
            onClick={() => dispatch({ type: "ADD_TODO" })}
          />
        </Container>
      </header>
      <CardList
        tasks={state.tasks}
        onDelete={(id) => dispatch({ type: "DELETE_TODO", payload: id })}
        onSave={(task) => dispatch({ type: "SAVE_TODO", payload: task })}
      />
    </Body>
  );
}

const Body = styled.div`
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(
        45deg,
        rgb(26, 1, 117) 0%,
        rgba(225, 5, 34, 0) 70%
      )
      repeat scroll 0% 0%,
    linear-gradient(135deg, rgb(225, 5, 152) 10%, rgba(49, 5, 209, 0) 80%)
      repeat scroll 0% 0%,
    linear-gradient(
        225deg,
        hsla(179, 81%, 45%, 1) 10%,
        rgba(10, 219, 216, 0) 80%
      )
      repeat scroll 0% 0%,
    rgba(0, 0, 0, 0)
      linear-gradient(315deg, rgb(189, 5, 245) 100%, rgba(9, 245, 5, 0) 70%)
      repeat scroll 0% 0%;
`;

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

export default App;
