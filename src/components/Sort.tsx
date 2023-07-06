import { TaskContext } from '../context/IdeaContext';
import styled from 'styled-components';
import { SortType } from '../types';
import { useContext } from 'react';

const Sort = () => {
  const { sortTasks } = useContext(TaskContext);
  return (
    <ScContainer>
      <ScHeading>Sort</ScHeading>
      <ScSelect
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          sortTasks(e.target.value as SortType)
        }
      >
        <option value="createdAtDesc">Date: Newest to Oldest</option>
        <option value="createdAtAsc">Date: Oldest to Newest</option>
        <option value="titleAsc">Title: A to Z</option>
        <option value="titleDesc">Title: Z to A</option>
      </ScSelect>
      <ScChevron />
    </ScContainer>
  );
};

const ScContainer = styled.div`
  position: relative;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  overflow: hidden;
  height: 3rem;
`;

const ScHeading = styled.h2`
  margin: 0;
  padding: 1rem 0.5rem 1rem 1rem;
  border-right: 1px solid transparent;
  margin-right: 1px;
  background: #ffffff8a;
  line-height: 1;
`;

const ScSelect = styled.select`
  cursor: pointer;
  padding: 1rem 2rem 1rem 0.5rem;
  background: #ffffff8a;
`;

const ScChevron = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-right: 3px solid #9c27b052;
  border-bottom: 3px solid #9c27b052;
  right: 0.7rem;
  top: 1.05rem;
  transform: rotate(45deg);
`;

export default Sort;
