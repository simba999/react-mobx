// react
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

// firebase
import fire from '../fire';
// import firebase from 'firebase';

// components
import appState from '../appState'

class Session1Guide1 extends Component {
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
		fire.database().ref(`pages/session2`).once('value').then( s => {
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
	//To-Do: Create appState.userMeta.advisorPlatform boolean variable


		// if( !appState.userMeta.advisorplatform ) {
		// 	setTimeout(()=> browserHistory.push(`/`),100)
		// }

		return (
			<div>
				<div className='bg-gray'>

				<div className='guide-card-hero-overview'>
					<h3>Session 2:<br />Project Planning</h3>
					<div className='divider-white mt-20'></div>
				</div>

				<div className='guide-card-body'>
					<h4>Session Goal</h4>
					<div className='divider-honey mt-20 mb-20'></div>
					<p className='center mt-20'>
						{
							this.state.session2Content.overviewGoal ||
							<span>
								Think back to the product concept you brainstormed together last month. Feel free to add any new ideas you have or change direction.
								<br /><br />
								In this session, you'll focus on creating a project plan for your product.
								<br /><br />
								Together, you'll investigate the market, research your target audience, and outline a timeline for launch.
							</span>
						}
					</p>
					<hr />

				{userType === 'student' ?
				<div>
					<h4>Pre-Session Prep</h4>
						<div className='divider-honey mt-20 mb-30'></div>
						{
							this.state.session2Content.overviewPrep ||
							<p>
							In this session, you’ll be discussing the target audience for your product concept.<br />
							Think about your favorite app and who uses it. Look up an example of a "user persona" online to get familiar with the concept.
							</p>
						}
						<hr />
				</div>
				:
				<span></span>
				}

				<h4>Session Topics</h4>
					<div className='divider-honey mt-20 mb-20'></div>
					<ol>
						<Link to='/wave/session/2/1'><li>{ this.state.session2Content.overviewTopicsB1 || 'Market Research' }</li></Link>
						<Link to='/wave/session/2/2'><li>{ this.state.session2Content.overviewTopicsB2 || 'Target Audience' }</li></Link>
						<Link to='/wave/session/2/3'><li>{ this.state.session2Content.overviewTopicsB3 || 'Timelines' }</li></Link>
					</ol>
					<hr />
					<h4>Session Skills</h4>
					<div className='divider-honey mt-20 mb-30'></div>
					<ul>
						<li>{ this.state.session2Content.overviewSkillsB1 || 'Market Research' }</li>
						<li>{ this.state.session2Content.overviewSkillsB2 || 'Competitive Analysis' }</li>
						<li>{ this.state.session2Content.overviewSkillsB3 || 'Identifying a Target User' }</li>
						<li>{ this.state.session2Content.overviewSkillsB4 || 'Creating a User Persona' }</li>
						<li>{ this.state.session2Content.overviewSkillsB5 || 'Building a Timeline' }</li>
						<li>{ this.state.session2Content.overviewSkillsB6 || 'Prioritization' }</li>
					</ul>


				<div className='guide-button container'>
					<div className='row'>
						<div className='col-sm-3'></div>
						<div className='col-sm-6'>
							<Link to='/wave/session/2/1' className='btn btn-default btn-block' role='button'>Start Session<span className='glyphicon glyphicon-chevron-right pull-right'></span></Link>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		);
	}
}

export default observer(Session1Guide1)
