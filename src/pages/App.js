import React, { Component } from 'react';
import '../assets/App.css';
// import fire from '../fire';
// import { Link } from 'react-router';
import Navbar from '../components/Navbar';

// import appState from '../appState'
import { observer } from 'mobx-react';


class App extends Component {

	render() {
		return (
			<div className='App'>
				<Navbar />
				{this.props.children}
			</div>
		);
	}
}

export default observer(App);
