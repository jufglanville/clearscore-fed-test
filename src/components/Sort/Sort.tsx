import { SortType } from '../../types';
import * as Sc from './styles';

interface Props {
  onSort: (sortType: SortType) => void;
}

const Sort = ({ onSort }: Props) => {
  return (
    <Sc.Container>
      <Sc.Heading>Sort</Sc.Heading>
      <Sc.Select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onSort(e.target.value as SortType)
        }
      >
        <option value="createdAtDesc">Date: Newest to Oldest</option>
        <option value="createdAtAsc">Date: Oldest to Newest</option>
        <option value="titleAsc">Title: A to Z</option>
        <option value="titleDesc">Title: Z to A</option>
      </Sc.Select>
      <Sc.Chevron />
    </Sc.Container>
  );
};

export default Sort;
