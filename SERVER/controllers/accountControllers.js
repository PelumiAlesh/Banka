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
   * @returns {object} Json file containing User details
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
      },
    });
  }

  /**
   * @method changeStatus
   * @description method to change user status
   * @param  {object} req - The User Request Object
   * @param  {object} res - The user Response Object
   */
  static changeStatus(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.body;

    // eslint-disable-next-line eqeqeq
    const acct = accounts.find(account_ => account_.accountNumber == accountNumber);

    acct.status = status;
    res.status(200).json({
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
    // eslint-disable-next-line eqeqeq
    const acctInfo = accounts.find((account => account.accountNumber == req.params.accountNumber));

    const index = accounts.indexOf(acctInfo) + 1;
    Account.deleteAccount(index);

    res.status(200).json({
      status: res.statusCode,
      message: 'Account Succefully deleted',
    });
  }
}

export default AccountController;
