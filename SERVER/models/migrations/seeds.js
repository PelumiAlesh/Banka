import moment from 'moment';
import helper from '../../helpers/helper';
import dbQuery from './dbindex';

const seedsQueries = `
    INSERT INTO users (email, "firstName", "lastName", password)
    VALUES ('pels@gmail.com', 'pelumi', 'alesh', '${helper.hashPassword('password')}'),
           ('pels1@gmail.com', 'pelumi1', 'alesh', '${helper.hashPassword('password')}'),
           ('pels2@gmail.com', 'pelumi2', 'alesh', '${helper.hashPassword('password')}'),
           ('pels3@gmail.com', 'pelumi3', 'alesh', '${helper.hashPassword('password')}');

    INSERT INTO users(email, "firstName", "lastName", password, type, "isAdmin")
    VALUES ('ayo@gmail.com', 'ayo', 'alesh', '${helper.hashPassword('password')}', 'staff', false),
           ('luk@gmail.com', 'luk', 'alesh', '${helper.hashPassword('password')}', 'staff', true);

    INSERT INTO accounts(owner, "accountNumber", "createdOn", type, status, balance)
    VALUES  (1, 1234567898, '${moment(new Date())}', 'savings', 'active', 40000.14),
            (2, 1234565434, '${moment(new Date())}', 'current', 'active', 200001.36),
            (3, 1234321234, '${moment(new Date())}', 'savings', 'dormant', 0.34),
            (4, 1321234948, '${moment(new Date())}', 'current', 'dormant', 0.12);

    INSERT INTO transactions("createdOn", type, "accountNumber", cashier, amount, "oldBalance", "newBalance")
    VALUES ('${moment(new Date())}', 'debit', 1234567898, 5, 2000.00, 40000.19, 38000.19),
           ('${moment(new Date())}', 'credit', 1234567898, 5, 2000.00, 38000.19, 40000.19),
           ('${moment(new Date())}', 'credit', 1234565434, 5, 10000.00, 200001.39, 210001.39),
           ('${moment(new Date())}', 'debit', 1234565434, 5, 2000.00, 210001.39, 200001.39);
`;
dbQuery(seedsQueries);
