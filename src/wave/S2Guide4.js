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


class S2Guide4 extends Component {
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
									<Link to='/wave/session/2/4'>
										<div className='guide-card-nav-button pull-left'>
											<span className='glyphicon glyphicon-chevron-left'></span>
										</div>
									</Link>

									<Link to='/wave/session/2/survey'>
										<div className='guide-card-nav-button pull-right hide'>
											<span className='glyphicon glyphicon-comment'></span>
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
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/2/4'>
												<li className="nav-dot-active"></li>
											</Link>
										</ul>
									</div>
								</div>

								<div className='guide-card-container'>

										<div className='guide-card-hero'>
											<h3>{ this.state.session2Content.page4Title || 'Session Wrap' }</h3>
											<div className='divider-honey mt-20'></div>
										</div>

										<div className='guide-card-body'>
											<p>
												{
													this.state.session2Content.page4Body ||
													'Great work putting together a project plan! Next time, you\'ll get to explore a topic customized to your interests and expertise. Before you go, share one thing you’ll each take away from today\'s session.'
												}
											</p>
											<ol>
												<li>{'Schedule your next session.'}</li>
												<li>{'Talk about what additional research you could each do before your next meeting.'}</li>
												<li>{'Share your brilliant feedback in the survey below.'}</li>
											</ol>
										</div>
										<div className='container'>
											<div className='row'>
												<div className='col-sm-3'></div>
												<div className='col-sm-6'>
													<Link to="/wave/session/2/survey" className='btn btn-default btn-block mb-20' role='button'>Share Feedback</Link>
												</div>
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

export default observer(S2Guide4)
