const app = require('./app');
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

//Handle Unhandle promise rejections

process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to unhandled rejection');
  server.close(() => {
    process.exit(1);
  });
});
