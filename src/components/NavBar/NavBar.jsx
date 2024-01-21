import { Link, useNavigate } from 'react-router-dom'
import * as userService from '../../utilities/users-service' 
import {useState} from 'react'
import { Dialog } from '@mui/material'
import LoginForm from '../../components/LoginForm/LoginForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'

export default function NavBar({ user, setUser, active, setActive, getBoards}) {
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const [signUpModalOpen, setSignUpModalOpen] = useState(false)

    const activeStyle = {
        textDecoration: 'underline',
        color: 'var(--dark-green)',
        fontFamily: 'proxima-nova-b',
        fontSize: '20px'
    }

    const navigate = useNavigate()

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    function handleClick(el) {
        setActive(el)
        getBoards()
        // el === 'index' ? navigate('/boards') : navigate('/boards/new')
        navigate(`/boards/${el}`)
    }

    return (
        <>
            <nav className="NavBar">
                {user ? 
                <>
                <div className='welcome'><div>Welcome, {user.name}</div></div>
                <div>
                    <div>
                        <button onClick={() => handleClick('all')} className='nav-link'  
                            style={ active === 'all' ?  activeStyle : {} }>Boards</button>
                    </div>
                    <div>
                        <button onClick={() => handleClick('new')} className='nav-link'
                            style={ active === 'new' ? activeStyle : {} }>New Board</button>
                    </div>
                    <div>
                    <button onClick={handleLogOut} className='nav-link'>Log Out</button>
                    </div>
                </div>
                </>
                :
                <div style={{display: 'flex', justifyContent: 'right', width: '100%'}}>
                    <div><Link to="" onClick={() => setLoginModalOpen(true)} className='nav-link'>Log In</Link></div>
                    <div><Link to="" onClick={() => setSignUpModalOpen(true)} className='nav-link'>Sign Up</Link></div>
                </div>
            }
            </nav>
            <Dialog onClose={() => setLoginModalOpen(false)} open={loginModalOpen}>
                <LoginForm setUser={setUser} setLoginModalOpen={setLoginModalOpen}/>
            </Dialog>
            <Dialog onClose={() => setSignUpModalOpen(false)} open={signUpModalOpen}>
                <SignUpForm setUser={setUser} setSignUpModalOpen={setSignUpModalOpen}/>
            </Dialog>
        </>
    )
}