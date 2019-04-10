import users from '../models/mock_data/users';
/**
 * @function emailExist
 * @param {string} email - user email
 * @param {boolean} returnUser -Boolean to confirm if user should be returned or not
 */
export default function emailExist(email, returnUser) {
  let emailExists = false;
  let userDetails;
  users.forEach((user) => {
    if (user.email === email) {
      userDetails = user;
      emailExists = true;
    }
  });
  if (returnUser) {
    return { userDetails, emailExists };
  }
  return emailExists;
}
