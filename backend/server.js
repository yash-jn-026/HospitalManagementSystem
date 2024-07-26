const app = require('./app');
const cloudinary = require('cloudinary').v2;
const PORT = process.env.PORT || 4000;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.listen(PORT, () => {
    console.log('====================================');
    console.log('server running on  ' + PORT);
    console.log('====================================');
});
