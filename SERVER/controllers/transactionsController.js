import Transactions from '../models/transactions';

class TransactionController {
  /**
  * @method credit
  * @description Credits a user's bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} API Response
  */
  static credit(req, res) {
    const transactionDetails = Transactions.transact(req, res, 'credit');

    return res.status(201).json({
      status: res.stausCode,
      data: {
        transactionId: transactionDetails.id,
        accountNumber: transactionDetails.accountNumber,
        amount: transactionDetails.amount,
        cashier: transactionDetails.cashier,
        transactionType: transactionDetails.type,
        accountBalance: transactionDetails.newBalance,
      },
    });
  }

  /**
  * @method Debit
  * @description Debits a user's bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} API Response
  */
  static debit(req, res) {
    const transactionDetails = Transactions.transact(req, res, 'debit');

    return res.status(201).json({
      status: res.stausCode,
      data: {
        transactionId: transactionDetails.id,
        accountNumber: transactionDetails.accountNumber,
        amount: transactionDetails.amount,
        cashier: transactionDetails.cashier,
        transactionType: transactionDetails.type,
        accountBalance: transactionDetails.newBalance,
      },
    });
  }
}

export default TransactionController;
