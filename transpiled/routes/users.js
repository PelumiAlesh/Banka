"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _inputValidation = _interopRequireDefault(require("../middlewares/inputValidation"));

var _userControllers = _interopRequireDefault(require("../controllers/userControllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use(_bodyParser["default"].json());
router.post('/signup', _inputValidation["default"].signup, _userControllers["default"].signUp);
router.post('/signin', _inputValidation["default"].signin, _userControllers["default"].signIn);
var _default = router;
exports["default"] = _default;