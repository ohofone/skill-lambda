'use strict';

const superagent = require('superagent');

module.exports = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'dataTypeIntent'
    );
  },
  handle(handlerInput) {
    // const speechText = 'What kind of challenge are you looking for?';
    const dataType =
      handlerInput.requestEnvelope.request.intent.slots.dataType.resolutions
        .resolutionsPerAuthority[0].values[0].value.id;

    const difficulty =
      handlerInput.requestEnvelope.request.intent.slots
        .difficulty.resolutions ?
        handlerInput.requestEnvelope.request.intent.slots.difficulty
          .resolutions.resolutionsPerAuthority[0].values[0].value.id :
        'anyDifficulty';

    const userID = handlerInput.requestEnvelope.session.user.userId;
    const url = `https://oh-of-one.herokuapp.com/question/${dataType}/${difficulty}/${userID}`;

    return superagent
      .get(url)
      .then(response => {

        let speechText = '';

        if (response.body[0]) {
          speechText = 'Here is your question. ' + response.body[0].question;
        }

        return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse();
      })
      .catch(console.error);
  }
};
