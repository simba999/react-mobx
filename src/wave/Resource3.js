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
									<Link to='/wave/resources/2'>
										<div className='guide-card-nav-button pull-left'>
											<span className='glyphicon glyphicon-chevron-left'></span>
										</div>
									</Link>

									<Link to='/wave/resources/4'>
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
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/resources/3'>
												<li className="nav-dot-active"></li>
											</Link>
											<Link to='/wave/resources/4'>
												<li className="nav-dot"></li>
											</Link>
										</ul>
									</div>
								</div>

								<div className='guide-card-container'>

										<div className='guide-card-hero'>
											{userType === 'professional' ?
											<h3>3. Advisor Advice</h3>
											:
											<h3>3. Advisee Tips</h3>
											}
											<div className='divider-honey mt-20'></div>
										</div>

										<div className='resource-card-body'>
											<div className='resource-card-body-text'>
												{userType === 'professional' ?
													<span>
														<ol>
															<li><b>Be you.</b> Share personal anecdotes in your sessions—your Advisee is interested in you and your experience. Give frank, honest advice.</li>
															<li><b>Be open.</b> Create a supportive environment so your Advisee feels comfortable asking questions. Don’t get discouraged if she’s shy.</li>
															<li><b>Be resourceful.</b> If your Advisee wants to dive into a topic that isn’t your specialty, suggest online resources or introduce her to another expert. (Please cc your Relationship Manager on your introductions.)</li>
															<li><b>Treat your Advisee like an expert.</b> The best relationships are reciprocal, so be sure to ask your Advisee for her insight/advice on one of your professional projects.</li>
															<li><b>Be sensitive.</b> Be aware of potential cultural and socioeconomic differences.</li>
															<li><b>Have fun.</b> Enjoy your time with your awesome, smart, energetic, passionate Advisee.</li>
														</ol>
													</span>
												:
													<span>
														<ol>
															<li><b>Be prepared.</b> Do your Prep Work, bring a notebook and pen, and arrive 10 min early.</li>
															<li><b>Be present.</b> Avoid checking texts, Snaps, Instas, etc. during sessions.</li>
															<li><b>Push your limits.</b> Accept challenges that you might typically shy away from.</li>
															<li><b>Ask questions.</b> Follow up with questions/comments between sessions as needed.</li>
															<li><b>Remember: you’re an expert, too.</b> The best relationships are reciprocal, so don’t hesitate to give your Advisor insight/advice on one of their professional projects.</li>
															<li><b>Have fun.</b> Let your personality shine; you’re matched with a ridiculously smart Advisor and you’re going to learn amazing things.</li>
														</ol>
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
