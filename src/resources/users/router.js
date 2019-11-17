const express = require('express');
const router = express.Router();
const auth = require('../../common/auth');
const {currentUserUrl, registerNewUserUrl} = require('../../../config/routes');
const {getCurrentUser, createNewUser} = require('./service');

router.get(currentUserUrl, auth, getCurrentUser);
router.post(registerNewUserUrl, createNewUser);

module.exports = router;
