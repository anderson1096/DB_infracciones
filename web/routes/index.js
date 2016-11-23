var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var login = require('./views/login')

/*------------ DATABASE CONNECTION ----------------*/
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'ander1096',
  database : 'C_infracciones'
});

connection.connect(function(err,res){
  if(err){
    throw err;
  }else{
    console.log('Conexion establecida');
  }
});

/*-------------------------------------------------*/

/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT * FROM Multa',function(err,result){
    if(err){
      throw err;
    }
    res.render('index', { title: result[0].Articulo_Sancionado});

  })

});


/* GET home page. */
router.get('/users', function(req, res, next) {
  res.render('login');
});

module.exports = router;
