import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import * as boardAPI from '../../utilities/board-api'
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar'
import SearchPage from '../SearchPage/SearchPage';
import NewBoardForm from '../../components/NewBoardForm/NewBoardForm';
import BoardsIndex from '../../components/BoardsIndex/BoardsIndex';

export default function App() {
  const [ user, setUser ] = useState(getUser())
  const [ boards, setBoards ] = useState([])

  useEffect( function () {
    async function getBoards() {
      const userBoards = await boardAPI.getBoards()
      setBoards(userBoards)
    }
    getBoards()
  }, [user])

  async function addBoard(newBoard) {
    await boardAPI.addBoard(newBoard)
  }

  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/boards/new" element={<NewBoardForm />}></Route>
            <Route path="/boards/" element={<BoardsIndex boards={boards}/>}></Route>
            <Route path="/*" element={<Navigate to="/boards" />}></Route>
          </Routes>
          {/* <NewBoardForm user={user} addBoard={addBoard} /> */}
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}


