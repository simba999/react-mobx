// react
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import  moment from 'moment';

// firebase
import fire from '../fire';

// assets
import waveLogo from '../assets/images/logos/wave.png';
import iconGuide1 from '../assets/images/icons/wave/iconGuide1.png';
import iconGuide2 from '../assets/images/icons/wave/iconGuide2.png';
import iconGuide3 from '../assets/images/icons/wave/iconGuide3.png';
import iconResContact from '../assets/images/icons/wave/iconResContact.png';
import iconGuideResources from '../assets/images/icons/wave/iconGuideResources.png';


class WaveDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      matchUser: {},
      matchUserAvatar: '',
      rmUser: {},
      topicTitle: '',
      waveStatusText: '',
      waveStatusUrl: '',
      session2topicTitle: ''
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

          // user.waveMatch
          fire.database().ref(`users/${user.waveMatch}`).once('value').then( s2 =>{
            let matchUser = s2.val();
            self.setState({ matchUser });

          });

          // user.waveRM
          if(user.waveRM) {
            fire.database().ref(`users/${user.waveRM}`).once('value').then( s3 =>{
              let rmUser = s3.val();
              self.setState({ rmUser });

            });
          }
          if(user.waveMatch) {
            fire.storage().ref(`/Profiles/Avatars/${user.waveMatch}`).getDownloadURL().then( matchUserAvatar =>{
              self.setState({ matchUserAvatar })
            });
          }

          if(!user.waveParticipant && !user.step3completed) {
            location.assign('/wave/signup');
            return;
          }

          if(!user.waveParticipant && user.step3completed) {
            location.assign(`/wave/signup/${user.userType}/confirmation`);
            return;
          }

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

            case 'uxui':
              topicTitle = 'UX/UI';
              self.setState({ topicTitle });
              break;

            default:
              topicTitle = '';
              self.setState({ topicTitle })
          };

          let session2topicTitle = '';
          switch(this.state.user.w2session3topic) {
            case 'back-end-dev':
              session2topicTitle = 'Back-End Dev';
              self.setState({ session2topicTitle });
              break;

            case 'business-model':
              session2topicTitle = 'Business Model';
              self.setState({ session2topicTitle });
              break;

            case 'business-operations':
              session2topicTitle = 'Business Operations';
              self.setState({ session2topicTitle });
              break;

            case 'front-end-dev':
              session2topicTitle = 'Front-End Dev';
              self.setState({ session2topicTitle });
              break;

            case 'growth-levers':
              session2topicTitle = 'Growth Levers';
              self.setState({ session2topicTitle });
              break;

            case 'hardware':
              session2topicTitle = 'Hardware';
              self.setState({ session2topicTitle });
              break;

            case 'media-content':
              session2topicTitle = 'Media & Content';
              self.setState({ session2topicTitle });
              break;

            case 'product-management':
              session2topicTitle = 'Product Management';
              self.setState({ session2topicTitle });
              break;

            case 'qa':
              session2topicTitle = 'QA';
              self.setState({ session2topicTitle });
              break;

            case 'storytelling-brand':
              session2topicTitle = 'Storytelling & Brand';
              self.setState({ session2topicTitle });
              break;
              
            case 'ux-ui':
              session2topicTitle = 'UX/UI';
              self.setState({ session2topicTitle });
              break;

            default:
              session2topicTitle = '';
              self.setState({ session2topicTitle })
          };

          let today = moment();
          let nextweek = moment().add(1, 'week');
          let waveStatusText = '';
          let waveStatusUrl = '';
          if ((this.state.user.session3date < today) && !!this.state.user.session_3survey) {
            waveStatusText = '';
            waveStatusUrl = '';
            this.setState({ waveStatusText });
            this.setState({ waveStatusUrl });
            return;
          } else if ((this.state.user.session3date < today) && !this.state.user.session_3survey) {
            waveStatusText = 'Share Session 3 Feedback';
            waveStatusUrl = '/wave/session/3/survey';
            this.setState({ waveStatusText });
            this.setState({ waveStatusUrl });
            return;
          } else if ((this.state.user.session2date < today) && !!this.state.user.session_2survey) {
            waveStatusText = '';
            waveStatusUrl = '';
            this.setState({ waveStatusText });
            this.setState({ waveStatusUrl });
            return;
          } else if ((this.state.user.session2date < today) && !this.state.user.session_2survey) {
            waveStatusText = 'Share Session 2 Feedback';
            waveStatusUrl = '/wave/session/2/survey';
            this.setState({ waveStatusText });
            this.setState({ waveStatusUrl });
            return;
          } else if ((this.state.user.session1date < today) && !!this.state.user.session_1survey) {
            waveStatusText = '';
            waveStatusUrl = '';
            this.setState({ waveStatusText });
            this.setState({ waveStatusUrl });
            return;
          } else if ((this.state.user.session1date < today) && !this.state.user.session_1survey) {
            waveStatusText = 'Share Session 1 Feedback';
            waveStatusUrl = '/wave/session/1/survey';
            this.setState({ waveStatusText });
            this.setState({ waveStatusUrl });
            return;
          } else if ((moment(+this.state.user.session1date).subtract(1, 'week') < today) && (this.state.user.session1date > today)) {
            waveStatusText = 'Start Session 1';
            waveStatusUrl = '/wave/session/1';
            this.setState({ waveStatusText });
            this.setState({ waveStatusUrl });
            return;
          } else if ((moment(+this.state.user.session2date).subtract(1, 'week') < today) && (this.state.user.session2date > today)) {
            waveStatusText = 'Start Session 2';
            waveStatusUrl = '/wave/session/2';
            this.setState({ waveStatusText });
            this.setState({ waveStatusUrl });
            return;
          } else if ((moment(+this.state.user.session3date).subtract(1, 'week') < today) && (this.state.user.session3date > today)) {
            waveStatusText = 'Start Session 3';
            waveStatusUrl = '/wave/session/3';
            this.setState({ waveStatusText });
            this.setState({ waveStatusUrl });
            return;
          } else {
            waveStatusText = '';
            waveStatusUrl = '';
            this.setState({ waveStatusText });
            this.setState({ waveStatusUrl });
            return;
          }

        } else {
            location.assign('/wave/login');
            return;
        }
      })


    }
    setTimeout( loadData, 50)
  };


  render() {


    return (
      <div>

        <div className='bg-peach'>
          <section>
            <div className='container'>
              <div className='row mb-60'>
                <img src={ waveLogo } className={ 'center-block img-responsive mt-10 mb-30'} style={{ maxHeight: 25 }} alt='#BUILTBYGIRLS Advisor Logo' />
              </div>
            </div>
          </section>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='material-hero'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <h3>Your Match</h3>
                    <div className='material-hero-image center'>

                      { !!this.state.matchUserAvatar && <a href={'profile/'+this.state.matchUser.username}><span style={{
                        display: 'block',
                        width: 150, height: 150,
                        backgroundImage: `url(${this.state.matchUserAvatar})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                      }}
                      className='img-circle img-responsive profile-hero-img' alt='Profile' ></span></a> }

                    </div>
                  </div>
                  <div className='col-sm-12'>
                    <Link to={'profile/'+this.state.matchUser.username}>
                    <div className='material-hero-name center'>{ !!this.state.matchUser.firstName && `${this.state.matchUser.firstName} ${this.state.matchUser.lastName}` }</div></Link>

                    <div className='material-hero-title center'>
                      { !!this.state.matchUser.title && `${this.state.matchUser.title}`}
                    </div>
                    <div className='material-hero-company center'>
                      { !!this.state.matchUser.company && `${this.state.matchUser.company}`
                    }<br /><br />
                    </div>

                    <div className='row'> </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className='dashboard-nav-container'>
        
            <Link to={'profile/'+this.state.matchUser.username}>
              <div className='dashboard-nav-item dashboard-nav-banner'>
                <div className='container'>
                  <span className='dashboard-nav-banner-chevron glyphicon glyphicon-chevron-right pull-right' />
                  <div className='dashboard-nav-banner-title'>Meet Your Match</div>
                </div>
              </div>
            </Link>


          <Link to='/wave/session/1'>
            <div className='dashboard-nav-item'>
              <div className='container'>
                <div className='dashboard-nav-icon pull-left'><img src={ iconGuide1 } alt='Profile' className='img-responsive' /></div>
                <span className='dashboard-nav-chevron glyphicon glyphicon-chevron-right pull-right' />
                <div className='dashboard-nav-item-title'>Session 1: Intros &amp; Ideas</div>
                <div className='dashboard-nav-item-date'>
                  {this.state.user.session1date
                    ? `${moment(+this.state.user.session1date).tz('America/New_York').format('ddd MMMM Do [@] h:mma')}`
                    : 'Date: TBD'
                  }
                </div>
              </div>
            </div>
          </Link>

          {!this.state.user.w2session3topic
            ?
          <div className='dashboard-nav-item'>
            <div className='container'>
              <div className='dashboard-nav-icon pull-left'><img src={ iconGuide2 } alt='Profile' className='img-responsive' /></div>
              <span className='dashboard-nav-chevron glyphicon glyphicon-chevron-right pull-right' />
              <div className='dashboard-nav-item-title'>Session 2: Content Coming Soon</div>
                <div className='dashboard-nav-item-date'>
                  {this.state.user.session4date
                    ? `${moment(+this.state.user.session4date).tz('America/New_York').format('ddd MMMM Do [@] h:mma')}`
                    : 'Date: TBD'
                  }
                </div>
            </div>
          </div>
          :
          <div>
            <Link to={`/wave/session/${this.state.user.w2session3topic}`}>
              <div className='dashboard-nav-item'>
                <div className='container'>
                  <div className='dashboard-nav-icon pull-left'><img src={ iconGuide2 } alt='Profile' className='img-responsive' /></div>
                  <span className='dashboard-nav-chevron glyphicon glyphicon-chevron-right pull-right' />
                  <div className='dashboard-nav-item-title'>Session 2: {this.state.session2topicTitle}</div>
                    <div className='dashboard-nav-item-date'>
                      {this.state.user.session4date
                        ? `${moment(+this.state.user.session4date).tz('America/New_York').format('ddd MMMM Do [@] h:mma')}`
                        : 'Date: TBD'
                      }
                    </div>
                </div>
              </div>
            </Link>
          </div>
        }

          {!this.state.user.session5topic
            ? <div>
                <div className='dashboard-nav-item'>
                  <div className='container'>
                    <div className='dashboard-nav-icon pull-left'><img src={ iconGuide3 } alt='Profile' className='img-responsive' /></div>
                    <span className='dashboard-nav-chevron glyphicon glyphicon-chevron-right pull-right' />
                    <div className='dashboard-nav-item-title'>
                      <i>Session 3: Content Coming Soon</i>
                    </div>

                    <div className='dashboard-nav-item-date'>
                      {this.state.user.session5date
                        ? `${moment(+this.state.user.session3date).tz('America/New_York').format('ddd MMMM Do [@] h:mma')}`
                        : 'Date: TBD'
                      }
                    </div>
                  </div>
                </div>
              </div>
            : <div>
                <Link to={`/wave/session/${this.state.user.session5topic}`}>
                  <div className='dashboard-nav-item'>
                    <div className='container'>
                      <div className='dashboard-nav-icon pull-left'><img src={ iconGuide3 } alt='Profile' className='img-responsive' /></div>
                      <span className='dashboard-nav-chevron glyphicon glyphicon-chevron-right pull-right' />
                      <div className='dashboard-nav-item-title'>
                        {`Session 3: ${this.state.topicTitle}`}
                      </div>
                      <div className='dashboard-nav-item-date'>
                        {this.state.user.session5date
                          ? `${moment(+this.state.user.session5date).tz('America/New_York').format('ddd MMMM Do [@] h:mma')}`
                          : 'Date: TBD'
                        }
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
          }

          <Link to='wave/resources'>
            <div className='dashboard-nav-item dashboard-nav-resources'>
              <div className='container'>
                <div className='dashboard-nav-icon pull-left'><img src={ iconGuideResources } alt='Profile' className='img-responsive' /></div>
                <span className='dashboard-nav-chevron glyphicon glyphicon-chevron-right pull-right' />
                <div className='dashboard-nav-resources-title'>Resources</div>
              </div>
            </div>
          </Link>

          <a href={'mailto:'+this.state.rmUser.email+'?cc=info@builtbygirls.com'} target='_blank'>
            <div className='dashboard-nav-item dashboard-nav-help'>
              <div className='container'>
                <div className='dashboard-nav-icon pull-left'><img src={ iconResContact } alt='Profile' className='img-responsive' /></div>
                <span className='dashboard-nav-chevron glyphicon glyphicon-chevron-right pull-right' />
                <div className='dashboard-nav-resources-title'>Your Relationship Manager</div>
              </div>
            </div>
          </a>

        </section>

      </div>

    );
  }
}

export default observer(WaveDashboard)
