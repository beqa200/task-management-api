"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllBoards = exports.editBoard = exports.createBoard = void 0;
var _boardModel = _interopRequireDefault(require("../models/boardModel"));
var _slugify = _interopRequireDefault(require("slugify"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getAllBoards = async (_req, res) => {
  const boards = await _boardModel.default.find();
  res.status(200).json({
    data: boards
  });
};
exports.getAllBoards = getAllBoards;
const createBoard = async (req, res) => {
  const {
    name,
    columns
  } = req.body;
  try {
    const newBoard = new _boardModel.default({
      name,
      columns: columns.map(item => {
        return {
          name: item
        };
      })
    });
    await newBoard.save();
    res.status(201).json({
      message: "Boards successfuly created",
      data: newBoard
    });
  } catch (err) {
    res.status(400).json({
      message: "error",
      error: err
    });
  }
};
exports.createBoard = createBoard;
const editBoard = async (req, res) => {
  try {
    const board = await _boardModel.default.findOneAndReplace({
      _id: req.params.id
    }, {
      ...req.body,
      slug: (0, _slugify.default)(req.body.name, {
        lower: true
      })
    }, {
      new: true,
      runValidators: true
    });
    res.status(201).json({
      message: "Boards successfuly edited",
      data: board
    });
  } catch (err) {
    res.status(400).json({
      message: "error",
      error: err
    });
  }
};
exports.editBoard = editBoard;