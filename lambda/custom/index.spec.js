/* eslint-env mocha */

const chai = require('chai');
const assert = chai.assert;

describe('Good Dogs Skill tests', function() {
    this.timeout(10000); // To disable timeout: this.timeout(0);

    describe('Built-in intent tests', function() {
        it('Launches successfully', async function() {
            const va = require('virtual-alexa');
            const alexa = va.VirtualAlexa.Builder()
                .handler('index.handler') // Lambda function file and name e.g. 'index.handler'
                .interactionModelFile('../../models/en-US.json') // intent schema and sample utterances
                .create();

            let reply = await alexa.launch();
            assert.include(reply.response.outputSpeech.ssml, 'Welcome to Good Dogs');
        });

        it('Offers help', async function() {
            const va = require('virtual-alexa');
            const alexa = va.VirtualAlexa.Builder()
                .handler('index.handler') // Lambda function file and name e.g. 'index.handler'
                .interactionModelFile('../../models/en-US.json') // intent schema and sample utterances
                .create();

            let reply = await alexa.launch();
            reply = await alexa.utter('help');
            assert.include(reply.response.outputSpeech.ssml, 'You can tell me');
        });
    });

    describe('Custom intents tests', function() {
        it('Gets a random dog', async function() {
            const va = require('virtual-alexa');
            const alexa = va.VirtualAlexa.Builder()
                .handler('index.handler') // Lambda function file and name e.g. 'index.handler'
                .interactionModelFile('../../models/en-US.json') // intent schema and sample utterances
                .create();

            let reply = await alexa.launch();
            reply = await alexa.utter('show me a dog');

            // assert.include(reply.response.outputSpeech.ssml, 'Here\'s a');
            assert.include(reply.response.getResponse().outputSpeech.ssml, 'Here\'s a');
        });
    });
});
