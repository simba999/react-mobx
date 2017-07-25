import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import { observer } from 'mobx-react';
import firebase from 'firebase';
import fire from '../fire';
import appState from '../appState';
import logo from '../assets/logo.svg';
import hamburger from '../assets/hamburger.svg';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mobnav: false, /* is mobile navigation open */
			user: {},
			matchUser: {},
			rmUser: {}
		};
	}

	componentDidMount() {
		let loadData = () => {
			if(!fire.auth().currentUser) {
				setTimeout( loadData, 50);
				return;
			}
			const currentUser = fire.auth().currentUser.uid;
			if(currentUser) {
				fire.database().ref(`users/${currentUser}`).once('value').then( s =>{
					let user = s.val();
					if(user) {
						this.setState({ user });

						// user.waveMatch
						fire.database().ref(`users/${user.waveMatch}`).once('value').then( s2 =>{
							let matchUser = s2.val();
							if(matchUser) this.setState({ matchUser });
						});

						// user.waveRM
						fire.database().ref(`users/${user.waveRM}`).once('value').then( s3 =>{
							let rmUser = s3.val();
							if(rmUser) this.setState({ rmUser });
						});
					}
				});

				fire.storage().ref(`/Profiles/Avatars/${currentUser}`).getDownloadURL().then( avatarURL =>{
					if(avatarURL) this.setState({ avatarURL })
				})
			}
		}
		setTimeout( loadData, 50)
	}

	componentWillUnMount() {
		this.loadData();
	}

	closeMobileNav(e) {
		this.setState({ mobnav: false });
	}

	openMobileNav(e) {
		e.preventDefault();
		this.setState({ mobnav: true });
	}


	render() {
		const logout = () => {
			firebase.auth().signOut().then(function() {
				close();
				location.assign('/wave/login');
			}, function(error) {
				console.warn('Error signing out:', error);
			});
		}
		return (
			<nav className="navbar navbar-default">
				<div className="nav-container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" onClick={this.openMobileNav.bind(this)}>
							<img src={hamburger} alt=""/>
						</button>
						{this.state.user.waveParticipant ?
						<Link to="/wave" className='navbar-brand'><img src={ logo } style={{ width: 200 }} alt="BUILTBYGIRLS" /></Link>
						:
						<Link to="/" className='navbar-brand'><img src={ logo } style={{ width: 200 }} alt="BUILTBYGIRLS" /></Link>
						}
					</div>

					<div className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							<li><Link onClick={close} to="/about">About</Link> </li>
							<li><Link onClick={close} to="/programs">Programs</Link></li>
							{this.state.user.waveParticipant
								? <li><Link onClick={close} to="/wave">Wave</Link></li>
								: <li><Link onClick={close} to="/programs/wave">Wave</Link></li>
							}
							<li><a onClick={close} href="mailto:info@builtbygirls.com">Contact Us</a></li>
							{this.state.user.waveParticipant &&
								<li><a onClick={close} href={'/profile/'+this.state.user.username}>My Profile</a></li>
							}
							{this.state.user.waveParticipant &&
								<li><a onClick={close} href="/settings">Settings</a></li>
							}
							{this.state.user.email &&
								<li><a className='btn btn-link' onClick={() => logout()}>Logout</a></li>
							}
						</ul>
					</div>
				</div>
				{this.state.mobnav ?
					<Mobnav
						close={this.closeMobileNav.bind(this)}
						waveParticipant={this.state.user.waveParticipant || {}}
						avatar={this.state.avatarURL}
						user={this.state.user}
						userMatchInfo={this.state.matchUser}/> : ''}
			</nav>
		);
	}
}

const Mobnav = observer(({ close, waveParticipant, avatar, userMatchInfo, user }) => {
	const { firstName, lastName} = userMatchInfo;
	const logout = () => {
		firebase.auth().signOut().then(function() {
			close();
			location.assign('/wave/login');
		}, function(error) {
		  console.warn('Error signing out:', error);
		});
	}
	return (
		 <div className="navbar-mobile visible-xs-block">
			<div className="container">
				{appState.userMeta.email &&
					<span>
						{avatar &&
						<Link onClick={close} to='/settings'>
							<div className='pull-left'
								style={{
								margin: '15px 0 0 0',
								width: 60, height: 60,
								backgroundImage: `url(${avatar})`,
								backgroundPosition: 'center',
								backgroundSize: 'cover',
								borderRadius: '50px'
								}}>
							</div>

						</Link>}
						<Link onClick={close} to='/settings'><p className="navbar-mobile-name">{user.firstName} {user.lastName}</p></Link>
						<Link onClick={close} to='/settings'><p className="navbar-mobile-email">{user.email}</p></Link>
						<hr/>
					</span>
				}

					{appState.userMeta.waveParticipant ?
						<div>
							<ul className="nav navbar-nav nav-mobile-links">
								<li> <div className='navbar-mobile-icon navbar-mobile-icon-home'></div><Link className='' onClick={close} to="/wave">Home</Link> </li>

								<li> <div className='navbar-mobile-icon navbar-mobile-icon-about'></div><Link onClick={close} to="/about">About</Link></li>

								<li> <div className='navbar-mobile-icon navbar-mobile-icon-about'></div><Link onClick={close} to="/programs">Programs</Link></li>

								<li> <div className='navbar-mobile-icon navbar-mobile-icon-contact'></div><a onClick={close} href="mailto:info@builtbygirls.com" target="_blank">Contact Us</a></li>
							</ul>
								{appState.userMeta.email &&
									<span>
										<hr/>
										<ul className="nav navbar-nav">
											<li> <div className='navbar-mobile-icon navbar-mobile-icon-profile'></div><a onClick={close} href={`/profile/${user.username}` }>My Profile</a></li>

											<li><div className='navbar-mobile-icon navbar-mobile-icon-profile'></div><a onClick={close} href={`/profile/${firstName}${lastName}` }>My Match</a></li>

											<li> <div className='navbar-mobile-icon navbar-mobile-icon-settings'></div><Link onClick={close} to="/settings">Settings</Link></li>
											<li><div className='navbar-mobile-icon navbar-mobile-icon-logout'></div>
												<button className='btn btn-link' onClick={() => logout()}>Logout</button>
											</li>
										</ul>
									</span>
								}
						</div>
					:
					<div>
						<ul className="nav navbar-nav nav-mobile-links">
							<li> <div className='navbar-mobile-icon navbar-mobile-icon-home'></div><Link className='' onClick={close} to="/">Home</Link> </li>

							<li> <div className='navbar-mobile-icon navbar-mobile-icon-about'></div><Link onClick={close} to="/about">About</Link></li>

							<li> <div className='navbar-mobile-icon navbar-mobile-icon-wave'></div><Link onClick={close} to="/programs/wave">Wave</Link></li>

							<li> <div className='navbar-mobile-icon navbar-mobile-icon-contact'></div><a onClick={close} href="mailto:info@builtbygirls.com" target="_blank">Contact Us</a></li>
						</ul>
							{appState.userMeta.email &&
								<span>
									<hr/>
									<ul className="nav navbar-nav">
										<li> <div className='navbar-mobile-icon navbar-mobile-icon-settings'></div><Link onClick={close} to="/settings">Settings</Link></li>

										<li><div className='navbar-mobile-icon navbar-mobile-icon-logout'></div>
										<button className='btn btn-link' onClick={() => logout()}>Logout</button>
										</li>
									</ul>
								</span>
							}
					</div>
					}

			</div>
			<div className="mobclose" onClick={close}></div>
		</div>
	);
});

export default observer(withRouter(Navbar));
