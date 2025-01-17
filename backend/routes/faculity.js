const express = require('express');
const router = express.Router();
const db = require('../config/database');


// Get  department of specific faculity
router.get("/display/department/:faculityId", (req, res) => {
    const faculityId = req.params.faculityId;
  
    db.query(
      "SELECT department.*, faculity.faculity_name FROM department JOIN faculity ON department.faculity_id = faculity.faculity_id WHERE department.faculity_id=?",
      [faculityId],
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
      }
    );
  });

// Register a Faculity
router.post("/register/faculity", (req, res) => {
    const { faculityName } = req.body;
    db.query(
      "INSERT INTO faculity (faculity_name) VALUES ( ?)",
      [faculityName],
      (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: "faculity registered successfully!" });
      }
    );
  });

  // Get all faculity
router.get("/display/faculity", (req, res) => {
    db.query("SELECT * FROM faculity", (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  });

module.exports = router;