// react
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { observer } from 'mobx-react';

// firebase
import fire from '../fire';
// import firebase from 'firebase';

// components
// import appState from '../appState'

// assets
import waveLogo from '../assets/images/logos/wave.svg';
import iconResHIW from '../assets/images/icons/wave/iconResHIW.png';
import iconResCirculardots from '../assets/images/icons/wave/resCirculardots.png';
import iconResAdvice from '../assets/images/icons/wave/iconResAdvice.png';
import iconResContact from '../assets/images/icons/wave/iconResContact.png';
import iconResRules from '../assets/images/icons/wave/iconResRules.png';

import iconResources from '../assets/images/icons/wave/resources.png';
import iconSliders from '../assets/images/icons/wave/sliders.png';
import iconHelp from '../assets/images/icons/wave/help.png';


class WaveDashboard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			user: {},
			matchUser: {},
			matchUserAvatar: '',
			rmUser: {}
		}
	}
	componentDidMount() {


		let loadData = () => {
			if(!fire.auth().currentUser) {
				setTimeout( loadData, 50);
				return;
			}

			let userUid = fire.auth().currentUser.uid;
			fire.database().ref(`users/${userUid}`).once('value').then( s =>{
				let user = s.val();
				if(user) {
					this.setState({ user });

					// user.waveMatch
					fire.database().ref(`users/${user.waveMatch}`).once('value').then( s2 =>{
						let matchUser = s2.val();

						this.setState({ matchUser });

					});

					// user.waveRM
					fire.database().ref(`users/${user.waveRM}`).once('value').then( s3 =>{
						let rmUser = s3.val();
						this.setState({ rmUser });

					});

					fire.storage().ref(`/Profiles/Avatars/${user.waveMatch}`).getDownloadURL().then( matchUserAvatar =>{
						this.setState({ matchUserAvatar })
					});
					// const { user } = this.state;
					if(!user.waveParticipant) {
						location.assign('/');
						return;
					}
				} else {
						location.assign('/');
						return;
				}
			})
		}
		setTimeout( loadData, 50)
	};

	//To-Do: If the current user is not authenticated as an advisor platform participant, redirect them to an appropriate page. Where does Coursera direct you if you try to access a class that you're not enrolled in?
	//Question: Do we want to permit all advisees to access all guide topics or only the topics they're currently enrolled in? How about advisors? Do we want to permit advisees to visit guides for topics that they previously covered? Do we want to permit advisees to switch guide topics mid-session?
	//Question: Do we want to focus the advisor platform page designs to be mobile only? Do we want these pages to have the typical footer, etc?


	render() {
		return (
			<div>

				<h3>Resources</h3>

				<section className='dashboard-nav-container'>

						<Link to="/wave/resources/1">
							<div className='dashboard-nav-item dashboard-nav-resources'>
								<div className='container'>
									<div className='dashboard-nav-icon pull-left'><img src={ iconResHIW } alt='Profile' className='img-responsive' /></div>
									<span className='dashboard-nav-chevron glyphicon glyphicon-chevron-right pull-right' />
									<div className='dashboard-nav-resources-title'>1. How It Works</div>
								</div>
							</div>
						</Link>

						<Link to="/wave/resources/2">
							<div className='dashboard-nav-item dashboard-nav-resources'>
								<div className='container'>
									<div className='dashboard-nav-icon pull-left'><img src={ iconResCirculardots } alt='Profile' className='img-responsive' /></div>
									<span className='dashboard-nav-chevron glyphicon glyphicon-chevron-right pull-right' />
										{this.state.user.userType === 'student' ?
											<div className='dashboard-nav-resources-title'>2. Building Your Network</div>
										:
											<div className='dashboard-nav-resources-title'>2. Building a Network</div>
										}
								</div>
							</div>
						</Link>

						<Link to="/wave/resources/3">
							<div className='dashboard-nav-item dashboard-nav-resources'>
								<div className='container'>
									<div className='dashboard-nav-icon pull-left'><img src={ iconResAdvice } alt='Profile' className='img-responsive' /></div>
									<span className='dashboard-nav-chevron glyphicon glyphicon-chevron-right pull-right' />
									{this.state.user.userType === 'student' ?
										<div className='dashboard-nav-resources-title'>3. Advisee Tips</div>
									:
										<div className='dashboard-nav-resources-title'>3. Advisor Advice</div>
									}
								</div>
							</div>
						</Link>

					<Link to="/wave/resources/4">
						<div className='dashboard-nav-item dashboard-nav-resources'>
							<div className='container'>
								<div className='dashboard-nav-icon pull-left'><img src={ iconResRules } alt='Profile' className='img-responsive' /></div>
								<span className='dashboard-nav-chevron glyphicon glyphicon-chevron-right pull-right' />
									{this.state.user.userType === 'student' ?
										<div className='dashboard-nav-resources-title'>4. Advisee Rules</div>
									:
										<div className='dashboard-nav-resources-title'>4. Advisor Rules</div>
									}
							</div>
						</div>
					</Link>

					{/*
						<a href={"mailto:"+this.state.rmUser.email+"?cc=info@builtbygirls.com"} target="_blank">
						<div className='dashboard-nav-item dashboard-nav-help'>
							<div className='container'>
								<div className='dashboard-nav-icon pull-left'><img src={ iconResContact } alt='Profile' className='img-responsive' /></div>
								<span className='dashboard-nav-chevron glyphicon glyphicon-chevron-right pull-right' />
								<div className='dashboard-nav-resources-title'>Your Relationship Manager</div>
							</div>
						</div>
					</a>
					*/}

				</section>

			</div>

		);
	}
}

export default observer(WaveDashboard)
