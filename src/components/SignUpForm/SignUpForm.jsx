import './SignUpForm.css'

import { Component } from 'react'
import { signUp } from '../../utilities/users-service'

export default class SignUpForm extends Component {
  state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      error: ''
  }

  handleChange = (evt) => {
      this.setState({
          [evt.target.name]: evt.target.value,
          error: ''
      })
  }

  handleSubmit = async (evt) => {
      evt.preventDefault();
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
  } 

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className='signup-form-conainter'>
        <div>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required placeholder='name'/>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder='email' required />
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder='password' required />
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} placeholder='confirm' required />
            <button className='btn' type="submit" disabled={disable}>SIGN UP</button>
          </form>
          <p className="error-message">&nbsp;{this.state.error}</p>
        </div>
        <div className="login-container">
          <div>RETURNING USERS: </div>
          <button className='btn login-btn'type="submit" onClick={() => this.props.setShowSignUp(false)}>LOG IN</button>
        </div>
      </div>
    );
  }
}