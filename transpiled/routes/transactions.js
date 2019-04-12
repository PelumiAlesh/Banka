"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _inputValidation = _interopRequireDefault(require("../middlewares/inputValidation"));

var _transactionsController = _interopRequireDefault(require("../controllers/transactionsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use(_bodyParser["default"].json());
router.post('/:accountNumber/credit', _auth["default"].verifyStaff, _inputValidation["default"].validateAccountURL, _inputValidation["default"].validateAmount, _transactionsController["default"].credit);
router.post('/:accountNumber/debit', _auth["default"].verifyStaff, _inputValidation["default"].validateAccountURL, _inputValidation["default"].validateAmount, _transactionsController["default"].debit);
var _default = router;
exports["default"] = _default;