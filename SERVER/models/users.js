import db from './migrations/db';
import helper from '../helpers/helper';

/**
 * @class User
 * @description Contains methods for creating and login user
 */
class User {
  /**
   * @param  {object} data - Fields client inputed
   * @method create()
   * @returns {object} New User informations
   */
  static async signUp(data) {
    const queryText = `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *;`;
    const {
      firstName, lastName, email, password,
    } = data;

    const hashedPassword = helper.hashPassword(password);
    const values = [firstName, lastName, email, hashedPassword];
    const response = await db.query(queryText, values);
    return response;
  }
}

export default User;
