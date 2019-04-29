import dbQuery from './dbindex';

const tablesQueries = `
  CREATE TABLE IF NOT EXISTS users(
   id SERIAL PRIMARY KEY,
   email VARCHAR(200) NOT NULL UNIQUE,
   "firstName" VARCHAR(100) NOT NULL,
   "lastName" VARCHAR(100) NOT NULL,
   password TEXT NOT NULL,
   type VARCHAR DEFAULT 'client',
   "isAdmin" BOOLEAN
  );

  CREATE TABLE IF NOT EXISTS accounts(
    id SERIAL PRIMARY KEY,
    owner INTEGER REFERENCES users(id) ON DELETE CASCADE,
    "accountNumber" BIGINT NOT NULL UNIQUE,
    "createdOn" TIMESTAMP NOT NULL,
    type VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    balance NUMERIC(20, 2) NOT NULL
    );

  CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    "createdOn" TIMESTAMP NOT NULL,
    type VARCHAR(8) NOT NULL,
    "accountNumber" INTEGER NOT NULL REFERENCES accounts("accountNumber") ON DELETE CASCADE,
    cashier INTEGER NOT NULL REFERENCES users(id),
    amount NUMERIC(20, 2) NOT NULL,
    "oldBalance" NUMERIC(20,2) NOT NULL,
    "newBalance" NUMERIC(20,2 ) NOT NULL
  );
  `;

dbQuery(tablesQueries);
