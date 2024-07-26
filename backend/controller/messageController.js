const Message = require('../models/messageSchema');
const catchAsyncError = require('../middleware/catchAsyncErrors')

exports.sendMessage = catchAsyncError (async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;

    console.log('Received data:', { firstName, lastName, email, phone, message });

    if (!firstName || !lastName || !email || !phone || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all required fields."
        });
    }

        const newMessage = await Message.create({ firstName, lastName, email, phone, message });
        console.log('Message created:', newMessage);
        res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage // Optional: include the created message in the response
        });
    })