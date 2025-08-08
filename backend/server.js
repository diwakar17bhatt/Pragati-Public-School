const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require('multer');
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rakawid#29",
  database: "pragatipublicschool",
});

db.connect((err) => {
  if (err) return console.log("database error");
  console.log("mysql connected");
});

app.get("/getnews", (req, res) => {
  const query = "SELECT * FROM news";
  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

app.get("/getnewsadmin", (req, res) => {
  const query = "SELECT * FROM news";
  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

app.post("/addnews", (req,res)=>{
  const {news} = req.body;
  const query = "INSERT INTO news (newsandevents) VALUES (?)"
  db.query(query, news, (err, result)=>{
    if(err){
      console.log("error")
    }
    res.json({message: "News Saved"})
  })
})



app.post("/deletenews", (req, res) => {
  const { id } = req.body;
  const query = 'DELETE FROM news WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err){
      return res.status(500).json({ error: err });
    }
    if(result.affectedRows === 0){
      return res.status(404).json({message: "ID doesn't exist"})
    }
    res.json({ message: "News Deleted" });
  });
});



const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });



app.post('/add-teacher', upload.single('profileImage'), (req, res) => {
  const { name, qualification, contact } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : '';
  const sql = "INSERT INTO teachers (name, qualification, contact, profile_image_url) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, qualification, contact, imagePath], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Teacher added successfully" });
  });
});

const fs = require('fs');

app.post('/delete-teacher', (req, res) => {
  const { contact } = req.body;

  // Step 1: Get the image path from database
  const selectSql = "SELECT profile_image_url FROM teachers WHERE contact = ?";
  db.query(selectSql, [contact], (err, result) => {
    if (err) return res.status(500).send({ message: "Database error", error: err });
    if (result.length === 0) return res.status(404).send({ message: "Teacher not found" });

    const imageUrl = result[0].profile_image_url;
    const imageFile = path.basename(imageUrl); // Only filename
    const imagePath = path.join(__dirname, 'uploads', imageFile);

    // Step 2: Try deleting image (non-blocking)
    fs.unlink(imagePath, (fsErr) => {
      if (fsErr && fsErr.code !== 'ENOENT') {
        // Log but don't block DB deletion
        console.error("Image deletion error:", fsErr);
      }

      // Step 3: Delete the teacher from DB regardless of image deletion
      const deleteSql = "DELETE FROM teachers WHERE contact = ?";
      db.query(deleteSql, [contact], (deleteErr, result) => {
        if (deleteErr) return res.status(500).send({ message: "Error deleting teacher", error: deleteErr });

        res.send({ message: "Teacher deleted successfully (image deleted if found)" });
      });
    });
  });
});




app.get('/teachers', (req, res) => {
  db.query("SELECT * FROM teachers", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

app.get('/u-teachers', (req, res) => {
  db.query("SELECT * FROM teachers", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});



app.listen(PORT, ()=>{
    console.log(`backend running on ${PORT}`)
})