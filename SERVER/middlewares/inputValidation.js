import { check, validationResult } from 'express-validator/check';

const validateUser = [
  check('firstName').not().isEmpty().withMessage('First  Name should not be left empty'),
  check('lastName').not().isEmpty().withMessage('Last  Name should not be left empty'),
  check('email').isEmail().trim().withMessage('input a valid email address'),
  check('email').not().isEmpty().withMessage('input email address'),
  check('password').not().isEmpty().withMessage('input password'),
  check('firstName').isAlpha().trim().withMessage('firstName can ony contain letters'),
  check('lastName').isAlpha().trim().withMessage('lastName can ony contain letters'),
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
];
export default validateUser;
