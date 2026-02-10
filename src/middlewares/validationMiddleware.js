
const { formatError } = require('../utils/responseFormatter');

const validateBfhlRequest = (req, res, next) => {
    try {
        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json(formatError('Request body is required'));
        }

        const validKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
        const requestKeys = Object.keys(body);
        if (requestKeys.length !== 1) {
            return res.status(400).json(formatError('Exactly one operation key must be present in request body'));
        }

        const operationKey = requestKeys[0];

        if (!validKeys.includes(operationKey)) {
            return res.status(400).json(formatError(`Invalid operation key. Must be one of: ${validKeys.join(', ')}`));
        }

        const value = body[operationKey];

        switch (operationKey) {
            case 'fibonacci':

                if (!Number.isInteger(value)) {
                    return res.status(422).json(formatError('fibonacci must be a single integer'));
                }
                if (value < 0) {
                    return res.status(422).json(formatError('fibonacci input must be non-negative'));
                }
                break;

            case 'prime':
            case 'lcm':
            case 'hcf':
               
                if (!Array.isArray(value)) {
                    return res.status(422).json(formatError(`${operationKey} must be an array of integers`));
                }
                if (value.length === 0) {
                    return res.status(422).json(formatError(`${operationKey} array cannot be empty`));
                }
                if (!value.every(num => Number.isInteger(num))) {
                    return res.status(422).json(formatError(`${operationKey} array must contain only integers`));
                }
                break;

            case 'AI':
                
                if (typeof value !== 'string') {
                    return res.status(422).json(formatError('AI must be a string question'));
                }
                if (value.trim().length === 0) {
                    return res.status(422).json(formatError('AI question cannot be empty'));
                }
                break;
        }

        req.operation = operationKey;
        req.operationValue = value;

        next();
    } catch (error) {
        return res.status(500).json(formatError('Validation error occurred'));
    }
};

module.exports = {
    validateBfhlRequest
};
