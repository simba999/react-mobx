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
			user: {},
			session1Content: {},
			morecontentdiv: false /* is mobile navigation open */
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
		fire.database().ref(`pages/session1`).once('value', s => {
			let session1Content = s.val();
			console.log('SESSION1', session1Content)
			this.setState({ session1Content });
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
					<h3>Session 1:<br />Intros & Ideas</h3>
					<div className='divider-white mt-20'></div>
				</div>

				<div className='guide-card-body'>
					<h4>Session Goal</h4>
					<div className='divider-honey mt-20 mb-20'></div>
					<p className='center mt-20'>
						{ this.state.session1Content.overviewGoal || 'Introduce yourselves and share what excites you about working in tech.' }
					</p>
					<hr />

				{userType === 'student' ?
				<div>
					<h4>Pre-Session Prep</h4>
						<div className='divider-honey mt-20 mb-30'></div>
						{ this.state.session1Content.overviewSessionPrep || <p>Look up your Advisor, their job description, and their company. Come prepared with 3 questions about their professional background, role, and/or business.</p> }
						<hr />
				</div>
				:
				<span></span>
				}

				<h4>Session Topics</h4>
					<div className='divider-honey mt-20 mb-20'></div>
					<ol>
						<Link to='/wave/session/1/1'><li>{ this.state.session1Content.overviewSessionTopicsBullet1 || 'Interests & Goals' }</li></Link>
						<Link to='/wave/session/1/2'><li>{ this.state.session1Content.overviewSessionTopicsBullet2 || 'Company & Role' }</li></Link>
						<Link to='/wave/session/1/3'><li>{ this.state.session1Content.overviewSessionTopicsBullet3 || 'Challenges & Ideas' }</li></Link>
						<Link to='/wave/session/1/4'><li>{ this.state.session1Content.overviewSessionTopicsBullet4 || 'Product Concept' }</li></Link>
					</ol>
					<hr />
					<h4>Session Skills</h4>
					<div className='divider-honey mt-20 mb-30'></div>
					<ul>
						<li>{ this.state.session1Content.overviewSessionSkillsBullet1 || 'Professional Introductions' }</li>
						<li>{ this.state.session1Content.overviewSessionTopicsBullet2 || 'Driving Business with Technology' }</li>
						<li>{ this.state.session1Content.overviewSessionTopicsBullet3 || 'Personal Storytelling' }</li>
						<li>{ this.state.session1Content.overviewSessionTopicsBullet4 || 'Setting Tangible Goals' }</li>
						<li>{ this.state.session1Content.overviewSessionTopicsBullet5 || 'Idea Generation' }</li>
					</ul>

				<div className='guide-button container'>
					<div className='row'>
						<div className='col-sm-3'></div>
						<div className='col-sm-6'>
							<Link to='/wave/session/1/1' className='btn btn-default btn-block' role='button'>Start Session<span className='glyphicon glyphicon-chevron-right pull-right'></span></Link>
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
