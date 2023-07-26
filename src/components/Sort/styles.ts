import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  overflow: hidden;
  height: 3rem;
  width: fit-content;
`;

export const Heading = styled.h2`
  margin: 0;
  padding: 1rem 0.5rem 1rem 1rem;
  border-right: 1px solid transparent;
  margin-right: 1px;
  background: #ffffff8a;
  line-height: 1;
`;

export const Select = styled.select`
  cursor: pointer;
  padding: 1rem 2rem 1rem 0.5rem;
  background: #ffffff8a;
`;

export const Chevron = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-right: 3px solid #9c27b052;
  border-bottom: 3px solid #9c27b052;
  right: 0.7rem;
  top: 1.05rem;
  transform: rotate(45deg);
`;
