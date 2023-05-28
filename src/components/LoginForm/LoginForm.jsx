import './LoginForm.css'
import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser, setShowSignUp }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div className='login-form-container'>
      <div className='logo'><img src="/ART-COLLECTOR.png"></img></div>
      <div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input type="text" name="email" value={credentials.email} onChange={handleChange} placeholder='email'required />
          <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder='password' required />
          <button className='btn' type="submit">LOG IN</button>
        </form>
        <p className="error-message">&nbsp;{error}</p>
      </div>
      <div className='sign-up-container'>
        <div>DON'T HAVE A ACCOUNT?</div>
        <button className='btn signup-btn'type="submit" onClick={() => setShowSignUp(true)}>SIGN UP</button>
      </div>
    </div>
  );
}