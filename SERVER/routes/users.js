import express from 'express';
import bodyParser from 'body-parser';
import InputValidator from '../middlewares/inputValidation';
import UserController from '../controllers/userControllers';

const router = express.Router();
router.use(bodyParser.json());

router.post('/signup', InputValidator.signup, UserController.signUp);
router.post('/signin', InputValidator.signin, UserController.signIn);

export default router;
