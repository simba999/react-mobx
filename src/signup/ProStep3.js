// react
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';

// firebase
import fire from '../fire';

// components
import MultiSelect from '../components/MultiSelect'
import appState from '../appState'

// assets
import waveLogo from '../assets/images/logos/wave.png';
import indicator3o3 from '../assets/indicator-3o3.svg'


class ProStep3 extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userType: '',
			errors: [],
			topic1: '',
			topic2: '',
			topic3: '',
			industry: '',
			role: '',
			technology: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleIndustryChange = this.handleIndustryChange.bind(this);
		this.handleRoleChange = this.handleRoleChange.bind(this);
		this.handleTechnologyChange = this.handleTechnologyChange.bind(this);
		this.handleTopic1Change = this.handleTopic1Change.bind(this);
		this.handleTopic2Change = this.handleTopic2Change.bind(this);
		this.handleTopic3Change = this.handleTopic3Change.bind(this);
	}

	handleIndustryChange(e) {
		this.setState({ [e.target.name]:e.target.value });
			if(e.target.name==='industry') { setTimeout(()=>{
				this.industryOtherEl.focus()
			}, 80)
		}
	};

	handleRoleChange(e) {
		this.setState({ [e.target.name]:e.target.value });
			if(e.target.name==='role') { setTimeout(()=>{
				this.roleOtherEl.focus()
			}, 80)
		}
	};

	handleTechnologyChange(e) {
		this.setState({ [e.target.name]:e.target.value });
			if(e.target.name==='technology') { setTimeout(()=>{
				this.technologyOtherEl.focus()
			}, 80)
		}
	};

	handleTopic1Change(e) {
		this.setState({ [e.target.name]:e.target.value });
			if(e.target.name==='topic1') { setTimeout(()=>{
				this.topic1El.focus()
			}, 80)
		}
	};

	handleTopic2Change(e) {
		this.setState({ [e.target.name]:e.target.value });
			if(e.target.name==='topic2') { setTimeout(()=>{
				this.topic2El.focus()
			}, 80)
		}
	};

	handleTopic3Change(e) {
		this.setState({ [e.target.name]:e.target.value });
			if(e.target.name==='topic3') { setTimeout(()=>{
				this.topic3El.focus()
			}, 80)
		}
	};

	handleSubmit(e) {
		e.preventDefault();


		let company = this.companyEl.value;
		let title = this.titleEl.value;
		let experience = this.experienceEl.value;
		let topic1 = this.state.topic1;
		let topic2 = this.state.topic2;
		let topic3 = this.state.topic3;
		let termsAccepted = this.termsAcceptedEl.checked;
		let industry = this.industryEl.value;
		if(industry === 'Other') { industry = this.industryOtherEl.value; }
		let role = this.roleEl.value;
		if(role === 'Other') { role = this.roleOtherEl.value; }
		let technology = this.technologyEl.value;
		if(technology === 'Other') { technology = this.technologyOtherEl.value; }

		let errors = {};
		company || (errors.company = `Please enter your company`);
		industry || (errors.industry = `Please select your industry`);
		role || (errors.role = `Please select your role type`);
		technology || (errors.technology = `Please select your company's primary technology`);
		title || (errors.title = `Please enter your job title`);
		experience || (errors.experience = `Please select your professional level`);
		( topic1 ) || (errors.topic1 = `Please select a unique 1st topic you'd like to advise on`);
		( topic2 && topic2 != topic1 ) || (errors.topic2 = `Please select a unique 2nd topic you'd like to advise on`);
		( topic3 && topic3 != topic1 && topic3 != topic2 ) || (errors.topic3 = `Please select a unique 3rd topic you'd like to advise on`);
		termsAccepted || (errors.termsAccepted = `Please accept the legal terms`);


		let errorsCount = 0;
		for( let i in errors ) if(errors.hasOwnProperty(i)) errorsCount++;

		if (!errorsCount) {
			/* Update user in database */
			let userRef = fire.database().ref('/users/' + appState.user.uid);

			let userDataUpdate = { company, industry, role, technology, title, experience, topic1, topic2, topic3, step3completed: true
			};
			appState.userMeta.step3completed = true;
			appState.userMeta.errorsCount = errorsCount;

			/* 🔥 */
			userRef.update(userDataUpdate).then(()=>{
				/* User data saved to database -- move on to next step */
				appState.initIntercom(userDataUpdate);

				browserHistory.push(`/wave/signup/professional/confirmation`);

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
			setTimeout(()=> browserHistory.push(`/wave/signup/professional/confirmation`) ,100)
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
							<h3>Your Day Job</h3>
						</div>
					</div>
				</div>

				<div className='row signup-form-container'>
					<div className='col-sm-2'></div>
					<div className='col-sm-8'>
						<form onSubmit={this.handleSubmit}>

							<div className='form-item-container'>
								<div className={this.formGroupClass('company')}>
									<label htmlFor='inputCompany'>Company</label>
									<input className='form-control'
									maxLength={240}
									ref={ el=> this.companyEl = el }
									type='text'
									placeholder='' />
									{this.state.errors.company ? <div className="help-block">{this.state.errors.company}</div> : ''}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('title')}>
									<label htmlFor='inputTitle'>Job Title</label>
									<input className='form-control'
										maxLength={240}
										ref={ el=> this.titleEl = el }
										type='text'
										placeholder='' />
									{this.state.errors.title ? <div className="help-block">{this.state.errors.title}</div> : ''}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('experience')}>
									<label htmlFor='inputProExperience'>
										Professional Level
									</label>
									<select className="form-control" ref={ el=>this.experienceEl = el }>
										<option value=""> -- select an option -- </option>
										<option value="associate">Associate</option>
										<option value="manager">Manager</option>
										<option value="senior-manager">Senior Manager</option>
										<option value="director">Director</option>
										<option value="vp">VP</option>
										<option value="svp">SVP</option>
										<option value="evp">EVP</option>
										<option value="partner">Partner</option>
										<option value="principal">Principal</option>
										<option value="c-level">C-Level</option>
										<option value="founder">Founder</option>
									</select>
									{this.state.errors.experience ? <div className="help-block">{this.state.errors.experience}</div> : ''}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('role')}>
									<label htmlFor='inputRole'>
										Role Type
									</label>
									<select className="form-control" name='role' onChange={ this.handleRoleChange } value={this.state.role} ref={ el=> this.roleEl = el }>
										<option value=''> -- select an option -- </option>>
										<option value='Business Development'>Business Development</option>
										<option value='Community Management'>Community Management</option>
										<option value='Engineering'>Engineering</option>
										<option value='Data/Analytics'>Data/Analytics</option>
										<option value='Finance'>Finance</option>
										<option value='Founder'>Founder</option>
										<option value='Marketing'>Marketing</option>
										<option value='Operations'>Operations</option>
										<option value='Product Management'>Product Management</option>
										<option value='QA'>QA</option>
										<option value='Sales'>Sales</option>
										<option value='UX/UI/Design'>UX/UI/Design</option>
										<option value='VC'>VC</option>
										<option value='Other'>Other</option>
									</select>
									<div className='' style={{ display: this.state.role==='Other'? 'block': 'none'  }}>
										<input
											type='text'
											className='form-control'
											ref={ el=> this.roleOtherEl = el }
											placeholder='Please enter role' />
									</div>

									{this.state.errors.role && <div className="help-block">{this.state.errors.role}</div>}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('industry')}>
									<label htmlFor='inputIndustry'>
										My company is in this Industry
									</label>
									<select className="form-control" name='industry' onChange={ this.handleIndustryChange } value={this.state.industry} ref={ el=> this.industryEl = el }>
										<option value=""> -- select an option -- </option>
										<option value="Dating">Dating</option>
										<option value="DIY">DIY</option>
										<option value="eCommerce/Delivery">eCommerce/Delivery</option>
										<option value="Education">Education</option>
										<option value="Energy">Energy</option>
										<option value="Enterprise">Enterprise</option>
										<option value="Fashion & Beauty">Fashion &amp; Beauty</option>
										<option value="Finance">Finance</option>
										<option value="Food">Food</option>
										<option value="Gaming">Gaming</option>
										<option value="Government & Politics">Government &amp; Politics</option>
										<option value="Health & Wellness">Health &amp; Wellness</option>
										<option value="Interior Design">Interior Design</option>
										<option value="Jobs">Jobs</option>
										<option value="Marketing">Marketing</option>
										<option value="Media & Entertainment">Media &amp; Entertainment</option>
										<option value="Messaging">Messaging</option>
										<option value="Music">Music</option>
										<option value="Nonprofit">Nonprofit</option>
										<option value="Payments">Payments</option>
										<option value="Real Estate">Real Estate</option>
										<option value="Retail">Retail</option>
										<option value="Social Network">Social Network</option>
										<option value="Sports">Sports</option>
										<option value="Technology">Technology</option>
										<option value="Telecommunications">Telecommunications</option>
										<option value="Transport">Transport</option>
										<option value="Travel">Travel</option>
										<option value="VC">Venture Capital</option>
										<option value="Wearables">Wearables</option>
										<option value="Other">Other</option>
									</select>
									<div className='' style={{ display: this.state.industry==='Other'? 'block': 'none'  }}>
										<input
											type='text'
											className='form-control'
											ref={ el=> this.industryOtherEl = el }
											placeholder='Please enter industry' />
									</div>

									{this.state.errors.industry && <div className="help-block">{this.state.errors.industry}</div>}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('technology')}>
									<label htmlFor='inputTechnology'>
										My company primarily focuses on this technology medium...
									</label>
									<select className="form-control" name='technology' onChange={ this.handleTechnologyChange } value={this.state.technology} ref={ el=> this.technologyEl = el }>
										<option value=""> -- select an option -- </option>
										<option value='Commerce'>Commerce</option>
										<option value='Hardware'>Hardware</option>
										<option value='Internet Of Things'>Internet Of Things</option>
										<option value='Mobile App'>Mobile App</option>
										<option value='Robotics'>Robotics</option>
										<option value='Software'>Software</option>
										<option value='Web'>Web</option>
										<option value='Video'>Video</option>
										<option value='Virtual Reality'>Virtual/Augmented Reality</option>
										<option value="Other">Other</option>
									</select>
									<div className='' style={{ display: this.state.technology==='Other'? 'block': 'none'  }}>
										<input
											type='text'
											className='form-control'
											ref={ el=> this.technologyOtherEl = el }
											placeholder='Please enter technology' />
									</div>

									{this.state.errors.technology && <div className="help-block">{this.state.errors.technology}</div>}
								</div>
							</div>

							<div className='form-item-container'>
								<label htmlFor='inputTopic1'>
									I&#39;d feel comfortable advising a young woman on these topics, with a little help from the #BUILTBYGIRLS materials
								</label>
								<div className={this.formGroupClass('topic1')}>
									<label htmlFor='inputTopic1'>
										Topic One
									</label>
									<select className="form-control" name='topic1' onChange={ this.handleTopic1Change } value={this.state.topic1} ref={ el=> this.topic1El = el }>
										<option value=""> -- select topic one -- </option>
										<option value="Business Model">Business Model</option>
										<option value="Business Operations">Business Operations</option>
										<option value="Data/Analytics">Data/Analytics</option>
										<option value="Engineering - Back End">Engineering - Back End</option>
										<option value="Engineering - Front End">Engineering - Front End</option>
										<option value="Engineering - Hardware">Engineering - Hardware</option>
										<option value="Engineering - Mobile ">Engineering - Mobile</option>
										<option value="Growth Levers">Growth Levers</option>
										<option value="Media - Content">Media - Content</option>
										<option value="Product Management">Product Management</option>
										<option value="QA">QA</option>
										<option value="Storytelling/Brand">Storytelling/Brand</option>
										<option value="UX/UI">UX/UI</option>
										<option value="VC">VC</option>
									</select>
									{this.state.errors.topic1 && <div className="help-block">{this.state.errors.topic1}</div>}
								</div>

								<div className={this.formGroupClass('topic2')}>
									<label htmlFor='inputTopic2'>
										Topic Two
									</label>

									<select className="form-control" name='topic2' onChange={ this.handleTopic2Change } value={this.state.topic2} ref={ el=> this.topic2El = el }>
										<option value=""> -- select topic two -- </option>
										<option value="Business Model">Business Model</option>
										<option value="Business Operations">Business Operations</option>
										<option value="Data/Analytics">Data/Analytics</option>
										<option value="Engineering - Back End">Engineering - Back End</option>
										<option value="Engineering - Front End">Engineering - Front End</option>
										<option value="Engineering - Hardware">Engineering - Hardware</option>
										<option value="Engineering - Mobile ">Engineering - Mobile</option>
										<option value="Growth Levers">Growth Levers</option>
										<option value="Media - Content">Media - Content</option>
										<option value="Product Management">Product Management</option>
										<option value="QA">QA</option>
										<option value="Storytelling/Brand">Storytelling/Brand</option>
										<option value="UX/UI">UX/UI</option>
										<option value="VC">VC</option>
									</select>
									{this.state.errors.topic2 && <div className="help-block">{this.state.errors.topic2}</div>}
								</div>

								<div className={this.formGroupClass('topic3')}>
									<label htmlFor='inputTopic3'>
										Topic Three
									</label>

									<select className="form-control" name='topic3' onChange={ this.handleTopic3Change } value={this.state.topic3} ref={ el=> this.topic3El = el }>
										<option value=""> -- select topic three -- </option>
										<option value="Business Model">Business Model</option>
										<option value="Business Operations">Business Operations</option>
										<option value="Data/Analytics">Data/Analytics</option>
										<option value="Engineering - Back End">Engineering - Back End</option>
										<option value="Engineering - Front End">Engineering - Front End</option>
										<option value="Engineering - Hardware">Engineering - Hardware</option>
										<option value="Engineering - Mobile ">Engineering - Mobile</option>
										<option value="Growth Levers">Growth Levers</option>
										<option value="Media - Content">Media - Content</option>
										<option value="Product Management">Product Management</option>
										<option value="QA">QA</option>
										<option value="Storytelling/Brand">Storytelling/Brand</option>
										<option value="UX/UI">UX/UI</option>
										<option value="VC">VC</option>
									</select>
									{this.state.errors.topic3 && <div className="help-block">{this.state.errors.topic3}</div>}
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
			Thanks for your interest in joining us for the #BUILTBYGIRLS Advisor program made available by AOL Inc. (“we” or “us”). #BUILTBYGIRLS offers a platform to match young women with professionals like you in careers powered by technology. With your help, we want to get these young women ahead of the game in the tech economy by introducing them to the right professional connections, exposing them to opportunities they didn’t know existed and arming them with the tools to make them stand out in their first job. You’ll be able to do this all while giving back and learning about how these young women view the tech world today.<br /><br />
			This is a voluntary Beta program with an option to expand it into a broader program in the future. We’re really excited to get started, but first we need to dot our i’s and cross our t’s and make sure you understand how our program works. Please read and sign our terms below to confirm you want to proceed as a #BUILTBYGIRLS Advisor.<br /><br />
			Here are the key terms you should understand for the program:<br /><br />
			1. We offer the program at no cost to you; your services are voluntary and will be donated. You acknowledge that you won’t be entitled to any present or future salary, wages or other benefits for the services.<br /><br />
			2. You’ll let us know if you change any contact information, such as your address or email.<br /><br />
			3. We may make changes as we go or discontinue the program at any time at our discretion without any obligation to you, but may offer ways for you to stay involved in #BUILTBYGIRLS. We ask that you participate in the program for at least a year, and commit to providing one hour per month, rotating Advisees every three months. Either you or we may cancel your participation in the program at any time. We make no guarantee of any minimum time commitment for the program.<br /><br />
			4. You’ll comply with all laws while participating in the program. You agree to provide a safe environment for each participant; we are not responsible for the safety of the participants when they visit with their Advisors.<br /><br />
			5. We may request that you provide us from time to time with content, such as an article, a profile, pictures, videos or other materials about your experience with the program, which we may use on our services and in promotions (the “Content”). Your contribution would be voluntary and is not a requirement. You will own your Content; however, if you submit Content to us, you grant us and our affiliates a worldwide, royalty free, irrevocable right to use, copy, store, display, perform, modify and promote your Content in any medium.<br /><br />
			6. You represent that your Content is original to you and that your Content will not violate the rights of others. Please obtain permission before you include images of other people in your Content.<br /><br />
			7. You understand and agree that we provide the program “as is” and without any warranties. We’ll try to make this a great experience, but please understand that as a Beta program we do not guarantee that the program will meet all your expectations or requirements. You will receive Advisor-Advisee relationship guidelines upon the start of the program. AOL will take reasonable steps to check the background of each Advisor; however, you also accept the responsibility to take reasonable precautions in all interactions with other Advisors or Advisees associated with our program.<br /><br />
			8. In exchange for the opportunity to be an Advisor in the program: (a) you release us and our parent, officers, directors, employees and agents from any claims connected with your participation in the program and (b) we may use your likeness (such as your name, voice, image and videos) in any medium for articles, stories, advertisements, presentations and promotions regarding the program. You understand these rights are not revocable, and you are not entitled to any other compensation for these rights.<br /><br />
			9. You and we won’t be liable to each other for indirect, special, incidental, or consequential contract damages. You’ll be responsible for any costs of potential claims made against us by someone else if you engage in willful misconduct or breach these terms.<br /><br />
			10. You represent and warrant that you have never been convicted of a felony and are not required to register as a sex offender with any government entity. You agree that we reserve the right at our expense to conduct a criminal background check at any time and using available public records to investigate your background and qualifications for purposes of evaluating whether you are qualified to participate in the program. You may withhold your permission and that in such a case, no investigation will be done, and you will not be eligible to participate in the program. If the results of the background check are not satisfactory, we may discontinue your participation in the program. You also release AOL Inc., its parent, officers, directors, employees and agents from any liability for damages or claims, which may arise or result from any reference information gathered pursuant to this investigation.<br /><br />
			11. This letter states your entire understanding and agreement regarding your participation in the program. If any term of this letter is declared invalid, the remaining terms stay in effect. The laws of Virginia govern the interpretation of this letter agreement. This letter agreement may be agreed to electronically, which has the same effect as an agreement signed in writing.<br /><br />
			By enrolling, you understand and agree to the terms and conditions of the #BUILTBYGIRLS Advisor Platform. We can’t wait to work with you.<br /><br />
			Keep building great things,<br />
			Team #BUILTBYGIRLS (AOL)</p>
		</div>
	)
}

export default observer(ProStep3);
