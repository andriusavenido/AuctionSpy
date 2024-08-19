const express = require("express");

const router = express.Router();

const {
  room_create,
  room_delete,
  room_getById,
} = require("../controllers/roomController");

router.post("/", room_create);

router.delete("/:id", room_delete);

router.get("/:id", room_getById);

module.exports = router;
