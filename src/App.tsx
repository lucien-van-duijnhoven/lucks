import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Schedule } from './Schedule'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Schedule/>
    </div>
  )
}

export default App
