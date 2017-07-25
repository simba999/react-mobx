// react
import React, { Component } from 'react';

// firebase
import fire from '../fire';
// import firebase from 'firebase';

// import appState from '../appState'



class SurveyExport extends Component {

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
		str.replace( /[\r\n]/g, ' ' );
		return `"${str.replace( /["]/g , '""')}"`
	}

	componentWillMount(){

			fire.database().ref('/sessions').on('child_added', s => {
				console.log('[child_added]')
				let user = s.val();
				user.id = s.key;

				fire.database().ref('/users/'+user.id).once('value', s => {
					let userData = s.val();
					user.firstName = userData.firstName;
					user.lastName = userData.lastName;
					user.email = userData.email;
					user.userType = userData.userType;
					user.waveMatch = userData.waveMatch;
					user.waveRM = userData.waveRM;

					let users = this.state.users.slice(0);
					users.push( user );
					this.setState({ users });
				})



			})

	}

	render() {

		return (
			<div>
				<div className='container csv-text mb-100'>
					<div className='row'>
						<div className='col-sm-12'>
							<h1>Survey Responses</h1>
							<div>id,email,firstname,lastname,userType,waveMatch,waveRM,S1_advisorRating,S1_goalRating,S1_guideRating,S1_sessionRating,S1_topicRating,S1_keyLearning,S1_improvements,S2_sessionRating,S2_goalRating,S2_guideFeedback,S2_guideFrequency,S2_guideRating,S2_productFrequency,S2_topicRating,S2_keyLearning,S2_improvements,S3_sessionRating,S3_prepRating,S3_guideFrequency,S3_guideFeedback,S3_programGoal,S3_topicRating,S3_goalRating,S3_impactRating,S3_programDurationFeedback,S3_programExcitementRating,S3_productConceptRating,S3_companyRating,S3_companyFeedback,S3_netPromoter,S3_improvements</div>
							{ this.state.users.map( u => {
								return (
									<div key={u.id}>
										{u.id},
										{u.email},
										{u.firstName},
										{u.lastName},
										{u.userType},
										{u.waveMatch},
										{u.waveRM},
										{!!u.session_1 && !!u.session_1.survey_response && u.session_1.survey_response.advisorRating},
										{!!u.session_1 && !!u.session_1.survey_response && u.session_1.survey_response.goalRating},
										{!!u.session_1 && !!u.session_1.survey_response && u.session_1.survey_response.guideRating},
										{!!u.session_1 && !!u.session_1.survey_response && u.session_1.survey_response.sessionRating},
										{!!u.session_1 && !!u.session_1.survey_response && u.session_1.survey_response.topicRating},
										{!!u.session_1 && !!u.session_1.survey_response && this.csvEsc(u.session_1.survey_response.keyLearning)},
										{!!u.session_1 && !!u.session_1.survey_response && this.csvEsc(u.session_1.survey_response.improvements)},
										{!!u.session_2 && !!u.session_2.survey_response && u.session_2.survey_response.sessionRating},
										{!!u.session_2 && !!u.session_2.survey_response && u.session_2.survey_response.goalRating},
										{!!u.session_2 && !!u.session_2.survey_response && this.csvEsc(u.session_2.survey_response.guideFeedback)},
										{!!u.session_2 && !!u.session_2.survey_response && u.session_2.survey_response.guideFrequency},
										{!!u.session_2 && !!u.session_2.survey_response && u.session_2.survey_response.guideFeedbackRating},
										{!!u.session_2 && !!u.session_2.survey_response && u.session_2.survey_response.productFrequency},
										{!!u.session_2 && !!u.session_2.survey_response && u.session_2.survey_response.topicRating},
										{!!u.session_2 && !!u.session_2.survey_response && this.csvEsc(u.session_2.survey_response.keyLearning)},
										{!!u.session_2 && !!u.session_2.survey_response && this.csvEsc(u.session_2.survey_response.improvements)},
										{!!u.session_3 && !!u.session_3.survey_response && u.session_3.survey_response.sessionRating},
										{!!u.session_3 && !!u.session_3.survey_response && u.session_3.survey_response.prepRating},
										{!!u.session_3 && !!u.session_3.survey_response && u.session_3.survey_response.guideFrequency},
										{!!u.session_3 && !!u.session_3.survey_response && this.csvEsc(u.session_3.survey_response.guideFeedback)},
										{!!u.session_3 && !!u.session_3.survey_response && this.csvEsc(u.session_3.survey_response.programGoal)},
										{!!u.session_3 && !!u.session_3.survey_response && u.session_3.survey_response.topicRating},
										{!!u.session_3 && !!u.session_3.survey_response && u.session_3.survey_response.goalRating},
										{!!u.session_3 && !!u.session_3.survey_response && u.session_3.survey_response.impactRating},
										{!!u.session_3 && !!u.session_3.survey_response && u.session_3.survey_response.programDurationFeedback},
										{!!u.session_3 && !!u.session_3.survey_response && u.session_3.survey_response.programExcitementRating},
										{!!u.session_3 && !!u.session_3.survey_response && u.session_3.survey_response.productConceptRating},
										{!!u.session_3 && !!u.session_3.survey_response && u.session_3.survey_response.companyRating},
										{!!u.session_3 && !!u.session_3.survey_response && u.session_3.survey_response.companyFeedback},
										{!!u.session_3 && !!u.session_3.survey_response && u.session_3.survey_response.netPromoter},
										{!!u.session_3 && !!u.session_3.survey_response && this.csvEsc(u.session_3.survey_response.improvements)},
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

export default SurveyExport;
