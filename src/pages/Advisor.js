// react
import React, { Component } from 'react';
// import { Link } from 'react-router';

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
					<div className='programs-banner-container center'>
						Are you a Beta Wave participant? <a href='/wave/login'>Login here</a>.
					</div>
					<div className='advisor-hero-container-img'></div>
					<div className='container'>
						<div className='row hero-container-text'>
							<div className='col-sm-12'>
								<img src={ waveLogo } className={ 'center-block img-responsive mt-20 mb-30'} style={{ maxHeight: 30 }} alt="#BUILTBYGIRLS Hashtag Logo" />
								<div className='divider-honey'></div>
							</div>
						</div>
						<div className='row mb-30'>
							<div className='col-sm-12'>
								<p>A mobile platform connecting the next generation of leaders with expert professionals across a variety of companies and industries using technology to power their businesses.</p>
								<br />
							</div>
						</div>
					</div>
				</section>

				<aside className='programs-quote-container bg-honey center-block'>
					<div className='container'>
						<div className='row'>
							<div className='col-sm-12'>
								<h3>"My Advisor was amazing and the program has helped me gain confidence in my value in tech."</h3>
							</div>
						</div>
					</div>
				</aside>

				<main className=''>
					<div className='container'>
						<div className='row mt-40 mb-100'>
							<div className='col-sm-12'>
								<h3>Overview</h3>
								<p className='mt-30'>
									Our mobile platform matches young women with professionals from a variety of tech roles and industries.
									<br /><br />
									From a hardware engineer at Ringly to a UX designer at Giphy, our advisors are true experts who can share insider tips for how to use tech as a supercharger that will fuel your passion and drive your success.
								</p>
								<hr className='mt-50 mb-50' />

								<h3>Our Wave Partners</h3>
								{/*}<ul>
									<li>Spotify</li>
									<li>Giphy</li>
									<li>Dots</li>
									<li>General Assembly</li>
									<li>Refinery29</li>
									<li>Uber</li>
									<li>Rent the Runway</li>
									<li>Bustle</li>
								</ul>*/}
								<p className='center'>
									Spotify<br />
									Giphy<br />
									Dots<br />
									General Assembly<br />
									Refinery29<br />
									Uber<br />
									Rent the Runway<br />
									Bustle<br />
								</p>

								<hr className='mt-50 mb-50' />

								<h3>How It Works</h3>
								<ul className='mt-30'>
									<li>We match young women interested in learning about tech careers with professionals who are killing it in a range of industries from music to machine learning.</li>
									<li>Each pair meets once a month for one hour at the Advisor’s office over a span of three months.</li>
									<li>Each Advisor and Advisee commits to a year in the program, rotating to a new Advisor or Advisee every 3 months (with a few breaks throughout).</li>
									<li>We guide your sessions on our mobile-first platform; no awkward silences here.</li>
									<li>
										Our content focuses on:
										<ul>
											<li>Real-life learning</li>
											<li>Relevant skills</li>
											<li>A broad network of professional advisors</li>
										</ul>
									</li>
								</ul>
								<p>This is a new kind of club. America’s smartest #girlsquad has arrived.</p>
							</div>
						</div>
					</div>
				</main>
				{<EmailCapture title='Applications Are Currently Closed' subhead='Please sign up to be waitlisted for our beta.' cta='Add me to the waitlist' />}

				<Footer />
			</div>
		);
	}
}

export default Advisor;
