import dotenv from 'dotenv';
import { Pool } from 'pg';
import createTableQuery from './createTables';
import dropTableQuery from './dropTables';
import seed from './seeds';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABSE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const alterTable = (query) => {
  pool.query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
  * @method createTables
  * @description Creates all the required tables
  * @param {empty} none- Takes no parameters
  * @returns {promise} a promise
  */
const createTables = alterTable(createTableQuery);

/**
  * @method dropTables
  * @description Drops all created tables
  * @param {empty} none - Takes no parameters
  * @returns {promise} a promise
  */
const dropTables = alterTable(dropTableQuery);

/**
  * @method seedTables
  * @description Populates the created tables
  * @param {empty} none - Takes no parameters
  * @returns {promise} a promise
  */
const seedTables = alterTable(seed);

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
  seedTables,
};

require('make-runnable');
