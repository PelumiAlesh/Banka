import express from 'express';
import bodyParser from 'body-parser';
import env from '../config';

// -----Routes-------
import userRoute from './routes/users';
// import accountsRoutes from './routes/accounts';
// import transactionRoutes from './routes/transactions';

const { PORT } = env;
const app = express();
app.use(bodyParser.json());

const port = PORT || 5000;
// -------Redirect all api endpoint to version 1---------
app.get('/api', (req, res) => res.status(301).redirect('/api/v1'));

app.use('/api/v1/auth', userRoute);
// app.use('/api/v1/accounts', accountsRoutes);
// app.use('/api/v1/transactions', transactionRoutes);

app.get('/api/v1', (req, res) => {
  res.json({
    status: res.sendStatus,
    message: 'Welcome to Version 1 of Banka Api...',
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Endpoint not found, Please check your url again...',
  });
});


app.listen(port || 5000, () => {
  console.log(`server listening on port ${port}...`);
});

export default app;
