import React, { Component } from 'react';
import { authenticate, deAuthenticate } from './Auth'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      authenticated: false
    }
  }

  handleLogin(e) {
    e.preventDefault();
    authenticate(this.state.email, this.state.password).then(resp => {
      if (resp.authenticated === true) {
        this.setState({authenticated: true})
      } else {
        console.log(resp)
      }
    });
  }

  handleLogout() {
    deAuthenticate().then(() => {
      this.setState({authenticated: false})
    })
  }
  
  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render() {
    let user
    let loginForm
    if (this.state.authenticated === true) {
      user = JSON.parse(sessionStorage.getItem('credentials')).uid;
      loginForm = (
        <div>
          <p> Hello {user} </p>
          <button onClick={(e) => this.handleLogout()}>Logout</button>
        </div>
      )
    } else {
      loginForm = (
      <form>
          <div>
            <label >Email</label>
            <input onChange={this.onChange.bind(this)} id="email"></input>
          </div>

          <div>
            <label>Password</label>
            <input onChange={this.onChange.bind(this)} id="password"></input>
          </div>
          <button onClick={(e) => this.handleLogin(e)} id="submit">Submit</button>
        </form>
      )
    }

    return (
      <div>
        {loginForm}
      </div>
    );
  }
}

export default App;
