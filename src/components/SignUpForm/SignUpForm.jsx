import '../../pages/AuthPage/AuthPage.css'
import { Component } from 'react'
import { signUp } from '../../utilities/users-service'
import * as usersAPI from '../../utilities/users-api'
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';

export default class SignUpForm extends Component {
  state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      error: '',
      loading: ''
  }

  handleChange = (evt) => {
      this.setState({
          [evt.target.name]: evt.target.value,
          error: ''
      })
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    this.setState({ loading: true })
    const email = this.state.email
    const valid = await usersAPI.checkEmail(email)

    if (valid) {
      try {
        const formData = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }
        const user = await signUp(formData)
        this.props.setUser(user)
      } catch {
        this.setState({ error: 'Sign Up Failed - Try Again' })
      }
    } else {
      this.setState({ error: 'Sign Up Failed - Email Incorrect Format' })
      return;
    }
    this.props.setSignUpModalOpen(false);
    this.setState({ loading: false })
  } 

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className='form-container'>
        <div style={{textAlign: 'right', width: '100%', paddingRight: '15px', paddingTop: '10px'}}><CloseIcon onClick={() => this.props.setSignUpModalOpen(false)} sx={{cursor: 'pointer'}} /></div>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required placeholder='name'/>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder='email' required />
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder='password' required />
          <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} placeholder='confirm' required />
          <LoadingButton loading={this.state.loading} className='btn' type="submit" disabled={disable}>SIGN UP</LoadingButton>
        </form>
        <p className={this.state.error !== '' ? "error-message show" : "error-message"}>{this.state.error}</p>
      </div>
    );
  }
}