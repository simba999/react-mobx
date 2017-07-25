// react
import React, { Component } from 'react';
import { Link } from 'react-router';

// components
import EmailCapture from '../components/EmailCapture';
import Slider from 'react-slick';
import Footer from '../components/Footer';

// assets
import logoChallenge from '../assets/images/logos/challenge.svg';
// import photoChallenge from '../assets/images/photos/program-challenge.jpg';
import photoChallenge1 from '../assets/images/photos/challenge/faceprint.jpg';
import photoChallenge2 from '../assets/images/photos/challenge/grogreen.jpg';
import photoChallenge3 from '../assets/images/photos/challenge/headsuptech.jpg';
import photoChallenge4 from '../assets/images/photos/challenge/whistle.jpg';
import photoChallenge5 from '../assets/images/photos/challenge/whiteshirt.jpg';

const SlickButton = (props) => <span {...props}><span className={`glyphicon glyphicon-menu-${props.buttonType}`} /></span>;

class Challenge extends Component {

	render() {
		return (
		<div>
			<section className='hero'>
				<div className='challenge-hero-container-img'></div>
				<div className='container'>
					<div className='row hero-container-text'>
							<div className='col-sm-12'>
							<img src={ logoChallenge } className={'center-block img-responsive mt-20 mb-30'} style={{ maxHeight: 30 }} alt="#BUILTBYGIRLS Challenge Logo" />
							<div className='divider-honey'></div>
							</div>
					</div>
					<div className='row mb-30'>
						<div className='col-sm-12'>
							<p>
								A pitch competition for tech products built by girls, judged by girls.
							</p>
							<br />
						</div>
					</div>
				</div>
			</section>

			<aside className='programs-quote-container bg-honey center-block'>
				<div className='container'>
					<div className='row'>
						<div className='col-sm-12'>
							<h3>"The #BUILTBYGIRLS Challenge made me see myself as a capable, strong tech leader who can conquer anything."</h3>
						</div>
					</div>
				</div>
			</aside>

			<main className='programs-body-container'>
				<div className='container'>
					<div className='row mt-40'>
						<div className='col-sm-12'>
							<h3>How It Works</h3>
							<ul className='mt-30'>
								<li>Girls ages 15-18 with an interest in tech can submit to win the opportunity to pitch their project in front of investors and tech influencers during a live Pitch Day in San Francisco.</li>
								<li>The judges are five college-bound girls who learn the basics of how to be an investor during the <Link to="/programs/girlswhofund">Girls Who Fund</Link> internship.</li>
								<li>Challenge winners receive $10K in funding and mentorship to take their project to the next level, plus the chance to demo on the floor of Startup Alley at TechCrunch Disrupt.</li>
							</ul>
							<hr className='mt-50 mb-30'/>
						</div>
					</div>
				</div>
			</main>

			<section className='challenge-winners-container'>
				<div className='container'>
					<div className='row mb-100'>
							<div className='col-sm-12'>
								<h3>Meet Our 2016 Winners</h3>
								<Slider dots={true} accessibility={true} autoplay={true} autoplaySpeed={7000} pauseOnHover={true} nextArrow={ <SlickButton buttonType='right' /> } prevArrow={ <SlickButton buttonType='left' /> }>
									<div>
										<img src={ photoChallenge1 } width='600px' alt='Erin Smith, Faceprint' className='center-block img-responsive mt-20'	/>
										<h4 className='mt-20'>Grand Prize: Faceprint</h4>
										<div className='center'>Erin Smith, 16</div>
										<div className='divider-honey'></div>
										<p className='mt-20'>
											FacePrint is a research project that uses biomarkers and data that will inform an app for early and accurate Parkinson’s disease detection, leading to earlier treatment and improved pharmaceutical testing.
										</p>
								</div>

								<div>
									<img src={ photoChallenge2 } width='600px' alt='Erin Smith, Faceprint' className='center-block img-responsive mt-20'	/>
								<h4 className='mt-20'>Finalist: GroGreen</h4>
									<div className='center'>Rachel Sterneck, 17; Priya Mittal, 16</div>
									<div className='divider-honey'></div>
									<p className='mt-20'>
										GroGreen is an iOS app that turns wasted food into wanted food by connecting local farms to restaurants and delivering ugly produce items for use in delicious restaurant meals.
									</p>
								</div>

							<div>
								<img
								src={ photoChallenge3 } width='600px' alt='Erin Smith, Faceprint' className='center-block img-responsive mt-20'	/>
							<h4 className='mt-20'>Finalist: HeadsUp Tech</h4>
								<div className='center'>Amulya Balakrishnan, 16; Amira Arora, 16; Sowmya Patapati, 15; Shamini Wadhwani, 16</div>
								<div className='divider-honey'></div>
								<p className='mt-20'>
									HeadsUp Tech is an inexpensive diagnostic hardware attachment for helmets for youth sports teams which provides and stores quantitative data on athletes’ head trauma and the impact of each head injury.
								</p>
							</div>

							<div>
								<img src={ photoChallenge4 } width='600px' alt='Erin Smith, Faceprint' className='center-block img-responsive mt-20'	/>
									<h4 className='mt-20'>Finalist: Whistle</h4>
									<div className='center'>Carson Levine, 17; Catherine Beck, 16</div>
									<div className='divider-honey'></div>
									<p className='mt-20'>
										An iOS app that uses the power of the community to help college students feel safe from the threat of sexual assault; the app allows both victims and witnesses to ping nearby users for help in the event of an assault.
									</p>
							</div>

							<div>
								<img src={ photoChallenge5 } width='600px' alt='Erin Smith, Faceprint' className='center-block img-responsive mt-20'	/>
									<h4 className='mt-20'>Finalist: White Shirt</h4>
									<div className='center'>Lucia Alvarez Villalonga, 17; Grace Haughton, 17; Giselle Briand, 17</div>
									<div className='divider-honey'></div>
									<p className='mt-20'>
										A retail website that allows shoppers to stay focused, curating their online shopping experience by comparing search results for specific items from customizable stores that match their style.
									</p>
							</div>
							</Slider>
						</div>
					</div>
				</div>
			</section>

			{<EmailCapture title='What&#39;s Your Big Idea?' subhead='Sign up to be notified when 2017 applications open.'/>}

			<Footer />
		</div>
		);
	}
}

export default Challenge;
