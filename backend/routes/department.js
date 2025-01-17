const express = require('express');
const router = express.Router();
const db = require('../config/database');


// Register a Department
router.post("/register/department", (req, res) => {
    const { faculityId, departmentName } = req.body;
    db.query(
      "INSERT INTO department (department_name, faculity_id) VALUES (?, ?)",
      [departmentName, faculityId],
      (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: "Department registered successfully!" });
      }
    );
});
  // Get all department
router.get("/display/department", (req, res) => {
    db.query(
      "SELECT department.*, faculity.faculity_name FROM department JOIN faculity ON department.faculity_id = faculity.faculity_id",
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
      }
    );
  });
  
module.exports = router;