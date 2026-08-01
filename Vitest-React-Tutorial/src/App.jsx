import { useState } from 'react'
import './App.css'
import Counter from '../components/Counter'
import Greetings from '../components/Greetings'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">

        <Counter />
        <Greetings name='Suvendu' />
      </section>
    </>
  )
}

export default App
