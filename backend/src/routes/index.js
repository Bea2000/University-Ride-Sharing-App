const express = require('express');

const router = express.Router();

const hello = require('./api/v1/hello.routes');
const ride = require('./api/v1/ride.routes');
const users = require('./api/v1/users.routes');

const chats = require('./api/v1/chats.routes');
const messages = require('./api/v1/messages.routes');
const request = require('./api/v1/request.routes');
const rating = require('./api/v1/rating.routes');

router.use('/hello', hello);
router.use('/rides', ride);
router.use('/users', users);
router.use('/chats', chats);
router.use('/messages', messages);
router.use('/requests', request);
router.use('/ratings', rating);

module.exports = router;