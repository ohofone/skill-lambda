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
    // const speechText =
    //   handlerInput.requestEnvelope.request.intent.slots.dataType.value;
    const url = `https://oh-of-one.herokuapp.com/${dataType}/anyDifficulty`;
    superagent
      .get(url)
      .then(response => {
        const speechText = response.body[0].question;
        console.log(speechText);
        return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse();
      })
      .catch(console.error);
  }
};
