var express = require('express');
var router = express.Router();
var mysql = require('mysql');


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

  connection.query('SELECT * FROM Persona',function(err,result){
    if(err){
      throw err;
    }
    res.render('index', { title: result[0].Apellido_Persona});

  })

});


/* Recibir LOGIN */
router.post('/login',function(req,res,next){
  try{
    var obj = req.body;
    if(obj.login_pass == '1096'){
      res.render('index', { title: 'Anderson10'});
    }else{
      res.render('index', { title: 'Error'});
    }
  }
  catch(ex){
    console.error("Internal error:" + ex);
    return next(ex);
  }
});


/* Recibir CONSULTA */
router.post('/consult',function(req,res,next){
  try{
    var obj = req.body;

    con1 = 'SELECT * FROM Multa WHERE id_persona = ?';
    con2 = 'SELECT * FROM Persona WHERE id_persona = ?';
    con3 = 'SELECT * FROM Vehiculo WHERE matricula_vehiculo = ?';
    //code_int = parseInt(obj.user_code);
    connection.query(con1,[obj.user_code],function(err, multa_result){
      if(err){
        throw err;
      }
      connection.query(con2,[obj.user_code],function(err, persona_result){
        if(err){
          throw err;
        }
        var tam = Object.keys(multa_result).length;
        var vehiculo = [];
        multa_result.forEach(function(multa){
            connection.query(con3,[multa.id_vehiculo],function(err, vehiculo_result){
              if(err){
                throw err;
              }


              /*car_descr = "Matricula: " + vehiculo_result[0].matricula_vehiculo
                            + " Modelo: " + vehiculo_result[0].modelo_vehiculo
                            + " Marca: " + vehiculo_result[0].marca_vehiculo;*/
              vehiculo.push(vehiculo_result[0]);



            })
          })
          res.render('consult',{multa: multa_result, persona: persona_result, vehiculos: vehiculo});
      })

    })
  }
  catch(ex){
    console.error("Internal error:" + ex);
    return next(ex);
  }
});




/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET consult_code page */
router.get('/login_consult', function(req, res, next) {
  res.render('login_consult');
});

/* GET consult page */
router.get('/consult', function(req, res, next) {
  res.render('consult');
});


module.exports = router;
