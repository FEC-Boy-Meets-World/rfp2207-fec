const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'questions'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  db.query("CREATE DATABASE questions", (err, result) => {
    if (err) throw err;
    console.log("Database created");
  });
});
