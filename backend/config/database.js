const mongoose = require('mongoose');

const connectDataBase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(
        `MongoDB DataBase connected with host: ${con.connection.host}`
      );
    });
};

module.exports = connectDataBase;
