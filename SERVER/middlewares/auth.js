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

  static verifyStaff(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = helper.verifyToken(token);

      req.user = decoded;

      if (req.user.type !== 'staff') {
        return res.status(403).send({
          status: res.statusCode,
          error: 'You are not authorized to view this endpoint',
        });
      }

      return next();
    } catch (error) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Authentication Failed',
      });
    }
  }
}

export default AuthenticateUser;
