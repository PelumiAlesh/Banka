"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SALT_ROUNDS = _config["default"].SALT_ROUNDS,
    SECRET_KEY = _config["default"].SECRET_KEY;
/**
 * @class Helper
 * @description Contains method for hasing password and genrating tokens
 * @export Auth
 */

var Helper =
/*#__PURE__*/
function () {
  function Helper() {
    _classCallCheck(this, Helper);
  }

  _createClass(Helper, null, [{
    key: "hashPassword",

    /**
     * @method hashPassword
     * @description Helps to hash the user password
     * @param  {string} password - Plain password to be hashed
     * @returns {string} The hashed password
     */
    value: function hashPassword(password) {
      return _bcrypt["default"].hashSync(password, parseInt(SALT_ROUNDS, 10));
    }
    /**
     * @method verifyPassword
     * @description Helps to compare the hashed password and plain Password
     * @param  {string} hashedpassword - Plain password to be hashed
     * @param  {string} plainPassword - The password to be compared
     * @returns {boolean} True/False indicating if password matches or Not
     */

  }, {
    key: "verifyPassword",
    value: function verifyPassword(unHashedPassword, hashedPassword) {
      return _bcrypt["default"].compareSync(unHashedPassword, hashedPassword);
    }
    /**
     * @method generateToken
     * @description Uses the user payload to generate a unique token
     * @param {object} payload - User payloaod for generating token
     * @returns {string} Token in form of a string
     */

  }, {
    key: "generateToken",
    value: function generateToken(payload) {
      var token = _jsonwebtoken["default"].sign(payload, SECRET_KEY, {
        expiresIn: '1h'
      });

      return token;
    }
    /**
    * @method verifyToken
    * @description verifies the given token
    * @param {string} token - The token to be verified
    * @returns {object} The payload of the token
    */

  }, {
    key: "verifyToken",
    value: function verifyToken(token) {
      var decoded = _jsonwebtoken["default"].verify(token, SECRET_KEY);

      return decoded;
    }
    /**
     * @method generateAccountNumber
     * @returns {string} Random account Number
     */

  }, {
    key: "generateAccountNumber",
    value: function generateAccountNumber() {
      var accountNumber = Math.random().toString().slice(2, 12);
      return accountNumber;
    }
  }]);

  return Helper;
}();

var _default = Helper;
exports["default"] = _default;