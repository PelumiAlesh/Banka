"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../models/mock_data/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Exist =
/*#__PURE__*/
function () {
  function Exist() {
    _classCallCheck(this, Exist);
  }

  _createClass(Exist, null, [{
    key: "emailExist",

    /**
    * @function emailExist
    * @param {string} email - user email
    * @param {boolean} returnUser -Boolean to confirm if user should be returned or not
    */
    value: function emailExist(email, returnUser) {
      var emailExists = false;
      var userDetails;

      _users["default"].forEach(function (user) {
        if (user.email === email) {
          userDetails = user;
          emailExists = true;
        }
      });

      if (returnUser) {
        return {
          userDetails: userDetails,
          emailExists: emailExists
        };
      }

      return emailExists;
    }
  }]);

  return Exist;
}();

var _default = Exist;
exports["default"] = _default;