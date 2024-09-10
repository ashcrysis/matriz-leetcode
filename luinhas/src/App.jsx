import { useState } from 'react'
import './App.css'
import { useEffect, useState } from 'react'
import { getPokemons } from './Pokeservice'

function App() {
  const [count, setCount] = useState(0)

  useEffect (() => {
    getPokemons()
    .then()
  },[])

  return (
    <>
    <div className='primeiro'>
      <h1>Bem-vindo a Pokéapi Luinhas !</h1>
    </div>
    </>
  )
}

export default App
