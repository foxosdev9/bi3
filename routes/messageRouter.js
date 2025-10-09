const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

router
.route('/')
.get(messageController.getAllMessage)
.post(messageController.createMessage);

// router
// .route('/:id')
// .get('')
// .patch('')
// .delete('')


module.exports = router;