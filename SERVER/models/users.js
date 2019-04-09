import users from './mock_data/users';
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
  static create(data) {
    const newUser = {
      id: users.length + 1,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: helper.hashPassword(data.password),
      type: 'client',
    };
    users.push(newUser);
    return newUser;
  }
}

export default User;
