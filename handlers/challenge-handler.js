"use strict";

const superagent = require("superagent");

module.exports = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "dataTypeIntent"
    );
  },
  handle(handlerInput) {
    // const speechText = 'What kind of challenge are you looking for?';
    const dataType =
      handlerInput.requestEnvelope.request.intent.slots.dataType.resolutions
        .resolutionsPerAuthority[0].values[0].value.id;
    const url = `https://oh-of-one.herokuapp.com/${dataType}/anyDifficulty`;
    return superagent
      .get(url)
      .then(response => {

        let speechText = '';

        if (response.body[0]) {
          speechText = response.body[0].question;
        }

        return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse();
      })
      .catch(console.error);
  }
};
