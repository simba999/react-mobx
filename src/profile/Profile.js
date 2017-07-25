// react
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { observer } from 'mobx-react';

// firebase
import fire from '../fire';

// components
import appState from '../appState'

// assets
import socialInstagram from '../assets/images/icons/social/instagram.svg';
import socialTwitter from '../assets/images/icons/social/twitter.svg';
import socialLinkedin from '../assets/images/icons/social/linkedin.svg';

class Profile extends Component {


	constructor(props) {
		super(props);
		this.state = {
			profile: {},
			avatarURL: '',
			matchUser: {},
			matchUserAvatar: '',
			rmUser: {}
		}
	}

	componentDidMount() {

		let loadData = () => {
			if(!fire.auth().currentUser) {
				setTimeout( loadData, 40);
				return;
			}

			let userUid = fire.auth().currentUser.uid;
			fire.database().ref(`users/${userUid}`).once('value').then( s =>{
				let user = s.val();

				this.setState({ user });
				this.waveStatusUpdate(user, userUid);

				// user.waveMatch
				fire.database().ref(`users/${user.waveMatch}`).once('value').then( s2 =>{
					let matchUser = s2.val();
					this.setState({ matchUser });
				});

				// user.waveRM
				fire.database().ref(`users/${user.waveRM}`).once('value').then( s3 =>{
					let rmUser = s3.val();
					if(rmUser){
						this.setState({ rmUser });
					}
				});

				fire.storage().ref(`/Profiles/Avatars/${user.waveMatch}`).getDownloadURL().then( matchUserAvatar =>{
					this.setState({ matchUserAvatar })
				});

				if(!user.waveParticipant) {
					location.assign('/wave/login');
					return;
				}
			})

		}
		setTimeout( loadData, 40);


		// Find the Profile
		let routeParam = this.props.params.id.toLowerCase();
		fire.database().ref(`usernames/${routeParam}`).once('value', s => {
			let uid = s.val();

			fire.database().ref(`users/${uid}`).once('value', s => {
				let profile = s.val();
				profile.uid = uid;
				profile ? this.setState({profile}) : browserHistory.push(`/404`);
			})

			fire.storage().ref(`/Profiles/Avatars/${uid}`).getDownloadURL().then( avatarURL =>{
				this.setState({ avatarURL })
			})

		});

	}

	waveStatusUpdate(userMatch, userUid) {
		let routeParam = this.props.params.id.toLowerCase();
		let concatNames = userMatch.username;
		if(concatNames !== routeParam) {
			let waveStatus = {
				text: 'Start Session 1',
				url: '/wave/session/1'
			}
			fire.database().ref(`users/${userUid}`).update({waveStatus})
			.then(() => {
				//success
			}).catch(e => console.error(e));
		}
	}


	render() {
		//if( !appState.userMeta.advisorplatform ) {
			//setTimeout(()=> browserHistory.push(`/`),100)
		//}

		let { profile } = this.state;
		return (
			<div>
				{ profile && (
						<span>
							<div className='profile-hero-container'>
								<div className='container'>
									<div className='row'>
										<div className='col-sm-12'>
											<div className='row'>
												<div className='col-sm-3'></div>
												<div className='col-sm-6 center'>
														{profile.email !== undefined && profile.email === appState.userMeta.email &&
															<Link to='/settings'>
																<div className='profile-edit-button pull-right'>
																	<span className='glyphicon glyphicon-pencil'></span>
																</div>
															</Link>
														}
														{ !!this.state.avatarURL && <div
															style={{
																width: 150, height: 150,
																backgroundImage: `url(${this.state.avatarURL})`,
																backgroundPosition: 'center',
																backgroundSize: 'cover'
															}}
															className='img-circle img-responsive profile-hero-img' />
														}
												</div>
												<div className='col-sm-3'></div>
											</div>

											<div className='row'>
												<div className='col-sm-3'></div>
												<div className='col-sm-6 profile-hero-name'>
													<h3>{profile.firstName}&nbsp;{profile.lastName}</h3>
													<div className='profile-hero-title'>
														{!!profile.title ? profile.title : ''}
														{!!profile.company ? <span> @ {profile.company}</span> : ''}
													</div>
												</div>
											</div>

										</div>
									</div>

									<nav className="profile-social-nav">

										{profile.socialLinkedin &&
											<a className="social-linkedin" href={"https://www.linkedin.com/in/" + profile.socialLinkedin} target="_blank">
												<img src={ socialLinkedin } alt='#BUILTBYGIRLS Girls Who Fund' className='profile-social-linkedin-icon' />
											</a>
										}

										{profile.socialTwitter &&
											<a className="social-twitter" href={"https://twitter.com/" + profile.socialTwitter} target="_blank">
												<img src={ socialTwitter } alt='#BUILTBYGIRLS Girls Who Fund' className='profile-social-twitter-icon' />
											</a>
										}

										{profile.socialInstagram &&
											<a className="social-instagram" href={"https://instagram.com/" + profile.socialInstagram} target="_blank">
												<img src={ socialInstagram } alt='#BUILTBYGIRLS Girls Who Fund' className='profile-social-instagram-icon' />
											</a>
										}

									</nav>

									<div className='row'>
										<div className='col-sm-6 mt-20'>
											{!this.state.rmUser.email ?
												<a href={'mailto:' + profile.email} target="_blank" className='btn btn-default btn-block'>Email</a>
											:
											<a href={'mailto:' + profile.email + '?cc=' + this.state.rmUser.email} target="_blank" className='btn btn-default btn-block'>Email</a>
											}
										</div>
										<div className='col-sm-6 mt-20'>
											<a href={"tel:" + profile.phone} target="_blank" className='btn btn-default btn-block'>Phone</a>
										</div>
									</div>
								</div>
							</div>

							<div className='profile-body-container'>
								<div className='container'>
									<div className='row'>
										<div className='col-sm-12'>
											<div className='profile-card-container'>
												<div className='container'>
													<div className='row'>
														<div className='col-sm-11'>
															<h4>Bio</h4>
															<div className='profile-card-body-text'>
																{profile.bio}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									{profile.userType==='student' &&
										<div className='row'>
											<div className='col-sm-12'>
												<div className='profile-card-container'>
													<div className='container'>
														<div className='row'>
															<div className='col-sm-11'>
																<h4>Goals</h4>
																<div className='profile-card-body-text'>
																	{profile.goal}
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									}

									<div className='row'>
										<div className='col-sm-12'>
											<div className='profile-card-container'>
												<div className='container'>
													<div className='row'>
														<div className='col-sm-11'>
															<h4>Favorite App</h4>
															<span className='profile-card-body-text'>
																{profile.app}
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className='col-sm-12'>
											<div className='profile-card-container'>
												<div className='container'>
													<div className='row'>
														<div className='col-sm-11'>
															<h4>Favorite Brand</h4>
															<span className='profile-card-body-text'>
																{profile.brand}
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className='row'>
										<div className='col-sm-12'>
											<div className='profile-card-container'>
												<div className='container'>
													<div className='row'>
														<div className='col-sm-11'>
															<h4>Obsessions</h4>
															<div className='profile-card-body-text'>
																{profile.obsessions}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									{profile.userType==='professional' &&
										<div className='row'>
											<div className='col-sm-12'>
												<div className='profile-card-container'>
													<div className='container'>
														<div className='row'>
															<div className='col-sm-11'>
																<h4>Superpower</h4>
																<div className='profile-card-body-text'>
																	{profile.superpower}
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									}


								</div>
							</div>
					</span>
				)}
			</div>

		);
	}
}

export default observer(Profile)
