// react
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

// firebase
// import fire from '../fire';
// import firebase from 'firebase';

// components
import appState from '../appState';

// assets
import waveLogo from '../assets/images/logos/wave.svg';
import iconChatBubble from '../assets/images/icons/wave/chatbubble.png';
import iconLightBulb from '../assets/images/icons/wave/lightbulb.png';

class Resource1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			morecontentdiv: false, /* is mobile navigation open */
		};
	}

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
		//To-Do: Create appState.userMeta.advisorPlatform boolean variable


		// if( !appState.userMeta.advisorplatform ) {
		// 	setTimeout(()=> browserHistory.push(`/`),100)
		// }

		return (
			<div>
				<section className='guide-body-container'>
					<div className='container'>
						<div className='row'>
							<div className='col-sm-12'>

								<div className='guide-card-nav-container'>
									<Link to='/wave/resources'>
										<div className='guide-card-nav-button pull-left'>
											<span className='glyphicon glyphicon-chevron-left'></span>
										</div>
									</Link>

									<Link to='/wave/resources/2'>
										<div className='guide-card-nav-button pull-right'>
											<span className='glyphicon glyphicon-chevron-right'></span>
										</div>
									</Link>

									<div className='guide-card-nav-center'>
										<ul className="nav-dots">
											<Link to='/wave/resources/1'>
												<li className="nav-dot-active"></li>
											</Link>
											<Link to='/wave/resources/2'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/resources/3'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/resources/4'>
												<li className="nav-dot"></li>
											</Link>
										</ul>
									</div>
								</div>

								<div className='guide-card-container'>

										<div className='guide-card-hero'>
											<h3>1. How It Works</h3>
											<div className='divider-honey mt-20'></div>
										</div>

										<div className='resource-card-body'>
											<div className='resource-card-body-text'>
												{userType === 'professional' ?
													<span>
														<ul>
															<li>We’ve matched you with an A+ young woman in NYC based on your experience and her interests.</li>
															<li>You’ll meet for one hour, once a month, for three months.</li>
															<li>You’ll work with your Advisee to schedule your sessions; choose a date/time that works for you both, and then send her a calendar invitation.</li>
															<li>Your Advisee will meet you at either your office or a public spot like a café.</li>
															<li>Your mobile guide will ensure that you and your Advisee make the most of your time together; each session has a specific tech or business theme, with conversation starters.</li>
															<li>After each session, we’ll ask for quick feedback so we can make your next sessions even better.</li>
														</ul>
													</span>
												:
													<span>
														<ul>
															<li>We’ve matched you with an A+ Advisor in NYC based on your interests and their experience.</li>
															<li>You’ll meet for one hour, once a month, for three months.</li>
															<li>Your Advisor will work with you to schedule your sessions; choose a date/time that works for you both, and then your Advisor will send over a calendar invitation.</li>
															<li>You’ll meet at either your Advisor’s office or a public spot like a café.</li>
															<li>Before each meeting, we’ll send you some quick Prep Work to get you ready for your session.</li>
															<li>Your mobile guide will ensure that you and your Advisor make the most of your time together; each session has a specific tech or business theme, with conversation starters. No awkward silences, promise.</li>
															<li>After each session, we’ll ask for your brilliant feedback so we can make the next sessions even better.</li>
														</ul>
													</span>
												}
											</div>
										</div>

								</div>
							</div>
						</div>
					</div>
				</section>

			</div>
		);
	}
}

export default observer(Resource1)
