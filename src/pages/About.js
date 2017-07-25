// react
import React, { Component } from 'react';
// import { Link } from 'react-router';

// components
import EmailCapture from '../components/EmailCapture';
import Footer from '../components/Footer';

// assets
// import logo from '../assets/logo.svg';
// import logoW from '../assets/images/logos/logo-w.svg';
// import socialFBW from '../assets/images/icons/social/facebook-w.svg';
// import socialInstagramW from '../assets/images/icons/social/instagram-w.svg';
// import socialTwitterW from '../assets/images/icons/social/twitter-w.svg';
import photoNisha from '../assets/images/photos/team/nisha.png';
import photoDanielle from '../assets/images/photos/team/danielle.jpg';
import photoTory from '../assets/images/photos/team/tory.jpg';



class About extends Component {

	// constructor(props) {
	//	 super(props);
	// }

	render() {
		return (
			<div>
				<section className='hero'>
					<div className='about-hero-container-img'></div>
					<div className='container'>
						<div className='row hero-container-text'>
							<div className='col-sm-12'>
								<h2>Builders. Creators. Innovators.</h2>
								<div className='divider-honey mt-30'></div>
							</div>
						</div>
						<div className='row'>
							<div className='col-sm-12'>
								<p>
									At a moment in time where everyone is talking about girls in STEM, we recognize that code is just the beginning: there are countless opportunities for a career powered by technology.
									<br /><br />
									We visit cool tech companies, prep you for your internships, and connect you with boss advisors who help you get ahead of the game. We&#39;re building a club for the next generation of leaders in technology—a club that embeds young women in tech from the earliest stages. Because there is more work to be done.
								</p>
								<br />
							</div>
						</div>
					</div>
					<hr className='mt-20 mb-30' />
				</section>

				<section className='team'>
					<div className='container'>
						<div className='row mb-40'>
							<div className='col-sm-12 mb-30'>
									<h3>Our Team</h3>
							</div>

							<div className='col-sm-4'>
								<article className='team-member-container'>
									<img src={ photoNisha } width={ '200px' }alt='Nisha Dua, Founder at #BUILTBYGIRLS' className='img-circle team-member-img' />
									<div className='team-member-name'>
										<h4>Nisha Dua</h4>
									</div>
									<div className='team-member-title'> Founder </div>
									<hr className='visible-xs-block' />
								</article>
							</div>

							<div className='col-sm-4'>
								<article className='team-member-container'>
									<img src={ photoTory } width={ '200px' }alt='Tory Marlin, Marketing & Partnerships at #BUILTBYGIRLS' className='img-circle team-member-img' />
									<div className='team-member-name'>
											<h4>Tory Marlin</h4>
									</div>
									<div className='team-member-title'> Marketing &amp; Partnerships </div>
									<hr className='visible-xs-block' />
								</article>
							</div>

							<div className='col-sm-4'>
								<article className='team-member-container'>
									<img src={ photoDanielle } width={ '200px' }alt='Danielle Letayf, Programs & Community at #BUILTBYGIRLS' className='img-circle team-member-img' />
									<div className='team-member-name'>
											<h4>Danielle Letayf</h4>
									</div>
									<div className='team-member-title'> Programs &amp; Community </div>
								</article>
							</div>
						</div>
					</div>
					{/* <hr className=' mb-50' /> */}
				</section>

				{/* <section>
					<h4>[Pending Partner Section]</h4>
					<br /><br /><br /><br /><br /><br />
				</section> */}

				<EmailCapture title='Join the most powerful #girlsquad in America.' subhead='Visit cool tech companies, prep for your internships, and connect with boss advisors who help you get ahead of the game.' />

				<Footer />
			</div>
		);
	}
}

export default About;
