// react
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';

// firebase
import fire from '../fire';

// components
import appState from '../appState'

// assets
import waveLogo from '../assets/images/logos/wave.png';
import indicator3o3 from '../assets/indicator-3o3.svg'


class StudentStep3 extends Component {

	constructor(props) {
		super(props);
		this.state = {
			errors: {},
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		let guardianName = this.guardianNameEl.value;
		let guardianEmail = this.guardianEmailEl.value;
		let guardianPhone = this.guardianPhoneEl.value;
		let termsAccepted = this.termsAcceptedEl.checked;

		let errors = {};
		guardianName || (errors.guardianName = `Please enter guardian's name`);
		guardianEmail || (errors.guardianEmail = `Please enter guardian's email`);
		( !isNaN(guardianPhone) && guardianPhone.length>9 ) || (errors.guardianPhone = `Please enter guardian's phone`);
		termsAccepted || (errors.termsAccepted = `Please accept the legal terms`);

		let errorsCount = 0;
		for( let i in errors ) if(errors.hasOwnProperty(i)) errorsCount++;

		if (!errorsCount) {
			/* Update user in database */
			let userRef = fire.database().ref('/users/' + appState.user.uid);

			let userDataUpdate = { guardianName, guardianEmail, guardianPhone,
				step3completed: true
			};
			appState.userMeta.step3completed = true;
			appState.userMeta.errorsCount = errorsCount;

			/* 🔥 */
			userRef.update(userDataUpdate).then(()=>{
				/* User data saved to database -- move on to next step */
				appState.initIntercom(userDataUpdate);
				browserHistory.push(`/wave/signup/student/confirmation`);

				// window.Intercom("update", userDataUpdate);

			}).catch( error => {
				/* Error saving user data to database */
				console.warn(`Error saving user data to database`);
			});
		} else { /* User submitted the form with some fields filled incorrectly */
			console.log(`User's form errors:`, errorsCount, errors );
			this.setState({ errors: errors });
			appState.userMeta.errorsCount = errorsCount;
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

		if( appState.userMeta.step3completed ) {
			setTimeout(()=> browserHistory.push(`/wave/signup/student/confirmation`) ,100)
		}

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
								<img src={ indicator3o3 } style={{ width: '100%', }} alt="Sign Up Progress 3 of 3" />
							</div>
						</div>
					</div>
					<div className='progress-indicator-text'>
						<div className='row'>
							<div className='col-sm-3'></div>
							<div className='col-sm-6 center'>
								<h4>3 of 3</h4>
							</div>
						</div>
					</div>
				</div>

				<div className='signup-form-title'>
					<div className='row'>
						<div className='col-sm-3'></div>
						<div className='col-sm-6'>
							<h3>Parent/Guardian Info</h3>
						</div>
					</div>
				</div>

				<div className='row signup-form-container'>
					<div className='col-sm-2'></div>
					<div className='col-sm-8'>
						<p className='mt-10 mb-20'>
							To complete your onboarding, we'll send your parents an email about the program, asking for their approval via electronic signature. No need for you to do anything - we'll take it from here!
						</p>
						<form onSubmit={this.handleSubmit}>

							<div className='form-item-container'>
								<div className={this.formGroupClass('guardianName')}>
									<label htmlFor='inputGuardianName'>Parent/Guardian Name</label>
									<input className='form-control'
									maxLength={240}
									ref={ el=>this.guardianNameEl = el }
									type='string'
									placeholder='Full Name' />
									{this.renderHelpBlock('guardianName')}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('guardianEmail')}>
									<label htmlFor='inputGuardianEmail'>Parent/Guardian Email</label>
									<input className='form-control'
									maxLength={240}
									ref={ el=>this.guardianEmailEl = el }
									type='email'
									placeholder='Email' />
									{this.renderHelpBlock('guardianEmail')}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('guardianPhone')}>
									<label htmlFor='inputGuardianPhone'>Parent/Guardian Phone</label>
									<input className='form-control'
									maxLength={240}
									ref={ el=>this.guardianPhoneEl = el }
									type='tel'
									placeholder='Phone' />
									{this.renderHelpBlock('guardianPhone')}
								</div>
							</div>

							<br />
							<label>#BUILTBYGIRLS Advisor Platform rules, terms, conditions, and legal notices:</label>
							{termsContent()}
							<br />

							<div className={this.formGroupClass('termsAccepted')}>
								<div className="checkbox">
									<label htmlFor='inputTermsAccepted'>
										<input id='inputTermsAccepted'
										ref={ el=> this.termsAcceptedEl = el }
										type='checkbox' />
										By enrolling, you understand and agree to the terms and conditions of the #BUILTBYGIRLS Advisor Platform.
										{this.state.errors.termsAccepted ? <div className="help-block">{this.state.errors.termsAccepted}</div> : ''}
									</label>
								</div>
							</div>

							<div className='signup-form-btn-container'>
								<div className='row'>
									<div className='col-sm-6'>
										<input type='submit' className='btn btn-default btn-block' value='Sign Up' />
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


function termsContent(){
	return (
		<div id="legal-content" style={{overflowY: 'scroll', height:200, border:'1px solid #ccc', borderRadius:4, boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)', padding: '6px 12px'}}>
			<p>
			We’re pumped you’re joining us for the #BUILTBYGIRLS Advisor program made available by AOL Inc. (our awesome parent company—called “we” or “us” in the rest of this letter). #BUILTBYGIRLS offers a platform to match young women like you with professionals in careers powered by technology. We want to help you get ahead of the game in the tech economy by introducing you to the right people, exposing you to opportunities  you didn’t know existed and arming you with the tools to make you stand out in your first job.<br /><br />
			This is a voluntary Beta program that will span 2017 and potentially beyond. We’re excited to get started, but first we have to make sure we dot our i’s and cross our t’s; aka let’s get a few legal things out of the way so that you understand how our program works. Read the terms below and if they work for you, please have this document signed by you and your parent or legal guardian (they will be notified that they need to sign this).<br /><br />
			Here are the key terms you should understand about your participation in the program:<br />
			1. We offer the program at no cost to you; however, you’re responsible for the expenses needed to communicate or meet up with your Advisor, such as subway fares, equipment/services like your phone, texting fees or Internet access, etc.<br /><br />
			2. You’ll sign up on your own behalf and provide us with accurate and up-to-date registration information. No “New Address” postcard required, but you’ll let us know if you change any contact information, such as your address or email.  <br /><br />
			3. You’re clear that the program is designed for your benefit, but doesn’t create any internship or employment relationship between you and us or between you and your Advisors unless discussed or offered.<br /><br />
			4. We may make changes as we go or discontinue the program at our discretion and at any time without any obligation to you, but may offer ways for you to stay involved in #BUILTBYGIRLS.<br /><br />
			5. You’ll comply with all laws while participating in the program.<br /><br />
			6. We may request that you provide us with comments, an article, a profile, pictures, videos or other materials about your experience with the program, which we may use on our services and in promotions (the “Content”). You will own your Content; however, if you submit Content to us, you grant us and our affiliates a worldwide, royalty free, irrevocable right to use, copy, store, display, perform, modify and promote your Content in any medium. (We basically want to be able to use the awesome stuff you create and get it out to the world). <br /><br />
			7. You guarantee that your Content is original to you, that you won’t copy the works of others, and that your Content will not violate the rights of others.  Please obtain permission before you include images of other people in your Content.<br /><br />
			8. You and your parents (or legal guardian) understand and agree that this is a Beta program and that we provide the program “as is” and without any warranties. We’ll try to make this a pretty cool experience, but please understand we do not guarantee that the program will meet all your expectations or requirements. You will receive Advisor-Advisee relationship guidelines upon the start of the program. AOL will take reasonable steps to check the background of each Advisor; however, you also accept the responsibility to take reasonable precautions in all interactions with other users or Advisors associated with our program.<br /><br />
			9. In exchange for the benefits you’ll receive from the program: (a) you give us a release from any claims connected with your participation in the program and (b) we may use your name, voice, image, video and likeness for articles, stories, advertisements, presentations and promotions regarding the program in any medium picked by us. You agree that you won’t withdraw this consent once you have started with the program and that you are not entitled to any other compensation.  Either you or we may cancel your participation in the program at any time. We make no guarantee of any minimum time commitment for the program.<br /><br />
			10. You and we won’t be liable to each other for indirect, special, incidental, or consequential contract damages. You’ll be responsible for any costs of potential claims made against us by someone else if you engage in willful misconduct or breach these terms.<br /><br />
			11. This letter is the entire understanding and agreement between you and us regarding your participation in the program. If any term of this letter is declared invalid, the remaining terms stay in effect. The laws of Virginia govern the interpretation of this letter agreement. You and we agree to sign this letter agreement electronically, which has the same effect as an agreement signed in writing. This letter agreement expires if not signed by you and a guardian in 30 days. This letter agreement can be signed in counterparts by you, us and your parent or guardian.<br /><br />
			If you agree and want to participate in the program, please proceed with signing up. Now the fun tech and business learning can begin. We can’t wait to work with you.<br /><br />
			Keep building great things,<br />
			Team #BUILTBYGIRLS (AOL)</p>
		</div>
	)
}


export default observer(StudentStep3);
