import Account from '../models/accounts';
import account from '../models/mock_data/accounts';

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

  static changeStatus(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.body;

    // eslint-disable-next-line eqeqeq
    const acct = account.find(account_ => account_.accountNumber == accountNumber);

    acct.status = status;
    res.status(200).json({
      status: res.statusCode,
      data: {
        accountNumber,
        status: req.body.status,
      },
    });
  }
}

export default AccountController;
