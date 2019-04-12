"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var transactions = [{
  id: 1,
  createdOn: new Date(),
  type: 'debit',
  accountNumber: 1234567890,
  cashier: 2,
  amount: 23443,
  oldBalance: 100000,
  newBalance: 72667
}, {
  id: 2,
  createdOn: new Date(),
  type: 'credit',
  accountNumber: 1234567890,
  cashier: 2,
  amount: 2000,
  oldBalance: 18900,
  newBalance: 20900
}, {
  id: 3,
  createdOn: new Date(),
  type: 'credit',
  accountNumber: 9987654321,
  cashier: 2,
  amount: 1900,
  oldBalance: 2100,
  newBalance: 4000
}];
var _default = transactions;
exports["default"] = _default;