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

class Resource2 extends Component {
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

									<Link to='/wave/resources/1'>
										<div className='guide-card-nav-button pull-left'>
											<span className='glyphicon glyphicon-chevron-left'></span>
										</div>
									</Link>

									<Link to='/wave/resources/3'>
										<div className='guide-card-nav-button pull-right'>
											<span className='glyphicon glyphicon-chevron-right'></span>
										</div>
									</Link>

									<div className='guide-card-nav-center'>
										<ul className="nav-dots">
											<Link to='/wave/resources/1'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/resources/2'>
												<li className="nav-dot-active"></li>
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
											<h3>2. Building Your Network</h3>
											<div className='divider-honey mt-20'></div>
										</div>

										<div className='resource-card-body'>
											<div className='resource-card-body-text'>
												{userType === 'professional' ?
													<span>
														<p>Over the course of your time together, we ask that you make two introductions to help your Advisee grow her network of tech professionals. Ask if there’s someone your Advisee is dying to meet at her favorite company or in her dream role.  Then, introduce her to a friend or colleague in a similar role at your company or elsewhere.
														<br /><br />
														After you make a quick intro in person or by email, your Advisee will reach out to her new connection with 2 or 3 meaningful questions—your Relationship Manager can help her craft these.
														<br /><br />
														Make these two introductions whenever it makes sense throughout your sessions.</p>
													</span>
												:
													<span>
														<p>At some point during your time together, your Advisor will make two introductions to help you grow your network of tech professionals. Is there someone you’re dying to meet (at your favorite company or in your dream role)? Ask your Advisor if they have any relevant connections or could introduce you to someone in a similar role.
														<br /><br />
														When your Advisor makes these intros, reach out to your new connection with 2-3 meaningful questions—your Relationship Manager can help you craft these. And keep track of your conversations so you can reference them later if needed.</p>
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

export default observer(Resource2)
