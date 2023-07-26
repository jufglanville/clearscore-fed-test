import * as Sc from './styles';

interface Props {
  icon: string;
  style: 'add' | 'delete';
  onClick: () => void;
}

export const Button = ({ icon, style, onClick }: Props) => {
  return (
    <Sc.Button onClick={onClick}>
      <Sc.Icon src={icon} alt={style} />
    </Sc.Button>
  );
};
