/* eslint-disable quotes */
export default {

  signUpQuery: `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id, firstname, lastname, email;`,

  createAccountQuery: `INSERT INTO users (firstname, lastname, email, password, type, isAdmin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, firstname, lastname, email, type, isAdmin;`,

  getTransactions: `
  SELECT transactions.id AS transactionsID, transactions.createdon AS createdOn, transactions.type AS type, transactions.accountnumber AS accountNumber, amount, oldbalance, newbalance
  FROM transactions
  JOIN accounts ON transactions.accountnumber = accounts.accountnumber
  WHERE transactions.id = $1 AND accounts.owner = $2;
  `,

  updateAccount: 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2 RETURNING *;',

  insertTransactions: `
  INSERT INTO transactions (createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
       `,
  insertAccount: `INSERT INTO accounts (owner, accountnumber, createdon, type, status, balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,

  updateStatus: `UPDATE accounts SET status=$1 WHERE accountnumber=$2 RETURNING *;`,

  checkAccount: `SELECT * FROM accounts WHERE accountnumber=$1;`,

  getTransHis: `SELECT * FROM transactions WHERE accountnumber = $1;`,
  deleteAccount: `DELETE FROM accounts WHERE accountnumber = $1;`,
  getAllAccountUser: `SELECT id FROM users WHERE email = $1;`,
  selectAccounts: 'SELECT * FROM accounts WHERE owner = $1;',
  getAllAccount: `SELECT accounts.createdon, accounts.accountnumber,
  users.email AS owneremail, accounts.type, accounts.status, accounts.balance
  FROM accounts
  JOIN users ON accounts."owner" = users.id`,
  getByStatus: `
  SELECT accounts.createdon, accounts.accountNumber::FLOAT,
  users.email AS owneremail, accounts.type, accounts.status, accounts.balance::FLOAT
  FROM accounts
  JOIN users ON accounts.owner = users.id
  WHERE accounts.status = $1`,
  getuserid: 'SELECT users.id FROM users JOIN accounts ON accounts.owner = users.id WHERE accounts.accountnumber = $1',
};
