import db from './migrations/db';
import helper from '../helpers/helper';
import queries from './migrations/queries';

const { signUpQuery, createAccountQuery } = queries;
/**
 * @class User
 * @description Contains methods for creating and login user
 */
class User {
  /**
   * @param  {object} data - Fields client inputed
   * @method signUp()
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

  /**
   * @param  {object} data - Fields client inputed
   * @method createUser()
   * @returns {object} New User informations
   */
  static async createUser(data) {
    const {
      firstName, lastName, email, password, isAdmin,
    } = data;

    const hashedPassword = helper.hashPassword(password);
    const values = [firstName, lastName, email, hashedPassword, 'staff', isAdmin];
    const response = await db.query(createAccountQuery, values);
    return response;
  }
}

export default User;
