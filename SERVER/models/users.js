import db from './migrations/db';
import helper from '../helpers/helper';
import queries from './migrations/queries';

const { signUpQuery } = queries;
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
    const {
      firstName, lastName, email, password,
    } = data;

    const hashedPassword = helper.hashPassword(password);
    const values = [firstName, lastName, email, hashedPassword];
    const response = await db.query(signUpQuery, values);
    return response;
  }
}

export default User;
