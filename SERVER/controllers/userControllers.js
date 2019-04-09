import users from '../models/users';
import helper from '../helpers/helper';
import exist from '../helpers/emailExist';

class UserController {
  static signUp(req, res) {
    const userInput = { ...req.body };
    const emailExist = exist(userInput.email, false);
    if (emailExist) {
      return res.status(409).json({
        status: 409,
        error: 'Email already exist!',
      });
    }
    const newUser = users.create(userInput);
    const token = helper.generateToken({ email: userInput.email, id: userInput.id });
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
}

export default UserController;
