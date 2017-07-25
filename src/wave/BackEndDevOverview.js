// react
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

// firebase
import fire from '../fire';
// import firebase from 'firebase';

// components
import appState from '../appState'

class BackEndDevOverview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {},
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
				<div className='bg-gray'>

				<div className='guide-card-hero-overview'>
					<h3>Session 2:<br />Back-End Dev</h3>
					<div className='divider-white mt-20'></div>
				</div>

				<div className='guide-card-body'>
					<h4>Session Goal</h4>
					<div className='divider-honey mt-20 mb-20'></div>
					<p className='center mt-20'>
						Think back to your hypothetical product concept. Today, you'll figure out the core technologies that would run your product. Back-end is the brain of a product, and it's always running in the background to deliver the smoothest functionality.
						<br /><br />
						If this topic doesn't apply to your concept, talk through this session using a real-life example of a consumer tech product instead.
					</p>
					<hr />

				{userType === 'student' ?
				<div>
					<h4>Pre-Session Prep</h4>
						<div className='divider-honey mt-20 mb-30'></div>
						<ul>
							<li>Make a list of all the data that Facebook collects about you. Think about how Facebook stores this data and uses it to personalize your experience. Examples could include your recommended friends list or ads that appear.</li>
							<li>Review your notes from the last two sessions so you can hit the ground running.</li>
						</ul>
						<hr />
				</div>
				:
				<span></span>
				}

				<h4>Session Topics</h4>
					<div className='divider-honey mt-20 mb-20'></div>
					<ol>
						<Link to='/wave/session/back-end-dev/1'><li>Customer Devices</li></Link>
						<Link to='/wave/session/back-end-dev/2'><li>Core Technologies</li></Link>
						<Link to='/wave/session/back-end-dev/3'><li>Future Proofing</li></Link>
					</ol>
					<hr />
					<h4>Session Skills</h4>
					<div className='divider-honey mt-20 mb-30'></div>
					<ul>
						<li>Understanding dynamic sites</li>
						<li>Identifying functionality requirements</li>
						<li>Choosing core technologies</li>
						<li>Choosing programming languages</li>
						<li>Anticipating future proofing requirements</li>
					</ul>

				<div className='guide-button container'>
					<div className='row'>
						<div className='col-sm-3'></div>
						<div className='col-sm-6'>
							<Link to='/wave/session/back-end-dev/1' className='btn btn-default btn-block' role='button'>Start Session<span className='glyphicon glyphicon-chevron-right pull-right'></span></Link>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		);
	}
}

export default observer(BackEndDevOverview)
