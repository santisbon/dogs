const title = 'Good Dogs';

const welcomeMessage = `Welcome to ${title}, you can ask me for a random dog.`;
const welcomeMessageDisplay = `"Give me a random dog"
`;
const helpMessage = `You can tell me you want to get a dog`;
const cancelAndStopMessage = 'Goodbye!';
const genericErrorMessage = "Sorry, I didn't get that. You can ask me for a random dog or ask for help.";

/**
 * The LaunchRequest event occurs when the skill is invoked without a specific intent.
 * The canHandle function returns true if the incoming request is a LaunchRequest.
 * The handle function generates and returns a basic greeting response.
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        // we're keeping the session open with reprompt()
        return handlerInput.responseBuilder
            .speak(welcomeMessage)
            .reprompt(helpMessage)
            .withSimpleCard(title, welcomeMessageDisplay)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        // we're keeping the session open with reprompt()
        return handlerInput.responseBuilder
            .speak(helpMessage)
            .reprompt(helpMessage)
            .withSimpleCard(title, helpMessage)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(cancelAndStopMessage)
            .withSimpleCard(title, cancelAndStopMessage)
            .getResponse();
    }
};

/**
 * Although you can't return a response with any speech, card or directives after receiving
 * a SessionEndedRequest, the SessionEndedRequestHandler is a good place to put your cleanup logic.
 */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle(handlerInput, error) {
        // Return true in all cases to create a catch-all handler.
        return error.name.startsWith('AskSdk');
    },
    // we're keeping the session open with reprompt()
    handle(handlerInput, error) {
        return handlerInput.responseBuilder
            .speak(genericErrorMessage)
            .reprompt(genericErrorMessage)
            .getResponse();
    }
};

exports.LaunchRequestHandler = LaunchRequestHandler;
exports.HelpIntentHandler = HelpIntentHandler;
exports.CancelAndStopIntentHandler = CancelAndStopIntentHandler;
exports.SessionEndedRequestHandler = SessionEndedRequestHandler;
exports.ErrorHandler = ErrorHandler;