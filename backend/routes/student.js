const express = require('express');
const router = express.Router();
const db = require('../config/database');




router.post("/register/student", (req, res) => {

    const { personName, departmentId, year, semister } = req.body;
  
  
  
  
    // First register the student
    db.query(
      "INSERT INTO student (student_name, department_id, accademic_year, semister,username,password) VALUES (?, ?, ?, ?,?,?)",
      [personName, departmentId, year, semister,personName,personName],
      (err, studentResult) => {
        if (err) return res.status(500).send(err);
  
        const studentId = studentResult.insertId;
  
        // Fetch relevant courses
        db.query(
          "SELECT course_id FROM course WHERE yearr = ? AND semister = ? AND department_id = ?",
          [year, semister, departmentId],
          (err, courses) => {
            if (err) return res.status(500).send(err);
  
            // Prepare batch insert values for enrollement
            const enrollmentValues = courses.map((course) => [
              studentId,
              course.course_id,
            ]);
  
            if (enrollmentValues.length > 0) {
              // Insert all enrollements
              db.query(
                "INSERT INTO enrollement (student_id, course_id) VALUES ?",
                [enrollmentValues],
                (err, enrollmentResult) => {
                  if (err) return res.status(500).send(err);
  
                  // Get the first enrollment ID
                  const firstEnrollmentId = enrollmentResult.insertId;
  
                  // Create assessment records for each enrollment
                  const assessmentValues = Array.from(
                    { length: courses.length },
                    (_, i) => [firstEnrollmentId + i, 0, 0, 0, 0] // [enrollement_id, final, mid, assignment, test]
                  );
  
                  // Insert all assessment records
                  db.query(
                    "INSERT INTO assesment (enrollement_id, final, mid, assignment, test) VALUES ?",
                    [assessmentValues],
                    (err) => {
                      if (err) return res.status(500).send(err);
                      res.status(201).send({
                        message:
                          "Student registered, enrolled in courses, and assessment records created successfully!",
                        studentId: studentId,
                        coursesEnrolled: courses.length,
                      });
                    }
                  );
                }
              );
            } else {
              res.status(201).send({
                message:
                  "Student registered successfully! No courses found for enrollment.",
                studentId: studentId,
              });
            }
          }
        );
      }
    );
  });



  // Get all student
router.get("/display/student", (req, res) => {
    db.query(
      "SELECT student.*, department.department_name, faculity.faculity_name FROM student JOIN department ON student.department_id = department.department_id JOIN faculity ON department.faculity_id = faculity.faculity_id",
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
      }
    );
  });
  

// ........................view single student AssesmentList......................

router.get("/student/:studentId/student-assessments", (req, res) => {
    const studentId = req.params.studentId;
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
          FROM course
          LEFT JOIN teacher ON course.teacher_id = teacher.teacher_id
          JOIN enrollement ON course.course_id = enrollement.course_id
          JOIN student ON enrollement.student_id = student.student_id
          JOIN assesment ON enrollement.enrollement_id = assesment.enrollement_id
          WHERE student.student_id = ?
          ORDER BY course.course_name, student.student_name`,
      [studentId],
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
      }
    );
  });





module.exports = router;