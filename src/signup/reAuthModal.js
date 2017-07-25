// react
import React, { Component } from 'react';
import { Link } from 'react-router';
// firebase
import firebase from 'firebase';


class ReAuthModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			errors: {},
			isOpen: true,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const self =  this;
		const user = firebase.auth().currentUser;
		let email = this.emailEl.value;
		let password = this.passwordEl.value;
		const credential = firebase.auth.EmailAuthProvider.credential(email, password);
		if(user) {
			user.reauthenticate(credential).then(function(response) {
			  // User re-authenticated.
			  console.log('reauthenticated');
			  self.setState({ errors: {} });
			}, function(error) {
			  error && error.message && this.setState({ errors: { password: error.message } });
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

	render(){
		return (
			<div>
				<div className='row signup-form-container'>
					<div className='col-sm-2'></div>
					<div className='col-sm-8'>
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
						</form>
					</div>
				<div className='col-sm-3'></div>
			</div>
		</div>
		)
	}
}

export default ReAuthModal;
