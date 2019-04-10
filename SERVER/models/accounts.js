import accounts from './mock_data/accounts';
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
    const accountDetails = {
      id: accounts.length + 1,
      accountNumber: helper.generateAccountNumber(),
      createdOn: new Date(),
      owner: req.user.id,
      type: data.type,
      status: 'active',
      balance: parseFloat(data.initialDeposit, 10),
    };

    accounts.push(accountDetails);
    return accountDetails;
  }
}

export default Account;
