import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar'
import SearchPage from '../SearchPage/SearchPage';
import NewBoardPage from '../NewBoardPage/NewBoardPage';

export default function App() {
  const [ user, setUser ] = useState(getUser())

  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <NewBoardPage />
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}


