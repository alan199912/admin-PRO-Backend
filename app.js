require("dotenv").config();

const express = require("express");
const cors = require("cors");

// * Routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

const { dbConnect } = require("./db/config");

// * server
const app = express();

// * Reading and pars the body
app.use(express.json())

// * CORS
app.use(cors());

// * connection db
dbConnect();

// * enpoints
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log("Server run at port ", process.env.PORT);
});
