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

class BusinessModel1 extends Component {
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
									<Link to='/wave/session/business-model'>
										<div className='guide-card-nav-button pull-left'>
											<span className='glyphicon glyphicon-chevron-left'></span>
										</div>
									</Link>

									<Link to='/wave/session/business-model/2'>
										<div className='guide-card-nav-button pull-right'>
											<span className='glyphicon glyphicon-chevron-right'></span>
										</div>
									</Link>

									<div className='guide-card-nav-center'>
										<ul className="nav-dots">
											<Link to='/wave/session/business-model/1'>
												<li className="nav-dot-active"></li>
											</Link>
											<Link to='/wave/session/business-model/2'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/business-model/3'>
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/business-model/4'>
												<li className="nav-dot"></li>
											</Link>
										</ul>
									</div>
								</div>

								<div className='guide-card-container'>

										<div className='guide-card-hero'>

											<h3>1. Revenue</h3>
											<div className='divider-honey mt-20'></div>
										</div>
										<div className='guide-card-body'>
											<div className='guide-card-body-text'>
												Discuss the ways you could make money on your product and how you could price it competitively.
												<br /><br />
												Remember, revenue = price x quantity.
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
										<li>How could you charge for your product—sales, advertising, subscriptions, data?</li>
										<li>How much might a competing product cost?</li>
										<li>How much should your product cost and why?</li>
									</ul>

									{userType === 'professional' &&
										<div>
											<div className='guide-protip-icon pull-left'><img src={ iconLightBulb } alt='Profile' className='img-responsive' /></div>
											<div className='guide-protip'>
												<div className='guide-protip-title'>Pro Tip:</div>
												<p className='guide-protip-body'>Use an example from your business—what does your company sell? How is it priced? Does that price change?</p>
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

export default observer(BusinessModel1)
