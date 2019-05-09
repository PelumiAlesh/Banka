import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltrounds = parseInt(process.env.SALT_ROUNDS, 10);
/**
 * @class Helper
 * @description Contains method for hasing password and genrating tokens
 * @export Auth
 */
class Helper {
  /**
   * @method hashPassword
   * @description Helps to hash the user password
   * @param  {string} password - Plain password to be hashed
   * @returns {string} The hashed password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, saltrounds);
  }

  /**
   * @method verifyPassword
   * @description Helps to compare the hashed password and plain Password
   * @param  {string} hashedpassword - Plain password to be hashed
   * @param  {string} plainPassword - The password to be compared
   * @returns {boolean} True/False indicating if password matches or Not
   */
  static verifyPassword(unHashedPassword, hashedPassword) {
    return bcrypt.compareSync(unHashedPassword, hashedPassword);
  }

  /**
   * @method generateToken
   * @description Uses the user payload to generate a unique token
   * @param {object} payload - User payloaod for generating token
   * @returns {string} Token in form of a string
   */
  static generateToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '90000h' });
    return token;
  }

  /**
  * @method verifyToken
  * @description verifies the given token
  * @param {string} token - The token to be verified
  * @returns {object} The payload of the token
  */
  static verifyToken(token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  }

  /**
   * @method generateAccountNumber
   * @returns {string} Random account Number
   */
  static generateAccountNumber() {
    let accountNumber = Math.random().toString().slice(2, 12);
    const fDigit = accountNumber[0];
    // eslint-disable-next-line eqeqeq
    if (fDigit == 0) {
      accountNumber += 4;
      if (fDigit > 1) {
        const halfNumber = accountNumber.slice(0, -1);
        const accountNumbe = `1${halfNumber}`;
        return accountNumbe;
      }
      return accountNumber;
    }
    if (fDigit > 1) {
      const halfNumber = accountNumber.slice(0, -1);
      const accountNumbe = `1${halfNumber}`;
      return accountNumbe;
    }
    return accountNumber;
  }
}

export default Helper;
