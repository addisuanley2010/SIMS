const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/dashboard", (req, res) => {
  db.query(
    `SELECT ( SELECT COUNT(*) FROM  faculity) as total_faculity,
( SELECT COUNT(*) FROM  student) as total_student,
( SELECT COUNT(*) FROM  teacher) as total_teacher,
( SELECT COUNT(*) FROM  department) as total_department `,

    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});


module.exports = router;
