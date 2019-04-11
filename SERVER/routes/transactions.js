import express from 'express';
import bodyParser from 'body-parser';
import Authenticate from '../middlewares/auth';
import inputValidator from '../middlewares/inputValidation';
import transactionController from '../controllers/transactionsController';

const router = express.Router();
router.use(bodyParser.json());

router.post('/:accountNumber/credit',
  Authenticate.verifyStaff,
  inputValidator.validateAccountURL,
  inputValidator.validateAmount,
  transactionController.credit);

router.post('/:accountNumber/debit',
  Authenticate.verifyStaff,
  inputValidator.validateAccountURL,
  inputValidator.validateAmount,
  transactionController.debit);

export default router;
