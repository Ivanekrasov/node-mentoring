const express = require('express');
const router = express.Router();
const {loginUrl} = require('../../../config/routes');
const service = require('./service');

router.post(loginUrl, service);

module.exports = router;
