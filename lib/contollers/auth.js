"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = exports.promoteUser = exports.lowerUser = exports.getUsers = exports.deleteUser = void 0;
var _User = require("../models/User.js");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const signUp = async (req, res, next) => {
  const {
    name,
    surname,
    email,
    password
  } = req.body;
  if (!name || !surname || !email || !password) {
    return res.status(401).json({
      message: 'Please provide valid credentials'
    });
  }
  try {
    const isSignedUp = await _User.User.findOne({
      email
    });
    if (isSignedUp) {
      return res.status(400).json({
        message: 'Користувач за такою поштою уже зареєстрований',
        reason: "user"
      });
    }
    const salt = _bcrypt.default.genSaltSync(10);
    const hashedPassword = _bcrypt.default.hashSync(password, salt);
    const newUser = new _User.User({
      name,
      surname,
      email,
      password: hashedPassword
    });
    await newUser.save();
    const token = _jsonwebtoken.default.sign({
      id: newUser._id
    }, process.env.SECRET_KEY);
    const {
      userPassword,
      ...other
    } = newUser._doc;
    return res.status(200).json({
      token,
      user: other,
      message: "Користувача створено успішно"
    });
  } catch (err) {
    return res.status(404).json({
      message: "Щось пішло не так"
    });
  }
};
exports.signUp = signUp;
const signIn = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Заповніть форму',
        reason: "email"
      });
    }
    const user = await _User.User.findOne({
      email
    });
    if (!user) {
      return res.status(401).json({
        message: 'Користувача з такою поштою не існує',
        reason: "user"
      });
    }
    const checkPassword = _bcrypt.default.compareSync(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: 'Неправильний пароль',
        reason: "password"
      });
    }
    const token = _jsonwebtoken.default.sign({
      id: user._id
    }, process.env.SECRET_KEY);
    const {
      password: _,
      ...other
    } = user._doc;
    res.status(200).json({
      user: other,
      token
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
exports.signIn = signIn;
const getUsers = async (req, res) => {
  try {
    const users = await _User.User.find();
    return res.status(200).json({
      users,
      message: 'Отримання користувачів.'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Щось пішло не так.'
    });
  }
};
exports.getUsers = getUsers;
const promoteUser = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    console.log(res.isAdmin);
    if (!req.isAdmin) {
      return res.status(403).json({
        message: "У вам недостатньо прав."
      });
    }
    const user = await _User.User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: 'Користувач не знайдений.'
      });
    }
    user.status = 'teacher';
    await user.save();
    return res.status(200).json({
      message: "Користувача підвищено успішно."
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Щось пішло не так.'
    });
  }
};
exports.promoteUser = promoteUser;
const lowerUser = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    if (!req.isAdmin) {
      return res.status(403).json({
        message: "У вам недостатньо прав."
      });
    }
    const user = await _User.User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: 'Користувач не знайдений.'
      });
    }
    user.status = 'viewer';
    await user.save();
    return res.status(200).json({
      message: "Користувача понижено успішно."
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Щось пішло не так.'
    });
  }
};
exports.lowerUser = lowerUser;
const deleteUser = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    if (!req.isAdmin) {
      return res.status(403).json({
        message: "У вам недостатньо прав."
      });
    }
    const user = await _User.User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: 'Користувач не знайдений.'
      });
    }
    await _User.User.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Користувача видалено успішно."
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Щось пішло не так.'
    });
  }
};
exports.deleteUser = deleteUser;