"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _app = _interopRequireDefault(require("./app"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _process$env$DATABASE;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config({
  path: './local.env'
});
if (!process.env.DATABASE_URL || !process.env.DATABASE_PASSWORD) {
  throw new Error('Database URL or Database password is not defined in environment variables!');
}
const DB_URL = (_process$env$DATABASE = process.env.DATABASE_URL) === null || _process$env$DATABASE === void 0 ? void 0 : _process$env$DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// process.on('uncaughtException', (err, origin) => {
//   //code to log the errors
//   console.log(
//      `Caught exception: ${err}\n` +
//      `Exception origin: ${origin}`,
//    );
//  });

try {
  DB_URL && _mongoose.default.connect(DB_URL).then(_con => {
    // console.log(con.connections);
    console.log('Database connected!');
  });
} catch (error) {
  console.error('Error connecting to database:', error);
}
const port = 3000; // You can choose any available port

// Start the server
_app.default.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});