// react
import React, { Component } from 'react';
import { Link } from 'react-router';
// firebase
import fire from '../fire';
import firebase from 'firebase';

// components
import appState from '../appState'

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      firstName: '',
      lastName: '',
      dob: '',
      phone: '',
      username: '',
      bio: '',
      title: '',
      company: '',
      app: '',
      brand: '',
      obsessions: '',
      superpower: '',
      socialLinkedin: '',
      socialTwitter: '',
      socialInstagram: '',
      avatarURL: '',
      savedState: false,
      matchUser: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.imageDisplayAndUpload = this.imageDisplayAndUpload.bind(this);
  }
  componentDidMount() {
    this.getUserInfo();
  }

  componentWillUnMount() {
    this.getUserInfo();
  }
  getUserInfo() {
    const self = this;
    setTimeout(() => {
      const user = fire.auth().currentUser;
      if(user) {
        fire.database().ref(`users/${user.uid}`).once('value', (snap) => {
          if(snap.val()) {
            const {firstName, lastName, dob, phone, username, bio, title, company, app, brand, obsessions, superpower, socialLinkedin, socialTwitter, socialInstagram, waveMatch} = snap.val();
            self.setState({
              firstName,
              lastName,
              dob,
              phone,
              username,
              bio,
              title,
              company,
              app,
              brand,
              obsessions,
              superpower,
              socialLinkedin,
              socialTwitter,
              socialInstagram,
            });

            // Get Avatar url
            fire.storage().ref(`/Profiles/Avatars/${user.uid}`).getDownloadURL().then( avatarURL => {
              self.setState({ avatarURL });
            }).catch( error => { console.warn( error && error.message )});

            fire.database().ref(`users/${waveMatch}`).once('value').then( s2 =>{
  						let matchUser = s2.val();
  						self.setState({ matchUser });

  					});

          }
        });
      }
    },1000);
  }
  handleSubmit(e) {
    e.preventDefault();
    let firstName = this.firstNameEl.value;
    let lastName = this.lastNameEl.value;
    let phone = this.phoneEl.value;
    let dob = this.dobEl.value;
    let username = this.usernameEl.value;
    let bio = this.bioEl.value;
    let title = this.titleEl.value;
    let company = this.companyEl.value;
    let app = this.appEl.value;
    let brand = this.brandEl.value;
    let obsessions = this.obsessionsEl.value;
    let superpower = this.superpowerEl.value;
    let socialLinkedin = this.socialLinkedinEl.value;
    let socialTwitter = this.socialTwitterEl.value;
    let socialInstagram = this.socialInstagramEl.value;
    let waveStatus = {
      text: 'Meet your match',
      url: `/profile/${this.state.matchUser.username}`
    }

    let errors = {};
    firstName || (errors.firstName = `Please enter your first name`);
    lastName || (errors.lastName = `Please enter your last name`);
    ( !isNaN(phone) && phone.length>9 && phone.length<12 ) || (errors.phone = `Please enter a valid phone number`);
    dob || (errors.dob = `Please enter your birth date`);
    bio || (errors.bio = `Please enter your bio`);
    title || (errors.title = `Please enter your title`);
    company || (errors.company = `Please enter your company`);
    app || (errors.app = `Please enter your favorite app`);
    brand || (errors.brand = `Please enter a brand you love`);
    obsessions || (errors.obsessions = `Please enter your current obsessions`);
    this.setState({ errors })
    const user = fire.auth().currentUser;

    if(!Object.keys(errors).length) {

      // fire.database().ref(`usernames/${user.uid}`).update({firstName, lastName, phone, dob, username, bio, title, company, app, brand, obsessions, superpower, socialLinkedin, socialTwitter, socialInstagram,

      let updates = {};

      updates[`/users/${user.uid}/firstName`] = firstName;
      updates[`/users/${user.uid}/lastName`] = lastName;
      updates[`/users/${user.uid}/phone`] = phone;
      updates[`/users/${user.uid}/dob`] = dob;
      updates[`/users/${user.uid}/bio`] = bio;
      updates[`/users/${user.uid}/title`] = title;
      updates[`/users/${user.uid}/company`] = company;
      updates[`/users/${user.uid}/app`] = app;
      updates[`/users/${user.uid}/brand`] = brand;
      updates[`/users/${user.uid}/obsessions`] = obsessions;
      updates[`/users/${user.uid}/superpower`] = superpower;
      updates[`/users/${user.uid}/socialLinkedin`] = socialLinkedin;
      updates[`/users/${user.uid}/socialTwitter`] = socialTwitter;
      updates[`/users/${user.uid}/socialInstagram`] = socialInstagram;
      updates[`/users/${user.uid}/waveStatus`] = waveStatus;

      //if(!username)

      let intercomUpdates = {
        firstName, lastName, phone, dob, bio, title, company, app, brand, obsessions, superpower, socialLinkedin, socialTwitter, socialInstagram
      }

      if(username && typeof username==='string'){
        updates[`/users/${user.uid}/username`] = username;
        updates[`/usernames/${username}`] = user.uid;
      }

      fire.database().ref().update(updates)
        .then((response) => {
          console.log('Intercom Update', intercomUpdates);
          appState.initIntercom(intercomUpdates);

          if(!username){
            username = this.state.username;
          }

          setTimeout( ()=>{
            location.assign(`/profile/${username}`);
          }, 2000)


        })
        .catch(e => console.error(`error updating ${e}`));

    }
  }

  renderHelpBlock(fieldName){
    return this.state.errors[fieldName] ?
      <div className="help-block">{this.state.errors[fieldName]}</div> : ''
  }

  formGroupClass(fieldName){
    return `form-group` + ( this.state.errors[fieldName] ? ' has-error' : '' );
  }

  onAvatarImageAvailable(evt){
      // console.log('[onAvatarImageAvailable]' );
      this.setState({ avatarURL: evt.target.result })
  }

  onFileChosen(e){
    let file = this.elAvatarInput.files[0];
    // console.log('onFileChosen', file);
    this.imageDisplayAndUpload(file)
  }

  handleImageDrop(e){
    e.preventDefault();

    var file = e.dataTransfer.files[0];
    // console.log('[DROP file]', file);
    this.imageDisplayAndUpload(file);
  }
  handleDragOver(e){
    e.preventDefault();
    e.stopPropagation();
  }

  imageDisplayAndUpload(file){
    var reader = new FileReader();
    reader.onload = this.onAvatarImageAvailable.bind(this);
    reader.readAsDataURL(file);


    if(file.size > 1000001 ){
      this.setState({ avatarError: 'Image is too large. Maximum file size: 1MB.' });
      return;
    }
    this.setState({ avatarError: '' });

    /*   HANDLE UPLOAD TO FIREBASE   */

    // Create the file metadata
    var metadata = {};

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = fire.storage().ref().child(`Profiles/Avatars/${appState.user.uid}`).put(file, metadata);


    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      snapshot => { /* upload in progress */
        // Get task progress, including the number of bytes uploaded
        // and the total number of bytes to be uploaded
        // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ', snapshot.state, '  ', progress, '% done');

        // if(snapshot.state===firebase.storage.TaskState.PAUSED){
        //   console.log('Upload is paused');
        // } else if(snapshot.state===firebase.storage.TaskState.RUNNING){
        //   console.log('Upload is running');
        // }
      },
      error => { /* upload failed */
          console.error( error );
      },
      () => { /* upload complete */
        // Upload completed successfully, now we can get the download URL
        // var downloadURL = uploadTask.snapshot.downloadURL;
        // console.log('downloadURL', downloadURL);
      }
    );
  }

  onUsernameChange(){
		let errors = Object.assign({}, this.state.errors);

		let newUsername = this.usernameEl.value;
		if(!newUsername || typeof newUsername!=='string' || newUsername.length < 5){
			errors.username = 'The username is too short';
			this.setState({ errors });
		} else {
			fire.database().ref(`/usernames/${newUsername}`).once('value', s => {
				if(s.val()){
					errors.username = 'Username is already taken!'
				} else {
					errors.username = '';
				}
				this.setState({ errors })
			})
		}

	}

  render() {
    this.firstNameEl && appState.userMeta.firstName && (this.firstNameEl.value = appState.userMeta.firstName);
    this.lastNameEl && appState.userMeta.lastName && (this.lastNameEl.value = appState.userMeta.lastName);
    this.phoneEl && appState.userMeta.phone && (this.phoneEl.value = appState.userMeta.phone);

    return (
      <section className='container'>
        {this.state.savedState && <div className="alert alert-success center mt-60" role="alert">Saved!</div>}
        <div className='signup-form-title mt-60'>
          <div className='row'>
            <div className='col-sm-3'></div>
            <div className='col-sm-6'>
              <h3>Settings</h3>
              <div className='divider-honey mt-20'></div>
            </div>
          </div>
        </div>

        <div className='mt-30 mb-30'><h4>Account Info</h4></div>

        <div className='settings-upload-container' style={{
            minHeight: 100,
            backgroundColor: `rgba(0,0,0,0.02)`,
            backgroundImage: `url(${this.state.avatarURL})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            textAlign: 'center',
            border: `1px solid rgba(0,0,0,0.1)`,
            lineHeight: `96px`,
            color: `rgba(0,0,0,0.5)`,
            borderRadius:500,
          }}
          onDrop={this.handleImageDrop.bind(this)}
          onDragOver={this.handleDragOver.bind(this)}>
          <div className='settings-upload-picker-container pull-right'>
            <input type="file" name="avatar" ref={ el => this.elAvatarInput = el} className='settings-upload-picker' onChange={this.onFileChosen.bind(this)} />

          </div>
          { this.state.avatarURL ? '' : <div className='settings-upload-text'>Drop Your Image Here</div> }
        </div>

        { !!this.state.avatarError && <div style={{color:'red'}}>{this.state.avatarError}</div> }

        <div className='row signup-form-container'>
          <div className='col-sm-2'></div>
          <div className='col-sm-8'>
            <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
              <div className='form-item-container'>
                <div className={this.formGroupClass('firstName')}>
                  <label htmlFor='inputFirstName'>First Name</label>
                  <input className='form-control'
                  maxLength={240}
                  ref={ el=>this.firstNameEl = el }
                  type='string'
                  placeholder='' />
                {this.renderHelpBlock('firstName')}
                </div>
              </div>

              <div className='form-item-container'>
                <div className={this.formGroupClass('lastName')}>
                  <label htmlFor='inputLastName'>Last Name</label>
                  <input className='form-control'
                  maxLength={240}
                  ref={ el=>this.lastNameEl = el }
                  type='string'
                  placeholder='' />
                {this.renderHelpBlock('lastName')}
                </div>
              </div>

              <div className='form-item-container'>
                <div className={this.formGroupClass('phone')}>
                  <label htmlFor='inputPhone'>Phone</label>
                  <input className='form-control'
                  maxLength={240}
                  ref={ el=>this.phoneEl = el }
                  type='tel'
                  placeholder='' />
                  {this.renderHelpBlock('phone')}
                </div>
              </div>

              <div className='form-item-container'>
                <div className={this.formGroupClass('dob')}>
                  <label htmlFor='inputBirthday'>Birthday</label>
                  <input className='form-control'
                  maxLength={240}
                  value={this.state.dob}
                  onChange={(evt) => this.setState({dob: evt.target.value})}
                  ref={ el=>this.dobEl = el }
                  type='date'
                  placeholder='' />
                  {this.renderHelpBlock('dob')}
                </div>
              </div>

              { !this.state.username  ? <div className='form-item-container'>
                <div className={this.formGroupClass('username')}>
                  <label htmlFor='inputusername'>Username</label>
                  <input className='form-control'
                  maxLength={40}
                  onChange={this.onUsernameChange.bind(this)}
                  ref={ el=>this.usernameEl = el }
                  type='string'
                  placeholder='' />
                  {this.renderHelpBlock('username')}
                </div>
              </div>
              :
              <input type="hidden" value=""
                ref={ el=>this.usernameEl = el }
                 />
             }

              <Link to="/wave/login?rdr=changelogin">Change Email/Password</Link>

              <div className='mt-60 mb-30'><h4>Social Media Info</h4></div>

              <div className='form-item-container'>
                <div className={this.formGroupClass('linkedin')}>
                  <label htmlFor='inputLinkedin'>linkedin.com/in/</label>
                  <input className="form-control"
                  maxLength={100}
                  value={this.state.socialLinkedin}
                  onChange={(evt) => this.setState({socialLinkedin: evt.target.value})}
                  ref={ el=>this.socialLinkedinEl = el }
                  type='text'
                  placeholder=''>
                  </input>
                  {this.renderHelpBlock('socialLinkedin')}
                </div>
              </div>

              <div className='form-item-container'>
                <div className={this.formGroupClass('linkedin')}>
                  <label htmlFor='inputTwitter'>twitter.com/</label>
                  <input className="form-control"
                  maxLength={100}
                  value={this.state.socialTwitter}
                  onChange={(evt) => this.setState({socialTwitter: evt.target.value})}
                  ref={ el=>this.socialTwitterEl = el }
                  type='text'
                  placeholder=''>
                  </input>
                  {this.renderHelpBlock('socialTwitter')}
                </div>
              </div>

              <div className='form-item-container'>
                <div className={this.formGroupClass('instagram')}>
                  <label htmlFor='inputInstagram'>instagram.com/</label>
                  <input className="form-control"
                  maxLength={100}
                  value={this.state.socialInstagram}
                  onChange={(evt) => this.setState({socialInstagram: evt.target.value})}
                  ref={ el=>this.socialInstagramEl = el }
                  type='text'
                  placeholder=''>
                  </input>
                  {this.renderHelpBlock('socialInstagram')}
                </div>
              </div>


              <div className='mt-60 mb-30'><h4>Profile Info</h4></div>

              <div className='form-item-container'>
                <div className={this.formGroupClass('title')}>
                  {appState.userMeta.userType === 'professional'
                    ? <label htmlFor='inputTitle'>Title</label>
                    : <label htmlFor='inputTitle'>School Level</label>
                  }

                  <input className="form-control"
                    ref={ el=>this.titleEl = el }
                    value={this.state.title}
                    onChange={(evt) => this.setState({title: evt.target.value})}
                    maxLength={240}
                    type='text'
                    placeholder=''>
                  </input>
                  {this.renderHelpBlock('title')}
                </div>
              </div>

              <div className='form-item-container'>
                <div className={this.formGroupClass('company')}>
                  {appState.userMeta.userType === 'professional'
                    ? <label htmlFor='inputCompany'>Company/Organization</label>
                    : <label htmlFor='inputCompany'>School</label>
                  }
                  <input className="form-control"
                    ref={ el=>this.companyEl = el }
                    value={this.state.company}
                    onChange={(evt) => this.setState({company: evt.target.value})}
                    maxLength={240}
                    type='text'
                    placeholder=''>
                  </input>
                  {this.renderHelpBlock('company')}
                </div>
              </div>

              <div className='form-item-container'>
                <div className={this.formGroupClass('app')}>
                  <label htmlFor='inputApp'>My favorite app is...</label>
                  <input className="form-control"
                  maxLength={240}
                  value={this.state.app}
                  onChange={(evt) => this.setState({app: evt.target.value})}
                  ref={ el=>this.appEl = el }
                  type='text'
                  placeholder=''>
                  </input>
                  {this.renderHelpBlock('app')}
                </div>
              </div>

              <div className='form-item-container'>
                <div className={this.formGroupClass('brand')}>
                  <label htmlFor='inputBrand'>One brand I really love is...</label>
                  <input className="form-control"
                  ref={ el=>this.brandEl = el }
                  value={this.state.brand}
                  onChange={(evt) => this.setState({brand: evt.target.value})}
                  maxLength={240}
                  type='text'
                  placeholder=''>
                  </input>
                  {this.renderHelpBlock('brand')}
                </div>
              </div>


              <div className='form-item-container'>
                <div className={this.formGroupClass('bio')}>
                  <label htmlFor='inputBio'>My Bio...</label>
                  <textarea className="form-control" rows="3"
                    maxLength={240}
                    value={this.state.bio}
                    onChange={(evt) => this.setState({bio: evt.target.value})}
                    ref={ el=>this.bioEl = el }
                    id='inputBio'
                    type='text'
                    placeholder='Tell us a little about yourself. Just a couple of lines will do. (Maximum: 240 characters)'>
                  </textarea>
                  {this.renderHelpBlock('bio')}
                </div>
              </div>

              <div className='form-item-container'>
                <div className={this.formGroupClass('obsessions')}>
                  <label htmlFor='inputObsessions'>I'm currently obsessed with...</label>
                  <textarea className="form-control" rows="3"
                  maxLength={240}
                  value={this.state.obsessions}
                  onChange={(evt) => this.setState({obsessions: evt.target.value})}
                  ref={ el=>this.obsessionsEl = el }
                  type='text'
                  placeholder='No judgment - Turmeric lattes, Instagram stories, you name it. (Maximum: 240 characters)'>
                  </textarea>
                  {this.state.errors.obsessions ? <div className="help-block">{this.state.errors.obsessions}</div> : ''}
                </div>
              </div>

              {appState.userMeta.userType === 'professional'
                ? <div className='form-item-container'>
                    <div className={this.formGroupClass('superpower')}>
                      <label htmlFor='inputSuperpower'>My superpower is...</label>
                      <textarea className="form-control" rows="3"
                      maxLength={240}
                      value={this.state.superpower}
                      onChange={(evt) => this.setState({superpower: evt.target.value})}
                      ref={ el=>this.superpowerEl = el }
                      type='text'
                      placeholder='Showing Google Analytics who’s boss, eagle-eyed QA, optimizing CAC for Facebook. (Maximum: 240 characters)'>
                      </textarea>
                      {this.state.errors.superpower ? <div className="help-block">{this.state.errors.superpower}</div> : ''}
                    </div>
                  </div>
                : <div className='form-item-container hide'>
                    <div className={this.formGroupClass('superpower')}>
                      <label htmlFor='inputSuperpower'>My superpower is...</label>
                      <textarea className="form-control" rows="3"
                      maxLength={240}
                      value={this.state.superpower}
                      onChange={(evt) => this.setState({superpower: evt.target.value})}
                      ref={ el=>this.superpowerEl = el }
                      type='text'
                      placeholder='Showing Google Analytics who’s boss, eagle-eyed QA, optimizing CAC for Facebook. (Maximum: 240 characters)'>
                      </textarea>
                      {this.state.errors.superpower ? <div className="help-block">{this.state.errors.superpower}</div> : ''}
                    </div>
                  </div>
              }

              <div className='signup-form-btn-container'>
                <div className='row'>
                  <div className='col-sm-3'></div>
                  <div className='col-sm-6'>
                    {this.state.savedState && <div className="alert alert-success center" role="alert">Saved!</div>}
                    <input type='submit' className='btn btn-default btn-block' value='Save' formNoValidate/>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='col-sm-3'></div>
        </div>
      </section>
    );
  }
}

export default Settings;
