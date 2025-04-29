import express from 'express';
import { getUserInfo, login, logout, signup, updateProfile } from '../controllers/authController.js';
import { verifyUserToken } from '../middlewares/authUserMiddleware.js';
const router = express.Router();
router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.put('/update-profile',verifyUserToken ,updateProfile)
router.get('/getuserinfo',verifyUserToken ,getUserInfo)

export default  router;