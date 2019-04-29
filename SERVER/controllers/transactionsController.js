import Transactions from '../models/transactions';
import notificationEmail from '../helpers/emailNotification';


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
      const email = await Transactions.getEmail(req.params.accountNumber);

      await notificationEmail.alert(email, 'credit', transactionDetails, req);
      return res.status(201).json({
        status: res.statusCode,
        data: [{
          transactionId: transactionDetails.id,
          accountNumber: transactionDetails.accountNumber,
          amount: transactionDetails.amount,
          cashier: transactionDetails.cashier,
          transactionType: transactionDetails.type,
          oldBalance: transactionDetails.oldBalance,
          accountBalance: transactionDetails.newBalance,
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
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
      const email = await Transactions.getEmail(req.params.accountNumber);

      await notificationEmail.alert(email, 'debit', transactionDetails, req);
      return res.status(201).json({
        status: res.statusCode,
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
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  static async getTransactions(req, res) {
    try {
      const response = await Transactions.getTransaction(req);
      const acctDetails = await response.rows[0];

      if (!acctDetails) {
        return res.status(404).json({
          status: res.statusCode,
          error: `You do not have any transactions with id ${req.params.id}`,
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        data: acctDetails,
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }
}

export default TransactionController;
