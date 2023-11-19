"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _express = _interopRequireDefault(require("express"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _dotenv = require("dotenv");
var _cors = _interopRequireDefault(require("cors"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _computers = _interopRequireDefault(require("./routes/computers.js"));
var _components = _interopRequireDefault(require("./routes/components.js"));
var _auth = _interopRequireDefault(require("./routes/auth.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
const PORT = process.env.PORT || 8879;
(0, _dotenv.config)();
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
_mongoose.default.set('strictQuery', false);
app.use((0, _cors.default)({
  // origin: [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN_LOCAL],
  // origin: process.env.CORS_ORIGIN,
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use('/api/auth', _auth.default);
app.use('/api/computers', _computers.default);
app.use('/api/components', _components.default);
app.use((req, res, next) => {
  next((0, _httpErrors.default)(404));
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
const connect = () => {
  _mongoose.default.connect(process.env.MONGO, {}).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.log('Irror');
    throw err;
  });
};
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on http://localhost:${PORT}`);
});
var _default = exports.default = app;