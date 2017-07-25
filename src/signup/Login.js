// react
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import { observer } from 'mobx-react';

// firebase
import fire from '../fire';
import firebase from 'firebase';

// components
import appState from '../appState'
import Footer from '../components/Footer';

// assets
import waveLogo from '../assets/images/logos/wave.png';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      rdrRoute: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(nextProps) {
    const { query } = this.props.location;
    if(query.rdr) {
      this.setState({
        rdrRoute: query.rdr
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const self = this;
    let email = this.emailEl.value;
    let password = this.passwordEl.value;
    const user = firebase.auth().currentUser;
    if(self.state.rdrRoute) {
      const credential = firebase.auth.EmailAuthProvider.credential(email, password);
      if(user) {
        user.reauthenticate(credential).then(function(response) {
          // User re-authenticated.
          location.assign(`/${self.state.rdrRoute}`);
        }, function(error) {
          error && error.message && this.setState({ errors: { password: error.message } });
        });
      }
    } else {
      fire.auth().signInWithEmailAndPassword(email, password).then( ()=> {
        // browserHistory.push('/wave');
          location.assign('/wave');
      }).catch( error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        error && error.message && this.setState({ errors: { password: 'Sorry, incorrect email or password.'} });
      });
    }
  }

  logout(e){
    e.preventDefault();

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      location.assign('/wave/login')
      console.log('Signed out');
    }, function(error) {
      // An error happened.
      console.warn('Error signing out:', error);
    });
  }


  renderHelpBlock(fieldName){
    return this.state.errors[fieldName] ?
      <div className="help-block">{this.state.errors[fieldName]}</div> : ''
  }
  formGroupClass(fieldName){
    return `form-group` + ( this.state.errors[fieldName] ? ' has-error' : '' );
  }

  render(){
    return (
      <div>
        <div className='bg-peach'>
          <section>
            <div className='container'>
              <div className='row'>
                <img src={ waveLogo } className={ 'center-block img-responsive mt-10 mb-30'} style={{ maxHeight: 25 }} alt="#BUILTBYGIRLS Advisor Logo" />
              </div>
            </div>
          </section>
        </div>

        <section className='container'>

          <div className='signup-form-title'>
            <div className='row'>
              <div className='col-sm-3'></div>
              <div className='col-sm-6'>
                <h3></h3>
              </div>
            </div>
          </div>

          <div className='row signup-form-container'>
            <div className='col-sm-2'></div>
            <div className='col-sm-8'>


              { !appState.user || (appState.user && appState.user.isAnonymous) || this.state.rdrRoute ?
                <form onSubmit={this.handleSubmit} noValidate>

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
                      <label htmlFor='inputPassword'>Password</label>
                      <input className='form-control'
                        maxLength={240}
                        ref={ el=>this.passwordEl = el }
                        type='password' placeholder='' />
                      {this.renderHelpBlock('password')}
                    </div>
                  </div>

                  <div className='signup-form-btn-container'>
                    <div className='row'>
                      <div className='col-sm-3'></div>
                      <div className='col-sm-6'>
                        <input type='submit' className='btn btn-default btn-block'
                          value={`${this.state.rdrRoute ? 'Login to Change': 'Login'}`} formNoValidate/>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-sm-12'>
                        <div>
                          <Link to={'/resetpassword'}>
                            <p className='mt-20 center'>Reset Password</p>
                            </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className='center'>Need help? <a href='mailto:info@builtbygirls.com' target='_blank'>Get in touch</a>.</p>
                </form> :
                <div>
                  Logged in as <strong>{appState.user && appState.user.email}</strong>
                  <div className='signup-form-btn-container'>
                    <div className='row'>
                      <div className='col-sm-6'>
                        <a onClick={this.logout.bind(this)} className='btn btn-default btn-block'>Logout</a>
                      </div>
                    </div>
                  </div>
                </div>
              }
          </div>
          <div className='col-sm-3'></div>

        </div>

      </section>
      <Footer />
    </div>
    )
  }

}

export default observer(withRouter(Login));
