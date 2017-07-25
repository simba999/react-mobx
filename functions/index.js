var functions = require('firebase-functions');
var hellosign = require('hellosign-sdk')({key: 'a8ef4eecbf6bc39b7034197d493966fcd58c1ab611e6c2c3f750b3d7a3276795'});
var moment = require('moment');

exports.hellosignSignatureRequest = functions.database.ref('/users/{userID}/step3completed')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      console.log('[hellosignSignatureRequest]', event.params.userID);

      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.

      var promise = new Promise((resolve, reject) =>{

        event.data.ref.parent.once('value', s => {
          var userData = s.val();

          var dob = userData.dob;
          var agreed_date = userData.createdAt.substr(0, 10);
          var participant_name = `${userData.firstName} ${userData.lastName}`;

          var options = {
              test_mode : 0,
              template_id : '96158449aa4cdb3ff0832b60e9fc6e4017e47bbf',
              signers : [
                  {
                      email_address : userData.guardianEmail,
                      name : userData.guardianName,
                      role : 'Guardian'
                  }
              ],
              custom_fields : {
                  participant_name : participant_name,
                  agreed_date : agreed_date
              }
          };

          var age = moment().diff(dob, 'years', true);

          console.log('[hellosignSignatureRequest] USER:', participant_name, userData.email, age, agreed_date, userData.guardianName, userData.guardianEmail);

          if( age < 18 && !userData.parentalsignaturesent ) {

            console.log('Sending Signature Request...');
            hellosign.signatureRequest.sendWithTemplate(options)
                .then(function(response){
                  console.log('Signature Request sent successfully.', response);

                  event.data.ref.parent.child('parentalsignaturesent').set(true).then(resolve);
                  //parse response
                })
                .catch(function(err){
                  console.warn('Signature Request failed:', err)
                  reject(err);
                  //catch error
                });
          } else {
            console.log('User is older than 18 or parental signature already sent.')
            resolve();
          }

        }); // once value

      }); // promise

      return promise;

    });
