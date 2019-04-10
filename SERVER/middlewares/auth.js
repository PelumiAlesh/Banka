import helper from '../helpers/helper';

/**
 * @class AuthenticateUser
 * @description To verify user , staff and admin tokens
 * @exports AuthenticateUser
 */
class AuthenticateUser {
  /**
   * @param  {object} req - The user request object
   * @param  {object} res - The user res response object
   * @param  {function} next - The next() Function
   * @returns {object} req.user - The payload object
   */
  static verifyClient(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = helper.verifyToken(token);

      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Authentication Failed: Cant create account.',
      });
    }
  }
}

export default AuthenticateUser;
