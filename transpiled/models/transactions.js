"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transactions = _interopRequireDefault(require("./mock_data/transactions"));

var _accounts = _interopRequireDefault(require("./accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class Transactions
 * @description Make debit or credit transaction on an account
 * @exports Transaction
 */
var Transactions =
/*#__PURE__*/
function () {
  function Transactions() {
    _classCallCheck(this, Transactions);
  }

  _createClass(Transactions, null, [{
    key: "transact",

    /**
     * @method transact
     * @description Make debit or credit transaction on an account
     * @param {object} req - The staff request Object
     * @param {object} res - The ReSPONSE Object
     * @param {string} type - Credit or Debit
     * @returns {object} Transaction details
     */
    value: function transact(req, res, type) {
      var acctDetail = _accounts["default"].checkAccount(req.params.accountNumber);

      var transaction = {
        id: _transactions["default"].length + 1,
        createdOn: new Date(),
        type: type,
        accountNumber: parseInt(req.params.accountNumber, 10),
        cashier: req.user.id,
        amount: parseFloat(req.body.amount),
        oldBalance: acctDetail.balance,
        newBalance: type === 'credit' ? parseFloat((acctDetail.balance + parseFloat(req.body.amount)).toFixed(2)) : parseFloat((acctDetail.balance - parseFloat(req.body.amount)).toFixed(2))
      };
      acctDetail.balance = transaction.newBalance;

      _transactions["default"].push(transaction);

      return transaction;
    }
  }]);

  return Transactions;
}();

var _default = Transactions;
exports["default"] = _default;