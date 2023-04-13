import { Link } from 'react-router-dom'
import { useState } from 'react'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser, active, setActive, setShowBoardComponent, boardFunctions}) {
    const activeStyle = {
        textDecoration: 'underline',
        color: 'var(--dark-green)',
        fontFamily: 'proxima-nova-b',
        fontSize: '20px'
    }

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    function handleClick(el) {
        setActive(el)
        setShowBoardComponent(el)
        boardFunctions.getBoards()
    }

    return (
        <nav className="NavBar">
            <div className='welcome'><div>Welcome, {user.name}</div></div>
            <div>
                <div>
                    <a onClick={() => handleClick('index')} className='nav-link'  
                        style={ active === 'index' ?  activeStyle : {} }>Boards</a>
                </div>
                <div>
                    <a onClick={() => handleClick('new board')} className='nav-link'
                        style={ active === 'new board' ? activeStyle : {} }>New Board</a>
                </div>
                <div><Link to="" onClick={handleLogOut} className='nav-link'>Log Out</Link></div>
            </div>
        </nav>
    )
}