import moment from 'moment';
import db from './migrations/db';
import helper from '../helpers/helper';
import queries from './migrations/queries';

const {
  insertAccount,
  updateStatus,
  checkAccount,
  getTransHis,
  deleteAccount,
  getAllAccountUser,
  selectAccounts,
  getAllAccount,
  getByStatus,
} = queries;

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
    const accountNumber = helper.generateAccountNumber();
    const balance = parseFloat(data.initialDeposit, 10);
    const values = [req.user.id, accountNumber, moment(new Date()), data.type, 'active', balance];
    const response = await db.query(insertAccount, values);
    return response;
  }

  static async updateStatus(accountNumber, status) {
    const response = await db.query(updateStatus, [status, accountNumber]);
    return response;
  }

  /**
   * @method checkAccount
   * @description Checks and return account details if account is found
   * @param {string} acctNo - Account number to be checked in accounts database
   * @returns {object} Account details if found
   */
  static checkAccount(acctNo) {
    const response = db.query(checkAccount, [acctNo]);
    return response;
  }

  /**
   * @param  {Number} accountNumber - The account number
   * @method deleteAccount
   * @description  - Method to delete an account
   * @returns {object} Account details
   */
  static deleteAccount(accountNumber) {
    const response = db.query(deleteAccount, [accountNumber]);
    return response;
  }

  /**
   * @param  {Number} accountNumber - The account number
   * @method getTransactionsHistory
   * @description  - Method to get account transaction history
   * @returns {object} Account details
   */
  static getTransactionsHistory(accountNumber) {
    const response = db.query(getTransHis, [accountNumber]);
    return response;
  }

  /**
   * @method getAllAccountsOwnedByUser
   * @description get all the accounts owned by a user
   * @param  {object} req -  The Request body
   * @param  {object} res - The Response body
   * @returns {object} API JSON response
   */
  static getAllAccountsOwnedByUser(req, res) {
    const { email } = req.params;
    const { rows } = db.query(getAllAccountUser, [email]);
    if (!rows[0]) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Email does not exist, check the url email again',
      });
    }
    const { id } = rows[0];
    const response = db.query(selectAccounts, [id]);
    return response;
  }

  /**
   * @method getAccount
   * @param  {number} accountNumber - Account Number to be searched
   * @returns {object} API JSON Response
   */
  static getAccount(accountNumber) {
    const response = db.query(checkAccount, [accountNumber]);
    return response;
  }

  /**
   * @method getAllAccount
   * @returns {object} API JSON Response
   */
  static getAllAccount() {
    const response = db.query(getAllAccount);
    return response;
  }

  /**
  * @method getByStatus
  * @description Returns all accounts based on the given status
  * @param {string} status - a string
  * @returns {object} the account details
  */
  static getByStatus(status) {
    const response = db.query(getByStatus, [status]);
    return response;
  }
}

export default Account;
