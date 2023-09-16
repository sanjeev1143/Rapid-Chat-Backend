const { getAllMessage, addMessage } = require('../controllers/messagesController');

const router = require('express').Router();


router.post('/getmsg',getAllMessage);
router.post('/addmsg',addMessage);





module.exports =router;