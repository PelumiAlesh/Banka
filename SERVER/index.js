import 'dotenv/config';
import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.listen(port);

// -------Redirect all api endpoint to version 1---------
app.use('/api/v1', router);

app.use('*', (req, res) => res.status(404).json({
  status: 404,
  message: 'Endpoint not found, Please check your url again...',
}));


export default app;
