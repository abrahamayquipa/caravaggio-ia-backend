import express from 'express';
import cors from 'cors';
import generator from './generator.js';

const app = express();

app.use(cors());

app.use('/api', generator);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;