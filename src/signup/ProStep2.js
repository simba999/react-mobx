// react
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';

// firebase
import fire from '../fire';

// components
import appState from '../appState'
//import { getSelectedValuesFromMultipleSelect } from '../utils/utils'

// assets
import indicator2o3 from '../assets/indicator-2o3.svg'
import waveLogo from '../assets/images/logos/wave.png';

class ProStep2 extends Component {

	constructor(props) {
		super(props);
		this.state = {
			errors: {}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();


		let bio = this.bioEl.value;
		let app = this.appEl.value;
		let brand = this.brandEl.value;
		let obsessions = this.obsessionsEl.value;
		let superpower = this.superpowerEl.value;
		let skill = this.skillEl.value;


		let errors = {};
		bio || (errors.bio = `Please enter your bio`);
		app || (errors.app = `Please enter your favorite app`);
		brand || (errors.brand = `Please enter a brand you love`);
		obsessions || (errors.obsessions = `Please enter your current obsessions`);
		superpower || (errors.superpower = `Please enter your superpower`);
		skill || (errors.skill = `Please enter the skill you want to learn`);

		let errorsCount = 0;
		for( let i in errors ) if(errors.hasOwnProperty(i)) errorsCount++;

		if (!errorsCount) {
			/* Update user in database */
			let userRef = fire.database().ref('/users/' + appState.user.uid);

			let userDataUpdate = { bio, app, brand, obsessions, superpower, skill,
				step2completed: true
			};
			appState.userMeta.step2completed = true;
			appState.userMeta.errorsCount = errorsCount;

			/* 🔥 */
			userRef.update(userDataUpdate).then(()=>{
				/* User data saved to database -- move on to next step */
				appState.initIntercom(userDataUpdate);

				browserHistory.push(`/wave/signup/${appState.userMeta.userType}/3`);

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
			setTimeout(()=> browserHistory.push(`/`) ,100)
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
									{this.state.errors.app ? <div className="help-block">{this.state.errors.app}</div> : ''}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('brand')}>
									<label htmlFor='inputBrand'>One brand I really love is...</label>
									<input className="form-control"
										maxLength={240}
										ref={ el=>this.brandEl = el }
										type='text'
										placeholder=''>
									</input>
									{this.state.errors.brand ? <div className="help-block">{this.state.errors.brand}</div> : ''}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('obsessions')}>
									<label htmlFor='inputObsessions'>I'm currently obsessed with...</label>
									<textarea className="form-control" rows="3"
										maxLength={240}
										ref={ el=>this.obsessionsEl = el }
										type='text'
										placeholder='No judgement - Cascara lattes, La La Land, Beyonce pregnancy updates, you name it. (Maximum: 240 characters)'>
									</textarea>
									{this.state.errors.obsessions ? <div className="help-block">{this.state.errors.obsessions}</div> : ''}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('superpower')}>
									<label htmlFor='inputObsessions'>My Superpower is...</label>
									<textarea className="form-control" rows="3"
										maxLength={240}
										ref={ el=>this.superpowerEl = el }
										type='text'
										placeholder='Showing Google Analytics who’s boss, writing perfect product requirements, optimizing CAC for Facebook. (Maximum: 240 characters)'>
									</textarea>
									{this.state.errors.superpower ? <div className="help-block">{this.state.errors.superpower}</div> : ''}
								</div>
							</div>

							<div className='form-item-container'>
								<div className={this.formGroupClass('skill')}>
									<label htmlFor='inputSkill'>What skill do you most want to learn right now?</label>
									<textarea className="form-control" rows="3"
										maxLength={240}
										ref={ el=>this.skillEl = el }
										type='text'
										placeholder='Agile product management, customer acquisition funnel, rapid prototyping. (Maximum: 240 characters)'>
									</textarea>
									{this.state.errors.skill ? <div className="help-block">{this.state.errors.skill}</div> : ''}
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
									placeholder='Give us a short bio to share with your Advisee. (Maximum: 240 characters)'>
									</textarea>
									{this.state.errors.bio ? <div className="help-block">{this.state.errors.bio}</div> : ''}
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

export default observer(ProStep2);
