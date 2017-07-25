import React, { Component } from 'react';
import { observer } from 'mobx-react';
import fire from '../fire';
import appState from '../appState';

class EmailCapture extends Component {
	constructor(props) {
		super(props);
		this.state = {
			justSubmitted: false, /* will be true for a short while for the particular EmailCapture that the user submitted */
			errors: []
		};
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('[EmailCapture: componentDidUpdate] justSubmitted:', this.state.justSubmitted);
		if (this.state.justSubmitted) {
			setTimeout(()=> { /* set the justSubmitted to false after 5 seconds, with the purpose of removing 'thank you' message */
				this.setState({ justSubmitted: false });
			}, 5000);
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log('[EmailCapture: handleSubmit]');

		let email = this.emailEl.value;

		let isEmailValid = /.+@.+\..+/.test(email);

		let errors = {};
		isEmailValid || (errors.email = `Please enter email`);
		appState.userMeta.userType || (errors.userType = `Please indicate whether you're a student or professional`);

		let errorsCount = 0;
		for( let i in errors ) if(errors.hasOwnProperty(i)) errorsCount++;

		if (!errorsCount) {
			console.log('SUBSCRIBE:', appState.userMeta.userType, email, appState.user.uid);
			appState.userMeta.email = email;

			this.setState({ justSubmitted: true });

			let userDataUpdate = {
				email,
				userType: appState.userMeta.userType,
				emailCapturePath: window.location.pathname,
			};

			fire.database().ref(`/users/${appState.user.uid}`).update(userDataUpdate).then(()=> {
				appState.initIntercom(userDataUpdate)
			});

		} else {
			console.warn('email is not valid', email);
			this.setState({ errors });
		}
	}

	handleUserTypeChange(e) {
		appState.userMeta.userType = e.target.value;
	}

	renderEmailCaptureForm() {
		let title = this.props.title || 'Join the most powerful #girlsquad in America.';
		let subhead = this.props.subhead || 'Visit cool tech companies, prep for your internship, and connect with boss advisors so you can get ahead of the game.';
		let cta = this.props.cta || 'Stay in the loop';


		return (
		 <section className='email-capture'>
			 <div className='email-capture-header'></div>
			 <div className='container'>
				 <div className='row'>
					 <div className='col-sm-3'></div>
					 <div className='col-sm-6'>
	 					<h3 className='email-capture-title mt-40'>{ title }</h3>
	 					<p className='center mt-20'>{ subhead }</p>
	 					<form onSubmit={this.handleSubmit.bind(this)}>
	 						<div className='form-group mt-20 mb-20'>
	 							<label className='sr-only' htmlFor='exampleInputEmail'>Your Email</label>
	 							<input ref={el=>this.emailEl = el} type='email' className='form-control' id='exampleInputEmail' placeholder='Your Email' />
								{this.state.errors.email ? <div className="help-block">{this.state.errors.email}</div> : ''}
	 						</div>

							<div className='radio-inline'>
	 							<label>
	 								<input type='radio' name='emailSignup' id='emailStudent' value='student' onChange={this.handleUserTypeChange.bind(this)} />
	 								Student
	 							</label>
	 						</div>
	 						<div className='radio-inline'>
	 							<label>
	 								<input type='radio' name='emailSignup' id='emailPro' value='professional' onChange={this.handleUserTypeChange.bind(this)} />
	 								Professional
	 							</label>
	 						</div>
							{this.state.errors.userType ? <div className="help-block">{this.state.errors.userType}</div> : ''}

	 						<input type='submit' className='btn btn-primary btn-block mt-20 mb-50' value={ cta } />
	 					</form>
					 </div>
				 </div>
			 </div>
			</section>
		);
	}

	render() {
		if (!appState.userMeta.email) {
			return this.renderEmailCaptureForm();
		}

		if (this.state.justSubmitted) {
			return (
				<section className='email-capture'>
				 <div className='email-capture-header'></div>
				 <div className='container'>
					 <div className='row'>
						 <div className='col-sm-3'></div>
						 <div className='col-sm-6'>
							<h3 className='email-capture-title mt-40'>Thank You for Signing Up!</h3>
							<p className='center mt-20'>We'll keep you up to date on the latest with #BUILTBYGIRLS programs and events.</p>
							<div className='email-capture-success'></div>
						 </div>
					 </div>
				 </div>
				</section>
			);
		}

		return <div></div>;
	}
}

export default observer(EmailCapture);
