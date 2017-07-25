// react
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Rating from '../components/Rating';

// firebase
import fire from '../fire';

// components
import appState from '../appState'

class S3Survey extends Component {

    constructor(props) {
        super(props);
        this.state = {
          topicTitle: '',
          errors: {},
          sessionRating: 0,
          prepRating: 0,
          guideFrequency: '',
          guideFeedback: '',
          programGoal: '',
          topicRating: 0,
          goalRating: 0,
          impactRating: 0,
          programDurationFeedback: '',
          programExcitementRating: '',
          productConceptRating: 0,
          companyRating: 0,
          companyFeedback: '',
          netPromoter: '',
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

            let topicTitle = '';
            switch(this.state.user.session3topic) {
              case 'back-end-dev':
                topicTitle = 'Back-End Dev';
                self.setState({ topicTitle });
                break;

              case 'business-model':
                topicTitle = 'Business Model';
                self.setState({ topicTitle });
                break;

              case 'business-operations':
                topicTitle = 'Business Operations';
                self.setState({ topicTitle });
                break;

              case 'front-end-dev':
                topicTitle = 'Front-End Dev';
                self.setState({ topicTitle });
                break;

              case 'growth-levers':
                topicTitle = 'Growth Levers';
                self.setState({ topicTitle });
                break;

              case 'hardware':
                topicTitle = 'Hardware';
                self.setState({ topicTitle });
                break;

              case 'media-content':
                topicTitle = 'Media & Content';
                self.setState({ topicTitle });
                break;

              case 'product-management':
                topicTitle = 'Product Management';
                self.setState({ topicTitle });
                break;

              case 'qa':
                topicTitle = 'QA';
                self.setState({ topicTitle });
                break;

              case 'storytelling-brand':
                topicTitle = 'Storytelling & Brand';
                self.setState({ topicTitle });
                break;

              case 'ux-ui':
                topicTitle = 'UX/UI';
                self.setState({ topicTitle });
                break;

              default:
                topicTitle = '';
                self.setState({ topicTitle })
            };


            if(!user.waveParticipant) {
              location.assign('/');
              return;
            }
            else if (user.session_3survey) {
              fire.database().ref(`sessions/${userUid}`).once('value').then( r =>{
                this.state.survey_sr_no = r.val();
                if(this.state.survey_sr_no === null){
                    this.setState({survey_sr_no: "session_3"});
                }
                else if(this.state.survey_sr_no != null && this.state.survey_sr_no.session_3 === undefined){
                    this.setState({survey_sr_no: "session_3"});
                }else if(this.state.survey_sr_no != null && this.state.survey_sr_no.session_3_wave_2 === undefined){
                    this.setState({survey_sr_no: "session_3_wave_2"});
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
          prepRating,
          guideFrequency,
          guideFeedback,
          programGoal,
          topicRating,
          goalRating,
          impactRating,
          programDurationFeedback,
          programExcitementRating,
          productConceptRating,
          companyRating,
          companyFeedback,
          netPromoter,
          improvements
        } = this.state;
        let errors = {};
        sessionRating || (errors.sessionRating = `Please rate this session.`)
        guideFrequency || (errors.guideFrequency = 'Please select how frequently you referenced the Session Guide.')
        programGoal || (errors.programGoal = `Please share your goal for Wave 1.`)
        goalRating || (errors.goalRating = `Please rate your session accomplishments.`)
        impactRating || (errors.impactRating = `Please rate the impact of Wave 1.`)
        programDurationFeedback || (errors.programDurationFeedback = `Please share how you felt about the program duration.`)
        programExcitementRating || (errors.programExcitementRating = `Please share how you're feeling about Wave 2.`)
        productConceptRating || (errors.productConceptRating = `Please share if you'd like to use the product concept as part of the next Wave batch.`);

        let errorsCount = 0;
        for (let i in errors)
            if (errors.hasOwnProperty(i))
                errorsCount++;

        console.log('Errors count:', errorsCount);
        if (!errorsCount) {

            let sessionId = 'session_3';
            if(this.state.survey_sr_no === "session_3_wave_2"){
                sessionId = this.state.survey_sr_no;
            }

            //  /* Update in database */
            let ref = fire.database().ref(`/sessions/${userUid}/${sessionId}/survey_response`);
            console.log(`/sessions/${sessionId}/${userUid}/survey_response`)
            /* 🔥 */
            console.log('handle submit')
            ref.update({
              sessionRating,
              prepRating,
              guideFrequency,
              guideFeedback,
              programGoal,
              topicRating,
              goalRating,
              impactRating,
              programDurationFeedback,
              programExcitementRating,
              productConceptRating,
              companyRating,
              companyFeedback,
              netPromoter,
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
                            <h3>Session 3 Feedback</h3>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='row signup-form-container'>
                        <div className='col-sm-2'></div>

                        <div className='col-sm-8'>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                              {userType === 'student' ?
                                <div>
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
                                      <label className='survey-label' htmlFor="exampleInput">2. The session Prep Work helped me feel equipped to have a meaningful conversation with my Advisor.</label><br/>
                                      <Rating stars={this.state.prepRating} onChange={prepRating => {
                                          this.setState({prepRating})
                                      }}/> {this.state.errors.prepRating
                                          ? <div className="help-block survey-help-block">{this.state.errors.prepRating}</div>
                                          : ''}
                                  </div>

                                  {/* Q3 */}
                                  <div className="form-group">

                                    <label className='survey-label mb-20' htmlFor="exampleInput">3. Throughout my session, I referred to my Session Guide:</label><br></br>
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

                                  {/* Q4 */}
                                  <div className="form-group">
                                      <label className='survey-label' htmlFor="exampleInput">4. The  {this.state.topicTitle} discussion topic was a good fit for my skills.</label>
                                      <Rating stars={this.state.topicRating} onChange={topicRating => {
                                          this.setState({topicRating})
                                      }}/> {this.state.errors.topicRating
                                          ? <div className="help-block survey-help-block">{this.state.errors.topicRating}</div>
                                          : ''}
                                  </div>

                                  {/* Q5 */}
                                  <div className="form-group mb-40">
                                    <label className='survey-label' htmlFor="exampleInput">5. Share feedback on the Session 3 {this.state.topicTitle} Guide.</label>
                                    <textarea className="form-control" rows="3" maxLength={240} onChange={evt => {
                                      this.setState({guideFeedback: evt.target.value})
                                    }}></textarea>
                                    {this.state.errors.guideFeedback
                                      ? <div className="help-block survey-help-block">{this.state.errors.guideFeedback}</div>
                                      : ''}
                                  </div>

                                  <div className='mt-50 mb-30'>
                                    <h3>Wave 1 Feedback</h3>
                                  </div>

                                  {/* Q6 */}
                                  <div className="form-group mb-40">
                                    <label className='survey-label' htmlFor="exampleInput">6. My personal goals for round 1 of the #BUILTBYGIRLS Wave program were…</label>
                                    <textarea className="form-control" rows="3" maxLength={240} onChange={evt => {
                                      this.setState({programGoal: evt.target.value})
                                    }}></textarea>
                                    {this.state.errors.programGoal
                                      ? <div className="help-block survey-help-block">{this.state.errors.programGoal}</div>
                                      : ''}
                                  </div>

                                  {/* Q7 */}
                                  <div className="form-group">
                                    <label className='survey-label' htmlFor="exampleInput">7. The Wave program met my personal goals.</label>
                                  <Rating stars={this.state.goalRating} onChange={goalRating => {
                                      this.setState({goalRating})
                                    }}/> {this.state.errors.goalRating
                                      ? <div className="help-block survey-help-block">{this.state.errors.goalRating}</div>
                                      : ''}
                                  </div>

                                  {/* Q8 */}
                                  <div className="form-group">
                                    <label className='survey-label' htmlFor="exampleInput">8. I feel that I have deeper insight into potential technology careers after spending time with my Advisor.</label>
                                  <Rating stars={this.state.impactRating} onChange={impactRating => {
                                      this.setState({impactRating})
                                    }}/> {this.state.errors.impactRating
                                      ? <div className="help-block survey-help-block">{this.state.errors.impactRating}</div>
                                      : ''}
                                  </div>

                                {/* Q9 */}
                                <div className="form-group">
                                    <label className='survey-label' htmlFor="exampleInput">9. I could see a future for myself at my Advisor’s company.</label><br/>
                                    <Rating stars={this.state.companyRating} onChange={companyRating => {
                                        this.setState({companyRating})
                                    }}/> {this.state.errors.companyRating
                                        ? <div className="help-block survey-help-block">{this.state.errors.companyRating}</div>
                                        : ''}
                                </div>

                                {/* Q10 */}
                                <div className="form-group mb-40">
                                  <label className='survey-label' htmlFor="exampleInput">10. Share what you learned about your Advisor’s company.</label>
                                  <textarea className="form-control" rows="3" maxLength={240} onChange={evt => {
                                    this.setState({companyFeedback: evt.target.value})
                                  }}></textarea>
                                {this.state.errors.companyFeedback
                                    ? <div className="help-block survey-help-block">{this.state.errors.companyFeedback}</div>
                                    : ''}
                                </div>

                                {/* Q11 */}
                                <div className="form-group">
                                  <label className='survey-label  mb-20' htmlFor="exampleInput">11. Three sessions felt like enough time with my Advisor.</label><br />
                                <label className="radio-inline mb-20" htmlFor="programDurationFeedbackAlways">
                                  <input ref={ el=>this.programDurationFeedbackEl = el }
                                    type='radio' name='programDurationFeedback'
                                    value="agree"
                                    id="programDurationFeedbackAlways"
                                    onChange={evt => {this.setState({programDurationFeedback: evt.target.value})}}
                                    />Agree
                                  </label>
                                  <label className="radio-inline mb-20" htmlFor="programDurationFeedbackSometimes">
                                    <input ref={ el=>this.programDurationFeedbackSometimesEl = el }
                                      type='radio' name='programDurationFeedback'
                                      value="neutral"
                                      id="programDurationFeedbackSometimes"
                                      onChange={evt => {this.setState({programDurationFeedback: evt.target.value})}}
                                      />Neutral
                                    </label>
                                    <label className="radio-inline mb-20" htmlFor="programDurationFeedbackNever">
                                      <input ref={ el=>this.programDurationFeedbackNeverEl = el }
                                        type='radio' name='programDurationFeedback'
                                        value="disagree"
                                        id="programDurationFeedbackNever"
                                        onChange={evt => {this.setState({programDurationFeedback: evt.target.value})}}
                                        />Disagree
                                      </label>

                                      {this.state.errors.programDurationFeedback
                                        ? <div className="help-block survey-help-block">{this.state.errors.programDurationFeedback}</div>
                                        : ''
                                      }
                                    </div>

                                    {/* Q12 */}
                                    <div className="form-group">
                                      <label className='survey-label' htmlFor="exampleInput">12. I am excited about meeting with a new Advisor for Wave 2.</label>
                                    <Rating stars={this.state.programExcitementRating} onChange={programExcitementRating => {
                                        this.setState({programExcitementRating})
                                      }}/> {this.state.errors.programExcitementRating
                                        ? <div className="help-block survey-help-block">{this.state.errors.programExcitementRating}</div>
                                        : ''}
                                    </div>

                                    {/* Q13 */}
                                    <div className="form-group">
                                      <label className='survey-label' htmlFor="exampleInput">13. I would like to use the product concept format with a new Advisor for Wave 2.</label>
                                    <Rating stars={this.state.productConceptRating} onChange={productConceptRating => {
                                        this.setState({productConceptRating})
                                      }}/> {this.state.errors.productConceptRating
                                        ? <div className="help-block survey-help-block">{this.state.errors.productConceptRating}</div>
                                        : ''}
                                    </div>

                                    {/* Q14 */}
                                    <div className="form-group">
                                        <label className='survey-label' htmlFor="exampleInput">14. How can we improve #BUILTBYGIRLS Wave? <i>(Maximum: 240 characters)</i></label>
                                        <textarea onChange={evt => {
                                            this.setState({improvements: evt.target.value})
                                        }} className="form-control" rows="3" maxLength={240}></textarea>
                                    </div>

                                </div>

                                :

                                <div>
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

                                    <label className='survey-label mb-20' htmlFor="exampleInput">2. Throughout my session, I referred to my Session Guide:</label><br></br>
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

                                  {/* Q3 */}
                                  <div className="form-group">
                                      <label className='survey-label' htmlFor="exampleInput">3. The  {this.state.topicTitle} discussion topic was a good fit for my skills.</label>
                                      <Rating stars={this.state.topicRating} onChange={topicRating => {
                                          this.setState({topicRating})
                                      }}/> {this.state.errors.topicRating
                                          ? <div className="help-block survey-help-block">{this.state.errors.topicRating}</div>
                                          : ''}
                                  </div>

                                  {/* Q4 */}
                                  <div className="form-group mb-40">
                                    <label className='survey-label' htmlFor="exampleInput">4. Share feedback on the Session 3 {this.state.topicTitle} Guide.</label>
                                    <textarea className="form-control" rows="3" maxLength={240} onChange={evt => {
                                      this.setState({guideFeedback: evt.target.value})
                                    }}></textarea>
                                    {this.state.errors.guideFeedback
                                      ? <div className="help-block survey-help-block">{this.state.errors.guideFeedback}</div>
                                      : ''}
                                  </div>

                                  <div className='mt-50 mb-30'>
                                    <h3>Wave 1 Feedback</h3>
                                  </div>

                                  {/* Q5 */}
                                  <div className="form-group mb-40">
                                    <label className='survey-label' htmlFor="exampleInput">5. My personal goals for round 1 of the #BUILTBYGIRLS Wave program were…</label>
                                    <textarea className="form-control" rows="3" maxLength={240} onChange={evt => {
                                      this.setState({programGoal: evt.target.value})
                                    }}></textarea>
                                    {this.state.errors.programGoal
                                      ? <div className="help-block survey-help-block">{this.state.errors.programGoal}</div>
                                      : ''}
                                  </div>

                                  {/* Q6 */}
                                  <div className="form-group">
                                    <label className='survey-label' htmlFor="exampleInput">6. The Wave program met my personal goals.</label>
                                  <Rating stars={this.state.goalRating} onChange={goalRating => {
                                      this.setState({goalRating})
                                    }}/> {this.state.errors.goalRating
                                      ? <div className="help-block survey-help-block">{this.state.errors.goalRating}</div>
                                      : ''}
                                  </div>

                                  {/* Q7 */}
                                  <div className="form-group">
                                    <label className='survey-label' htmlFor="exampleInput">7. I feel that I made a positive impact on my Advisee’s career trajectory during our time together.</label>
                                  <Rating stars={this.state.impactRating} onChange={impactRating => {
                                      this.setState({impactRating})
                                    }}/> {this.state.errors.impactRating
                                      ? <div className="help-block survey-help-block">{this.state.errors.impactRating}</div>
                                      : ''}
                                  </div>

                                  {/* Q8 */}
                                  <div className="form-group">
                                    <label className='survey-label  mb-20' htmlFor="exampleInput">8. Three sessions felt like enough time with my Advisee.</label><br />
                                  <label className="radio-inline mb-20" htmlFor="programDurationFeedbackAlways">
                                    <input ref={ el=>this.programDurationFeedbackEl = el }
                                      type='radio' name='programDurationFeedback'
                                      value="agree"
                                      id="programDurationFeedbackAlways"
                                      onChange={evt => {this.setState({programDurationFeedback: evt.target.value})}}
                                      />Agree
                                    </label>
                                    <label className="radio-inline mb-20" htmlFor="programDurationFeedbackSometimes">
                                      <input ref={ el=>this.programDurationFeedbackSometimesEl = el }
                                        type='radio' name='programDurationFeedback'
                                        value="neutral"
                                        id="programDurationFeedbackSometimes"
                                        onChange={evt => {this.setState({programDurationFeedback: evt.target.value})}}
                                        />Neutral
                                      </label>
                                      <label className="radio-inline mb-20" htmlFor="programDurationFeedbackNever">
                                        <input ref={ el=>this.programDurationFeedbackNeverEl = el }
                                          type='radio' name='programDurationFeedback'
                                          value="disagree"
                                          id="programDurationFeedbackNever"
                                          onChange={evt => {this.setState({programDurationFeedback: evt.target.value})}}
                                          />Disagree
                                        </label>

                                        {this.state.errors.programDurationFeedback
                                          ? <div className="help-block survey-help-block">{this.state.errors.programDurationFeedback}</div>
                                          : ''
                                        }
                                      </div>

                                      {/* Q9 */}
                                      <div className="form-group">
                                        <label className='survey-label' htmlFor="exampleInput">9. I am excited about meeting with a new Advisee for Wave 2.</label>
                                      <Rating stars={this.state.programExcitementRating} onChange={programExcitementRating => {
                                          this.setState({programExcitementRating})
                                        }}/> {this.state.errors.programExcitementRating
                                          ? <div className="help-block survey-help-block">{this.state.errors.programExcitementRating}</div>
                                          : ''}
                                      </div>

                                      {/* Q10 */}
                                      <div className="form-group">
                                        <label className='survey-label' htmlFor="exampleInput">10. I would like to use the product concept format with a new Advisee for Wave 2.</label>
                                      <Rating stars={this.state.productConceptRating} onChange={productConceptRating => {
                                          this.setState({productConceptRating})
                                        }}/> {this.state.errors.productConceptRating
                                          ? <div className="help-block survey-help-block">{this.state.errors.productConceptRating}</div>
                                          : ''}
                                      </div>

                                      {/* Q11 */}
                                      <div className="form-group">
                                        <label className='survey-label  mb-20' htmlFor="exampleInput">11. How likely would you be to recommend the #BUILTBYGIRLS Wave program to a friend or colleague? <br />(On a scale of 0 to 10, with 0 being least likely and 10 being most likely)</label>
                                        <select className="form-control" name='netPromoter' onChange={evt => {this.setState({netPromoter: evt.target.value})}} value={this.state.netPromoter} ref={ el=> this.netPromoterEl = el }>
                                          <option value=""> -- select an option -- </option>
                                          <option value='0'>0</option>
                                          <option value='1'>1</option>
                                          <option value='2'>2</option>
                                          <option value='3'>3</option>
                                          <option value='4'>4</option>
                                          <option value='5'>5</option>
                                          <option value='6'>6</option>
                                          <option value='7'>7</option>
                                          <option value='8'>8</option>
                                          <option value='9'>9</option>
                                          <option value='10'>10</option>
                                        </select>

                                        {this.state.errors.netPromoter
                                          ? <div className="help-block survey-help-block">{this.state.errors.netPromoter}</div>
                                          : ''
                                        }
                                      </div>

                                      {/* Q12 */}
                                      <div className="form-group">
                                          <label className='survey-label' htmlFor="exampleInput">12. How can we improve #BUILTBYGIRLS Wave? <i>(Maximum: 240 characters)</i></label>
                                          <textarea onChange={evt => {
                                              this.setState({improvements: evt.target.value})
                                          }} className="form-control" rows="3" maxLength={240}></textarea>
                                      </div>

                                </div>
                              }

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

export default observer(S3Survey)
