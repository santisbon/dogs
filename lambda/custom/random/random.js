'use strict';
const helper = require('alexa-helper');

const appTitle = 'Good Dogs';
const errorMessage = 'Sorry, there was an error fetching dog info.';

// search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1
const api = {
    hostname: 'api.thedogapi.com',
    resource: '/v1/images/search?mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1'
};

const ShowRandomDogIntent = 'ShowRandomDogIntent';

function buildOptions(api, appToken, port=443) {
    return {
        hostname: api.hostname,
        path: api.resource,
        port,
        method: 'GET',
        headers: {'x-api-key': appToken}
    };
}

const ShowRandomDogIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name === ShowRandomDogIntent;
    },
    async handle(handlerInput) {
        const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
        // const slotValues = helper.ssmlHelper.getSlotValues(filledSlots);

        // const params = buildParams(slotValues, "");
        const options = buildOptions(api, process.env.DOGS_APP_TOKEN);

        let speechOutput = '';
        let displayOutput = '';
        let imageUrl = '';

        try{
            const dogs = await helper.httpsHelper.httpGet(options);

            if (dogs.length === 1) {
                speechOutput = `Here's a ${dogs[0].breeds[0].name}, bred for ${dogs[0].breeds[0].bred_for}. Their temperament is ${dogs[0].breeds[0].temperament}.`;
                displayOutput = `${dogs[0].breeds[0].name}\n`;
                imageUrl = `${dogs[0].url}`;
            } 
        } catch (error) {
            speechOutput = errorMessage;
            displayOutput = error.message;
            console.log(`Intent: ${handlerInput.requestEnvelope.request.intent.name}: message: ${error.message}`);
        }

        // we're not keeping the session open
        return handlerInput.responseBuilder
            .speak(speechOutput)
            // .reprompt('')
            // .withSimpleCard(appTitle, displayOutput)
            .withStandardCard(appTitle, displayOutput, imageUrl, imageUrl)
            .getResponse();
    }
}

exports.ShowRandomDogIntentHandler = ShowRandomDogIntentHandler;
