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
import waveLogo from '../assets/images/logos/wave.svg';
import iconChatBubble from '../assets/images/icons/wave/chatbubble.png';
import iconLightBulb from '../assets/images/icons/wave/lightbulb.png';

class S1Guide1 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {},
			session1Content: {},
			morecontentdiv: false /* is mobile navigation open */
		};
	}

  componentDidMount() {
		console.log('componentDidMount')

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
				<section className='guide-body-container'>
					<div className='container'>
						<div className='row'>
							<div className='col-sm-12'>

								<div className='guide-card-nav-container'>
									<Link to='/wave/session/1'>
										<div className='guide-card-nav-button pull-left'>
											<span className='glyphicon glyphicon-chevron-left'></span>
										</div>
									</Link>

									<Link to='/wave/session/1/2'>
										<div className='guide-card-nav-button pull-right'>
											<span className='glyphicon glyphicon-chevron-right'></span>
										</div>
									</Link>

									<div className='guide-card-nav-center'>
										<ul className="nav-dots">
											<Link to='/wave/session/1/1'>
												<li className="nav-dot-active"></li>
											</Link>
											<Link to='/wave/session/1/2'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/1/3'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/1/4'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/1/5'>
												<li className="nav-dot"></li>
											</Link>
										</ul>
									</div>
								</div>

								<div className='guide-card-container'>

										<div className='guide-card-hero'>

											<h3>{ this.state.session1Content.page1Title || '1. Interests & Goals' }</h3>
											<div className='divider-honey mt-20'></div>
										</div>
										<div className='guide-card-body'>
											<div className='guide-card-body-text'>
												{userType === 'professional' ?
													<span>
														{ this.state.session1Content.page1BodyProfessional || 'Learn more about your Advisee and her interests. Then, share your goals for your time together.' }

													</span>
												:
													<span>
														{ this.state.session1Content.page1BodyStudent || 'Tell your Advisor a little bit about yourself. Then, share your goals for your time together.' }

													</span>
												}
											</div>
										</div>

								</div>
							</div>
						</div>
					</div>
				</section>


				<section className={(this.state.morecontentdiv) ? 'guide-footer-container-is-open' : 'guide-footer-container'}>
					<a className="" onClick={this.openMoreContainer.bind(this)}>
					<div className='guide-footer-control-left pull-left'></div>
					<div className='guide-footer-control-right pull-right'>
						<div className='guide-footer-control-right-container'>
								<span className={(this.state.morecontentdiv) ? 'glyphicon glyphicon-remove' : 'glyphicon glyphicon-chevron-up'}>
							  </span>
						</div>
					</div>
					<div className='guide-footer-control-center center'>Additional Resources</div>
					</a>
					<div className='guide-footer-body'>
						<div className='container'>
							<div className='guide-conversation-icon pull-left'><img src={ iconChatBubble } alt='Profile' className='img-responsive' /></div>
							<h4>Conversation Starters</h4>
							{userType === 'professional' ?
								<div>
									<p className='guide-conversation-body'>

										{ this.state.session1Content.page1ResourcesBodyPro || `Help your Advisee #humblebrag by asking about her accomplishments. Discuss your goals for your time together, including...` }
									</p>
									<ul>
										<li>{ this.state.session1Content.page1ResourcesBullet1Pro || `What you would like to learn from your Advisee.` }</li>
										<li>{ this.state.session1Content.page1ResourcesBullet2Pro || `What she would like to learn from you.` }</li>
										<li>{ this.state.session1Content.page1ResourcesBullet3Pro || `What skills you can help her develop.` }</li>
									</ul>
								</div>
								:
								<div>
									<p className='guide-conversation-body'>
										{ this.state.session1Content.page1ResourcesBodyStudent || `Help your Advisor brag a little by asking about them, then #humblebrag about yourself.` }
									</p>
									<ul>
										<li>{ this.state.session1Content.page1ResourcesBullet1Student || `Share a recent accomplishment that made you want to do a happy dance.` }</li>
										<li>{ this.state.session1Content.page1ResourcesBullet2Student || `Talk about a project that has you working really hard right now.` }</li>
									</ul>
								</div>
							}
						</div>
					</div>
				</section>

			</div>
		);
	}
}

export default observer(S1Guide1)
