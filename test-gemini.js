// Quick test script to diagnose Gemini API issue
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    console.log('Testing Gemini API...');
    console.log('API Key exists:', !!process.env.GEMINI_API_KEY);
    console.log('API Key length:', process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0);

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        console.log('Model initialized successfully');

        const prompt = 'Answer with only ONE word: What is the capital of France?';
        console.log('Sending prompt:', prompt);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('Raw response:', text);
        console.log('First word:', text.trim().split(/\s+/)[0]);

    } catch (error) {
        console.error('Error details:');
        console.error('Message:', error.message);
        console.error('Stack:', error.stack);
        if (error.response) {
            console.error('Response:', error.response);
        }
    }
}

testGemini();
