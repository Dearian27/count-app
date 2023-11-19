"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _User = require("../models/User.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const verifyToken = async (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (!token) return res.status(401).json({
    message: 'Ви не зареєстровані.'
  });
  _jsonwebtoken.default.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({
      message: 'Токен неправильний, або прострочений.'
    });
    req.user = user;
  });
  const user = await _User.User.findById(req.user.id);
  if (!user) {
    return res.status(401).json({
      message: 'Ви не зареєстровані.'
    });
  }
  req.isTeacher = user.status === 'teacher' || user.status === 'admin';
  req.isAdmin = user.status === 'admin';
  next();
};
exports.verifyToken = verifyToken;