import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import * as corsModule from 'cors';

/**
 * add CORS to our REST API
 */
const cors = corsModule(
  {origin:true});

/**
 * initialize app
 */
admin.initializeApp();

var MESSAGE_COLLECTION = 'messages';

/**
 * GET and POST functions for messages without pictures for now
 * Wll probably replace it with express js
 */
 exports.messages = functions.https.onRequest((request, response) => {
   cors(request, response, async () => {
     if(request.method === 'GET') {
       admin.firestore().collection(MESSAGE_COLLECTION)
         .get()
         .then(messages => {
           const listOfMessages: any = [];
           messages.forEach(message => {
             const mess = message.data();
             mess.id = message.id;
             listOfMessages.push(mess);
           });
          response.json(listOfMessages);
         })
         .catch(err =>
         {console.log(err)}
         )
     }
     else if(request.method === 'POST') {
       //get body
       const messageData = request.body;
       // create message object from body
       const messageFromBody: any = {
         text: messageData.text,
         userId: messageData.userId,
         time: messageData.time
       };
       //save new message to the firebase database
       try {
         const createdMessage = await admin.firestore().collection(MESSAGE_COLLECTION)
           .add(messageFromBody)
           .then();
         messageFromBody.id = createdMessage.id;
         response.json(messageFromBody);

         console.log("Message was saved to the database");
       }
       catch (err) {
         response.send(err);
       }
     }
   });
 });

/**
 * trigger return message when message is send
 */
exports.triggerNewMessage = functions.firestore
  .document('messages/{messageId}')
  .onCreate((snap, context) => {
 console.log('1 message was created: ' + context.params.messageId);

  });

exports.makarena = functions.https.onRequest((req, resp) => {
  console.log('simple test');
  resp.json('dick');
});
