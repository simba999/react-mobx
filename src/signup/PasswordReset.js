// react
import React, { Component } from 'react';

// firebase
import fire from '../fire';

class PasswordReset extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      isOpen: true,
      resetStatus: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const self =  this;
    let email = this.emailEl.value;

    fire.auth().sendPasswordResetEmail(email).then(function() {
      // Email sent.
      self.setState({resetStatus: true, errors:{}})

      setTimeout(()=> {
				location.assign('/wave/login');
			}, 5000);


    }, function(error) {
        error && error.message && self.setState({ errors: { email: 'Email not recognized' } });
        console.log(error.message);
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
        <div className='container'>
        {this.state.resetStatus && <div className="alert alert-success center mt-10" role="alert">Password reset email has been sent.</div>}
          <h3 className='mt-30 mb-40'>Password Reset</h3>
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

            <div className='signup-form-btn-container'>
              <div className='row'>
                <div className='col-sm-3'></div>
                <div className='col-sm-6'>
                  <input type='submit' className='btn btn-default btn-block' value='Reset' formNoValidate/>
                </div>
              </div>
            </div>
          </form>

        </div>
    </div>
    )
  }
}

export default PasswordReset;
