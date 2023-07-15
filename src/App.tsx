import styled from 'styled-components';
import { GlobalStyle } from './styled/global';
// import { ScHeading } from './styled/styled';

import CardList from './components/CardList/CardList';

function App() {
  return (
    <>
      <GlobalStyle />
      <ScBody>
        <ScHeading>Idea Board</ScHeading>
        <CardList />
      </ScBody>
    </>
  );
}

// Could this be added to the global styles on the body?
const ScBody = styled.div`
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  width: 100%;
  background:
    linear-gradient(45deg, rgb(26, 1, 117) 0%, rgba(225, 5, 34, 0) 70%) repeat
      scroll 0% 0%,
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

const ScHeading = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff8a;
  text-align: center;
`;

export default App;
