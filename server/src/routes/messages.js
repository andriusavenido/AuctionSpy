const express = require('express');
const router = express.Router();

const {
    message_create,
    message_delete,
    message_getAll,
    message_getByRoom,
    message_getByUser
} = require('../controllers/messageController');

router.post("/", message_create);

router.delete("/:id", message_delete);

router.get("/roomId/:room_id",message_getByRoom);

router.get("/sessionId/:session_id", message_getByUser);

router.get("/", message_getAll);


module.exports = router;
