import 'dotenv/config';
import '@babel/polyfill';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.TEST_ENV ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
});

export default {
  /**
   * DB Query
   * @param {string} text
   * @param {object} params
   * @returns {promise} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
