"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("./mock_data/users"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class User
 * @description Contains methods for creating and login user
 */
var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "create",

    /**
     * @param  {object} data - Fields client inputed
     * @method create()
     * @returns {object} New User informations
     */
    value: function create(data) {
      var newUser = {
        id: _users["default"].length + 1,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: _helper["default"].hashPassword(data.password),
        type: 'client'
      };

      _users["default"].push(newUser);

      return newUser;
    }
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;