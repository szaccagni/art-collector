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
    setShowBoardComponent('index')
    setActive('index')
  }, [user])

  async function getBoards() {
    const userBoards = user ? await boardAPI.getBoards() : []
    setBoards(userBoards)
  }

  async function addBoard(newBoard) {
    const res = await boardAPI.addBoard(newBoard)
    if (res) {
      showBoard(res)
    }
    setActive('')
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

  async function deleteBoard(id) {
    await boardAPI.deleteBoard(id)
    getBoards()
    setShowBoardComponent('index')
  }

  async function getOneBoard(id) {
    const board = await boardAPI.getOneBoard(id)
    setCurBoard(board)
  }

  const boardFunctions = {
    getBoards: getBoards,
    addBoard: addBoard,
    showBoard: showBoard,
    updateBoard: updateBoard,
    deleteBoard: deleteBoard,
    getOneBoard: getOneBoard
  }

  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} active={active} setActive={setActive} setShowBoardComponent={setShowBoardComponent} boardFunctions={boardFunctions}/>
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


