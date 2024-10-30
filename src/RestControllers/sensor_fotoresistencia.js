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

  // Endpoint 1 get datos
  async function getLogFotoresistencia(req, res) {
    try {
      const sql = constants.selectFotoresistencia;
      const conn = mysql.getConnection();
  
      conn.connect((error) => {
        if (error) {
          console.error('Error connecting to database:', error);
          res.status(500).send(error.message);
          return;
        }
  
        conn.query(sql, (error, data, fields) => {
          if (error) {
            console.error('Error executing query:', error);
            res.status(500).send(error.message);
          } else {
            // Formatear la fecha si es necesario
            const formattedData = data.map((record) => ({
              ...record,
              fecha: new Date(record.fecha).toLocaleString('es-ES', { timeZone: 'UTC' }),
            }));
            console.log('Data retrieved:', formattedData);
            res.json({
              data: formattedData,
            });
          }
          conn.end();
        });
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).send(error.message);
    }
  }
  
  // Método POST para insertar un nuevo registro en Fotoresistencia
  async function insertLogFotoresistencia(req, res) {
    try {
      const sql = constants.insertFotoresistencia;
      const valor = req.body.valor;
  
      // Validación: verificar que 'valor' es un número
      if (typeof valor !== 'number') {
        res.status(400).send('El valor del sensor debe ser un número.');
        return;
      }
  
      // Determinar el nivel en función del valor
      let nivel = '';
      if (valor < 100) {
        nivel = 'Bajo';
      } else if (valor >= 100 && valor <= 200) {
        nivel = 'Medio';
      } else if (valor > 200) {
        nivel = 'Alto';
      } else {
        nivel = 'Desconocido';
      }
  
      // Obtener la fecha actual
      const fecha = new Date();
  
      const conn = mysql.getConnection();
      conn.connect((error) => {
        if (error) {
          console.error('Error connecting to database:', error);
          res.status(500).send(error.message);
          return;
        }
  
        const params = [fecha, valor, nivel];
        conn.execute(sql, params, (error, data, fields) => {
          if (error) {
            console.error('Error executing query:', error);
            res.status(500).send(error.message);
          } else {
            console.log('Data inserted:', data);
            res.json({
              status: 200,
              message: 'Valor insertado',
              affectedRows: data.affectedRows,
            });
          }
          conn.end();
        });
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).send(error.message);
    }
  }
  
// Endpoint 3. getLogTemperatureHumByDateBetween
async function getLogFotoresistenciaByDateBetween(req, res) {
    try {
      var sql = constants.selectFotoresistenciaByDate;
  
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
    getLogFotoresistencia,
    insertLogFotoresistencia,
    getLogFotoresistenciaByDateBetween
  };  