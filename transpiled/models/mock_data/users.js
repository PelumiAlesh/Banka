"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helper = _interopRequireDefault(require("../../helpers/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var users = [{
  id: 1,
  firstName: 'Pelumi',
  lastName: 'Aleshinloye',
  email: 'pels@gmail.com',
  password: _helper["default"].hashPassword('password'),
  type: 'client'
}, {
  id: 2,
  firstName: 'Ayomide',
  lastName: 'Aleshinloye',
  email: 'ayo@gmail.com',
  password: _helper["default"].hashPassword('password'),
  type: 'staff',
  isAdmin: true
}, {
  id: 3,
  firstName: 'Babatunde',
  lastName: 'Aleshinloye',
  email: 'Babs@gmail.com',
  password: _helper["default"].hashPassword('password'),
  type: 'staff',
  isAdmin: false
}];
var _default = users;
exports["default"] = _default;