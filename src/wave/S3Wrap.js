// react
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

// firebase
import fire from '../fire';
// import firebase from 'firebase';

// components
import appState from '../appState'
import {reactLocalStorage} from 'reactjs-localstorage';
// assets


class BusinessModel4 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			morecontentdiv: false, /* is mobile navigation open */
			lastPage: '',
			sessionTopicName: ''
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
    setTimeout( loadData, 50);
    let lastPage = reactLocalStorage.get('lastPage');
    this.setState({lastPage: lastPage});
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
									{this.state.lastPage
										?
											<Link to={this.state.lastPage}>
												<div className='guide-card-nav-button pull-left'>
													<span className='glyphicon glyphicon-chevron-left'></span>
												</div>
											</Link>
										:
											<Link to='/wave/session/business-model/3'>
												<div className='guide-card-nav-button pull-left'>
													<span className='glyphicon glyphicon-chevron-left'></span>
												</div>
											</Link>
									}

									<Link to='/wave/session/2/survey'>
										<div className='guide-card-nav-button pull-right hide'>
											<span className='glyphicon glyphicon-comment'></span>
										</div>
									</Link>

								</div>

								<div className='guide-card-container'>

										<div className='guide-card-hero'>
											<h3>Session Wrap</h3>
											<div className='divider-honey mt-20'></div>
										</div>

										{userType === 'student' ?
											<div className='guide-card-body'>
												<p>
													Nice work today! In the next session, you'll get an inside look at your Advisor's typical day. The goal is to get a clear picture of your Advisor's job in a hands-on way. You might attend a company meeting with a cross-functional team or a brainstorming session, get a demo of your Advisor's current work, or even attend an industry event together. 
													<br /><br />
													More info about Session 3 to come, but in the meantime...
													<ol>
														<li>Ask your Advisor to make one relevant intro based on what you're interested in learning more about. It can be done in person at your Advisor's office or by email. Craft 3 questions to ask your new connection.</li>
														<li>Schedule your next session.</li>
														<li>Share your feedback in the survey below.</li>
													</ol>
													<br />
												</p>
												<br />

											</div>
											:
											<div className='guide-card-body'>
												<p>
													Nice work today! In the next session, you'll give your Advisee an inside look at your typical day. The key is to help her understand your job in a hands-on way. Can she attend a meeting with a cross-functional team, a stand-up, or a brainstorming session? Can you demo some of your current work for her at your desk—dashboards, lines of code, decks, Excel are all welcome! Can she attend an industry event with you? 
													<br/><br/>
													More info about Session 3 to come, but in the meantime...
													<ol>
														<li>Make one relevant intro for your Advisee based on what she is interested in learning more about. It can be done in person at work or by email. Help her craft 3 questions to ask her new connection.</li>
														<li>Schedule your next session.</li>
														<li>Share your feedback in the survey below.</li>
													</ol>
													<br />
												</p>
												<br />
											</div>
										}

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

export default observer(BusinessModel4)
