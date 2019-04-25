import moment from 'moment';
import Account from './accounts';
import db from './migrations/db';

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
  static async transact(req, res, type) {
    const queryText = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2 RETURNING *;';
    const { accountNumber } = req.params;
    const accountDetails = await Account.checkAccount(accountNumber);
    const oldBalance = Number(accountDetails.rows[0].balance);
    const amount = Number(req.body.amount);

    const newBalance = type === 'credit' ? await oldBalance + amount : await oldBalance - amount;
    await db.query(queryText, [newBalance, accountNumber]);

    const insertText = `
     INSERT INTO transactions (createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) 
          VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
          `;
    const values = [moment(new Date()), type, accountNumber, req.user.id, amount, oldBalance, newBalance];
    const response = await db.query(insertText, values);

    return response;

    // const transaction = {
    //   id: transactions.length + 1,
    //   createdOn: new Date(),
    //   type,
    //   accountNumber: parseInt(req.params.accountNumber, 10),
    //   cashier: req.user.id,
    //   amount: parseFloat(req.body.amount),
    //   oldBalance: acctDetail.balance,
    //   newBalance: type === 'credit' ? parseFloat((acctDetail
    //     .balance + parseFloat(req.body.amount))
    //     .toFixed(2)) : parseFloat((acctDetail
    //     .balance - parseFloat(req.body.amount)).toFixed(2)),
    // };

    // acctDetail.balance = transaction.newBalance;
    // transactions.push(transaction);

    // return transaction;
  }
}


export default Transactions;
