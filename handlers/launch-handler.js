"use strict";

const superagent = require("superagent");

module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const url = `https://oh-of-one.herokuapp.com/`;
    superagent.get(url);
    const speechText = "Welcome to Whiteboard Code Challenges. What type of question would you like?";
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};
