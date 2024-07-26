const mongoose = require('mongoose');
const validator = require('validator');

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide a Valid Email Address"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [11, "Phone Must Be Exactly 11 Characters"],
        maxLength: [11, "Phone Must Be Exactly 11 Characters"]
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "Message Must Contain At Least 10 Characters"]
    }
});

module.exports = mongoose.model('Message', messageSchema);
