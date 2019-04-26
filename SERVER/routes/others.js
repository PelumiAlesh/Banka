import express from 'express';
import bodyParser from 'body-parser';
import Authenticate from '../middlewares/auth';
import AccountController from '../controllers/accountControllers';

const router = express.Router();
router.use(bodyParser.json());

router.get('/:email/accounts',
  Authenticate.verifyStaff,
  AccountController.getAllAccountsOwnedByUser);

export default router;
