import styled from 'styled-components';

export const ScFlex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ScContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 3rem;

  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
`;

export const ScHeading = styled.h1`
  text-align: center;
  font-weight: 700;
  color: #ffffff9e;
  font-size: 3rem;
`;

export const ScForm = styled.form`
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

const ScTextArea = styled.textarea`
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  &:focus {
    background: #ffffff66;
  }
`;

export const ScTextAreaHeading = styled(ScTextArea)`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const ScTextAreaDescription = styled(ScTextArea)`
  font-size: 1rem;
  font-weight: 400;
`;
