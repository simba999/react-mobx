// react
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

// firebase
import fire from '../fire';

// components
import appState from '../appState'

// assets
import waveLogo from '../assets/images/logos/wave.svg';
import iconChatBubble from '../assets/images/icons/wave/chatbubble.png';
import iconLightBulb from '../assets/images/icons/wave/lightbulb.png';

class BackEndDev1 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {},
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
									<Link to='/wave/session/back-end-dev'>
										<div className='guide-card-nav-button pull-left'>
											<span className='glyphicon glyphicon-chevron-left'></span>
										</div>
									</Link>

									<Link to='/wave/session/back-end-dev/2'>
										<div className='guide-card-nav-button pull-right'>
											<span className='glyphicon glyphicon-chevron-right'></span>
										</div>
									</Link>

									<div className='guide-card-nav-center'>
										<ul className="nav-dots">
											<Link to='/wave/session/back-end-dev/1'>
												<li className="nav-dot-active"></li>
											</Link>
											<Link to='/wave/session/back-end-dev/2'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/back-end-dev/3'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/back-end-dev/4'>
												<li className="nav-dot"></li>
											</Link>
										</ul>
									</div>
								</div>

								<div className='guide-card-container'>

										<div className='guide-card-hero'>

											<h3>1. Customer Devices</h3>
											<div className='divider-honey mt-20'></div>
										</div>
										<div className='guide-card-body'>
											<div className='guide-card-body-text'>
												Identify the main ways people would access your product and discuss the most important functionalities of your product.
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
								<div>
									<p className='guide-conversation-body'>
									</p>
									<ul>
										<li>What devices will customers use to access your product (computer, phone, tablet, etc.)?</li>
										<li>What platforms (iOS, Android, etc.)?</li>
										<li>Would customers have to create accounts or logins?</li>
										<li>Would customers receive notifications?</li>
										<li>Would you need to collect information about users as they interact with your product?</li>
									</ul>

									{userType === 'professional' &&
										<div>
											<div className='guide-protip-icon pull-left'><img src={ iconLightBulb } alt='Profile' className='img-responsive' /></div>
											<div className='guide-protip'>
												<div className='guide-protip-title'>Pro Tip:</div>
												<p className='guide-protip-body'>Come up with a list of the functional requirements for a site you are both familiar with so your advisee has a reference point when thinking about her product. Your Advisee has already thought about the data Facebook collects.</p>
											</div>
										</div>
									}
								</div>
						</div>
					</div>
				</section>

			</div>
		);
	}
}

export default observer(BackEndDev1)
