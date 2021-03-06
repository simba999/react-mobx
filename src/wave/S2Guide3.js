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
import iconChatBubble from '../assets/images/icons/wave/chatbubble.png';
import iconLightBulb from '../assets/images/icons/wave/lightbulb.png';

class S2Guide3 extends Component {
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
									<Link to='/wave/session/2/2'>
										<div className='guide-card-nav-button pull-left'>
											<span className='glyphicon glyphicon-chevron-left'></span>
										</div>
									</Link>

									<Link to='/wave/session/2/4'>
										<div className='guide-card-nav-button pull-right'>
											<span className='glyphicon glyphicon-chevron-right'></span>
										</div>
									</Link>

									<div className='guide-card-nav-center'>
										<ul className="nav-dots">
											<Link to='/wave/session/2/1'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/2/2'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/2/3'>
												<li className="nav-dot-active"></li>
											</Link>
											<Link to='/wave/session/2/4'>
												<li className="nav-dot"></li>
											</Link>
										</ul>
									</div>
								</div>

								<div className='guide-card-container'>

										<div className='guide-card-hero'>
											<h3>{ this.state.session2Content.page3Title || '3. Timelines' }</h3>
											<div className='divider-honey mt-20'></div>
										</div>

										<div className='guide-card-body'>
											<div className='guide-card-body-text'>
												{
													this.state.session2Content.page3Body ||
													'Timing is everything; think through how you\'d go about building this product and how long it might take. Outline a rough timeline for build and launch.'
												}
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
									<li>{ this.state.session2Content.page3ResourcesB1 || 'What steps are needed to build this product?' }</li>
									<li>{ this.state.session2Content.page3ResourcesB2 || 'Bucket these steps into separate categories with achievable milestones.' }</li>
									<li>{ this.state.session2Content.page3ResourcesB3 || 'Which category is the highest priority?' }</li>
								</ul>

								{userType === 'professional' &&
									<div>
										<div className='guide-protip-icon pull-left'><img src={ iconLightBulb } alt='Profile' className='img-responsive' /></div>
										<div className='guide-protip'>
											<div className='guide-protip-title'>Pro Tip:</div>
											<p className='guide-protip-body'>{ this.state.session2Content.page3ResourcesProtip || 'Use a project timeline you’ve created in your work as an example.' }</p>
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

export default observer(S2Guide3)
