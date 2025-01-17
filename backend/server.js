const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const loginRouter = require("./routes/login");
const courseRouter = require("./routes/course");
const departmentRouter = require("./routes/department");
const faculityRouter = require("./routes/faculity");
const teacherRouter = require("./routes/teacher");
const studentRouter = require("./routes/student");
const dashboardRouter = require("./routes/dashboard");
const { verifyToken } = require("./middleware/verifyToken");

app.use("/", loginRouter);
app.use("/", courseRouter);
app.use("/", departmentRouter);
app.use("/", faculityRouter);
app.use("/", teacherRouter);
app.use("/", studentRouter);
app.use("/", dashboardRouter);

app.use("/check-auth", verifyToken, (req, res) => {
  const user = req.user;
  res.send({
    user,
    success: true,
    message: "That is Awosome",
    isAuthenticated: true,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
