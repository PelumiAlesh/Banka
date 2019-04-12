"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helper = _interopRequireDefault(require("../helpers/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class AuthenticateUser
 * @description To verify user , staff and admin tokens
 * @exports AuthenticateUser
 */
var AuthenticateUser =
/*#__PURE__*/
function () {
  function AuthenticateUser() {
    _classCallCheck(this, AuthenticateUser);
  }

  _createClass(AuthenticateUser, null, [{
    key: "verifyClient",

    /**
     * @param  {object} req - The user request object
     * @param  {object} res - The user res response object
     * @param  {function} next - The next() Function
     * @returns {object} req.user - The payload object
     */
    value: function verifyClient(req, res, next) {
      try {
        var token = req.headers.authorization.split(' ')[1];

        var decoded = _helper["default"].verifyToken(token);

        req.user = decoded;
        return next();
      } catch (error) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'Authentication Failed: Cant create account.'
        });
      }
    }
  }, {
    key: "verifyStaff",
    value: function verifyStaff(req, res, next) {
      try {
        var token = req.headers.authorization.split(' ')[1];

        var decoded = _helper["default"].verifyToken(token);

        req.user = decoded;

        if (req.user.type !== 'staff') {
          return res.status(403).send({
            status: res.statusCode,
            error: 'You are not authorized to view this endpoint'
          });
        }

        return next();
      } catch (error) {
        return res.status(401).send({
          status: res.statusCode,
          error: 'Authentication Failed'
        });
      }
    }
  }]);

  return AuthenticateUser;
}();

var _default = AuthenticateUser;
exports["default"] = _default;