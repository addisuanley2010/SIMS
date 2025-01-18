const express = require("express");
const router = express.Router();
const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
// .......................Login.........................
router.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    let results;
    if (role === "student") {
      [results] = await db
        .promise()
        .query("SELECT * FROM student WHERE username = ?", [username]);
    } else if (role === "teacher") {
      [results] = await db
        .promise()
        .query("SELECT * FROM teacher WHERE username = ?", [username]);
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const user = results[0];
    const isValidPassword = user.password === password ? true : false;

    const isPasswordChanged = user.password === user.username ? true : false;

    if (!isValidPassword) {
      return res.status(401).json({ error: "incorrect password" });
    }

    if (isPasswordChanged) {
      return res
        .status(401)
        .json({
          isPasswordChanged: true,
          error: "Change Default password First",
        });
    }

    const token = jwt.sign(
      {
        id: role == "student" ? user.student_id : user.teacher_id,
        name: role == "student" ? user.student_name : user.teacher_name,
        username: user.username,
        role: user.role,
        isAuthenticated: true,
      },
      "your-secret-key",
      { expiresIn: "24h" }
    );
    res.json({
      token,
      role: user.role,
      username: user.username,
      id: role == "student" ? user.student_id : user.teacher_id,
    });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

router.put("/change-password", async (req, res) => {
  const { currentPassword, newPassword, username } = req.body;

  try {
    // Find the user by username
    const [rows] = await db.promise().query(
      "SELECT * FROM student WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    // Check if the current password is correct
    // const isMatch = await bcrypt.compare(currentPassword, user.password);
    const isMatch = currentPassword == user.password;

    if (!isMatch) {
        return res.status(400).json({ status:false,message: 'Current password is incorrect' });
    }

    // Hash the new password
    // const salt = await bcrypt.genSalt(10);
    // const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
     await db.promise().query("UPDATE student SET password = ? WHERE username = ?", [
      newPassword,
      username,
    ]);

    // Send a success response
    res.status(200).json({status:true, message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({status:false, error: "Server error" });
  }
});

module.exports = router;


