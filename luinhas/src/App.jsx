import './App.css'
import { useEffect, useState } from 'react'
import { getPokemons } from './Pokeservice'

function App() {
  const [pokemons, setPokemons] = useState([])

  useEffect (() => {
    getPokemons()
    .then(data => setPokemons(data.map(d => d.name)));
  },[])

  return (
    <>
    <div className='primeiro'>
      <h1>Bem-vindo a Pokéapi Luinhas !</h1>
    </div>
    { pokemons.map(p => <p>{p}</p>) }
    </>
  )
}

export default App
