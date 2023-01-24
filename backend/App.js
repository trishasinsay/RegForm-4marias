const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require ("body-parser");
const port = 3306;
const cors = require("cors");
const { emit } = require("nodemon");
const host = "127.0.0.1";


// handling parse URLECONDED form
// app.use(bodyParser.urlencoded({ extended: false }));

// handles parsing JSON data from frontend
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());

const mysqlConnection = mysql.createConnection({
  host: host,
  user: "root",
  password: "030702",
  database: "db_finals",
});


// CRUD Application
// CREATE (insert)
app.post("/Registration", (req, res) => {
  
  // insert to database
  const {firstName, lastName, email,mobile, old_tupStudent,address,reason} = req.body;
  mysqlConnection.query(
    "INSERT INTO tbl_regform (firstName, lastName, email,  mobile,  old_TUP_Student, address, reason) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [firstName, lastName, email, mobile, old_tupStudent, address, reason],
    (err, results) => {
      try {
        if (results.affectedRows > 0) {
          res.json({ message: "Data Added!" });
        } else {
          res.json({ message: "Opps!" });
        }
      } 
        catch (err) {
        res.json({ message: err });
      }
    }
  );
});

// READ (select)
app.get("/Registration", (req, res) => {
  mysqlConnection.query("SELECT * FROM tbl_regform", (err, results) => {
    try {
      if (results.length > 0) {
        res.json(results);
      } else {
        res.json({ message: "No data found." });
      }
    } catch (err) {
      res.json({ message: err });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

