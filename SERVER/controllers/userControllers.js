import users from '../models/users';
import helper from '../helpers/helper';
import exist from '../helpers/emailExist';

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
    const emailExist = exist(userInput.email, false);
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

  static signIn(req, res) {
    const userInput = { ...req.body };
    const { userDetails, emailExists } = exist(userInput.email, true);
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
