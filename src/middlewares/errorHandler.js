
const { formatError } = require('../utils/responseFormatter');

const errorHandler = (err, req, res, next) => {
    console.error('Error occurred:', err);
    let statusCode = err.statusCode || 500;
    let errorMessage = err.message || 'Internal server error occurred';

    if (err.name === 'ValidationError') {
        statusCode = 400;
        errorMessage = err.message;
    } else if (err.name === 'TypeError') {
        statusCode = 422;
        errorMessage = 'Invalid data type provided';
    }

    res.status(statusCode).json(formatError(errorMessage));
};

const notFoundHandler = (req, res) => {
    res.status(404).json(formatError('Route not found'));
};

module.exports = {
    errorHandler,
    notFoundHandler
};
