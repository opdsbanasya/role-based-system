const express = require("express");
const { connetDB } = require("./config/database");
const userRouter = require("./routes/userRouter");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/adminRouter");
const seedAdmin = require("./utils/seedAdmin");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", userRouter);
app.use("/", adminRouter);

connetDB()
  .then(() => {
    console.log("Connection established!");
    seedAdmin();
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("error occured");
  });
