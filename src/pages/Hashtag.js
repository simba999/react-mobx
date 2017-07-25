// react
import React, { Component } from 'react';
// import { Link } from 'react-router';

// components
import EmailCapture from '../components/EmailCapture';
import Footer from '../components/Footer';

// assets
import logoHashtag from '../assets/images/logos/hashtag.svg';
// import placemark from '../assets/placemark.svg';
// import fire from './fire';

class Hashtag extends Component {

	render() {
		return (
			<div>
				<section className='hero'>
					<div className='hashtag-hero-container-img'></div>
					<div className='container'>
						<div className='row hero-container-text'>
							<div className='col-sm-12'>
								<img src={ logoHashtag } className={ 'center-block img-responsive mt-20 mb-30'} style={{ maxHeight: 30 }} alt="#BUILTBYGIRLS Hashtag Logo" />
								<div className='divider-honey'></div>
							</div>
						</div>
						<div className='row mb-30'>
							<div className='col-sm-12'>
								<p>
									An event series offering an inside look at how the hottest tech companies create powerful products.
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
								<h3>"I&#39;ve learned about computer science in theory, but it really came to life at the Hashtag."</h3>
							</div>
						</div>
					</div>
				</aside>

				<main className=''>
					<div className='container'>
						<div className='row mt-40'>
							<div className='col-sm-12'>
								<h3>How It Works</h3>
								<ul className='mt-30 mb-100'>
									<li>Each month, high school and college women join us at a different company to learn more about how technology drives brands we love.</li>
									<li>From the <a href='https://medium.com/a-world-builtbygirls/when-ibm-watson-robot-bae-ignores-you-550149699a0f#.p1cb2cc2h' target='_blank'>Tech of Cognitive Computing at IBM Watson</a> to the <a href='https://medium.com/a-world-builtbygirls/builtbygirls-puts-a-tech-spin-on-music-at-spotify-9d870d444221#.my1qrzwe5' target='_blank'>Tech of Music at Spotify</a>, we showcase how tangible tech can be through panels, workshops and networking activities and explore the endless possibilities for a career in tech in any industry.</li>
									<li>So far we&#39;ve visited Snapchat, BuzzFeed, LinkedIn, Thinx, OkCupid, Broadway, and more, and we can&#39;t wait to show you what 2017 has to offer. </li>
								</ul>
							</div>
						</div>
					</div>
				</main>

				<EmailCapture title='Stay In The Loop' subhead='Be the first to know about upcoming events.' />

				<Footer />
			</div>
		);
	}
}

export default Hashtag;
