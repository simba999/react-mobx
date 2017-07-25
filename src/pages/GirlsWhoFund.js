// react
import React, { Component } from 'react';
import { Link } from 'react-router';

// components
import EmailCapture from '../components/EmailCapture';
import Footer from '../components/Footer';

// assets
import logoGirlsWhoFund from '../assets/images/logos/girlswhofund.svg';
//import photoGirlsWhoFund from '../assets/images/photos/program-girlswhofund.jpg';

class GirlsWhoFund extends Component {

	render() {
		return (
			<div>
				<section className='hero'>
					<div className='girlswhofund-hero-container-img'></div>
					<div className='container'>
						<div className='row hero-container-text'>
							<div className='col-sm-12'>
								<img src={ logoGirlsWhoFund } className={ 'center-block img-responsive mt-20 mb-30'} style={{ maxHeight: 30 }} alt="#BUILTBYGIRLS Challenge Logo" />
								<div className='divider-honey'></div>
							</div>
						</div>
						<div className='row mb-30'>
							<div className='col-sm-12'>
								<p>
									An immersive internship showcasing what it takes to be a startup founder and investor.
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
								<h3>"Even though I hadn't seen a lot of women VCs, now I know that I can be one."</h3>
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
									<li>College-bound girls spend four weeks in NYC for an apprenticeship with BBG Ventures, an early-stage seed fund investing in consumer tech startups with at least one female founder.</li>
									<li>The Girls Who Fund learn the basics of running a startup, dive into the fundamentals of venture capital (VC), meet some of the best founders and VCs in the business - and sit in on real pitch meetings.</li>
									<li>At the end of the summer, they judge the <Link to="/programs/challenge">#BUILTBYGIRLS Challenge</Link>, a pitch competition for tech products built by girls.</li>
									<li>Applications open April each year.</li>
								</ul>
							</div>
						</div>
					</div>
				</main>

				<EmailCapture title='Notify me when apps open'/>

				<Footer />
			</div>
		);
	}
}

export default GirlsWhoFund;
