import { check, validationResult, oneOf } from 'express-validator/check';

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
};
export default validateUser;
