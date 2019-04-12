"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _accounts = _interopRequireDefault(require("../models/accounts"));

var _accounts2 = _interopRequireDefault(require("../models/mock_data/accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class AccountController
 * @description class to create, change status, debit && credit an account.
 * @exports Accountcontroller
 */
var AccountController =
/*#__PURE__*/
function () {
  function AccountController() {
    _classCallCheck(this, AccountController);
  }

  _createClass(AccountController, null, [{
    key: "createAccount",

    /**
     * @method createAccount
     * @description Create a new account
     * @param {object} req - The user Request Object
     * @param {object} res - The user Response Object
     * @returns {object} API RESPONSE IN JSON FORMAT
     */
    value: function createAccount(req, res) {
      var newAccount = _accounts["default"].createAccount(req.body, req);

      return res.status(201).json({
        status: res.statusCode,
        data: {
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          accountNumber: newAccount.accountNumber,
          type: newAccount.type
        }
      });
    }
    /**
     * @method changeStatus
     * @description method to change user status
     * @param  {object} req - The User Request Object
     * @param  {object} res - The user Response Object
     * @returns {object} API RESPONSE IN JSON FORMAT
     */

  }, {
    key: "changeStatus",
    value: function changeStatus(req, res) {
      var accountNumber = req.params.accountNumber;
      var status = req.body.status;

      var acct = _accounts["default"].checkAccount(req.params.accountNumber);

      acct.status = status;
      return res.status(200).json({
        status: res.statusCode,
        data: {
          accountNumber: accountNumber,
          status: req.body.status
        }
      });
    }
    /**
     * @method deleteAccount
     * @description Deletes the account with the given account Number
     * @param  {object} req - The User Request Object
     * @param  {object} res - The user Response Object
     */

  }, {
    key: "deleteAccount",
    value: function deleteAccount(req, res) {
      var acctInfo = _accounts["default"].checkAccount(req.params.accountNumber);

      var index = _accounts2["default"].indexOf(acctInfo) + 1;

      _accounts["default"].deleteAccount(index);

      res.status(200).json({
        status: res.statusCode,
        message: 'Account Succefully deleted'
      });
    }
  }]);

  return AccountController;
}();

var _default = AccountController;
exports["default"] = _default;