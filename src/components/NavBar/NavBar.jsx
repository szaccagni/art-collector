import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser, setShowBoardComponent}) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        <nav className="NavBar">
            <div><div>Welcome, {user.name}</div></div>
            <div>
                <div><a onClick={() => setShowBoardComponent('new board')}>Create a New Board</a></div>
                <div><Link to="" onClick={handleLogOut}>Log Out</Link></div>
            </div>
        </nav>
    )
}