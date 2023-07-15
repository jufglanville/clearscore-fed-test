import styled from 'styled-components';

interface Props {
  icon: string;
  type: string;
  onClick: () => void;
}

const Button = ({ icon, type, onClick }: Props) => {
  return (
    <ScButton onClick={onClick}>
      <ScIcon src={icon} alt={type} />
    </ScButton>
  );
};

const ScButton = styled.button`
  line-height: 0;
  border-radius: 50%;
  cursor: pointer;
`;

const ScIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;

export default Button;
