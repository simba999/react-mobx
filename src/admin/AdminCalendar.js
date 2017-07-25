// react
import React, { Component } from 'react';
import filter from 'lodash/filter';
import { Link } from 'react-router';

// firebase
import fire from '../fire';


class AdminCalendar extends Component {

	constructor(props) {
		super(props);

		this.state = {
			users: [],
			startDate: {},
		}
	}

	componentDidMount() {
		fire.database().ref('/users').once('value',  (snapshot) => {
			const getParticipatingStudents = filter(snapshot.val(), (student, index) => {
				// student.waveMatch !== 'johanna@giphy.com'
				//doing this ^^ because firebase breaks as "." is not allowed
				if(student.userType === 'student' &&  student.waveParticipant && student.waveMatch !== 'johanna@giphy.com') {
					return student;
				}
			});
			if(getParticipatingStudents.length) {
				this.setState({
					users: getParticipatingStudents
				})
			}
		});
	}

		//query database for all users where waveParticipant===true && userType==='student'
		// save onChange to student user and waveMatch user
	render() {
		const  { users } = this.state;
		return (
			<div>
				<div className='container mb-100'>
					<div className='row'>
						<div className='col-sm-12'>
							<h1>Calendar</h1>
							<div className='calendar-card-container'>
								{users.map((user, index) => {
									return (<span key={index}>
										<div className='row'>
											<Link to={`/admin/calendar/${user.username}`}>
												<div className='col-sm-12'>{`${user.firstName} ${user.lastName} (${user.email})`}<br /><br /></div>
											</Link>
										</div>
									</span>
								)})}
							</div>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AdminCalendar;
