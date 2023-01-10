import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { New } from './New'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      App works
      <New/>
    </div>
  )
}

export default App
