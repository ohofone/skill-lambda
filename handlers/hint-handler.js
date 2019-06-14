'use strict';

const superagent = require('superagent');

module.exports = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'hintIntent'
    );
  },
  handle(handlerInput) {

    const userID = handlerInput.requestEnvelope.session.user.userId;
    const url = `https://oh-of-one.herokuapp.com/currentQuestion/${userID}`;

    return superagent
      .get(url)
      .then(response => {

        let speechText = 'Sorry, I can\'t give you a hint.';
        
        let hintExists = handlerInput.requestEnvelope.request.intent.slots.hintType.resolutions;
        
        if (response.body && response.body[0]) {

            let hintResponse = 'The time complexity of the optimal solution is ' 
                                + response.body[0].bigotime;
            
            if (hintExists) {
              let hintType = hintExists.resolutionsPerAuthority[0].values[0].value.id;
              hintResponse = response.body[0][hintType];
              if (hintType === 'question') {
                speechText = `Here's the question again. ${hintResponse}.`;
              } else {
                speechText = `${hintResponse}.`;
              }
            } else {
              // speechText = `Ok, here is a hint. ${hintResponse}.`;
            }
        }

        return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt('')
          .getResponse();
      })
      .catch(console.error);
  }
};
