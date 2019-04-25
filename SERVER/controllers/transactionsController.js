import Transactions from '../models/transactions';

class TransactionController {
  /**
  * @method credit
  * @description Credits a user's bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} API Response
  */
  static async credit(req, res) {
    try {
      const response = await Transactions.transact(req, res, 'credit');
      const transactionDetails = response.rows[0];
      return res.status(201).json({
        status: res.stausCode,
        data: [{
          transactionId: transactionDetails.id,
          accountNumber: transactionDetails.accountnumber,
          amount: transactionDetails.amount,
          cashier: transactionDetails.cashier,
          transactionType: transactionDetails.type,
          oldBalance: transactionDetails.oldBalance,
          accountBalance: transactionDetails.newbalance,
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: res.stausCode,
        error: error.detail,
      });
    }
  }

  /**
  * @method Debit
  * @description Debits a user's bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} API Response
  */
  static async debit(req, res) {
    try {
      const response = await Transactions.transact(req, res, 'debit');
      const transactionDetails = response.rows[0];
      return res.status(201).json({
        status: res.stausCode,
        data: [{
          transactionId: transactionDetails.id,
          accountNumber: transactionDetails.accountnumber,
          amount: transactionDetails.amount,
          cashier: transactionDetails.cashier,
          transactionType: transactionDetails.type,
          oldBalance: transactionDetails.oldBalance,
          accountBalance: transactionDetails.newbalance,
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: res.stausCode,
        error: error.detail,
      });
    }
  }
}

export default TransactionController;
