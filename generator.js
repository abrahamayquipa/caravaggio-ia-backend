import express from 'express';
import { createProdia } from 'prodia';

const app = express();

const prodia = createProdia({
	apiKey: 'd2a50ed8-c090-451d-a0c6-2070d20eb246',
});

const textGenerator = async (prompt) => {
	const job = await prodia.generate({
		prompt: prompt,
	});

	const { imageUrl, status } = await prodia.wait(job);

	return console.log(imageUrl)
}

app.get('/text-generator', async (req, res) => {
    const textPrompt = req.query.prompt;
    const decodePrompt = decodeURIComponent(textPrompt);
    const textResponse = await textGenerator(decodePrompt);
    res.send(textResponse);
});