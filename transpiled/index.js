"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _users = _interopRequireDefault(require("./routes/users"));

var _accounts = _interopRequireDefault(require("./routes/accounts"));

var _transactions = _interopRequireDefault(require("./routes/transactions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// -----Routes-------
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
var port = process.env.PORT || 5000; // -------Redirect all api endpoint to version 1---------

app.get('/api', function (req, res) {
  return res.status(301).redirect('/api/v1');
});
app.use('/api/v1/auth', _users["default"]);
app.use('/api/v1/accounts', _accounts["default"]);
app.use('/api/v1/transactions', _transactions["default"]);
app.get('/api/v1', function (req, res) {
  res.json({
    status: 200,
    message: 'Welcome to Version 1 of Banka Api...'
  });
});
app.use('*', function (req, res) {
  res.status(404).json({
    status: 404,
    message: 'Endpoint not found, Please check your url again...'
  });
});
app.listen(port || 5000);
var _default = app;
exports["default"] = _default;