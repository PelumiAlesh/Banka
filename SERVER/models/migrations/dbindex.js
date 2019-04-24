import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.TEST_ENV ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const dbQuery = (query) => {
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

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export default dbQuery;
