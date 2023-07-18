import styled from 'styled-components';

export const Flex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Form = styled.form`
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

const TextArea = styled.textarea`
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  &:focus {
    background: #ffffff66;
  }
`;

export const TextAreaHeading = styled(TextArea)`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const TextAreaDescription = styled(TextArea)`
  font-size: 1rem;
  font-weight: 400;
`;

export const DateDisplay = styled.p`
  align-self: flex-end;
  margin-top: auto;
  margin-left: auto;
  font-size: 0.8rem;
  font-style: italic;
  color: #000;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: -1rem;
  right: -0.5rem;
  line-height: 0;
`;
