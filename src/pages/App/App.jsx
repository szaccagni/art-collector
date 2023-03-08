import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import * as boardAPI from '../../utilities/board-api'
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar'
import SearchPage from '../SearchPage/SearchPage';
import NewBoardForm from '../../components/NewBoardForm/NewBoardForm';

export default function App() {
  const [ user, setUser ] = useState(getUser())

  async function addBoard(newBoard) {
    await boardAPI.addBoard(newBoard)
  }

  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <NewBoardForm user={user} addBoard={addBoard} />
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}


