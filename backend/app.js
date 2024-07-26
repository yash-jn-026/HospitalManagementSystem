const express = require('express');
const { config } = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
require('./database/dbConnection');
const userRouter = require('./router/userRouter');
const  messageRouter = require('./router/messageRouter');
const errorMiddleware = require('./middleware/errorMiddleware');

// Load environment variables from .env file
config({ path: ".config/config.env" });



const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileupload({
    useTempFile: true,
    tempFileDir: "/tmp/"
}));

app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/user", userRouter);
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

app.use(errorMiddleware)
module.exports = app;