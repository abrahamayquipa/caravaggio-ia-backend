import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

const app = express();

const openaiApiKey = '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';
const openaiConfiguration = new Configuration({
    apiKey: openaiApiKey,
});

const openai = new OpenAIApi(openaiConfiguration);

const textGenerator = async (prompt) => {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant designed to output JSON.",
            },
            { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo-0125",
        responseFormat: { type: "json_object" },
    });
    return completion.data.choices[0].message.content;
}

app.get('/text-generator', async (req, res) => {
    const textPrompt = req.query.prompt;
    const decodePrompt = decodeURIComponent(textPrompt);
    const textResponse = await textGenerator(decodePrompt);
    res.send(textResponse);
});

const imageGenerator = async (prompt) => {
    const response = await openai.createImage({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "250x250",
    });
    const imageUrl = response.data.data[0].url;
    return imageUrl;
}

app.get('/image-generator', async (req, res) => {
    const imagePrompt = req.query.prompt;
    const decodePrompt = decodeURIComponent(imagePrompt);
    const imageUrl = await imageGenerator(decodePrompt);
    res.send(imageUrl);
});