const express = require("express");
const { status } = require("express/lib/response");
const dotenv = require("dotenv").config();
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");
const checkAuth = require("../middleware/check-auth");
const { check, validationResult } = require("express-validator");

// Create Employee
router.post("/create/emp/:manager_id", checkAuth, async (req, res) => {
  try {
    const { manager_id } = req.params;

    const {
      fullname,
      email,
      mobile,
      gender,
      department,
      salary,
      joining_date,
      location,
    } = req.body;

    // Basic validation
    if (
      !fullname ||
      !email ||
      !mobile ||
      !gender ||
      !department ||
      !salary ||
      !joining_date ||
      !location ||
      !manager_id
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if email already exists
    const emailExistsQuery = "SELECT * FROM emp WHERE email = $1";
    const emailCheckResult = await pool.query(emailExistsQuery, [email]);
    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const insertQuery =
      "INSERT INTO emp (fullname, email, mobile, gender, department, salary, joining_date, location, manager_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
    const values = [
      fullname,
      email,
      mobile,
      gender,
      department,
      salary,
      joining_date,
      location,
      manager_id
    ];

    const result = await pool.query(insertQuery, values);

    // Only send the response after the insertion is successful
    return res.status(201).json({ msg: "Employee data created successfully", data: result.rows[0] });
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});


router.get("/view/:manager_id", checkAuth, async (req, res, next) => {
  try {
    const { manager_id } = req.params;

    const query = "SELECT * FROM emp WHERE manager_id = $1";
    const result = await pool.query(query, [manager_id]);

    // Check if any employees were found
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "No employees found for the specified manager_id",
      });
    }

    // If employees were found, return them in the response
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({
      err: "Internal server error",
    });
  }
});

router.put("/update/:emp_id", checkAuth, async (req, res, next) => {
  try {
    const { emp_id } = req.params;
    const {
      fullname,
      email,
      mobile,
      gender,
      department,
      salary,
      joining_date,
      location,
    } = req.body;

    const updateQuery = `
            UPDATE emp 
            SET 
                fullname = COALESCE($1, fullname),
                email = COALESCE($2, email),
                mobile = COALESCE($3, mobile),
                gender = COALESCE($4, gender),
                department = COALESCE($5, department),
                salary = COALESCE($6, salary),
                joining_date = COALESCE($7, joining_date),
                location = COALESCE($8, location)
            WHERE 
                emp_id = $9
        `;

    await pool.query(updateQuery, [
      fullname,
      email,
      mobile,
      gender,
      department,
      salary,
      joining_date,
      location,
      emp_id,
    ]);

    return res.status(200).json({ msg: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
});

// router.delete("/delete/:emp_id", checkAuth, async (req, res, next) => {
//   try {
//     const { emp_id } = req.params;
//     const updateQuery = "DELETE FROM emp WHERE emp_id = $1";

//     await pool.query(updateQuery, [emp_id]);

//     return res.status(200).json({ msg: "Employee data delete successfully" });
//   } catch (error) {
//     console.error("Error deleting employee:", error);
//     return res.status(500).json({
//       msg: "Internal server error",
//     });
//   }
// });

router.delete(
  "/delete/:emp_id",
  checkAuth,
  [check("emp_id").isInt().withMessage("Employee ID must be an integer")],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { emp_id } = req.params;
      const deleteQuery = "DELETE FROM emp WHERE emp_id = $1";

      const result = await pool.query(deleteQuery, [emp_id]);

      if (result.rowCount === 0) {
        return res.status(404).json({ msg: "Employee not found" });
      }

      return res
        .status(200)
        .json({ msg: "Employee data deleted successfully" });
    } catch (error) {
      console.error("Error deleting employee:", error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
);

module.exports = router;
