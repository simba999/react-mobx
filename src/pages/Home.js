// react
import React, { Component } from 'react';
import { Link } from 'react-router';
// import appState from '../appState'

// firebase
// import fire from '../fire';

// components
import Slider from 'react-slick';
import EmailCapture from '../components/EmailCapture';
import Footer from '../components/Footer';

// assets
import logo from '../assets/logo.svg';
import waveLogo from '../assets/images/logos/wave.png';
import photoAdvisor from '../assets/images/photos/program-advisor.jpg';
import challengeLogo from '../assets/images/logos/challenge.svg';
import challengePhoto from '../assets/images/photos/program-challenge.jpg';
import logoGirlsWhoFund from '../assets/images/logos/girlswhofund.svg';
import photoGirlsWhoFund from '../assets/images/photos/program-girlswhofund.jpg';
import logoHashtag from '../assets/images/logos/hashtag.svg';
import photoHashtag from '../assets/images/photos/program-hashtag.jpg';
import logoForbes from '../assets/images/logos/logo-forbes.png';
import lightbulb from '../assets/images/icons/site/lightbulb.svg';
import network from '../assets/images/icons/site/network.svg';
import rockstar from '../assets/images/icons/site/rockstar.svg';

// import insta1 from '../assets/images/photos/instagram/insta1.jpg';
// import insta2 from '../assets/images/photos/instagram/insta2.jpg';
// import insta3 from '../assets/images/photos/instagram/insta3.jpg';
// import insta4 from '../assets/images/photos/instagram/insta4.jpg';
// import insta5 from '../assets/images/photos/instagram/insta5.jpg';
// import insta6 from '../assets/images/photos/instagram/insta6.jpg';
// import insta7 from '../assets/images/photos/instagram/insta7.jpg';
// import insta8 from '../assets/images/photos/instagram/insta8.jpg';
// import insta9 from '../assets/images/photos/instagram/insta9.jpg';
// import insta10 from '../assets/images/photos/instagram/insta10.jpg';
import socialFB from '../assets/images/icons/social/facebook.svg';
import socialInstagram from '../assets/images/icons/social/instagram.svg';
import socialTwitter from '../assets/images/icons/social/twitter.svg';


const SlickButton = (props) => {
	let p = Object.assign({}, props);
	delete p.buttonType;
	return <span {...p}><span className={`glyphicon glyphicon-menu-${props.buttonType}`} /></span>;
}


class Home extends Component {

	render() {
		return (
			<div>
				<section className='hero'>
					<div className='index-hero-container-img'></div>
					<div className='container'>
						<div className='row'>
							<div className='col-sm-12'>
								<div className='row hero-container-text'>
									<h2>Equipping Young Women to be Leaders in Tech</h2>
									<div className='divider-honey mt-30'></div>
									<p className='mt-20'>We visit cool tech companies, prep you for your internship, and connect you with boss advisors to help you get ahead of the game.</p>
								</div>
								<div className='row hero-container-btn mt-30 mb-4 0'>
									<div className='col-sm-3'></div>
									<div className='col-sm-6'>

									</div>
								</div>
							</div>
						</div>
					</div>
					<hr />
				</section>

				<section className='overview section-block'>
					<div className='container'>
						<div className='row text-center'>
							<div className='col-sm-4 col-xs-12 mt-30'>
								<img className='featured-icon' src={ lightbulb } alt='Lightbulb' />
								<div className='section-break size-xs'></div>
								<h5 className='tx-aol-blue h3 type-bold mb-20'>Opportunities</h5>
								<div className='section-break size-xs'></div>
								<p className='size-lg tx-aol-black pad-txt npt npb nmt nmb mb-40'>Exposing you to the countless possibilities for a career in tech</p>
								<hr className='visible-xs'></hr>
							</div>
							<div className='col-sm-4 col-xs-12	mt-30'>
								<img className='featured-icon' src={ rockstar } alt='Rockstar' />
								<div className='section-break size-xs'></div>
								<h5 className='tx-aol-blue h3 type-bold mb-20'>Practical Skills</h5>
								<div className='section-break size-xs'></div>
								<p className='size-lg tx-aol-black pad-txt npt npb nmt nmb mb-40'>Arming you with the tools to leverage tech for any passion</p>
								<hr className='visible-xs'></hr>
							</div>
							<div className='col-sm-4 col-xs-12 mt-30'>
								<img className='featured-icon' src={ network } alt='Network' />
								<div className='section-break size-xs'></div>
								<h5 className='tx-aol-blue h3 type-bold mb-20'>Connections</h5>
								<div className='section-break size-xs'></div>
								<p className='size-lg tx-aol-black pad-txt npt npb nmt nmb mb-40'>Building you a network of rockstar professional advisors</p>
							</div>
						</div>
					</div>
				</section>

				<aside className='programs-quote-container bg-honey center-block'>
					<div className='container'>
						<div className='row'>
							<div className='col-sm-12'>
								<h3>Technology is the great accelerator – it's the single biggest supercharger that will fuel your passion and drive your success.</h3>
							</div>
						</div>
					</div>
				</aside>

				<section className='program-overview'>
					<a name="programs"></a>
					<div className='container mt-80'>
						<div className='row'>
							<div className='col-sm-12'>
								<div className='container'>
									<div className='row'>
										<div className='col-sm-12'>

											<Slider dots={true} accessibility={true} autoplay={true} autoplaySpeed={7000} pauseOnHover={true} nextArrow={ <SlickButton buttonType='right' /> } prevArrow={ <SlickButton buttonType='left' /> }>

												<div>
													<Link to="/programs/hashtag">
														<img src={ photoHashtag } alt='#BUILTBYGIRLS Hashtag' className='center-block img-responsive' style={{ maxHeight: 550 }} />
													</Link>
													<Link to="/programs/hashtag">
														<img src={ logoHashtag } className={ 'center-block img-responsive mt-30 mb-30'} style={{ maxHeight: 30 }} alt="#BUILTBYGIRLS Hashtag Logo" />
													</Link>
													<div className='divider-honey mt-20'></div>
													<p className='center mt-20'>
														A monthly event series showcasing how tech powers trending companies and industries.
													</p>
													<div className='row hero-container-btn mt-20 mb-4 0'>
														<div className='col-sm-3'></div>
														<div className='col-sm-6 mb-10'>
															<Link to="/programs/hashtag" className='btn btn-default btn-block' role='button'>Learn More</Link>
														</div>
													</div>
												</div>

												<div>
													<Link to="/programs/wave">
														<img src={ photoAdvisor } alt='#BUILTBYGIRLS Advisor Platform' className='center-block img-responsive' style={{ maxHeight: 550 }} />
													</Link>
													<Link to="/programs/wave">
														<img src={ waveLogo } className={ 'center-block img-responsive mt-30 mb-30'} style={{ maxHeight: 30 }} alt="#BUILTBYGIRLS Advisor Platform Logo" />
													</Link>
													<div className='divider-honey mt-20'></div>
													<p className='center mt-20'>
														A mobile platform connecting the next generation of tech leaders with professionals across fields and industries.
													</p>
													<div className='row hero-container-btn mt-20 mb-4 0'>
														<div className='col-sm-3'></div>
														<div className='col-sm-6 mb-10'>
															<Link to="/programs/wave" className='btn btn-default btn-block' role='button'>Learn More</Link>
														</div>
													</div>
												</div>

												<div>
													<Link to="/programs/girlswhofund">
														<img src={ photoGirlsWhoFund } alt='#BUILTBYGIRLS Girls Who Fund' className='center-block img-responsive' style={{ maxHeight: 550 }} />
													</Link>
													<Link to="/programs/girlswhofund">
														<img src={ logoGirlsWhoFund } className={ 'center-block img-responsive mt-30 mb-30'} style={{ maxHeight: 30 }} alt="#BUILTBYGIRLS Challenge Logo" />
													</Link>
													<div className='divider-honey mt-20'></div>
													<p className='center mt-20'>
														An immersive internship showcasing what it takes to be a startup founder and investor.
													</p>
													<div className='row hero-container-btn mt-20 mb-4 0'>
														<div className='col-sm-3'></div>
														<div className='col-sm-6 mb-10'>
															<Link to="/programs/girlswhofund" className='btn btn-default btn-block' role='button'>Learn More</Link>
														</div>
													</div>
												</div>

												<div>
													<Link to="/programs/challenge">
														<img src={ challengePhoto } alt='#BUILTBYGIRLS Challenge' className='center-block img-responsive' style={{ maxHeight: 550 }} />
													</Link>
													<Link to="/programs/challenge">
														<img src={ challengeLogo } className={ 'center-block img-responsive mt-30 mb-30'} style={{ maxHeight: 30 }} alt="#BUILTBYGIRLS Challenge Logo" />
													</Link>
													<div className='divider-honey mt-20'></div>
													<p className='center mt-20'>
														A pitch competition for tech products built by girls, judged by girls.
													</p>
													<div className='row hero-container-btn mt-20 mb-4 0'>
														<div className='col-sm-3'></div>
														<div className='col-sm-6 mb-10'>
															<Link to="/programs/challenge" className='btn btn-default btn-block' role='button'>Learn More</Link>
														</div>
													</div>
												</div>
											</Slider>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='press-quote-container'>
					<div className='container'>
						<div className='row'>
							<div className='col-sm-12'>
								<h3>As Seen In</h3>
								<div className='h-grey'>
									<a href='http://www.forbes.com/sites/geekgirlrising/2016/09/13/meet-the-high-school-girls-taking-on-silicon-valley/#4d1712cf71c9' target='blank'>
										<h3>“Meet The High School Girls Taking Silicon Valley By Storm”</h3>
										<img src={ logoForbes } className={ 'center-block img-responsive mt-40 mb-20'} style={{ maxHeight: 15 }} alt="#BUILTBYGIRLS Challenge Logo" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className=''>
					<h3>Join the conversation</h3>
					<img src={ logo } className={ 'center-block'} style={{ width: 225 }} alt="BUILTBYGIRLS" />
					<div className='divider-honey mt-30'></div>
				</section>

				<footer className='main-footer'>
					<div className='container'>
						<nav className='footer-nav'>
						</nav>

						<nav className="social-nav">
							<a className="social-instagram" href="https://instagram.com/builtbygirls" target="_blank">
								<img src={ socialInstagram } alt='#BUILTBYGIRLS Girls Who Fund' className='social-instagram-icon' />
							</a>

							<a className="social-twitter" href="https://twitter.com/builtbygirls" target="_blank">
								<img src={ socialTwitter } alt='#BUILTBYGIRLS Girls Who Fund' className='social-twitter-icon' />
							</a>

							<a className="social-facebook" href="https://facebook.com/builtbygirls" target="_blank">
								<img src={ socialFB } alt='#BUILTBYGIRLS Girls Who Fund' className='social-facebook-icon' />
							</a>


						</nav>
					</div>
				</footer>

				<EmailCapture />
				<Footer />
			</div>
		);
	}
}

export default Home;
