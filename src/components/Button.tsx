import styled from "styled-components";

interface Props {
  icon: string;
  type: string;
  onClick?: () => void;
}

const Button = ({ icon, type, onClick }: Props) => {
  return (
    <Btn onClick={onClick}>
      <Icon src={icon} alt={type} />
    </Btn>
  );
};

const Btn = styled.button`
  line-height: 0;
  border-radius: 50%;
  cursor: pointer;
`;

const Icon = styled.img<{ $color?: string }>`
  width: 2rem;
  height: 2rem;
`;

export default Button;
