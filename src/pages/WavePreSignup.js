// react
import React, { Component } from 'react';
import { Link } from 'react-router';

// components
import EmailCapture from '../components/EmailCapture';
import Footer from '../components/Footer';

// assets
import waveLogo from '../assets/images/logos/wave.png';
// import photoAdvisor from '../assets/images/photos/program-advisor.jpg';

class Advisor extends Component {

	render() {
		return (
			<div>
				<section className='hero'>
					<div className='container'>
						<div className='row hero-container-text'>
							<div className='col-sm-12'>
								<img src={ waveLogo } className={ 'center-block img-responsive mt-20 mb-30'} style={{ maxHeight: 30 }} alt="#BUILTBYGIRLS Hashtag Logo" />
								<div className='divider-honey'></div>
							</div>
						</div>
					</div>
				</section>

				<main className=''>
					<div className='container'>
						<div className='row mb-100'>
							<div className='col-sm-12'>
								<h3>Program Requirements</h3>
								<p className='mt-30'>
									Before you sign, seal, and deliver your submission to join #BUILTBYGIRLS Wave, let's get clear on the program requirements.<br></br><br></br>
									By signing up, you confirm you’ll be able to attend 1:1 meetings...
								</p>
								<ul>
									<li>in person, in NYC (Manhattan or Brooklyn)</li>
									<li>after school hours and before 8pm - on weekdays</li>
									<li>one hour per month in May, June, July for your first match and Sept, Oct, Nov for your second</li>
								</ul>
							</div>
							<div className='row hero-container-btn'>
								<div className='col-sm-3'></div>
								<div className='col-sm-6 mt-50 mb-10'>
									<Link to="/wave/signup" className='btn btn-default btn-block' role='button'>Apply</Link>
								</div>
							</div>
						</div>
					</div>
				</main>

				<Footer />
			</div>
		);
	}
}

export default Advisor;
