import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

/**
 * initialize app
 */
admin.initializeApp();

/**
 * create new message and file
 */
exports.uploadNewImage =
  functions.storage.object().onFinalize( (object) => {
    return new Promise(async (resolve, reject) => {
      if(object && object.name && object.metadata) {
        // file metadata
        const fileMeta = {
          name: object.metadata.originalName,
          type: 'image/png',
          size: object.size
        };
        // picture id
        const imageId = object.name.split('/')[1];
        //create file in file collection
          await admin.firestore().collection('files')
          .doc(imageId)
          .set(fileMeta)
          .then(value => resolve(value))
          .catch(err => reject(err));
         console.log('new file to file collection was added');

         // message metadata
        const messageMeta = {
          text: '',
          time: new Date(),
          userId: object.metadata.userId,
          imageId: imageId
        };
         //create new Message
         admin.firestore().collection('messages')
          .add(messageMeta)
          .then(value => resolve(value))
          .catch(err => reject(err));
        console.log('new message to message collection was added');

      } else {
        reject('Error happened, not enough metadata or file data');
      }
    });
  });

exports.getMessagesInformation =
  functions.https.onCall(async (data, context1) => {

  await admin.firestore().collection('users').doc(data).get().then(stuff => {
    const user = stuff.data();
    if (user && user.imageId) {
      console.log('STUFF' + user.imageId);
    }
  }).catch(error => {
    console.log(error);
  });
});


