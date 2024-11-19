const express = require('express')
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv')
const cors = require('cors')


app.use(express.json());
app.use(cors());
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
db.connect((err) => {
    if (err)
        return console.log("Error connecting to db");

        console.log("Db connected", db.threadId);
    
}) 
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
   // Question 1 goes here
    app.get('/patients', (req, res) => {
      //retrive data from the data base
      db.query('select patient_id, first_name, last_name, date_of_birth from patients', (err, results) => {
        if (err) {
          console.log(err);
          res.statusMessage(500).send('Error retrieving data');
        }
        else {
          //display table or result
          res.render('patients', {results: results});
        }
      })
    });

   // Question 2 goes here
   app.get('/providers', (req, res) => {
    //retrive data from the data base
    db.query('select first_name, last_name, provider_specialty from providers', (err, results) => {
      if (err) {
        console.log(err);
        res.statusMessage(500).send('Error retrieving data');
      }
      else {
        //display table or result
        res.render('providers', {results: results});
      }
    })
  });

   // Question 3 goes here
   app.get('/patients/firstNameData', (req, res) => {
    const first_Name_patients = "select first_name from patients"
    //retrive data from the data base
    db.query(first_Name_patients, (err, results) => {
      if (err) {
        console.log(err);
        res.statusMessage(500).send('Error retrieving data');
      }
      else {
        console.log()
        //display table or result
        res.render('patients', {results: results});
      }
    })
  });

   // Question 4 goes here
   app.get('/providers/specialty', (req, res) => {
    const all_specialty = 'select provider_specialty from providers'
    //retrive data from the data base
    db.query(all_specialty, (err, results) => {
      if (err) {
        console.log(err);
        res.statusMessage(500).send('Error retrieving data');
      }
      else {
        //display table or result
        res.render('providers', {results: results});
      }
    })
  });
   

   // listen to the server
   const PORT = 3000
   app.listen(PORT, () => {
     console.log(`server is runnig on http://localhost:${PORT}`)
   })