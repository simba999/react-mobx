// react
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Rating from '../components/Rating';

// firebase
import fire from '../fire';

// components
import appState from '../appState'

class S1Survey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            sessionRating: 0,
            advisorRating: 0,
            guideRating: 0,
            topicRating: 0,
            goalRating: 0,
            keyLearning: '',
            improvements: '',
            survey_sr_no: null
        }
    }

    componentDidMount() {

      const self = this;
      let loadData = () => {
        if(!fire.auth().currentUser) {
          setTimeout( loadData, 50);
          return;
        }

        let userUid = fire.auth().currentUser.uid;
        fire.database().ref(`users/${userUid}`).once('value').then( s =>{
          let user = s.val();
          if(user) {
            this.setState({ user });

            if(!user.waveParticipant) {
              location.assign('/');
              return;
            }
            else if (user.session_1survey) {
              fire.database().ref(`sessions/${userUid}`).once('value').then( r =>{
                this.state.survey_sr_no = r.val();
                if(this.state.survey_sr_no === null){
                    this.setState({survey_sr_no: "session_1"});
                }
                else if(this.state.survey_sr_no != null && this.state.survey_sr_no.session_1 === undefined){
                    this.setState({survey_sr_no: "session_1"});
                }else if(this.state.survey_sr_no != null && this.state.survey_sr_no.session_1_wave_2 === undefined){
                    this.setState({survey_sr_no: "session_1_wave_2"});
                }else{
                    location.assign('/wave');
                }
              })
            }
          } else {
              location.assign('/wave/login');
              return;
          }
        })
      }
      setTimeout( loadData, 50)
    };

    handleSubmit(e) {
        e.preventDefault();

        const userUid = fire.auth().currentUser.uid;
        const {
            sessionRating,
            advisorRating,
            guideRating,
            topicRating,
            goalRating,
            keyLearning,
            improvements
        } = this.state;
        let errors = {};
        sessionRating || (errors.sessionRating = `Please rate this session.`);
        advisorRating || (errors.advisorRating = `Please rate your connection.`);
        guideRating || (errors.guideRating = `Please rate this guide.`);
        topicRating || (errors.topicRating = `Please rate this topic.`);
        goalRating || (errors.goalRating = `Please rate your goal attainment.`)
        keyLearning || (errors.keyLearning = `Please share your biggest takeaway.`);

        let errorsCount = 0;
        for (let i in errors)
            if (errors.hasOwnProperty(i))
                errorsCount++;

        if (!errorsCount) {
            let sessionId = 'session_1';
            if(this.state.survey_sr_no === "session_1_wave_2"){
                sessionId = this.state.survey_sr_no;
            }

            //  /* Update in database */
            let ref = fire.database().ref(`/sessions/${userUid}/${sessionId}/survey_response`);

            /* 🔥 */
            ref.update({
                sessionRating,
                advisorRating,
                guideRating,
                topicRating,
                goalRating,
                keyLearning,
                improvements
            }).then(() => {
              let userRef = fire.database().ref(`/users/${userUid}`)
              userRef.update({
                [`${sessionId}survey`]: true
              })
              const updateIntercom = {[`${sessionId}survey`]: true};
              appState.initIntercom(updateIntercom);

                /* data saved  */
                console.info('data saved');
                location.assign('/wave');
            }).catch(error => {
                /* Error saving user data to database */
                console.warn(`Error saving user data to database`);
            });
        } else {
            this.setState({errors});
        }
    }

    render() {
      const { userType } = appState.userMeta;

        return (
            <div>

                <div className='container signup-form-title'>
                    <div className='row'>
                        <div className='col-sm-3'></div>
                        <div className='col-sm-6 mt-20'>
                            <h3>Session 1 Feedback</h3>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='row signup-form-container'>
                        <div className='col-sm-2'></div>

                        <div className='col-sm-8'>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">

                                    <label className='survey-label' htmlFor="exampleInput">Please rate your overall session experience.</label><br/>

                                    <Rating stars={this.state.sessionRating} onChange={sessionRating => {
                                        this.setState({sessionRating})
                                    }}/> {this.state.errors.sessionRating
                                        ? <div className="help-block survey-help-block">{this.state.errors.sessionRating}</div>
                                        : ''}

                                </div>

                                <div className="form-group">
                                    {userType === 'student'
                                      ? <label className='survey-label' htmlFor="exampleInput">I connected with my Advisor based on professional and personal interests.</label>
                                      : <label className='survey-label' htmlFor="exampleInput">I connected with my Advisee based on professional and personal interests.</label>
                                    }
                                    <Rating stars={this.state.advisorRating} onChange={advisorRating => {
                                        this.setState({advisorRating})
                                    }}/> {this.state.errors.advisorRating
                                        ? <div className="help-block survey-help-block">{this.state.errors.advisorRating}</div>
                                        : ''}
                                </div>

                                <div className="form-group">
                                  {userType === 'student'
                                    ? <label className='survey-label' htmlFor="exampleInput">The Session Guide facilitated a meaningful conversation with my Advisor.</label>
                                    : <label className='survey-label' htmlFor="exampleInput">The Session Guide facilitated a meaningful conversation with my Advisee.</label>
                                  }
                                    <Rating stars={this.state.guideRating} onChange={guideRating => {
                                        this.setState({guideRating})
                                    }}/> {this.state.errors.guideRating
                                        ? <div className="help-block survey-help-block">{this.state.errors.guideRating}</div>
                                        : ''}
                                </div>

                                <div className="form-group">
                                  {userType === 'student'
                                    ? <label className='survey-label' htmlFor="exampleInput">The session topics were helpful in understanding the possibilities of a tech career.</label>
                                    : <label className='survey-label' htmlFor="exampleInput">The session topics were helpful in conveying the possibilities of a tech career for my Advisee.</label>
                                  }
                                    <Rating stars={this.state.topicRating} onChange={topicRating => {
                                        this.setState({topicRating})
                                    }}/> {this.state.errors.topicRating
                                        ? <div className="help-block survey-help-block">{this.state.errors.topicRating}</div>
                                        : ''}
                                </div>

                                <div className="form-group">
                                  <label className='survey-label' htmlFor="exampleInput">My goals for this session were accomplished.</label>
                                    <Rating stars={this.state.goalRating} onChange={goalRating => {
                                        this.setState({goalRating})
                                    }}/> {this.state.errors.goalRating
                                        ? <div className="help-block survey-help-block">{this.state.errors.goalRating}</div>
                                        : ''}
                                </div>

                                <div className="form-group mb-40">
                                  {userType === 'student'
                                    ? <label className='survey-label' htmlFor="exampleInput">Share one thing you learned from your Advisor during your session. <i>(Maximum: 240 characters)</i></label>
                                    : <label className='survey-label' htmlFor="exampleInput">Share one thing that you believe had the greatest impact on your Advisee during this session. <i>(Maximum: 240 characters)</i></label>
                                  }
                                    <textarea className="form-control" rows="3" maxLength={240} onChange={evt => {
                                        this.setState({keyLearning: evt.target.value})
                                    }}></textarea>
                                    {this.state.errors.keyLearning
                                        ? <div className="help-block survey-help-block">{this.state.errors.keyLearning}</div>
                                        : ''}
                                </div>

                                <div className="form-group">
                                    <label className='survey-label' htmlFor="exampleInput">Additional comments? How can we improve the program for your next session? <i>(Maximum: 240 characters)</i></label>
                                    <textarea onChange={evt => {
                                        this.setState({improvements: evt.target.value})
                                    }} className="form-control" rows="3" maxLength={240}></textarea>
                                </div>

                                <div className='signup-form-btn-container'>
                                    <div className='row'>
                                        <div className='col-sm-3'></div>
                                        <div className='col-sm-6'>
                                            <input type='submit' className='btn btn-default btn-block' value='Submit Feedback'/>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default observer(S1Survey)
