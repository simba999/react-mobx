
// react
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import DateTimePicker from 'react-datetime';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

// firebase
import fire from '../fire';
const usersRef = fire.database().ref('users');


class AdminProfileCalendar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      profile: [],
      savedState: false,
      session1StartDate: {},
      session2StartDate: {},
      session3StartDate: {},
    }
  }

  componentDidMount() {
    usersRef.once('value', (snapshot) => {
      let users = snapshot.val(), profile;
      for(let uid in users) {
        let user = users[uid];
        if(user.username) {
          let concatNames = user.username.toLowerCase();
          let routeParam = this.props.params.id.toLowerCase();
          if(concatNames === routeParam) {
            profile = user;
            profile.uid = uid;
            break;
          }
        }
      }

      profile ? this.setState({profile}) : browserHistory.push(`/404`);

    });
  }

  updateSessionTime(sessionToUpdate) {
    const { profile } = this.state;
    const userRef = fire.database().ref(`users/${profile.uid}`);
    userRef.update(sessionToUpdate).then(response => {
      console.log('saved time for student');
      this.updateWaveMatchSessionTime(profile.waveMatch, sessionToUpdate);
    }).catch(e => console.error(e))
  }

  updateWaveMatchSessionTime(matchId, sessionToUpdate) {
    const userRef = fire.database().ref(`users/${matchId}`);
    userRef.update(sessionToUpdate).then(response => {
      console.log('saved to wave match');
      this.setState({
        savedState: true
      });
    }).catch(e => console.error(e))
  }


  handleChangeSession(date, index) {
    const dateTimeStamp = date.tz('America/New_York').format('x');
    const dateTimeStampIntercom = date.tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
    const { profile } = this.state;

    let update = null;
    let updateIntercom = null;
    switch(index) {
      case 1:
        update = {session1date: dateTimeStamp};
        updateIntercom = {session1date: dateTimeStampIntercom};
      break;
      case 2:
        update = {session2date: dateTimeStamp};
        updateIntercom = {session2date: dateTimeStampIntercom};
      break;
      case 3:
        update = {session3date: dateTimeStamp};
        updateIntercom = {session3date: dateTimeStampIntercom};
      break;
    }

    if(update){
      this.updateSessionTime(update);
    }
  }
    //query database for all users where waveParticipant===true && userType==='student'
    // save onChange to student user and waveMatch user
  render() {
    const  { profile, savedState } = this.state;
    const parseSession1TimeStamp = moment(parseInt(profile.session1date)).tz('America/New_York');
    const parseSession2TimeStamp = moment(parseInt(profile.session2date)).tz('America/New_York');
    const parseSession3TimeStamp = moment(parseInt(profile.session3date)).tz('America/New_York');
    if(savedState) {
      const self = this;
      setTimeout(() => {
        self.setState({savedState: false});
      }, 3000);
    }
    return (
      <div>
        {profile.uid &&
        <div className='container mb-100'>
          <div className='row'>
            <div className='col-sm-12'>
              <h1>Calendar</h1>
              <div className='calendar-card-container'>
                <div className='calendar-save-container'>
                  {savedState
                    ? <div className="alert alert-success center" role="alert">Saved!</div>
                    : <div ></div>
                }
                </div>

                <span>
                  <div className='row'>
                    <div className='col-sm-6'>{profile.firstName} &nbsp; {profile.lastName} &nbsp; {profile.email}</div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-4'>
                      <strong>Session 1:</strong>
                      <DateTimePicker
                      defaultValue={parseSession1TimeStamp ? parseSession1TimeStamp : new Date()}
                      onChange={(date) => this.handleChangeSession(date, 1)}/>
                    </div>
                    <div className='col-sm-4'>
                      <strong>Session 2:</strong>
                      <DateTimePicker
                      defaultValue={parseSession2TimeStamp ? parseSession2TimeStamp : new Date()}
                      onChange={(date) => this.handleChangeSession(date, 2)}/>
                    </div>
                    <div className='col-sm-4'>
                      <strong>Session 3:</strong>
                      <DateTimePicker
                      defaultValue={parseSession3TimeStamp ? parseSession3TimeStamp : new Date()}
                      onChange={(date) => this.handleChangeSession(date, 3)}/>
                    </div>
                  </div>
                </span>
              </div>

            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default AdminProfileCalendar;
