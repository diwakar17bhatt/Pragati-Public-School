const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

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







app.listen(PORT, ()=>{
    console.log(`backend running on ${PORT}`)
})
