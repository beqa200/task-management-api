"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _boardRoutes = _interopRequireDefault(require("./routes/boardRoutes"));
var _morgan = _interopRequireDefault(require("morgan"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
if (process.env.NODE_ENV == "development") {
  app.use((0, _morgan.default)("dev"));
}
app.use(_express.default.json());
app.use("/api/v1/boards", _boardRoutes.default);
var _default = exports.default = app;