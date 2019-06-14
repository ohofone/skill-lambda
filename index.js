'use strict';

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = require('./handlers/launch-handler.js');
const ChallengeIntentHandler = require('./handlers/challenge-handler.js');
const HintIntentHandler = require('./handlers/hint-handler.js');
const SolutionIntentHandler = require('./handlers/solution-handler.js');

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`~~~~ Error handled: ${error.message}`);
    const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name ===
        'AMAZON.CancelIntent' ||
        handlerInput.requestEnvelope.request.intent.name ===
        'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    const speechText = 'Goodbye! Best of luck on your interview!';
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ChallengeIntentHandler,
    HintIntentHandler,
    SolutionIntentHandler,
    CancelAndStopIntentHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
