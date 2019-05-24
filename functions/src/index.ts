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

        const imagePath = object.name.split('/');
        //create file in file collection
          await admin.firestore().collection('files')
          .doc(imagePath[1])
          .set(fileMeta)
          .then(value => resolve(value))
          .catch(err => reject(err));
         console.log('new file to file collection was added');

         if(imagePath[0] == 'message-pictures') {
           // message metadata
           const messageMeta = {
             text: '',
             time: new Date(),
             userId: object.metadata.userId,
             imageId: imagePath[1]
           };
           //create new Message
           admin.firestore().collection('messages')
             .add(messageMeta)
             .then(value => resolve(value))
             .catch(err => reject(err));
           console.log('new message to message collection was added');
         } else {
           admin.firestore().collection('users').doc(object.metadata.userId).update({
             imageId: imagePath[1]
           }).then().catch(error => {
             console.log(error)
           });
         }
      } else {
        reject('Error happened, not enough metadata or file data');
      }
    });
  });

