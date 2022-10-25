const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


const db = mysql.createPool({
    host: "mysqlserver.cygowg4cfbgm.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "blitzcrank",
    database: "dbmedcloud"
})
app.use(cors());
app.use(express.json());
app.post('/register', (req, res) => {  
  const name = req.body.name;
  const birth = req.body.birth;
  const email = req.body.email;
  const country = req.body.country;
  const cep = req.body.cep;
  const uf = req.body.uf;
  const city = req.body.city;
  const district = req.body.district;
  const adress = req.body.adress;
  const number = req.body.number;

    db.query("SELECT * FROM patients WHERE email = ?", 
    [email], (err, result) => {
      if(err) 
       {res.send(err);}
      if (result.length == 0){
        db.query("INSERT INTO patients (name, birth, email, country, cep, uf, city, district, adress, number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [name, birth, email, country, cep, uf, city, district, adress, number], (err, result) => {
          if(err) {
            res.send(err);
          } else {
          res.send({msg: "Cadastrado com sucesso"}) 
          }
        })
      } else {
        res.send({msg: "Usuário já cadastrado"})        
      };
    })
})

app.listen(3001, () => {    
    console.log("rodando server");
});