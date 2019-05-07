import users from '../models/users';
import helper from '../helpers/helper';
import Exist from '../helpers/Exist';
/**
 * @class UserController
 * @description Controller for signup and signin
 * @exports UserController
 */
class UserController {
  /**
   * @method signUp
   * @description Method to create a user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} New user informations
   */
  static async signUp(req, res) {
    try {
      const response = await users.signUp(req.body);
      const user = response.rows[0];
      const token = helper.generateToken(user);
      return res.status(201).json({
        status: res.statusCode,
        data: [{
          token,
          ...user,
        }],
      });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(409).json({
          status: res.statusCode,
          error: 'Email is been used by another user',
        });
      }
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  /**
   * @method signIn
   * @description Method to sign in a user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} User informations
   */
  static async signIn(req, res) {
    const { email, password } = req.body;
    const response = await Exist.emailExist(email);

    if (response.rowCount < 1 || !helper.verifyPassword(password, response.rows[0].password)) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Authentication Failed: Email or Password is incorrect',
      });
    }
    const user = { ...response.rows[0] };
    const token = helper.generateToken(user);

    return res.status(200).json({
      status: 200,
      data: [{
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type,
        isAdmin: user.isAdmin,
      }],
    });
  }

  /**
   * @method createUser
   * @description Method to create a staff/admin user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} New user informations
   */
  static async createUser(req, res) {
    try {
      const response = await users.createUser(req.body, res);
      const user = response.rows[0];
      const token = helper.generateToken(user);
      return res.status(201).json({
        status: res.statusCode,
        data: [{
          token,
          ...user,
        }],
      });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(409).json({
          status: res.statusCode,
          error: 'Email is been used by another user',
        });
      }
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }
}

export default UserController;
