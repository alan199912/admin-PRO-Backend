require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require('morgan')

// * Routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const hospitalRoute = require("./routes/hospital");
const doctorRoute = require("./routes/doctor");
const searchRoute = require('./routes/search')
const uploadRoute = require('./routes/upload')

const { dbConnect } = require("./db/config");

// * server
const app = express();

// * Reading and pars the body
app.use(express.json())
app.use(morgan('dev'))
// * CORS
app.use(cors());

// * connection db
dbConnect();

// * dir public
app.use(express.static('public'))

// * enpoints
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/hospitals", hospitalRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/searches", searchRoute);
app.use("/api/uploads", uploadRoute);

app.listen(process.env.PORT, () => {
  console.log("Server run at port ", process.env.PORT);
});
