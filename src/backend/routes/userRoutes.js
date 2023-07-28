const express = require('express');
const userRouter = express.Router();
const { signup, login, deleteProfile } = require('../controllers/userController')

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.delete('/deleteProfile', deleteProfile);

module.exports = userRouter;
