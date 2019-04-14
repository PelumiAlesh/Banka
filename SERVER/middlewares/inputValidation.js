/* eslint-disable eqeqeq */
import {
  check,
  validationResult,
  oneOf,
  param,
} from 'express-validator/check';
import Account from '../models/accounts';

const accountCheck = () => { return param('accountNumber').custom(async (acctNo) => {
  const isFound = await Account.checkAccount(acctNo);
  if (!isFound) throw new Error(`No account with the account Number "${acctNo}" was found`);
});
};

const message = 'Invalid Account Type: Account Type can be either "savings" or "current';
const validateUser = {
  // --------------- SignUp validations ------------
  signup: [
    check('password').isLength({ min: 7 }).withMessage('Password Length should be at least 8 Characters'),
    check('firstName').not().isEmpty().withMessage('FirstName should not be left empty'),
    check('lastName').not().isEmpty().withMessage('LastName should not be left empty'),
    check('firstName').isAlpha().trim().withMessage('firstName can ony contain letters'),
    check('lastName').isAlpha().trim().withMessage('lastName can ony contain letters'),
    check('email').isEmail().trim().withMessage('input a valid email address'),
    check('email').not().isEmpty().withMessage('input email address'),
    check('password').not().isEmpty().withMessage('input password'),
    check('type').not().isString().withMessage('Type is not allowed'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array().forEach((err) => {
          errMessages.push(err.msg);
        });
        return res.status(401).json({
          status: 401,
          error: errMessages,
        });
      }
      return next();
    },
  ],
  // --------------- SignIn validations ------------
  signin: [
    check('email').isEmail().trim().withMessage('input a valid email address'),
    check('email').not().isEmpty().withMessage('input email address'),
    check('password').not().isEmpty().withMessage('input password'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array().forEach((err) => {
          errMessages.push(err.msg);
        });
        return res.status(401).json({
          status: 401,
          error: errMessages,
        });
      }
      return next();
    },
  ],
  // --------------- Create Account validations ------------
  creatAccount: [
    check('type').not().isEmpty().withMessage('Please specify account type'),
    oneOf([
      check('type').equals('savings'),
      check('type').equals('current'),
    ], message),
    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array().forEach((err) => {
          errMessages.push(err.msg);
        });
        return res.status(401).json({
          status: 401,
          error: errMessages,
        });
      }
      return next();
    },
  ],
  // --------------- Change Account status ------------
  changeAccountStatus: [
    accountCheck(),
    check('status').not().isEmpty().withMessage('Please input status'),
    oneOf([
      check('status').equals('active'),
      check('status').equals('dormant'),
    ], 'Account status can only be "active" or "dormant"'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array().forEach((err) => {
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
    accountCheck(),
    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array().forEach((err) => {
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
    check('amount').not().isEmpty().withMessage('Amount can not left Empty!.'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array().forEach((err) => {
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
    param('accountNumber').custom(async (acctNo) => {
      const isFound = await Account.checkAccount(acctNo);
      if (!isFound) throw new Error(`No account with the account Number "${acctNo}" was found`);
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      const errMessages = [];
      if (!errors.isEmpty()) {
        errors.array().forEach((err) => {
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
