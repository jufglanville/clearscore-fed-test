import styled from 'styled-components';

export const Flex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 3rem;

  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
`;
