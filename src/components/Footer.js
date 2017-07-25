// react
import React, { Component } from 'react';
import { Link } from 'react-router';

// assets
// import logo from '../assets/logo.svg';
import logoW from '../assets/images/logos/logo-w.svg';
import socialFBW from '../assets/images/icons/social/facebook-w.svg';
import socialInstagramW from '../assets/images/icons/social/instagram-w.svg';
import socialTwitterW from '../assets/images/icons/social/twitter-w.svg';

class Footer extends Component {

	render() {
		return (
			<footer className='footer-container'>
				<div className='container'>
					<nav className='footer-nav-container'>
						<div className='row'>
							<div className='col-sm-3'></div>
							<div className='col-sm-2 footer-nav-item'><Link to='/'>HOME</Link></div>
							<div className='col-sm-2 footer-nav-item'><Link to='/about'>ABOUT</Link></div>
							<div className='col-sm-2 footer-nav-item'><Link to='/programs'>PROGRAMS</Link></div>
							<div className='col-sm-3'></div>
						</div>
					</nav>
					<hr className='footer-hr'/>

					<section className='footer-brand-container mt-50'>
						<Link to='/'><img src={ logoW } style={{ width: 250 }} alt='BUILTBYGIRLS' /></Link>
					</section>

					<nav className='social-nav mt-20'>

						<a className='social-instagram' href='https://instagram.com/builtbygirls' target='_blank'>
							<img src={ socialInstagramW } alt='#BUILTBYGIRLS Girls Who Fund' className='social-instagram-icon' />
						</a>

						<a className='social-twitter' href='https://twitter.com/builtbygirls' target='_blank'>
							<img src={ socialTwitterW } alt='#BUILTBYGIRLS Girls Who Fund' className='social-twitter-icon' />
						</a>

						<a className='social-facebook' href='https://facebook.com/builtbygirls' target='_blank'>
							<img src={ socialFBW } alt='#BUILTBYGIRLS Girls Who Fund' className='social-facebook-icon' />
						</a>
					</nav>

					<section className='footer-legal-container mb-20'>
						<p>
							<a href='http://privacy.aol.com/privacy-policy/' target='_blank'>Privacy Policy</a> | <a href='http://legal.aol.com/TOS/' target='_blank'>Terms of Service</a>
							<br />
							&copy; 2017 AOL, Inc. All rights reserved.
						</p>

					</section>
				</div>
			</footer>
		);
	}
}

export default Footer;
