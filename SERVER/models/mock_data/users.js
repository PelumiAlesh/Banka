import helper from '../../helpers/helper';

const users = [
  {
    id: 1,
    firstName: 'Pelumi',
    lastName: 'Aleshinloye',
    email: 'pels@gmail.com',
    password: helper.hashPassword('password'),
    type: 'client',
  },
  {
    id: 2,
    firstName: 'Ayomide',
    lastName: 'Aleshinloye',
    email: 'ayo@gmail.com',
    password: helper.hashPassword('password'),
    type: 'staff',
    isAdmin: true,
  },
  {
    id: 3,
    firstName: 'Babatunde',
    lastName: 'Aleshinloye',
    email: 'Babs@gmail.com',
    password: helper.hashPassword('password'),
    type: 'staff',
    isAdmin: false,
  },
];

export default users;
