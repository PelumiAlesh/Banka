import dbQuery from './dbindex';

const dropQueries = 'DROP TABLE IF EXISTS users, accounts, transactions CASCADE';

dbQuery(dropQueries);
