// react
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

// firebase
import fire from '../fire';

// components
import appState from '../appState'

// assets
import iconChatBubble from '../assets/images/icons/wave/chatbubble.png';
import iconLightBulb from '../assets/images/icons/wave/lightbulb.png';

class S1Guide4 extends Component {
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
									<Link to='/wave/session/1/3'>
										<div className='guide-card-nav-button pull-left'>
											<span className='glyphicon glyphicon-chevron-left'></span>
										</div>
									</Link>

									<Link to='/wave/session/1/5'>
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
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/1/4'>
												<li className="nav-dot-active"></li>
											</Link>
											<Link to='/wave/session/1/5'>
												<li className="nav-dot"></li>
											</Link>
										</ul>
									</div>
								</div>

								<div className='guide-card-container'>

										<div className='guide-card-hero'>
											<h3>{ this.state.session1Content.page4Title || '4. Product Concept'}</h3>
											<div className='divider-honey mt-20'></div>
										</div>

										<div className='guide-card-body'>
											<div className='guide-card-body-text'>
												{userType === 'professional' ?
													<span>
														{ this.state.session1Content.page4BodyPro || <span>
															Time to get to work. Together, brainstorm an idea for a new product or feature for your company, ideally something relevant to your job.
															<br /><br />
															Choose a relatively simple product concept. The point is to help your Advisee understand your job using a tangible and fun example.
															<br /><br />
															You won’t actually build this product (at least not in these 3 months), but we’ll guide you through tech-focused conversations in your next sessions using this product concept as an example.
														</span> }
													</span>
												:
													<span>
														{ this.state.session1Content.page4BodyStudent || <span>
															Time to get to work. Together, brainstorm an idea for a new product or feature for your Advisor's company.
															<br /><br />
															Be confident in sharing your ideas for a potential new product. Your Advisor values your perspective and the experience you bring to the table.
															<br /><br />
															You won’t actually build this product (at least not in these 3 months), but we’ll guide you through tech-focused conversations in your next sessions using this product concept as an example.
														</span> }
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
							<p className='guide-conversation-body'>{ this.state.session1Content.page4ResourcesBody || 'To help you decide on a Product Concept...'}</p>
							<ul>
								{userType === 'professional' ?
									<span>
										<li>{ this.state.session1Content.page4ResourcesBullet1Pro || 'Brainstorm a premium new section for your site or app.'}</li>
										<li>{ this.state.session1Content.page4ResourcesBullet2Pro || 'Dream up a new, smarter database.'}</li>
										<li>{ this.state.session1Content.page4ResourcesBullet3Pro || 'Come up with a new app to help meet your company\'s goals.'}</li>
										<li>{ this.state.session1Content.page4ResourcesBullet4Pro || 'Imagine a version of an existing product that targets a totally different customer.'}</li>
									</span>
								:
									<span>
										<li>{ this.state.session1Content.page4ResourcesBullet1Student || 'Brainstorm a premium new section for your site or app.'}</li>
										<li>{ this.state.session1Content.page4ResourcesBullet2Student || 'Dream up a new, smarter database.'}</li>
										<li>{ this.state.session1Content.page4ResourcesBullet3Student || 'Come up with a new app to help meet your Advisor\'s goals.'}</li>
										<li>{ this.state.session1Content.page4ResourcesBullet4Student || 'Imagine a version of an existing product that targets a totally different customer.'}</li>
									</span>
								}
							</ul>
						</div>
					</div>
				</section>

			</div>
		);
	}
}

export default observer(S1Guide4)
