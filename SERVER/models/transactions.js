import transactions from './mock_data/transactions';
import Account from './accounts';

/**
 * @class Transactions
 * @description Make debit or credit transaction on an account
 * @exports Transaction
 */
class Transactions {
  /**
   * @method transact
   * @description Make debit or credit transaction on an account
   * @param {object} req - The staff request Object
   * @param {object} res - The ReSPONSE Object
   * @param {string} type - Credit or Debit
   * @returns {object} Transaction details
   */
  static transact(req, res, type) {
    const acctDetail = Account.checkAccount(req.params.accountNumber);
    const transaction = {
      id: transactions.length + 1,
      createdOn: new Date(),
      type,
      accountNumber: parseInt(req.params.accountNumber, 10),
      cashier: req.user.id,
      amount: parseFloat(req.body.amount),
      oldBalance: acctDetail.balance,
      newBalance: type === 'credit' ? parseFloat((acctDetail
        .balance + parseFloat(req.body.amount))
        .toFixed(2)) : parseFloat((acctDetail
        .balance - parseFloat(req.body.amount)).toFixed(2)),
    };

    acctDetail.balance = transaction.newBalance;
    transactions.push(transaction);

    return transaction;
  }
}


export default Transactions;
