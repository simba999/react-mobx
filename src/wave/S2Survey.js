// react
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Rating from '../components/Rating';

// firebase
import fire from '../fire';

// components
import appState from '../appState'

class S2Survey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            sessionRating: 0,
            guideRating: 0,
            guideFrequency: '',
            guideFeedback: '',
            topicRating: 0,
            goalRating: 0,
            productFrequency: '',
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
            else if (user.session_2survey) {
              fire.database().ref(`sessions/${userUid}`).once('value').then( r =>{
                this.state.survey_sr_no = r.val();
                if(this.state.survey_sr_no === null){
                    this.setState({survey_sr_no: "session_2"});
                }
                if(this.state.survey_sr_no != null && this.state.survey_sr_no.session_2 === undefined){
                    this.setState({survey_sr_no: "session_2"});
                }else if(this.state.survey_sr_no != null && this.state.survey_sr_no.session_2_wave_2 === undefined){
                    this.setState({survey_sr_no: "session_2_wave_2"});
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
        console.log('handle submit')

        const userUid = fire.auth().currentUser.uid;
        const {
          sessionRating,
          guideRating,
          guideFrequency,
          guideFeedback,
          topicRating,
          goalRating,
          productFrequency,
          keyLearning,
          improvements
        } = this.state;
        let errors = {};
        sessionRating || (errors.sessionRating = `Please rate this session.`);
        guideFrequency || (errors.guideFrequency = 'Please select how frequently you referenced the Session Guide.')
        topicRating || (errors.topicRating = `Please rate the session topics.`);
        goalRating || (errors.goalRating = `Please rate your session accomplishments.`)
        productFrequency || (errors.productFrequency = 'Please select how frequently you referenced a product concept.')
        keyLearning || (errors.keyLearning = `Please share your biggest takeaway.`);

        let errorsCount = 0;
        for (let i in errors)
            if (errors.hasOwnProperty(i))
                errorsCount++;

        console.log('Errors count:', errorsCount);
        if (!errorsCount) {

            let sessionId = 'session_2';
            if(this.state.survey_sr_no === "session_2_wave_2"){
              sessionId = this.state.survey_sr_no;
            }

            //  /* Update in database */
            let ref = fire.database().ref(`/sessions/${userUid}/${sessionId}/survey_response`);
            console.log(`/sessions/${sessionId}/${userUid}/survey_response`)
            /* 🔥 */
            console.log('handle submit')
            ref.update({
              sessionRating,
              guideRating,
              guideFrequency,
              guideFeedback,
              topicRating,
              goalRating,
              productFrequency,
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
          console.log('We have got some errors:', errors)
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
                            <h3>Session 2 Feedback</h3>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='row signup-form-container'>
                        <div className='col-sm-2'></div>

                        <div className='col-sm-8'>
                            <form onSubmit={this.handleSubmit.bind(this)}>

                                {/* Q1 */}
                                <div className="form-group">
                                    <label className='survey-label' htmlFor="exampleInput">1. Please rate your overall session experience.</label><br/>
                                    <Rating stars={this.state.sessionRating} onChange={sessionRating => {
                                        this.setState({sessionRating})
                                    }}/> {this.state.errors.sessionRating
                                        ? <div className="help-block survey-help-block">{this.state.errors.sessionRating}</div>
                                        : ''}
                                </div>

                                {/* Q2 */}
                                <div className="form-group">
                                  {userType === 'student'
                                    ? <label className='survey-label' htmlFor="exampleInput">2. My Advisor and I accomplished the goals identified for this session.</label>
                                    : <label className='survey-label' htmlFor="exampleInput">2. My Advisee and I accomplished the goals identified for this session.</label>
                                }
                                <Rating stars={this.state.goalRating} onChange={goalRating => {
                                    this.setState({goalRating})
                                  }}/> {this.state.errors.goalRating
                                    ? <div className="help-block survey-help-block">{this.state.errors.goalRating}</div>
                                    : ''}
                                  </div>

                                {/* Q3 */}
                                <div className="form-group">
                                  {userType === 'student'
                                    ? <label className='survey-label' htmlFor="exampleInput">3. The session topics were helpful in thinking about the details of a tech career.</label>
                                    : <label className='survey-label' htmlFor="exampleInput">3. The session topics were helpful in conveying the details of a tech career for my Advisee.</label>
                                  }
                                    <Rating stars={this.state.topicRating} onChange={topicRating => {
                                        this.setState({topicRating})
                                    }}/> {this.state.errors.topicRating
                                        ? <div className="help-block survey-help-block">{this.state.errors.topicRating}</div>
                                        : ''}
                                </div>

                                {/* Q4 */}
                                <div className="form-group">
                                  {userType === 'student'
                                    ? <label className='survey-label  mb-20' htmlFor="exampleInput">4. My Advisor and I used a product concept (idea for a new product or feature) as an example for our discussion.</label>
                                    : <label className='survey-label  mb-20' htmlFor="exampleInput">4. My Advisee and I used a product concept (idea for a new product or feature) as an example for our discussion.</label>
                                }
                                <label className="radio-inline mb-20" htmlFor="productFrequencyAlways">
                                  <input ref={ el=>this.productFrequencyEl = el }
                                    type='radio' name='productFrequency'
                                    value="always"
                                    id="productFrequencyAlways"
                                    onChange={evt => {this.setState({productFrequency: evt.target.value})}}
                                    />Always
                                  </label>
                                  <label className="radio-inline mb-20" htmlFor="productFrequencySometimes">
                                    <input ref={ el=>this.productFrequencySometimesEl = el }
                                      type='radio' name='productFrequency'
                                      value="sometimes"
                                      id="productFrequencySometimes"
                                      onChange={evt => {this.setState({productFrequency: evt.target.value})}}
                                      />Sometimes
                                    </label>
                                    <label className="radio-inline mb-20" htmlFor="productFrequencyNever">
                                      <input ref={ el=>this.productFrequencyNeverEl = el }
                                        type='radio' name='productFrequency'
                                        value="never"
                                        id="productFrequencyNever"
                                        onChange={evt => {this.setState({productFrequency: evt.target.value})}}
                                        />Never
                                      </label>

                                      {this.state.errors.productFrequency
                                        ? <div className="help-block survey-help-block">{this.state.errors.productFrequency}</div>
                                        : ''
                                      }
                                    </div>

                                      {/* Q5 */}
                                      <div className="form-group">

                                        <label className='survey-label mb-20' htmlFor="exampleInput">5. Throughout my session, I referred to my Session Guide:</label><br></br>
                                        <label className="radio-inline mb-20" htmlFor="guideFrequencyAlways">
                                          <input ref={ el=>this.guideFrequencyEl = el }
                                            type='radio' name='guideFrequency'
                                            value="always"
                                            id="guideFrequencyAlways"
                                            onChange={evt => {this.setState({guideFrequency: evt.target.value})}}
                                            />Always
                                          </label>
                                          <label className="radio-inline mb-20" htmlFor="guideFrequencySometimes">
                                            <input ref={ el=>this.guideFrequencySometimesEl = el }
                                              type='radio' name='guideFrequency'
                                              value="sometimes"
                                              id="guideFrequencySometimes"
                                              onChange={evt => {this.setState({guideFrequency: evt.target.value})}}
                                              />Sometimes
                                            </label>
                                            <label className="radio-inline mb-20" htmlFor="guideFrequencyNever">
                                              <input ref={ el=>this.guideFrequencyNeverEl = el }
                                                type='radio' name='guideFrequency'
                                                value="never"
                                                id="guideFrequencyNever"
                                                onChange={evt => {this.setState({guideFrequency: evt.target.value})}}
                                                />Never
                                              </label>

                                              {this.state.errors.guideFrequency
                                                ? <div className="help-block survey-help-block">{this.state.errors.guideFrequency}</div>
                                                : ''
                                              }
                                            </div>

                                {/* Q6 */}
                                <div className="form-group">
                                  {userType === 'student'
                                    ? <label className='survey-label' htmlFor="exampleInput">6. The Session Guide facilitated a meaningful conversation with my Advisor.</label>
                                    : <label className='survey-label' htmlFor="exampleInput">6. The Session Guide facilitated a meaningful conversation with my Advisee.</label>
                                }
                                <Rating stars={this.state.guideRating} onChange={guideRating => {
                                    this.setState({guideRating})
                                  }}/> {this.state.errors.guideRating
                                    ? <div className="help-block survey-help-block">{this.state.errors.guideRating}</div>
                                    : ''}
                                  </div>





                                      {/* Q7 */}
                                      <div className="form-group mb-40">
                                        {userType === 'student'
                                          ? <label className='survey-label' htmlFor="exampleInput">7. Share your feedback on the Session Guide and prep work (length, structure, tone, ease of use during the session, etc.)</label>
                                          : <label className='survey-label' htmlFor="exampleInput">7. Share your feedback on the Session Guide (length, structure, tone, ease of use during the session, etc.)</label>
                                      }
                                      <textarea className="form-control" rows="3" maxLength={240} onChange={evt => {
                                          this.setState({guideFeedback: evt.target.value})
                                        }}></textarea>
                                        {this.state.errors.guideFeedback
                                          ? <div className="help-block survey-help-block">{this.state.errors.guideFeedback}</div>
                                          : ''}
                                        </div>

                                {/* Q8 */}
                                <div className="form-group mb-40">
                                  <label className='survey-label' htmlFor="exampleInput">8. What was your most valuable takeaway from this session? <i>(Maximum: 240 characters)</i></label>
                                    <textarea className="form-control" rows="3" maxLength={240} onChange={evt => {
                                        this.setState({keyLearning: evt.target.value})
                                    }}></textarea>
                                    {this.state.errors.keyLearning
                                        ? <div className="help-block survey-help-block">{this.state.errors.keyLearning}</div>
                                        : ''}
                                </div>

                                {/* Q9 */}
                                <div className="form-group">
                                    <label className='survey-label' htmlFor="exampleInput">9. Additional comments? How can we improve the program for your next session? <i>(Maximum: 240 characters)</i></label>
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

export default observer(S2Survey)
