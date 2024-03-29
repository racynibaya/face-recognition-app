import React from 'react';
import { Component } from 'react';
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
    };
  }
  onEmailChange = e => {
    this.setState({ signInEmail: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ signInPassword: e.target.value });
  };

  onSubmitSignin = () => {
    fetch('https://smart-brain-api-bqye.onrender.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          this.setState({ signInEmail: '', signInPassword: '' });
          alert(user);
        }
      })
      .catch(err => {
        console.log('Something went wrong');
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      // This is a tachyons form
      <article className='card br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='email'
                  name='email-address'
                  id='email-address'
                  value={this.state.signInEmail}
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='password'
                  id='password'
                  value={this.state.signInPassword}
                />
              </div>
            </fieldset>
            <div className=''>
              <input
                onClick={this.onSubmitSignin}
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Sign in'
              />
            </div>
            <div className='lh-copy mt3'>
              <p
                onClick={() => onRouteChange('register')}
                className='f6 link dim black db pointer'
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
