import express from 'express';
import bodyParser from 'body-parser';
// import userControllers from '../controllers/userControllers';
// import InputValidator from '../middlewares/inputValidation';

const router = express.Router();
router.use(bodyParser.json());

// router.post('/signup', InputValidator.signup, UserControllers.signUp);
// router.post('/signin', InputValidator.signin, userControllers.signIn);

export default router;
