const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("DB create successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  dbConnect,
};
