/* eslint-disable quotes */
export default {

  signUpQuery: `INSERT INTO users ("firstName", "lastName", email, password) VALUES ($1, $2, $3, $4) RETURNING id, "firstName", "lastName", email, type, "isAdmin";`,

  createAccountQuery: `INSERT INTO users ("firstName", "lastName", email, password, type, "isAdmin") VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, "firstName", "lastName", email, type, "isAdmin";`,

  getTransactions: `
  SELECT transactions.id AS transactionsID, transactions."createdOn" AS "createdOn", transactions.type AS type, transactions."accountNumber" AS "accountNumber", amount::FLOAT, "oldBalance"::FLOAT, "newBalance"::FLOAT
  FROM transactions
  JOIN accounts ON transactions."accountNumber" = accounts."accountNumber"
  WHERE transactions.id = $1 AND accounts.owner = $2;
  `,

  updateAccount: 'UPDATE accounts SET balance = $1 WHERE "accountNumber" = $2 RETURNING *;',

  insertTransactions: `
  INSERT INTO transactions ("createdOn", type, "accountNumber", cashier, amount, "oldBalance", "newBalance") 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, "accountNumber", amount::FLOAT, cashier, type, "oldBalance"::FLOAT, "newBalance"::FLOAT;
       ;`,
  insertAccount: `INSERT INTO accounts (owner, "accountNumber", "createdOn", type, status, balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING "accountNumber"::FLOAT, type, balance::FLOAT;`,

  updateStatus: `UPDATE accounts SET status=$1 WHERE "accountNumber"=$2 RETURNING "accountNumber"::FLOAT, status;`,

  checkAccount: `SELECT "createdOn", "accountNumber"::FLOAT, status, type, balance::FLOAT, owner, id  FROM accounts WHERE "accountNumber"=$1;`,

  getTransHis: `SELECT id, "createdOn", type, "accountNumber" AS "accountNumber", cashier, amount::FLOAT, "oldBalance"::FLOAT AS "oldBalance", "newBalance"::FLOAT AS "newBalance" FROM transactions WHERE "accountNumber" = $1;`,
  deleteAccount: `DELETE FROM accounts WHERE "accountNumber" = $1;`,
  getAllAccountUser: `SELECT id FROM users WHERE email = $1;`,
  selectAccounts: 'SELECT id, "accountNumber"::FLOAT, "createdOn", type, status, balance::FLOAT FROM accounts WHERE owner = $1;',
  getAllAccount: `SELECT accounts."createdOn", accounts."accountNumber"::FLOAT,
  users.email AS "ownerEmail", accounts.type, accounts.status, accounts.balance::FLOAT
  FROM accounts
  JOIN users ON accounts."owner" = users.id;`,
  getByStatus: `
  SELECT accounts."createdOn", accounts."accountNumber"::FLOAT,
  users.email AS "ownerEmail", accounts.type, accounts.status, accounts.balance::FLOAT
  FROM accounts
  JOIN users ON accounts.owner = users.id
  WHERE accounts.status = $1;`,
  getuserid: 'SELECT users.id FROM users JOIN accounts ON accounts.owner = users.id WHERE accounts."accountNumber" = $1;',
  getEmail: `SELECT email FROM users JOIN accounts ON users.id = accounts.owner WHERE "accountNumber"= $1;`,
};
