import moment from 'moment';
import helper from '../../helpers/helper';

const seedsQueries = `
    INSERT INTO users(email, firstName, lastName, password)
    VALUES ('pels@gmail.com', 'pelumi', 'alesh', '${helper.hashPassword('password')}'),
           ('pels1@gmail.com', 'pelumi1', 'alesh', '${helper.hashPassword('password')}'),
           ('pels2@gmail.com', 'pelumi2', 'alesh', '${helper.hashPassword('password')}'),
           ('pels3@gmail.com', 'pelumi3', 'alesh', '${helper.hashPassword('password')}');

    INSERT INTO users(email, firstName, lastName, password, type, isAdmin)
    VALUES ('ayo@gmail.com', 'ayo', 'alesh', '${helper.hashPassword('password')}', 'staff', false),
    VALUES ('luk@gmail.com', 'luk', 'alesh', '${helper.hashPassword('password')}', 'staff', true)

    INSERT INTO accounts(owner, accountNumber, createdOn, type, status, balance)
    VALUES  (2, 1234567898, '${moment(new Date())}', 'savings', 'active', 40000.10),
            (1, 1234565434, '${moment(new Date())}', 'current', 'active', 200001.30),
            (3, 1234321234, '${moment(new Date())}', 'savings', 'dormant', 0.00),
            (4, 3321234948, '${moment(new Date())}', 'current', 'dormant', 0.00);

    INSERT INTO transactions(createdOn, type, accountNumber, cashier, amount, oldBalance, newBalance)
    VALUES ('${moment(new Date())}', 'debit', 1234567898, 5, 2000.00, 40000.10, 38000.10),
           ('${moment(new Date())}', 'credit', 1234567898, 5, 2000.00, 38000.10, 40000.10),
           ('${moment(new Date())}', 'credit', 1234565434, 5, 10000.00, 200001.30, 210001.30),
           ('${moment(new Date())}', 'debit', 1234565434, 5, 2000.00, 210001.30, 200001.30);
`;
export default seedsQueries;
