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
								<h3>Under 15</h3>
								<p className='mt-30'>
									We’re so thrilled you want to join the next wave of tech leaders; unfortunately, the Wave program is currently only for girls ages 15-18. Keep working on your #techboss skills in the meantime, and keep an eye out for our newsletter to stay in the loop on all of our programs.
								</p>
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
