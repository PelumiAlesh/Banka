import express from 'express';
import bodyParser from 'body-parser';
import Authenticate from '../middlewares/auth';
import inputValidator from '../middlewares/inputValidation';
import transactionController from '../controllers/transactionsController';

const router = express.Router();
router.use(bodyParser.json());

// Credit an account
router.post('/:accountNumber/credit',
  Authenticate.verifyCashier,
  inputValidator.validateAccountURL,
  inputValidator.validateAmount,
  transactionController.credit);

// Debit an account
router.post('/:accountNumber/debit',
  Authenticate.verifyCashier,
  inputValidator.validateAccountURL,
  inputValidator.validateAmount,
  transactionController.debit);

// Get a specific transaction
router.get('/:id',
  Authenticate.verifyClient,
  transactionController.getTransactions);

export default router;
