"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _accounts = _interopRequireDefault(require("./mock_data/accounts"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports Account
 * @class Account
 * @description A class for making request to accounts: Create , change status etc..
 */
var Account =
/*#__PURE__*/
function () {
  function Account() {
    _classCallCheck(this, Account);
  }

  _createClass(Account, null, [{
    key: "createAccount",

    /**
     * @method CreateAccount
     * @description Method for creating account
     * @param  {object} data - The request Body
     * @param  {object} req - The payload from verfiy token
     * @returns {pbject} The new account Details
     */
    value: function createAccount(data, req) {
      var accountDetails = {
        id: _accounts["default"].length + 1,
        accountNumber: _helper["default"].generateAccountNumber(),
        createdOn: new Date(),
        owner: req.user.id,
        type: data.type,
        status: 'active',
        balance: parseFloat(data.initialDeposit, 10)
      };

      _accounts["default"].push(accountDetails);

      return accountDetails;
    }
    /**
     * @method checkAccount
     * @description Checks and return account details if account is found
     * @param {string} acctNo - Account number to be checked in accounts database
     * @returns {object} Account details if found
     */

  }, {
    key: "checkAccount",
    value: function checkAccount(acctNo) {
      var acctDetails = _accounts["default"].find(function (account) {
        return account.accountNumber === parseInt(acctNo, 10);
      });

      return acctDetails;
    }
    /**
     * @param  {Number} sliceStart - A number specifying the slicing index.
     * @method deleteAccount
     * @description  - Method to delete an account
     */

  }, {
    key: "deleteAccount",
    value: function deleteAccount(sliceStart) {
      _accounts["default"].slice(sliceStart, 1);
    }
  }]);

  return Account;
}();

var _default = Account;
exports["default"] = _default;