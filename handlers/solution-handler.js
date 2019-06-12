'use strict';

const superagent = require('superagent');

module.exports = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'solutionIntent'
    );
  },
  handle(handlerInput) {
    // const speechText = 'What kind of challenge are you looking for?';

    const userID = handlerInput.requestEnvelope.session.user.userId;
    const url = `https://oh-of-one.herokuapp.com/solution/${userID}`;

    return superagent
      .get(url)
      .then(response => {

        let speechText = '';

        if (response.body && response.body.solution) {
          speechText = `Here is the challenge solution. <prosody rate="82%">${response.body.solution}</prosody>`;
        } else {
          speechText = 'You\'re not currently working on a question. Would you like to start one? You can ask about arrays, linked lists, or strings.'; 
        }

        return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt('')
          .getResponse();
      })
      .catch(console.error);
  }
};
