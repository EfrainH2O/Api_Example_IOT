/**
  * Endpoint #1. getLogTempHum
  * 
  * Este método realiza un select de todos los registros ubicados en
  * una tabla llamada "sensor_temperatura".
  * 
  * Resultado: Obtendrá todos los registros de la tabla "sensor_temperatura" 
  * Todas las columnas están contempladas. 
  * 
  * Puedes sustituirla utilizando una proyección a tu tabla incluyendo las columnas que necesites.
  * 
  * Te servirá para crear reportes especializados si utilizas algún metodo de despliegue web para los
  * Dashboards.
  */

const mysql = require("../database/db");
const constants = require("../constants")

async function getLogTempHum(req,res){
    try{
  
      var sql = constants.selectTempHum;
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

  async function insertLogTemperaturaHum(req,res){
    try{
  
      var sql = constants.insertTemperatureHum;
  
      //el valor se recibe en el cuerpo de correo
      //cualquier dato que vaya a ir en el insert deberás guardarlo en una variable local
      var temperatura = req.body.temperatura;
      var humedad = req.body.humedad;
  
      var conn = mysql.getConnection();
      conn.connect((error)=>{
          if (error) throw error;
  
          // así mismo, cualquier dato que vaya a insertarse, deberá incluirse en
          // los valores de los parámetros del Insert
          var params = [temperatura, humedad];
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

// Endpoint 3. getLogTemperatureHumByDateBetween
async function getLogTemperatureHumByDateBetween(req, res) {
  try {
    var sql = constants.selectTemperatureHumByDate;

    var date_one = req.body.date_one;
    var date_two = req.body.date_two;

    var conn = mysql.getConnection();
    conn.connect((error) => {
      if (error) throw error;
      var params = [date_one, date_two];
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
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
}

module.exports = {
  getLogTempHum,
  insertLogTemperaturaHum,
  getLogTemperatureHumByDateBetween,
};