import './App.css';
import { useState, useEffect } from 'react'
import { getUser } from '../../utilities/users-service'
import * as boardAPI from '../../utilities/board-api'
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar'
import BoardPage from '../BoardPage/BoardPage';

export default function App() {
  const [ user, setUser ] = useState(getUser())
  const [ boards, setBoards ] = useState([])
  const [ active, setActive ] = useState('')
  

  useEffect( function () {
    getBoards().catch(err => console.log('error loading boards: ', err))
  }, [user])

  async function getBoards() {
    const userBoards = user ? await boardAPI.getBoards() : []
    setBoards(userBoards)
  }

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} active={active} setActive={setActive} getBoards={getBoards}/>
      {
        user ? 
        <BoardPage user={user} boards={boards} setActive={setActive} getBoards={getBoards}/>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}


