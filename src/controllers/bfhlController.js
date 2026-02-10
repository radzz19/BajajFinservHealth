const mathService = require('../services/mathService');
const aiService = require('../services/aiService');
const { formatSuccess, formatError } = require('../utils/responseFormatter');

const handleBfhl = async (req, res, next) => {
    try {
        const operation = req.operation;
        const value = req.operationValue;
        let result;

        switch (operation) {
            case 'fibonacci':
                result = mathService.generateFibonacci(value);
                break;

            case 'prime':
                result = mathService.filterPrimes(value);
                break;

            case 'lcm':
                result = mathService.calculateLCM(value);
                break;

            case 'hcf':
                result = mathService.calculateHCF(value);
                break;

            case 'AI':
                result = await aiService.getAIResponse(value);
                break;

            default:
                return res.status(400).json(formatError('Invalid operation'));
        }

        return res.status(200).json(formatSuccess(result));

    } catch (error) {
        console.error('Controller error:', error);

        if (error.message.includes('AI')) {
            return res.status(500).json(formatError('AI service is unavailable. Please try again later.'));
        }
        next(error);
    }
};

const handleHealth = (req, res) => {
    try {
        res.status(200).json({
            is_success: true,
            official_email: process.env.OFFICIAL_EMAIL || 'not_configured@example.com'
        });
    } catch (error) {
        res.status(500).json(formatError('Health check failed'));
    }
};

module.exports = {
    handleBfhl,
    handleHealth
};
