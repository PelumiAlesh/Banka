"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _check = require("express-validator/check");

var _accounts = _interopRequireDefault(require("../models/accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var message = 'Invalid Account Type: Account Type can be either "savings" or "current';
var validateUser = {
  // --------------- SignUp validations ------------
  signup: [(0, _check.check)('password').isLength({
    min: 7
  }).withMessage('Password Length should be at least 8 Characters'), (0, _check.check)('firstName').not().isEmpty().withMessage('FirstName should not be left empty'), (0, _check.check)('lastName').not().isEmpty().withMessage('LastName should not be left empty'), (0, _check.check)('firstName').isAlpha().trim().withMessage('firstName can ony contain letters'), (0, _check.check)('lastName').isAlpha().trim().withMessage('lastName can ony contain letters'), (0, _check.check)('email').isEmail().trim().withMessage('input a valid email address'), (0, _check.check)('email').not().isEmpty().withMessage('input email address'), (0, _check.check)('password').not().isEmpty().withMessage('input password'), (0, _check.check)('type').not().isString().withMessage('Type is not allowed'), function (req, res, next) {
    var errors = (0, _check.validationResult)(req);
    var errMessages = [];

    if (!errors.isEmpty()) {
      errors.array().forEach(function (err) {
        errMessages.push(err.msg);
      });
      return res.status(401).json({
        status: 401,
        error: errMessages
      });
    }

    return next();
  }],
  // --------------- SignIn validations ------------
  signin: [(0, _check.check)('email').isEmail().trim().withMessage('input a valid email address'), (0, _check.check)('email').not().isEmpty().withMessage('input email address'), (0, _check.check)('password').not().isEmpty().withMessage('input password'), function (req, res, next) {
    var errors = (0, _check.validationResult)(req);
    var errMessages = [];

    if (!errors.isEmpty()) {
      errors.array().forEach(function (err) {
        errMessages.push(err.msg);
      });
      return res.status(401).json({
        status: 401,
        error: errMessages
      });
    }

    return next();
  }],
  // --------------- Create Account validations ------------
  creatAccount: [(0, _check.check)('type').not().isEmpty().withMessage('Please specify account type'), (0, _check.oneOf)([(0, _check.check)('type').equals('savings'), (0, _check.check)('type').equals('current')], message), function (req, res, next) {
    var errors = (0, _check.validationResult)(req);
    var errMessages = [];

    if (!errors.isEmpty()) {
      errors.array().forEach(function (err) {
        errMessages.push(err.msg);
      });
      return res.status(401).json({
        status: 401,
        error: errMessages
      });
    }

    return next();
  }],
  // --------------- Change Account status ------------
  changeAccountStatus: [(0, _check.param)('accountNumber').custom(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(acctNo) {
      var isFound;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _accounts["default"].checkAccount(acctNo);

            case 2:
              isFound = _context.sent;

              if (isFound) {
                _context.next = 5;
                break;
              }

              throw new Error("No account with the account Number \"".concat(acctNo, "\" was found"));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()), (0, _check.check)('status').not().isEmpty().withMessage('Please input status'), (0, _check.oneOf)([(0, _check.check)('status').equals('active'), (0, _check.check)('status').equals('dormant')], 'Account status can only be "active" or "dormant"'), function (req, res, next) {
    var errors = (0, _check.validationResult)(req);
    var errMessages = [];

    if (!errors.isEmpty()) {
      errors.array().forEach(function (err) {
        errMessages.push(err.msg);
      });
      return res.status(400).json({
        status: res.statusCode,
        error: errMessages
      });
    }

    return next();
  }],
  // --------------- Delete Account ------------
  deleteAccount: [(0, _check.param)('accountNumber').custom(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(acctNo) {
      var isFound;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _accounts["default"].checkAccount(acctNo);

            case 2:
              isFound = _context2.sent;

              if (isFound) {
                _context2.next = 5;
                break;
              }

              throw new Error("No account with the account Number \"".concat(acctNo, "\" was found"));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }()), function (req, res, next) {
    var errors = (0, _check.validationResult)(req);
    var errMessages = [];

    if (!errors.isEmpty()) {
      errors.array().forEach(function (err) {
        errMessages.push(err.msg);
      });
      return res.status(404).json({
        status: res.statusCode,
        error: errMessages
      });
    }

    return next();
  }],
  // ------------------- Validate Amount --------------
  validateAmount: [(0, _check.check)('amount').not().isEmpty().withMessage('Amount can not left Empty!.'), function (req, res, next) {
    var errors = (0, _check.validationResult)(req);
    var errMessages = [];

    if (!errors.isEmpty()) {
      errors.array().forEach(function (err) {
        errMessages.push(err.msg);
      });
      return res.status(400).json({
        status: res.statusCode,
        error: errMessages
      });
    }

    return next();
  }],
  validateAccountURL: [(0, _check.param)('accountNumber').custom(
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(acctNo) {
      var isFound;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _accounts["default"].checkAccount(acctNo);

            case 2:
              isFound = _context3.sent;

              if (isFound) {
                _context3.next = 5;
                break;
              }

              throw new Error("No account with the account Number \"".concat(acctNo, "\" was found"));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }()), function (req, res, next) {
    var errors = (0, _check.validationResult)(req);
    var errMessages = [];

    if (!errors.isEmpty()) {
      errors.array().forEach(function (err) {
        errMessages.push(err.msg);
      });
      return res.status(404).json({
        status: res.statusCode,
        error: errMessages
      });
    }

    return next();
  }]
};
var _default = validateUser;
exports["default"] = _default;