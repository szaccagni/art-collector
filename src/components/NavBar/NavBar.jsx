import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        <nav className="NavBar">
            <div>Welcome, {user.name}</div>
            <div><Link to="" onClick={handleLogOut}>Log Out</Link></div>
        </nav>
    )
}