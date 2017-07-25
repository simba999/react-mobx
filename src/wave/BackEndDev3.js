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
import {reactLocalStorage} from 'reactjs-localstorage';

class BackEndDev3 extends Component {
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
    setTimeout( loadData, 50);
    reactLocalStorage.set('lastPage', '/wave/session/back-end-dev/3');
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
									<Link to='/wave/session/back-end-dev/2'>
										<div className='guide-card-nav-button pull-left'>
											<span className='glyphicon glyphicon-chevron-left'></span>
										</div>
									</Link>

									<Link to='/wave/session/back-end-dev/4'>
										<div className='guide-card-nav-button pull-right'>
											<span className='glyphicon glyphicon-chevron-right'></span>
										</div>
									</Link>

									<div className='guide-card-nav-center'>
										<ul className="nav-dots">
											<Link to='/wave/session/back-end-dev/1'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/back-end-dev/2'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/back-end-dev/3'>
												<li className="nav-dot-active"></li>
											</Link>
											<Link to='/wave/session/back-end-dev/4'>
												<li className="nav-dot"></li>
											</Link>
										</ul>
									</div>
								</div>

								<div className='guide-card-container'>

										<div className='guide-card-hero'>
											<h3>3. Future Proofing</h3>
											<div className='divider-honey mt-20'></div>
										</div>

										<div className='guide-card-body'>
											<div className='guide-card-body-text'>
												Discuss how you could build your product using solid technologies that would enable future growth.
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
							<ul>
								<li>How could you make sure that improving and scaling your product would be possible and efficient?</li>
								<li>Could you structure the back-end for your product in a way that allows collaborative development, continuous testing and rapid development?</li>
							</ul>

							{userType === 'professional' &&
								<div>
									<div className='guide-protip-icon pull-left'><img src={ iconLightBulb } alt='Profile' className='img-responsive' /></div>
									<div className='guide-protip'>
										<div className='guide-protip-title'>Pro Tip:</div>
										<p className='guide-protip-body'>Give examples of specific technologies that can be used to increase back-end efficiency and make collaboration easier. You might talk about Heroku, AWS, automated testing or Git.</p>
									</div>
								</div>
							}
						</div>
					</div>
				</section>

			</div>
		);
	}
}

export default observer(BackEndDev3)
