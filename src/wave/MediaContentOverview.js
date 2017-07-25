// react
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

// firebase
import fire from '../fire';
// import firebase from 'firebase';

// components
import appState from '../appState'

class MediaContentOverview extends Component {
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
					<h3>Session 2:<br />Media & Content</h3>
					<div className='divider-white mt-20'></div>
				</div>

				<div className='guide-card-body'>
					<h4>Session Goal</h4>
					<div className='divider-honey mt-20 mb-20'></div>
					<p className='center mt-20'>
						Think back to your hypothetical product concept and how you could create content to support it. If there's no need for content, talk through this session using a real-life media example instead.
						<br /><br />
						Today, you'll think about a brand voice for your product and make sure you could reach your target audience with the right content.
					</p>
					<hr />

				{userType === 'student' ?
				<div>
					<h4>Pre-Session Prep</h4>
						<div className='divider-honey mt-20 mb-30'></div>
						<ul>
							<li>Think about what content you like to read and why (e.g. Refinery29, The New York Times, Buzzfeed, Bustle). Are you the intended audience for that content? What makes that content different from the competition?</li>
							<li>Review your notes from the last two sessions (product concept and project planning) so you can hit the ground running. </li>
						</ul>
						<hr />
				</div>
				:
				<span></span>
				}

				<h4>Session Topics</h4>
					<div className='divider-honey mt-20 mb-20'></div>
					<ol>
						<Link to='/wave/session/media-content/1'><li>Brand Voice</li></Link>
						<Link to='/wave/session/media-content/2'><li>Content Type</li></Link>
						<Link to='/wave/session/media-content/3'><li>Content Delivery</li></Link>
					</ol>
					<hr />
					<h4>Session Skills</h4>
					<div className='divider-honey mt-20 mb-30'></div>
					<ul>
						<li>Developing a brand voice</li>
						<li>Appealing to your target audience</li>
						<li>Designing a content strategy</li>
						<li>Leveraging different types of content</li>
						<li>Strategic content distribution</li>
					</ul>

				<div className='guide-button container'>
					<div className='row'>
						<div className='col-sm-3'></div>
						<div className='col-sm-6'>
							<Link to='/wave/session/media-content/1' className='btn btn-default btn-block' role='button'>Start Session<span className='glyphicon glyphicon-chevron-right pull-right'></span></Link>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		);
	}
}

export default observer(MediaContentOverview)
