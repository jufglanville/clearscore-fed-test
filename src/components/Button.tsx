import styled from 'styled-components'

import { TiDelete } from 'react-icons/ti'
import { BiSave } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'

type ButtonType = 'edit' | 'save' | 'delete'

type Icon = {
  icon: JSX.Element
  color: string
}

type IconMap = {
  [key in ButtonType]: Icon
}

interface Props {
  type: ButtonType
  onClick: (type: ButtonType) => void
}

const iconMap: IconMap = {
  edit: {
    icon: <FaEdit />,
    color: 'grey',
  },
  save: {
    icon: <BiSave />,
    color: 'green',
  },
  delete: {
    icon: <TiDelete />,
    color: 'red',
  },
}

const Button = ({type, onClick}: Props) => {
  return (
    <Btn $type={type} onClick={() => onClick(type)}>{iconMap[type].icon}</Btn>
  )
}

const Btn = styled.button<{ $type?: ButtonType}>`
  background: transparent;
  outline: none;
  cursor: pointer;
  color: ${({ $type }) => $type ? iconMap[$type].color : 'inherit'};
  font-size: 2rem;
`;

export default Button