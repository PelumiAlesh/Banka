import moment from 'moment';
import db from './migrations/db';
import helper from '../helpers/helper';

/**
 * @exports Account
 * @class Account
 * @description A class for making request to accounts: Create , change status etc..
 */
class Account {
  /**
   * @method CreateAccount
   * @description Method for creating account
   * @param  {object} data - The request Body
   * @param  {object} req - The payload from verfiy token
   * @returns {pbject} The new account Details
   */
  static async createAccount(data, req) {
    const queryText = `INSERT INTO accounts (owner, accountnumber, createdon, type, status, balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const accountNumber = helper.generateAccountNumber();
    const balance = parseFloat(data.initialDeposit, 10);
    const values = [req.user.id, accountNumber, moment(new Date()), data.type, 'active', balance];
    const response = await db.query(queryText, values);
    return response;
  }

  static async updateStatus(accountNumber, status) {
    const queryText = `UPDATE accounts SET status=$1 WHERE accountnumber=$2 RETURNING *;`;
    const response = await db.query(queryText, [status, accountNumber]);
    return response;
  }

  /**
   * @method checkAccount
   * @description Checks and return account details if account is found
   * @param {string} acctNo - Account number to be checked in accounts database
   * @returns {object} Account details if found
   */
  static checkAccount(acctNo) {
    const queryText = `SELECT * FROM accounts WHERE accountnumber=$1;`;
    const response = db.query(queryText, [acctNo]);
    return response;
  }

  /**
   * @param  {Number} sliceStart - A number specifying the slicing index.
   * @method deleteAccount
   * @description  - Method to delete an account
   * @returns {object} Account details
   */
  static deleteAccount(accountNumber) {
    const query = 'DELETE FROM accounts WHERE accountnumber = $1';
    const response = db.query(query, [accountNumber]);
    return response;
  }
}

export default Account;
