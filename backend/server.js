const app = require('./app');
const cloudinary = require('cloudinary');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');

//Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down server due to uncaught exceptions');
  process.exit(1);
});
//setting config file
dotenv.config({ path: 'backend/config/config.env' });

//Connecting to DataBase
connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//Setting up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Handle Unhandle promise rejections

process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to unhandled rejection');
  server.close(() => {
    process.exit(1);
  });
});
