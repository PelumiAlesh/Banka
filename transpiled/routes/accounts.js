"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _accountControllers = _interopRequireDefault(require("../controllers/accountControllers"));

var _inputValidation = _interopRequireDefault(require("../middlewares/inputValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use(_bodyParser["default"].json()); // Create new account

router.post('/', _inputValidation["default"].creatAccount, _auth["default"].verifyClient, _accountControllers["default"].createAccount); // Activate or Deactivate Account

router.patch('/:accountNumber', _inputValidation["default"].changeAccountStatus, _auth["default"].verifyStaff, _accountControllers["default"].changeStatus); // Delete an Account

router["delete"]('/:accountNumber', _inputValidation["default"].deleteAccount, _auth["default"].verifyStaff, _accountControllers["default"].deleteAccount);
var _default = router;
exports["default"] = _default;