import './styles.css'

import Button from './components/Button'

type ButtonType = 'edit' | 'save' | 'delete'

function App() {

  const handleClick = (type: ButtonType) => {
    alert('clicked' + type);
  }

  const btnTypes: ButtonType[] = ['edit', 'save', 'delete']

  return (
    <>
    {btnTypes.map((btnType) => (
      <Button type={btnType} onClick={(type) => handleClick(type)} />
    ))}
    </>
  )
}

export default App
