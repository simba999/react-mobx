// react
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

// firebase
import fire from '../fire';
// import firebase from 'firebase';

// components
import appState from '../appState'

// assets
import waveLogo from '../assets/images/logos/wave.svg';
import iconChatBubble from '../assets/images/icons/wave/chatbubble.png';
import iconLightBulb from '../assets/images/icons/wave/lightbulb.png';

class S2Guide1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			session2Content: {},
			morecontentdiv: false, /* is mobile navigation open */
		};
	}

	componentDidMount() {

		const self = this;
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

					if(!user.waveParticipant) {
						location.assign('/');
						return;
					}
				} else {
						location.assign('/wave/login');
						return;
				}
			})
		}
		setTimeout( loadData, 50)

		// Import Page Content from DB
		fire.database().ref(`pages/session2`).once('value', s => {
			let session2Content = s.val();
			console.log('SESSION2', session2Content)
			this.setState({ session2Content });
		})
	};

	openMoreContainer(e) {
		e.preventDefault();
		if(this.state.morecontentdiv){
			this.setState({morecontentdiv:false})
		}else{
		  this.setState({ morecontentdiv: true });
	  }
	}

	render() {
		const { userType } = appState.userMeta;

		return (
			<div>
				<section className='guide-body-container'>
					<div className='container'>
						<div className='row'>
							<div className='col-sm-12'>

								<div className='guide-card-nav-container'>
									<Link to='/wave/session/2'>
										<div className='guide-card-nav-button pull-left'>
											<span className='glyphicon glyphicon-chevron-left'></span>
										</div>
									</Link>

									<Link to='/wave/session/2/2'>
										<div className='guide-card-nav-button pull-right'>
											<span className='glyphicon glyphicon-chevron-right'></span>
										</div>
									</Link>

									<div className='guide-card-nav-center'>
										<ul className="nav-dots">
											<Link to='/wave/session/2/1'>
												<li className="nav-dot-active"></li>
											</Link>
											<Link to='/wave/session/2/2'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/2/3'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/2/4'>
												<li className="nav-dot"></li>
											</Link>
										</ul>
									</div>
								</div>

								<div className='guide-card-container'>

										<div className='guide-card-hero'>
											<h3>{ this.state.session2Content.page1Title || '1. Market Research' }</h3>
											<div className='divider-honey mt-20'></div>
										</div>
										<div className='guide-card-body'>
											<div className='guide-card-body-text'>
													<p>
														{
															this.state.session2Content.page1Body ||
															'Research the landscape of your product. Confirm there\'s demand for the product and that you\'re able to differentiate from what already exists.'
														}
													</p>
											</div>
										</div>

								</div>
							</div>
						</div>
					</div>
				</section>


				<section className={(this.state.morecontentdiv) ? 'guide-footer-container-is-open' : 'guide-footer-container'}>
					<a className="" onClick={this.openMoreContainer.bind(this)}>
					<div className='guide-footer-control-left pull-left'></div>
					<div className='guide-footer-control-right pull-right'>
						<div className='guide-footer-control-right-container'>
								<span className={(this.state.morecontentdiv) ? 'glyphicon glyphicon-remove' : 'glyphicon glyphicon-chevron-up'}>
							  </span>
						</div>
					</div>
					<div className='guide-footer-control-center center'>Additional Resources</div>
					</a>
					<div className='guide-footer-body'>
						<div className='container'>
							<div className='guide-conversation-icon pull-left'><img src={ iconChatBubble } alt='Profile' className='img-responsive' /></div>
							<h4>Conversation Starters</h4>

							<ul>
								<li>{ this.state.session2Content.page1ResourcesB1 || 'What do you know about this product and industry?' }</li>
								<li>{ this.state.session2Content.page1ResourcesB2 || 'What trends are happening in the space?' }</li>
								<li>{ this.state.session2Content.page1ResourcesB3 || 'Who are potential competitors?' }</li>
								<li>{ this.state.session2Content.page1ResourcesB4 || 'What challenges might you face in building this?' }</li>
							</ul>
							{userType === 'professional' &&
								<div>
									<div className='guide-protip-icon pull-left'><img src={ iconLightBulb } alt='Profile' className='img-responsive' /></div>
									<div className='guide-protip'>
										<div className='guide-protip-title'>Pro Tip:</div>
										<p className='guide-protip-body'>
											{
												this.state.session2Content.page1ResourcesProtip ||
												'Explain how you would approach research. Suggest three ways your Advisee can find more info after your session (interviews, surveys, websites, etc.).'
											}
										</p>
									</div>
								</div>
							}
						</div>
					</div>
				</section>

			</div>
		);
	}
}

export default observer(S2Guide1)
