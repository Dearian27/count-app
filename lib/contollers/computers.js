"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateComputer = exports.getComputersById = exports.getComputers = exports.deleteComputerById = exports.createComputer = void 0;
var _Computer = require("../models/Computer.js");
var _User = require("../models/User.js");
const getComputers = async (req, res, next) => {
  try {
    const computers = await _Computer.Computer.find({});
    return res.status(200).json({
      computers,
      message: "get computers"
    });
  } catch (error) {
    res.status(500).json({
      message: 'something went wrong'
    });
  }
};
exports.getComputers = getComputers;
const getComputersById = async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const computer = await _Computer.Computer.findOne({
      _id: id
    });
    return res.status(200).json({
      computer,
      message: "get computers"
    });
  } catch (error) {
    res.status(500).json({
      message: 'something went wrong'
    });
  }
};
exports.getComputersById = getComputersById;
const createComputer = async (req, res, next) => {
  const {
    name,
    location,
    responsible
  } = req.body;
  try {
    if (!name) res.status(400).send('Bad Request: Field "name" is required');
    const computer = await new _Computer.Computer({
      name,
      responsible,
      location
    });
    computer.save();
    res.status(200).json({
      computer,
      message: "Комп'ютер було створено"
    });
  } catch (err) {
    console.log(err);
  }
};
exports.createComputer = createComputer;
const deleteComputerById = async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const user = await _User.User.findById(req.user.id);
    if (user.status !== "admin" && user.status !== "teacher") {
      return res.status(403).json({
        message: 'Ви не маєте доступу.'
      });
    }
    const deletedComputer = await _Computer.Computer.findOneAndDelete({
      _id: id
    });
    if (!deletedComputer) {
      return res.status(404).json({
        message: "Комп'ютер не знайдено"
      });
    }
    return res.status(200).json({
      message: "Комп'ютер видалено успішно"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Виникла помилка при видаленні комп\'ютера'
    });
  }
};
exports.deleteComputerById = deleteComputerById;
const updateComputer = async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const filter = {
      _id: id
    };
    const computerOld = await _Computer.Computer.find(filter);
    if (!computerOld) {
      return res.status(404).json({
        message: "Компонент не знайдено"
      });
    }
    const {
      location,
      responsible,
      name,
      notes
    } = req.body;
    if (name === '') {
      return res.status(400).json({
        message: 'Поле "ім\'я" не може бути пустим'
      });
    }
    const update = {
      $set: {
        name,
        location,
        responsible,
        notes
      }
    };
    await _Computer.Computer.updateOne(filter, update);
    const computer = await _Computer.Computer.findOne(filter);
    return res.status(200).json({
      computer,
      message: "Комп'ютер оновлено успішно"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Виникла помилка при оновлені компонента'
    });
  }
};
exports.updateComputer = updateComputer;