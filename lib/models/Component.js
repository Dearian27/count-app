"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const componentSchema = new _mongoose.default.Schema({
  name: String,
  type: {
    type: String,
    enum: ["case", "gpu", "cpu", "motherboard", "monitor", "ram", "disk", "mouse", "keyboard", "power_supply"]
  },
  anchor: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});
const Component = exports.Component = _mongoose.default.model("Component", componentSchema);