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
import iconChatBubble from '../assets/images/icons/wave/chatbubble.png';
import iconLightBulb from '../assets/images/icons/wave/lightbulb.png';

class S1Guide3 extends Component {
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

				<section className='guide-body-container'>
					<div className='container'>
						<div className='row'>
							<div className='col-sm-12'>

								<div className='guide-card-nav-container'>
									<Link to='/wave/session/1/2'>
										<div className='guide-card-nav-button pull-left'>
											<span className='glyphicon glyphicon-chevron-left'></span>
										</div>
									</Link>

									<Link to='/wave/session/1/4'>
										<div className='guide-card-nav-button pull-right'>
											<span className='glyphicon glyphicon-chevron-right'></span>
										</div>
									</Link>

									<div className='guide-card-nav-center'>
										<ul className="nav-dots">
											<Link to='/wave/session/1/1'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/1/2'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/1/3'>
												<li className="nav-dot-active"></li>
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
											<h3>{ this.state.session1Content.page3Title || '3. Business Challenges & Ideas'}</h3>
											<div className='divider-honey mt-20'></div>
										</div>

										<div className='guide-card-body'>
											<div className='guide-card-body-text'>
												{userType === 'professional' ?
													<span>
														{ this.state.session1Content.page3BodyPro || <span>Talk through some of the challenges you face in your role when it comes to your company and its products.
														<br /><br />
														Discuss how you might address these challenges or improve your role using technology.</span> }
													</span>
												:
													<span>
														{ this.state.session1Content.page3BodyStudent || <span>Talk through some of the challenges your Advisor faces in their role when it comes to their company and its products.
														<br /><br />
														Tell your Advisor what ideas you have to address these challenges or improve their role using technology.</span> }
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
								<span>
									<ul>
										<li>{ this.state.session1Content.page3ResourcesBullet1Pro || 'Think of what new product or feature you might you want to see from your company.'}</li>
										<li>{ this.state.session1Content.page3ResourcesBullet2Pro || 'When it comes to your product(s), think about what could be better. If you had more time, you\'d build…'}</li>
										<li>{ this.state.session1Content.page3ResourcesBullet3Pro || 'Ask your Advisee what she would change about one of your company\'s products if she were a user.'}</li>
									</ul>
								</span>
							:
								<span>
									<ul>
										<li>{ this.state.session1Content.page3ResourcesBullet1Student || 'What new product or feature would your Advisor want to see from their company?'}</li>
										<li>{ this.state.session1Content.page3ResourcesBullet2Student || 'When it comes to their company\'s product(s), what could be improved?'}</li>
										<li>{ this.state.session1Content.page3ResourcesBullet3Student || 'Share what you would change about one of the company\'s products if you were a user.'}</li>
									</ul>
								</span>
							}
						</div>
					</div>
				</section>

			</div>
		);
	}
}

export default observer(S1Guide3)
