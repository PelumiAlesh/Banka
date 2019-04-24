import db from '../models/migrations/db';

class Exist {
  /**
 * @function emailExist
 * @param {string} email - user email
 * @param {boolean} returnUser -Boolean to confirm if user should be returned or not
 */
  static emailExist(email) {
    const queryText = `SELECT * FROM users WHERE email=$1;`;
    const response = db.query(queryText, [email]);
    return response;
  }
}

export default Exist;
