// Check available Gemini models
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function checkModels() {
    console.log('\n=== Checking Available Gemini Models ===\n');
    console.log('API Key configured:', !!process.env.GEMINI_API_KEY);

    if (!process.env.GEMINI_API_KEY) {
        console.error('❌ No API key found in .env file');
        return;
    }

    console.log('API Key length:', process.env.GEMINI_API_KEY.length);

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Try different model names
        const modelsToTry = [
            'gemini-pro',
            'gemini-1.0-pro',
            'gemini-1.5-pro',
            'gemini-1.5-flash',
            'models/gemini-pro',
            'models/gemini-1.5-pro'
        ];

        console.log('\nTesting model names:\n');

        for (const modelName of modelsToTry) {
            try {
                console.log(`Testing: ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent('Say hello');
                const response = await result.response;
                const text = response.text();
                console.log(`✅ SUCCESS: ${modelName} works!`);
                console.log(`   Response: ${text.substring(0, 50)}...\n`);
            } catch (error) {
                console.log(`❌ FAILED: ${modelName}`);
                console.log(`   Error: ${error.message.substring(0, 100)}...\n`);
            }
        }

    } catch (error) {
        console.error('\n❌ Error:', error.message);
    }
}

checkModels();
