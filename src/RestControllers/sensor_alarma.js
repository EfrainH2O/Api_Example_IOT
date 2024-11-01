const mysql = require("../database/db");
const constants = require("../constants")

//* Endpoint #1. getLogAlarmas
async function getLogAlarmas(req,res){
  try{

    var sql = constants.selectAlarma;
    var conn = mysql.getConnection();
    conn.connect((error)=>{
        if (error) throw error;
        conn.query(sql, (error, data, fields) => {
            if (error) {
              res.status(500);
              res.send(error.message);
            } else {
              console.log(data);
              res.json({
                data,
              });
            }
            conn.end();
        });
    });
  }catch(error){
    console.log(error)
    res.status(500)
    res.send(error)
  }
}

//Endpoint 2 insertar datos 
async function insertLogAlarmas(req,res){
    try{
  
      var sql = constants.InsertAlarma;
  
      //el valor se recibe en el cuerpo de correo
      //cualquier dato que vaya a ir en el insert deberás guardarlo en una variable local
      var estado = req.body.estado;
      var ultrasonico = req.body.ultrasonico;
      var boton= req.body.boton;
  
      var conn = mysql.getConnection();
      conn.connect((error)=>{
          if (error) throw error;
  
          // así mismo, cualquier dato que vaya a insertarse, deberá incluirse en
          // los valores de los parámetros del Insert
          var params = [estado, ultrasonico, boton];
          conn.execute(sql, params, (error, data, fields) => {
              if (error) {
                res.status(500);
                res.send(error.message);
              } else {
                console.log(data);
                res.json({
                  status: 200,
                  message: "Valor insertado",
                  affectedRows: data.affectedRows,
                });
              }
              conn.end();
          });
      });
  
    }catch(error){
      console.log(error)
      res.status(500)
      res.send(error)
    }
    
  }



// Endpoint 3 para la recopilacion de informacion filtrado por fechas
async function getLogTemperatureByDateBetween(req,res){
  try{
    var sql = constants.selectTemperatureByDate;

    var date_one = req.body.date_one;
    var date_two = req.body.date_two;

    var conn = mysql.getConnection();
    conn.connect((error)=>{
        if (error) throw error;
        var params = [date_one,date_two];
        conn.execute(sql, params, (error, data, fields) => {
            if (error) {
              res.status(500);
              res.send(error.message);
            } else {
              console.log(data);
              res.json({
                data,
              });
            }
            conn.end();
        });
    });
  }catch(error){
    console.log(error)
    res.status(500)
    res.send(error)
  }
  
}

async function getLogAlarmaByDateBetween(req,res){
  try{
    var sql = constants.selectAlarmaByDate;

    var date_one = req.body.date_one;
    var date_two = req.body.date_two;

    var conn = mysql.getConnection();
    conn.connect((error)=>{
        if (error) throw error;
        var params = [date_one,date_two];
        conn.execute(sql, params, (error, data, fields) => {
            if (error) {
              res.status(500);
              res.send(error.message);
            } else {
              console.log(data);
              res.json({
                data,
              });
            }
            conn.end();
        });
    });
  }catch(error){
    console.log(error)
    res.status(500)
    res.send(error)
  }
  
}




module.exports = {getLogAlarmas,insertLogAlarmas,getLogAlarmaByDateBetween};