// react
import React, { Component } from 'react';

// firebase
import fire from '../fire';
// import firebase from 'firebase';

// import appState from '../appState'



class AdminUsers extends Component {

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

				let props = 'phone,dob,company,title,bio,app,brand,experience,goal,industry,interests,lookingForMentor,obsessions,topics,waveParticipant,waveMatch,waveRM';
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
							<div>id,firstName,lastName,email,phone,userType,dob,company,title,bio,app,brand,emailCapturePath,experience,goal,guardianEmail,guardianName,guardianPhone,industry,interests,lookingForMentor,obsessions,topics,step1completed,step2completed,step3completed,parentalsignaturesent,parentalsignaturecompleted,waveParticipant,waveMatch,waveRM</div>
							{ this.state.users.map( u => {
								return (
									<div key={u.id}>
										{u.id},
										{u.firstName},
										{u.lastName},
										{u.email},
										{u.phone},
										{u.userType},
										{u.dob},
										{u.company},
										{u.title},
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
										{u.lookingForMentor},
										{u.obsessions},
										{u.topics},
										{u.step1completed ? "true" : ""},
										{u.step2completed ? "true" : ""},
										{u.step3completed ? "true" : ""},
										{u.parentalsignaturesent ? "true" : ""},
										{u.parentalsignaturecompleted ? "true" : ""},
										{u.waveParticipant ? "true" : ""},
										{u.waveMatch},
										{u.waveRM}
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

export default AdminUsers;
