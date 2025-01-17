const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/teacher/:teacherId/student-assessments", (req, res) => {
  const teacherId = req.params.teacherId;
  db.query(
    `
          SELECT 
              student.student_name,
              course.course_name,
              teacher.teacher_name,
              assesment.enrollement_id,
              assesment.final,
              assesment.mid,
              assesment.assignment,
              assesment.test
          FROM teacher
          LEFT JOIN course ON course.teacher_id = teacher.teacher_id
          LEFT JOIN enrollement ON course.course_id = enrollement.course_id
          LEFT JOIN student ON enrollement.student_id = student.student_id
          LEFT JOIN assesment ON enrollement.enrollement_id = assesment.enrollement_id
          WHERE teacher.teacher_id = ?
          ORDER BY course.course_name, student.student_name`,
    [teacherId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});
router.get("/display/teacher", (req, res) => {
  db.query(
    "SELECT teacher.*, department.department_name FROM teacher JOIN department ON teacher.department_id = department.department_id",
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// Get all teacher
router.get("/display/teacher/:departmentId", (req, res) => {
  const departmentId = req.params.departmentId;

  db.query(
    "SELECT teacher.* FROM teacher where department_id=?",
    [departmentId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});
// Register a teacher
router.post("/register/teacher", (req, res) => {
  const { personName, departmentId } = req.body;
  db.query(
    "INSERT INTO teacher (teacher_name, department_id) VALUES (?, ?)",
    [personName, departmentId],
    (err) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: "teacher registered successfully!" });
    }
  );
});


// Update assessment values
router.put("/teacher/update-assessment/:enrollementId", (req, res) => {
  const enrollementId = req.params.enrollementId;
  const { final, mid, assignment, test } = req.body;

  db.query(
    `UPDATE assesment 
     SET final = ?, mid = ?, assignment = ?, test = ?
     WHERE enrollement_id = ?`,
    [final, mid, assignment, test, enrollementId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      res.json({ message: "Assessment updated successfully" });
    }
  );
});



module.exports = router;
