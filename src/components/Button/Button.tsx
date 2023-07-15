import * as Sc from './styles';

interface Props {
  icon: string;
  type: string;
  onClick: () => void;
}

const Button = ({ icon, type, onClick }: Props) => {
  return (
    <Sc.Button onClick={onClick}>
      <Sc.Icon src={icon} alt={type} />
    </Sc.Button>
  );
};

export default Button;
