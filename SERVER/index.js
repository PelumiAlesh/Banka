import 'dotenv/config';
import '@babel/polyfill';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import router from './routes/index';
import swaggerDocument from './swagger.json';

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.listen(port);

// Swagger docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CORS
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// -------Redirect all api endpoint to version 1---------
app.use('/api/v1', router);

app.use('*', (req, res) => res.status(404).json({
  status: 404,
  message: 'Endpoint not found, Please check your url again...',
}));


export default app;
