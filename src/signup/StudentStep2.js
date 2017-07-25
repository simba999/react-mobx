import React, { Component } from 'react';
import fire from '../fire';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import MultiSelect from '../components/MultiSelect';
import appState from '../appState';
import moment from 'moment';

// assets
import waveLogo from '../assets/images/logos/wave.png';
import indicator2o3 from '../assets/indicator-2o3.svg'

class StudentStep2 extends Component {

	constructor(props) {
		super(props);
		this.state = {
			errors: {},
			interests: [],
			industry: [],
			technology: [],
			referrer: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReferrerChange = this.handleReferrerChange.bind(this);
	}

	handleReferrerChange(e) {
		this.setState({ [e.target.name]:e.target.value });
			if(e.target.name==='referrer') { setTimeout(()=>{
				this.referrerOtherEl.focus()
			}, 80)
		}
	};

	handleSubmit(e) {
		e.preventDefault();

		let bio = this.bioEl.value;
		let app = this.appEl.value;
		let brand = this.brandEl.value;
		let obsessions = this.obsessionsEl.value;
		let experience = this.experienceEl.value;
		let goal = this.goalEl.value;
		let referrer = this.referrerEl.value;
		if(referrer === 'Other') { referrer = this.referrerOtherEl.value; }
		/* interests in a mentor for topics */
		let interests = this.state.interests;
		/* interests in specific technology */
		let technology = this.state.technology;
		/* interested in a mentor who worked in selected areas */
		let industry = this.state.industry;

		let errors = {};
		bio || (errors.bio = `Please enter your bio`);
		app || (errors.app = `Please enter your favorite app`);
		brand || (errors.brand = `Please enter a brand you love`);
		obsessions || (errors.obsessions = `Please enter your current obsessions`);
		experience || (errors.experience = `Please select your level of tech experience`);
		referrer || (errors.referrer = `Please select how you heard about #BUILTBYGIRLS`);
		interests.length===3 || (errors.interests = `Please select 3 topics of interest`);
		technology.length===3 || (errors.technology = `Please select 3 technologies that you're interested in`);
		industry.length===3 || (errors.industry = `Please select 3 industries`);
		goal || (errors.goal = `Please enter a skill or goal`);

		let errorsCount = 0;
		for( let i in errors ) if(errors.hasOwnProperty(i)) errorsCount++;


		if (!errorsCount) {
			/* Update user in database */
			let userRef = fire.database().ref('/users/' + appState.user.uid);

			interests = interests.join('|');
			technology = technology.join('|');
			industry = industry.join('|');

			let userDataUpdate = { bio, app, brand, obsessions, experience, referrer, interests, technology, industry, goal,
				step2completed: true
			};
			appState.userMeta.step2completed = true;
			appState.userMeta.errorsCount = errorsCount;

			/* 🔥 */
			userRef.update(userDataUpdate).then(()=>{
				/* User data saved to database -- move on to next step */
				appState.initIntercom(userDataUpdate);
				// window.Intercom("update", userDataUpdate);

				browserHistory.push(`/wave/signup/${appState.userMeta.userType}/3`);


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
			setTimeout(()=> browserHistory.push(`/`) ,100)
		}
		else if (appState.userMeta.userType === 'student' && !appState.userMeta.dobBypass && appState.userMeta.dob > moment().subtract(15, 'years').format('YYYY[-]MM[-]DD')) {
			setTimeout(()=> browserHistory.push(`/wave/lt15`) ,100);
		} else if (appState.userMeta.userType === 'student' && !appState.userMeta.dobBypass && appState.userMeta.dob < moment().subtract(19, 'years').format('YYYY[-]MM[-]DD')) {
			setTimeout(()=> browserHistory.push(`/wave/gt18`) ,100);
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
								<img src={ indicator2o3 } style={{ width: '100%', }} alt="Sign Up Progress 2 of 3" />
							</div>
						</div>
					</div>
					<div className='progress-indicator-text'>
						<div className='row'>
							<div className='col-sm-3'></div>
							<div className='col-sm-6 center'>
								<h4>2 of 3</h4>
							</div>
						</div>
					</div>
				</div>

				<div className='signup-form-title'>
					<div className='row'>
						<div className='col-sm-3'></div>
						<div className='col-sm-6'>
							<h3>About You</h3>
						</div>
					</div>
				</div>

				<div className='row signup-form-container'>
					<div className='col-sm-2'></div>
					<div className='col-sm-8'>
						<form onSubmit={this.handleSubmit}>


							<div className='form-item-container'>
								<div className={this.formGroupClass('app')}>
									<label htmlFor='inputApp'>My favorite app is...</label>
									<input className="form-control"
									maxLength={240}
									ref={ el=>this.appEl = el }
									type='text'
									placeholder=''>
									</input>
									{this.renderHelpBlock('app')}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('brand')}>
									<label htmlFor='inputBrand'>One brand I really love is...</label>
									<input className="form-control"
									ref={ el=>this.brandEl = el }
									maxLength={240}
									type='text'
									placeholder=''>
									</input>
									{this.renderHelpBlock('brand')}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('obsessions')}>
									<label htmlFor='inputObsessions'>I'm currently obsessed with...</label>
									<textarea className="form-control" rows="3"
									ref={ el=>this.obsessionsEl = el }
									maxLength={240}
									type='text'
									placeholder='No judgement - Dots, La La Land, Beyonce pregnancy updates,  you name it. (Maximum: 240 characters)'>
									</textarea>
									{this.renderHelpBlock('obsessions')}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('experience')}>
									<label>My level of tech experience is...</label>
										<select className="form-control" ref={ el=>this.experienceEl = el }>
											<option value=""> -- select an option -- </option>
											<option value='0'>0 - What’s Coding?</option>
											<option value='1'>1 - I have basic coding skills</option>
											<option value='2'>2 - I’ve completed a coding program</option>
											<option value='3'>3 - I build my own tech products</option>
										</select>
									{this.renderHelpBlock('experience')}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('referrer')}>
									<label htmlFor='inputReferrer'>
										I heard about #BUILTBYGIRLS through...
									</label>
									<select className="form-control" name='referrer' onChange={ this.handleReferrerChange } value={this.state.referrer} ref={ el=> this.referrerEl = el }>
										<option value=""> -- select an option -- </option>
										<optgroup label='A Coding Program'>
											<option value='AFSE'>AFSE</option>
											<option value='Black Girls Code'>Black Girls Code</option>
											<option value='Girls Who Code'>Girls Who Code</option>
											<option value='Kode with Klossy'>Kode with Klossy</option>
											<option value='Upperline Code'>Upperline Code</option>
											<option value='Other Programs'>Other Programs</option>
										</optgroup>
										<optgroup label='A Girls’ Leadership Program'>
											<option value='Girl Scouts'>Girl Scouts</option>
											<option value='Girls, Inc.'>Girls, Inc.</option>
											<option value='GirlUp'>GirlUp</option>
											<option value='StepUp'>StepUp</option>
											<option value='Other Leadership Program'>Other Leadership Program</option>
										</optgroup>
										<option value='School Club'>A School Club</option>
										<option value='Social Media'>Social Media (Instagram, Twitter, Facebook)</option>
										<option value='Friend'>A Classmate or Friend</option>
										<option value='Other'>Other</option>
									</select>
									<div className='' style={{ display: this.state.referrer==='Friend'? 'block': 'none'  }}>
										<input
											type='text'
											className='form-control'
											ref={ el=> this.referrerOtherEl = el }
											placeholder="Please enter friend or classmate's name" />
									</div>
									<div className='' style={{ display: this.state.referrer==='Other'? 'block': 'none'  }}>
										<input
											type='text'
											className='form-control'
											ref={ el=> this.referrerOtherEl = el }
											placeholder="Please enter how you heard about us" />
									</div>

									{this.state.errors.referrer && <div className="help-block">{this.state.errors.referrer}</div>}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('interests')}>
									<label>I&#39;d be most interested in an advisor that can discuss the following topics (Select 3):</label>
									<MultiSelect name="interests" max={3} optionClass="multi-select-label" options={[
										{value:"Engineering - Mobile", title:"Building a mobile app"},
										{value:"Product Management", title:"Building a tech product from start to finish"},
										{value:"Media - Content", title:"Creating digital content, such as video, articles, etc."},
										{value:"Product - UX / UI", title:"Designing websites or other tech products"},
										{value:"Growth - Levers", title:"Growing a user base for a technology product"},
										{value:"Engineering - Back End", title:"Improving back-end engineering skills"},
										{value:"Engineering - Front End", title:"Improving front-end engineering skills"},
										{value:"VC", title:"Learning how investors decide which are the most exciting startups to fund"},
										{value:"Engineering - Hardware", title:"Learning how to build hardware"},
										{value:"Storytelling / Brand", title:"Learning how to create and communicate a product or brand story"},
										{value:"Data / Analytics", title:"Learning how to use data/analytics to improve a product"},
										{value:"Engineering", title:"Learning the basics of coding"},
										{value:"QA", title:"Testing tech products to make sure they are high quality"},
										{value:"Business Operations", title:"Understanding how to operate a business efficiently"},
										{value:"Business Model", title:"Understanding the ins and outs of how a business powered by technology works"}
										]}
										onChange={ ({selectedValues})=>this.setState({ interests: selectedValues}) } />
									{this.renderHelpBlock('interests')}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('technology')}>
									<label>I&#39;d be most interested in discussing this type of technology with my advisor (Select 3):</label>
									<MultiSelect name="technology" max={3} optionClass="multi-select-label" options={[
										{value:"Commerce", title:"Commerce"},
										{value:"Hardware", title:"Hardware"},
										{value:"Internet Of Things", title:"Internet Of Things"},
										{value:"Mobile App", title:"Mobile App"},
										{value:"Robotics", title:"Robotics"},
										{value:"Software", title:"Software"},
										{value:"Web", title:"Web"},
										{value:"Video", title:"Video"},
										{value:"Virtual Reality", title:"Virtual/Augmented Reality"},
										{value:"Other", title: "Other", isText: true}
										]}
										onChange={ ({selectedValues})=>this.setState({ technology: selectedValues}) } />
									{this.renderHelpBlock('technology')}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('industry')}>
									<label>I&#39;d be most interested in an advisor that has worked in the following areas (Select 3):</label>
									<MultiSelect name="industry" max={3} optionClass="multi-select-label" options={[
										{value:"Dating", title: "Dating"},
										{value:"DIY", title: "DIY"},
										{value:"eCommerce/Delivery", title: "eCommerce/Delivery"},
										{value:"Education", title: "Education"},
										{value:"Energy", title: "Energy"},
										{value:"Enterprise", title: "Enterprise"},
										{value:"Fashion & Beauty", title: "Fashion & Beauty"},
										{value:"Finance", title: "Finance"},
										{value:"Food", title: "Food"},
										{value:"Gaming", title: "Gaming"},
										{value:"Government & Politics", title: "Government & Politics"},
										{value:"Health & Wellness", title: "Health & Wellness"},
										{value:"Interior Design", title: "Interior Design"},
										{value:"Jobs", title: "Jobs"},
										{value:"Marketing", title: "Marketing"},
										{value:"Media & Entertainment", title: "Media & Entertainment"},
										{value:"Messaging", title: "Messaging"},
										{value:"Music", title: "Music"},
										{value:"Nonprofit", title: "Nonprofit"},
										{value:"Payments", title: "Payments"},
										{value:"Real Estate", title: "Real Estate"},
										{value:"Retail", title: "Retail"},
										{value:"Social Network", title: "Social Network"},
										{value:"Sports", title: "Sports"},
										{value:"Technology", title: "Technology"},
										{value:"Telecommunications", title: "Telecommunications"},
										{value:"Transport", title: "Transport"},
										{value:"Travel", title: "Travel"},
										{value:"VC", title: "Venture Capital"},
										{value:"Wearables", title: "Wearables"},
										{value:"Other", title: "Other", isText: true}
										]}
										onChange={ ({selectedValues})=>this.setState({ industry: selectedValues}) } />
									{this.renderHelpBlock('industry')}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('goal')}>
									<label htmlFor='inputGoal'>What skills are you most interested in developing?</label>
									<textarea className="form-control" rows="3"
										maxLength={240}
									ref={ el=>this.goalEl = el }
									id='inputGoal'
									type='text'
									placeholder='Think about a goal you have for the program and what would help you accomplish it and get to the next level -- understanding how to get from ideation to creation, developing your networking skills, etc. (Maximum: 240 characters)'>
									</textarea>
									{this.renderHelpBlock('goal')}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('bio')}>
									<label htmlFor='inputBio'>The Essentials</label>
									<textarea className="form-control" rows="3"
										maxLength={240}
										ref={ el=>this.bioEl = el }
										id='inputBio'
										type='text'
										placeholder='Give us a short bio to share with your Advisor. (Maximum: 240 characters)'>
									</textarea>
									{this.renderHelpBlock('bio')}
								</div>
							</div>

							<div className='signup-form-btn-container'>
								<div className='row'>
									<div className='col-sm-6'>
										<input type='submit' className='btn btn-default btn-block' value='Next' />
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




export default observer(StudentStep2);
