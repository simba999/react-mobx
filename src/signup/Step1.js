// react
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

// firebase
import fire from '../fire';
import firebase from 'firebase';

// components
import appState from '../appState'

// assets
import indicator1o3 from '../assets/indicator-1o3.svg'
import waveLogo from '../assets/images/logos/wave.png';

class Step1 extends Component {

	constructor(props) {
		super(props);
		this.state = {
			errors: {},
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({ [e.target.name]:e.target.value });
			if(e.target.name==='location') { setTimeout(()=>{
				this.locationOtherEl.focus()
			}, 80)
		}
	};

	handleSubmit(e) {
		e.preventDefault();

		let email = this.emailEl.value;
		let password = this.passwordEl.value;
		let firstName = this.firstNameEl.value;
		let lastName = this.lastNameEl.value;
		let phone = this.phoneEl.value;
		let dob = moment(this.dobEl.value).format('YYYY-MM-DD');
		let location = this.locationEl.value;
		if(location === 'Other') { location = this.locationOtherEl.value; }
		let username = this.firstNameEl.value.replace(/\s+/g, '').toLowerCase()+this.lastNameEl.value.replace(/\s+/g, '').toLowerCase();

		let isEmailValid = /.+@.+\..+/.test(email);

		let errors = {};
		firstName || (errors.firstName = `Please enter your first name`);
		lastName || (errors.lastName = `Please enter your last name`);
		isEmailValid || (errors.email = `Please enter a valid email address`);
		password.length>5 || (errors.password = `Please enter a password that contains at least six characters`);
		dob || (errors.dob = `Please enter your birth date`);
		appState.userMeta.userType || (errors.userType = "Please indicate whether you're a student or professional");
		location || (errors.location = `Please enter program location`);
		( !isNaN(phone) && phone.length>9 && phone.length<12 ) || (errors.phone = `Please enter a valid phone number`);

		let errorsCount = 0;
		for( let i in errors ) if(errors.hasOwnProperty(i)) errorsCount++;

		console.log('handleSubmit', firstName, lastName, email, phone, dob, appState.userMeta.userType, username, location);

		if (!errorsCount) {
			console.log('Creating user with email and password...');

			let credential = firebase.auth.EmailAuthProvider.credential(email, password);

			fire.auth().currentUser.link(credential).then( user => {
				console.log("Anonymous account successfully upgraded to one with email and password", user);

				/* Update user in database */
				// let userRef = fire.database().ref();

				let userDataUpdate = {};
				let userIntercomUpdate = {
					firstName, lastName, email, phone, dob, location, username,
					userType: appState.userMeta.userType,
					waveBatch: '2017-Q2-NYC',
					createdAt: moment().tz('America/New_York').format(),
					step1completed: true
				};

				userDataUpdate[`/users/${user.uid}/firstName`] = firstName;
				userDataUpdate[`/users/${user.uid}/lastName`] = lastName;
	      userDataUpdate[`/users/${user.uid}/email`] = email;
	      userDataUpdate[`/users/${user.uid}/phone`] = phone;
	      userDataUpdate[`/users/${user.uid}/dob`] = dob;
				userDataUpdate[`/users/${user.uid}/location`] = location;
	      userDataUpdate[`/users/${user.uid}/username`] = username;
				userDataUpdate[`/users/${user.uid}/createdAt`] = moment().tz('America/New_York').format();
				userDataUpdate[`/users/${user.uid}/waveBatch`] = '2017-Q2-NYC';
	      userDataUpdate[`/users/${user.uid}/userType`] = appState.userMeta.userType;
	      userDataUpdate[`/users/${user.uid}/step1completed`] = true;
				userDataUpdate[`/usernames/${username}`] = user.uid;
				// let userDataUpdate = { , , ,
				// 	userType: appState.userMeta.userType,
				// 	step1completed: true
				// };
				appState.userMeta.step1completed = true;
				/* If user provided a different email, save the previous email as `capturedEmail` property in his record */
				if( appState.userMeta.email && email !== appState.userMeta.email) {
					userDataUpdate.capturedEmail = appState.userMeta.email
				}
				appState.userMeta.email = email;
				/* 🔥 */
				fire.database().ref().update(userDataUpdate).then(()=> {
					/* User data saved to database -- move on to next step */
					appState.initIntercom(userIntercomUpdate)

					// WIP: Age Restriction Redirect
					if(appState.userMeta.userType === 'student' && !appState.userMeta.dobBypass && dob > moment().subtract(15, 'years').format('YYYY[-]MM[-]DD')) {
						browserHistory.push(`/wave/lt15`);
					} else if(appState.userMeta.userType === 'student' && !appState.userMeta.dobBypass && dob < moment().subtract(19, 'years').format('YYYY[-]MM[-]DD')) {
						browserHistory.push(`/wave/gt18`);
					} else {
						browserHistory.push(`/wave/signup/${appState.userMeta.userType}/2`);
					}

					// window.Intercom("update", userDataUpdate);


				}).catch( error => {
					/* Error saving user data to database */
					console.warn(`Error saving user data to database`);
				});

			}, error => { /* Error upgrading anonyous account to one with email and password */
				console.warn("Error upgrading anonymous account to one with email and password", error);
				this.setState({ errors: { email: 'Email is currently associated with another user. If this is you, please login above'} });
			});

		} else { /* User submitted the form with some fields filled incorrectly */
			console.log(`User's form errors:`, errorsCount, errors );
			this.setState({ errors });
			appState.userMeta.errorsCount = errorsCount;
		}
	}

	handleUserTypeChange(e) {
		appState.userMeta.userType = e.target.value
	}

	renderHelpBlock(fieldName){
		return this.state.errors[fieldName] ?
			<div className="help-block">{this.state.errors[fieldName]}</div> : ''
	}
	formGroupClass(fieldName){
		return `form-group` + ( this.state.errors[fieldName] ? ' has-error' : '' );
	}

	onUsernameChange(){
		let errors = Object.assign({}, this.state.errors);

		let newUsername = this.usernameEl.value;
		if(!newUsername || typeof newUsername!=='string' || newUsername.length < 5){
			errors.username = 'The username is too short';
			this.setState({ errors });
		} else {
			fire.database().ref(`/usernames/${newUsername}`).once('value', s => {
				if(s.val()){
					errors.username = 'Username is already taken!'
				} else {
					errors.username = '';
				}
				this.setState({ errors })
			})
		}
	}

	render() {

		if( appState.userMeta.step1completed ) {
			setTimeout(()=> browserHistory.push(`/wave/signup/${appState.userMeta.userType}/2`),100)
		}

		this.emailEl && appState.userMeta.email && (this.emailEl.value = appState.userMeta.email);
		this.firstNameEl && appState.userMeta.firstName && (this.firstNameEl.value = appState.userMeta.firstName);
		this.lastNameEl && appState.userMeta.lastName && (this.lastNameEl.value = appState.userMeta.lastName);
		this.phoneEl && appState.userMeta.phone && (this.phoneEl.value = appState.userMeta.phone);

		return (
			<section className='container'>

				<div className='row mt-20'>
					<img src={ waveLogo } className={ 'center-block img-responsive mt-30 mb-30'} style={{ maxHeight: 25 }} alt="#BUILTBYGIRLS Advisor Logo" />
				</div>

				<div className='progress-indicator-container'>
					<div className='row'>
					<div className='progress-indicator-graphic'>
							<div className='col-xs-2 col-sm-4 '></div>
							<div className='col-xs-8 col-sm-4 center'>
								<img src={ indicator1o3 } style={{ width: '100%', }} alt="Sign Up Progress 1 of 3" />
							</div>
						</div>
					</div>
					<div className='progress-indicator-text'>
						<div className='row'>
							<div className='col-sm-3'></div>
							<div className='col-sm-6 center'>
								<h4>1 of 3</h4>
							</div>
						</div>
					</div>
				</div>

				<div>
					<div className='signup-form-title'>
						<div className='row'>
							<div className='col-sm-2'></div>
							<div className='col-sm-8'>
								<h3>Have An Account?</h3>
									<div className='row'>
										<div className='col-sm-2'></div>
										<div className='col-sm-8'>
											<Link to="/wave/login" className='btn btn-default btn-block mt-30 mb-30' role='button'>Log In</Link>
										</div>
									</div>
								<hr></hr>
							</div>
						</div>
					</div>
				</div>

				<div className='signup-form-title'>
					<div className='row'>
						<div className='col-sm-3'></div>
						<div className='col-sm-6'>
							<h3>Sign Up</h3>
						</div>
					</div>
				</div>

				<div className='row signup-form-container'>
					<div className='col-sm-2'></div>
					<div className='col-sm-8'>
						<form onSubmit={this.handleSubmit} noValidate>
							<div className='form-item-container'>
								<div className={this.formGroupClass('firstName')}>
									<label htmlFor='inputFirstName'>First Name</label>
									<input className='form-control'
									maxLength={240}
									ref={ el=>this.firstNameEl = el }
									type='string'
									placeholder='' />
								{this.renderHelpBlock('firstName')}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('lastName')}>
									<label htmlFor='inputLastName'>Last Name</label>
									<input className='form-control'
									maxLength={240}
									ref={ el=>this.lastNameEl = el }
									type='string'
									placeholder='' />
								{this.renderHelpBlock('lastName')}
								</div>
							</div>

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

							<div className='form-item-container'>
								<div className={this.formGroupClass('phone')}>
									<label htmlFor='inputPhone'>Phone</label>
									<input className='form-control'
									maxLength={240}
									ref={ el=>this.phoneEl = el }
									type='tel'
									placeholder='' />
									{this.renderHelpBlock('phone')}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('dob')}>
									<label htmlFor='inputBirthday'>Birthday</label>
									<input className='form-control'
									maxLength={240}
									ref={ el=>this.dobEl = el }
									type='date'
									max='2005-01-01'
									placeholder='' />
									{this.renderHelpBlock('dob')}
								</div>
							</div>

							{/*<div className='form-item-container'>
								<div className={this.formGroupClass('username')}>
									<label htmlFor='inputUsername'>Username</label>
									<input className='form-control'
										onChange={this.onUsernameChange.bind(this)}
									maxLength={50}
									ref={ el=>this.usernameEl = el }
									type='string'
									placeholder='' />
								{this.renderHelpBlock('username')}
								</div>
							</div>*/}

							<div className='form-item-container'>
								<div className={this.formGroupClass('location')}>
									<label htmlFor='inputLocation'>
										Program Location
									</label>
									<select className="form-control" name='location' onChange={ this.handleChange } value={this.state.location} ref={ el=> this.locationEl = el }>
										<option value=""> -- select an option -- </option>
										<option value='New York City'>New York City</option>
										<optgroup label='Coming Soon'>
											<option value='Austin'>Austin</option>
											<option value='Boston'>Boston</option>
											<option value='Chicago'>Chicago</option>
											<option value='Los Angeles'>Los Angeles</option>
											<option value='San Francisco'>San Francisco</option>
											<option value='Washington DC'>Washington DC</option>
											<option value='Other'>Other</option>
										</optgroup>
									</select>
									<div className='' style={{ display: this.state.location==='Other'? 'block': 'none'  }}>
										<input
											type='text'
											className='form-control'
											ref={ el=> this.locationOtherEl = el }
											placeholder='Please enter location' />
									</div>

									{this.state.errors.location && <div className="help-block">{this.state.errors.location}</div>}
								</div>
							</div>

							{/* Radio: Student / Professional */}
							<div className='form-item-container'>
								<div className={this.formGroupClass('userType')}>
									<label className="radio-inline" htmlFor="type_stu">
										<input ref={ el=>this.studentEl = el }
										type='radio' name='userType'
										value="student"
										id="type_stu"
										onChange={this.handleUserTypeChange.bind(this)} />Student
									</label>
									<label className="radio-inline" htmlFor="type_pro">
										<input ref={ el=>this.professionalEl = el }
										type='radio' name='userType'
										value="professional"
										id="type_pro"
										onChange={this.handleUserTypeChange.bind(this)} />Professional
									</label>
									{this.renderHelpBlock('userType')}
								</div>
							</div>

							<div className='signup-form-btn-container'>
								<div className='row'>
									<div className='col-sm-2'></div>
									<div className='col-sm-8'>
										<input type='submit' className='btn btn-default btn-block' value='Next' formNoValidate/>
									</div>
								</div>
								{appState.userMeta.errorsCount > 0 &&
									<div className="onboarding-help-block">
										Please fill in missing information above.
									</div>
								}
							</div>
						</form>
					</div>
					<div className='col-sm-3'></div>
				</div>
			</section>
		);
	}
}

export default observer(Step1)
