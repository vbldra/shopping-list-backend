var express = require('express');
var router = express.Router();

const {
    getItems,
    getItem,
    updateItem,
    deleteItem,
    addItem
  } = require("../controllers/itemController");

router
.route("/")
.get(getItems)
.post(addItem);

router
.route("/:id")
// .get(getItem)
.delete(deleteItem)
.put(updateItem);

module.exports = router;
