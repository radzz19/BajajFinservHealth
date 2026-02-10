const express = require('express');
const router = express.Router();
const { handleBfhl, handleHealth } = require('../controllers/bfhlController');
const { validateBfhlRequest } = require('../middlewares/validationMiddleware');

router.post('/bfhl', validateBfhlRequest, handleBfhl);

router.get('/health', handleHealth);

module.exports = router;
