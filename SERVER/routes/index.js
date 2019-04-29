import '@babel/polyfill';
import express from 'express';

// --------Routes--------
import userRoute from './users';
import otherRoutes from './others';
import accountsRoutes from './accounts';
import transactionRoutes from './transactions';

const route = express.Router();

route.get('/', (req, res) => res.json({
  status: 200,
  message: 'Welcome to Version 1 of Banka Api...',
}));

route.use('/auth', userRoute);
route.use('/user', otherRoutes);
route.use('/accounts', accountsRoutes);
route.use('/transactions', transactionRoutes);

export default route;
