"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _boardController = require("../controllers/boardController");
const router = (0, _express.Router)();
router.route("/").get(_boardController.getAllBoards).post(_boardController.createBoard);
router.route("/:id").put(_boardController.editBoard);
router.route("/:id/:columnsId/:taskId/:subtaskId").put(_boardController.editSubTask);
var _default = exports.default = router;