/* eslint-disable eqeqeq */
import {
  check,
  validationResult,
  param,
} from 'express-validator/check';
import Account from '../models/accounts';

const message = 'Invalid Account Type: Account Type can be either "savings" or "current';
const validateUser = {
  // --------------- SignUp validations ------------
  signup: [
    check('password')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Password should not empty: input password')
      .trim()
      .isLength({ min: 7 })
      .withMessage('Password Length should be at least 8 Characters'),
    check('firstName')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('firstName should not be left empty: input firstName')
      .isAlpha()
      .trim()
      .withMessage('firstName can only contain letters: remove invalid characters')
      .customSanitizer(value => value.toLowerCase()),
    check('lastName')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('lastName should not be left empty: input lastName')
      .isAlpha()
      .trim()
      .withMessage('lastName can ony contain letters: remove invalid characters')
      .customSanitizer(value => value.toLowerCase()),
    check('email')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('email should not be left empty: input email address')
      .isEmail()
      .trim()
      .withMessage('input a valid email address')
      .normalizeEmail(),
    check('type')
      .not()
      .isString()
      .withMessage('Type is not allowed'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((err) => {
          errMessages.push(err.msg);
        });
        return res.status(400).json({
          status: 400,
          error: errMessages,
        });
      }
      return next();
    },
  ],
  createUser: [
    check('password')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Password should not empty: input password')
      .trim()
      .isLength({ min: 7 })
      .withMessage('Password Length should be at least 8 Characters'),
    check('firstName')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('firstName should not be left empty: input firstName')
      .isAlpha()
      .trim()
      .withMessage('firstName can only contain letters: remove invalid characters')
      .customSanitizer(value => value.toLowerCase()),
    check('lastName')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('lastName should not be left empty: input lastName')
      .isAlpha()
      .trim()
      .withMessage('lastName can ony contain letters: remove invalid characters')
      .customSanitizer(value => value.toLowerCase()),
    check('email')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('email should not be left empty: input email address')
      .isEmail()
      .trim()
      .withMessage('input a valid email address')
      .normalizeEmail(),
    check('isAdmin')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('isAdmin should not be left empty: specify isAdmin')
      .toBoolean()
      .isIn([true, false])
      .withMessage('isAdmin can either be "true" or "false"'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((err) => {
          errMessages.push(err.msg);
        });
        return res.status(400).json({
          status: 400,
          error: errMessages,
        });
      }
      return next();
    },
  ],
  // --------------- SignIn validations ------------
  signin: [
    check('email')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('email should not be left empty: input email address')
      .isEmail()
      .trim()
      .withMessage('input a valid email address'),

    check('password')
      .not()
      .isEmpty()
      .withMessage('password should not be left empty: input password'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((err) => {
          errMessages.push(err.msg);
        });
        return res.status(400).json({
          status: 400,
          error: errMessages,
        });
      }
      return next();
    },
  ],
  // --------------- Create Account validations ------------
  creatAccount: [
    check('type')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('type should not be left empty: Please specify account type')
      .trim()
      .isIn(['savings', 'current'])
      .withMessage(message),
    check('initialDeposit')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Initial deposit cant be left empty: specify initial deposit')
      .toFloat()
      .withMessage('Please input a valid number for initialDeposit'),

    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((err) => {
          errMessages.push(err.msg);
        });
        return res.status(400).json({
          status: 400,
          error: errMessages,
        });
      }
      return next();
    },
  ],
  // --------------- Change Account status ------------
  changeAccountStatus: [
    param('accountNumber')
      .custom(async (acctNo) => {
        const response = await Account.checkAccount(acctNo);
        if (response.rowCount < 1) throw new Error(`No account with the account Number "${acctNo}" was found`);
      }),
    check('status')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('status should not be left empty: Please input status')
      .trim()
      .isIn(['active', 'dormant'])
      .withMessage('Account status can only be "active" or "dormant"'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((err) => {
          errMessages.push(err.msg);
        });
        return res.status(400).json({
          status: res.statusCode,
          error: errMessages,
        });
      }
      return next();
    },
  ],
  // --------------- Delete Account ------------
  deleteAccount: [
    param('accountNumber')
      .custom(async (acctNo) => {
        const isFound = await Account.checkAccount(acctNo);
        if (!isFound) throw new Error(`No account with the account Number "${acctNo}" was found`);
      }),
    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((err) => {
          errMessages.push(err.msg);
        });
        return res.status(404).json({
          status: res.statusCode,
          error: errMessages,
        });
      }
      return next();
    },
  ],
  // ------------------- Validate Amount --------------
  validateAmount: [
    check('amount')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Amount should not left Empty: input amount.')
      .toFloat()
      .withMessage('Invalid amount: amount can accept numbers only')
      .custom(async (value) => {
        if (Number(value) < 1) throw new Error('Please specify a valid amount');
      })
      .toFloat()
      .withMessage('Please enter a valid amount'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((err) => {
          errMessages.push(err.msg);
        });
        return res.status(400).json({
          status: res.statusCode,
          error: errMessages,
        });
      }
      return next();
    },
  ],
  validateAccountURL: [
    param('accountNumber')
      .custom(async (acctNo) => {
        const isFound = await Account.checkAccount(acctNo);
        if (isFound.rows < 1) throw new Error(`No account with the account Number "${acctNo}" was found`);
      }),
    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((err) => {
          errMessages.push(err.msg);
        });
        return res.status(404).json({
          status: res.statusCode,
          error: errMessages,
        });
      }
      return next();
    },
  ],

};
export default validateUser;
