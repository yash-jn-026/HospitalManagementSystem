const express = require('express');
const { patientRegister } = require('../controller/userController');
const router = express.Router();


router.post("/patient/register", patientRegister)

module.exports = router;