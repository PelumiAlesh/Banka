import express from 'express';
import bodyParser from 'body-parser';
import Authenticate from '../middlewares/auth';
import AccountController from '../controllers/accountControllers';
import inputValidator from '../middlewares/inputValidation';

const router = express.Router();
router.use(bodyParser.json());

router.post('/', inputValidator.creatAccount, Authenticate.verifyClient, AccountController.createAccount);

export default router;
