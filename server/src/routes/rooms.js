const express = require("express");

const router = express.Router();

const {
  room_create,
  room_delete,
  room_getById,
  room_getAllPublic,
  room_updateById

} = require("../controllers/roomController");

router.post("/", room_create);

router.delete("/:id", room_delete);

router.get("/:id", room_getById);

router.get("/", room_getAllPublic);

router.patch("/:id", room_updateById);

module.exports = router;
