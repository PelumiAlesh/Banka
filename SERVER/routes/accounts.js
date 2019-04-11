import express from 'express';
import bodyParser from 'body-parser';
import Authenticate from '../middlewares/auth';
import AccountController from '../controllers/accountControllers';
import InputValidator from '../middlewares/inputValidation';

const router = express.Router();
router.use(bodyParser.json());

router.post('/', InputValidator.creatAccount, Authenticate.verifyClient, AccountController.createAccount);

router.patch('/:accountNumber', InputValidator.changeAccountStatus, AccountController.changeStatus);

router.delete('/:accountNumber', InputValidator.deleteAccount, AccountController.deleteAccount);
export default router;
