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

class Resource3 extends Component {
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
									<Link to='/wave/resources/3'>
										<div className='guide-card-nav-button pull-left'>
											<span className='glyphicon glyphicon-chevron-left'></span>
										</div>
									</Link>

									<Link to='/wave/resources/4'>
										<div className='guide-card-nav-button pull-right hide'>
											<span className='glyphicon glyphicon-chevron-right'></span>
										</div>
									</Link>

									<div className='guide-card-nav-center'>
										<ul className="nav-dots">
											<Link to='/wave/resources/1'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/resources/2'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/resources/3'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/resources/4'>
												<li className="nav-dot-active"></li>
											</Link>
										</ul>
									</div>
								</div>

								<div className='guide-card-container'>

										<div className='guide-card-hero'>
											{userType === 'professional' ?
											<h3>4. Advisor Rules</h3>
											:
											<h3>4. Advisee Rules</h3>
											}
											<div className='divider-honey mt-20'></div>
										</div>

										<div className='resource-card-body'>
											<div className='resource-card-body-text'>
												{userType === 'professional' ?
													<span>
														<ul>
															<li>Always cc your Relationship Manager on communications with your Advisee: emails, session invites, professional introductions, etc.</li>
															<li>Meetings with your Advisee should take place outside of school hours but not after 8pm.</li>
															<li>Meetings with your Advisee should take place in your office during open hours, or at a public spot like a café.</li>
															<li>You can suggest additional materials and activities for your Advisee, but make sure they’re optional, not required.</li>
															<li>If your Advisee initiates a sensitive conversation or addresses a topic that you don’t feel equipped to deal with, please let your Relationship Manager know.</li>
															<li>Keep your language and conversation professional and respectful—i.e. PG-13.</li>
															<li>We all love social media, so you can connect with your Advisee on a social platform if she requests, but we recommend keeping your communications over email.</li>
															<li>In case of emergency, contact your Relationship Manager or anyone on the #BUILTBYGIRLS team.</li>
														</ul>
													</span>
												:
													<span>
														<ul>
															<li>Always cc your Relationship Manager on all communications with your Advisor.</li>
															<li>Meetings must take place outside of school hours, but not after 8:00 PM.</li>
															<li>Do not reschedule your sessions (barring a last-minute emergency/unannounced  Beyoncé album drop).</li>
															<li>Dress professionally for your sessions; think “celebrating your friend’s graduation at a nice restaurant” or “giving a more formal presentation at school”—appropriate length shirts/skirts/dresses, and no jeans, if you can avoid it.</li>
															<li>Keep language and conversation appropriate and respectful—aka PG-13.</li>
															<li>We all love social media, so you can connect with your Advisor on a social platform if you both agree to it, but we recommend keeping your communications over email.</li>
															<li>It’s unlikely, but if you and your Advisor have any issues, or discuss a sensitive  topic that you don’t feel equipped to deal with, tell your Relationship Manager.</li>
															<li>In case of emergency, contact your Relationship Manager or any #BUILTBYGIRLS team member.</li>
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

export default observer(Resource3)
