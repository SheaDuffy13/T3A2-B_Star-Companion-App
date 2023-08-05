const express = require('express');
const userRouter = express.Router();
const { verifyToken } = require('../utils/auth');
const { signup, login, deleteProfile } = require('../controllers/userController')

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.delete('/deleteProfile', verifyToken, deleteProfile);

module.exports = userRouter;
