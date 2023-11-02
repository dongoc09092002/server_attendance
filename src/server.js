const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models/index");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const attendanceRouter = require("./routes/attendance");
const client = require("./mqtt");
app.set("trust proxy", 1);

// cors
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
//cookies parser
app.use(cookieParser());
//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//router
app.get("/",(req,res)=>{return res.json("done")})
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/attendance", attendanceRouter);

// app.listen(3456, () => {
//   console.log("listening on the port:3456");
// });
client.client.on("connect", () => {
  console.log("MQTT connected");
});
client.client.on("error", (error) => {
  console.error("MQTT client error:", error);
});
//connectdb and start server
db.sequelize.sync().then(() => {
  app.listen(3456, () => {
    console.log(`Example app listening on port ${3456}`);
  });
});
