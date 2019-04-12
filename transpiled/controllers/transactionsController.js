"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transactions = _interopRequireDefault(require("../models/transactions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TransactionController =
/*#__PURE__*/
function () {
  function TransactionController() {
    _classCallCheck(this, TransactionController);
  }

  _createClass(TransactionController, null, [{
    key: "credit",

    /**
    * @method credit
    * @description Credits a user's bank account
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} API Response
    */
    value: function credit(req, res) {
      var transactionDetails = _transactions["default"].transact(req, res, 'credit');

      return res.status(201).json({
        status: res.stausCode,
        data: {
          transactionId: transactionDetails.id,
          accountNumber: transactionDetails.accountNumber,
          amount: transactionDetails.amount,
          cashier: transactionDetails.cashier,
          transactionType: transactionDetails.type,
          accountBalance: transactionDetails.newBalance
        }
      });
    }
    /**
    * @method Debit
    * @description Debits a user's bank account
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} API Response
    */

  }, {
    key: "debit",
    value: function debit(req, res) {
      var transactionDetails = _transactions["default"].transact(req, res, 'debit');

      return res.status(201).json({
        status: res.stausCode,
        data: {
          transactionId: transactionDetails.id,
          accountNumber: transactionDetails.accountNumber,
          amount: transactionDetails.amount,
          cashier: transactionDetails.cashier,
          transactionType: transactionDetails.type,
          accountBalance: transactionDetails.newBalance
        }
      });
    }
  }]);

  return TransactionController;
}();

var _default = TransactionController;
exports["default"] = _default;