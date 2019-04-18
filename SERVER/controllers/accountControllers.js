import Account from '../models/accounts';
import accounts from '../models/mock_data/accounts';

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
  static createAccount(req, res) {
    const newAccount = Account.createAccount(req.body, req);
    return res.status(201).json({
      status: res.statusCode,
      data: {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        accountNumber: newAccount.accountNumber,
        type: newAccount.type,
        initialDeposit: newAccount.initialDeposit,
      },
    });
  }

  /**
   * @method changeStatus
   * @description method to change user status
   * @param  {object} req - The User Request Object
   * @param  {object} res - The user Response Object
   * @returns {object} API RESPONSE IN JSON FORMAT
   */
  static changeStatus(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.body;

    const acct = Account.checkAccount(req.params.accountNumber);

    acct.status = status;
    return res.status(200).json({
      status: res.statusCode,
      data: {
        accountNumber,
        status: req.body.status,
      },
    });
  }

  /**
   * @method deleteAccount
   * @description Deletes the account with the given account Number
   * @param  {object} req - The User Request Object
   * @param  {object} res - The user Response Object
   */
  static deleteAccount(req, res) {
    const acctInfo = Account.checkAccount(req.params.accountNumber);

    const index = accounts.indexOf(acctInfo) + 1;
    Account.deleteAccount(index);

    res.status(200).json({
      status: res.statusCode,
      message: 'Account Succefully deleted',
    });
  }
}

export default AccountController;
