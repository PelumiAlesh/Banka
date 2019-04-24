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
  static createAccount(data, req) {
    const queryText = `INSERT INTO accounts (owner, accountnumber, createdon, type, status, balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const accountNumber = helper.generateAccountNumber();
    const balance = parseFloat(data.initialDeposit, 10);
    const values = [req.user.id, accountNumber, moment(new Date()), data.type, 'active', balance];
    const response = db.query(queryText, values);
    return response;
  }

  /**
   * @method checkAccount
   * @description Checks and return account details if account is found
   * @param {string} acctNo - Account number to be checked in accounts database
   * @returns {object} Account details if found
   */
  static checkAccount(acctNo) {
    const acctDetails = accounts.find((account => account.accountNumber === parseInt(acctNo, 10)));
    return acctDetails;
  }

  // /**
  //  * @param  {Number} sliceStart - A number specifying the slicing index.
  //  * @method deleteAccount
  //  * @description  - Method to delete an account
  //  */
  // static deleteAccount(sliceStart) {
  //   accounts.slice(sliceStart, 1);
  // }
}

export default Account;
