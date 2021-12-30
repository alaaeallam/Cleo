const app = require('./app');
const connectDataBase = require('./config/database');
const dotenv = require('dotenv');
//setting config file
dotenv.config({ path: 'backend/config/config.env' });

//Connecting to DataBase
connectDataBase();
app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
