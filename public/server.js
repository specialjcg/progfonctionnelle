/* eslint-disable no-console */
const mysql = require("mysql");
var app = require("express")();
var helmet = require("helmet-csp");
app.use(
  helmet({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
      // reportUri: '/report-violation',
    }
  })
);
const cors = require("cors");

app.use(cors());

const bodyParser = require("body-parser");
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/*var connection = mysql.createConnection({
  host: "localhost",
  user: "phpmyadmin",
  password: "septembre2018",
  database: "liste_de_taches"
});
*/
var fs = require("fs");
var https = require("https");
var sslOptions = {
  key: fs.readFileSync("/etc/ssl/private/www.valorisetonweb.fr.key"),
  cert: fs.readFileSync("/etc/ssl/certs/wildcard_valorisetonweb.fr.chain.pem")
};

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "jcgwebdeveloper",
  password: "septembre2018",
  database: "liste_de_taches"
});
connection.connect();
app.get("/maliste", (req, res) => {
  var queryString =
    "SELECT * FROM (SELECT * FROM (select * from liste_de_taches.taches GROUP by date_activation DESC) as note2 GROUP BY user_id) as note3 WHERE date_deactiver='0000:00:00'";
  connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;

    res.send(rows);
  });
});
app.get("/userid", (req, res) => {
  var queryString =
    "SELECT MAX(user_id) as user_id FROM  liste_de_taches.taches";
  connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;

    res.send(rows[0]);
  });
});
app.post("/addmaliste", (req, res) => {
  let stmt = `INSERT  INTO taches(id,user_id,tache_nom,etat,type_de_tache,date_creation,date_activation,date_deactiver) VALUES(?,?,?,?,?,?,?,?)`;
  let todo = [
    0,
    req.body.user_id,
    req.body.tache_nom,
    req.body.etat,
    req.body.type_de_tache,
    req.body.date_creation,
    req.body.date_activation,
    req.body.date_deactiver
  ];

  connection.query(stmt, todo, (err, results, fields) => {
    if (err) throw err;

    res.send(results);
  });
});
app.get("/DeleteTask/:messageId", (req, res) => {
  var queryString =
    "UPDATE taches SET date_deactiver=NOW(), etat='finish',date_activation=NOW() WHERE id=" +
    req.params.messageId;

  connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;

    res.send(rows);
  });
});
//connection.end();

https.createServer(sslOptions, app).listen(3001);
