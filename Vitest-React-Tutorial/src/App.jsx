import { useState } from 'react'
import './App.css'
import Counter from '../components/Counter'
import Greetings from '../components/Greetings'
import UserProfile from '../components/UserProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">

        <Counter />
        <Greetings name='Suvendu' />
        <UserProfile userId={4} />
      </section>
    </>
  )
}

export default App
