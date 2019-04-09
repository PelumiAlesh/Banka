import express from 'express';
import bodyParser from 'body-parser';
import InputValidator from '../middlewares/inputValidation';
import UserController from '../controllers/userControllers';

const router = express.Router();
router.use(bodyParser.json());

router.post('/signup', InputValidator, UserController.signUp);
router.post('/signin', (req, res) => {
  res.send('hdflhflkhf');
});

export default router;
