import express from 'express';
import bodyParser from 'body-parser';
import Authenticate from '../middlewares/auth';
import AccountController from '../controllers/accountControllers';
import InputValidator from '../middlewares/inputValidation';

const router = express.Router();
router.use(bodyParser.json());

// Create new account
router.post('/',
  Authenticate.verifyClient,
  InputValidator.creatAccount,
  AccountController.createAccount);

// Get all accounts
router.get('/',
  Authenticate.verifyStaff,
  AccountController.getAllAccount);

// Activate or Deactivate Account
router.patch('/:accountNumber',
  Authenticate.verifyStaff,
  InputValidator.changeAccountStatus,
  AccountController.changeStatus);

// Delete an Account
router.delete('/:accountNumber',
  Authenticate.verifyStaff,
  InputValidator.deleteAccount,
  AccountController.deleteAccount);

// Get account transactions
router.get('/:accountNumber/transactions',
  InputValidator.validateAccountURL,
  Authenticate.verifyClient,
  AccountController.getTransactionsHistory);

// Get account details
router.get('/:accountNumber',
  InputValidator.validateAccountURL,
  Authenticate.verifyClient,
  AccountController.getAccount);

export default router;
