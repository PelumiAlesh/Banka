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
  static signUp(req, res) {
    const userInput = { ...req.body };
    const emailExist = Exist.emailExist(userInput.email, false);
    if (emailExist) {
      return res.status(409).json({
        status: res.statusCode,
        error: 'Email already exist!',
      });
    }
    const newUser = users.create(userInput);
    const token = helper.generateToken({ email: userInput.email, id: newUser.id });
    return res.status(201).json({
      status: 201,
      data: {
        token,
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  }

  /**
   * @method signIn
   * @description Method to sign in a user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} User informations
   */
  static signIn(req, res) {
    const userInput = { ...req.body };
    const { userDetails, emailExists } = Exist.emailExist(userInput.email, true);
    if (!emailExists || !helper.verifyPassword(userInput.password, userDetails.password)) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Authentication Failed: Email or Password is incorrect',
      });
    }
    const token = helper.generateToken({
      email: userDetails.email,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      id: userDetails.id,
      type: userDetails.type,
    });
    return res.status(201).json({
      status: res.statusCode,
      data: {
        token,
        id: userDetails.id,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
      },
    });
  }
}

export default UserController;
