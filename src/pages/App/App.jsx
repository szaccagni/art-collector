import './App.css';
import { useState, useEffect } from 'react'
import { getUser } from '../../utilities/users-service'
import * as boardAPI from '../../utilities/board-api'
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar'
import BoardPage from '../BoardPage/BoardPage';

export default function App() {
  const [ user, setUser ] = useState(getUser())
  const [ showBoardComponent, setShowBoardComponent ] = useState('')
  const [ boards, setBoards ] = useState([])
  const [ active, setActive ] = useState('')
  

  useEffect( function () {
    getBoards()
  }, [user])

  async function getBoards() {
    const userBoards = user ? await boardAPI.getBoards() : []
    setBoards(userBoards)
  }

  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} active={active} setActive={setActive} setShowBoardComponent={setShowBoardComponent} getBoards={getBoards}/>
          <BoardPage user={user} boards={boards} showBoardComponent={showBoardComponent} setShowBoardComponent={setShowBoardComponent} setActive={setActive} getBoards={getBoards}/>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}


