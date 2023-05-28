import { Link, useNavigate } from 'react-router-dom'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser, active, setActive, getBoards}) {
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
        <nav className="NavBar">
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
                <div><Link to="" onClick={handleLogOut} className='nav-link'>Log Out</Link></div>
            </div>
        </nav>
    )
}