import Account from '../models/accounts';

class Accountcontroller {
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
}

export default Accountcontroller;
