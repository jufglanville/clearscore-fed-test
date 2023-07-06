import styled from 'styled-components';

interface Props {
  date: Date;
}

const DateDisplay = ({ date }: Props) => {
  const formatDate = (date: Date) => {
    const format = new Date(date);
    return format.toLocaleDateString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return <ScDateElement>Last modified: {formatDate(date)}</ScDateElement>;
};

const ScDateElement = styled.p`
  font-size: 0.8rem;
  font-style: italic;
  color: #000;
`;

export default DateDisplay;
