import express from 'express';
import bodyParser from 'body-parser';
import Authenticate from '../middlewares/auth';
import InputValidator from '../middlewares/inputValidation';
import UserController from '../controllers/userControllers';
import AccountController from '../controllers/accountControllers';

const router = express.Router();
router.use(bodyParser.json());

router.get('/:email/accounts',
  Authenticate.verifyStaff,
  AccountController.getAllAccountsOwnedByUser);

// Admin create user
router.post('/create',
  Authenticate.verifyAdmin,
  InputValidator.createUser,
  UserController.createUser);

export default router;
