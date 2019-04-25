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
   * @param  {Number} accountNumber - The account number
   * @method deleteAccount
   * @description  - Method to delete an account
   * @returns {object} Account details
   */
  static deleteAccount(accountNumber) {
    const queryText = 'DELETE FROM accounts WHERE accountnumber = $1';
    const response = db.query(queryText, [accountNumber]);
    return response;
  }

  /**
   * @param  {Number} accountNumber - The account number
   * @method getTransactionsHistory
   * @description  - Method to get account transaction history
   * @returns {object} Account details
   */
  static getTransactionsHistory(accountNumber) {
    const queryText = `SELECT * FROM transactions WHERE accountnumber = $1;`;
    const response = db.query(queryText, [accountNumber]);
    return response;
  }

  /**
   * @method getAllAccountsOwnedByUser
   * @description get all the accounts owned by a user
   * @param  {object} req -  The Request body
   * @param  {object} res - The Response body
   * @returns {object} API JSON response
   */
  static async getAllAccountsOwnedByUser(req, res) {
    const userQuery = `SELECT id FROM users WHERE email = $1;`;
    const { email } = req.params;
    const { rows } = await db.query(userQuery, [email]);
    if (!rows[0]) {
      return res.status(404).json({
        status: res.statusCode,
        error: `Email does not exist, check the url email again`,
      });
    }
    const { id } = rows[0];
    const queryText = `SELECT * FROM accounts WHERE owner = $1;`;
    const response = await db.query(queryText, [id]);
    return response;
  }

  /**
   * @method getAccount
   * @param  {number} accountNumber - Account Number to be searched
   * @returns {object} API JSON Response
   */
  static async getAccount(accountNumber) {
    const queryText = `SELECT * FROM accounts WHERE accountnumber = $1;`;
    const response = db.query(queryText, [accountNumber]);
    return response;
  }
}

export default Account;
