'use strict';

const superagent = require('superagent');

module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const url = `https://oh-of-one.herokuapp.com/`;
    superagent.get(url);
    const speechText = 'Welcome to Whiteboard Code Challenges. What would you like to practice? You can ask about arrays, linked lists, or strings.';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('You can ask about arrays, linked lists, strings.') //or trivia... :)
      .getResponse();
  }
};

// ask for type and difficulty
