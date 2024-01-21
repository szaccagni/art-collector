import '../../pages/AuthPage/AuthPage.css'
import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import CloseIcon from '@mui/icons-material/Close';

export default function LoginForm({ setUser, setLoginModalOpen }) {
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
      return;
    }
    setLoginModalOpen(false);
  }

  return (
    <>
      <div className='form-container'>
        <div style={{textAlign: 'right', width: '100%', paddingRight: '15px', paddingTop: '10px'}}><CloseIcon onClick={() => setLoginModalOpen(false)} sx={{cursor: 'pointer'}} /></div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input type="text" name="email" value={credentials.email} onChange={handleChange} placeholder='email'required />
          <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder='password' required />
          <button className='btn' type="submit">LOG IN</button>
        </form>
        <p className={error !== '' ? "error-message show" : "error-message"}>{error}</p>
      </div>
    </>
  );
}