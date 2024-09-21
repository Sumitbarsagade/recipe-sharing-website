const express = require('express');
const { registerUser, loginUser, requestOtp, validateOtp, resetPassword  } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);

// Route to request OTP for password reset
router.post('/request-otp', requestOtp);

// Route to validate the OTP
router.post('/validate-otp', validateOtp);

// Route to reset password after OTP is validated
router.post('/reset-password', resetPassword);

module.exports = router;
