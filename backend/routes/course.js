const express = require('express');
const router = express.Router();
const db = require('../config/database');


// Register a course
router.post("/register/course", (req, res) => {
    const { courseName, departmentId, yearId, semsterId } = req.body;
    db.query(
      "INSERT INTO course (course_name, department_id,yearr,semister) VALUES (?, ?, ?,?)",
      [courseName, departmentId, yearId, semsterId],
      (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: "Course registered successfully!" });
      }
    );
  });
  // assign teacher to a course
router.put("/assign/teacher", (req, res) => {
    const { courseId, teacherId } = req.body;
    db.query(
      "UPDATE course SET teacher_id = ? WHERE course_id = ?",
      [teacherId, courseId],
      (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: "Course teacher updated successfully!" });
      }
    );
});
  router.get("/display/courses", (req, res) => {
  db.query(
    "SELECT course.*, department.department_name FROM course JOIN department ON course.department_id = department.department_id ",
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

router.get("/display/courses/:courseId", (req, res) => {
    const courseId = req.params.courseId;
    db.query(
      "SELECT course.*, department.department_name, teacher.teacher_name " +
        "FROM course " +
        "JOIN department ON course.department_id = department.department_id " +
        "LEFT JOIN teacher ON course.teacher_id = teacher.teacher_id " +
        "WHERE course.course_id = ?",
      [courseId],
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
      }
    );
  });
  

module.exports = router;