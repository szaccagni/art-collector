import { Link, useNavigate } from 'react-router-dom'
import * as userService from '../../utilities/users-service' 
import {useState} from 'react'
import { Dialog, Box } from '@mui/material'
import LoginForm from '../../components/LoginForm/LoginForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import CloseIcon from '@mui/icons-material/Close';

export default function NavBar({ user, setUser, active, setActive, getBoards}) {
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const [signUpModalOpen, setSignUpModalOpen] = useState(false)
    const [aboutModalOpen, setAboutModalOpen] = useState(false)

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
                <>
                <div style={{display: 'flex', justifyContent: 'left', width: '20%'}}>
                    <Link to="" onClick={() => setAboutModalOpen(true)} className='nav-link'>About This Project</Link>
                </div>
                <div style={{display: 'flex', justifyContent: 'right', width: '80%'}}>
                    <div><Link to="" onClick={() => setLoginModalOpen(true)} className='nav-link'>Log In</Link></div>
                    <div><Link to="" onClick={() => setSignUpModalOpen(true)} className='nav-link'>Sign Up</Link></div>
                </div>
                </>
            }
            </nav>
            <Dialog onClose={() => setLoginModalOpen(false)} open={loginModalOpen}>
                <LoginForm setUser={setUser} setLoginModalOpen={setLoginModalOpen}/>
            </Dialog>
            <Dialog onClose={() => setSignUpModalOpen(false)} open={signUpModalOpen}>
                <SignUpForm setUser={setUser} setSignUpModalOpen={setSignUpModalOpen}/>
            </Dialog>
            <Dialog onClose={() => setAboutModalOpen(false)} open={aboutModalOpen}>
                <Box style={{textAlign: 'right', paddingRight: '15px', paddingTop: '10px'}}><CloseIcon onClick={() => setAboutModalOpen(false)} sx={{cursor: 'pointer'}} /></Box>
                <Box sx={{padding: ' 15px 25px 25px 25px'}}>
                    <Box>
                        This project, Art Collector, was submitted as my capstone project for General Assembly's software engineering immersive bootcamp. It is a MERN app built to show case the art of The Rijks Museum in Amsterdam and The Metropolitan Museum of Art in New York City. 
                    </Box>
                    <Box sx={{marginTop: '12px'}}>
                        This application is a work in progress. Read more about it <Link to="https://github.com/szaccagni/art-collector#readme" target='_blank'>here</Link> 
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}