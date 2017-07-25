// react
import React, { Component } from 'react';

// firebase
import fire from '../fire';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
// import firebase from 'firebase';

// import appState from '../appState'



class AdminIntercomImport extends Component {

	constructor(props) {
		super(props);

		this.state = {
			users: []
		}

	}

	formatPhone(str){
		if(str.length === 10){
			str = '1'+str;
		}
		if(str.length === 11){
			str = '+' + str;
		}
		return str;
	}

	csvEsc(str){
		str = str.trim();
		str = str.substring(0,200); // Truncating string length to accommodate Intercom custom attribute character limit
		str.replace( /[\r\n]/g, ' ' );
		return `"${str.replace( /["]/g , '""')}"`
	}

	componentWillMount(){

			fire.database().ref('/users').on('child_added', s => {
				console.log('[child_added]')
				let users = this.state.users.slice(0);

				let user = s.val();
				user.id = s.key;

				let props = 'phone,dob,company,title,role,technology,bio,app,brand,experience,goal,industry,interests,lookingForMentor,superpower,obsessions,topics';
				props = props.split(',');


			 	props.forEach( prop => {
					if(user[prop]){
						if( prop === 'phone'){
							user[prop] = this.formatPhone(user[prop])
						} else {
							user[prop] = this.csvEsc(user[prop]);
						}
					}
				})
				users.push( user );
				this.setState({ users });
			})

	}

	render() {

		return (
			<div>
				<div className='container csv-text mb-100'>
					<div className='row'>
						<div className='col-sm-12'>
							<h1>Users</h1>
							<div>id,firstName,lastName,email,username,createdAt,phone,userType,dob,location,waveBatch,company,title,role,technology,waveBatch,referrer,bio,app,brand,emailCapturePath,experience,goal,guardianEmail,guardianName,guardianPhone,industry,interests,topic1,topic2,topic3,lookingForMentor,obsessions,topics,superpower,step1completed,step2completed,step3completed,checkrcomplete,parentalsignaturesent,parentalsignaturecompleted,waveParticipant,waveParticipantActive,waveMatch,waveRM,session3topic,session1date,session2date,session3date,session_1survey,session_2survey,session_3survey,w1waveMatch,w1waveRM,w1session3topic,w2waveMatch,w2session3topic</div>
							{ this.state.users.map( u => {
								return (
									<div key={u.id}>
										{u.id},
										{u.firstName},
										{u.lastName},
										{u.email},
										{u.username},
										{u.createdAt},
										{u.phone},
										{u.userType},
										{u.dob},
										{u.location},
										{u.waveBatch},
										{u.company},
										{u.title},
										{u.role},
										{u.technology},
										{u.waveBatch},
										{u.referrer},
										{u.bio},
										{u.app},
										{u.brand},
										{u.emailCapturePath},
										{u.experience},
										{u.goal},
										{u.guardianEmail},
										{u.guardianName},
										{u.guardianPhone},
										{u.industry},
										{u.interests},
										{u.topic1},
										{u.topic2},
										{u.topic3},
										{u.lookingForMentor},
										{u.obsessions},
										{u.topics},
										{u.superpower},
										{u.step1completed ? "true" : ""},
										{u.step2completed ? "true" : ""},
										{u.step3completed ? "true" : ""},
										{u.checkrcomplete ? "true" : ""},
										{u.parentalsignaturesent ? "true" : ""},
										{u.parentalsignaturecompleted ? "true" : ""},
										{u.waveParticipant ? "true" : ""},
										{u.waveParticipantActive ? "true" : ""},
										{u.waveMatch},
										{u.waveRM},
										{u.session3topic},
										{u.session1date ? moment(+u.session1date).tz('America/New_York').format('YYYY-MM-DD[ ]hh:mm:ss[ EST]') : ""},
										{u.session2date ? moment(+u.session2date).tz('America/New_York').format('YYYY-MM-DD[ ]hh:mm:ss[ EST]') : ""},
										{u.session3date ? moment(+u.session3date).tz('America/New_York').format('YYYY-MM-DD[ ]hh:mm:ss[ EST]') : ""},
										{u.session_1survey ? "true" : ""},
										{u.session_2survey ? "true" : ""},
										{u.session_3survey ? "true" : ""},
										{u.w1waveMatch},
										{u.w1waveRM},
										{u.w1session3topic},
										{u.w2waveMatch},
										{u.w2session3topic}
									</div>
								)
							} )}

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AdminIntercomImport;
