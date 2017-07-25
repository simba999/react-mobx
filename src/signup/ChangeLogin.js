// react
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
// firebase
import fire from '../fire';

// components
import appState from '../appState'

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      email: '',
      requiresReAuth: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.getUserInfo();
  }

  componentWillUnMount() {
    this.getUserInfo();
  }
  getUserInfo() {
    const self = this;
    setTimeout(() => {
      const user = fire.auth().currentUser;
      if(user) {
        fire.database().ref(`users/${user.uid}`).once('value', (snap) => {
          if(snap.val()) {
            const {email} = snap.val();
            self.setState({
              email
            });
          }
        });
      }
    },1000);
  }
  handleSubmit(e) {
    e.preventDefault();
    const self = this;
    let email = this.emailEl.value;
    let password = this.passwordEl.value;

    let isEmailValid = /.+@.+\..+/.test(email);

    let errors = {};
    isEmailValid || (errors.email = `Please enter a valid email address`);
    password.length>5 || (errors.password = `Please enter a password that contains at least six characters`);

    const user = fire.auth().currentUser;

    if(email) {
      user.updateEmail(email).then(function() {
        // Update successful.
        if(password) {
          user.updatePassword(password).then(function() {
            // Update successful.
            fire.database().ref(`users/${user.uid}`).update({email})
              .then((response) => {
                browserHistory.push('/settings');
              })
              .catch(e => console.error(`error updating ${e}`));
          }, function(error) {
            error && error.message && self.setState({ errors: { password: error.message } });
            if(error.code === 'auth/requires-recent-login') {
                self.setState({
                  requiresReAuth: true
                });
            }
          });
        }
      }, function(error) {
        error && error.message && self.setState({ errors: { password: error.message } });
        if(error.code === 'auth/requires-recent-login') {
            self.setState({
              requiresReAuth: true
            });
        }
      });
    }

  }

  renderHelpBlock(fieldName){
    return this.state.errors[fieldName] ?
      <div className="help-block">{this.state.errors[fieldName]}</div> : ''
  }

  formGroupClass(fieldName){
    return `form-group` + ( this.state.errors[fieldName] ? ' has-error' : '' );
  }

  render() {

    this.emailEl && appState.userMeta.email && (this.emailEl.value = appState.userMeta.email);
    return (
      <section className='container'>

        <div className='signup-form-title mt-60'>
          <div className='row'>
            <div className='col-sm-3'></div>
            <div className='col-sm-6'>
              <h3>Account Settings</h3>
              <div className='divider-honey mt-20'></div>
            </div>
          </div>
        </div>

        <div className='mt-30 mb-30'><h4>Change Email & Password</h4></div>

        <div className='row signup-form-container'>
          <div className='col-sm-2'></div>
          <div className='col-sm-8'>
            <form onSubmit={this.handleSubmit} noValidate autoComplete={false}>
              <div className='form-item-container'>
                <div className={this.formGroupClass('email')}>
                  <label htmlFor='inputEmail'>Email</label>
                  <input formNoValidate className='form-control'
                  maxLength={240}
                  ref={ el=> this.emailEl = el }
                  type='email'
                  placeholder='' />
                  {this.renderHelpBlock('email')}
                </div>
              </div>

              <div className='form-item-container'>
                <div className={this.formGroupClass('password')}>
                  <label htmlFor='inputPassword'>New Password</label>
                  <input className='form-control'
                  maxLength={240}
                  ref={ el=>this.passwordEl = el }
                  type='password' placeholder='' />
                  {this.renderHelpBlock('password')}
                </div>
              </div>
              {this.state.requiresReAuth && <Link to="/wave/login?rdr=changelogin">Reauthenticate</Link>}

              <div className='signup-form-btn-container'>
                <div className='row'>
                  <div className='col-sm-3'></div>
                  <div className='col-sm-6'>
                    <input type='submit' className='btn btn-default btn-block' value='Save' formNoValidate/>
                  </div>

                </div>
              </div>
            </form>
          </div>
          <div className='col-sm-3'></div>
        </div>
      </section>
    );
  }
}

export default Settings;
