import {useState} from 'react'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'

export default function AuthPage({ setUser }) {
    const [showSignUp, setShowSignUp] = useState(false)

    return (
        <main>
            <div className='form-container'>
                <div className='logo'><img src="/ART-COLLECTOR.png"></img></div>
                {showSignUp && <SignUpForm setUser={setUser} setShowSignUp={setShowSignUp} />}
                {!showSignUp && <LoginForm setUser={setUser} setShowSignUp={setShowSignUp} />}
            </div>
        </main>
    )
}