"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../models/users"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _Exist = _interopRequireDefault(require("../helpers/Exist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class UserController
 * @description Controller for signup and signin
 * @exports UserController
 */
var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "signUp",

    /**
     * @method signUp
     * @description Method to create a user
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} New user informations
     */
    value: function signUp(req, res) {
      var userInput = _objectSpread({}, req.body);

      var emailExist = _Exist["default"].emailExist(userInput.email, false);

      if (emailExist) {
        return res.status(409).json({
          status: res.statusCode,
          error: 'Email already exist!'
        });
      }

      var newUser = _users["default"].create(userInput);

      var token = _helper["default"].generateToken({
        email: userInput.email,
        id: newUser.id
      });

      return res.status(201).json({
        status: 201,
        data: {
          token: token,
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email
        }
      });
    }
  }, {
    key: "signIn",
    value: function signIn(req, res) {
      var userInput = _objectSpread({}, req.body);

      var _Exist$emailExist = _Exist["default"].emailExist(userInput.email, true),
          userDetails = _Exist$emailExist.userDetails,
          emailExists = _Exist$emailExist.emailExists;

      if (!emailExists || !_helper["default"].verifyPassword(userInput.password, userDetails.password)) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'Authentication Failed: Email or Password is incorrect'
        });
      }

      var token = _helper["default"].generateToken({
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        id: userDetails.id,
        type: userDetails.type
      });

      return res.status(201).json({
        status: res.statusCode,
        data: {
          token: token,
          id: userDetails.id,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email
        }
      });
    }
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;