"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _slugify = _interopRequireDefault(require("slugify"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const subtaskSchema = new _mongoose.default.Schema({
  _id: _mongoose.default.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});
const taskSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  subtasks: [subtaskSchema]
});
const columnSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    validate: {
      validator: function (val) {
        let count = 0;
        let columnSchema = this;
        for (let i = 0; i < columnSchema.parent().columns.length; i++) {
          if (columnSchema.parent().columns[i].name == val) {
            count++;
          }
        }
        return count <= 1;
      },
      message: "Name should be unique"
    },
    required: true
  },
  tasks: [taskSchema]
});
const boardSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  slug: {
    type: String
  },
  columns: [columnSchema]
});
boardSchema.pre("save", function (next) {
  this.slug = (0, _slugify.default)(this.name, {
    lower: true
  });
  next();
});
const Board = _mongoose.default.model("Board", boardSchema);
var _default = exports.default = Board;