import { useState } from 'react'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hahn: Todo app</h1>
      <Button onClick={() => setCount(count + 1)}>Click me {count}</Button>
    </>
  )
}

export default App
