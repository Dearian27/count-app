"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Computer = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const compSchema = _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  components: {
    type: [{
      id: [String],
      type: {
        type: String
      }
    }],
    default: [{
      id: [],
      type: 'case'
    }, {
      id: [],
      type: 'gpu'
    }, {
      id: [],
      type: 'cpu'
    }, {
      id: [],
      type: 'motherboard'
    }, {
      id: [],
      type: 'monitor'
    }, {
      id: [],
      type: 'ram'
    }, {
      id: [],
      type: 'disk'
    }, {
      id: [],
      type: 'keyboard'
    }, {
      id: [],
      type: 'mouse'
    }, {
      id: [],
      type: 'power_supply'
    }],
    _id: false
  },
  history: {
    type: [{
      date: Date,
      componentType: String,
      _id: String,
      name: String,
      oldId: {
        type: String,
        default: ''
      },
      oldName: {
        type: String,
        default: ''
      }
    }],
    default: []
  },
  location: {
    type: String,
    default: ''
  },
  responsible: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  }
});
const Computer = exports.Computer = _mongoose.default.model('Computer', compSchema);