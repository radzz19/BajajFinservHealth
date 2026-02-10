require('dotenv').config();
const express = require('express');
const bfhlRoutes = require('./routes/bfhlRoutes');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

if (!process.env.HUGGINGFACE_API_KEY) {
    console.warn('WARNING: HUGGINGFACE_API_KEY is not set. AI functionality will use fallback responses.');
}
if (!process.env.OFFICIAL_EMAIL) {
    console.warn('WARNING: OFFICIAL_EMAIL is not set. Using default placeholder.');
}

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');


    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});


app.use('/', bfhlRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/health`);
        console.log(`BFHL endpoint: http://localhost:${PORT}/bfhl`);
    });
}
