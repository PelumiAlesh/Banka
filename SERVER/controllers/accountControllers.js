import Account from '../models/accounts';
import db from '../models/migrations/db';
import queries from '../models/migrations/queries';

const { getuserid } = queries;

/**
 * @class AccountController
 * @description class to create, change status, debit && credit an account.
 * @exports Accountcontroller
 */
class AccountController {
  /**
   * @method createAccount
   * @description Create a new account
   * @param {object} req - The user Request Object
   * @param {object} res - The user Response Object
   * @returns {object} API RESPONSE IN JSON FORMAT
   */
  static async createAccount(req, res) {
    try {
      const { rows } = await Account.createAccount(req.body, req);
      return res.status(201).json({
        status: res.statusCode,
        data: [{
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          accountNumber: rows[0].accountNumber,
          type: rows[0].type,
          openingBalance: rows[0].balance,
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
   * @method changeStatus
   * @description method to change user status
   * @param  {object} req - The User Request Object
   * @param  {object} res - The user Response Object
   * @returns {object} API RESPONSE IN JSON FORMAT
   */
  static async changeStatus(req, res) {
    try {
      const { accountNumber } = req.params;
      const { status } = req.body;

      const response = await Account.updateStatus(accountNumber, status);
      const acctDetails = response.rows[0];
      return res.status(200).json({
        status: res.statusCode,
        data: [{
          accountNumber: acctDetails.accountNumber,
          status: acctDetails.status,
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
   * @method deleteAccount
   * @description Deletes the account with the given account Number
   * @param  {object} req - The User Request Object
   * @param  {object} res - The user Response Object
   */
  static async deleteAccount(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const response = await Account.deleteAccount(accountNumber);
      if (response.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: `Account with account number ${accountNumber} does not exist`,
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        message: 'Account successfully deleted',
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  /**
   * @method  getTransactionsHistory
   * @description Returns a account's transactions
   * @param  {object} req - The request body
   * @param  {object} res - The response body
   */
  static async getTransactionsHistory(req, res) {
    try {
      const response = await Account.getTransactionsHistory(req.params.accountNumber);
      const { rows } = await db.query(getuserid, [req.params.accountNumber]);
      if (rows[0].id !== req.user.id) {
        return res.status(403).json({
          status: res.statusCode,
          error: 'You don\'t have access to view this account',
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        data: response.rows,
      });
    } catch (error) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'History is empty',
      });
    }
  }

  /**
   * @method getAllAccountsOwnedByUser
   * @description returns the JSON response
   * @param  {object} req - The Request object
   * @param  {object} res - the Response body
   */
  static async getAllAccountsOwnedByUser(req, res) {
    try {
      const { rows } = await Account.getAllAccountsOwnedByUser(req, res);
      if (!rows[0]) {
        return res.status(200).json({
          status: 200,
          accounts: 'This user currently has no account',
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        accounts: rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error,
      });
    }
  }

  /**
   * @method getAccount
   * @description get a account with the the given accountNumber
   * @param  {object} req - The request body
   * @param  {object} res - The response body
   */
  static async getAccount(req, res) {
    try {
      const response = await Account.getAccount(req.params.accountNumber);
      if (response.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'Account number does not exist, please check and try again',
        });
      }
      const resRows = response.rows[0];
      const query = 'SELECT email, id FROM users WHERE id = $1;';
      const { id } = resRows;
      const { rows } = await db.query(query, [id]);
      if (resRows.owner !== req.user.id) {
        return res.status(403).json({
          status: res.statusCode,
          error: 'You are not authorized to view this account\'s details',
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        data: [{
          createdOn: resRows.createdOn,
          accountNumber: resRows.accountNumber,
          ownerEmail: rows[0].email,
          type: resRows.type,
          status: resRows.status,
          balance: resRows.balance,
        }],
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status: res.statusCode,
        error,
      });
    }
  }

  static async getAllAccount(req, res) {
    try {
      const isQuery = Object.keys(req.query).length === 0;
      if (!isQuery) {
        const { status } = req.query;
        if (!status) {
          return res.status(401).json({
            status: res.statusCode,
            error: 'query does not exist, use "status" ',
          });
        }
        if (status !== 'dormant' && status !== 'active' && status !== 'draft') {
          return res.status(401).json({
            status: res.statusCode,
            error: 'status can only be "dormant" or "active" ',
          });
        }
        const { rows } = await Account.getByStatus(req.query.status);
        return res.status(200).json({
          status: res.statusCode,
          data: rows,
        });
      }
      const { rows } = await Account.getAllAccount();
      return res.status(200).json({
        status: res.statusCode,
        data: rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.message,
      });
    }
  }
}

export default AccountController;
