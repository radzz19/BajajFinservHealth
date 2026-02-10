/**
 * Format successful response
 * @param {*} data - Response data
 * @returns {Object} Formatted success response
 */
const formatSuccess = (data) => {
  return {
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL || 'not_configured@example.com',
    data: data
  };
};

/**
 * Format error response
 * @param {string} errorMessage - Error message
 * @returns {Object} Formatted error response
 */
const formatError = (errorMessage) => {
  return {
    is_success: false,
    error: errorMessage
  };
};

module.exports = {
  formatSuccess,
  formatError
};
