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


class S1Guide6 extends Component {
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
									<Link to='/wave/session/1/4'>
										<div className='guide-card-nav-button pull-left'>
											<span className='glyphicon glyphicon-chevron-left'></span>
										</div>
									</Link>

									<Link to='/wave/session/1/survey'>
										<div className='guide-card-nav-button pull-right hide'>
											<span className='glyphicon glyphicon-comment'></span>
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
												<li className="nav-dot"></li>
											</Link>
											<Link to='/wave/session/1/5'>
												<li className="nav-dot-active"></li>
											</Link>
										</ul>
									</div>
								</div>

								<div className='guide-card-container'>

										<div className='guide-card-hero'>
											<h3>Session Wrap</h3>
											<div className='divider-honey mt-20'></div>
										</div>

										<div className='guide-card-body'>
											{userType === 'professional' ?
												<p>Congrats! You're now officially #BUILTBYGIRLS colleagues. Before you head out, share your favorite learnings from today's session.</p>
											:
												<p>Congrats! You're now officially #BUILTBYGIRLS colleagues. Before you head out, share your favorite learnings from today's session.</p>
											}
											<ol>
												<li>{'Schedule your next session.'}</li>
												<li>{'Decide what research you can do on your Product Concept before you meet next.'}</li>
												<li>{'Give us your honest feedback in our quick survey.'}</li>
											</ol>
										</div>
										<div className='container'>
											<div className='row'>
												<div className='col-sm-3'></div>
												<div className='col-sm-6'>
													<Link to="/wave/session/1/survey" className='btn btn-default btn-block mb-20' role='button'>Share Feedback</Link>
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

export default observer(S1Guide6)
