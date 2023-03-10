import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import * as boardAPI from '../../utilities/board-api'
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar'
import BoardPage from '../BoardPage/BoardPage';

export default function App() {
  const [ user, setUser ] = useState(getUser())
  const [ showBoardComponent, setShowBoardComponent ] = useState('index')
  const [ boards, setBoards ] = useState([])
  const [ curBoard, setCurBoard ] = useState('')
  const [ active, setActive ] = useState('index')

  useEffect( function () {
    getBoards()
  }, [user])

  async function getBoards() {
    const userBoards = await boardAPI.getBoards()
    setBoards(userBoards)
  }

  async function addBoard(newBoard) {
    const res = await boardAPI.addBoard(newBoard)
    if (res) {
      showBoard(res)
    }
    getBoards()
  }

  function showBoard(board) {
    setCurBoard(board)
    setShowBoardComponent('board deatil')
  }

  async function updateBoard(board) {
    const res = await boardAPI.updateBoard(board._id, board)
    if (res) {
      showBoard(res)
    }
    getBoards()
  }

  const boardFunctions = {
    addBoard: addBoard,
    showBoard: showBoard,
    updateBoard: updateBoard
  }

  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} active={active} setActive={setActive} setShowBoardComponent={setShowBoardComponent} />
          <Routes>
            <Route path="/boards/" element={<BoardPage user={user} boards={boards} showBoardComponent={showBoardComponent} curBoard={curBoard} showBoard={showBoard} setActive={setActive} boardFunctions={boardFunctions}/>}></Route>
            <Route path="/*" element={<Navigate to="/boards" />}></Route>
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}


