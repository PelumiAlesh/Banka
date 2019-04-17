import express from 'express';
import bodyParser from 'body-parser';
import Authenticate from '../middlewares/auth';
import AccountController from '../controllers/accountControllers';
import InputValidator from '../middlewares/inputValidation';

const router = express.Router();
router.use(bodyParser.json());

// Create new account
router.post('/', InputValidator.creatAccount, Authenticate.verifyClient, AccountController.createAccount);

// Activate or Deactivate Account
router.patch('/:accountNumber', InputValidator.changeAccountStatus, Authenticate.verifyStaff, AccountController.changeStatus);

// Delete an Account
router.delete('/:accountNumber', InputValidator.deleteAccount, Authenticate.verifyStaff, AccountController.deleteAccount);
export default router;
