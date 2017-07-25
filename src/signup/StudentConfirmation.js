// react
import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';

// firebase
//import fire from '../fire';
//import firebase from 'firebase';

// components
import appState from '../appState'
import Footer from '../components/Footer';

// assets
//import indicator1o3 from '../assets/indicator-1o3.svg'


class Confirmation extends Component {

	// constructor(props){
	// 	super(props)
	// 	setTimeout(()=>{
	// 		browserHistory.push(`/`);
	// 	}, 7000)
	// }

	render() {
		return (
			<div className="">
				<div className='container'>
					<div className='row'>
						<div className='col-sm-12'>
							<div className='row hero-container-text'>
								<h2>Thanks for Signing Up!</h2>
								<div className='divider-honey mt-30'></div>
								<p className='mt-20 center'>Phew, the hardest part&#39;s over. Now we&#39;ll work our magic to find your match.</p>
							</div>
							<div className='row hero-container-btn mt-30 mb-40'>
								<div className='col-sm-12'>
									<div className='timeline-container'>
										<div className='timeline-container-left-bar' />
										<ul>
											<li className={`timeline-${appState.userMeta.step3completed ?  'complete' : 'incomplete'}`}><span className='timeline-bullet' />Profile Complete</li>
											<li className='timeline-incomplete'><span className='timeline-bullet' />#BUILTBYGIRLS Matching</li>
											<li className='timeline-incomplete'><span className='timeline-bullet' />Meet Your Match <i>(May 1st)</i></li>
											<li className='timeline-incomplete'><span className='timeline-bullet' />Kickoff Event <i>(TBD)</i></li>
											<li className='timeline-incomplete'><span className='timeline-bullet' />Schedule First Session <i>(by May 10th)</i></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default observer(Confirmation);
