// react
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

// firebase
import fire from '../fire';
// import firebase from 'firebase';

// components
import appState from '../appState'

class QAOverview extends Component {
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
					<h3>Session 2:<br />QA</h3>
					<div className='divider-white mt-20'></div>
				</div>

				<div className='guide-card-body'>
					<h4>Session Goal</h4>
					<div className='divider-honey mt-20 mb-20'></div>
					<p className='center mt-20'>
						Think back to your hypothetical product concept. Today, as the Quality Assurance team for your product, talk about a test plan for this project. Think about how you would test the desired product behaviors (called user acceptance testing, or UAT) and report issues, called "bugs," to engineering and product teams.
 						<br /><br />
						If this topic doesn't apply to your concept, talk through this session using a real-life example of a consumer tech product instead.
					</p>
					<hr />

				{userType === 'student' ?
				<div>
					<h4>Pre-Session Prep</h4>
						<div className='divider-honey mt-20 mb-30'></div>
						<ul>
							<li>Look up a job posting for a QA Engineer role and come up with 3 questions about the job description for your advisor.</li>
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
						<Link to='/wave/session/qa/1'><li>MVP Product Requirements</li></Link>
						<Link to='/wave/session/qa/2'><li>Testing Types</li></Link>
						<Link to='/wave/session/qa/3'><li>Reporting</li></Link>
					</ol>
					<hr />
					<h4>Session Skills</h4>
					<div className='divider-honey mt-20 mb-30'></div>
					<ul>
						<li>Vetting product requirements</li>
						<li>Understanding test cases</li>
						<li>Basic test planning</li>
						<li>Manual vs automated testing </li>
						<li>Logging/reporting bugs</li>
					</ul>

				<div className='guide-button container'>
					<div className='row'>
						<div className='col-sm-3'></div>
						<div className='col-sm-6'>
							<Link to='/wave/session/qa/1' className='btn btn-default btn-block' role='button'>Start Session<span className='glyphicon glyphicon-chevron-right pull-right'></span></Link>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		);
	}
}

export default observer(QAOverview)
