const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://127.0.0.1:27017/portal-trial",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("mongo db connected!!!");
    console.log(`Hostname: ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

connectDB();



