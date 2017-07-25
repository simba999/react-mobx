// react
import React, { Component } from 'react';
import { Link } from 'react-router';

// components
import EmailCapture from '../components/EmailCapture';
import Footer from '../components/Footer';

// assets
// import logo from '../assets/logo.svg';
import waveLogo from '../assets/images/logos/wave.png';
import photoAdvisor from '../assets/images/photos/program-advisor.jpg';
import challengeLogo from '../assets/images/logos/challenge.svg';
import challengePhoto from '../assets/images/photos/program-challenge.jpg';
import logoGirlsWhoFund from '../assets/images/logos/girlswhofund.svg';
import photoGirlsWhoFund from '../assets/images/photos/program-girlswhofund.jpg';
import logoHashtag from '../assets/images/logos/hashtag.svg';
import photoHashtag from '../assets/images/photos/program-hashtag.jpg';


class Programs extends Component {

	render() {
		return (
			<div>
				<section className='program-overview'>
					<div className='container'>
						<div className='row mb-40'>
							<div className='col-sm-12'>
								<div className='row hero-container-text'>
									{/* <img src={logo} className='center-block'/> */}
									<h2>Programs</h2>
									<div className='divider-honey mt-30'></div>
									<p className='mt-20'>From internships to events, our programs will expose you to the infinite possibilities for a career in tech, teach you skills that will make you a rockstar intern, and connect you to the industry's best professionals. </p>
								</div>
							</div>
						</div>
					</div>

					<div className='container'>
						<div className='row'>
							<div className='col-sm-12'>
								<div className='container'>
									<div className='row'>
										<div className='col-sm-12'>

											<div>
												<Link to="/programs/hashtag"><img src={ photoHashtag } alt='#BUILTBYGIRLS Hashtag' className='center-block img-responsive' style={{ maxHeight: 550 }} /></Link>
												<Link to="/programs/hashtag"><img src={ logoHashtag } className={ 'center-block img-responsive mt-30 mb-30'} style={{ maxHeight: 30 }} alt="#BUILTBYGIRLS Hashtag Logo" /></Link>
												<div className='divider-honey mt-20'></div>
												<p className='center mt-20'>
													An event series offering an inside look at how the hottest tech companies create powerful products.
												</p>
												<div className='row hero-container-btn mt-20 mb-4 0'>
													<div className='col-sm-3'></div>
													<div className='col-sm-6 mb-10'>
														<Link to="/programs/hashtag" className='btn btn-default btn-block' role='button'>Learn More</Link>
													</div>
												</div>
											</div>

											<hr className='mt-40 mb-60' />

											<div>
												<Link to="/programs/wave"><img src={ photoAdvisor } alt='#BUILTBYGIRLS Advisor Platform' className='center-block img-responsive' style={{ maxHeight: 550 }} /></Link>
												<Link to="/programs/wave"><img src={ waveLogo } className={ 'center-block img-responsive mt-30 mb-30'} style={{ maxHeight: 30 }} alt="#BUILTBYGIRLS Advisor Platform Logo" /></Link>
												<div className='divider-honey mt-20'></div>
												<p className='center mt-20'>
													A mobile platform connecting the next generation of leaders with expert professionals across a variety of companies and industries using technology to power their businesses.
												</p>
												<div className='row hero-container-btn mt-20 mb-4 0'>
													<div className='col-sm-3'></div>
													<div className='col-sm-6 mb-10'>
														<Link to="/programs/wave" className='btn btn-default btn-block' role='button'>Learn More</Link>
													</div>
												</div>
											</div>

											<hr className='mt-40 mb-60' />

											<div className=''>
												<Link to="/programs/girlswhofund"><img src={ photoGirlsWhoFund } alt='#BUILTBYGIRLS Girls Who Fund' className='center-block img-responsive' style={{ maxHeight: 550 }} /></Link>
												<Link to="/programs/girlswhofund"><img src={ logoGirlsWhoFund } className={ 'center-block img-responsive mt-30 mb-30'} style={{ maxHeight: 30 }} alt="#BUILTBYGIRLS Challenge Logo" /></Link>
												<div className='divider-honey mt-20'></div>
												<p className='center mt-20'>
													An immersive internship teaching girls what it takes to be a startup founder and a VC.
												</p>
												<div className='row hero-container-btn mt-20 mb-4 0'>
													<div className='col-sm-3'></div>
													<div className='col-sm-6 mb-10'>
														<Link to="/programs/girlswhofund" className='btn btn-default btn-block' role='button'>Learn More</Link>
													</div>
												</div>
											</div>

											<hr className='mt-40 mb-60' />

											<div className='mb-80'>
												<Link to="/programs/challenge"><img src={ challengePhoto } alt='#BUILTBYGIRLS Challenge' className='center-block img-responsive' style={{ maxHeight: 550 }} /></Link>
												<Link to="/programs/challenge"><img src={ challengeLogo } className={ 'center-block img-responsive mt-30 mb-30'} style={{ maxHeight: 30 }} alt="#BUILTBYGIRLS Challenge Logo" /></Link>
												<div className='divider-honey mt-20'></div>
												<p className='center mt-20'>
														A pitch competition for tech products built by girls, judged by girls.
												</p>
												<div className='row hero-container-btn mt-20 mb-40'>
													<div className='col-sm-3'></div>
													<div className='col-sm-6 mb-10'>
														<Link to="/programs/challenge" className='btn btn-default btn-block' role='button'>Learn More</Link>
													</div>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<EmailCapture title='Join the most powerful #girlsquad in America.' subhead='Visit cool tech companies, prep for your internship, and connect with boss advisors so you can get ahead of the game.' />

				<Footer />

			</div>
		);
	}
}

export default Programs;
